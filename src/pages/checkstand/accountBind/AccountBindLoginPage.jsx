import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AccountBindLoginComponent from '../../../components/checkstand/accountBind/AccountBindLoginComponent';

function AccountBindLoginPage({ dispatch,AccountBindLoginModel }) {
    let {
        errorMessage,
        modalLoading,
        flag,
        mchId,
    } = AccountBindLoginModel;

    function getValiCode(mobile){
        if((/^1\d{10}$/.test(mobile))){
			dispatch({
	            type:'AccountBindLoginModel/sendTemplateMessage',
	            payload:{
	                mobile,
	            }
	        });
            dispatch({
                type : 'AccountBindLoginModel/updateState',
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
                type : 'AccountBindLoginModel/queryMchInfo',
                payload : {
                    values
                }
            });
        dispatch({
            type : 'AccountBindLoginModel/updateState',
            payload :{
                flag : false,
                mchId,
            }
        });
    }


    let AccountBindLoginProps = {
        getValiCode,submitFunc,errorMessage,modalLoading,flag,
    };
    return (
        <AccountBindLoginComponent {...AccountBindLoginProps} />
    );
}

AccountBindLoginPage.propTypes = {
  AccountBindLoginModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AccountBindLoginModel }) {
  return { AccountBindLoginModel };
}

export default connect(mapStateToProps)(AccountBindLoginPage);
