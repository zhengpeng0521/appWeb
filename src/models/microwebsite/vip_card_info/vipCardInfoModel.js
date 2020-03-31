import {
	getVipCardInfo,           //得到会员卡信息

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'vipCardInfoModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,

		vipCardInfo               : {},
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/vip_card_info' ) {
					document.title = '会员卡';
					dispatch({
						type : 'initVipInfo',
						payload : {
							orgId 	  : location.query.orgId,
							tenantId  : location.query.tenantId,
							stuId     : location.query.stuId,
						}
					})
              	}
		  	});
		},
    },

    effects: {
		*initVipInfo({ payload },{ call, put, select }){
			let params = {
				tenantId 	: payload.tenantId,
				orgId 		: payload.orgId,
				stuId       : payload.stuId
			}
			let { ret } = yield call( getVipCardInfo, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						vipCardInfo : ret.data || {}
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '会员卡信息请求失败' )
			}
		}
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
