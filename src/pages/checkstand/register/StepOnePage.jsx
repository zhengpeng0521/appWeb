import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import StepOneComponent from '../../../components/checkstand/register/StepOneComponent';

function StepOnePage({ dispatch,StepsModel , SearchModel }) {
    let {
        step,           //步骤数
        title,          //步骤名
        /*第一步*/
        workType,       //商户类型选择
        businessName,   //商户名称
		businessShort,  //商户简称
		businessPerson, //联系人
		businessTel,    //联系人电话
        serviceTel,     //客服电话
        /* 第二步 */
        orgAddr,        //经营地址
        bankAddrData,   //经营地址列表
        orgAddr_province,  //经营地址省
        orgAddr_city,      //经营地址市
        /*第三步*/
        bankUser,       //银行卡户主
	    bankType,       //银行卡类型
//        contactLine,    //联行号
        modalLoading,   //页面加载

    } = StepsModel;

    /*第二项到第一项跳转*/
    function goBack(){
        dispatch(routerRedux.push({
            pathname: 'StepThreePage',
        }))
    }

     /*第二项到第三项跳转*/
    function OneToTwo(){
        dispatch(routerRedux.push({
            pathname: 'StepTwoPage',
        }));
    }

    /*商户类型的切换*/
    function radioChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                workType : value,
            }
        });
    }

    /*商户全称的更新*/
    function bussNameChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               businessName : value,
            }
        })
    }

     /*商户简称的更新*/
    function bussShortChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               businessShort : value,
            }
        })
    }

     /*客服电话的更新*/
    function serviceTelChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               serviceTel : value,
            }
        })
    }

     /*联系人的更新*/
    function bussPersonChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               businessPerson : value,
            }
        })
    }

     /*联系方式的更新*/
    function bussTelChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               businessTel : value,
            }
        })
    }

     /*详细地址*/
     function orgAddrChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                orgAddr: value
            }
        })
    }
	/*经营地址更新*/
	function orgAddrPrevChange(pro,city){
		 dispatch({
            type:'StepsModel/updateState',
            payload:{
                orgAddr_province : pro,
                orgAddr_city : city,
            }
        })
	}

    let StepOneProps = {
        step,              //步骤
        title,             //标题
        radioChange,       //商户类型的切换
        workType,          //商户类型选择
        businessName,      //商户名称
		businessShort,     //商户简称
		businessPerson,    //联系人
		businessTel,       //联系人手机
		serviceTel,        //客服电话
        goBack,        //第二项到第一项跳转
        OneToTwo,         //第二项到第三项跳转
        bussNameChange,   //商户全称更新
        bussShortChange,   //商户简称更新
        serviceTelChange,   //客服电话更新
        bussPersonChange,   //联系人更新
        bussTelChange,     //联系人电话更新
        /*第二步字段增加-CYF*/
        orgAddr,             //经营地址
        bankAddrData,        //经营地址列表
        orgAddrChange,       //详细地址改变
        orgAddr_province, //经营地址省
        orgAddr_city,     //经营地址市
		orgAddrPrevChange,   //经营地址更新
        /*第三步*/
       	bankUser,          //银行卡户主
		bankType,          //银行卡类型
//        contactLine,       //联行号
        modalLoading,      //页面加载
    };

    return (
        <div>
            <StepOneComponent {...StepOneProps} />
        </div>

    );
}

StepOnePage.propTypes = {
//  StepsModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ StepsModel , SearchModel }) {
  return { StepsModel , SearchModel};
}

export default connect(mapStateToProps)(StepOnePage);
