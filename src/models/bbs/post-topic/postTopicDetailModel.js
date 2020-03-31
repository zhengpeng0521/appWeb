import {
    queryTopicList,
} from '../../../services/bbs/postTopicService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//主题管理
export default {

  namespace: 'postTopicDetailModel',

  state: {
      topicDetail: {},
      cardTopicId: '',
      listLoading: false,
      hasMore: false,
      itemTopicCount: 0,//专题下帖子总数
      pageIndex: 0,
      pageSize: 5,
      topicList: [],
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/postTopicDetail') {
                  document.title = '专题详情';
                  dispatch({
                    type: 'queryTopicList',
                    payload: {
                        cardTopicId: query.cardTopicId || '',
                        initWeixinShare: true,
                    }
                  });
              }
          });
      }
  },

  effects: {

      //查询专题相关帖子
      *queryTopicList({ payload }, { call, put, select }) {
          yield put({
              type: 'updateState',
              payload : {
                  listLoading: true
              }
          });

          let postTopicDetailModel = yield select(state => state.postTopicDetailModel);

          let cardTopicId = payload.cardTopicId || postTopicDetailModel.cardTopicId;
          let pageIndex = payload.pageIndex || postTopicDetailModel.pageIndex;
          let pageSize = payload.pageSize || postTopicDetailModel.pageSize;
          let params = {
              cardTopicId,pageIndex,pageSize,
          };
          let { ret } = yield call(queryTopicList, parse(params));
          if (ret && ret.errorCode === 9000) {
              let topicDetail = ret.data.cardTopic || {};
              yield put({
                  type: 'updateState',
                  payload : {
                      ...params,
                      topicList: ret.results,
                      listLoading: false,
                      hasMore: ret.data.resultCount > pageSize,
                      topicDetail,
                      itemTopicCount: ret.data.resultCount,
                  }
              });
              console.info('payload.initWeixinShare', payload.initWeixinShare);
              if(payload.initWeixinShare) {
                  let params = {
                    share_title: topicDetail.mainTitle || '',
                    share_desc: topicDetail.intro,
                    share_link: location.href,
                    share_imgUrl: topicDetail.smallImg || '',
                  };
                  weixinSign(params);
              }
          } else {
              ret && Toast.offline(ret.errorMessage || '查询专题帖子列表出错啦');
              yield put({
                  type: 'updateState',
                  payload : {
                      listLoading: false
                  }
              });
          }
      },
  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
  },

};
