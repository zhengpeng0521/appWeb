import { parse } from 'qs';
import * as service from '../../../services/vote/voteGameService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'vote_person_detail',

    state: {
		errorMsgString : '',
		dataSource : {},
		gameBaseId : undefined,
		verificationCode : undefined,
		inputVerificationCode : undefined,
		playerId : undefined,
		popMask : false,
		userId : undefined,
		showShare : false,
		touchVoteButton : false,
		orgData : {},
        orgName : "",
    },

    subscriptions: {
         setup({ dispatch, history }) {
              history.listen(location => {
				  if (location.pathname === '/voteGamePersonCenter') {
					  
						function GetQueryString(name) {
							let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
							let r = window.location.search.substr(1).match(reg);
							if(r!=null)return  unescape(r[2]); return null;
						}
						let playerId = GetQueryString("playerId");
						let gameBaseId = GetQueryString("gameBaseId");
					  	let tenantId = GetQueryString("tenantId");
					  	let orgId = GetQueryString("orgId");
					  
					  	let param = {
							playerId : location.state&&location.state.playerId || playerId,
							gameBaseId : location.state&&location.state.gameBaseId || gameBaseId,
							tenantId : location.state&&location.state.tenantId || tenantId,
							orgId : location.state&&location.state.orgId || orgId,
						  }

						dispatch({
							type: 'updateState',
							payload: {
								dataSource : {},
							}
						})
					  
					  	dispatch({
							type : 'getUserData',
							payload : {
								...param
							}
						})
					  
					  	let link = `${window.location.origin}${window.location.pathname}?router=voteGamePersonCenter&gameBaseId=${gameBaseId || 	location.state&&location.state.gameBaseId}&playerId=${location.state&&location.state.playerId || playerId}&tenantId=${tenantId}&orgId=${orgId}`;

						dispatch({
							type : 'getShareInfo',
							payload : {
								gameBaseId : gameBaseId || location.state&&location.state.gameBaseId,
								link : link,
							}
						})
					  
//					  	dispatch({
//						  	type : 'getOgranData',
//							payload : {
//								...param
//							}
//					  	})
				  }

              });
         },
    },

    effects: {
		
				
		//获取机构信息
//		*getOgranData({payload}, {call, put, select}) {
//			let data_gameId = yield select(state=>state.voteGameModel);
//
//            let gameId = data_gameId.gameId;
//            payload.gameId = gameId;
//
//			let {ret} = yield call(service.getOgranData, parse(payload));
//
//			if(ret&&ret.errorCode == 9000) {
//				yield put({
//					type : 'updateState',
//					payload: {
//						orgData : ret.data,
//					}
//				})
//			} else {
//				Toast.info(ret&&ret.errorMessage || '获取校区失败');
//			}
//		},
			
		//获取分享信息
		*getShareInfo({payload}, {select, call, put}) {
						
			let paramter = {
				gameBaseId : payload.gameBaseId
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
			
		//获取用户数据
		*getUserData({payload}, {select, call, put}) {
			
			let model = yield select(state => state.vote_person_detail);
						
			let paramter = {
				playerId 	: 	payload.playerId,
				gameBaseId 	: 	payload.gameBaseId,
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				openId 		: 	openId,
			}
			
			if(payload.playerId != null) {
				let {ret} = yield call(service.queryPlayerDetails, parse(paramter));
				if(ret && ret.errorCode === 9000) {

					setParam(
						'game_load',
						payload.tenantId || '未获取',
						payload.orgId || '未获取',
						payload.gameBaseId || '未获取',
						ret.data.gameName || '未获取',
					);

					yield put({
						type: 'updateState',
						payload: {
							...payload,
							...paramter,
							playerId : payload.playerId,
							gameBaseId : paramter.gameBaseId,
							userId : ret.userId,
							dataSource : ret.data,
							errorMsgString : '',
                            orgName : ret.data.orgName,
						},
					});
				} else if(ret && ret.errorCode === 4000) {
					yield put({
						type: 'updateState',
						payload: {
							errorMsgString : ret.errorMsg,
						},
					});  
				} else {
					Toast.info(ret&&ret.errorMessage || '个人数据请求失败', 1);
				}
			}
			
		},
				
		//投票
		*voteGameDone({payload}, {select, call, put}) {
			 
			let model = yield select(state => state.vote_person_detail);

			let paramter = {
				gameBaseId : payload.gameBaseId || model.gameBaseId,
				playerId : payload.playerId,
				userId : payload.userId,
				authCode : payload.code || undefined,
			}
			
			let {ret} = yield call(service.voteGameDone, parse(paramter));
			
			if(ret && ret.errorCode === 9000) {

				var num = model.dataSource&&model.dataSource.voteNum;

				model.dataSource.voteNum = String(parseInt(num)+1);
				
				yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						popMask : false,
						touchVoteButton : false,
						dataSource : model.dataSource,
                  	},
				});
				Toast.info('投票成功', 1);
			} else if(ret && ret.errorCode === 4000) {
				yield put({
                    type: 'updateState',
                    payload: {
						popMask : true,
						playerId : payload.playerId,
						verificationCode : ret.errorMessage || undefined,
                  	},
				});		
			} else {
				yield put({
                    type: 'updateState',
                    payload: {
						touchVoteButton : false,
                  	},
				});		
				Toast.info(ret&&ret.errorMessage || '投票失败', 1);
			}
		},
			
	},
	
    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
