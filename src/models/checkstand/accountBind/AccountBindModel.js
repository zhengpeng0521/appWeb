import {
    businessUnbindOpenId,
    businessBindOpenId,
} from '../../../services/checkstand/AccountBindService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'AccountBindModel',

  state: {
      modalLoading : false,
      alertVisible : false,
      userInfo : {},
      mchId : '',
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/AccountBindPage') {

              }
          });
      }
  },

  effects: {
       *businessUnbindOpenId({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let current_model = yield select(state => state.AccountBindModel);
         let mchId = (payload && payload.mchId != undefined) ? payload.mchId :current_model.mchId;
         let params = {
             data : {
                  mchId : mchId,
                  openId: window._init_data.openId,
             }
          };
          let {ret} = yield call( businessUnbindOpenId, parse(params));
          if( ret && ret.errorCode == 9000 ){
               yield put({
                    type:'updateState',
                    payload : {
                        alertVisible : false,
                    }
                })
               Toast.info("解绑成功");
          } else {
               Toast.info(ret.errorMessage);
          }
          yield put({ type : 'closeModalLoading' });
      },

      *businessBindOpenId({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let current_model = yield select(state => state.AccountBindModel);
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
                  type:'AccountBindModel/updateState',
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
