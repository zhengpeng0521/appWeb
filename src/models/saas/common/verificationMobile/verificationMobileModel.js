import { parse } from 'qs';
import * as service from '../../../../services/saas/verificationMobileService';
import { Toast } from 'antd-mobile';
export default {

    namespace: 'verificationMobile',

    state: {
		s 				  	: undefined,
		veriText			: '点击获取验证码',
		newNickName			: '',
		getVeriCodeAction 	: false,
		defaultMobile		: '',
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/validationMobilePage') {
					
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let parentId = GetQueryString("parentId");
					let mobile = GetQueryString("mobile");
					let orgId = GetQueryString("orgId");
					
					dispatch({
						type: 'firstUpdateState',
						payload : {
							tenantId 		: location.query.tenantId 	|| tenantId,
							orgId 			: location.query.orgId 		|| orgId,
							openid 			: openid, 
						}
					});
              	}
		  	});
		},
    },

	effects: {
		
		//首次更新数据
		*firstUpdateState({payload}, {select, call, put}) {	
			 yield put({
				 type: 'updateState',
				 payload: {
					 ...payload,
					 defaultMobile : payload.mobile,
				 },
			 });
		},

		//获取验证码
		*getVerificationCode({payload}, {select, call, put}) {			
			let model = yield select (state => state.verificationMobile);
			let parameter = {
				mobile 		: payload.phone,
			}
			let {ret} = yield call(service.getCode, parse(parameter));
            if(ret && ret.errorCode === 9000) {
                Toast.info('获取成功');
            } else {
				Toast.info(ret&&ret.errorMessage || '获取失败');
			};			
		},
			
		//提交数据
		*submit({payload}, {select, call, put}) {
			
			let model = yield select (state => state.verificationMobile);

			let paramter = {
				verifyCode 	: payload.verificationCode,
				mobile 		: payload.phone,
				tenantId	: model.tenantId,
				orgId		: model.orgId,
				openid 		: openid,
			}

			let Info = yield call(service.validation, parse(paramter));
							
            if(Info.ret && Info.ret.errorCode === 9000) {
				window.location.href = `/thinknode/saas/resultpage#/?type=1`;
//                window.location.href = `/thinknode/weixinh5/page/attentionQrcode?type=0`;
			} if(Info.ret && Info.ret.errorCode === 8000) {
				window.location.href = 'https://mp.weixin.qq.com/s/A37hLNIu3K3likIFB4J4_w';					
			} else {
				Toast.info(Info.ret&&Info.ret.errorMessage || '验证失败');
			}
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
