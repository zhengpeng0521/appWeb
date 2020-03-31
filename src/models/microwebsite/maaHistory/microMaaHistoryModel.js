import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'microMaaHistory',

    state: {
		historyList : [],
		historypageData : {},
		historyIsLoading : false,
		historyIsLoadingEnd : false,
		pageIndex : 0,
		pageSize : 20,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microMaaHistory') {
					document.title = "预约历史";
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					
					let link = `${window.location.origin}${window.location.pathname}?router=microWebsite&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}`;
					dispatch({
						type: 'getMicroMaaHistory',
						payload : {
							orgId 		: location.query.orgId || orgId,
							tenantId 	: location.query.tenantId || tenantId,
							orgCover	: location.state&&location.state.orgCover || '',
							orgName		: location.state&&location.state.orgName || '',
							shareLink	: link,
						}
					});
				}
		  	});
		},
    },

    effects: {

		*getMicroMaaHistory({payload}, {select, call, put}) {
			
			let model = yield select (state => state.microMaaHistory);
			model.pageIndex = 0;
			let paramter = {
				orgId 		: payload.orgId,
				tenantId	: payload.tenantId,
				pageIndex	: 0,
				pageSize 	: 20,
				openid		: openid,
			}
			
			let {ret} = yield call(service.getHistoryList, parse(paramter));
			if(ret && ret.errorCode === 9000) {		

				yield put({
					type: 'updateState',
					payload: {
						...payload,
						historyList : ret.results,
						historypageData : ret.data,
					},
				});
				
				setTimeout(function () {
					let share_title  = payload.orgName || '微官网';
					let share_desc   = `${payload.orgName || '微官网'} -- 主页`;
					let share_link   = payload.shareLink;
					let share_imgUrl = payload.orgCover || 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
					let params = {share_title,share_desc,share_link,share_imgUrl,};
					weixinSign(params);
				}, 0);	
				
			} else {
				Toast.info(ret&&ret.errorMessage || '获取数据失败');
			};			
		},
			
		//加载下一页数据
        *getMoreMicroMaaHistory({payload}, {select, call, put}) {
			
			let model = yield select(state => state.microMaaHistory);
            let tempHistoryListArr = model.historyList;
			let paramter = {
				tenantId 	: model.tenantId,
				orgId 		: model.orgId,
				pageSize	: model.pageSize,
				pageIndex 	: ++model.pageIndex,
				openid		: openid,
			}
		
			let {ret} = yield call(service.getHistoryList, parse(paramter));
			if(ret && ret.errorCode === 9000) {
				ret.results&&ret.results.map((item, index) => {
					tempHistoryListArr.push(item);
				})

				  yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						historyList 		: tempHistoryListArr,
						historypageData 	: ret.data,
						courseIsLoading		: payload.activityIsLoading,
                    	courseIsLoadingEnd	: payload.activityIsLoadingEnd,
                  	},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '获取数据失败');
			}
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
