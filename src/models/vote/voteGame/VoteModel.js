import { parse } from 'qs';
import * as service from '../../../services/vote/voteGameService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'voteGameModel',

    state: {
		overStatus : false,
		searchValue : undefined,
		homeDataSource : {},
		currentUserId : undefined,
		gameBaseId : undefined,
		ListSource : [],
		ListPageData : {},
		ListIsLoading : false,
		ListIsLoadingEnd : false,
		pageIndex 	: 0,
		pageSize 	: 10,
		popMask : false,
		selectIndex : 0,
		maskName : undefined,
		playClassName 	    : 'startPlayer',
		verificationCode : undefined,
		inputVerificationCode : undefined,
		playerId : undefined,
		qrBase64 : undefined,
		touchVoteButton : false,
		rowData : undefined,
		globalDivId : undefined,
		globalButtonId : undefined,
		qrCodeUrl : undefined,
		gameId:"",
		loading : false,
		searchKey : '',
    },

    subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/voteGame') {
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					
					let gameBaseId = GetQueryString("gameBaseId");
					let userId = GetQueryString("userId");
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					
					let currentUrl = `${window.location.origin}${window.location.pathname}?router=voteGame&gameCode=vote&gameBaseId=${gameBaseId || 	location.state&&location.state.gameBaseId}&tenantId=${tenantId}&orgId=${orgId}`;
					
					let param = {
						gameBaseId : gameBaseId || location.state&&location.state.gameBaseId,
						userId : userId || location.state&&location.state.userId,
						tenantId : tenantId || location.state&&location.state.tenantId,
						orgId : orgId || location.state&&location.state.orgId,
						qrCodeUrl : currentUrl,
					}
					

					dispatch({
						type : 'queryVoteGameData',
						payload : {
							...param
						}
					})
					
					dispatch({
						type : 'getListDataSource',
						payload : {
							...param
						}
					})
					
					dispatch({
						type : 'getShareInfo',
						payload : {
							currentUrl : currentUrl,
							gameBaseId : gameBaseId || location.state&&location.state.gameBaseId,
						}
					})
				}
			});
		},
    },

    effects: {    
		
		*getShareInfo({payload}, {select, call, put}) {
								
			let paramter = {
				gameBaseId : payload.gameBaseId,
			}
			
			let {ret, err} = yield call(service.getShare, parse(paramter));
			if(ret&&ret.errorCode == 9000) {
				wx.ready(function(){
					document.getElementById('audio_cp').play();
					document.addEventListener("WeixinJSBridgeReady", function () {
						audio.play();
					}, false);
				});

				let share_title  = ret&&ret.data&&ret.data.wxTitle || '投票';
				let share_desc   = ret&&ret.data&&ret.data.wxCon || '投票游戏';
				let share_link   = payload.currentUrl || window.location.href;
				let share_imgUrl = ret&&ret.data&&ret.data.wxIcon || ''
				let params = {share_title,share_desc,share_link,share_imgUrl,};
				weixinSign(params, 'voteGame');
			}
		},
		
		//获取游戏实例首页基本信息
		*queryVoteGameData({payload}, {select, call, put}) {
						
			let model = yield select(state => state.voteGameModel);
			
			let userId = model.userId || payload.userId;
			
			let paramter = {
				gameBaseId : payload.gameBaseId,
				userId : payload.userId || model.userId,
				tenantId : payload.tenantId,
				orgId : payload.orgId,
				openId : openId,
			}

            let {ret, err} = yield call(service.queryVoteGameData, parse(paramter));

			if(ret && ret.errorCode == 9000) {
                let gameId = ret.data.gameId;
                yield put({
					type : 'updateState',
					payload:  {
						gameId,
					}
				})

				yield put({
					type : 'updateState',
					payload:  {	
						...payload,
						homeDataSource	: ret.data,
						currentUserId	: ret.userId,
						gameBaseId	 	: payload.gameBaseId,
					}
				})

				setParam(
					'game_load',
					payload.tenantId || '未获取',
					payload.orgId || '未获取',
					payload.gameBaseId || '未获取',
					ret.data.gameName || '未获取',
				);

			} else {
				Toast.info(ret&&ret.errorMessage || '获取首页数据失败');
			}
		},

		//获取列表数据
		*getListDataSource({payload}, {select, call, put}) {

			yield put({
				type : 'updateState',
				payload : {
					loading : true,
				}
			})
			let model = yield select(state => state.voteGameModel);
			let newListSource = model.ListSource || [];
			let pageIndex = model.pageIndex || 0;
			if (payload && payload.resetMark) {
				newListSource = [];
				pageIndex = 0;
			}
			if (payload && payload.loadNextPage) {
				pageIndex = ++model.pageIndex;
			}

			let paramter = {
				gameBaseId: payload && payload.gameBaseId || model.gameBaseId,
				pageIndex	: pageIndex || 0,
				pageSize	: model.pageSize || 20,
				searchKey: payload && payload.searchKey || model.searchKey,
			}
			
			let {ret} = yield call(service.queryRankingList, parse(paramter));

			if (ret && ret.errorCode == 9000) {
				if (ret.data && ret.data.resultCount > ret.data.start) {
					if (payload && payload.searchKey != '') {
						if (payload.loadNextPage) {
							ret.results && ret.results.map((item, index) => {
								newListSource.push(item);
							})
						} else {
							newListSource = ret.results;
						}
					} else {
						ret.results && ret.results.map((item, index) => {
							newListSource.push(item);
						})
					}
					yield put({
						type: 'updateState',
						payload: {
							ListSource: newListSource,
							ListPageData: ret && ret.data || {},
							ListIsLoadingEnd	: payload.ListIsLoadingEnd || false,
							ListIsLoading		: payload.ListIsLoading || false,
							pageIndex: pageIndex,
							searchKey: payload.searchKey || ''
						}
					})
				} else {
					if (ret.data && ret.data.resultCount == 0) {
						yield put({
							type: 'updateState',
							payload: {
								ListIsLoadingEnd: true,
								ListSource : []
							}
						})
					}
				}
			} else {
				Toast.info(ret&&ret.errorMessage || '列表数据请求失败');
			}
			yield put({
				type: 'updateState',
				payload: {
					loading: false,
				}
			})
		},

		// //加载下一页数据
        // *getMoreListDataSource({payload}, {select, call, put}) {
        //     let model = yield select(state => state.voteGameModel);
        //     let tempGameArr = model.ListSource;
		// 	let paramter = {
		// 		gameBaseId : payload.gameBaseId || model.gameBaseId,
		// 		pageIndex 	: ++model.pageIndex,
		// 		pageSize	: model.pageSize,
		// 	}
		
		// 	let {ret} = yield call(service.queryRankingList, parse(paramter));
		// 	if(ret && ret.errorCode === 9000) {
				
		// 		ret.results&&ret.results.map((item, index) => {
		// 			tempGameArr.push(item);
		// 		})

		// 		yield put({
        //             type: 'updateState',
        //             payload: {
		// 				...payload,
		// 				ListSource 			: tempGameArr,
		// 				ListPageData 		: ret.data,
		// 				ListIsLoading		: payload.ListIsLoading,
        //             	ListIsLoadingEnd	: payload.ListIsLoadingEnd,
		// 				pageIndex			: model.pageIndex,
        //           	},
		// 		});
		// 	} else {
		// 		Toast.info(ret&&ret.errorMessage || '列表数据请求失败');
		// 	}
		// },
				
		//投票
		*voteGameDone({payload}, {select, call, put}) {
			 
			let model = yield select(state => state.voteGameModel);
			
			let paramter = {
				gameBaseId : payload.gameBaseId || model.gameBaseId,
				userId : payload.userId || model.userId,
				playerId : payload.playerId || model.playerId,
				authCode : payload.code || undefined,
			}

			let {ret} = yield call(service.voteGameDone, parse(paramter));
			
			var operationBtn = document.getElementById(payload.btnId);	
			operationBtn.innerHTML = "投票中";		
			
			function changeButton() {
				setTimeout(function() {
					if(operationBtn) {
						operationBtn.innerHTML = "投 票";
					}
				}, 1000)
			}
			
			if(ret && ret.errorCode === 9000) {
								
				var num = document.getElementById(payload.aId);		
				
				if(num) {
					num.textContent = parseInt(num&&num.textContent)+1;
				}
				
				var voteNum = model.homeDataSource&&model.homeDataSource.voteNum;

				model.homeDataSource.voteNum = String(parseInt(voteNum)+1);
				
				yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						playerId : undefined,
						popMask : false,
						maskName : undefined,
						touchVoteButton : false,
						rowData : undefined,
						homeDataSource : model.homeDataSource,
                  	},
				});	

				changeButton();
				Toast.info('投票成功', 1);
			} else if(ret && ret.errorCode === 4000) {
				yield put({
                    type: 'updateState',
                    payload: {
						popMask : true,
						maskName : 'vcCode',
						playerId : payload.playerId,
						verificationCode : ret.errorMessage || undefined,
						rowData : payload.rowData || undefined,
						globalDivId : payload.aId,
						globalButtonId : payload.btnId,
                  	},
				});		
			} else {
				
				changeButton();
				
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
