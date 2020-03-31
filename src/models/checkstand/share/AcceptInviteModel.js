import {
    queryInviteInfo,
} from '../../../services/checkstand/ShareHeadService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'AcceptInviteModel',

  state: {
        modalLoading : false,
        orgListSource : [],
        orgChoose : '',
        userInfo : {},
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/AcceptInvitePage') {
                  dispatch({
                      type:'queryInviteInfo',
                  })
              }
          });
      }
  },

  effects: {
      //进入接受邀请页
       *queryInviteInfo({ payload },{ select, call, put}) {
          let current_model = yield select(state => state.AcceptInviteModel);
          let orgChoose = (payload && payload.orgChoose != undefined) ? payload.orgChoose :current_model.orgChoose;
          let params = {
             data:{
                openId : window._init_data.sourceOpenId,
                mchId : window._init_data.sourceMchId, //payload.orgChoose
             }
          };
          let userInfo ={};
          let {ret} = yield call( queryInviteInfo, parse(params));
          if( ret && ret.errorCode == 9000 ){
              userInfo = ret.data;
          } else {
//               message.error('查询数据出错');
          }
          yield put({
              type : 'updateState',
              payload : {
                  loading: true,
                  errorCode : ret.errorCode,
                  userInfo,
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
