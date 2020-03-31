import {
    queryWSMaterialApply,
} from '../../../services/checkstand/MailService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'MailOrgModel',

  state: {
      modalLoading : false,
      orgList:[],
      orgName:'',
      mchId:'',
      status : '',  //提交状态
      dataSource : {},   //提交信息
      flags : false,
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/MailOrgPage') {
//                  dispatch({
//                    type: 'queryMchInfo',
//                  });
              }
          });
      }
  },

  effects: {
       *queryWSMaterialApply({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let params = {
             data : {
                  mchId : payload.mchId,
             }
          };
          let status = '';
          let dataSource = {};
          let {ret} = yield call( queryWSMaterialApply, parse(params));
          if( ret && ret.errorCode == 9000 ){
              status = ret.status;
              dataSource = ret.data;
              yield put({
                  type:'updateState',
                  payload:{
                      flags:true,
                  }
              })
          } else {
               Toast.info(ret.errorMessage);
          }
          yield put({
              type : 'updateState',
              payload : {
                 status,
                 dataSource,
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
