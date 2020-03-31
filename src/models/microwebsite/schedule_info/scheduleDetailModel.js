import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

    namespace: 'scheduleDetailModel',

    state: {
		item             : {},
		status           : undefined,
        loading          : false,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/schedule_detail' ) {
					document.title = '课表详情';
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if( r != null )return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString('tenantId');
					let orgId    = GetQueryString('orgId');

					let link = `${ window.location.origin }${ window.location.pathname }?router=microWebsite&tenantId=${ tenantId }&orgId=${ orgId || location.query.orgId }`;

					dispatch({
						type: 'updateState',
						payload : {
							item	: location.state && location.state.item || {},
							status  : location.state && location.state.status || '暂无'
						}
					});
              	}
		  	});
		},
    },

    effects: {

	},

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
