import {
    queryMobileByOpenId,
    queryMchInfoByOpenId,
    getDomain,
} from '../../../services/checkstand/ShareHeadService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'ShareHeadModel',

  state: {
        modalLoading : false,
        orgChoose : '',
        weixinModelVisible : false,
        openid : '',    //微信用户
        errorCode:'',
        orgListSource:[],   //机构列表
        baseUrl:'',
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/ShareHeadPage') {
                 dispatch({
                     type:'queryMobileByOpenId'
                 });
                 dispatch({
                     type:'getDomain',
                     payload:{
                         baseUrl : window.init_data,
                     }
                 });
              }
          });
      }
  },

  effects: {
      /*各环境下的分享路径*/
      *getDomain ({ payload },{ select, call, put}) {
			let ShareHeadModel = yield select(state => state.ShareHeadModel);
			let {ret} = yield call(getDomain);
			let baseUrl = ret.domain;
			window.init_data = baseUrl;

			yield put({
                type : 'updateState',
                payload : {
                    baseUrl,
                    loading:false,
                }
            });
             window.shareParams = {
                share_title: "闪闪邀请您免费开通收银宝",
                share_desc:"现在邀请好友开通还能享受3‰优惠扣率！名额有限，先到先得！",
                share_link: `${window.init_data}/thinknode/checkstand/h5/checkstandH5/index/ShareHeadPage`,
                share_imgUrl: "https://img.ishanshan.com/gimg/img/64e5e321f938dc062134dd5b77960fcc",
                after_share: "",
              };
              weixinSign_1(shareParams);
		},

      //进入生成链接页
       *queryMobileByOpenId({ payload },{ select, call, put}) {

          let params = {
             data:{
                openId: window._init_data.openId,
             }
          };

          let {ret} = yield call( queryMobileByOpenId, parse(params));
          if( ret && ret.errorCode == 9000 ){
              yield put({
                  type:'queryMchInfoByOpenId',
                  payload:{

                  }
              })
              yield put({
                  type:'ShareMobileModel/updateState',
                  payload:{
                      errorCode1:ret.errorCode,
                  }
              })
          } else {
//               message.error('查询数据出错');
          }
          yield put({
              type : 'updateState',
              payload : {
                  loading: true,
                  errorCode : ret.errorCode,
              }
          });

      },

      *queryMchInfoByOpenId({ payload },{ select, call, put}) {
          let current_model = yield select(state => state.ShareHeadModel);
          let params = {
             data:{
                openId: window._init_data.openId,
             }
          };
          let orgChoose = payload.orgChoose;
          let orgListSource = [];
          let {ret} = yield call( queryMchInfoByOpenId, parse(params));
          if( ret && ret.errorCode == 9000 ){
              orgListSource = ret.results;
              yield put({
                  type:'AcceptInviteModel/updateState',
                  payload:{
                      orgChoose,
                  }
              })
              yield put({
                  type:'StepsModel/updateState',
                  payload:{
                      orgChoose,
                  }
              })
          } else {
//               message.error('查询数据出错');
          }
          yield put({
              type : 'updateState',
              payload : {
                  loading: true,
                  orgListSource,
                  orgChoose,
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
