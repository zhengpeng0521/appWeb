import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';
import {routerRedux} from 'dva/router';

export default {

    namespace: 'microResults',

    state: {
        dataSource : [],
		stuName    : undefined,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microResults') {
					document.title = "结果页面" ;

					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");

					dispatch({
						type: 'getResults',
						payload : {
							orgId 			: location.query.orgId || orgId,
							tenantId 		: location.query.tenantId || tenantId,
							stuName         : location.query.stuName,
							type 			: location.query.type || undefined, 
							dataSource		: location.state&&location.state.dataSource || [],
						},
					});
              	}
		  	});
		},
    },

    effects: {
		
		*getResults({payload}, {select, call, put}) {			
			yield put({
				type : 'updateState',
				payload : {
					...payload
				},
			});	
		},

		*goPersonCenterunction({ payload },{ call, put, select }){
			window.localStorage.removeItem( payload.stuName )
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				openid      : openid || ''
			}
			let { ret } = yield call( service.getPersonCenter, ( params ));
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
		}
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
