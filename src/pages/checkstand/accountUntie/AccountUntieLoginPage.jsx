import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AccountUntieLoginComponent from '../../../components/checkstand/accountUntie/AccountUntieLoginComponent';

function AccountUntieLoginPage({ dispatch,AccountUntieLoginModel }) {
    let {
        errorMessage,
        modalLoading,
        flag,
        mchId,
    } = AccountUntieLoginModel;

    function getValiCode(mobile){
        if((/^1\d{10}$/.test(mobile))){
			dispatch({
	            type:'AccountUntieLoginModel/sendTemplateMessage',
	            payload:{
	                mobile,
	            }
	        });
            dispatch({
                type : 'AccountUntieLoginModel/updateState',
                payload :{
                    flag : true,
                }
            })
		}else{
			Toast.info('验证码发送失败，请核实手机号格式');
		}
    }

    /*提交*/
    function submitFunc(values){
        dispatch({
                type : 'AccountUntieLoginModel/queryMchInfoByOpenID',
                payload : {
                    values
                }
            });
        dispatch({
            type : 'AccountUntieLoginModel/updateState',
            payload :{
                flag : false,
                mchId,
            }
        });
    }


    let AccountUntieLoginProps = {
        getValiCode,submitFunc,errorMessage,modalLoading,flag,
    };
    return (
        <AccountUntieLoginComponent {...AccountUntieLoginProps} />
    );
}

AccountUntieLoginPage.propTypes = {
  AccountUntieLoginModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AccountUntieLoginModel }) {
  return { AccountUntieLoginModel };
}

export default connect(mapStateToProps)(AccountUntieLoginPage);
