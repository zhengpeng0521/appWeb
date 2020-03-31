//import {
//
//} from '../../../services/saas/freeTrialService';
import mockMenu from '../menu.json';         //线上拉取的菜单用于数据模拟
import { zj_menu_format } from '../../../../../../utils/arrayUtils';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪saas名单
export default {

    namespace: 'commonMenu',

    state: {
        renderMenuList : [],        //选中的常用菜单数组
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/common_menu') {
                    dispatch({
                        type : 'initMenu'
                    })
                }
            });
        }
    },

    effects: {
        *'initMenu'({ payload } , { put , call , select }){
            let allMenu = yield select(state => state.allMenu);
            let allMenuList = allMenu.allMenuList;
            yield put({
                type : 'updateState',
                payload : {
                    renderMenuList : allMenuList
                }
            })
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
