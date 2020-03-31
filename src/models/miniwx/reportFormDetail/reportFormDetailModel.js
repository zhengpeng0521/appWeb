import {
	getTypeSelectList,                 //得到下拉列表
	clickToChangeType,                 //点击下拉列表切换 报表类型
	clickToChangeTypeByYear,           //点击下拉列表切换报表类型 按照年月
} from '../../../services/miniwx/reportIndex/reportIndexService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Toast } from 'antd-mobile';

export default {

    namespace : 'reportFormDetailModel',

    state : {
		currentItem         : undefined,                         //报表首页 传入参数
		smallKey            : undefined,                         //报表类型
		timeVisible         : false,                             //搜索框显隐
		typeVisible         : false,                             //选择类型框显隐
		selectList          : [],                                //类型下拉列表
		selectLabel         : undefined,                         //详情label 姓名 课程名称
		selectValue         : undefined,                         //详情value

		comparisonValue     : undefined,                         //百分比所对比的 value值
		reportDetailInfo    : {},                                //报表详情

		startDate           : undefined,
		endDate             : undefined,
		timeSelectKey       : undefined,                         //所选筛选 key值
		timeSelectValue     : undefined,                         //所选筛选 value值
//		timeSelectDisabled  : true,                              //时间禁止选择

		selectedYear        : undefined,                         //所选年份
		selectedMonth       : undefined,                         //所选月份

		url                 : undefined,                         //按报表类型不同调用不同的接口地址
		urlByYear           : undefined,
	},

    subscriptions : {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/reportDetail' ) {
					dispatch({
						type : 'updateState',
						payload : {
							...location.state,
							startDate : !!location.state && !!location.state.startDate && moment( location.state.startDate ) || undefined,
							endDate   : !!location.state && !!location.state.endDate && moment( location.state.endDate ) || undefined,
							timeVisible : false,           //进入页面时将时间框关闭
							typeVisible : false,           //进入页面时将类型框关闭
						}
					});
					dispatch({
						type : 'getTypeSelectList'
					})
					dispatch({
						type : 'getReportDetailInfoParams',
					})
              	}
		  	});
		},
    },

    effects: {
		//获取 类型下拉列表
		*getTypeSelectList({ payload },{ call, put, select }){
			let state = yield select( state => state.reportFormDetailModel );
			let { bigKey, smallKey } = state.currentItem || {};
			let { ret } = yield call( getTypeSelectList, ({ bigKey }) );
			if( ret && ret.errorCode === 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						selectList : ret.smallKeyValues
					}
				})
			}else{
				Toast.info( !!ret && ret.errrorMessage || '报表类型下拉列表加载失败', 1 )
			}
		},

		//首次进入报表详情 判断时年月或其他搜索条件
		*getReportDetailInfoParams({ payload },{ call, put, select }){
			let state = yield select( state => state.reportFormDetailModel );
			if( !!state && state.timeSelectKey === 'yearAndMonth' ){  //年月搜素 进入报表详情
				let params = {
					year      : !!state.selectedYear && state.selectedYear[0] || undefined,
					month     : !!state.selectedMonth && state.selectedMonth[0] || undefined,
					smallKey  : !!state.currentItem && state.currentItem.smallKey || undefined,
					urlByYear : state.urlByYear
				}
				yield put({
					type : 'getReportDetailInfoByYear',
					payload : { params }
				})
			}else { //其他条件进入 报表详情
				let params = {
					startDate : !!state.startDate && state.startDate.format('YYYYMMDD') || undefined,
					endDate   : !!state.endDate && state.endDate.format('YYYYMMDD') || undefined,
					smallKey  : !!state.currentItem && state.currentItem.smallKey || undefined,
					url       : state.url
				}
				yield put({
					type : 'getReportDetailInfo',
					payload : { params }
				})
			}
		},

		//得到报表详情 按照其他条件
		*getReportDetailInfo({ payload },{ call, put, select }){ //其他条件
			let state = yield select( state => state.reportFormDetailModel );
			let { params } = payload;
			params.url = state.url || undefined;
			let { ret } = yield call( clickToChangeType, ( params ) );
			if( !!ret && ret.errorCode === 9000 ){
				yield put({ type : 'updateState', payload : { reportDetailInfo : ret } })
			}else {
				Toast.info( !!ret && ret.errrorMessage || '报表详情加载失败', 1 )
			}
			yield put({ type : 'updateState', payload : { smallKey : params.smallKey } });
		},

		//得到报表详情 by年月
		*getReportDetailInfoByYear({ payload },{ call, put, select }){
			let state = yield select( state => state.reportFormDetailModel );
			let { params } = payload;
			params.url = state.urlByYear || undefined;
			let { ret } = yield call( clickToChangeTypeByYear, ( params ) );
			if( !!ret && ret.errorCode === 9000 ){
				yield put({ type : 'updateState', payload : { reportDetailInfo : ret } })
			}else {
				Toast.info( !!ret && ret.errrorMessage || '报表详情加载失败', 1 )
			}
			yield put({ type : 'updateState', payload : { smallKey : params.smallKey } });
		},

		//点击搜索
		*onSearchToList({ payload },{ call, put, select }){
			let { values } = payload;
			let state = yield select( state => state.reportFormDetailModel );
			let params = {
				startDate : !!values.startDate && values.startDate.format('YYYYMMDD'),
				endDate   : !!values.endDate && values.endDate.format('YYYYMMDD'),
				smallKey  : state.smallKey
			}
			yield put({ type : 'getReportDetailInfo', payload : { params }});
			yield put({ type : 'updateState', payload : { ...values } });
		},

		//按年月 搜索
		*onSearchToListByYear({ payload },{ call, put, select }){
			let { values } = payload;
			let state = yield select( state => state.reportFormDetailModel );
			let params = {
				year     : !!values.selectedYear && values.selectedYear[0] || undefined,
				month    : !!values.selectedMonth && values.selectedMonth[0] || undefined,
				smallKey  : state.smallKey
			}
			yield put({ type : 'getReportDetailInfoByYear', payload : { params }});
			yield put({ type : 'updateState', payload : { ...values } });
		},

		//点击下拉列表切换 报表类型 按照其他条件
		*clickToChangeType({ payload },{ call, put, select }){
			let { item } = payload;
			let state = yield select( state => state.reportFormDetailModel );
			let params = {
				startDate : state.startDate.format('YYYYMMDD'),
				endDate   : state.endDate.format('YYYYMMDD'),
				smallKey  : item.smallKey
			}
			yield put({
				type : 'getReportDetailInfo',
				payload : { params }
			})
		},

		//点击下拉列表切换报表类型 按照年月
		*clickToChangeTypeByYear({ payload },{ call, put, select }){
			let { item } = payload;
			let state = yield select( state => state.reportFormDetailModel );
			let params = {
				year     : !!state.selectedYear && state.selectedYear[0],
				month    : !!state.selectedMonth && state.selectedMonth[0] || undefined,
				smallKey : item.smallKey
			}
			yield put({
				type : 'getReportDetailInfoByYear',
				payload : { params }
			})
		}
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
