import { queryColumnList } from '../../../../services/bbs/publicModal/publicModalOne';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'publicModalOneColumnList',

    //初始化数据
    state: {
        pageIndex : 0,
        pageSize : 10,
        columnListModalOne: [],   //列表展示数据
        dataLoading : false,
        randomColor : [],
        ColumnShowToastModalOne:false,
        Over:false,    //判断数据是否展示完成，全部为true
        AllItems:'',  //数据总量，ret.data.resultCount
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/publicModalOneColumnList'||pathname === '/') {
                    dispatch({
                        type: 'queryColumnList',
                        payload:{
                            clickType : query.clickType || 'notBack'
                        }
                    });
                }
            })
        }
    },

    //put  执行一个方法
    //call 调用一个请求
    effects: {
        *'queryColumnList'({ payload }, { call, put, select }){
            yield put({ type:'showLoading' });
            let ColumnList;
            let Array;
            if(payload.clickType && payload.clickType == 'back'){
                Array = [];
            }else{
                ColumnList = yield select(state => state.publicModalOneColumnList);
                Array = ColumnList.columnListModalOne;
            }
            const { ret,error } = yield call(queryColumnList,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type:'updateState',
                    payload:{
                        AllItems:ret.data.resultCount,
                    }
                });
                for(let i=0;i<(ret.results).length;i++){
                    Array.push(ret.results[i]);
                }
                if(Array.length>=ret.data.resultCount){  //数据已全部加载完成
                    yield put({
                        type: 'updateState',
                        payload:{
                            columnListModalOne:Array,
                            Over:true,
                        }
                    });
                }else{   //数据未全部加载完成
                    yield put({
                        type: 'updateState',
                        payload:{
                            columnListModalOne:Array,
                        }
                    });
                }
                yield put({ type:'closeLoading' });
            }else{
                ret && Toast.offline(ret.errorMessage || '列表出错啦');
            }
        },

    },

    reducers: {

        showLoading(state, action) {
            return {...state, ...action.payload, ColumnShowToastModalOne : true};
        },

        closeLoading(state, action) {
            return {...state, ...action.payload, ColumnShowToastModalOne : false};
        },
        //更新状态
        updateState(state, action) {
            console.log(...action.payload);
            return { ...state, ...action.payload };
        },
    },
}
