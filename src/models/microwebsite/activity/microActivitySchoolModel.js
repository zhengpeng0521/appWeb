import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'microActivitySchoolModel',

    state: {
		activitySchoolIntroArr  : [],           //数据源
        activitySchoolIntroPage : {},
        isLoadingEnd            : false,        //是否加载完毕
        isLoading               : false,        //加载状态
        pageSize                : 10,
        pageIndex               : 0,
        type                    : '',
        nowState                : '',
    },

    subscriptions: {
	 	setup({ dispatch, history }) {
            history.listen(location => {
				
                if( location.pathname == '/microActivitySchool' ){
					document.title = "校区列表";
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					let acId = GetQueryString("acId");
					let nowState = GetQueryString("nowState");
					let orgIds = GetQueryString("orgIds");
					
					let link = `${window.location.origin}${window.location.pathname}?router=microActivitySchool&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}&orgIds=${orgIds || location.query.orgIds}&acId=${acId || location.query.acId}&nowState=${nowState || location.query.nowState}`;

					dispatch({
						type: 'getActivitySchool',
						payload : {
							acId			: location.query.acId || acId,
							tenantId 		: location.query.tenantId || tenantId,
							orgId 			: location.query.orgId || orgId,
							orgIds 			: location.query.orgIds || orgIds,
							nowState		: location.query.nowState || nowState,
						}
					});

					dispatch({
						type		: 'loadingWxShare',
						payload     : {							
							shareLink	: link,
						}
					});
                }
            })
		},
    },

    effects: {

		*loadingWxShare({payload}, {select, call, put}) {
			setTimeout(function () {
				let share_title  = '微官网';
				let share_desc   = '微官网';
				let share_link   = payload.shareLink;
				let share_imgUrl = 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad';
				let params = {share_title,share_desc,share_link,share_imgUrl,};
				weixinSign(params);
			}, 0);
		},
			
		*getActivitySchool({payload}, {select, call, put}) {
			let data = yield select(state => state.microActivitySchoolModel);
			data.pageIndex = 0;
            if(payload.nowState == '1'){                                        //课程
                let paramter = {
                      acId      : payload.acId,
                      orgIds    : payload.orgIds,
                      pageSize  : 10,
                      pageIndex : 0,
                      tenantId  : payload.tenantId,
                      orgid     : payload.orgId,
                      nickName  : payload.nickName,
                 }

                let {ret} = yield call(service.getActivitySchool, parse(paramter));
                if(ret&&ret.errorCode == 9000){
                    yield put({
                        type : 'updateState',
                        payload : {
                            ...payload,
                            activitySchoolIntroArr : ret.results || [],
                            activitySchoolIntroPage : ret.data || {},
                        }
                    })
                }else{
                    Toast.info(ret&&ret.errorMessage || '请求数据失败');
                }

            }else if(payload.nowState == '2'){                                  //活动
                
                let paramter = {
                      acId      : payload.acId,
                      pageSize  : 10,
                      pageIndex : 0,
                      tenantId  : payload.tenantId,
                      orgid     : payload.orgId,
                 }

                let {ret} = yield call(service.getSchoolList, parse(paramter));
                if(ret&&ret.errorCode == 9000){
                    yield put({
                        type : 'updateState',
                        payload : {
                            ...payload,
                            activitySchoolIntroArr : ret.results || [],
                            activitySchoolIntroPage : ret.data || {},
                        }
                    })
                }else{
                    Toast.info(ret&&ret.errorMessage || '请求数据失败');
                }

            }else if(payload.nowState == '3'){                                  //首页

                let paramter = {
                      pageSize  : 10,
                      pageIndex : 0,
                      tenantId  : payload.tenantId,
                      orgid     : payload.orgId,
                 }

                let {ret} = yield call(service.getActivitySchool, parse(paramter));

                if(ret&&ret.errorCode == 9000){
                    yield put({
                        type : 'updateState',
                        payload : {
                            ...payload,
                            activitySchoolIntroArr : ret.results || [],
                            activitySchoolIntroPage : ret.data || {},
                        }
                    })
                }else{
                    Toast.info(ret&&ret.errorMessage || '请求数据失败');
                }
            }
		},

        *getMoreActivitySchool({payload}, {select, call, put}) {


            let data = yield select(state => state.microActivitySchoolModel);
            if(data.nowState == '1'){                                       //课程

                let paramter = {
                      acId      : data.acId,
                      orgIds    : data.orgIds,
                      pageSize  : data.pageSize,
                      pageIndex : ++data.pageIndex,
                      orgid     : data.orgId,
                      tenantId  : data.tenantId,
                 }

                let {ret} = yield call(service.getCourseList, parse(paramter));

                let tempA = data.activitySchoolIntroArr;
                for(let idx in ret.results) {
                    tempA.push(ret.results[idx]);
                }

                yield put({
                    type : 'updateState',
                    payload : {
                        ...payload,
                        activitySchoolIntroArr  : tempA,
                        activitySchoolIntroPage : ret.data,
                        isLoading               : payload.isLoading,
                        isLoadingEnd            : payload.isLoadingEnd,
                    }
                })

            } else if(data.nowState == '2'){                                //活动

                let paramter = {
                      acId     : data.acId,
                      pageSize  : data.pageSize,
                      pageIndex : ++data.pageIndex,
                      orgid     : data.orgId,
                      tenantId  : data.tenantId,
                 }

                let {ret} = yield call(service.getSchoolList, parse(paramter));

                let tempA = data.activitySchoolIntroArr;
                for(let idx in ret.results) {
                    tempA.push(ret.results[idx]);
                }

                yield put({
                    type : 'updateState',
                    payload : {
                        ...payload,
                        activitySchoolIntroArr  : tempA,
                        activitySchoolIntroPage : ret.data,
                        isLoading               : payload.isLoading,
                        isLoadingEnd            : payload.isLoadingEnd,
                    }
                })

            }else if(data.nowState =='3'){                                 //首页
				
                let paramter = {
                      pageSize  : data.pageSize,
                      pageIndex : ++data.pageIndex,
                      orgid     : data.orgId,
                      tenantId  : data.tenantId,
                 }

                let {ret} = yield call(service.getActivitySchool, parse(paramter));

                let tempA = data.activitySchoolIntroArr;
                for(let idx in ret.results) {
                    tempA.push(ret.results[idx]);
                }
                yield put({
                    type : 'updateState',
                    payload : {
                        ...payload,
                        activitySchoolIntroArr  : tempA,
                        activitySchoolIntroPage : ret.data,
                        isLoading               : payload.isLoading,
                        isLoadingEnd            : payload.isLoadingEnd,
                    }
                })
            }
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
