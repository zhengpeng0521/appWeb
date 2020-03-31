import {
    businessBindOpenId,
} from '../../../services/checkstand/AccountBindService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'AccountChooseModel',

  state: {
      modalLoading : false,
      orgList:[],
      orgName:'',   //机构名称
      mchId:'',
      status : '',  //提交状态
      userInfo : {},   //提交信息
      flags : false,
      mchId : '',
      orgNameArr : [],
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/AccountChoosePage') {
//                  dispatch({
//                    type: 'queryMchInfo',
//                  });
              }
          });
      }
  },

  effects: {
       *businessBindOpenId({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let params = {
             data : {
                  mchId : payload.mchId,
                  openId : window._init_data.openId,
             }
          };
          let userInfo = {};
          let {ret} = yield call( businessBindOpenId, parse(params));
          if( ret && ret.errorCode == 9000 ){
              Toast.info("绑定成功");
              userInfo = ret.data;
              yield put({
                  type : 'AccountBindModel/updateState',
                  payload:{
                      userInfo,
                      mchId : payload.mchId,
                  }
              });
              yield put(routerRedux.push({
                    pathname: 'AccountBindPage',
                    query:{ }
              }));
              yield put({
                  type:'updateState',
                  payload:{
                      flags:true,
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
