import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'personMyactivityModel',

    state: {
        myactivitySourceArr 	: [],
        myactivitySourcePage	: {},
        isLoadingEnd            : false,        //是否加载完毕
        isLoading               : false,        //加载状态
        pageSize                : 10,
        pageIndex               : 0,
    },

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microPersonMyactivity') {
					document.title = "我的活动";
					
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let parentId = GetQueryString("parentId");
					let orgId = GetQueryString("orgId");
										
					let link = `${window.location.origin}${window.location.pathname}?router=microWebsite&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;
					
					dispatch({
						type: 'getmyActivitys',
						payload : {
							orgId 		: location.query&&location.query.orgId || orgId,
							tenantId 	: location.query&&location.query.tenantId || tenantId,
							parentId	: location.query&&location.query.parentId || parentId,
							orgCover	: location.state&&location.state.orgCover || '',
							orgName		: location.state&&location.state.orgName || '',
							shareLink	: link,
						}
					});

					if (location.state == undefined || location.state.noPay == undefined ) {
						dispatch({
							type: 'getPersonInfo',
							payload: {
								orgId		: location.query&&location.query.orgId || orgId,
								tenantId	: location.query&&location.query.tenantId || tenantId,
								parentId	: location.query&&location.query.parentId || parentId,
								shareLink	: link,
							}
						});
					} 
              	}
		  	});
		},
    },

    effects: {

		//只有支付后调到这个界面的时候会调用
		*getPersonInfo({payload}, {select, call, put}) {
			let params = {
				tenantId: payload.tenantId,
				orgId: payload.orgId,
				openid: openid || ''
			}

			let { ret } = yield call(service.getPersonCenter, (params));

			if (ret && ret.errorCode === 9000) {
				setTimeout(function () {
					let share_title = ret&&ret.orgName || '微官网';
					let share_desc = `${ret&&ret.orgName || '微官网'} -- 主页`;
					let share_link = payload.shareLink;
					let share_imgUrl = ret&&ret.orgCover || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
					let params = { share_title, share_desc, share_link, share_imgUrl, };
					weixinSign(params);
				}, 0);

			} else {
				setTimeout(function () {
					let share_title = '微官网';
					let share_desc = '微官网 -- 主页';
					let share_link = payload.shareLink;
					let share_imgUrl = 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
					let params = { share_title, share_desc, share_link, share_imgUrl, };
					weixinSign(params);
				}, 0);
			}
		},

		*getmyActivitys({payload}, {select, call, put}) {
			
            let data = yield select(state => state.personMyactivityModel);
			data.pageIndex = 0;
            let paramter = {
                tenantId 	: payload.tenantId,
                orgId 		: payload.orgId,
                parentId 	: payload.parentId,
                pageSize 	: 10,
                pageIndex 	: 0,
            }

            let {ret} = yield call(service.getmyActivitys, parse(paramter));

            if(ret&&ret.errorCode == 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        ...payload,
                        myactivitySourceArr : ret.results || [],
                        myactivitySourcePage : ret.data || {},
                    }
                })
				setTimeout(function () {
					let share_title  = payload.orgName || '微官网';
					let share_desc   = `${payload.orgName || '微官网'} -- 主页`;
					let share_link   = payload.shareLink;
					let share_imgUrl = payload.orgCover || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
					let params = {share_title,share_desc,share_link,share_imgUrl,};
					weixinSign(params);
				}, 0);	
            }else{
                Toast.info(ret&&ret.errorMessage || '请求数据失败');
            }
		},

        *getMoremyActivitys({payload}, {select, call, put}) {
			
            let data = yield select(state => state.personMyactivityModel);
		
			let paramter = {
				  parentId  : data.parentId,
				  tenantId  : data.tenantId,
				  orgId     : data.orgId,
				  pageSize  : data.pageSize,
				  pageIndex : ++data.pageIndex,
			 }
	
			let tempA = data.myactivitySourceArr;
			
			let {ret} = yield call(service.getmyActivitys, parse(paramter));

			 if(ret&&ret.errorCode == 9000){
				for(let idx in ret.results) {
					tempA.push(ret.results[idx]);
				}
				yield put({
					type : 'updateState',
					payload : {
						myactivitySourceArr     : tempA,
						myactivitySourcePage    : ret.data,
						isLoading               : payload.isLoading,
						isLoadingEnd            : payload.isLoadingEnd,
					}
				})
            } else {
                Toast.info(ret&&ret.errorMessage || '加载失败');
            }
		},

		//从新支付
		*requistPay({ payload }, { select, call, put }) {

			let paramter = {
				joinListId: payload.data && payload.data.id,
			}
			let { ret } = yield call(service.getRequistPay, parse(paramter));
			if (ret && ret.errorCode == 9000) {
				window.location.href = ret.data;
			} else {
				Toast.info(ret && ret.errorMessage || '请求失败');
			}
		}
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
