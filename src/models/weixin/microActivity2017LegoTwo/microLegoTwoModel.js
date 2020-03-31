import { parse } from 'qs';
import * as service from '../../../services/weixin/microActivityService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'lego_two',

    state: {
		playClassName 	        : 'startPlayer',
		mainData		        : {},
		detailDataSource	    : [],
		nIndex					: 0,
		initWindowHeight		: 0,
    },

    subscriptions: {
         setup({ dispatch, history }) {
              history.listen(location => {
                  if (location.pathname === '/microLegoTwoPage') {
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

			const {ret} = yield call(service.getActivityAPI, parse(payload));

            if(ret && ret.errorCode == 9000) {
             	let maindata  = JSON.parse(ret.data.activityData.mainData);
	            let shareInfo = maindata.share_config;
                let url = String(window.document.location.href);

				setTimeout(function () {
					wx.ready(function(){
						document.getElementById('audio_cp').play();
						document.addEventListener("WeixinJSBridgeReady", function () {
							audio.play();
						}, false);
					});

					let share_title  	= shareInfo.title;
					let share_desc  	= shareInfo.intro;
					let share_link   	= String(window.document.location.href);
					let share_imgUrl 	= shareInfo.imgurl;
					let share_id		= payload.activityDataId;
					let params = {share_title,share_desc,share_link,share_imgUrl,share_id};
					weixinSign(params, 'a');

			  	}, 1000);
				
				setParam(
					payload.tenantId || '',
					payload.org_id || '',
					'H017', payload.caseValue || '获取失败',
					payload.activityDataId || '',
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
				Toast.info(ret&&ret.errorMessage || '获取失败');
			}
		},

		//提交宝宝信息
		*submit({payload}, {select, call, put}) {
			
			let model 	= yield select(state => state.lego_two);

			let parameter 		= {
				id 			: model.activityDataId,
				name 		: payload.paramter.baby_name,
				mobile 		: payload.paramter.baby_phone,
				birthday 	: payload.paramter.baby_bir,
			};

			const {ret} = yield call(service.submitAPI, parse(parameter));
			if(ret && ret.errorCode == 9000) {
				Toast.info('提交成功');
				sa.track("m_a_load", buriedPointParam);
			} else {
				Toast.info(ret&&ret.errorMessage || '提交失败');
			}
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
