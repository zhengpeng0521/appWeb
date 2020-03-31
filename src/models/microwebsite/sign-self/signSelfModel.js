import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import {getCrmBabyList} from '../../../services/microwebsite/microwebsiteService';
import {
    getPersonCenter,
    createStuSignCode,
    searchQrcodeStatus,
    getFaceInfo,
    bindFaceInfo,
    getHeaderUrl,
    hasFace,
    getParentsFace,
    bindParentsFace,
    getSignSet,
    signOnline,
    hasFaceSign
 } from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

/*
 * crm扫码签到
 */
export default {

    namespace: 'signSelfModel',

    state: {
        tenantId   : '',
        orgId      : '',
        mobile     : '',
        parentId   : '',

        stuId      : '',
        babyList   : [],//宝宝列表
        qrcode     : '',//二维码的编号
		headimgurl : undefined,
        stuName    : undefined,

        activeKey  : 'code',
        hasFace    : false,         // 是否开通人脸
        isBind     : false,         // 是否绑定人脸
        faceUrl    : undefined,     // 人脸照片
        uploadUrl  : undefined,     // 上传的url，用来绑定人脸
        parentsFace: [],            // 家长人脸信息

        visible    : false,
        signStatus : '1',           // 签到状态
        tabStatus  : 'off',         // 按钮显示
        btnLoading : false,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(({ pathname, query }) => {
			  	if (pathname === '/microSignSelf') {
                    dispatch({type: 'hasFaceSign', payload: {
                        appId: '1630396076961824769',
                        tenantId: query.tenantId,
                        orgId: query.orgId
                    }})

                    dispatch({
                        type: 'getSignSet',
                        payload: {
                            tenantId: query.tenantId,
                            orgId: query.orgId,
                            parentId: query.parentId,
                            stuId: query.stuId
                        }
                    })

					if( window.localStorage.getItem( query.stuName ) == query.stuName ){
						dispatch({
							type : 'judgeIsForward',
							payload : {
								stuName  : query.stuName,
								tenantId : query.tenantId,
								orgId    : query.orgId
							}
						})
						return;
					}

					document.title = "签到";
                    //刷新缓存数据
                    window.COMMON_DATA.parentId = query.parentId;
                    window.COMMON_DATA.tenantId = query.tenantId;
                    window.COMMON_DATA.orgId    = query.orgId;
                    window.COMMON_DATA.mobile   = query.mobile;

                    dispatch({
						type: 'updateState',
                        payload: {
                            tenantId : query.tenantId,
                            parentId : query.parentId,
							stuName  : query.stuName,
                            orgId    : query.orgId,
                            mobile   : query.mobile,
							headimgurl : query.url,
							stuId    : query.stuId,
                            qrcode   : '',
                            activeKey: 'code',
                        }
					});

                    dispatch({
						type : 'createBabySignQrcode',
                        payload : {
							stuId : query.stuId,
                        }
					});
                    window.COMMON_DATA.signSelfListen = true;
              	} else {
                    window.COMMON_DATA.signSelfListen = false;
                }
		  	});
		},
    },

    effects: {

		//判断是否从结果页出来
		*judgeIsForward({ payload },{ call, put, select }){
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				stuName     : payload.stuName,
				openid      : openid || '',
			}
			let { ret } = yield call( getPersonCenter, ( params ));
            if( ret && ret.errorCode === 9000 ) {
				if( ret.perfect === 0 ) {
					yield put(
						routerRedux.push({
							pathname : '/microvc',
							query : {
								tenantId 	: payload.tenantId,
								orgId 		: payload.orgId,
							},
						})
					);
				}else{
					yield put(
						routerRedux.push({
							pathname : '/person_center',
							query : {
								tenantId 	: payload.tenantId,
								orgId 		: payload.orgId,
							},
							state : {
								ret : ret,
								nopay : 'no_pay',
							}
						})
					)
				}
			}else{
				Toast.info( ret && ret.errorMessage || '确认列表请求失败' );
			};

			window.localStorage.removeItem( payload.stuName );
		},

        /*生成学员的扫码*/
        *createBabySignQrcode({payload}, {select, call, put}) {

            let { stuId } = payload;
            let tenantId = window.COMMON_DATA.tenantId;
            let orgId    = window.COMMON_DATA.orgId;
            let params = {
				threePartId : openid,
				parentId    : window.COMMON_DATA.parentId,
                tenantId,
				orgId,
				stuId,
            };

            let { ret } = yield call( createStuSignCode, parse(params));
            if( ret && ret.errorCode == 9000 ){
                yield put({
                    type : 'updateState',
                    payload : {
                        stuId,
						qrcode : ret.id,
                    }
                });
                yield put({
                    type : 'listenStuSignStatus',
                    payload : {
                        qrcode : ret.id,
                    }
                });
            } else {
                Toast.fail(( ret && ret.errorMessage ) || '初始化宝宝二维码出错啦!');
            }
        },

        /*轮寻监听二维码的状态*/
        *listenStuSignStatus({ payload }, { select, call, put }) {
            var sleep = function(ms) {
                return new Promise(function(resolve, reject){
                    setTimeout(function(){
                        resolve()
                    }, ms);
                });
            }

            let { qrcode } = payload;
            let tenantId = window.COMMON_DATA.tenantId;
            let orgId = window.COMMON_DATA.orgId;
            let params = {
                tenantId,
				orgId,
				id : qrcode,
            }

            let signSelfModel = yield select( state => state.signSelfModel );
            let { stuId, stuName } = signSelfModel;

            while( window.COMMON_DATA.signSelfListen ) {
                let { ret } = yield call( searchQrcodeStatus, parse( params ));
                if( ret && ret.errorCode == 9000 ){
                    let status = ret.status;
                    if( status == '2' ) {
						window.localStorage.setItem( stuName, stuName  )
                        yield put(routerRedux.push({
                            pathname : '/microResults',
                            query : {
                                tenantId : window.COMMON_DATA.tenantId,
                                orgId    : window.COMMON_DATA.orgId,
								stuName  : stuName
                            },
                            state: {
                                dataSource : {
                                    type         : '2',
                                    icon_name    : 'chenggong',
                                    resultsTitle : '签到成功',
                                    dataList : [
                                        {
                                          title: '签到信息',
                                          value:　[
                                              {
                                                    label: '宝宝姓名',
                                                    value: stuName,
                                                },
                                                {
                                                    label: '签到家长',
                                                    value: window.COMMON_DATA.wxName || '',
                                                },
                                                {
                                                    label: '签到时间',
                                                    value: ret.signTimeStr||'',
                                                }
                                          ]
                                        }
                                    ]
                                }
                            }
                        }));
                        yield put({
                            type: 'updateState',
                            payload: {
                                btnLoading: false
                            }
                        })
                    }
                }
                yield sleep(1000);
            }
        },

        /** 是否开通人脸1 */
        *hasFaceSign({ payload }, { select, call, put }){
            const params = {
                tenantId: payload.tenantId,
                orgId: payload.orgId
            }
            const { ret } = yield call(hasFaceSign, params)
            if( ret && ret.errorCode === 0 ){
                yield put({
                    type: 'hasBindFace',
                    payload
                })
            } else if(ret && ret.errorCode === 110000){
                yield put({
                    type: 'updateState',
                    payload: {
                        hasFace: false
                    }
                })
                // Toast.fail(ret && ret.errorMessage);
            } else {
                Toast.fail(( ret && ret.errorMessage ) || '检测是否绑定出错!');
            }
        },

        /** 是否开通人脸2 */
        *hasBindFace({ payload }, { select, call, put }){
            const { ret } = yield call(hasFace, payload)
            if( ret && ret.errorCode === 0 ){
                yield put({
                    type: 'updateState',
                    payload: {
                        hasFace: true
                    }
                })
            } else if(ret && ret.errorCode === 1002){
                yield put({
                    type: 'updateState',
                    payload: {
                        hasFace: false
                    }
                })
            } else {
                Toast.fail(( ret && ret.errorMessage ) || '检测是否绑定出错!');
            }
        },

        /** 获取人脸信息 */
        *getFaceInfo({ payload }, { select, call, put }){
            const { ret } = yield call(getFaceInfo, payload)
            if( ret && ret.errorCode === 0 ){
                yield put({
                    type: 'updateState',
                    payload: {
                        isBind: ret.data.isBind,
                        faceUrl: ret.data.faceUrl
                    }
                })
            } else {
                Toast.fail(( ret && ret.errorMessage ) || '获取人脸信息出错!');
            }
        },

        /** 获取家长人脸信息 */
        *getParentFaceInfo({ payload }, { select, call, put }){
            const { ret } = yield call(getParentsFace, payload)
            if( ret && ret.errorCode === 0 ){
                yield put({
                    type: 'updateState',
                    payload: {
                        parentsFace: ret.results
                    }
                })
            } else {
                Toast.fail(( ret && ret.errorMessage ) || '获取家长人脸信息出错!');
            }
        },

        /** 绑定人脸信息 */
        *bindFaceInfo({ payload }, { select, call, put }){
            Toast.loading('正在绑定', 0)
            const { ret } = yield call(bindFaceInfo, payload)
            if( ret && ret.errorCode === 0 ){
                Toast.success('绑定成功')
                yield put({
                    type: 'getFaceInfo',
                    payload: {
                        appId: '1630396076961824769',
                        tenantId: payload.tenantId,
                        orgId: payload.orgId,
                        stuId: payload.stuId
                    }}
                )
            } else {
                Toast.fail(( ret && ret.errorMessage ) || '绑定人脸信息失败!');
            }
        },

        /** 绑定家长人脸 */
        *bindParentsFace({ payload }, { select, call, put }){
            const signSelfModel = yield select(state => state.signSelfModel)
            Toast.loading('正在绑定', 0)
            const { ret } = yield call(bindParentsFace, payload)
            if( ret && ret.errorCode === 0 ){
                Toast.success('绑定成功')
                yield put({
                    type: 'getParentFaceInfo',
                    payload: {
                        appId: '1630396076961824769',
                        tenantId: payload.tenantId,
                        orgId: payload.orgId,
                        stuId: signSelfModel.stuId
                    }}
                )
            } else {
                Toast.fail(( ret && ret.errorMessage ) || '绑定人脸信息失败!');
            }
        },

        /** 上传图片 */
        *uploadImg({payload}, {select, call, put}) {
            const signSelfModel = yield select(state => state.signSelfModel)
            const params = {
                file: payload.file
            }

			const {ret} = yield call(getHeaderUrl, parse(params))
			if(ret && ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						uploadUrl : ret.data.url
					}
                })
                // 绑定, 存在家长信息绑定家长，否则绑定学员
                if(payload.parentInfo){
                    yield put({
                        type: 'bindParentsFace',
                        payload: {
                            appId: '1630396076961824769',
                            tenantId: signSelfModel.tenantId,
                            orgId: signSelfModel.orgId,
                            stuParentId: payload.parentInfo.parentId,
                            stuParentName: payload.parentInfo.parentName,
                            faceUrl: ret.data.url
                        }
                    })
                } else {
                    yield put({
                        type: 'bindFaceInfo',
                        payload: {
                            appId: '1630396076961824769',
                            tenantId: signSelfModel.tenantId,
                            orgId: signSelfModel.orgId,
                            stuId: signSelfModel.stuId,
                            stuName: signSelfModel.stuName,
                            faceUrl: ret.data.url
                        }
                    })
                }

			} else {
				Toast.fail(ret && ret.errorMessage || '上传失败')
			};
        },

        /** 获取签到按钮配置 */
        *getSignSet({payload}, {select, call, put}){
            const {ret} = yield call(getSignSet, (payload))
            if(ret && ret.errorCode == 9000) {
                yield put({
					type: 'updateState',
					payload: {
                        signStatus : ret.signStatus,
                        tabStatus: ret.tabStatus
					}
                })
            } else {
                Toast.fail(ret && ret.errorMessage || '签到配置获取失败')
            }
        },

        /** 远程签到 */
        *signOnline({payload}, {select, call, put}){
            yield put({
                type: 'updateState',
                payload: {
                    btnLoading: true
                }
            })

            const {ret} = yield call(signOnline, (payload))
            if(ret && ret.errorCode === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        visible: false
                    }
                })
                // 通过listenStuSignStatus跳转结果页
            } else {
                Toast.fail(ret && ret.errorMessage || '签到配置获取失败')
                yield put({
                    type: 'updateState',
                    payload: {
                        btnLoading: false
                    }
                })
            }
        },
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload}},
    }
}
