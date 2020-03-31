import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AppLoginComponent from '../../../../components/checkstand/App/login/AppLoginComponent';

function AppLoginPage({ dispatch,AppLoginModel }) {
    let {
        modalLoading,
        flag,
        bool,

    } = AppLoginModel;



    function submitFunc(values){
//         dispatch({
//            type : 'AppLoginModel/queryMchInfo',
//            payload : {
//                values
//            }
//        })
    }

    function getValiCode(mobile){
         if((/^1\d{10}$/.test(mobile))){
			dispatch({
	            type:'AppLoginModel/genVerifyCodeM',
	            payload:{
	                mobile,
	            }
	        });
            dispatch({
                type : 'AppLoginModel/updateState',
                payload :{
                    flag : true,
                }
            })
		}else{
			Toast.info('验证码发送失败，请核实手机号格式');
		}
    }

    let AppLoginProps = {
        modalLoading,
        getValiCode,
        flag,
        submitFunc,
        bool,

    };
    return (
        <AppLoginComponent {...AppLoginProps} />
    );
}

AppLoginPage.propTypes = {
  AppLoginModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AppLoginModel }) {
  return { AppLoginModel };
}

export default connect(mapStateToProps)(AppLoginPage);
