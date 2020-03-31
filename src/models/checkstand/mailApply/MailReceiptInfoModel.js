import {
    addMaterialApplys,
} from '../../../services/checkstand/MailService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'MailReceiptInfoModel',

  state: {
      modalLoading:false,
      mchId : '',
      orgName : '',   //机构名称
      userName : '',  //收件人
      tel : '' ,      //收件人电话
      address : '' ,  //详细地址
      addr : '',    //省市区
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
       *addMaterialApplys({ payload },{ select, call, put}) {
         yield put({ type : 'showModalLoading' });
         let params = {
             data : {
                  mchId : payload.mchId,
                  mchName : payload.orgName,
                  userName : payload.values.userName,
                  tel : payload.values.tel,
                  address : payload.values.address,
                  addr : payload.values.addr,
             }
          };

          let {ret} = yield call( addMaterialApplys, parse(params));
          if( ret && ret.errorCode == 9000 ){
              yield put(routerRedux.push({
                  pathname: 'SubmitSuccPage',
                  query:{ }
              }))
          } else {
               Toast.info(ret.errorMessage);
          }
          yield put({
              type : 'updateState',
              payload : {

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
