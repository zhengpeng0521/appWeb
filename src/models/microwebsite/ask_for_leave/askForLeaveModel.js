import {
	getAbleLeaveList,           //得到可请假列表
	getHasLeaveList,            //得到已请假列表
	saveAskForLeave,            //提交请假申请

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'askForLeaveModel',

    state: {
		stuId                : undefined,
		orgId                : undefined,
		tenantId             : undefined,

		selectedTab          : 'able',              //所选的tab页
		ableDataSource       : [],                  //可请假课程列表
		hasDataSource        : [],
		ableEndLoading       : false,               //加载状态
		hasEndLoading        : false,               //已请假课程加载状态
		hasResultCount       : 0,
		ableResultCount      : 0,
		ablePageIndex        : 0,
		ablePageSize         : 5,
		hasPageIndex         : 0,
		hasPageSize          : 5,
		selectedDataSource   : [],                  //选中的课程

		timeVisible          : false,               //时间 选择框
		startTime            : undefined,           //开始时间
		endTime              : undefined,           //结束时间

		//请假申请表单
		askLeaveVisible      : false,

	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/ask_for_leave' ) {
					document.title = '请假';
					dispatch({
						type : 'updateState',
						payload : {
							startTime  : undefined,
							endTime    : undefined,
						}
					})
					/*获取可请假列表*/
					dispatch({
						type : 'getAbleLeaveList',
						payload : {
							orgId 	  : location.query.orgId,
							tenantId  : location.query.tenantId,
							stuId     : location.query.stuId,
							parentId  : location.query.parentId
						}
					})
					/*获取已请假列表*/
					dispatch({
						type : 'getHasLeaveList',
						payload : {
							orgId     : location.query.orgId,
							tenantId  : location.query.tenantId,
							stuId     : location.query.stuId
						}
					})
              	}
		  	});
		},
    },

    effects: {
		//得到可请假列表
		*getAbleLeaveList({ payload },{ call, put, select }){
			let state = yield select( state => state.askForLeaveModel );
			let params = {
				pageIndex : 0,
				pageSize  : state.ablePageSize,
				stuId     : payload.stuId,
				orgId     : payload.orgId,
				tenantId  : payload.tenantId,
				startDate : state.startTime,
				endDate   : state.endTime
			}
			let { ret } = yield call( getAbleLeaveList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						ableDataSource  : ret.results,
						ableResultCount : ret.data.resultCount,
						ablePageIndex   : 0,
						...payload
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '可请假列表加载失败' )
			}
		},

		//日期搜索可请假列表
		*searchAbleList({ payload },{ call, put, select }){
			let { startTime, endTime } = payload;
			let state = yield select( state => state.askForLeaveModel );
			let params = {
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				pageSize  : state.ablePageSize,
				startDate : startTime,
				endDate   : endTime,
				pageIndex : 0
			}
			let { ret } = yield call( getAbleLeaveList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						ableDataSource : ret.results,
						ableResultCount : ret.data.resultCount,
						startTime,
						endTime,
						timeVisible : false
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '可请假列表加载失败' )
			}
		},

		//得到更多可请假列表
		*getMoreAbleList({ payload },{ call, put, select }){
			let { ablePageSize, ablePageIndex }	= payload;
			let state = yield select( state => state.askForLeaveModel );
			let params = {
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				startDate : state.startTime,
				endDate   : state.endTime,
				pageIndex : ablePageIndex,
				pageSize  : ablePageSize
			}
			let dataSource = state.ableDataSource;
			let { ret } = yield call( getAbleLeaveList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				let newDataSource = [ ...dataSource, ...ret.results ];
				yield put({
					type : 'updateState',
					payload : {
						endLoading     : false,
						ableDataSource : newDataSource,
						ablePageIndex,
						ablePageSize
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '可请假列表加载失败' )
			}
		},

		//得到已请假列表
		*getHasLeaveList({ payload },{ call, put, select }){
			let state = yield select( state => state.askForLeaveModel );
			let params = {
				stuId     : payload.stuId,
				orgId     : payload.orgId,
				tenantId  : payload.tenantId,
				pageIndex : 0,
				pageSize  : state.hasPageSize
			}
			let { ret } = yield call( getHasLeaveList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						hasDataSource  : ret.results,
						hasResultCount : ret.data.resultCount,
						hasPageIndex   : 0
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '已请假列表加载失败' )
			}
		},

		//提交请假申请
		*clickToSaveAskForLeave({ payload },{ call, put, select }){
			let { reason, info } = payload;
			let state = yield select( state => state.askForLeaveModel );
			let params = {
				reason,
				info,
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				parentId  : state.parentId,
			}
			let { ret } = yield call( saveAskForLeave, ( params ));
			if( ret && ret.errorCode == 9000 ){
				Toast.info( '请假申请提交成功' )
				yield put({
					type : 'updateState',
					payload : {
						askLeaveVisible    : false,
						selectedDataSource : [],
						selectedTab        : 'notAble'
					}
				})
				yield put({
					type : 'getAbleLeaveList',
					payload : {
						stuId    : state.stuId,
						tenantId : state.tenantId,
						orgId    : state.orgId
					}
				})
				yield put({
					type : 'getHasLeaveList',
					payload : {
						stuId    : state.stuId,
						tenantId : state.tenantId,
						orgId    : state.orgId
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '请假申请提交失败' )
			}
		},

		//得到更多已请假列表
		*getMoreHasList({ payload },{ call, put, select }){
			let { hasPageIndex, hasPageSize }	= payload;
			let state = yield select( state => state.askForLeaveModel );
			let params = {
				stuId     : state.stuId,
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				pageIndex : hasPageIndex,
				pageSize  : hasPageSize
			}
			let dataSource = state.hasDataSource;
			let { ret } = yield call( getHasLeaveList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				let newDataSource = [ ...dataSource, ...ret.results ];
				yield put({
					type : 'updateState',
					payload : {
						endLoading     : false,
						hasDataSource  : newDataSource,
						hasPageIndex,
						hasPageSize
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '已请假列表加载失败' )
			}
		}
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
