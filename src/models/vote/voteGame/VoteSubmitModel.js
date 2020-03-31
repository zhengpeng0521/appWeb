import { parse } from 'qs';
import * as service from '../../../services/vote/voteGameService';
import * as serviceTwo from '../../../services/common/common'
import * as uploadService from '../../../services/uploadImage/uploadImageService';
import { Toast } from 'antd-mobile';

export default {

	namespace: 'vote_submit',
	
    state: {
		gameBaseId : undefined,
		userId : undefined,
		showMask : false,
		touchType : undefined,
		showSuccess : false,
		submitDateSource : {},
		fromData : {},
		orgData : {},
		successPlayerId : undefined,
		showAgreementModal : false,
		files :  [],
		agreedStatus : true,
		ActivityIndicatorImage : false,
        pickscarea:[],
        scareas:[],

        homeDataSource:{},
        gameName:'',
    },

    subscriptions: {
         setup({ dispatch, history }) {
              history.listen(location => {
				  if (location.pathname === '/voteGameSubmit') {
					  
					  	function GetQueryString(name) {
							let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
							let r = window.location.search.substr(1).match(reg);
							if(r!=null)return  unescape(r[2]); return null;
						}
					  
					  	let tenantId = GetQueryString("tenantId");
						let orgId = GetQueryString("orgId");
					    let gameBaseId = location.state && location.state.gameBaseId || undefined;
					  	let param = {
							tenantId  : tenantId || location.state&&location.state.tenantId,
							orgId : orgId || location.state&&location.state.orgId,
				            gameBaseId : location.state&&location.state.gameBaseId || undefined,
							userId : location.state&&location.state.userId || undefined,
					  	}

                        dispatch({
						  	type : 'getInitVoteData',
					  	})

					  	dispatch({
						  	type : 'getFormData',
							payload : {  
								...param
							}
					  	})
					  
					  	dispatch({
						  	type : 'getOgranData',
							payload : {  
								...param
							}
					  	})
					  
					  	dispatch({
							type : 'getShareInfo',
							payload : {
								gameBaseId : location.state&&location.state.gameBaseId || undefined,
								link : window.location.href,
							}
						})

                        dispatch({
                            type : 'getGameFormConfig',
                            payload : {
								gameBaseId : location.state&&location.state.gameBaseId || undefined,
							}
                        })
				  	}
              }
            );
         },
    },

    effects: {    
        //游戏
        *getCodePage({payload},{select,call,put}){
//            let url = '/thinknode/weixinh5/page/attentionQrcode?gameBaseId='+
//                payload.gameBaseId+
//                '&orgId='+payload.orgId+
//                '&gameName='+payload.gameName+
//                '&name='+payload.name+
//                '&type='+payload.type;
//                window.location.href=url;
        },

		//获取vote首页信息
        *getInitVoteData({payload},{select,call,put}){
          let voteModel = yield select(state => state.voteGameModel)
          let { homeDataSource } = voteModel;
          yield put({
					type : 'updateState',
					payload: {
						homeDataSource : homeDataSource,
					}
				})
        },
		//获取分享信息
		*getShareInfo({payload}, {select, call, put}) {
						
			let paramter = {
				gameBaseId : payload.gameBaseId,
			}
			
			let {ret, err} = yield call(service.getShare, parse(paramter));

			if(ret&&ret.errorCode == 9000) {
				let share_title  = ret&&ret.data&&ret.data.wxTitle || '投票';
				let share_desc   = ret&&ret.data&&ret.data.wxCon || '投票游戏';
				let share_link   = payload.link || 'www.ishanshan.com';
				let share_imgUrl = ret&&ret.data&&ret.data.wxIcon || ''
				let params = {share_title,share_desc,share_link,share_imgUrl,};
				weixinSign(params, 'voteGame');
			}
		},
			
		*getFormData({payload}, {call, put, select}) {
			
			let param = {
				gameBaseId : payload.gameBaseId,
			}
						
			let {ret} = yield call(service.queryGameFormConfig, parse(param));
			if(ret&&ret.errorCode == 9000) {
				yield put({
					type : 'updateState',
					payload: {
						...param,
						...payload,
						fromData  : ret,
					}
				})
			} else {
				Toast.info(ret&&ret.errorMessage || '获取表单配置失败');
			}
		},
		
		//获取表单接口
		*getGameFormConfig({payload}, {call, put, select}) {
			let {ret} = yield call(service.getGameFormConfig, parse(payload));

			if(ret&&ret.errorCode == 9000) {
                let scareas = ret.data && ret.data.orgMsgList;

                scareas && scareas.length>0 && scareas.map((item,index)=>{
                    scareas[index].value =  item.orgId;
                    scareas[index].label =  item.orgName;
                })

                yield put({
					type : 'updateState',
					payload: {
						scareas : scareas,
					}
				})
			} else {
				Toast.info(ret&&ret.errorMessage || '获取校区失败');
			}
		},
		
		//图片上传
		*uploadImage({payload}, {call, put, select}) {		
			
			let model = yield select(state => state.vote_submit);
			
			let tempArr = model.files;
						
			if(payload.data&&payload.data.errorCode == 9000) {
				
				tempArr.push({url : payload.data.url});
								
				yield put({
					type : 'updateState',
					payload: {
						files : tempArr,
						ActivityIndicatorImage : false,
					}
				})
			} else {
				yield put({
					type : 'updateState',
					payload: {
						ActivityIndicatorImage : false,
					}
				})
				Toast.info(ret&&ret.errorMessage || '图片上传失败');
			}	
		},
		
		//图片文件上传
		*uploadImageFile({payload}, {call, put, select}) {
									
			let model = yield select(state => state.vote_submit);

			let tempArr = model.files;

			let  ret = yield call(uploadService.uploadImageFile, payload.file);
						
			//let {ret} = yield call(service.uploadImageFile));
						
			if(ret&&ret.errorCode === 9000) {
				
				tempArr.push({url : ret.url});
								
				yield put({
					type : 'updateState',
					payload: {
						files : tempArr,
						ActivityIndicatorImage : false,
					}
				})
			} else {
				yield put({
					type : 'updateState',
					payload: {
						ActivityIndicatorImage : false,
					}
				})
				Toast.info(ret&&ret.errorMessage || '图片上传失败');
			}			
		},
						
		//提交数据
		*submitValue({payload}, {call, put, select}) {
			let model = yield select(state => state.vote_submit);			
			let {ret} = yield call(service.voteGameApply, parse(payload.data));
			if(ret&&ret.errorCode == 9000) {
				
				setParam(
					'game_fill_after',
					model.tenantId || '未获取',
					model.orgId || '未获取',
					model.gameBaseId || '未获取',
					model.orgData&&model.orgData.gameName || '未获取',
					'填写资料后',
				);
				
				yield put({
					type : 'updateState',
					payload: {
						touchType : payload.touchType,
						showSuccess : true,
						successPlayerId : ret.data,
					}
				})
			} else {
				Toast.info(ret&&ret.errorMessage || '报名失败');
			}
		},		
	},
	
    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
