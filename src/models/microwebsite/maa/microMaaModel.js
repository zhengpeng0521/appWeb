import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'microMaa',

    state: {
		selectCampus		: null,
		requestError		: false,
		campusListSource 	: [],
		maaConfig			: {},
		campusAddress		: '',
		selectCampusId 		: undefined,
		currentSexFemale	: false,
		currentSexMan		: false,
		isTouchMaa			: false,
		tenantId 			: undefined,
		orgId				: undefined,
		courseName			: undefined,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microMaa') {
					document.title = "预约试听";
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(11).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					function GetParamString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.hash.substr(11).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let type = GetQueryString("type");
					let orgId = GetQueryString("orgId");
					let id = GetParamString("id"); 		//课程预约时候需要
					let courseName = GetParamString("courseName")
					let link = `${window.location.origin}${window.location.pathname}?router=microMaa&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}&type=${type || location.query.type}&id=${id || location.query.id}`;
					
					dispatch({
						type: 'getMicroMaa',
						payload : {
							tenantId 		: location.query.tenantId	|| tenantId,
							orgId 			: location.query.orgId	|| orgId,
							type 			: location.query.type	|| type, 
							id				: location.query.id	|| id, 
							shareLink		: link,
						}
					});
					dispatch({
						type: 'updateState',
						payload : {
							tenantId 		: location.query.tenantId	|| tenantId,
							orgId 			: location.query.orgId	|| orgId,
							courseName		: !!courseName ? decodeURIComponent(courseName, "utf-8") : '',
						}
					});
              	}
		  	});
		},
    },

    effects: {

		//获取预约配置
		*getMaaConfig({ payload }, { select, call, put }) {

			let model = yield select(state => state.microMaa);

			let paramter = {
				tenantId: payload.tenantId || model.tenantId,
				orgId: payload.orgId }

			let maaConfig = yield call(service.getMaaConfig, parse(paramter));
			if (maaConfig.ret && maaConfig.ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						maaConfig: maaConfig.ret,
					},
				});
			} else {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						requestError: true,
					},
				});

				Toast.info(maaConfig.ret && maaConfig.ret.errorMessage || '获取配置项失败');
			};

		},
		
		*getMicroMaa({payload}, {select, call, put}) {
			
			let model = yield select(state => state.microMaa);
							
			let orgid = payload.orgId || model.orgId;
			
			yield put({
				type: 'updateState',
				payload: {
					...payload,
					selectCampusId 	: orgid,
				},
			});
			
			sa.track("ma_load", {
				_tenantId	: payload.tenantId || '未获取',
				_orgId		: payload.orgId || '未获取',
				_ch		 	: payload.id != '' && payload.id != undefined ? '微官网课程' : '',
			});

			yield put({
				type: 'getMaaConfig',
				payload: {
					tenantId: payload.tenantId,
					orgId: payload.orgId,
				},
			});

			let campusList = yield call(service.queryJuheList, parse({tenantId : payload.tenantId, pageIndex : 0, pageSize : 1000}));
			
            if(campusList.ret && campusList.ret.errorCode === 9000) {
				
				let newItem = {};
				
				campusList.ret.results.map(function (item, index) {
					if(orgid == item.orgId) {
						newItem = item
					}
				})
								
                yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						campusAddress	 : newItem.address,
						campusListSource : campusList.ret.results || [],
						selectCampus	 : newItem.orgName,
						selectCampusId	 : newItem.orgId,
                  	},
				});
				
				let paramaterData = newItem;
				let imageArr = newItem.orgAlbum;
				setTimeout(function () {
					let share_title  = paramaterData.orgName || '微官网';
					let share_desc   = `${share_title || '微官网'} -- 预约试听`;
					let share_link   = payload.shareLink;
					let share_imgUrl = !!paramaterData.imgurl && paramaterData.imgurl.length > 0 ? `${paramaterData.imgurl}!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
					let params = {share_title,share_desc,share_link,share_imgUrl,};
					weixinSign(params);
				}, 0);	
            } else {
				Toast.info(campusList.ret&&campusList.ret.errorMessage || '获取校区列表失败');
			};	
		},
			
		//预约
		*submitMaa({payload}, {select, call, put}) {
			
			let model = yield select (state => state.microMaa);
			
			let paramters = {
				...payload&&payload.paramter,
				threePartId 	: openid,
				tenantId 		: model.tenantId,
				type 			: model.type,
				sourceId		: model.id || '',
			}
					
			let maa = yield call(service.createReservation, parse(paramters));
            if(maa.ret && maa.ret.errorCode === 9000) {
				Toast.info('预约成功');
							
				sa.track("ma_cmt", {
					_tenantId	: model.tenantId || '未获取',
					_orgId		: model.orgId || '未获取',
				});
			
				yield put({
					type: 'updateState',
					payload: {
						isTouchMaa : false,
					},
				});

                yield put(
					routerRedux.push({
						pathname: `/microMaaHistory`,
						query: {
							orgId		: model.orgId,
							tenantId	: model.tenantId,	
						},
					})
				);
            } else {
				yield put({
					type: 'updateState',
					payload: {
						isTouchMaa: false,
					},
				});
				Toast.info(maa.ret&&maa.ret.errorMessage || '预约失败');
			};				
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
