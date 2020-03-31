import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FreeTrialTopIntro from '../../../components/saas/free-trial/FreeTrialTopIntro';
import FreeTrialBottomContent from '../../../components/saas/free-trial/FreeTrialBottomContent';
import FreeTrialBottomUrl from '../../../components/saas/free-trial/FreeTrialBottomUrl';
import FresTrialAlertModal from '../../../components/saas/free-trial/FresTrialAlertModal';

function FreeTrialPage({ dispatch, freeTrialModelSet }) {

    let {
        htmlDetail,               //富文本内容
        AlertModalVisible,        //提示框是否显示
        AlertModalContent,        //提示框内容
        SchoolTypeAllArray,       //表单学校类型数组
        SchoolType,               //选中学校类型
        SchoolTypeInitialValue,   //学校表单项类型填充值
        SchoolTypeModalClose,     //表单中选择学校类型modal是否关闭
        AlertModalSubmiting,      //表单是否提交中
        AlertModalSubmitSuccess,  //表单是否提交成功
        BottomText,               //最下方文案
        BottomUrl,                //最下方的外链
        openType,                 //打开表单的方式(微信/支付宝/移动端浏览器/PC端浏览器)
    } = freeTrialModelSet

    /*选择学校类型*/
    let chooseSchool = function(value,name){
        dispatch({
            type:'freeTrialModelSet/updateState',
            payload:{
                SchoolType : value,
                SchoolTypeModalClose : true,
                SchoolTypeInitialValue : name,
            }
        });
    }

    /*提交时验证表单项*/
    let openModal = function(title){
        dispatch({
            type:'freeTrialModelSet/updateState',
            payload:{
                AlertModalVisible : true,
                AlertModalContent : title,
            }
        });
    }

    /*关闭提示框*/
    let closeAlertModal = function(){
        dispatch({
            type:'freeTrialModelSet/updateState',
            payload:{
                AlertModalVisible : false,
            }
        });
    }

    /*表单提交*/
    let formSubmit = function(data){
        dispatch({
            type:'freeTrialModelSet/formSubmit',
            payload:{
                ...data
            }
        });
    }

    let freeTrialTopIntroProps = {
        htmlDetail
    }

    let freeTrialBottomContentProps = {
        openModal,
        chooseSchool,
        openType,
        formSubmit,
        SchoolTypeAllArray,
        SchoolType,
        SchoolTypeInitialValue,
        SchoolTypeModalClose,
        AlertModalSubmiting,
    }

    let freeTrialBottomUrlProps = {
        BottomText,
        BottomUrl
    }

    let fresTrialAlertModalProps = {
        AlertModalVisible,
        AlertModalContent,
        AlertModalSubmitSuccess,
        closeAlertModal
    }

    return (
        <div>
            <FreeTrialTopIntro {...freeTrialTopIntroProps} />
            <FreeTrialBottomContent {...freeTrialBottomContentProps} />
            <FreeTrialBottomUrl {...freeTrialBottomUrlProps} />
            <FresTrialAlertModal {...fresTrialAlertModalProps} />
        </div>
    );
}

function mapStateToProps({ freeTrialModelSet }) {
  return { freeTrialModelSet };
}

export default connect(mapStateToProps)(FreeTrialPage);
