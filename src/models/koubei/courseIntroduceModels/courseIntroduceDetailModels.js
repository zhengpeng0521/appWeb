import { currentItemData } from '../../../services/koubei/courseIntroduceServices/courseIntroduce_detail_sv';
import { parse } from 'qs';

export default { 
    
    namespace: 'associatedCourseIntroduceDetail', 
    
    //初始化数据
    state: {
		courseDetailData : {},
		isShowMaa		 : false,
		
    },

    subscriptions: {
        setup({ dispatch, history }) {
          history.listen(location => {
            if (location.pathname === '/courseIntroduceDetailPage') {
                //埋点
                window.alipayBreakpoint('2016061601525581','201612060244770111',location.query.shop_id,'进入口碑课程详情首页','booking_start','start');
                dispatch({
                    type: 'requestCourseDetail',  //找到effects里面对应的方法
					payload: location.query,
                });
            } 
          });
        },  
    },
     
    //put  执行一个方法
    //call 调用一个请求    
    effects: {
        *requestCourseDetail({ payload }, {select, call, put }) {
            //埋点
            window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程介绍详情列表查询','booking_detail','action');
            const { ret, err } = yield call(currentItemData, parse({...payload}));
            if(ret && ret.errorCode === 9000) {
                yield put({
                    type: 'getCourseDetailSuccessOrFai',
                    payload: {
						...payload,
                        courseDetailData : ret.data.course,
						isShowMaa : ret.data.showBtn,
                  },
                });
                //埋点
                window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程介绍详情列表查询成功','booking_detail','end');
            } else {
				yield put({type: 'getCourseDetailSuccessOrFai'});
                //埋点
                window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程介绍详情列表查询失败','booking_detail','error');
			};
        },
    },
    
    reducers: {
		getCourseDetailSuccessOrFai(state, action) {
            return {...state, ...action.payload};
        },
    }
}
