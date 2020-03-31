import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import LoginComponent from '../../../components/checkstand/login/LoginComponent';

function LoginPage({ dispatch,LoginModel }) {
    let {
        errorMessage,
        modalLoading,
        flag,
    } = LoginModel;

    function getValiCode(mobile){
        if((/^1\d{10}$/.test(mobile))){
			dispatch({
	            type:'LoginModel/sendTemplateMessage',
	            payload:{
	                mobile,
	            }
	        });
            dispatch({
                type : 'LoginModel/updateState',
                payload :{
                    flag : true,
                }
            })
		}else{
			Toast.info('验证码发送失败，请核实手机号格式');
		}
    }

    function submitFunc(values){
         dispatch({
            type : 'LoginModel/queryMchInfo',
            payload : {
                values
            }
        })
    }


    let LoginProps = {
        getValiCode,submitFunc,errorMessage,modalLoading,flag,
    };
    return (
        <LoginComponent {...LoginProps} />
    );
}

LoginPage.propTypes = {
  LoginModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ LoginModel }) {
  return { LoginModel };
}

export default connect(mapStateToProps)(LoginPage);
