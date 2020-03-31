//import {
//    sendMsg,
//    saveRegister,
//    updateRegister,
//    queryRegister,
//} from '../../../services/checkstand/StepService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'AppFlowModel',

  state: {
      modalLoading : false,
      date : '01',
      settleDate:'03',
      tab : '0',
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
//              if(pathname === '/') {
//                  dispatch({
//                    type: 'querySchoolTypeList',
//                  });
//              }
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
