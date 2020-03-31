import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import {routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';

export default {

    namespace: 'confirmAvtivity',

    state: {
		selectRows 		: [],
		data			: [],
		singleData 		: {},
		dataSource 		: {},
		signStatus      : false,
		isCRM			: false,
		isSelectVip		: undefined,
		showAlertView 	: false,
		showAlertString	: [],
		showAlertOperationString : [],
		payMoney		: 0,
		dataStringURL	: undefined,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microConfirmAvtivity') {
					document.title = "确认活动";
										
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let actId = GetQueryString("actId");
					let orgId = GetQueryString("orgId");
					let hasCRM = GetQueryString("hasCRM");
					let isVipActivity = GetQueryString("isVipActivity");
					let parentId = GetQueryString("parentId");

					let link = `${window.location.origin}${window.location.pathname}?router=microActivityDetail&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}&actId=${actId || location.query.actId}`;

					dispatch({
						type: 'getConfirmAvtivity',
						payload : {
							actId 		: location.query.actId || actId,	
							orgId 		: location.query.orgId || orgId, 
							tenantId 	: location.query.tenantId || tenantId,
							hasCRM		: location.query.hasCRM || hasCRM,
							hasCrmParent: location.query.hasCrmParent,
							isVipActivity:location.query.isVipActivity || isVipActivity,
							parentId	: location.query.parentId || parentId,
							payMoney 	: location.state.pay_money || 0,
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
				let share_desc   = '微官网-活动确认';
				let share_link   = payload.shareLink;
				let share_imgUrl = window.org_cover || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
				let params = {share_title,share_desc,share_link,share_imgUrl,};
				weixinSign(params);
			}, 0);
		},
			
		*getConfirmAvtivity({payload}, {select, call, put}) {

			let model = yield select(state => state.confirmAvtivity);
			
			let paramter = {
				tenantId 	: payload&&payload.tenantId	|| model.tenantId,
				orgId 		: payload&&payload.orgId 	|| model.orgId,
				actId 		: payload&&payload.actId 	|| model.actId,
				openid 		: openid,
				hasCRM		: payload&&payload.hasCRM  || model.hasCRM,
				hasCrmParent: payload&&payload.hasCrmParent || model.hasCrmParent,
				parentId	: payload&&payload.parentId || model.parentId,
			}

			let {ret} = yield call(service.getAffirmList, parse(paramter));

            if(ret && ret.errorCode === 9000) {		
//				if(payload&&payload.isVipActivity == '1' && payload&&payload.hasCRM == '1') {
//					let data = [];
//					if(ret.cardStus&&ret.cardStus.length > 0) {
//						for(let val of ret.cardStus&&ret.cardStus) {
//							val.isVIP = true;
//							data.push(val);
//						}
//					}
//					
//					yield put({
//						type: 'updateState',
//						payload: {
//							...payload,
//							dataSource 	: ret,
//							data		: data,
//							isCRM		: paramter.hasCRM == '1' ? true : false,
//						},
//					});
//				} else {
					let data = [];
					if(ret.cardStus&&ret.cardStus.length > 0) {
						for(let val of ret.cardStus&&ret.cardStus) {
							val.isVIP = true;
							data.push(val);
						}
					}
					
					if(ret.outStus&&ret.outStus.length > 0) {
						for(let val of ret.outStus) {
							val.isVIP = false;
							data.push(val);
						}
					}

					yield put({
						type: 'updateState',
						payload: {
							...payload,
							dataSource 	: ret,
							data		: data,
							isCRM		: paramter.hasCRM == '1' ? true : false,
						},
					});
//				}
				
            } else {
				Toast.info(ret&&ret.errorMessage || '确认列表请求失败');
			};
		},
		
		//提交宝宝报名
		*submit({payload}, {select, call, put}) {
						
			let model = yield select(state => state.confirmAvtivity);

			let studentsArr = [];

			yield put({type: 'updateState',payload: {...payload,signStatus : true,},});

			studentsArr.push({ id: payload.dataInfo.id, stuSource: payload.dataInfo.stuSource, vip: payload.isSelectVip})

			//是否开通CRM以及是否是vip会员
			{/*
				if(!model.isCRM && (model.dataSource&&model.dataSource.vipSet == '1')) {
					let num = 0;
					payload.selectRows.map((item, index) => {
						if(item.selectNoVip != undefined && item.selectVip != undefined) {
							num++;
						}
					})
	
					if(payload.selectRows.length != num) {
						yield put({type: 'updateState',payload: {...payload,signStatus : false,},});
						return Toast.info('请填写是否会员');
					}
				} 
				
				payload.selectRows.map((item, index) => {
					if(item.selectNoVip != undefined && item.selectVip != undefined) {
						let tempVip = undefined;
						tempVip = item.selectNoVip ? '0' : '1';
						studentsArr.push({id : item.id, stuSource : item.stuSource, vip : tempVip});
					} else {
						if (!model.isCRM && (model.dataSource&&model.dataSource.vipSet == '0')) {
							studentsArr.push({id : item.id, stuSource : item.stuSource, vip : '/'});
						} else {
							studentsArr.push({id : item.id, stuSource : item.stuSource, vip : item.isVIP ? '1' : '0'});
						}
					}
				});
			*/}

			let paramter = {
				tenantId 	: model.tenantId,
				orgId 		: model.orgId,
				actId 		: model.actId,
				parentId 	: model.parentId,
				students 	: JSON.stringify(studentsArr),
				surePay		: payload.surePay || "0",
			}
			
			let {ret} = yield call(service.submitActivityApply, parse(paramter));

            if(ret && ret.errorCode === 9000) {

				_hmt.push(['_trackEvent', '微官网报名成功', `机构ID=${model.orgId || '未获取'}`, `报名用户${openid || 'undefined'}`, '-']);

				//打点
				sa.track("mic_site_a_su", {_tenantId : model.tenantId || '未获取', _orgId : model.orgId || '未获取', _micSiteAName : model.dataSource.actName || '未获取',});
				
				yield put({
					type: 'updateState',
					payload: {
						signStatus : false,
						dataStringURL: ret.data || undefined,
					},
				});	

				if (ret.data != undefined && ret.data != null) {
					window.location.href = ret.data;
				} else {
					if(ret.status && ret.status == "2"){
						yield put({
							type: 'updateState',
							payload: {
								...payload,
								showAlertView: true,
								isSelectVip : undefined,
								singleData	: {},
								showAlertString: ['恭喜您', '报名成功啦！'],
								showAlertOperationString: ['知道了'],
							},
						});
					}else{
						yield put({
							type: 'updateState',
							payload: {
								...payload,
								showAlertView: true,
								isSelectVip : undefined,
								singleData	: {},
								showAlertString: ['等位中', '请稍等, 报名成功会短信通知您'],
								showAlertOperationString: ['知道了'],
							},
						});
					}
					
				}

            } else if (ret && ret.errorCode == 9999) {
				//显示弹窗
				_hmt.push(['_trackEvent', '微官网报名未支付', `机构ID=${model.orgId || '未获取'}`, `报名用户${openid || 'undefined'}`, '-']);
				yield put({
					type: 'updateState',
				 	payload: {
						...payload,
						showAlertView: true,
						dataStringURL : '1',
						  showAlertString: ['当前名额已满', '支付后进入等位状态，若活动结束前没有报名成功，系统将自动退款'],
						showAlertOperationString: ['放弃', '去支付'],
					},
				});

			} else {
				_hmt.push(['_trackEvent', '微官网报名失败', `机构ID=${model.orgId || '未获取'}`, `报名用户${openid || 'undefined'}`, '-']);
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						showAlertView: true,
						dataStringURL : '2',
						showAlertString: ['抱歉，报名失败', '请重新报名！'],
						showAlertOperationString: ['放弃', '重新报名'],
					},
				});
			};
		},		

		//报名接口
		* participateService({ payload }, { select, call, put }) {
			
			//成功后跳转到活动详情页面
			//失败后停留在报名界面
			
		}
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
