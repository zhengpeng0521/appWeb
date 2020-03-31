import { parse } from 'qs';
import * as service from '../../../../services/weixin/microActivityService.js';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'flow_into',

    state: {
		aniName : '',
		showAni : false,
		requestMark : false,
		externalLinks : 'http://www.baidu.com',
		defaultStyle : '<p><span style="font-size: 14px;"><span style="color: rgb(255, 0, 0);">请注意，</span><span style="color: rgb(255, 255, 0);">这里是一个富文本编辑器，</span><span style="color: rgb(128, 100, 162);">可以点击。</span></span></p>',
    },

    subscriptions: {
		setup({ dispatch, history }) {
		   history.listen(location => {
			   dispatch({
				  	type: 'updateState',
				  	payload: {
					  	activityId	 	: location.query.activityId,
				  	}
			  	})
			})
    	},
	},
	
    effects: {
		
		*getFlowInfo({payload}, {select, call, put}) {
			let model = yield select(state => state.flow_into);
			   
			let parameter = {
				templateId 	: payload.id || '',
			};
			const {ret} = yield call(service.submitAPI, parse(parameter));
			
			if(ret && ret.errorCode == 9000) {
				 yield put({
                    type: 'updateState',
                    payload: {
                        ...payload,
						requestMark : true,
						defaultStyle : '',
						externalLinks : '',
                    },
                });

			} else {
				Toast.info(ret&&ret.errorMessage || '');
			}
		},
	},
	
    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
