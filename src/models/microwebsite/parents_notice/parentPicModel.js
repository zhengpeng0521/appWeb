import {

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'parentPicModel',

    state: {
		picArrs : [],
		index   : 0,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/parent_pic' ) {
					document.title = '图片详情';
					dispatch({
						type : 'updateState',
						payload : {
							picArrs : location.state.arrs,
							index   : location.state.index
						}
					})
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
