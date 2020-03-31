import {
    queryGoodsList,
    changeGoodsStatus,
    queryCountOfStatus,
    validateToken,
    queryGoodsOrder,
    koubeiOrgList,
    queryGoodsSettle,
} from '../../../services/koubei/goodsManageService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//主题管理
export default {

  namespace: 'koubeiGoodsManage',

  state: {
      tenantId : '',
	  merchantPid : '',
	  
      token: '',//当前登陆token

      goodsType : 'koubei_course',  //商品类型 koubei_course / koubei_activity
      activityGoodsStatus : 'effective',// 激活的tab标签  effective/pause/invalid
      goodsListEffective : {},  //已上架的商品列表
      goodsListPause : {}, //未上架的商品列表
      goodsListInvalid : {}, //冻结的商品列表
      goodsListLoading : false,
      pageIndex : 0,
      pageSize : 10,
      warn_msg_visible: false,

      koubeiOrgList: [],//商户的口碑门店列表
      fieltOrgId: '',//订单筛选的门店
      fieldOrgName: '',

      koubeiGoodsOrderList: [],
      order_pageIndex: 0,
      order_pageSize: 10,
      has_more_order: true,

      settleStatus: 'SETTLE',
      koubeiGoodsSettleList: [],
      settle_pageIndex: 0,
      settle_pageSize: 10,
      has_more_settle: true,
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/') {
              	 
                  if(query.merchantPid && query.merchantPid != ''){
                      dispatch({
                        type: 'validateToken',
                        payload : {
                            tenantId : query.tenantId,
                            token: query.token,
							merchantPid:query.merchantPid,
                        }
                      });

                      dispatch({
                        type: 'updateState',
                        payload : {
                            tenantId : query.tenantId,
                            token: query.token,
							merchantPid : query.merchantPid,
                        }
                      });
					  
                      dispatch({
                        type: 'queryGoods',
                        payload : {...query}
                      });

                      dispatch({
                        type: 'queryKoubeiOrgList',
                        payload: {...query}
                      });
                    } else {
                        dispatch(routerRedux.push({
                            pathname: 'noLogin',
                            query: {
                            }
                        }));
                    }
              }
          });
      }
  },

  effects: {
      *queryGoods({ payload }, { call, put, select }) {

        let koubeiGoodsManage = yield select(state => state.koubeiGoodsManage);
        let goodsType = payload.goodsType || koubeiGoodsManage.goodsType;
        let activityGoodsStatus = payload.activityGoodsStatus || koubeiGoodsManage.activityGoodsStatus;
        let searchStatus = activityGoodsStatus == 'effective' ? 1 :
                            activityGoodsStatus == 'pause' ? 2 :
                            activityGoodsStatus == 'invalid' ? 3 : '';
        let pageIndex = payload.pageIndex || koubeiGoodsManage.pageIndex;
        let pageSize = payload.pageSize || koubeiGoodsManage.pageSize;
        yield put({
            type: 'updateState',
            payload : {
                goodsListLoading : true,
                goodsType,activityGoodsStatus,pageIndex,pageSize,
            }
        });

        let params = {
            tenantId : payload.tenantId || koubeiGoodsManage.tenantId,
			merchantPid : payload.merchantPid || koubeiGoodsManage.merchantPid,
            goodsType : goodsType == 'koubei_course' ? '1' : '2',
            searchStatus,
            pageIndex,
            pageSize,
        };
        let { ret } = yield call(queryGoodsList, parse(params));

        if (ret && ret.errorCode === 9000) {
            if(params.searchStatus == 1) {
                yield put({
                    type: 'updateState',
                    payload: {
                        goodsListEffective: {
                            list : ret.results,
                            count : ret.data.resultCount,
                        }
                    },
                });
            } else if(params.searchStatus == 2) {
                yield put({
                    type: 'updateState',
                    payload: {
                        goodsListPause: {
                            list : ret.results,
                            count : ret.data.resultCount,
                        },
                    },
                });
            } else if(params.searchStatus == 3) {
                yield put({
                    type: 'updateState',
                    payload: {
                        goodsListInvalid: {
                            list : ret.results,
                            count : ret.data.resultCount,
                        },
                    },
                });
            }

        } else {
            ret && Toast.offline(ret.errorMessage || '查询商品列表出错啦');
        }

           //查询商品各个状态数量
           yield put({
                type: 'queryCountOfStatus',
                payload: {
                    tenantId : payload.tenantId || koubeiGoodsManage.tenantId,
					merchantPid : payload.merchantPid || koubeiGoodsManage.merchantPid,
                    goodsType : goodsType == 'koubei_course' ? '1' : '2',
                },
            });

          yield put({
                type: 'updateState',
                payload: {
                    goodsListLoading: false,
                },
            });
      },

    //改变商品状态
    *changeGoodsStatus({ payload }, { call, put, select }) {
        yield put({
            type: 'updateState',
            payload : {
                goodsListLoading : true,
            }
        });

        let { ret } = yield call(changeGoodsStatus, parse(payload));
        if (ret && ret.errorCode === 9000) {
            Toast.success((payload.statusText||'商品状态操作') + '成功');
            yield put({
                type: 'queryGoods',
                payload: {}
            });
        } else {
            ret && Toast.offline(ret.errorMessage || (payload.statusText||'商品状态操作') + '出错啦');
            yield put({
                type: 'updateState',
                payload : {
                    goodsListLoading : false,
                }
            });
        }
    },

    //查询商品各个状态数量
    *queryCountOfStatus({ payload }, { call, put, select }) {

          let {ret} = yield call(queryCountOfStatus, parse(payload));

          if(ret && ret.errorCode === 9000) {

              let count_data = ret.data || {};
              let koubeiGoodsManage = yield select(state => state.koubeiGoodsManage);
              let goodsListEffective = koubeiGoodsManage.goodsListEffective;
              let goodsListPause     = koubeiGoodsManage.goodsListPause;
              let goodsListInvalid   = koubeiGoodsManage.goodsListInvalid;
              goodsListEffective.count = count_data.ysjCount || 0;
              goodsListPause.count = count_data.wsjCount || 0;
              goodsListInvalid.count = count_data.elseCount || 0;

              yield put({
                type: 'updateState',
                payload : {
                    goodsListEffective,
                    goodsListPause,
                    goodsListInvalid,
                }
              });
          } else {
              ret && Toast.offline(ret.errorMessage || '查询商品各个状态数量出错啦');
          }
    },

    //校验token
   *validateToken({ payload }, { call, put, select }) {
       let {ret} = yield call(validateToken, parse(payload));
        if(ret && ret.errorCode === 9000) {

        } else {
            yield put(routerRedux.push({
                pathname: '/noLogin',
                query: {
                }
            }));
        }
   },

       //查询商品订单
    *queryGoodsOrder({ payload }, { call, put, select }) {

        yield put({
            type: 'updateState',
            payload : {
                goodsListLoading : true,
                goodsType: 'koubei_order',
            }
        });

        let koubeiGoodsManage = yield select(state => state.koubeiGoodsManage);
        let tenantId = koubeiGoodsManage.tenantId;
		let merchantPid = koubeiGoodsManage.merchantPid;
        let pageIndex = payload.order_pageIndex || koubeiGoodsManage.order_pageIndex;
        let pageSize = payload.order_pageSize || koubeiGoodsManage.order_pageSize;

        let fieltOrgId = payload.fieltOrgId != undefined ? payload.fieltOrgId : koubeiGoodsManage.fieltOrgId;
        let fieltOrgName = payload.fieltOrgName != undefined ? payload.fieltOrgName : koubeiGoodsManage.fieltOrgName;

        let params = {
            tenantId,pageIndex,pageSize,selectOrgId: fieltOrgId,merchantPid,
        };

        let {ret} = yield call(queryGoodsOrder, parse(params));

        if(ret && ret.errorCode === 9000) {
              yield put({
                type: 'updateState',
                payload : {
                    koubeiGoodsOrderList: ret.results,
                    order_pageIndex: pageIndex,
                    order_pageSize: pageSize,
                    goodsListLoading : false,
                    has_more_order: ret.data.resultCount > pageSize,
                    fieltOrgId,
                    fieltOrgName,
                }
              });
        } else {
            ret && Toast.offline(ret.errorMessage || '查询商品订单出错啦');
            yield put({
                type: 'updateState',
                payload : {
                    goodsListLoading : false,
                }
            });
        }
    },

    //查询口碑门店列表
    *queryKoubeiOrgList({ payload }, { call, put, select }) {

        yield put({
            type: 'updateState',
            payload : {
                goodsListLoading : true,
            }
        });

        let koubeiGoodsManage = yield select(state => state.koubeiGoodsManage);

        let tenantId = koubeiGoodsManage.tenantId;
		
        let merchantPid = koubeiGoodsManage.merchantPid || payload.merchantPid;

        let params = {
            tenantId,
			merchantPid,
            commodityId: '201610200194070711',//口碑商品的服务号
        };

        //获取商品的 口碑门店列表
        let result2 = yield call(koubeiOrgList, parse(params));

        if(result2 && result2.ret && result2.ret.errorCode == 9000) {
            yield put({
                type: 'updateState',
                payload : {
                    koubeiOrgList: result2.ret.results,
                    goodsListLoading: false
                }
            });
        } else {
            result2 && result2.ret && Toast.offline(result2.ret.errorMessage || '获取口碑门店列表出错啦');
            yield put({
                type: 'updateState',
                payload : {
                    goodsListLoading: false
                }
            });
        }

    },

        //查询商品核销
    *queryGoodsSettle({ payload }, { call, put, select }) {

        yield put({
            type: 'updateState',
            payload : {
                goodsListLoading : true,
                goodsType: 'koubei_settle',
            }
        });

        let koubeiGoodsManage = yield select(state => state.koubeiGoodsManage);

        let tenantId = koubeiGoodsManage.tenantId;
		let merchantPid = koubeiGoodsManage.merchantPid;
        let pageIndex = payload.settle_pageIndex || koubeiGoodsManage.settle_pageIndex;
        let pageSize = payload.settle_pageSize || koubeiGoodsManage.settle_pageSize;

        let fieltOrgId = payload.fieltOrgId != undefined ? payload.fieltOrgId : koubeiGoodsManage.fieltOrgId;
        let fieltOrgName = payload.fieltOrgName != undefined ? payload.fieltOrgName : koubeiGoodsManage.fieltOrgName;

        let settleStatus = payload.settleStatus || koubeiGoodsManage.settleStatus;
        let params = {
            tenantId,pageIndex,pageSize,settleOrg: fieltOrgId,status: settleStatus,merchantPid,
        };

        let {ret} = yield call(queryGoodsSettle, parse(params));

        if(ret && ret.errorCode === 9000) {
              yield put({
                type: 'updateState',
                payload : {
                    koubeiGoodsSettleList: ret.results,
                    settle_pageIndex: pageIndex,
                    settle_pageSize: pageSize,
                    goodsListLoading : false,
                    has_more_settle: ret.data.resultCount > pageSize,
                    fieltOrgId,
                    fieltOrgName,settleStatus,
                }
              });
        } else {
            ret && Toast.offline(ret.errorMessage || '查询商品核销出错啦');
            yield put({
                type: 'updateState',
                payload : {
                    goodsListLoading : false,
                }
            });
        }
    },

  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
  },

};
