import {
	getClassRecordList,           //得到课时记录

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'classRecordModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,
		stuId                     : undefined,

		dataSource                : [],
		resultCount               : 0,
		pageIndex                 : 0,
		pageSize                  : 5,
		endLoading                : false,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/class_record' ) {
					document.title = '课时变动记录';
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
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				stuId       : payload.stuId,
				pageIndex   : 0,
				pageSize    : 5
			}
			let { ret } = yield call( getClassRecordList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
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
				Toast.info( ret && ret.errorMessage || '合同列表请求失败' )
			}
		},

		/*获取更多合同*/
		*getMoreList({ payload },{ call, put, select }){
			let { pageIndex, pageSize } = payload;
			let state = yield select( state => state.classRecordModel );
			let params = {
				stuId    : state.stuId,
				orgId    : state.orgId,
				tenantId : state.tenantId,
				pageIndex,
				pageSize
			}
			let dataSource = state.dataSource;
			let { ret } = yield call( getClassRecordList, ( params ));
			if( ret && ret.errorCode == 9000 ){
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
				Toast.info( ret && ret.errorMessage || '合同列表加载失败' )
			}
		},
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
