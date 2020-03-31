import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import {
    queryBankCode,
} from '../../../services/checkstand/StepService';
export default {

  namespace: 'SearchModel',

  state: {
     accountArr : [],
     search : '',
     account :'',
     modalLoading: false,
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/SearchPage') {
                  dispatch({
                    type: 'queryBankCode',
                  });
              }
          });
      }
  },

  effects: {
         //开户支行列表获取
           *queryBankCode({ payload },{ select, call, put}) {
              yield put({ type : 'showModalLoading' });
              let current_model = yield select(state => state.SearchModel);
              let bankName = (payload && payload.bankName != undefined) ? payload.bankName :current_model.bankName;
              let province = (payload && payload.province != undefined) ? payload.province :current_model.province;
              let city = (payload && payload.city != undefined) ? payload.city :current_model.city;
              let search = (payload && payload.search != undefined) ? payload.search :current_model.search;
           	  let params = {
                  data:{
                      bank:bankName,
                      province:province,
                      city:city,
                      queryName:search,
                  }
              };
              let {ret} = yield call( queryBankCode, parse(params));
              if( ret && ret.errorCode == 9000 ){

              } else {
              }
              yield put({
                  type : 'updateState',
                  payload : {
                      loading: true,
                      accountArr : ret.results,
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
