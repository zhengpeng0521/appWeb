import {
	getContractList,           //得到合同列表

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'contractInfoModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,
		stuId                     : undefined,

		dataSource                : [],
		resultCount               : 0,
		pageIndex                 : 0,
		pageSize                  : 5,
		endLoading                : false,              //是否到底部
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/contract_info' ) {
					document.title = '合同';
					dispatch({
						type : 'initContractInfo',
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
		*initContractInfo({ payload },{ call, put, select }){
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				stuId       : payload.stuId,
				pageIndex   : 0,
				pageSize    : 5
			}
			let { ret } = yield call( getContractList, ( params ));
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
			let state = yield select( state => state.contractInfoModel );
			let params = {
				stuId    : state.stuId,
				orgId    : state.orgId,
				tenantId : state.tenantId,
				pageIndex,
				pageSize
			}
			let dataSource = state.dataSource;
			let { ret } = yield call( getContractList, ( params ));
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
