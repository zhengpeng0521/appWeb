import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'micro404',

    state: {

	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/') {
					document.title = "页面未找到";
					dispatch({
						type: 'micro404',
					});
              	}
		  	});
		},
    },

    effects: {
		
		*micro404({payload}, {select, call, put}) {

		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
