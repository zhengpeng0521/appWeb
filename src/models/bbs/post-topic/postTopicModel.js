import {
    queryPostTopicList,
} from '../../../services/bbs/postTopicService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//主题管理
export default {

  namespace: 'postTopicModel',

  state: {
      listLoading: false,
      keyWord: '',
      topicList: [],
      hasMore: false,
      inteligentId: '',// 达人编号
      pageIndex: 0,
      pageSize: 5,
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/') {
                  document.title = '精选专题';
                  dispatch({
                    type: 'queryPostTopicList',
                    payload: {
                        inteligentId: query.inteligentId || ''
                    }
                  });
                  dispatch({
                    type: 'weixinSign',
                    payload: {
                    }
                  });
              }
          });
      }
  },

  effects: {

      //查询专题列表
      *queryPostTopicList({ payload }, { call, put, select }) {
          yield put({
              type: 'updateState',
              payload : {
                  listLoading: true
              }
          });

          let postTopicModel = yield select(state => state.postTopicModel);

          let keyWord = payload.keyWord || postTopicModel.keyWord;
          let inteligentId = payload.inteligentId || postTopicModel.inteligentId;
          let pageIndex = payload.pageIndex || postTopicModel.pageIndex;
          let pageSize = payload.pageSize || postTopicModel.pageSize;
          let params = {
              keyWord,pageIndex,pageSize,inteligentId,
          };
          let { ret } = yield call(queryPostTopicList, parse(params));
          if (ret && ret.errorCode === 9000) {
              yield put({
                  type: 'updateState',
                  payload : {
                      ...params,
                      topicList: ret.results,
                      listLoading: false,
                      hasMore: ret.data.resultCount > pageSize,
                  }
              });
          } else {
              ret && Toast.offline(ret.errorMessage || '查询专题列表出错啦');
              yield put({
                  type: 'updateState',
                  payload : {
                      listLoading: false
                  }
              });
          }
      },

      *weixinSign({ payload }, { call, put }) {

        let share_title  = '专题精选';
        let share_desc   = '闪闪专题列车，正向您驶来';
        let share_link   = location.href;
        let share_imgUrl = 'http://115.29.172.104/gimg/img/b1fd1671814b3dd36c6d1815a433c528';

        let params = {
            share_title,share_desc,share_link,share_imgUrl,
        };
        weixinSign(params);
    },
  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
  },

};
