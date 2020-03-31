import { parse } from 'qs';
import * as service from '../../../services/weixin/microActivityService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'animation',

    state: {
		newClassName : '',
    },

    subscriptions: {
         setup({ dispatch, history }) {
              history.listen(location => {
                  if (location.pathname === '/animation') {
					  
				  }
              });
         },
    },

    effects: {

	},
	
    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
