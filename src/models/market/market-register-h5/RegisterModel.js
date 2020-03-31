import { parse } from 'qs';
import * as service from '../../../services/market/market-register-h5/marketRegisterService';
import { Toast } from 'antd-mobile';
import moment from 'moment';

export default {

	namespace: 'market_register',

	state: {
		showText: '',			//页面时效时候展示的文案
		invalid: false,		//是否蒂娜及提交按钮时候失效
		submitAfterData: undefined,	//提交之后返回数据
		configData: [],
		userId: undefined,
		touchSubmit: false,
		showSuccess: false,
		checkBoxall: {},// 定义初始化多选框值
		checkChose:{}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/') {
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if (r != null) return unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					let actId = GetQueryString("activityId");
					let memberId = GetQueryString("memberId");

					let param = {
						tenantId: location.query.tenant_id || tenantId,
						orgId: location.query.org_id || orgId,
						activityId: location.query.activity_id || actId,
						memberId: location.query.memberId || memberId,
					}

					dispatch({
						type: 'getConfig',
						payload: {
							...param
						}
					})

					setTimeout(function () {
						dispatch({
							type: 'callWatch',
							payload: {
								...param
							}
						})
					}, 0);
				}
			});
		},
	},

	effects: {

		*getConfig({ payload }, { call, put, select }) {

			let params = {
				activityId: payload.activityId,
				orgId: payload.orgId,
				tenantId: payload.tenantId,
				memberId: payload.memberId,
			}

			//存储属性
			yield put({
				type: 'updateState',
				payload: {
					orgId: payload.orgId,
					activityId: payload.activityId,
					tenantId: payload.tenantId,
					memberId: payload.memberId,
					userId: payload.memberId,
				}
			})

			let { ret, err } = yield call(service.getConfigAPI, parse(params));

			if (ret && ret.errorCode == 9000) {
				if (ret.status == '2') {

					let currentTme = moment().format('YYYY-MM-DD');

					let startStatus = moment(ret && ret.startDate).isAfter(currentTme);

					let endStatus = moment(ret && ret.endDate).isAfter(currentTme);

					let startSameStatus = moment(currentTme).isSame(ret && ret.startDate);

					let endSameStatus = moment(currentTme).isSame(ret && ret.endDate);

					let tempInvalid = undefined;

					let tempShowText = undefined;

					if (endSameStatus || startSameStatus) {
						//活动中
						tempInvalid = false;
						tempShowText = '';
					} else {
						if (startStatus == false && endStatus == false) {
							//已经结束 
							tempInvalid = true;
							tempShowText = '活动已结束';
						} else if (startStatus && endStatus) {
							//未开始
							tempInvalid = true;
							tempShowText = '活动未开始';
						}
					}

					if (ret && (ret.startDate == '' || ret.startDate == undefined || ret.endDate == '' || ret.endDate == undefined)) {
						tempInvalid = false;
						tempShowText = '';
					}

					let newbaseForm = JSON.parse(ret.baseForm)
					let newForm = newbaseForm[newbaseForm.length - 1]
					let newChose = {}
					let newChoses ={}
					if (newForm.type == 'newForm') {
						newForm.newForm && newForm.newForm.map((item, index) => {
							if (item.name == 'choseBox') {
								let nameS =  'choseBox'+index
								newChose[nameS] = []
							}
						})
					}
					if (newForm.type == 'newForm') {
						newForm.newForm && newForm.newForm.map((item, index) => {
							if (item.name == 'choseBox') {
								let nameS =  'choseBox'+index
								newChoses[nameS] = []
							}
						})
					}
					yield put({
						type: 'updateState',
						payload: {
							checkBoxall: newChose,
							checkChose:newChoses
						}
					})
					yield put({
						type: 'updateState',
						payload: {
							configData: ret && { ...ret },
							invalid: tempInvalid || false,
							showText: tempShowText,
						}
					})
				} else if (ret.status == '1') {
					yield put({
						type: 'updateState',
						payload: {
							invalid: true,
							configData: ret && ret,
							showText: '抱歉, 该活动已结束'
						}
					})
				} else if (ret.status == '0') {
					yield put({
						type: 'updateState',
						payload: {
							invalid: true,
							configData: ret && ret,
							showText: '抱歉, 该活动已失效'
						}
					})
				}
			}
		},

		//提交数据
		*submitValue({ payload }, { call, put, select }) {

			let model = yield select(state => state.market_register);

			let dataArr = payload && payload.formData || [];

			let mobile = undefined;

			let vcode = undefined;

			let name = undefined;

			dataArr && dataArr.map((item, index) => {
				if (item.name === 'tel') {
					mobile = item.value;
				} else if (item.name === 'vcode') {
					vcode = item.value;
				} else if (item.name === 'babyName') {
					name = item.value;
				}
			})

			let params = {
				tenantId: model.tenantId || undefined,
				orgId: model.orgId || undefined,
				activityId: model.activityId || undefined,
				memberId: model.memberId || undefined,
				tel: mobile || undefined,
				babyName: name || undefined,
				vcode: vcode || undefined,
				formData: JSON.stringify(payload && payload.formData) || undefined,
			}

			let { ret, err } = yield call(service.formSubmit, parse(params));

			if (ret && ret.errorCode != 9000) {
				yield put({
					type: 'updateState',
					payload: {
						submitAfterData: ret,
						touchSubmit: false,
						showSuccess: true,
						showText: ret && ret.errorCode == 3000 ? ret && ret.errorMessage : '抱歉, 该活动已结束',
					}
				})
			} else {
			let newfos = {}
			let newfoc = {}
			for(let key in model.checkBoxall){
				let nameS = key
				newfos[nameS] = []
			}
			for(let key in model.checkChose){
				let nameS = key
				newfoc[nameS] = []
			}	
				yield put({
					type: 'updateState',
					payload: {
						submitAfterData: ret,
						touchSubmit: false,
						showSuccess: true,
						checkBoxall:newfos,
						checkChose:newfoc
					}
				})
			}
		},

		*callWatch({ payload }, { call, put, select }) {

			let params = {
				activityId: payload.activityId,
				orgId: payload.orgId,
				tenantId: payload.tenantId,
				memberId: payload.memberId,
			}

			yield call(service.watch, parse(params));
		},
	},

	reducers: {
		updateState(state, action) { return { ...state, ...action.payload }; },
	}
}
