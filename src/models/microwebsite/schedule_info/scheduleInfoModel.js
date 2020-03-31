import {
	getCourseListData,           //得到课程列表
	getDayList,              //查询有课日期

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import moment from 'moment';

export default {

    namespace: 'scheduleInfoModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,
		stuId                     : undefined,

		dataSource                : [],
		resultCount               : 0,
		pageIndex                 : 0,
		pageSize                  : 5,
        pageCount                 : 0,
		endLoading                : false,

		wStartDate                : undefined,
		wEndDate                  : undefined,
		mStartDate                : undefined,
		mEndDate                  : undefined,

		selectedDate              : undefined,
		headerDate                : undefined,

		calendarType              : 'week',                //日历类型
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/schedule_info' ) {
					document.title = '课表';
                    window.common = {
                        orgId : location.query.orgId,
                        tenantId :location.query.tenantId,
                    }
                    dispatch({
                        type: 'updateState',
                        payload: {
                            dataSource: [],
                            pageIndex: 0,
                        }
                    })
					dispatch({
						type : 'initScheduleInfo',
						payload : {
							stuId : location.query.stuId,
							orgId : location.query.orgId,
							tenantId :location.query.tenantId,
							calendarType : 'week',
                            initDate : location.query.selectedDate
						}
					})
				}
		  	});
		},
    },

    effects: {
		/*课程表初始化 */
		*initScheduleInfo({ payload },{ call, put, select }){
			let wStartDate = moment().startOf('week').format('YYYY-MM-DD');       //本周开始日期
			let wEndDate = moment().endOf('week').format('YYYY-MM-DD');           //本周结束日期
			let mStartDate = moment().startOf('month').format('YYYY-MM-DD');      //本月开始日期
			let mEndDate = moment().endOf('month').format('YYYY-MM-DD');          //本月结束日期
			let currentDate = moment().format('YYYY-MM-DD');
            if(!!payload.initDate){
                currentDate = payload.initDate
            }
			let params = {
				pageIndex : 0,
				pageSize  : 5,
				stuId     : payload.stuId,
				orgId     : payload.orgId,
				tenantId  : payload.tenantId,
				studyDate : currentDate
			}
            yield put({type: 'updateState', payload: { endLoading: true }})
			let { ret } = yield call( getCourseListData, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						wStartDate, wEndDate, mStartDate, mEndDate,
						selectedDate : currentDate,
						headerDate : currentDate,
						dataSource : ret.results,
						resultCount : ret.data.resultCount,
                        pageCount : ret.data.pageCount,
						...payload
					}
				})
			}else{
				yield put({
					type : 'updateState',
					payload : { ...payload }
				})
				Toast.info( ret && ret.errorMessage || '课程列表请求失败' )
			}
            yield put({type: 'updateState', payload: { endLoading: false }})
			let params1 = {
				stuId     : payload.stuId,
				orgId     : payload.orgId,
				tenantId  : payload.tenantId,
				startDate : wStartDate,
				endDate   : wEndDate
			}
			let dayList = yield call( getDayList, ( params1 ));
			if( dayList && dayList.ret && dayList.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dayList : dayList.ret.dayList
					}
				})
			}else{
				Toast.info( dayList.ret && dayList.ret.errorMessage || '查询有课日期出错' )
			}
		},

        /*获取下一页*/
        *getMoreList({ payload },{ call, put, select }){
            yield put({type: 'updateState', payload: { endLoading: true }})
            let state = yield select( state => state.scheduleInfoModel );
            let params = {
                pageIndex : payload.pageIndex,
				pageSize  : payload.pageSize,
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				studyDate : state.selectedDate
            }

            let { ret } = yield call( getCourseListData, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
//						wStartDate, wEndDate, mStartDate, mEndDate,
						selectedDate : params.studyDate,
						headerDate : params.studyDate,
						dataSource : !!ret.results ? state.dataSource.concat(ret.results) : state.dataSource,
						resultCount : ret.data.resultCount,
                        pageCount : ret.data.pageCount,
						...payload
					}
				})
			}else{
				yield put({
					type : 'updateState',
					payload : { ...payload }
				})
				Toast.info( ret && ret.errorMessage || '课程列表请求失败' )
			}
            yield put({type: 'updateState', payload: { endLoading: false }})
        },

		/*改变日历类型*/
		*calendarTypeChange({ payload },{ call, put, select }){
			let { calendarType, mStartDate, mEndDate, wStartDate, wEndDate } = payload;
			let state = yield select( state => state.scheduleInfoModel );
			let params = {
				stuId       : state.stuId,
				orgId       : state.orgId,
				tenantId    : state.tenantId,
				startDate   : wStartDate || mStartDate,
				endDate     : wEndDate || mEndDate
			}
			let { ret } = yield call( getDayList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dayList    : ret.dayList,
						headerDate : state.selectedDate,
						calendarType, mStartDate, mEndDate, wStartDate, wEndDate
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '查询排课日期出错' )
			}
		},

		/*选择日期*/
		*selectDateFunc({ payload },{ call, put, select }){
			let { date } = payload;
			let state = yield select( state => state.scheduleInfoModel );
			let params = {
				pageIndex : 0,
				pageSize  : 5,
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				studyDate : date
			}
			let { ret } = yield call( getCourseListData, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						selectedDate : date,
						headerDate   : date,
						dataSource   : ret.results,
						resultCount  : ret.data.resultCount,
                        pageIndex    : 0,
                        pageCount    : ret.data.pageCount,
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '课程列表请求失败' )
			}
		},

		/*上周下周*/
		*WeekChangeClickFunc({ payload },{ call, put, select }){
			let { wStartDate, wEndDate, headerDate } = payload;
			let state = yield select( state => state.scheduleInfoModel );
			let params = {
				stuId       : state.stuId,
				orgId       : state.orgId,
				tenantId    : state.tenantId,
				startDate   : wStartDate,
				endDate     : wEndDate
			}
			let { ret } = yield call( getDayList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dayList : ret.dayList,
						wStartDate, wEndDate, headerDate
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '查询排课日期出错' )
			}
		},

		/*上月下月*/
		*monthChangeClickFunc({ payload },{ call, put, select }){
			let { mStartDate, mEndDate, headerDate } = payload;
			let state = yield select( state => state.scheduleInfoModel );
			let params = {
				stuId       : state.stuId,
				orgId       : state.orgId,
				tenantId    : state.tenantId,
				startDate   : mStartDate,
				endDate     : mEndDate
			}
			let { ret } = yield call( getDayList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dayList : ret.dayList,
						mStartDate, mEndDate, headerDate
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '查询排课日期出错' )
			}
		}
	},

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
