import {
	getIntegralRecordList,           //得到课时记录

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'integralRecordModel',

    state: {
			tenantId                  : undefined,
			orgId                     : undefined,
			stuId                     : undefined,

			dataSource                : [],
			resultCount               : 0,
			pageIndex                 : 0,
			pageSize                  : 20,
			endLoading                : false,
			allData: '',
			refreshing: false
	},

	subscriptions: {
	 	setup({ dispatch, history }) {
			history.listen( location => {
				if ( location.pathname === '/integral_record' ) {
					document.title = '积分记录';
					dispatch({
						type : 'initClassRecordList',
						payload : {
							orgId 	  : location.query.orgId,
							tenantId  : location.query.tenantId,
							stuId     : location.query.stuId
						}
					})
				}
			});
		},
	},

	effects: {
		*initClassRecordList({ payload },{ call, put, select }){
			if (!payload || payload == undefined) {
				return
			}

			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				stuId       : payload.stuId,
				pageIndex   : 0,
				pageSize    : 20
			}

			let { ret } = yield call( getIntegralRecordList, ( params ));
			if( ret && ret.errorCode == 0 ){
				if (payload.refreshing) {
					payload.refreshing = false
				}
				yield put({
					type : 'updateState',
					payload : {
						allData: ret.integral,
						dataSource  : ret.results,
						resultCount : ret.data.resultCount,
						...payload
					}
				})
			}else{
				yield put({
					type : 'updateState',
					payload : { ...payload }
				})
				Toast.info( ret && ret.errorMessage || '积分列表请求失败' )
			}
		},

		/*获取更多*/
		*getMoreList({ payload },{ call, put, select }){
			let { pageIndex, pageSize } = payload;
			let state = yield select( state => state.integralRecordModel );
			let params = {
				stuId    : state.stuId,
				orgId    : state.orgId,
				tenantId : state.tenantId,
				pageIndex,
				pageSize
			}
			let dataSource = state.dataSource;
			let { ret } = yield call( getIntegralRecordList, ( params ));
			if( ret && ret.errorCode == 0 ){
				let newDataSource = [ ...dataSource, ...ret.results ];
				yield put({
					type : 'updateState',
					payload : {
						endLoading : false,
						dataSource : newDataSource,
						pageIndex,
						pageSize
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '积分列表加载失败' )
			}
		},
	},

	reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
	}
}
