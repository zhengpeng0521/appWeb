import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import moment from 'moment';

export default {

    namespace: 'orderResultModel',

    state: {
        failContent: '',
        result: false,
        selectedDate: undefined,

        tenantId: undefined,
        orgId: undefined,
        stuId: undefined,
    },

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/order_result' ) {
					dispatch({
                        type: 'updateState',
                        payload: {
                            failContent: location.query.failContent,
                            result: location.query.result,
                            selectedDate: location.query.selectedDate,
                            tenantId: location.query.tenantId,
                            orgId: location.query.orgId,
                            stuId: location.query.stuId,
                        }
                    })
				}
		  	});
		},
    },

    effects: {},

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
