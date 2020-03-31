import { parse } from 'qs';
import {queryRecordData,} from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'signSelfRecordModel',

    state: {
        pageIndex: 0,
        pageSize: 5,
        resultCount: 0,
        recordList: [],//签到记录

        tenantId: '',
        orgId: '',
        stuId: '',
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(({ pathname, query }) => {
			  	if (pathname === '/signSelfRecord') {
					document.title = "我的签到记录";
                    //刷新缓存数据

                    dispatch({
						type: 'queryRecord',
                        payload: {
                            tenantId: query.tenantId,
                            orgId: query.orgId,
                            stuId: query.stuId,
                            recordList: [],
                        }
					});
              	}
		  	});
		},
    },

    effects: {

		*queryRecord({payload}, {select, call, put}) {
            let signSelfRecordModel = yield select(state => state.signSelfRecordModel);

            let pageIndex = payload && payload.pageIndex;
            let pageSize = payload && payload.pageSize;
            let tenantId = payload && payload.tenantId;
            let orgId = payload && payload.orgId;
            let stuId = payload && payload.stuId;

            pageIndex   = (pageIndex == undefined ) ? signSelfRecordModel.pageIndex : pageIndex;
            pageSize    = (pageSize == undefined ) ? signSelfRecordModel.pageSize : pageSize;
            tenantId    = (tenantId == undefined ) ? signSelfRecordModel.tenantId : tenantId;
            orgId       = (orgId == undefined ) ? signSelfRecordModel.orgId : orgId;
            stuId       = (stuId == undefined ) ? signSelfRecordModel.stuId : stuId;

            let recordList = (payload && payload.recordList) || signSelfRecordModel.recordList;

            let params = {tenantId, orgId, stuId, pageIndex, pageSize,};

            let { ret } = yield call( queryRecordData, parse(params));
            if( ret && ret.errorCode == 9000 ){
                ret.results && ret.results.length > 0 && ret.results.map(function(recordItem) {
                    recordList.push(recordItem);
                });
                yield put({
                    type : 'updateState',
                    payload : {
                        recordList,
                        resultCount: ret.data.resultCount,
                        ...params
                    }
                });
            } else {
                Toast.fail((ret && ret.errorMessage) || '查询请假记录出错啦!');
            }
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
