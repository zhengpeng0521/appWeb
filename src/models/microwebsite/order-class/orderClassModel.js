import {
	getClassList,           //得到课程列表
	getOrderList,              //查询有课日期
	courseQuery, // 详细课程列表
	summaryQuery, // 详细教室列表
	teacherQuery, // 主教助教
} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import moment from 'moment';

export default {

    namespace: 'orderClassModel',

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

		wStartDate                : moment().startOf('week').format('YYYY-MM-DD'),
		wEndDate                  : moment().endOf('week').format('YYYY-MM-DD'),
		mStartDate                : moment().startOf('month').format('YYYY-MM-DD'),
		mEndDate                  : moment().endOf('month').format('YYYY-MM-DD'),

		selectedDate              : moment().format('YYYY-MM-DD'),
		headerDate                : moment().format('YYYY-MM-DD'),

		// 侧边栏筛选项
		open: false,
		position: 'right',

		// 侧边栏详情
		openDetail: false,
		positionDetail: 'right',
		detailType: '',
		lessoNameList: [],// 课程列表
		chroseLessonItem: null, // 选择的课程
		classRoomList: [], // 教室列表
		chroseClassRoomItem: null, // 选择的教室

		teacherList: [], // 老师列表
		chroseChiefItem: null, // 选择主教
		chroseAssistItem:null, // 选择助教

		chroseClassTimeItem: null, // 选择时间
		chroseFullItem: null, // 选择是否满班
		classFullList: [
			{
				id:'0',
				name: '未约满'
			},
			{
				id:'1',
				name: '已约满'
			}
		],

		calendarType              : 'week',                //日历类型
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/order_class' ) {
					document.title = '约课课表';
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
							calendarType : 'week'
						}
					})
				}
		  	});
		},
    },

    effects: {
		*serchGetClassListFun({payload}, {call, put, select}) {
			let state = yield select( state => state.orderClassModel );
			if(payload.serchType === 'serch') {
				let params = {
					pageIndex : 0,
					pageSize  : 5,
					orgId     : state.orgId,
					tenantId  : state.tenantId,
					stuId       : state.stuId,
					studyDate : state.selectedDate
				}
				if(state.chroseLessonItem != null) {
					params.courseId = state.chroseLessonItem.id
				}
				if(state.chroseClassRoomItem != null) {
					params.roomId = state.chroseClassRoomItem.id
				}
				if(state.chroseChiefItem != null) {
					params.mtid = state.chroseChiefItem.id
				}
				if(state.chroseAssistItem != null) {
					params.atid =  state.chroseAssistItem.id
				} 
				if(state.chroseFullItem != null) {
					params.isfull =  state.chroseFullItem.id
				} 
				if(state.chroseClassTimeItem != null) {
					const classTimeFormat = moment(state.chroseClassTimeItem).format('HH:MM')
					params.classTime = classTimeFormat
				}
				let { ret } = yield call(getClassList, (params));
				if(ret && ret.errorCode == 9000) {
					yield put({
						type : 'updateState',
						payload : {
							open: !state.open,
							dataSource : ret.results,
							resultCount : ret.data.resultCount,
							pageCount : ret.data.pageCount,
						}
					})
				}

			} else {
				yield put({
					type : 'updateState',
					payload : {
						// open: !state.open,
						chroseLessonItem: null,
						chroseClassRoomItem: null,
						chroseChiefItem: null,
						chroseAssistItem: null,
						chroseFullItem: null,
						chroseClassTimeItem: null,
					}
				})
				
				let params = {
					pageIndex : 0,
					pageSize  : 5,
					orgId     : state.orgId,
					tenantId  : state.tenantId,
					stuId       : state.stuId,
					studyDate : state.selectedDate
				}
				let { ret } = yield call(getClassList, (params));
				if(ret && ret.errorCode == 9000) {
					yield put({
						type : 'updateState',
						payload : {
							dataSource : ret.results,
							resultCount : ret.data.resultCount,
							pageCount : ret.data.pageCount,
						}
					})
				}
			}
		},

		*chroseTimeItemFun({payload}, {call, put, select}) {
			yield put({
				type : 'updateState',
				payload : {
					chroseClassTimeItem: payload.chroseClassTimeItem
				}
			})
		},

		*chroseItemFun({payload}, {call, put, select}) {
			let state = yield select( state => state.orderClassModel );
			if(state.detailType === 'lessoName') {
				yield put({
					type : 'updateState',
					payload : {
						openDetail: !state.openDetail,
						chroseLessonItem: payload.chroseLessonItem
					}
				})
			} else if(state.detailType === 'classroomName') {
				yield put({
					type : 'updateState',
					payload : {
						openDetail: !state.openDetail,
						chroseClassRoomItem: payload.chroseClassRoomItem
					}
				})
			} else if (state.detailType === 'chief') {
				yield put({
					type : 'updateState',
					payload : {
						openDetail: !state.openDetail,
						chroseChiefItem: payload.chroseChiefItem
					}
				})
			} else if(state.detailType === 'assist') {
				yield put({
					type : 'updateState',
					payload : {
						openDetail: !state.openDetail,
						chroseAssistItem: payload.chroseAssistItem
					}
				})
			} else if (state.detailType === 'isClassFull') {
				yield put({
					type : 'updateState',
					payload : {
						openDetail: !state.openDetail,
						chroseFullItem: payload.chroseFullItem
					}
				})
			}
		},

		*openRightDrawerDetail({payload}, {call, put, select}) {
			let state = yield select( state => state.orderClassModel );
			yield put({
				type : 'updateState',
				payload : {
					openDetail: !state.openDetail,
					detailType: payload.detailType
				}
			})
		},

		*openRightDrawer ({payload}, {call, put, select}) {
			let state = yield select( state => state.orderClassModel );
			yield put({
				type : 'updateState',
				payload : {
					open: !state.open
				}
			})
		},

		// 获取侧边栏详情
		*siderBarDetailFun({payload}, {call, put, select}) {
			let state = yield select( state => state.orderClassModel );
			let params = {
				orgId     : state.orgId,
				tenantId  : state.tenantId,
			}
			if(payload.detailType === 'lessoName') {
				let { ret } = yield call( courseQuery, (params));
				if( ret && ret.errorCode == 9000 ){
					yield put({
						type : 'updateState',
						payload : {
							lessoNameList: ret.results
						}
					})
				}else{
					Toast.info( ret && ret.errorMessage || '课程列表请求失败' )
				}
			} else if (payload.detailType === 'classroomName') {
				let { ret } = yield call( summaryQuery, (params));
				if( ret && ret.errorCode == 9000 ){
					yield put({
						type : 'updateState',
						payload : {
							classRoomList: ret.results
						}
					})
				}else{
					Toast.info( ret && ret.errorMessage || '课程列表请求失败' )
				}
			} else if (payload.detailType === 'chief' || payload.detailType === 'assist') {
				let { ret } = yield call( teacherQuery, (params));
				if( ret && ret.errorCode == 9000 ){
					yield put({
						type : 'updateState',
						payload : {
							teacherList: ret.results
						}
					})
				}else{
					Toast.info( ret && ret.errorMessage || '课程列表请求失败' )
				}
			}
		},

		/*课程表初始化 */
		*initScheduleInfo({ payload },{ call, put, select }){
			let wStartDate = moment().startOf('week').format('YYYY-MM-DD');       //本周开始日期
			let wEndDate = moment().endOf('week').format('YYYY-MM-DD');           //本周结束日期
			let mStartDate = moment().startOf('month').format('YYYY-MM-DD');      //本月开始日期
			let mEndDate = moment().endOf('month').format('YYYY-MM-DD');          //本月结束日期
			let currentDate = moment().format('YYYY-MM-DD');

			yield put({
				type : 'updateState',
				payload : {
					open: false,
					openDetail: false,
					chroseLessonItem: null,
					chroseClassRoomItem: null,
					chroseChiefItem: null,
					chroseAssistItem:null,
					chroseClassTimeItem: null,
					chroseFullItem: null,
				}
			})

			let params = {
				pageIndex : 0,
				pageSize  : 5,
				stuId     : payload.stuId,
				orgId     : payload.orgId,
				tenantId  : payload.tenantId,
				studyDate : currentDate
			}
			yield put({type: 'updateState', payload: { endLoading: true }})
			let { ret } = yield call(getClassList, (params));
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
						...payload,
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
            //日期
			let params1 = {
				stuId     : payload.stuId,
				orgId     : payload.orgId,
				tenantId  : payload.tenantId,
				startDate : wStartDate,
				endDate   : wEndDate
			}
			let dayList = yield call( getOrderList, ( params1 ));
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
            let state = yield select( state => state.orderClassModel );
            let params = {
                pageIndex : payload.pageIndex,
				pageSize  : payload.pageSize,
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				studyDate : state.selectedDate
            }

            let { ret } = yield call( getClassList, ( params ));
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
			let state = yield select( state => state.orderClassModel );
			let params = {
				stuId       : state.stuId,
				orgId       : state.orgId,
				tenantId    : state.tenantId,
				startDate   : wStartDate || mStartDate,
				endDate     : wEndDate || mEndDate
			}
			let { ret } = yield call( getOrderList, ( params ));
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
			let state = yield select( state => state.orderClassModel );
			let params = {
				pageIndex : 0,
				pageSize  : 5,
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				studyDate : date
			}
			let { ret } = yield call( getClassList, ( params ));
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
			let state = yield select( state => state.orderClassModel );
			let params = {
				stuId       : state.stuId,
				orgId       : state.orgId,
				tenantId    : state.tenantId,
				startDate   : wStartDate,
				endDate     : wEndDate
			}
			let { ret } = yield call( getOrderList, ( params ));
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
			let state = yield select( state => state.orderClassModel );
			let params = {
				stuId       : state.stuId,
				orgId       : state.orgId,
				tenantId    : state.tenantId,
				startDate   : mStartDate,
				endDate     : mEndDate
			}
			let { ret } = yield call( getOrderList, ( params ));
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
