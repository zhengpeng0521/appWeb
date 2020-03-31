import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'productDetailModel',

    state: {
		title      : undefined,
		date       : undefined,
		imgurl     : undefined
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/product_detail' ) {
					document.title = '作品';
					dispatch({
						type : 'updateState',
						payload : {
							title  : location.query.title,
							date   : location.query.date,
							imgurl : location.query.imgurl
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
