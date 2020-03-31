import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';
import {routerRedux} from 'dva/router';

export default {

    namespace: 'microCancelParticipate',

    state: {
		selectRows : [],
		data :  [{ value: 0, label: '临时有事去不了', },
				 { value: 1, label: '报错活动' },
				 { value: 2, label: '后悔了不想去了' },
				 { value: 3, label: '联系不到机构' },]
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microCancelParticipate') {
					document.title = "取消报名";
										
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					
					let link = `${window.location.origin}${window.location.pathname}?router=microWebsite&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;
					
					dispatch({
						type: 'getMicroCancelParticipate',
						payload : {
							tenantId 	: location.query.tenantId || tenantId,
							orgId 		: location.query.orgId || orgId,
							id 			: location.query.id || id,
						}
					});
										
					dispatch({
						type		: 'loadingWxShare',
						payload     : {							
							shareLink	: link,
						}
					});
              	}
		  	});
		},
    },

    effects: {
		
		*loadingWxShare({payload}, {select, call, put}) {

			setTimeout(function () {
				let share_title  = '微官网';
				let share_desc   = '微官网-取消报名';
				let share_link   = payload.shareLink;
				let share_imgUrl = window.org_cover || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad';
				let params = {share_title,share_desc,share_link,share_imgUrl,};
				weixinSign(params);
			}, 0);
		},
		
		*getMicroCancelParticipate({payload}, {select, call, put}) {
 			yield put({
				type : 'updateState',
				payload : {
					...payload,
				}
			})
		},
		
		//取消报名
		*cancel({payload}, {select, call, put}) {

			let model = yield select(state => state.microCancelParticipate);
			
			let tempStringArr = [];

			for (let idx in payload.selectRows) {

				tempStringArr.push(payload.selectRows[idx].label);
			}
			
			if(payload&&payload.why&&payload.why.length > 0) {
				tempStringArr.push(payload&&payload.why);
			}

			let paramter = {
				id			: model.id,
				tenantId 	: model.tenantId,
				orgId 		: model.orgId,
				cancleMsg 	: tempStringArr.join(','),
			}

			let {ret} = yield call(service.ownCancel, parse(paramter));
            if(ret && ret.errorCode === 9000) {				
				Toast.info('取消成功');
				yield put({
					type : 'updateState',
					payload : {
						...payload,
						selectRows : [],
						data :  [{ value: 0, label: '临时有事去不了', },
								 { value: 1, label: '报错活动' },
								 { value: 2, label: '后悔了不想去了' },
								 { value: 3, label: '联系不到机构' },]
					}
				})
				yield put(routerRedux.go(-1));
            } else {
				Toast.info(ret&&ret.errorMessage || '取消失败');
			};
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
