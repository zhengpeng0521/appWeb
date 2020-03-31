import { queryTopicList } from '../../../../services/bbs/publicModal/publicModalOne';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'publicModalOneTopicList',

    //初始化数据
    state: {
        pageIndex : 0,
        pageSize : 10,
        topicListModalOne: [],   //列表展示数据
        dataLoading : false,
        randomColor : '',  //用于'rgb('+randomColor+')'中的颜色字符串
        columnId:'',
        columnTitle:'',      //每个主题所在的的栏目标题
        topicTitle:'',     //主题标题
        TopicShowToastModalOne:false,   //显示是否加载状态
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/publicModalOneTopicList') {
                    dispatch({
                        type: 'updateState',
                        payload:{
                            columnTitle:query.title,
                        }
                    });
                    dispatch({
                        type: 'queryTopicList',
                        payload:{
                            id:query.id,
                            ColorArray:query.ColorArray,
                        }
                    });
                }
            })
        }
    },

    //put  执行一个方法
    //call 调用一个请求
    effects: {
        *'queryTopicList'({ payload }, { call, put, select }){
            yield put({ type:'showLoading' });
            let publicModalOneTopicList = yield select(state => state.publicModalOneTopicList);
            const { ret,error } = yield call(queryTopicList,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload:{
                        randomColor:'rgb('+payload.ColorArray+')',
                        topicListModalOne:ret.results,
                    }
                });
                yield put({ type:'closeLoading' });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
                yield put({ type:'closeLoading' });
            }
        },
    },

    reducers: {

        showLoading(state, action) {
            return {...state, ...action.payload, TopicShowToastModalOne : true};
        },

        closeLoading(state, action) {
            return {...state, ...action.payload, TopicShowToastModalOne : false};
        },

        //更新查询框的频道列表
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
}
