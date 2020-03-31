import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import MailLoginComponent from '../../../components/checkstand/mailApply/MailLoginComponent';
import OpenAlertComponent from '../../../components/checkstand/mailApply/OpenAlertComponent';

function MailLoginPage({ dispatch,MailLoginModel }) {
    let {
        flag,
        modalLoading,
        alertVisible,
    } = MailLoginModel;

   /*验证码发送*/
   function getValiCode(mobile){
       if(mobile){
           dispatch({
                type:'MailLoginModel/updateState',
                payload:{
                    flag : true,
                }
            })
       }
       if((/^1\d{10}$/.test(mobile))){
			dispatch({
	            type:'MailLoginModel/sendTemplateMessage',
	            payload:{
	                mobile,
	            }
	        });
		}else{
			Toast.info('验证码发送失败，请核实手机号格式');
		}
    }

    /*提交*/
    function submitFunc(values){
         dispatch({
            type : 'MailLoginModel/queryMchInfo',
            payload : {
                values
            }
         });
     }

     /*关闭弹框*/
     function CancelOpenModal(){
         dispatch({
             type : 'MailLoginModel/updateState',
             payload : {
                 alertVisible : false,
             }
         })
     }

    let MailLoginProps = {
        submitFunc,
        getValiCode,
        flag,
        modalLoading,
    };

    let OpenAlertProps = {
        alertVisible,
        CancelOpenModal,
    }

    return (
        <div>
            <MailLoginComponent {...MailLoginProps} />
            {
                alertVisible ?
                <OpenAlertComponent {...OpenAlertProps}/>
                :
                null
            }
        </div>

    );
}


MailLoginPage.propTypes = {
  MailLoginModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ MailLoginModel }) {
  return { MailLoginModel };
}

export default connect(mapStateToProps)(MailLoginPage);
