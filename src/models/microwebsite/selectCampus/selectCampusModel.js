import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import {Toast, ActivityIndicator} from 'antd-mobile';

export default {

    namespace: 'selectCampus',

    state: {
		animating		 	: true,
		isLoading 			: false,
		isLoadingEnd 		: false,
		campusListSource 	: [],
		campusListDataPage 	: {},
		pageIndex 			: 0,
		pageSize 			: 20,
		activityIndicatorString : '加载中...',
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microSelectCampus') {
					document.title = "选择校区";
					function GetQueryString(name) {
						var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						var r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					var tenantId = GetQueryString("tenantId");
					dispatch({
						type: 'getSelectCampus',
						payload     : {							
							tenantId 	: location.query.tenantId || tenantId,
						}
					});

					dispatch({
						type: 'laodWxShare',
						payload     : {							
							shareLink : location.href,
						}
					});
              	}
		  	});
		},
    },

    effects: {
		
		*getSelectCampus({payload}, {select, call, put}) {
			
			let paramter = {
				tenantId 	: payload.tenantId,
				orgName 	: payload.orgName || '',
				pageIndex 	: 0,
				pageSize	: 20,
			}

			//请求机构列表
			let campusList = yield call(service.queryJuheList, parse(paramter));
            if(campusList.ret && campusList.ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						campusListSource 	: campusList.ret.results || [],
						campusListDataPage	: campusList.ret.data || {},
						animating		 	: false,
						activityIndicatorString : '加载成功',
						pageIndex			: 0,
                  	},
				});
            } else {
				yield put({
                    type: 'updateState',
                    payload: {
						...payload,
						animating		 : false,
						activityIndicatorString : '加载失败...',
                  	},
				});
				Toast.info(campusList.ret&&campusList.ret.errorMessage || '获取校区列表失败');
			};
		},	
					
		//加载下一页数据
        *getMoreSelectCampus({payload}, {select, call, put}) {
			
            let model = yield select(state => state.selectCampus);
									   
			let tempGameArr = model.campusListSource;
			
			let paramter = {
				tenantId 	: payload.tenantId,
				pageIndex 	: ++model.pageIndex,
				pageSize	: model.pageSize,
			}
						
			let campusList = yield call(service.queryJuheList, parse(paramter));
			if(campusList.ret && campusList.ret.errorCode === 9000) {

				campusList.ret.results&&campusList.ret.results.map((item, index) => {
					tempGameArr.push(item);
				})
				
				yield put({
					type: 'updateState',
					payload: {
						...payload,
						campusListSource 	: tempGameArr,
						campusListDataPage 	: campusList.ret.data,
						isLoading			: payload.isLoading,
						isLoadingEnd		: payload.isLoadingEnd,
						pageIndex			: paramter.pageIndex,
					},
				});
			} else {
				Toast.info(ret&&ret.errorMessage || '获取校区列表失败');
			}
			
		},		
			
		//分享
		*laodWxShare({payload}, {select, call, put}) {
			setTimeout(function () {
				let share_title  = '微官网';
				let share_desc   = '微官网';
				let share_link   = location.href;
				let share_imgUrl = 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad';
				let params = {share_title,share_desc,share_link,share_imgUrl,};
				weixinSign(params);
			}, 0);
		}
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
