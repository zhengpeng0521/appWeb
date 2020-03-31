import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'ShareOrgModel',

  state: {
      orgList:[],
      orgName:'',
      mchId:'',

      linkModelVisible : false,    //生成链接提示框
      weixinModelVisible : false,   //微信邀请引导显示
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/ShareOrgPage') {
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
