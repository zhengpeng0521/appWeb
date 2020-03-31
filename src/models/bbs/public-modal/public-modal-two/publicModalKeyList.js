import { queryKeyList, SearchKeyOrComment } from '../../../../services/bbs/publicModal/publicModalTwo';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'publicModalTwoKeyList',

    //初始化数据
    state: {
        keyListModalTow:[],  //关键词列表数据
        titleContent:[],   //标题栏图片和标题
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/publicModaTwoKeyList'||pathname === '/') {
                    dispatch({
                        type: 'queryKeyList',
                    });
                }
            })
        }
    },

    //put  执行一个方法
    //call 调用一个请求
    effects: {
        *'queryKeyList'({ payload }, { call, put, select }){
            let publicModalOneTopicList = yield select(state => state.publicModalOneTopicList);
            const { ret,error } = yield call(queryKeyList,parse(payload));
            if (ret && ret.errorCode === 9000) {
                console.log('modals queryKeyList',ret.results);
                yield put({
                    type: 'updateState',
                    payload:{
                        keyListModalTow:ret.results,
                        titleContent:ret.data.titlePic,
                    }
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },
        *'SearchKeyOrComment'({ payload }, { call, put, select }){
            console.log('modals ',payload);
            const { ret,error } = yield call(SearchKeyOrComment,parse(payload));
            if (ret && ret.errorCode === 9000) {
                console.log('modals SearchKeyOrComment',ret.results);
                yield put({
                    type: 'updateState',
                    payload:{
                        keyListModalTow:ret.results,
                    }
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },
    },

    reducers: {

        showLoading(state, action) {
            return {...state, ...action.payload };
        },

        closeLoading(state, action) {
            return {...state, ...action.payload };
        },

        //更新查询框的频道列表
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
}
