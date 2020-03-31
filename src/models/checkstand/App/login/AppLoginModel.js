import {
    genVerifyCodeM,
} from '../../../../services/checkstand/LoginService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'AppLoginModel',

  state: {
        mobile:'' ,
        code:'',
        modalLoading : false,
        flag : false,
        bool : false,
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/AppLoginPage') {

              }
          });
      }
  },

  effects: {
       *genVerifyCodeM({ payload },{ select, call, put}) {

          let params = {
             data:{
                mobile: payload.mobile,
             }
          };
          let {ret} = yield call( genVerifyCodeM, parse(params));
          if( ret && ret.errorCode == 9000 ){
              Toast.info('发送成功');
          } else {
//               message.error('查询数据出错');
          }
          yield put({
              type : 'updateState',
              payload : {
                  loading: true,
              }
          });
      },

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
