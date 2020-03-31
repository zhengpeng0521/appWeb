import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import ShareMobileComponent from '../../../components/checkstand/share/ShareMobileComponent';
import OpenAlertComponent from '../../../components/checkstand/share/h5-alert/OpenAlertComponent';

function ShareMobilePage({ dispatch,ShareMobileModel }) {
    let {
        modalLoading,
        openModelVisible,
        errorCode,
        flag,
    } = ShareMobileModel;

   /*验证码发送*/
   function getValiCode(mobile){
        dispatch({
            type:'ShareMobileModel/updateState',
            payload:{
                flag : true,
            }
        })
        if((/^1\d{10}$/.test(mobile))){
			dispatch({
	            type:'ShareMobileModel/sendTemplateMessage',
	            payload:{
	                mobile,
	            }
	        });
		}else{
			Toast.info('验证码发送失败，请核实手机号格式');
		}
    }


    /*返回*/
    function goBackFunc(){
        dispatch(routerRedux.push({
            pathname: 'ShareHeadPage',
            query:{ }
        }))
        dispatch({
            type:'ShareMobileModel/updateState',
            payload:{
                flag : false,
            }
         })
//        dispatch({
//            type:'ShareMobileModel/updateState',
//            payload:{
//                openModelVisible : true,
//            }
//        });
    }

    /*提交*/
    function submitFunc(values){
         dispatch({
            type : 'ShareMobileModel/queryMchInfo',
            payload : {
                values
            }
         });
//         dispatch({
//            type:'ShareMobileModel/updateState',
//            payload:{
//                flag : false,
//            }
//        })
     }

    /*弹窗消失*/
    function CancelOpenModal(){
        dispatch({
            type:'ShareMobileModel/updateState',
            payload:{
                openModelVisible : false,
            }
        });
    }

    /*免费开通*/
    function openFunc(){
        dispatch(routerRedux.push({
            pathname: '/LoginPage',
            query:{ }
        }))
    }

//    if(flag){
//        setInterval(countDown(),1000);
//    }
//    function countDown() {        //倒计时的方法
//        if(sec > 0) {
//            let time =  document.getElementById("showtimes")
//        }
//    }

    let ShareMobileProps = {
        goBackFunc,
        modalLoading,
        submitFunc,
        getValiCode,
        errorCode,
        flag,
    };

    let OpenAlertProps = {
        CancelOpenModal,
        openModelVisible,
        openFunc,
    };

    return (
        <div>
            <ShareMobileComponent {...ShareMobileProps} />
            {
                openModelVisible ?
                <OpenAlertComponent {...OpenAlertProps}/>
                :
                null
            }

        </div>

    );
}


ShareMobilePage.propTypes = {
  ShareMobileModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ ShareMobileModel }) {
  return { ShareMobileModel };
}

export default connect(mapStateToProps)(ShareMobilePage);
