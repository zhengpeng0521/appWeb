import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';
import {routerRedux} from 'dva/router';
export default {

    namespace: 'microvc',

    state: {
		s 				  	: undefined,
		veriText			: '发送验证码',
		getVeriCodeAction 	: false,
		newNickName			: '',
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microvc') {
					document.title = "完善信息";
						
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					
					let link = `${window.location.origin}${window.location.pathname}?router=microvc&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;
					
					dispatch({
						type: 'firstUpdateState',
						payload : {
							tenantId 		: location.query.tenantId || tenantId,
							orgId 			: location.query.orgId || orgId,
							routerSource	: location.query.routerSource || '',
						}
					});
					
					dispatch({
						type		: 'loadingWxShare',
						payload     : {							
							shareLink	: link,
						}
					});
              	}
		  	});
		},
    },

    effects: {
		
		*loadingWxShare({payload}, {select, call, put}) {
			setTimeout(function () {
				let share_title  = '微官网';
				let share_desc   = '微官网';
				let share_link   = payload.shareLink;
				let share_imgUrl = 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad';
				let params = {share_title,share_desc,share_link,share_imgUrl,};
				weixinSign(params);
			}, 0);
		},
			
		//首次更新数据
		*firstUpdateState({payload}, {select, call, put}) {	
			 yield put({
				 type: 'updateState',
				 payload: {
					 ...payload,
				 },
			 });
		},

		//获取验证码
		*getVerificationCode({payload}, {select, call, put}) {			
			let model = yield select (state => state.microvc);
			let parameter = {
				mobile : payload.phone,
				tenantId : model.tenantId,
				orgId : model.orgId,
			}
			let {ret} = yield call(service.getVcCode, parse(parameter));
            if(ret && ret.errorCode === 9000) {
                Toast.info('获取成功');
            } else {
				Toast.info(ret&&ret.errorMessage || '获取失败');
			};			
		},
			
		//提交数据
		*submit({payload}, {select, call, put}) {
			let model = yield select (state => state.microvc);
			let validation = yield call(service.validation, parse({mobile : payload.phone, verifyCode : payload.verificationCode}));
            if(validation.ret && validation.ret.errorCode === 9000) {
				
				let paramter = {
					mobile 		: payload.phone,
					tenantId	: model.tenantId,	
					orgId		: model.orgId,
					openid		: openid,
				}
				
				let Info = yield call(service.submitInfo, parse(paramter));

				if(Info.ret && Info.ret.errorCode === 9000) {

					if(model.routerSource === 'microActivityDetail') {
						Toast.info('信息完善成功, 可以开始报名了', 3);
						yield put(routerRedux.go(-1))
					} else {
						Toast.info('信息完善成功');
						yield put(
							routerRedux.push({
								pathname : '/microWebsite',
								query:  {
									tenantId 	: model.tenantId,
									orgId 		: model.orgId,
								},
							})
						)
					}

                    /*
                    let url = '/thinknode/weixinh5/page/attentionQrcode?type=0';
                    window.location.href=url;
                    */
				} else {
					Toast.info(Info.ret&&Info.ret.errorMessage || '完善失败');
				}
				
            } else {
				Toast.info(validation.ret&&validation.ret.errorMessage || '完善失败');
			};
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
