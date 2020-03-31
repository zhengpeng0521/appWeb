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

    namespace: 'allMenu',

    state: {
        allMenuList : [],           //所有菜单数组
        visible : false,            //此页面是否显示
        time : 200,                 //页面打开与关闭时间(ms)
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/all_menu') {
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
                    allMenuList : allMenuList.length == 0 ? zj_menu_format(mockMenu) : allMenuList,
                    visible : true
                }
            })
        },

        //点击返回
        *'Back'({ payload } , { put , call , select }){
            let allMenu = yield select(state => state.allMenu);
            let time = allMenu.time;
            yield put({
                type : 'updateState',
                payload : {
                    visible : false
                }
            })
            //index.js中定义window.COMMON_SLEEP方法
            yield COMMON_SLEEP(time + 100);
            yield put(routerRedux.push({
                pathname: 'common_menu'
            }));
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
