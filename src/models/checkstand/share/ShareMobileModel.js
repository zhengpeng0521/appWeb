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

  namespace: 'ShareMobileModel',

  state: {
      modalLoading:false,
      mobile:'',
      code:'',
      orgList:'',
      orgNameArr : [],
      openModelVisible : false,    //免费开通的model显示
      errorCode : '',
      flag : false,
      errorCode1 : '',
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
                openId: window._init_data.openId,
             }
          };
          let orgList = [];
          let {ret} = yield call( queryMchInfo, parse(params));
          if( ret && ret.errorCode == 9000 ){
              orgList = ret.results;
              let orgNameArr = [];
              orgList.length>0 && orgList.map(function(item,index){
                if(item.status == '1'){
                    let obj = {};
                    obj.mchId = item.mchId;
                    obj.orgName = item.orgName;
                    orgNameArr.push(obj);
                }
              })
              if(orgNameArr && orgNameArr.length>0){
                  yield put(routerRedux.push({
                     pathname: 'ShareHeadPage',
                  }));
                  yield put({
                     type:'updateState',
                     payload:{
                        flag : false,
                     }
                  })
              }else{
                    yield put({
                        type : 'ShareMobileModel/updateState',
                        payload:{
                            openModelVisible : true,
                        }
                    })
              }
              yield put({
                  type : 'ShareOrgModel/updateState',
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
