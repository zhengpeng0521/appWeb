import {
	saveEvaluateInfo,             //提价评价信息

} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'parentEvaluateModel',

    state: {
		tenantId   : undefined,
		orgId      : undefined,
		stuId      : undefined,
		cpdId      : undefined,
		cpmId      : undefined,
		type       : undefined,
		parentId   : undefined,
		score: 0,            //评价等级
		resetNum: undefined,
		item       : {},
		isgo:false,
		picList :[] // 上传图片视频的数组
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/evaluate' ) {
					document.title = '评价内容';
					dispatch({
						type : 'updateState',
						payload : {
							orgId 	  : location.query.orgId,
							tenantId  : location.query.tenantId,
							cpStuId   : location.query.cpStuId,
							cpdId     : location.query.cpdId,
							cpmId     : location.query.cpmId,
							type      : location.query.type,
							parentId  : location.query.parentId,
							item      : location.state.item
							// picList   : location.state.pic
						}
					})
              	}
		  	});
		},
    },

    effects: {
		*saveInfo({ payload },{ call, put, select }){
			let state = yield select( state => state.parentEvaluateModel );
			// let states = yield select( state => state.parentsNoticeDetailModel );
			let { values } = payload;
			let baseParams = {
				orgId 	  : state.orgId,
				tenantId  : state.tenantId,
				cpStuId   : state.cpStuId,
				cpdId     : state.cpdId,
				cpmId     : state.cpmId,
				type      : state.type,
				parentId  : state.parentId
			}
			if (!state.score || !values.comment || values.comment == '') {
				Toast.info('请完善评价信息');
				return
			}
			let newV = {
				...values,
				pictures: values.pictures.join(',')
			}
			let { ret } = yield call( saveEvaluateInfo, ({ score : state.score, ...baseParams, ...newV }));
			if( ret && ret.errorCode == 9000 ){
				Toast.info( '提交成功' );
				yield put(
					routerRedux.go(-1)
					// routerRedux.push({
					// 	pathname : '/parents_notice_detail',
					// 	query:  {
					// 		...baseParams
					// 	},
					// 	state : {
					// 		item : state.item
					// 	}
					// })
				)
				yield put({
					type: 'updateState',
					payload: {
						score: 0,
						picList:[]
					}
				})
			}else{
				Toast.info( ret && ret.errorMessage || '提交失败' )
			}
		}
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
