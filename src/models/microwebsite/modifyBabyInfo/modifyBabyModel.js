import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

	namespace: 'microModifyBabyInfo',

	state: {
		modify: false,
		currentSexFemale: false,
		currentSexMan: false,
		animating: false,
		saveBaby: false,
		relationshipList: [],
		babyInfo: {},
		files: [],
		headerUrl: undefined,
		isModify: false,
		initWindowHeight: document.body.clientHeight,
		isSaveBaby: false // 是否保存学员
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/microModifyBabyInfo') {
					document.title = location.query.type == 1 ? "修改宝宝信息" : '添加宝宝信息';

					function GetQueryString(name) {
						let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if (r != null) return unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					let parentId = GetQueryString("parentId");
					let type = GetQueryString("type");
					let babyId = GetQueryString("babyId");

					let link = `${window.location.origin}${window.location.pathname}?router=microWebsite&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;

					dispatch({
						type: 'getBabyInfo',
						payload: {
							type: location.query.type || type,
							babyId: location.query.babyId || babyId,
							parentId: location.query.parentId || parentId,
							orgId: location.query.orgId || orgId,
							tenantId: location.query.tenantId || tenantId,
							isModify: location.query.isModify || false,
							hasCRM: location.state && location.state.hasCRM || undefined,
							hasCrmParent: location.state && location.state.hasCrmParent || undefined,
						}
					});

					dispatch({
						type: 'getParentsRelationship',
						payload: {
							tenantId: location.query.tenantId || tenantId,
							orgId: location.query.orgId || orgId,
						}
					});

					dispatch({
						type: 'loadingWxShare',
						payload: {
							shareLink: link,
						}
					});
				}
			});
		},
	},

	effects: {

		*loadingWxShare({ payload }, { select, call, put }) {
			setTimeout(function () {
				let share_title = '微官网';
				let share_desc = '微官网-主页';
				let share_link = payload.shareLink;
				let share_imgUrl = window.org_cover || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
				let params = { share_title, share_desc, share_link, share_imgUrl, };
				weixinSign(params);
			}, 0);
		},

		*getBabyInfo({ payload }, { select, call, put }) {
			let { isModify } = payload;
			if (payload && payload.type === '1') {
				let paramter = {
					tenantId: payload.tenantId,
					orgId: payload.orgId,
					id: payload.babyId,
				}
				let params = {
					tenantId: payload.tenantId,
					orgId: payload.orgId,
					stuId: payload.babyId,
					parentId: payload.parentId
				}
				let ret = {};
				if (isModify) {
					ret = yield call(service.vipModifyBaby, parse(params))
				} else {
					ret = yield call(service.modifyBaby, parse(paramter));
				}
				ret = ret.ret;
				if (ret && ret.errorCode === 9000) {
					yield put({
						type: 'updateState',
						payload: {
							babyInfo: ret,
							animating: false,
							modify: payload.type == '1' ? true : false,
							currentSexFemale: ret.sex == '2' ? true : false,
							currentSexMan: ret.sex == '1' ? true : false,
							headerUrl: ret.headimgurl && ret.headimgurl.length > 0 ? `${ret.headimgurl}!s300` : (ret.sex == '1' ? 'http://img.ishanshan.com/gimg/img/d75fdb312bbaca043a97d24c5453a337' : 'http://img.ishanshan.com/gimg/img/ad8cc625441146bdf8e373dec1cd600f'),
							...payload,
						},
					});
				} else {
					Toast.info(ret && ret.errorMessage || '宝宝列表请求失败');
				};
			} else {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						babyInfo: {},
						modify: payload.type == '1' ? true : false,
						currentSexFemale: false,
						currentSexMan: false,
						animating: false,
						headerUrl: '',
					},
				});
			}
		},


		//获取家长关系
		*getParentsRelationship({ payload }, { select, call, put }) {
			let paramter = {
				tenantId: payload.tenantId,
				orgId: payload.orgId,
				dictkey: 'parentRelationship',
			}

			let { ret } = yield call(service.getParentsRelationship, parse(paramter));
			if (ret && ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						relationshipList: ret.list,
					},
				});
			} else {
				Toast.info(ret && ret.errorMessage || '家长关系获取失败');
			};
		},

		//保存宝宝信息
		*saveBabyInfo({ payload }, { select, call, put }) {

			let model = yield select(state => state.microModifyBabyInfo);

			yield put({
				type: 'updateState',
				payload: {
					...payload,
					saveBaby: true,
				},
			});

			let headerImg = payload && payload.paramter.baby_sex == '1'
				? 'http://img.ishanshan.com/gimg/img/d75fdb312bbaca043a97d24c5453a337'
				: 'http://img.ishanshan.com/gimg/img/ad8cc625441146bdf8e373dec1cd600f';
			let header = payload && payload.paramter.baby_headerImage.length > 0 ? `${payload && payload.paramter.baby_headerImage}!s300` : headerImg;
			let paramter = {
				status: 1,
				tenantId: model.tenantId,
				orgId: model.orgId,
				parentId: model.parentId,
				id: model.babyId || undefined,
				sex: payload && payload.paramter.baby_sex,
				mobile: payload && payload.paramter.baby_phone,
				birthday: payload && payload.paramter.baby_birthday,
				name: payload && payload.paramter.baby_name,
				relation: payload && payload.paramter.baby_relationship,
				headimgurl: header,
				hasCRM: model.hasCRM,
				hasCrmParent: model.hasCrmParent,
			}
			let params = {
				status: 1,
				tenantId: model.tenantId,
				orgId: model.orgId,
				parentId: model.parentId,
				stuId: model.babyId || undefined,
				sex: payload && payload.paramter.baby_sex,
				mobile: payload && payload.paramter.baby_phone,
				birthday: payload && payload.paramter.baby_birthday,
				name: payload && payload.paramter.baby_name,
				relation: payload && payload.paramter.baby_relationship,
				headimgurl: header,
				hasCRM: model.hasCRM,
				hasCrmParent: model.hasCrmParent,
			}
			let ret = {};
			if (model.isModify) {
				ret = yield call(service.vipAddBaby, parse(params));
			} else {
				ret = yield call(service.addBaby, parse(paramter));
			}
			ret = ret.ret;
			if (ret && ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						saveBaby: false,
						modify: payload.type == '1' ? true : false,
					},
				});

				Toast.info(model.babyId && model.babyId.length > 0 ? '修改成功' : '添加成功', 1);
				yield put(
					routerRedux.go(-1)
				)
				yield put({
					type: 'updateState',
					payload: {
						isSaveBaby: true,
					},
				});
			} else {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						saveBaby: false,
					},
				});
				Toast.info(ret && ret.errorMessage || '宝宝列表请求失败');
			};
		},

		//删除宝宝信息
		*delectBabyInfo({ payload }, { select, call, put }) {
			let model = yield select(state => state.microModifyBabyInfo);
			let paramter = {
				status: 2,
				tenantId: model.tenantId,
				orgId: model.orgId,
				parentId: model.parentId,
				id: model.babyId,
			}
			let { ret } = yield call(service.delectBaby, parse(paramter));
			if (ret && ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
					},
				});
				Toast.info('删除成功', 1);
				yield put(
					routerRedux.go(-1)
				)
			} else {
				Toast.info(ret && ret.errorMessage || '删除宝宝失败');
			};
		},

		//获取头像
		*getHeaderUrl({ payload }, { select, call, put }) {

			let model = yield select(state => state.microModifyBabyInfo);
			let { ret } = yield call(service.getHeaderUrl, parse(payload));

			if (ret && ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						headerUrl: ret.data.url,
						animating: false,
					},
				});
				if (model.isModify && model.modify) {
					let params = {
						status: 1,
						tenantId: model.tenantId,
						orgId: model.orgId,
						parentId: model.parentId,
						stuId: model.babyId || undefined,
						headimgurl: ret.data.url,
						hasCRM: model.hasCRM,
						hasCrmParent: model.hasCrmParent,
					}
					let res = {};
					res = yield call(service.vipAddBaby, parse(params));
					if (res.ret && res.ret.errorCode === 9000) {
						Toast.info('头像保存成功', 1)
					} else {
						Toast.info('头像保存失败，请再试一下吧', 1)
					}
				}
			} else {
				Toast.info(ret && ret.errorMessage || '头像上传失败');
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						animating: false,
					},
				});
			};
		},
	},

	reducers: {
		updateState(state, action) { return { ...state, ...action.payload }; },
	}
}
