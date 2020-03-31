import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'microBabyList',

    state: {
		babyList : [],
		vipBabyList : [],
		getHasCRM : '',
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microBabyList') {
					document.title = "宝宝列表";
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					let parentId = GetQueryString("parentId");
					
					let link = `${window.location.origin}${window.location.pathname}?router=microWebsite&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;
		
					dispatch({
						type: 'getBabyList',
						payload : {
							orgId 		: location.query.orgId || orgId,
							parentId 	: location.query.parentId || parentId,
							tenantId 	: location.query.tenantId || tenantId,
							hasCRM		: location.state.hasCRM,
							hasCrmParent: location.state.hasCrmParent,
							shareLink	: link,
							orgCover	: location.state.orgCover || '',
							orgName		: location.state.orgName || '',
						}
					});
              	}
		  	});
		},
    },

    effects: {
		
		*getBabyList({payload}, {select, call, put}) {
	
			let paramter = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				parentId 	: payload.parentId,
				hasCRM		: payload.hasCRM,
				hasCrmParent: payload.hasCrmParent,
			}
			
			let {ret} = yield call(service.getBabyList, parse(paramter));

            if(ret && ret.errorCode === 9000) {				
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						babyList 	: ret.outStus,
						vipBabyList : ret.cardStus,
						getHasCRM	: payload.hasCRM,
					},
				});
				setTimeout(function () {
					let share_title  = payload.orgName || '微官网';
					let share_desc   = `${payload.orgName || '微官网'}--宝宝列表`;
					let share_link   = payload.shareLink;
					let share_imgUrl = payload.orgCover;
					let params = {share_title,share_desc,share_link,share_imgUrl,};
					weixinSign(params);
				}, 0);
            } else {
				Toast.info(ret&&ret.errorMessage || '宝宝列表请求失败');
			};			
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
