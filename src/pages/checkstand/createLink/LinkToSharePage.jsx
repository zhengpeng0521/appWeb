import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import LinkToShareComponent from '../../../components/checkstand/createLink/LinkToShareComponent';

function LinkToSharePage({ dispatch,LinkToShareModel }) {
    let {
        errorMessage,
        modalLoading,
        flag,
    } = LinkToShareModel;

    function getValiCode(mobile){
        if((/^1\d{10}$/.test(mobile))){
			dispatch({
	            type:'LinkToShareModel/sendTemplateMessage',
	            payload:{
	                mobile,
	            }
	        });
            dispatch({
                type : 'LinkToShareModel/updateState',
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
            type : 'LinkToShareModel/openIdBind',
            payload : {
                values
            }
        })
         dispatch({
            type : 'LinkToShareModel/updateState',
            payload :{
                flag : false,
            }
        });
    }

    function resetFunc(){
         dispatch({
            type : 'LinkToShareModel/updateState',
            payload :{
                flag : false,
            }
        });
    }

    let LinkToShareProps = {
        getValiCode,submitFunc,errorMessage,modalLoading,flag,resetFunc,
    };
    return (
        <LinkToShareComponent {...LinkToShareProps} />
    );
}

LinkToSharePage.propTypes = {
  LinkToShareModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ LinkToShareModel }) {
  return { LinkToShareModel };
}

export default connect(mapStateToProps)(LinkToSharePage);
