import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'microCourseDetail',

    state: {
        courseSource    : {},
    },

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microCourseDetail') {
					document.title = "课程详情";
					function GetQueryString(name) {
						var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						var r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					var tenantId = GetQueryString("tenantId");
					var actId = GetQueryString("actId");
					var orgId = GetQueryString("orgId");
					let link = `${window.location.origin}${window.location.pathname}?router=microCourseDetail&tenantId=${tenantId}&orgId=${orgId || location.query.orgId}&actId=${actId || location.query.actId}`;

					dispatch({
						type: 'getCouseDetail',
						payload : {
							tenantId 		: location.query.tenantId || tenantId,
							orgId 			: location.query.orgId || orgId,
							courseId 		: location.query.actId || actId,
							shareLink		: link,
						}
					});
              	}
		  	});
		},
    },

    effects: {

		*getCouseDetail({payload}, {select, call, put}) {
			
            let paramter = {
                tenantId 	: payload&&payload.tenantId,
                orgId 		: payload&&payload.orgId,
                actId     	: payload&&payload.courseId,
            }
			
		  	yield put({
				type : 'updateState',
				payload : {
					...payload,
				}
			})
			
            let {ret} = yield call(service.getCouseDetail,parse(paramter))
            if(ret&&ret.errorCode == 9000){
                 yield put({
                    type : 'updateState',
                    payload : {
                        courseSource : ret.results || {},
                    }
				 })
								
				sa.track("mic_site_c_load", {
					_tenantId	: payload&&payload.tenantId || '未获取',
					_orgId		: payload&&payload.orgId || '未获取',
					_wxId		: openid || '未获取',
					_micSiteCName : ret.results&&ret.results.name || '未获取',
				});
			
				 let paramaterData = ret&&ret.results;
				 let imageArr = paramaterData.detailPic.split(',');
				 setTimeout(function () {
					let share_title  = paramaterData.name || '微官网';
					let share_desc   = `${share_title || '微官网'}--课程详情`;
					let share_link   = payload.shareLink;
					let share_imgUrl = imageArr.length > 0 ? `${imageArr[0]}!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
					let params = {share_title,share_desc,share_link,share_imgUrl,};
					weixinSign(params);
				}, 0);
            }else{
                Toast.info(ret&&ret.errorMessage || '获取课程详情失败');
            }
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
