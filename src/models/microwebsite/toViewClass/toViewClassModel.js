import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'microToViewClass',

    state: {

	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microToViewClass') {
					document.title = "查看课时";
					dispatch({
						type: 'getToViewClass',
					});
              	}
		  	});
		},
    },

    effects: {
		
		*getToViewClass({payload}, {select, call, put}) {

		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
