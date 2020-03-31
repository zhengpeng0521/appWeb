import {
    queryTalentList,queryTalentBannerList,
} from '../../../services/bbs/postTopicService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//主题管理
export default {

  namespace: 'talentModel',

  state: {
      talentList: [],
      listLoading: false,
      hasMore: false,
      pageIndex: 0,
      pageSize: 5,
      bannerList: [],
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/talent') {
                  document.title = '达人榜单';
                  dispatch({
                    type: 'queryTalentList',
                    payload: {
                    }
                  });
                  dispatch({
                    type: 'queryTalentBannerList',
                    payload: {
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

      //查询达人榜单
      *queryTalentList({ payload }, { call, put, select }) {
          yield put({
              type: 'updateState',
              payload : {
                  listLoading: true
              }
          });

          let talentModel = yield select(state => state.talentModel);

          let pageIndex = payload.pageIndex || talentModel.pageIndex;
          let pageSize = payload.pageSize || talentModel.pageSize;
          let params = {
              pageIndex,pageSize,
          };
          let { ret } = yield call(queryTalentList, parse(params));
          if (ret && ret.errorCode === 9000) {
              yield put({
                  type: 'updateState',
                  payload : {
                      ...params,
                      talentList: ret.results,
                      listLoading: false,
                      hasMore: ret.data.resultCount > pageSize,
                      talent_header_img: ret.data.cover,
                  }
              });
          } else {
              ret && Toast.offline(ret.errorMessage || '查询达人榜单列表出错啦');
              yield put({
                  type: 'updateState',
                  payload : {
                      listLoading: false
                  }
              });
          }
      },

          //查询达人榜单
      *queryTalentBannerList({ payload }, { call, put, select }) {
          yield put({
              type: 'updateState',
              payload : {
                  listLoading: true
              }
          });


          let { ret } = yield call(queryTalentBannerList, parse({}));
          if (ret && ret.errorCode === 9000) {
              yield put({
                  type: 'updateState',
                  payload : {
                      bannerList: ret.results,
                      listLoading: false,
                  }
              });
          } else {
              ret && Toast.offline(ret.errorMessage || '查询达人榜单Banner出错啦');
              yield put({
                  type: 'updateState',
                  payload : {
                      listLoading: false
                  }
              });
          }
      },

      *weixinSign({ payload }, { call, put }) {

        let share_title  = '达人榜单';
        let share_desc   = '闪闪牛B达人，请您检阅';
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
