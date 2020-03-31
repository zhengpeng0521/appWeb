import { parse } from 'qs';
import * as service from '../../../services/weixin/microActivityService';
import * as service2 from '../../../services/common/common';

import { Toast } from 'antd-mobile';

export default {
	namespace: 'twoCodeModel',
	state: {
        codeLink:"",
        urlCode:'',
    },

	subscriptions: {
        	setup({ dispatch, history }) {
                history.listen(location => {
                    if (location.pathname === '/twoCodePage') {
                        dispatch({
                            type:"getPageFun",
                        })
                    }
                })
            }
	},

	effects: {
        *getPageFun({payload},{select,call,put}){

            let params = {
                name : window.init_data.name,
                openId : window.init_data.openId,
                orgId : window.init_data.orgId,
                type : window.init_data.type,
                gameName : window.init_data.gameName,
                gameBaseId : window.init_data.gameBaseId,
            }

            const {ret} = yield call(service2.gameWeixin,parse(params));
            if(ret && ret.errorCode == 9000){

                let urlCode = ret.data.data.codeUrl
                yield put({
                    type: 'updateState',
                    payload: {
                        urlCode:urlCode,
                    },
                });
            }

        },

//        * codePass({payload}, {select,call,put}) { //选择命名空间，异步，同步
//            const {ret} = yield call(youxi, parse(payload));
//
//            if(ret && ret.errorCode == 9000){
//
//                 yield put({
//                    type: 'updateState',
//                    payload: {
//
//                    },
//                });
//            }
//		}
	},

	reducers: {

		updateState(state, action) {
			return { ...state,
				...action.payload
			};
		},
	}
}
