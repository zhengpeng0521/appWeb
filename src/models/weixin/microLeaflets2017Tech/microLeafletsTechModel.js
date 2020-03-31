import { parse } from 'qs';
import *as service from '../../../services/weixin/microActivityService';
import reqwest from 'reqwest';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'tech_namespace',

    state: {
		playClassName 	        : 'startPlayer',
		mainData		        : {},
		detailDataSource	    : [],
    },

    subscriptions: {
         setup({ dispatch, history }) {
              history.listen(location => {
                  if (location.pathname === '/microTechPage') {
					  _hmt.push(['_trackEvent', '微传单2017科技传单', `租户ID=${location.query.tenantId || ''}`, `机构ID=${location.query.org_id}`, '-']);
                      dispatch({
                          type: 'getAitivityData',
                          payload: {
                              activityDataId 	: location.query.activityDataId,
                              org_id			: location.query.org_id,
                              tenantId	  		: location.query.tenantId,
                              activityId	 	: location.query.activityId,
							  caseValue			: location.query.Case,
                          }
                        });
                    }
              });
         },
    },

    effects: {
		*getAitivityData({payload}, {select, call, put}) {

			const {ret, err} = yield call(service.getActivityAPI, parse(payload));

            if(ret && ret.errorCode == 9000) {
             	let maindata  = JSON.parse(ret.data.activityData.mainData);
	            let shareInfo = maindata.share_config;

				setTimeout(function () {
					let share_title  	= shareInfo&&shareInfo.title;
					let share_desc  	= shareInfo&&shareInfo.intro;
					let share_link   	= String(window.document.location.href);
					let share_imgUrl 	= shareInfo&&shareInfo.imgurl;
					let share_id		= payload.activityDataId;
					let params 			= {share_title,share_desc,share_link,share_imgUrl,share_id};
					weixinSign(params, 'l');

					wx.ready(function(){
						document.getElementById('audio_cp').play();
						document.addEventListener("WeixinJSBridgeReady", function () {
							audio.play();
						}, false);
					});
			  	}, 1000);

				setLParam (
					payload.tenantId || '获取失败',
					payload.org_id || '获取失败',
					'C003', payload.caseValue || '获取失败',
					payload.activityDataId || '获取失败',
					maindata.name || '获取失败',
				)
				
                yield put({
                    type: 'updateState',
                    payload: {
                        ...payload,
                        mainData	 		: JSON.parse(ret.data.activityData.mainData),
                        detailDataSource  	: JSON.parse(ret.data.activityData.detailData),
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
