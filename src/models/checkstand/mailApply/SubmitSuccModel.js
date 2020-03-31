import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'SubmitSuccModel',

  state: {

  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/SubmitSuccPage') {
//                  dispatch({
//                    type: 'queryMchInfo',
//                  });
              }
          });
      }
  },

  effects: {

  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
  },

};
