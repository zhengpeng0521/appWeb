import {
        base64ImgUpload,
        initKoubeiCourseData,
        koubeiOrgList,getGoodsDetail,
        koubeiGoodsSubmitCreate,
        koubeiGoodsSubmitUpdate,
        validateToken,
        queryCategoryId,
        getOrgList
} from '../../../services/koubei/goodsManageService';
import { parse } from 'qs';
import React from 'react';
import { Toast, Modal } from 'antd-mobile';
import moment from 'moment';
import { routerRedux } from 'dva/router';

//主题管理
export default {

  namespace: 'koubeiGoodsForm',

  state: {
      tenantId : '',
      merchantPid : '',
      token: '',
      formLoading : false,
      goodsType : 'koubei_course',  //商品类型 koubei_course / koubei_activity
      goodsData : {}, //商品数据
      courseTypeList : [], //口碑课程的课程类型 列表
      courseAgeList: [],
      koubeiOrgList: [], //口碑的门店列表

      orgList:[],           //门店列表
      categoryIdList: [],             //商品类目数据
      goodsIntroList: [],//商品简介

      tabsDefaultValue : '1',       //新增时默认的类型('1'早教模板/'2'自定义)
      customCourseList : [],        //自定义时课程简介内容
      customExtraIntro : [],        //自定义补充说明内容
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/goodsForm') {

                  dispatch({
                    type: 'validateToken',
                    payload : {
                        tenantId : query.tenantId,
                        merchantPid : query.merchantPid,
                        token: query.token,
                    }
                  });

                  /*获取门店列表数据*/
                  dispatch({
                    type: 'getOrgList',
                    payload : {
                        merchantPid : query.merchantPid,
                    }
                  });

                  dispatch({
                    type: 'updateState',
                    payload : {
                        tenantId : query.tenantId,
                        merchantPid : query.merchantPid,
                        token: query.token,
                        goodsType: query.goodsType,
                    }
                  });
                  dispatch({
                    type: 'initKoubeiData',
                    payload : {
                        tenantId : query.tenantId,
                        merchantPid : query.merchantPid,
                        commodityId: '201610200194070711',//口碑商品的服务号
                    }
                  });
                  dispatch({
                    type:'queryCategoryId'
                  });
                  if(query.goodsId && query.goodsId != '') {
                      let goodsType = query.goodsType;
                      dispatch({
                        type: 'initGoodsData',
                        payload : {
                            tenantId : query.tenantId,
                            merchantPid : query.merchantPid,
                            goodsType: goodsType == 'koubei_course' ? '1' : goodsType == 'koubei_activity' ? '2' : '',
                            goodsId: query.goodsId,
                        }
                      });
                  } else {
                      dispatch({
                        type: 'updateState',
                        payload : {
                            goodsData: {},
                            goodsIntroList: [{
                                key: 'goodsIntro_0',
                                index: 0,
                                value: '',
                            }],
                            customCourseList : [{title:undefined,key:'0',details:[{value:undefined,key:'0-0'}]}],         //新增时自定义时课程简介内容格式化
                            customExtraIntro : [{title:undefined,key:'0',details:[{value:undefined,key:'0-0'}]}],         //新增时自定义时课程简介内容格式化
                        }
                      });
                  }
              }
          });
      }
  },

  effects: {
        /*获取门店列表数据*/
        *'getOrgList'({ payload },{ call, put, select }){
            let { ret } = yield call(getOrgList,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type : 'updateState',
                    payload : {
                        orgList : ret.results
                    }
                })
            }else if(ret && ret.errorMessage){
                Toast.offline(ret.errorMessage);
            }else{
                Toast.offline('您的网络状况不佳，请检查网络情况');
            }
        },

        /*获取类目列表数据*/
        *'queryCategoryId'({ payload },{ call, put, select }){
            let { ret } = yield call(queryCategoryId,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type : 'updateState',
                    payload : {
                        categoryIdList : ret.results
                    }
                })
            }else if(ret && ret.errorMessage){
                Toast.offline(ret.errorMessage);
            }else{
                Toast.offline('您的网络状况不佳，请检查网络情况');
            }
        },

      *initGoodsData({ payload }, { call, put, select }) {
          yield put({
                type: 'updateState',
                payload : {
                    formLoading: true
                }
            });
          let { ret } = yield call(getGoodsDetail, parse(payload));
          if(ret.errorCode == 9000) {
              let goodsData = ret.results && ret.results[0] ? ret.results[0] : {};
              let orgIds = ret.data.orgIds || [];
              goodsData.goodsOrg = orgIds.join(',');

				//核销时间格式化
				if(goodsData.validity_period_range_from && goodsData.validity_period_range_from.length > 0) {
					goodsData.validityPeriodRangeFrom = moment(goodsData.validity_period_range_from, 'YYYY-MM-DD hh:mm:ss');
				}
				if(goodsData.validity_period_range_to && goodsData.validity_period_range_to.length > 0) {
					goodsData.validityPeriodRangeTo = moment(goodsData.validity_period_range_to, 'YYYY-MM-DD hh:mm:ss');
				}
			
              //商品简介
              let courseDesc = goodsData.goodsType == '1' ? goodsData.courseDesc : goodsData.activityDesc;
              let goodsIntroList = [];
              if(courseDesc != undefined && courseDesc.length > 0) {
                  let goodsIntroArr = courseDesc.split('#$@&$#');
                  if(goodsIntroArr && goodsIntroArr.length > 0) {
                      for(let i = 0; i < goodsIntroArr.length; i++) {
                          goodsIntroList.push({
                              key: 'goodsIntro_' + i,
                              index: i,
                              value: goodsIntroArr[i],
                          });
                      }
                  }
              }

              if(goodsIntroList.length == 0) {
                  goodsIntroList.push({
                      key: 'goodsIntro_0',
                      index: 0,
                      value: '',
                  });
              }

              let activityTime = goodsData.activityTime;
              if(activityTime && activityTime.length > 0) {
                  let activityTimeArr = activityTime.split('~');
                  if(activityTimeArr && activityTimeArr.length > 1) {
                      let activityTimeBegin = activityTimeArr[0];
                      let activityTimeEnd = activityTimeArr[1];
                      goodsData.activityTimeBegin = moment(activityTimeBegin, "YYYY-MM-DD HH:mm:ss")
                      goodsData.activityTimeEnd = moment(activityTimeEnd, "YYYY-MM-DD HH:mm:ss")
                  }
              }

            //如果获取的数组为空时用此数组
            let idEmptyModal = [{title : undefined,key : '0',details :[{ value : undefined , key : '0-0'}]}];
            //接收到后台请求时反编译后台数据用于前端回填
            let originCourseArray = ret.results[0].descriptions;
            let formatCourseArray = [];
            if(originCourseArray == null || originCourseArray == undefined || originCourseArray == '' || originCourseArray.length < 1){
                formatCourseArray = idEmptyModal;
            }else{
                originCourseArray.map((first,firstIndex) => {
                    let obj = {};
                    obj.title = first.title;
                    obj.key = firstIndex + '';
                    let detailArr = [];
                    first.details.map((details,index) => {
                        detailArr.push({
                            value : details,
                            key : firstIndex+'-'+index
                        })
                    })
                    obj.details = detailArr;
                    formatCourseArray.push(obj);
                })
            }

            let originCourseSuppleArray = ret.results[0].buyer_notes;
            let formatCourseSuppleArray = [];
            if(originCourseSuppleArray == null || originCourseSuppleArray == undefined || originCourseSuppleArray == '' || originCourseSuppleArray.length < 1){
                formatCourseSuppleArray = idEmptyModal;
            }else{
                originCourseSuppleArray.map((first,firstIndex) => {
                    let obj = {};
                    obj.title = first.title;
                    obj.key = firstIndex + '';
                    let detailArr = [];
                    first.details.map((details,index) => {
                        detailArr.push({
                            value : details,
                            key : firstIndex+'-'+index
                        })
                    })
                    obj.details = detailArr;
                    formatCourseSuppleArray.push(obj);
                })
            }

            yield put({
                type: 'updateState',
                payload : {
                    formLoading: false,
                    goodsData,
                    goodsIntroList,
                    tabsDefaultValue : ret.results[0].goodSrc || '1',
                    customCourseList : formatCourseArray || [],                 //自定义模板数据
                    customExtraIntro : formatCourseSuppleArray || [],     //自定义补充数据
                }
            });
          } else {
              ret && Toast.offline(ret.errorMessage || '查询商品详细出错啦');
          }
      },

      *goodsImgChange({ payload }, { call, put, select }) {
          yield put({
                type: 'updateState',
                payload : {
                    formLoading: true
                }
            });

          let koubeiGoodsForm = yield select(state => state.koubeiGoodsForm);
          let tenantId = koubeiGoodsForm.tenantId;
          let merchantPid = koubeiGoodsForm.merchantPid;
          let {files, operationType, index, imgType} = payload;

            if(operationType == 'add') {
                if(files && files.length > 0) {
                    for(let file of files) {

                       let img_url = file.url;
                        if(img_url.indexOf('data:') > -1) {
                            let { ret } = yield call(base64ImgUpload, parse({data: img_url, tenantId, merchantPid}));
                            if(ret.errorCode == 9000) {
                                file.url = ret.data.url;
                                file.id = ret.data.imageId;
                            } else {
                                ret && Toast.offline(ret.errorMessage || '上传图片出错啦');
                            }
                        }
                    }
                }
            }

            let filesStr = '';
            if(files && files.length > 0) {
                let new_files = [];
                files.map(function(file_item) {
                    if(file_item && file_item.url && (file_item.url.indexOf('data:') == -1)) {
                        new_files.push({
                            imgId: file_item.id,
                            imgurl: file_item.url,
                        });
                    }
                });

                if(new_files.length == 1 && imgType == 'cover') {
                    filesStr = JSON.stringify(new_files[0]);
                } else {
                    filesStr = JSON.stringify(new_files);
                }
            }

            let goodsData;
            if(imgType == 'cover') {
                goodsData = {...koubeiGoodsForm.goodsData, cover: filesStr};
            } else {
                goodsData = {...koubeiGoodsForm.goodsData, pictureDetails: filesStr};
            }
            yield put({
                type: 'updateState',
                payload : {
                    goodsData,formLoading: false
                }
            });
      },

    *initKoubeiData({ payload }, { call, put, select }) {
        yield put({
            type: 'updateState',
            payload : {
                formLoading: true
            }
        });
        let koubeiGoodsForm = yield select(state => state.koubeiGoodsForm);
        let params = {
            tenantId: payload.tenantId || koubeiGoodsForm.tenantId,
            merchantPid: payload.merchantPid || koubeiGoodsForm.merchantPid,
            commodityId: payload.commodityId,
        };
        //获取商品的  课程类型 适合年龄列表
        let { ret } = yield call(initKoubeiCourseData, parse(params));
        if(ret && ret.errorCode == 9000) {
            yield put({
                type: 'updateState',
                payload : {
                    courseTypeList: ret.data && ret.data.courseTypeArr || [],
                    courseAgeList: ret.data && ret.data.ageList || [],
                }
            });
        } else {
            ret && Toast.offline(ret.errorMessage || '商品数据初始化出错啦');
        }

         //获取商品的 口碑门店列表
        let result2 = yield call(koubeiOrgList, parse(params));

        if(result2 && result2.ret && result2.ret.errorCode == 9000) {
            yield put({
                type: 'updateState',
                payload : {
                    koubeiOrgList: result2.ret.results
                }
            });
        } else {
            result2 && result2.ret && Toast.offline(result2.ret.errorMessage || '商品数据初始化出错啦');
        }
        yield put({
            type: 'updateState',
            payload : {
                formLoading: false
            }
        });
    },

    *koubeiGoodsSubmit({ payload }, { call, put, select }) {
    	
    	console.info('payload', payload);
        yield put({
            type: 'updateState',
            payload : {
                formLoading: true
            }
        });
        let koubeiGoodsForm = yield select(state => state.koubeiGoodsForm);
        payload.orgIds = payload.goodsOrg;

        let courseHour = payload.courseHour;
        if(courseHour && courseHour!= '') {
            payload.courseHour = courseHour + '-课时';
        }

        let courseDuring = payload.courseDuring;
        if(courseDuring && courseDuring!= '') {
            payload.courseDuring = courseDuring + '-分钟';
        }

        let gmtStart = payload.gmtStart;
        if(gmtStart && gmtStart != '') {
            payload.gmtStart = gmtStart.format('YYYY-MM-DD HH:mm:ss');
        }
        
        payload.validityPeriodType = payload.validityPeriodType == '1' ? 'FIXED' : 'RELATIVE';
        payload.validity_period_type = payload.validityPeriodType;
        
        let gmtEnd = payload.gmtEnd;
        if(gmtEnd && gmtEnd != '') {
            payload.gmtEnd = gmtEnd.format('YYYY-MM-DD HH:mm:ss');
        }
        
        let validityPeriodRangeFrom = payload.validityPeriodRangeFrom;
        if(validityPeriodRangeFrom && validityPeriodRangeFrom != '') {
            payload.validity_period_range_from = validityPeriodRangeFrom.format('YYYY-MM-DD HH:mm:ss');
            payload.validityPeriodRangeFrom = undefined;
        }
        
        let validityPeriodRangeTo = payload.validityPeriodRangeTo;
        if(validityPeriodRangeTo && validityPeriodRangeTo != '') {
            payload.validity_period_range_to = validityPeriodRangeTo.format('YYYY-MM-DD HH:mm:ss');
            payload.validityPeriodRangeTo = undefined;
        }
        
        //核销时间相关校验
        //核销有效期总时长不能超过360天
        
        if(!!payload.validity_period_range_from && !!payload.validity_period_range_to && (new Date(payload.validity_period_range_to).getTime() - new Date(payload.validity_period_range_from).getTime() > 1000 * 3600 * 24 * 360)){
          	yield put({
	            type: 'updateState',
	            payload : {
	                formLoading: false
	            }
	        });
          	return Toast.offline('核销有效期总时长不能超过360天');
      	}
        
         //售卖时段结束时间不得晚于核销结束时间
          if(!!payload.gmtEnd && !!payload.validity_period_range_to && new Date(payload.gmtEnd).getTime() > new Date(payload.validity_period_range_to).getTime()){
              yield put({
	            type: 'updateState',
	            payload : {
	                formLoading: false
	            }
	        });
              return Toast.offline('上架时段结束时间不得晚于核销结束时间');
          }

          //核销有效期开始时间不得早于售卖开始时间
          if(!!payload.validity_period_range_from && !!payload.gmtStart && new Date(payload.validity_period_range_from).getTime() < new Date(payload.gmtStart).getTime()){
              yield put({
		            type: 'updateState',
		            payload : {
		                formLoading: false
		            }
		        });
              return Toast.offline('核销有效期开始时间不得早于上架开始时间');
          }

        let activityTime = '';
        let activityTimeBegin = payload.activityTimeBegin;
        let activityTimeEnd = payload.activityTimeEnd;
        if(activityTimeBegin && activityTimeEnd) {
            activityTime = activityTimeBegin.format('YYYY-MM-DD HH:mm:ss') + '~' + activityTimeEnd.format('YYYY-MM-DD HH:mm:ss');
            payload.activityTime = activityTime;
            payload.activityTimeBegin = '';
            payload.activityTimeEnd = '';
        }

        let goodsCover = koubeiGoodsForm.goodsData && koubeiGoodsForm.goodsData.cover;
        let goodsPictures = koubeiGoodsForm.goodsData && koubeiGoodsForm.goodsData.pictureDetails;

        payload.cover = goodsCover;
        payload.pictureDetails = goodsPictures;

        payload.weight = payload.weight || 0;

        //商品简介
        let courseDescArr = [];
        let {goodsIntroList} = koubeiGoodsForm;
        goodsIntroList && goodsIntroList.length > 0 && goodsIntroList.map(function(introItem) {
            courseDescArr.push(payload[introItem.key]);
        });

        if(payload.goodsType == '1') {
            payload.courseDesc = courseDescArr.join('#$@&$#');
        } else {
            payload.activityDesc = courseDescArr.join('#$@&$#');
        }

        if(payload.id && payload.id != '') {
            //获取商品的  课程类型 适合年龄列表
            let { ret } = yield call(koubeiGoodsSubmitUpdate, parse(payload));
            if(ret && ret.errorCode == 9000) {
                Toast.success('商品修改成功');
                yield put(routerRedux.push({
                    pathname: '/',
                    query: {
                        tenantId: koubeiGoodsForm.tenantId,
                        merchantPid: koubeiGoodsForm.merchantPid,
                        token: koubeiGoodsForm.token,
                        goodsType: koubeiGoodsForm.goodsType,
                    }
                }));
            } else {
                
                if(!!ret && ret.errorMessage && ret.errorMessage=='bizFail:未签约新协议的商户无法对商品进行操作,请您尽快签约'){
                    Modal.alert('提示','未签约新协议的商户无法对商品进行操作，请您尽快签约!',
                    [{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },{
                        text: '去签约', 
                        onPress: () => 
                            kb.pushWindow({
                                url:'alipaym://platformapi/startapp?appId=30000017&version=*&offlineTag=YES&offlineAppId=20000525&url=%2Fwww%2Fconfirm.html%3Fbiz%3Dnotice%26kbSignCode%3DKbGoodsSaleSet'
                            })
                        }
                    ]);
              }else{
                ret && Toast.offline(!!ret && ret.errorMessage || '商品提交出错啦');
              }
                
            }
        } else {
            //获取商品的  课程类型 适合年龄列表
        let { ret } = yield call(koubeiGoodsSubmitCreate, parse(payload));
            if(ret && ret.errorCode == 9000) {
                Toast.success('商品新增成功');
                yield put(routerRedux.push({
                    pathname: '/',
                    query: {
                        tenantId: koubeiGoodsForm.tenantId,
                        merchantPid: koubeiGoodsForm.merchantPid,
                        token: koubeiGoodsForm.token,
                        goodsType: koubeiGoodsForm.goodsType,
                    }
                }));
            } else {
                if(!!ret && ret.errorMessage && ret.errorMessage=='bizFail:未签约新协议的商户无法对商品进行操作,请您尽快签约'){
                    Modal.alert('提示','未签约新协议的商户无法对商品进行操作，请您尽快签约!',
                    [{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },{
                        text: '去签约', 
                        onPress: () => 
                            kb.pushWindow({
                                url:'alipaym://platformapi/startapp?appId=30000017&version=*&offlineTag=YES&offlineAppId=20000525&url=%2Fwww%2Fconfirm.html%3Fbiz%3Dnotice%26kbSignCode%3DKbGoodsSaleSet'
                            })
                        }
                    ]);
              }else{
                ret && Toast.offline(!!ret && ret.errorMessage || '商品提交出错啦');
              }
            }
        }

        yield put({
            type: 'updateState',
            payload : {
                formLoading: false
            }
        });
    },

        //校验token
   *validateToken({ payload }, { call, put, select }) {
       let {ret} = yield call(validateToken, parse(payload));
        if(ret && ret.errorCode === 9000) {

        } else {
            yield put(routerRedux.push({
                    pathname: '/noLogin',
                    query: {
                    }
                }));
        }
   },

  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },

      addGoodsIntroItem(state, action) {
          let {goodsIntroList} = state;
          if(goodsIntroList && goodsIntroList.length > 0) {

              if(goodsIntroList.length == 10) {
                  Toast.info('至多配置10项商品简介');
                  return { ...state, };
              }

              let lastItem = goodsIntroList[goodsIntroList.length-1];
              let neyIndex = lastItem.index + 1;
              goodsIntroList.push({
                  key: 'goodsIntro_' + neyIndex,
                  index: neyIndex,
                  value: '',
              });
          } else {
              goodsIntroList = [{
                  key: 'goodsIntro_0',
                  index: 0,
                  value: '',
              }];
          }
          return { ...state, goodsIntroList, };
      },

      removeGoodsIntroItem(state, action) {
          let {goodsIntroList} = state;
          let {key} = action.payload;

          if(goodsIntroList && goodsIntroList.length > 1) {
              let newList = [];
              goodsIntroList.map(function(introItem) {
                  if(introItem.key != key) {
                      newList.push(introItem);
                  }
              });

              goodsIntroList = newList;
          } else {
              Toast.info('至少留1项商品简介');
          }
          return { ...state, goodsIntroList, };
      },
  },

};
