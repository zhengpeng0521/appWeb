import React from 'react';
import { parse } from 'qs';
import {bindWeixinToMobile,bindWeixinToCode} from '../../../services/common/common';

import { Toast } from 'antd-mobile';
export default {
	namespace: 'bindingModel',
	state: {
		value: "",
		verifyCode: "",
		hasError: false,
		dlgTipTxt: '获取',
		seconds: 59,
        orgId: 0,
        sourceOpenId: '',
        ignoreError:false,
        weChatType:'manage',
        tenantId:0,
        setTimer:false,
	},

    subscriptions: {
        setup({ dispatch, history }) {
           	history.listen( location => {

                if(location.pathname === '/bindingPage' ){
//                    let str = window.location.href;
//                    let num = str.indexOf("/");
//                    let arr = str.split("/")
//                    for(var i=0;i < arr.length;i++){
//                       var str1 = arr.join(',')
//                    }
//                    console.info(str1,"111")
                    let a = window.init_data.orgId;
                    let b = window.init_data.tenantId;

                    console.info(a,b)
//                    window.init_data.tenantId,
                    dispatch({
						type : 'updateState',
						payload : {
							orgId 	  : window.init_data.orgId || 0,
							tenantId  : window.init_data.tenantId || 0,
                            sourceOpenId : window.init_data.openId || 0,
						}
					})
                }
            }
        )}
    },


	effects: {
		* codePass({payload}, {select,call,put}) { //选择命名空间，异步，同步
            const {ret} = yield call(bindWeixinToCode, parse(payload));

            if(ret && ret.errorCode == 1000){
                let errMag = ret.errorMessage
                Toast.info(<div className="ToastCss">{errMag}</div>);
                 yield put({
                    type: 'updateState',
                    payload: {
                        setTimer:true,
                    },
                });
            }

            if(ret && ret.errorCode == 9000) {
                Toast.info(<div className="ToastCss">验证码发送成功</div>);
            }
		},

		* bindingClick({payload}, {select,call,put}) { //选择命名空间，异步，同步
//            console.info('payload', payload);
			const {ret} = yield call(bindWeixinToMobile, parse(payload));

            if(ret && ret.errorCode == 3000){
                let errMag = ret.errorMessage
                Toast.info(<div className="ToastCss">{errMag}</div>);
                yield put({
                    setTimer:true,
                })
            }

			if(ret && ret.errorCode == 9000) {
                Toast.info(<div className="ToastCss">手机号绑定成功</div>);
                yield put({
                    type: 'updateState',
                    payload: {
                       value: "",
		               verifyCode: "",
                    },
                });
			}
		}
	},

	reducers: {
		updateState(state, action) {
			return { ...state,
				...action.payload
			};
		},
	}
}
