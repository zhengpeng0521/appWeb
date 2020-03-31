import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { locale } from 'moment';

export default {
  namespace: 'handleCancelClassModel',
  state: {
    stuName: null,
    courseName:null,
    courseNum:null,
    leftNum:null,
    repealTime:null,
    reason:null,
  },

  subscriptions: {
    setup({ dispatch, history }){
      history.listen(location => {
        if (location.pathname === "/notice_class"){
          document.title = '手动消课详情';
        }
        
        console.log(location.query.repealCourseId, 'location-------8989898989---')

        dispatch({
          type: 'updateState',
          payload: {
            stuName: location.query.stuName,
            courseName:location.query.courseName,
            courseNum:location.query.courseNum,
            leftNum:location.query.leftNum,
            repealTime:location.query.repealTime,
            reason:location.query.reason
          }
        })
      })
    }
  },

  effects: {
   
  },

  reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
  }
}