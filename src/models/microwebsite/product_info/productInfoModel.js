import {
	getProductList,           //得到作品列表
	getTagList,               //得到作品类型列表

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'productInfoModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,
		stuId                     : undefined,
		stuName                   : undefined,

		sortTime                  : 'desc',
		tagId                     : undefined,
		visible                   : false,

		tagList                   : [],              //作品类型列表

		dataSource                : [],
		resultCount               : 0,
		pageIndex                 : 0,
		pageSize                  : 5,
		endLoading                : false,

		productType               : '全部'
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/product_info' ) {
					document.title = '作品';
					dispatch({
						type : 'initProductInfoList',
						payload : {
							orgId 	    : location.query.orgId,
							tenantId    : location.query.tenantId,
							stuId       : location.query.stuId,
							stuName     : location.query.stuName,
							productType : '全部'
						}
					})
              	}
		  	});
		},
    },

    effects: {
		*initProductInfoList({ payload },{ call, put, select }){
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				stuId       : payload.stuId,
				pageIndex   : 0,
				pageSize    : 5
			}
			let { ret } = yield call( getProductList, ( params ));
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
			let params1 = {
				tenantId   : payload.tenantId,
				orgId      : payload.orgId,
				stuId      : payload.stuId
			}
			let tagList = yield call( getTagList, ( params1 ));
			if( tagList && tagList.ret && tagList.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						tagList : tagList.ret.results
					}
				})
			}else{
				Toast.info( tagList && tagList.ret && tagList.ret.errorMessage || '作品类型请求失败' )
			}
		},

		/*获取更多合同*/
		*getMoreList({ payload },{ call, put, select }){
			let { pageIndex, pageSize } = payload;
			let state = yield select( state => state.productInfoModel );
			let params = {
				stuId    : state.stuId,
				orgId    : state.orgId,
				tenantId : state.tenantId,
				sortTime : state.sortTime,
				tagId    : state.tagId,
				pageIndex,
				pageSize
			}
			let dataSource = state.dataSource;
			let { ret } = yield call( getProductList, ( params ));
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

		/*选择作品类型*/
		*selectProductType({ payload },{ call, put, select }){
			let { tagId, productType } = payload;
			let state = yield select( state => state.productInfoModel );
			let params = {
				tagId,
				orgId       : state.orgId,
				tenantId    : state.tenantId,
				stuId       : state.stuId,
				pageIndex   : 0,
				pageSize    : 5,
				sortTime    : state.sortTime
			}
			let { ret } = yield call( getProductList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dataSource  : ret.results,
						resultCount : ret.data.resultCount,
						visible     : false,
						tagId,
						productType
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '作品列表请求失败' )
			}
		},

		/*正序或倒序排列*/
		*descOrAscFunc({ payload },{ call, put, select }){
			let { sortTime } = payload;
			let state = yield select( state => state.productInfoModel );
			let params = {
				orgId     : state.orgId,
				tenantId  : state.tenantId,
				stuId     : state.stuId,
				tagId     : state.tagId,
				pageSize  : 5,
				pageIndex : 0,
				sortTime
			}
			let { ret } = yield call( getProductList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dataSource  : ret.results,
						resultCount : ret.data.resultCount,
						sortTime
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '作品列表请求失败' )
			}
		}
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
