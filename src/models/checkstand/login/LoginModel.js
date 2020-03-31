import {
    genVerifyCodeM,
    queryMchInfo,
} from '../../../services/checkstand/LoginService';
import {
   sendTemplateMessage,
} from '../../../services/checkstand/LinkToShareService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'LoginModel',

  state: {
        mobile:'' ,
        code:'',
        modalLoading : false,
        flag : false,
        isLogin : false,   //判定是否点击登录
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/LoginPage') {
                  let buriedPointParam = {
                            PageCode : 'h5_checkstand',
                            PageName: '收银台h5',
                            Activeness: 1,
                            _orgId : '',
                            _tenantId : '',
                            _opId : '',
                            _account : "",
                            _btnName : '收银宝H5注册首页',
                }
	           sa && sa.track('pageview' , buriedPointParam);
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

      *queryMchInfo({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let params = {
             data:{
                mobile: payload.values.mobile,
                code : payload.values.code,
                openId : window._init_data.sourceOpenId,
             }
          };

          let orgList = [];
          let {ret} = yield call( queryMchInfo, parse(params));
          if( ret && ret.errorCode == 9000 ){
              orgList = ret.results;
              yield put(routerRedux.push({
			     pathname: 'chooseOrg_page',
              }));
              yield put({
                  type:'updateState',
                  payload : {
                      flag : false,
                  }
              })
              yield put({
                  type : 'StepsModel/updateState',
                  payload : {
                     orgList,
                  }
              });
              yield put({
                  type : 'ChooseOrgModel/updateState',
                  payload : {
                     orgList,
                  }
              });

          } else {
               Toast.info(ret.errorMessage);
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
