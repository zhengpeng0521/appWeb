import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import {routerRedux} from 'dva/router';

import { Toast } from 'antd-mobile';

export default {

    namespace: 'microPersonCenter',

    state: {
		dataSource : {},
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microPersonCenter') {
					document.title = "个人中心";
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					
					let link = `${window.location.origin}${window.location.pathname}?router=microWebsite&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;
					dispatch({
						type: 'getPersonCenter',
						payload : {
							orgId 		: location.query.orgId || orgId, 	
							tenantId 	: location.query.tenantId || tenantId,
							shareLink	: link,
						}
					});
              	}
		  	});
		},
    },

    effects: {
			
		*getPersonCenter({payload}, {select, call, put}) {			
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				openid 		: openid,
			}
			
			let {ret} = yield call(service.getPersonCenter, parse(paramter));

            if(ret && ret.errorCode === 9000) {				
				if(ret&&ret.perfect === 0) {
					yield put(
						routerRedux.push({
							pathname : '/microvc',
							query : {
								tenantId 	: payload.tenantId,
								orgId 		: payload.orgId,
							},
						})
					);
				} else {
					yield put({
						type: 'updateState',
						payload: {
							...payload,
							dataSource 	: ret,
						},
					});
                    window.COMMON_DATA.wxName = ret.wxName;
					
					let paramaterData = ret;
					let imageArr = paramaterData.orgCover&&paramaterData.orgCover.split(',');
					setTimeout(function () {
						let share_title  = paramaterData.orgName || '微官网';
						let share_desc   = `${share_title || '微官网'} -- 个人中心`;
						let share_link   = payload.shareLink;
						let share_imgUrl = imageArr&&imageArr.length > 0 ? `${imageArr[0]}!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
						let params = {share_title,share_desc,share_link,share_imgUrl,};
						weixinSign(params);
						window.org_cover = share_imgUrl;
					}, 0);	
				}
				
            } else {
				Toast.info(ret&&ret.errorMessage || '确认列表请求失败');
			};
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
