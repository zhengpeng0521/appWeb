import {queryGoodsDetail} from '../../../services/koubei/goodsPreviewService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';

//主题管理
export default {

  namespace: 'koubeiGoodsPreview',

  state: {
      loading : false,
      goodsData : {},
      tenantId : '',
      shopId : '',
      goodsId : '',
      outItemId : '',
      maskVisible : false,
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/') {
                  let ua = navigator.userAgent.toLowerCase();
                  let isWeixin = ua.indexOf('micromessenger') != -1;
                  if(isWeixin) {
                    dispatch({
                        type: 'queryGoodsDetail',
                        payload : {...query}
                    });
                  } else {
                      window.location = BASE_URL + `/koubei/h5/goodsShare?merchantPid=${query.merchantPid}&shopId=${query.shopId}&goodsId=${query.goodsId}&outItemId=${query.outItemId}`;
                  }
              }
          });
      }
  },

  effects: {

    *queryGoodsDetail({ payload }, { call, put }) {
        yield put({
            type: 'showLoading',
            payload : {
                ...payload
            }
        });

        let hehe = {
            merchantPid:'2088911161622111',
            goodsId:'2017051914260748807457037',
            outItemId:'2017051920076004000014377673',
            shopId:'2016062200077000000016002416',
        }

        let params = { ...payload };
//        let { ret } = yield call(queryGoodsDetail, parse(hehe));
        let { ret } = yield call(queryGoodsDetail, parse(params));

        if (ret && ret.errorCode === 9000) {
            let resultes = ret && ret.results;
            if(resultes && resultes.length > 0) {
                let goodsData = resultes[0];
                yield put({
                    type: 'updateState',
                    payload: {
                        loading: false,
                        goodsData,
                    },
                });
                document.title=goodsData.subject;
                yield put({
                    type: 'weixinSign',
                    payload: {
                        goodsData,
                    },
                });
            } else {
                Toast.offline('商品不存在');
                yield put({
                    type: 'updateState',
                    payload: {
                        loading: false,
                    },
                  });
            }

          } else {
              ret && ret.errorMessage && Toast.offline(ret.errorMessage || '查询商品详细出错啦');
              yield put({
                type: 'updateState',
                payload: {
                    loading: false,
                },
              });
          }
    },

    *weixinSign({ payload }, { call, put }) {
        let goodsData = payload.goodsData;
        let coverObj = JSON.parse(goodsData.cover);

        let share_title  = goodsData.subject;
        let share_desc   = goodsData.courseDesc;
        let share_link   = location.href;
        let share_imgUrl = coverObj.imgurl;

        let params = {
            share_title,share_desc,share_link,share_imgUrl,
        };
        weixinSign(params);
    },
  },

  reducers: {
      showLoading(state, action) {
          return {...state, ...action.payload, loading : true};
      },

      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },

  },

};
