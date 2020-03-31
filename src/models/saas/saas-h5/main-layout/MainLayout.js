//import {
//
//} from '../../../services/saas/freeTrialService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪saas首页
export default {

    namespace: 'mainLayout',

    state: {
        bthGroup : [
            { name : '首页' , key : 'main_page' },
            { name : '办公' , key : 'common_menu' },
            { name : '添加' , key : 'add' },
            { name : '消息' , key : 'message' },
            { name : '我的' , key : 'my' }
        ],              //tab组
        addGroup : [
            { name : '新增名单' , key : 'leads' , color : '#5d9cec' },
            { name : '新增学员' , key : 'stu' , color : '#8175c7' },
            { name : '新增合同' , key : 'contract' , color : '#fbb323' },
            { name : '新增退款' , key : 'refund' , color : '#88c70a' },
            { name : '新增呵呵' , key : 'hehe' , color : '#666' }
        ],     //点击加号渲染数组
        chooseKey : 'main_page',        //选中tab的key
        addMaskVisible : false,         //点击加号蒙层是否显示
        wetherClickCloseMask : false,   //是否点击关闭蒙层
        closeWaitingTime : 300,         //点击关闭蒙层等待时间
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                //用来判断当前路由来更新下来菜单
                dispatch({
                    type : 'updateBottomMenu',
                    payload : {
                        pathname
                    }
                })
                if(pathname === '/') {
                    dispatch({
                        type : 'init'
                    })
                }
            });
        }
    },

    effects: {
        //用来判断当前路由来更新下来菜单
        *'updateBottomMenu'({ payload } , { put , call , select }){
            let mainLayout = yield select(state => state.mainLayout);
            let bthGroup = mainLayout.bthGroup;
            for(let i in bthGroup){
                if('/' + bthGroup[i].key == payload.pathname){
                    yield put({
                        type : 'updateState',
                        payload : {
                            chooseKey : bthGroup[i].key
                        }
                    });
                    break;
                }
            }
        },

        *'init'({ payload } , { put , call , select }){
            let mainLayout = yield select(state => state.mainLayout);
            //默认进入首页
            yield put(routerRedux.push({
                pathname: mainLayout.chooseKey || 'main_page'
            }));
        },
        *'setTimeout'({ payload } , { put , call , select }){
            let mainLayout = yield select(state => state.mainLayout);
            let closeWaitingTime = mainLayout.closeWaitingTime;
            let sleep = function(ms) {
                return new Promise(function(resolve, reject){
                    setTimeout(function(){
                        resolve()
                    }, ms);
                });
            }
            yield put({
                type : 'updateState',
                payload : {
                    wetherClickCloseMask : true
                }
            })
            yield sleep(closeWaitingTime+100);
            yield put({
                type : 'updateState',
                payload : {
                    addMaskVisible : false,
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
