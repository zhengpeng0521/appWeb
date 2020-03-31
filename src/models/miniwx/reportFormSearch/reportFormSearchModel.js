import {

} from '../../../services/miniwx/reportIndex/reportIndexService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Toast } from 'antd-mobile';

export default {

    namespace : 'reportFormSearchModel',

    state : {
		timeVisible         : false,                             //搜索框显隐
		startDate           : undefined,
		endDate             : undefined,
		timeSelectKey       : undefined,                         //所选筛选 key值
		timeSelectValue     : undefined,                         //所选筛选 value值
		timeSelectDisabled  : true,                              //时间禁止选择

		selectedYear        : undefined,                         //所选年份
		selectedMonth       : undefined,                         //所选月份
	},

    subscriptions : {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/reportIndex' ) {
              	}
		  	});
		},
    },

    effects: {
		//打开 时间筛选框
		*openTimeSelectModal({ payload },{ call, put, select }){
			let { timeVisible, startDate, endDate, timeSelectKey, timeSelectValue, selectedYear, selectedMonth } = payload;
			yield put({
				type : 'updateState',
				payload : { timeVisible, startDate, endDate, timeSelectKey, timeSelectValue, selectedYear, selectedMonth }
			})
		},

		//点击搜索
		*clickToSearch({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					timeVisible : false
				}
			})
		},

		//通过年月搜索
		*clickToSearchByYear({ payload },{ call, put, select }){
			let state = yield select( state => state.reportFormSearchModel );
			let year = (!!state.selectedYear && state.selectedYear[0]) || undefined;
			let month = (!!state.selectedMonth && state.selectedMonth[0]) || undefined;
			yield put({
				type : 'updateState',
				payload : {
					timeVisible : false
				}
			})
		}
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
