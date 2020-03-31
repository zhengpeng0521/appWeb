import {
    querySchoolTypeList,freeRegist,
} from '../../../services/saas/freeApplyService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家在线申请使用
export default {

  namespace: 'freeApplyModel',

  state: {
      formLoading: false,
      schoolTypeList: [],//学习类型
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/') {
                  dispatch({
                    type: 'querySchoolTypeList',
                  });
                  dispatch({
                    type: 'weixinSign',
                  });
              }
          });
      }
  },

  effects: {

      //查询专题列表
      *querySchoolTypeList({}, { call, put, select }) {
          yield put({
              type: 'updateState',
              payload : {
                  formLoading: true
              }
          });

          let { ret } = yield call(querySchoolTypeList, parse({}));
          if (ret && ret.errorCode === 9000) {
              let schoolTypeList = [];
              ret && ret.results && ret.results.length > 0 && ret.results.map(function(item) {
                  schoolTypeList.push(item);
              });
              yield put({
                  type: 'updateState',
                  payload : {
                      formLoading: false,
                      schoolTypeList,
                  }
              });
          } else {
              ret && Toast.offline(ret.errorMessage || '查询学校类型出错啦');
              yield put({
                  type: 'updateState',
                  payload : {
                      formLoading: false
                  }
              });
          }
      },

    //提交申请
      *submitAction({payload}, { call, put, select }) {
          yield put({
              type: 'updateState',
              payload : {
                  formLoading: true
              }
          });
          let params = {
              orgName: payload.orgName,
              tel: payload.mobile,
              userName: payload.name,
              schoolType: payload.schoolType,
          };
          let { ret } = yield call(freeRegist, parse(params));
          if (ret && ret.errorCode === 9000) {
              yield put(routerRedux.push({
                    pathname: 'success',
              }));
          } else {
              ret && Toast.offline(ret.errorMessage || '提交申请出错啦');
              yield put({
                  type: 'updateState',
                  payload : {
                      formLoading: false
                  }
              });
          }
      },

      *weixinSign() {

        let share_title  = '5秒申请就能免费使用最好的教育saas系统';
        let share_desc   = '闪闪教育行业的一站式saas系统:集成招生工具，教学管理，财务系统，金融。';
        let share_link   = location.href;
        let share_imgUrl = 'http://115.29.172.104/gimg/img/2a569e96816395510aa9c10a5672d3c8';

        let params = {
            share_title,share_desc,share_link,share_imgUrl,
        };
        weixinSign(params);
    },
  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
  },

};
