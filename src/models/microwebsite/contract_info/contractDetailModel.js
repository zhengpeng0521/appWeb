import {
	getContractDetailInfo,           //得到合同信息

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'contractDetailModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,
		orderNumber               : undefined,

		contractDetailInfo        : {}
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/contract_detail' ) {
					document.title = '合同详情';
					dispatch({
						type : 'initContractDetailInfo',
						payload : {
							orgId 	     : location.query.orgId,
							tenantId     : location.query.tenantId,
							orderNumber  : location.query.id
						}
					})
              	}
		  	});
		},
    },

    effects: {
		*initContractDetailInfo({ payload },{ call, put, select }){
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				orderNumber : payload.orderNumber
			}
			let { ret } = yield call( getContractDetailInfo, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						contractDetailInfo : ret.data
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '合同详情请求失败' )
			}
		},
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
