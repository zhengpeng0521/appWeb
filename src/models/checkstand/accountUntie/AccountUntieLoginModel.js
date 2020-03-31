import {
    genVerifyCodeM,
    queryMchInfoByOpenID,
    businessBindOpenId,
} from '../../../services/checkstand/AccountBindService';
import {
   sendTemplateMessage,
} from '../../../services/checkstand/LinkToShareService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'AccountUntieLoginModel',

  state: {
        mobile:'' ,
        code:'',
        modalLoading : false,
        flag : false,
        mchId : "",
        orgNameArr : [],
        userInfo :{},
        orgList : [],
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/UntieLoginPage') {

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

      *queryMchInfoByOpenID({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let params = {
             data:{
                mobile: payload.values.mobile,
                code : payload.values.code,
                openId : window._init_data.openId,
             }
          };
          let mchId = '';
          let orgList = [];
          let orgNameArr = [];
          let {ret} = yield call( queryMchInfoByOpenID, parse(params));
          if( ret && ret.errorCode == 9000 ){
              orgList = ret.results;
              orgList.length>0 && orgList.map(function(item,index){
                    let obj = {};
                    obj.mchId = item.mchId;
                    obj.orgName = item.orgName;
                    orgNameArr.push(obj);
              })
              if(orgNameArr && orgNameArr.length>1){
                  yield put(routerRedux.push({
                     pathname: 'UntieChoosePage',
                  }));
              }else if(orgNameArr && orgNameArr.length==1){
                  orgList && orgList.map(function(item,index){
                      mchId = item.mchId;
                  });
                  yield put({
                      type:'AccountUntieLoginModel/businessBindOpenId',
                      payload : {
                          mchId,
                      }
                  });
                  yield put(routerRedux.push({
                     pathname: 'AccountUntiePage',
                  }));
                  yield put({
                      type:'AccountUntieModel/updateState',
                      payload:{
                          mchId,
                      }
                  })
              }else{
                  Toast.info("您还没有可以解绑的商户哦,快去进行账户绑定吧");
              }
              yield put({
                  type:'updateState',
                  payload : {
                      flag : false,
                  }
              })
              yield put({
                  type : 'AccountUntieChooseModel/updateState',
                  payload : {
                     orgList,
                     orgNameArr,
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

      *businessBindOpenId({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let current_model = yield select(state => state.AccountUntieLoginModel);
         let mchId = (payload && payload.mchId != undefined) ? payload.mchId :current_model.mchId;
         let params = {
             data : {
                  mchId : mchId,
                  openId : window._init_data.openId,
             }
          };
          let userInfo = {};
          let {ret} = yield call( businessBindOpenId, parse(params));
          if( ret && ret.errorCode == 9000 ){
              userInfo = ret.data;
              yield put({
                  type:'AccountUntieModel/updateState',
                  payload : {
                      userInfo,
                  }
              })
          } else {
               Toast.info(ret.errorMessage);
          }
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
