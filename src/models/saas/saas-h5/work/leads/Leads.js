//import {
//
//} from '../../../services/saas/freeTrialService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//名单
export default {

    namespace: 'leads',

    state: {
        dataSource : [],            //列表数据
        resultCount : 20,           //列表总条数
        pageSize : 15,               //每页条数
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/crm_leads_all') {
                    dispatch({
                        type : 'initMenu'
                    })
                }
            });
        }
    },

    effects: {
        *'initMenu'({ payload } , { put , call , select }){
            let dataSource = [];
            for(let i=0;i<15;i++){
                dataSource.push({name:i})
            }
            yield put({
                type : 'updateState',
                payload : {
                    dataSource
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
