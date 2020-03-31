import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

    namespace: 'microwebsite',

    state: {
		visshow                 : true,		//显示轮播动画
		defaultTabValue 		: "0",			//默认选中的tabs
		orgDataSource			: {},			//主页数据源
		configSource			: {},			//配置数据
		bannerList 				: [],			//banner数据
		activityList 			: [],           //活动数据源数据源
		activityPage			: {},			//活动分页数据
		courseList 				: [],           //课程数据源数据源
		coursePage 				: {},           //课程分页数据
		gameList 				: [],           //游戏数据源数据源
		gamePage 				: {},           //游戏分页数据
		gameProverList			: [],			//游戏prover数据
		liveList: [], // 直播列表
		livePage: {}, // 直播分页
		showAllContentString 	: false,		//是否显示所有介绍
		courseIsLoading         : false,        //课程加载状态
        courseIsLoadingEnd      : false,        //课程是否加载完毕
		activityIsLoading       : false,        //活动加载状态
        activityIsLoadingEnd    : false,        //活动是否加载完毕
		gameIsLoading       	: false,        //游戏加载状态
				gameIsLoadingEnd    	: false,        //游戏是否加载完毕
		liveLoading: false, // 直播加载
		liveLoadingEnd: false, // 直播是否加载完毕
		showBigAlbum			: false,		//是否显示环境图片预览
		showBigTeacher			: false,		//显示老师预览
		pageIndex 				: 0,
		pageSize 				: 20,
		selectBigAlbumIndex		: 0,
		selectTeacherIndex		: 0,
		recordTenantId			: undefined,
		recordOrgId				: undefined,
		recordScrollTop			: 0,
		recordIsPush			: false,

		officialShow: 1,
		qrVisible: false, // 公众号弹窗
		firstIn: '1', // 收藏遮罩显示，1显示，0隐藏
		officialAccount: 'show', // 公众号模块
		oaInfo: {}, // 关注公众号信息

		isFirst: true, // 第一次进入页面
    },

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microWebsite') {
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					let link = `${window.location.origin}${window.location.pathname}?router=microWebsite&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;
					let redirect = location.query.redirect || GetQueryString("redirect")

					let firstIn = localStorage.getItem('ss_collect_first')
					let officialAccount = localStorage.getItem('ss_officialAccount')

					dispatch({
						type: 'updateState',
						payload : {
							showBigAlbum : false,
							showBigTeacher : false,
							firstIn: firstIn || '1',
							officialAccount: officialAccount || 'show'
						}
					})
					localStorage.setItem('ss_collect_first', '0')

					dispatch({
						type: 'initData',
						payload: {
							tenantId,
							orgId,
							link,
							redirect,
							location
						}
					})
				}
		  	});
		},
    },

    effects: {
			// 初始化页面
			*initData({payload}, {select, call, put}){
				let {
					tenantId,
					orgId,
					link,
					redirect,
					location
				} = payload

				let webState = yield select(state => state.microwebsite)

				if(webState.isFirst && redirect && redirect === 'personCenter'){
					yield put({
						type : 'touchPersonIconFunction',
						payload : {
							orgId: location.query.orgId || orgId,
							tenantId: location.query.tenantId || tenantId,
						}
					})

					return
				}

				yield put({
					type		: 'getMicroWebsite',
					payload     : {
						tenantId 	: location.query.tenantId || tenantId,
						orgId 		: location.query.orgId || orgId,
						shareLink	: link,
					}
				});

				yield put({
					type		: 'getCourseList',
					payload     : {
						tenantId 	: location.query.tenantId || tenantId,
						orgId 		: location.query.orgId || orgId,
					}
				});

				yield put({
					type		: 'getActivityList',
					payload     : {
						tenantId 	: location.query.tenantId || tenantId,
						orgId 		: location.query.orgId || orgId,
					}
				});

				yield put({
					type		: 'getGameProverList',
					payload     : {
						tenantId 	: location.query.tenantId || tenantId,
						orgId 		: location.query.orgId || orgId,
					}
				});

				yield put({
					type		: 'getLiveList',
					payload     : {
						tenantId 	: location.query.tenantId || tenantId,
						orgId 		: location.query.orgId || orgId,
					}
				});
			},

		//获取主页数据
		*getMicroWebsite({payload}, {select, call, put}) {

			_hmt.push(['_trackEvent', '微官网进入机构首页', `机构ID=${payload.orgId || '未获取'}`, '-']);

			sa.track("mic_site_load", {
				_tenantId	: payload.tenantId || '未获取',
				_orgId		: payload.orgId || '未获取',
				_wxId		: openid || '未获取',
			});

			let paramter = {
				tenantId : payload.tenantId,
				orgId 	 : payload.orgId,
			}

			//请求界面配置数据
			let configData = yield call(service.queryConfig, parse(paramter));
            if(configData.ret && configData.ret.errorCode === 9000) {
							let officialShow = 1
							configData.ret.results.menuConfig && configData.ret.results.menuConfig.forEach(item => {
								if(item.name === 'officialAcc'){
									officialShow = item.show
								}
							})

                yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						configSource : configData.ret.results || {},
						officialShow
                  	},
				});
            } else {
				Toast.info(configData.ret&&configData.ret.errorMessage || '配置数据请求失败');
			};
			
			//请求banner数据
			let bannerData = yield call(service.queryBanner, parse(paramter));
            if(bannerData.ret && bannerData.ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						bannerList : bannerData.ret.results || [],
                  	},
				});
            } else {
				Toast.info(bannerData.ret&&bannerData.ret.errorMessage || 'banner数据请求失败');
			};

			//请求机构数据
			let homeData = yield call(service.queryOrg, parse(paramter));
            if(homeData.ret && homeData.ret.errorCode === 9000) {
				
				document.title = homeData.ret.data&&homeData.ret.data.orgName || '首页';
				let oaInfo = homeData.ret.data.oaInfo ? JSON.parse(homeData.ret.data.oaInfo) : {}
                yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						recordTenantId	: payload.tenantId,
						recordOrgId		: payload.orgId,
						orgDataSource 	: homeData.ret&&homeData.ret.data || [],
						oaInfo
                  	},
				});
				
				let paramaterData = homeData.ret.data;
				
				setTimeout(function () {
					let share_title  = paramaterData&&paramaterData.orgName || '微官网';
					let share_desc   = `${paramaterData&&paramaterData.orgName || '微官网'}--主页`;
					let share_link   = payload.shareLink;
					let share_imgUrl = paramaterData&&paramaterData.orgAlbum&&paramaterData.orgAlbum.length>0&&paramaterData.orgAlbum[0] || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad';
					let params = {share_title,share_desc,share_link,share_imgUrl,};
					weixinSign(params);
				}, 0);
            } else {
				Toast.info(homeData.ret&&homeData.ret.errorMessage || '首页数据请求失败');
			};
		},
		
		//获取课程数据
		*getCourseList({payload}, {select, call, put}) {
			
			let model = yield select(state => state.microwebsite);
			model.pageIndex = 0;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: 0,
				pageSize	: 20,
				status 		: 1,
			}
			let {ret} = yield call(service.getCourseList, parse(paramter));
			if(ret && ret.errorCode === 9000) {
				  yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						courseList : ret.results || [],
						coursePage : ret.data || {},
                  	},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '课程列表请求失败');
			}
		},

		//加载下一页数据
        *getMoreCourseList({payload}, {select, call, put}) {
            let model = yield select(state => state.microwebsite);
            let tempCourseArr = model.courseList;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: ++model.pageIndex,
				pageSize	: model.pageSize,
			}
		
			let {ret} = yield call(service.getCourseList, parse(paramter));
			if(ret && ret.errorCode === 9000) {
				
				ret.results&&ret.results.map((item, index) => {
					tempCourseArr.push(item);
				})

				  yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						courseList 			: tempCourseArr || [],
						coursePage 			: ret.data || {},
						courseIsLoading		: payload.activityIsLoading,
                    	courseIsLoadingEnd	: payload.activityIsLoadingEnd,
						pageIndex			: model.pageIndex,
                  	},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '课程列表请求失败');
			}
		},
			
		//获取活动数据
		*getActivityList({payload}, {select, call, put}) {
			let model = yield select(state => state.microwebsite);
			model.pageIndex = 0;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: 0,
				pageSize	: 20,
				status 		: 1,
			}
			let {ret} = yield call(service.getActivityList, parse(paramter));
			if(ret && ret.errorCode === 9000) {
				  yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						activityList : ret.results,
						activityPage : ret.data,
                  	},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '活动列表请求失败');
			}
		},

		//加载下一页数据
        *getMoreActivityList({payload}, {select, call, put}) {
            let model = yield select(state => state.microwebsite);
            let tempActivityArr = model.activityList;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: ++model.pageIndex,
				pageSize	: model.pageSize,
			}
		
			let {ret} = yield call(service.getActivityList, parse(paramter));
			if(ret && ret.errorCode === 9000) {
				
				ret.results&&ret.results.map((item, index) => {
					tempActivityArr.push(item);
				})

				  yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						activityList 			: tempActivityArr,
						activityPage 			: ret.data,
						activityIsLoading		: payload.activityIsLoading,
                    	activityIsLoadingEnd	: payload.activityIsLoadingEnd,
						pageIndex				: model.pageIndex,
                  	},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '活动列表请求失败');
			}
		},

		// 获取直播列表
		*getLiveList({payload}, {select, call, put}) {
			let model = yield select(state => state.microwebsite);
			model.pageIndex = 0;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: 0,
				pageSize	: 20,
			}
			let {ret} = yield call(service.queryLiveList, parse(paramter));
			if(ret && ret.errorCode === 0) {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						liveList : ret.results || [],
						livePage : ret.data || {},
					},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '直播列表请求失败');
			}
		},
		//加载下一页数据
		*getMoreLiveList({payload}, {select, call, put}) {
			let model = yield select(state => state.microwebsite);
			let tempLiveArr = model.liveList;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: ++model.pageIndex,
				pageSize	: model.pageSize,
			}

			let {ret} = yield call(service.queryLiveList, parse(paramter));
			if(ret && ret.errorCode === 0) {

				ret.results && ret.results.map((item, index) => {
					tempLiveArr.push(item);
				})

				yield put({
					type: 'updateState',
					payload: {
						...payload,
						liveList 			: tempLiveArr,
						livePage 			: ret.data || {},
						liveLoading		: payload.liveLoading,
						liveLoadingEnd	: payload.liveLoadingEnd,
						pageIndex				: model.pageIndex,
					},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '直播列表请求失败');
			}
		},
		
		//获取游戏数据
		*getGameList({payload}, {select, call, put}) {
			let model = yield select(state => state.microwebsite);
			model.pageIndex = 0;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: 0,
				pageSize	: 20,
				status 		: 1,
			}
			let {ret} = yield call(service.getGameList, parse(paramter));
			if(ret && ret.errorCode === 9000) {
				yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						gameList : ret.results,
						gamePage : ret.data,
                  	},
				});
				yield put({
                    type: 'getGameProverList',
					payload : {
						tenantId 	: payload.tenantId,
						orgId 		: payload.orgId,
					}
				});

			} else {
				Toast.info(ret&&ret.errorMessage || '游戏列表请求失败');
			}
		},
			
		//加载下一页数据
        *getMoreGameList({payload}, {select, call, put}) {
            let model = yield select(state => state.microwebsite);
            let tempGameArr = model.gameList;
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				pageIndex 	: ++model.pageIndex,
				pageSize	: model.pageSize,
			}

			let {ret} = yield call(service.getGameList, parse(paramter));
			if(ret && ret.errorCode === 9000) {
				ret.results&&ret.results.map((item, index) => {
					tempGameArr.push(item);
				})

				  yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						gameList 			: tempGameArr,
						gamePage 			: ret.data,
						gameIsLoading		: payload.gameIsLoading,
                    	gameIsLoadingEnd	: payload.gameIsLoadingEnd,
						pageIndex			: model.pageIndex,
                  	},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '游戏列表请求失败');
			}
		},		
			
		//获取游戏prover
		// *getGameProverList({payload}, {select, call, put}) {
		// 	let model = yield select(state => state.microwebsite);
		// 	let paramter = {
		// 		tenantId 	: payload.tenantId,
		// 		orgId 		: payload.orgId,
		// 	}
		// 	let {ret} = yield call(service.getGameProverList, parse(paramter));
		// 	if(ret && ret.errorCode === 9000) {
		// 		  yield put({
    //                 type: 'updateState',
    //                 payload: {
		// 				...payload,
		// 				gameProverList : ret&&ret.results,
    //               	},
		// 		});
		// 	} else {
		// 		Toast.info(ret&&ret.errorMessage || '游戏prover请求失败');
		// 	}
		// },
			
		*getgameAction({payload}, {select, call, put}) {
			let {ret} = yield call(service.getGameAction, parse(payload));
			if(ret && ret.errorCode === 9000) {
				window.location.href = ret.data.url || 'www.ishanshan.com';	
			} else {
				Toast.info(ret&&ret.errorMessage || '游戏Action请求失败');
			}
		},
			
		*touchPersonIconFunction({ payload },{ call, put, select }){
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				openid      : openid || ''
			}
			let { ret } = yield call( service.getPersonCenter, ( params ));
      if( ret && ret.errorCode === 9000 ) {
				yield put({
					type: 'updateState',
					payload: {
						isFirst: false
					}
				})
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
		}
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
