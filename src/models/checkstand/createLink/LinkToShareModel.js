import {
   sendTemplateMessage,
   openIdBind,
} from '../../../services/checkstand/LinkToShareService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'LinkToShareModel',

  state: {
        mobile:'' ,       //手机号
        code:'',          //验证码
        userName : '',    //用户名
        nichName:'',      //微信昵称
        modalLoading : false,
        flag : false,
        isLogin : false,   //判定是否点击登录
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === 'LinkToSharePage') {

              }
          });
      }
  },

  effects: {
      //手机验证码获取
       *sendTemplateMessage({ payload },{ select, call, put}) {

          let params = {
             data:{
                mobile: payload.mobile,
             }
          };
          let {ret} = yield call( sendTemplateMessage, parse(params));
          if( ret && ret.errorCode == 9000 ){
              Toast.info('发送成功');
          }
      },

      *openIdBind({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let params = {
             data:{
                mobile: payload.values.mobile,
                code : payload.values.code,
                userName : payload.values.userName,
                openId : window._init_data.openId,
             }
          };

          let {ret} = yield call( openIdBind, parse(params));
          if( ret && ret.errorCode == 9000 ){
              yield put(routerRedux.push({
			     pathname: 'ResultPage',
              }));
          } else {
               Toast.fail(ret.errorMessage);
          }
          yield put({
              type : 'updateState',
              payload : {
                  errorMessage : ret.errorMessage,
              }
          });
          yield put({ type : 'closeModalLoading' });
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
