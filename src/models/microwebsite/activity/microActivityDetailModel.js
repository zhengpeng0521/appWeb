import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import {routerRedux} from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'microActivityDetail',

    state: {
        activitySource      : {}, // 所有数据
		dataSource			: {}, // 个人数据
		showModal			: false,
		activityOver		: false,
    },

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microActivityDetail') {
					document.title = "活动详情";
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					let actId = GetQueryString("actId");
					let link = `${window.location.origin}${window.location.pathname}?router=microActivityDetail&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}&actId=${actId || location.query.actId}`;
					dispatch({
						type: 'getmicroActivityDetail',
						payload : {
							tenantId 		: location.query.tenantId || tenantId,
							orgId 			: location.query.orgId || orgId,
							activityId 		: location.query.actId || actId,
							shareLink		: link,
						}
					});
              	}
		  	});
		},
    },

    effects: {
		
		//获取个人信息
		*getPersonInfo({payload}, {select, call, put}) {
			
			let model = yield select (state => state.microActivityDetail);
			let paramter = {
				tenantId 	: payload&&payload.tenantId,
				orgId 		: payload&&payload.orgId,
				openid 		: openid,
			}
			let person = yield call(service.getPersonCenter, parse(paramter));
            if(person.ret && person.ret.errorCode === 9000) {		
				if(person.ret&&person.ret.perfect === 0) {
					yield put(
						routerRedux.push({
							pathname : '/microvc',
							query : {
								tenantId 		: payload&&payload.tenantId,
								orgId 			: payload&&payload.orgId,
								routerSource	: 'microActivityDetail',
							},
						})
					);
				} else {

					let parameters = {
						tenantId: payload && payload.tenantId,
						orgId: payload && payload.orgId,
						actId: model.activityId,
						nowState: 2,
						hasCRM: person.ret.hasCRM,
						hasCrmParent: person.ret.hasCrmParent,
						isVipActivity: '2',
						parentId: person.ret.id,
					}

					//查看活动
					if(payload.reviewActivity) {
						yield put(
							routerRedux.push({
								pathname: '/microPersonMyactivity',
								query: {
									orgId: person && person.ret && person.ret.orgId || '',
									tenantId: person && person.ret && person.ret.tenantId || '',
									parentId: person && person.ret && person.ret.id || '',
								},
								state: {
									orgName: person && person.ret && person.ret.orgName || '',
								}
							})
						)

					} else {
						yield put(
							routerRedux.push({
								pathname : '/microConfirmAvtivity',
								query:  {
									...parameters
								},
								state : {
									pay_money: model.activitySource.payAmount|| 0,
								}
							})
						)	
					}
				}
            } else {
				Toast.info(ret&&ret.errorMessage || '确认列表请求失败');
			}
		},

		//获取活动详情
		*getmicroActivityDetail({payload}, {select, call, put}) {
		
            let paramter = {
                actId 		: payload&&payload.activityId,
                orgId 		: payload&&payload.orgId,
                tenantId 	: payload&&payload.tenantId,
            }

            let {ret} = yield call(service.getActivityDetail, parse(paramter));
            if(ret&&ret.errorCode == 9000) {
                yield put({
                    type : 'updateState',
                    payload : {
						...payload,
						activityOver : false,
                        activitySource : ret || {},
                    }
				})
				
				let paramaterData = ret;
				// let imageArr = paramaterData.detailPic && paramaterData.detailPic.length > 0
				// ? paramaterData.detailPic.split(',') : (paramaterData.actBanner && paramaterData.actBanner.split(',') || []);

				setTimeout(function () {
					let share_title = (paramaterData.shareTitle || paramaterData.name) || '微官网';
					let share_desc = `${paramaterData.shareInfo || '微官网'}`;
					let share_link   = payload.shareLink;
					let share_imgUrl = `${paramaterData.shareCover || ''}!s300` || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
					let params = {share_title,share_desc,share_link,share_imgUrl,};
					weixinSign(params);
				}, 0);	
				
				sa.track("mic_site_a_load", {
					_tenantId: payload && payload.tenantId || '未获取',
					_orgId: payload && payload.orgId || '未获取',
					_wxId: openid || '未获取',
					_micSiteAName: ret && ret.name || '未获取',
				});

            } else {
				if (ret && ret.errorMessage == '该校区没有该活动' && ret.errorCode == 5000) {
					yield put({
						type : 'updateState',
						payload : {
							activityOver : true,
						}
					})
				} else {
					Toast.info(ret&&ret.errorMessage || '获取活动详情失败');
				}
            }
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
