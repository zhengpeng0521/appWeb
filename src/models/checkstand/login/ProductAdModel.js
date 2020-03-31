import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import {
    getDomain,
} from '../../../services/checkstand/ShareHeadService';

//闪闪管家在线申请使用
export default {

  namespace: 'ProductAdModel',

  state: {
      baseUrl:'',   //各个环境下的地址
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/ProductAdPage') {
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
                }
            });
             window.shareParams = {
                share_title: "闪闪邀请您免费开通收银宝",
                share_desc:"现在开通还能免费领取收银神器-台卡、工牌等，包邮送哦~手快有，手慢无！",
                share_link: `${window.init_data}/thinknode/checkstand/h5/checkstandH5/index/ProductAdPage?sourceOpenId=`+window._init_data.openId,
                share_imgUrl: "https://img.ishanshan.com/gimg/img/3c0d8b0bec963427cdba5342e3ced461",
                after_share: "",
              };
              weixinSign_1(shareParams);
		},
  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
  },

};
