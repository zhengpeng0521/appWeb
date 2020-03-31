//import {
//    genVerifyCodeM,
//    queryMchInfo,
//} from '../../../services/checkstand/LoginService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'PwdForgetModel',

  state: {
        mobile:'' ,
        password:'',
        modalLoading : false,
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/PwdForgetPage') {

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
     //加载状态
     showModalLoading( state, action ){
        return { ...state, modalLoading : true };
     },
     closeModalLoading( state, action ){
        return { ...state, modalLoading : false };
     },
  },

};
