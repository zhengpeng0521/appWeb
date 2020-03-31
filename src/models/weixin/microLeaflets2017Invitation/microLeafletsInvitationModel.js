import { parse } from 'qs';
import *as service from '../../../services/weixin/microActivityService';
import reqwest from 'reqwest';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'invitation_namespace',

    state: {
        nIndex                  : 0,
		playClassName 	        : 'startPlayer',
		mainData		        : {},
		detailDataSource	    : [],
		initWindowHeight		: 0,
    },

    subscriptions: {
         setup({ dispatch, history }) {
              history.listen(location => {
                  if (location.pathname === '/microInvitationPage') {
					  _hmt.push(['_trackEvent', '微活动2017邀请函', `租户ID=${location.query.tenantId || ''}`, `机构ID=${location.query.org_id}`, '-']);
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
					'C004', payload.caseValue || '获取失败',
					payload.activityDataId || '获取失败',
					maindata.name || '获取失败',
				)
				
                yield put({
                    type: 'updateState',
                    payload: {
                        ...payload,
                        mainData	 		: JSON.parse(ret.data.activityData.mainData),
                        detailDataSource  	: JSON.parse(ret.data.activityData.detailData),
						initWindowHeight	: document.body.clientHeight,
                    },
                });

			} else {
				Toast.info(ret&&ret.errorMessage || '获取数据失败');
			}
		},
				
		//提交宝宝信息
		*submit({payload}, {select, call, put}) {
			let model 	= yield select(state => state);			
			let parameter 		= {
				id 			: model.invitation_namespace.activityDataId, 
				name 		: payload.paramter.baby_name, 
				mobile 		: payload.paramter.baby_phone,
				birthday 	: payload.paramter.baby_bir,
				note 		: payload.paramter.baby_note,
			};

			const {ret} = yield call(service.submitAPI, parse(parameter));
			if(ret && ret.errorCode == 9000) {
				Toast.info('提交成功');
				sa.track("m_l_load", buriedLPointParam);
			} else {
				Toast.info(ret&&ret.errorMessage || '提交失败');
			}
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
