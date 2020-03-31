import {
	getParentsNoticeList,               //得到老师课程评价列表

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast,Popup } from 'antd-mobile';

export default {

    namespace: 'parentsNoticeModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,
		stuId                     : undefined,
		parentId				  : undefined,

		dataSource                : [],
		resultCount               : 0,
		pageIndex                 : 0,
		pageSize                  : 5,
		endLoading                : false,              //是否到底部
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/parents_notice' ) {
					document.title = '家校互评';
					Popup.hide()
					dispatch({
						type : 'initParentsNoticeList',
						payload : {
							orgId 	  : location.query.orgId,
							tenantId  : location.query.tenantId,
							stuId     : location.query.stuId
						}
					})
					dispatch({
						type : 'updateState',
						payload : {
							parentId: location.query.parentId
						}
					})
              	}
		  	});
		},
    },

    effects: {
		//初始进入 家校互评页面
		*initParentsNoticeList({ payload },{ call, put, select }){
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				stuId       : payload.stuId,
				pageIndex   : 0,
				pageSize    : 5
			}
			let { ret } = yield call( getParentsNoticeList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dataSource  : ret.results,
						resultCount : ret.data.resultCount,
						...params
					}
				})
			}else{
				yield put({
					type : 'updateState',
					payload : { ...payload }
				})
				Toast.info( ret && ret.errorMessage || '列表请求失败' )
			}
		},

		/*获取更多课程评价*/
		*getMoreList({ payload },{ call, put, select }){
			let { pageIndex, pageSize } = payload;
			let state = yield select( state => state.parentsNoticeModel );
			let params = {
				stuId    : state.stuId,
				orgId    : state.orgId,
				tenantId : state.tenantId,
				pageIndex,
				pageSize
			}
			let dataSource = state.dataSource;
			let { ret } = yield call( getParentsNoticeList, ( params ));
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
				Toast.info( ret && ret.errorMessage || '列表加载失败' )
			}
		},
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
