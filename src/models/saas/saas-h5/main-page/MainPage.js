//import {
//
//} from '../../../services/saas/freeTrialService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪saas首页
export default {

    namespace: 'mainPage',

    state: {

    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                if(pathname === '/main_page') {

                }
            });
        }
    },

    effects: {

    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
