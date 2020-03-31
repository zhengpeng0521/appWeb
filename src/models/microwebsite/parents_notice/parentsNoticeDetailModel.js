import {
	getParentEvaluate,           //得到评价详情
	saveEvaluateInfo,
} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast, Popup} from 'antd-mobile';

export default {

	namespace: 'parentsNoticeDetailModel',

	state: {
		tenantId: undefined,
		orgId: undefined,
		cpdId: undefined,
		type: undefined,
		cpStuId: undefined,
		cpmId: undefined,
		parentId: undefined,
		
		currentItem: {},           //当前选中课程的详细信息
		parentEvaluateInfo: {},           //当前选中的课程评价详情

		// evaluateVisible: false,        //评价modal visible
		// score: 0,            //评价等级
		// resetNum: undefined,
		// picList: []
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen( location => {
				// console.log(location)
			  	if ( location.pathname === '/parents_notice_detail' ) {
					document.title = '评价详情';
					Popup.hide()
					dispatch({
						type : 'updateState',
						payload : {
							currentItem : location.state.item,
							// evaluateVisible : false,
							parentId: location.query.parentId
						}
					})
					dispatch({
						type : 'initParentEvaluate',
						payload : {
							tenantId     : location.query.tenantId,
							orgId 	     : location.query.orgId,
							cpdId        : location.query.cpdId,
							type         : location.query.type,
							cpStuId      : location.query.cpStuId,
							cpmId        : location.query.cpmId
						}
					})
			  	}
			});
		},
	},

	effects: {
		//得到评论详情列表
		*initParentEvaluate({ payload }, { call, put, select }) {
			let { ret } = yield call(getParentEvaluate, (payload));
			if (ret && ret.errorCode == 9000) {
				yield put({
					type: 'updateState',
					payload: {
						parentEvaluateInfo: ret,
						...payload
					}
				})
			} else {
				yield put({
					type: 'updateState',
					payload: { ...payload }
				})
				Toast.info(ret && ret.errorMessage || '评价详情请求失败')
			}
		},

		//提交评价
		*saveInfo({ payload}, { call, put, select }) {
			let { values } = payload;
			let state = yield select(state => state.parentsNoticeDetailModel);
			let baseParams = {
				orgId: state.orgId,
				tenantId: state.tenantId,
				cpStuId: state.cpStuId,
				cpdId: state.cpdId,
				cpmId: state.cpmId,
				type: state.type,
				parentId: state.parentId,
			}

			if (!state.score || !values.comment || values.comment == '') {
				Toast.info('请完善评价信息');
				return
			}
			let newV = {
				...values,
				pictures: values.pictures.join(',')
			}

			let { ret } = yield call(saveEvaluateInfo, ({ score: state.score, ...baseParams, ...newV }));
			if (ret && ret.errorCode == 9000) {
				Toast.info('提交成功');
				yield put({
					type: 'initParentEvaluate',
					payload: {
						...baseParams
					}
				})
				// yield put({
				// 	type: 'updateState',
				// 	payload: {
				// 		evaluateVisible: false,
				// 		score: 0,
				// 	}
				// })
			} else {
				Toast.info(ret && ret.errorMessage || '提交失败')
			}
		}
	},

	reducers: {
		updateState(state, action) {
			return { ...state, ...action.payload };
		},
	}
}
