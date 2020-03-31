import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , ActivityIndicator} from 'antd-mobile';
import StepTwoComponent from '../../../components/checkstand/register/StepTwoComponent';

function StepTwoPage({ dispatch,StepsModel , SearchModel }) {
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
        /*第二步*/
        firmName,       //企业名称
		leading,        //负责人
		leadingTel,     //负责人电话
		code,           //验证码
		leadingSfz,     //身份证号
		sfzFront,       //身份证正面
		sfzOpposite,    //身份证反面
		licenceNum,     //营业执照注册号
		licenceImg,     //营业执照图片
        organizeNum,    //组织机构代码
        orgImg,         //组织机构代码图片
        accountImg,     //开户许可证图片
        /*第三步*/
        bankUser,       //银行卡户主
	    bankType,       //银行卡类型
//        contactLine,    //联行号
        errorMessage,   //错误信息

        modalLoading,   //页面加载

        flag,          //判断审核失败的两种情况

        bool,

    } = StepsModel;

    let {
       account,
    } = SearchModel;

    /*返回上一步*/
    function goBack(){
        dispatch(routerRedux.push({
            pathname: 'StepOnePage',
        }))
		dispatch({
			 type:'StepsModel/updateState',
	            payload:{
	                bool : false,
	            }
		})
    }

    //发送验证码
	function getValiCode(leadingTel){
		if((/^1\d{10}$/.test(leadingTel))){
			dispatch({
	            type:'StepsModel/sendMsg',
	            payload:{
	                leadingTel,
	            }
	        });
            dispatch({
                type : 'StepsModel/updateState',
                payload : {
                    bool : true,
                }
            })
		}else{
			Toast.info('验证码发送失败，请核实手机号格式');
		}

	}

    /*提交*/
	function submitUpdate(values){
        dispatch({
            type : 'StepsModel/saveRegister',
            payload : {
                values,
                account,
            }
        });
       dispatch({
           type : 'StepsModel/updateState',
           payload:{
               flag : true,
			   bool : false,
           }
       })
	}

    /*负责人更新*/
    function leadingChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               leading : value,
            }
        })
    }

    /*负责人手机*/
    function leadingTelChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               leadingTel : value,
            }
        })
    }

    /*验证码*/
    function codeChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               code : value,
            }
        })
    }

    /*负责人身份证更新*/
    function leadingSfzChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               leadingSfz : value,
            }
        })
    }

    /*营业执照更新*/
    function licenceNumChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               licenceNum : value,
            }
        })
    }

    /*组织机构代码更新*/
    function organizeNumChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               organizeNum : value,
            }
        })
    }
    /*身份证正面照更新*/
    function sfzFrontChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               sfzFront : value,
            }
        })
    }
    /*身份证反面照更新*/
    function sfzOppositeChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               sfzOpposite : value,
            }
        })
    }
    /*营业执照照更新*/
    function licenceImgChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               licenceImg : value,
            }
        })
    }
    /*组织机构代码照更新*/
    function orgImgChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               orgImg : value,
            }
        })
    }
    /*开户许可证照更新*/
    function accountImgChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               accountImg : value,
            }
        })
    }
	/*收单协议*/
	function protocolFunc(){
        dispatch(routerRedux.push({
            pathname: 'ProtocolPage',
            query:{ }
        }))
    }


    let StepTwoProps = {
        step,              //步骤
        title,             //标题
        getValiCode,       //验证码发送点击事件
         /*第一步*/
        workType,          //商户类型选择

        /*第二步*/
        firmName,          //企业名称
		leading,           //负责人
		leadingTel,        //负责人电话
		code,              //验证码
		leadingSfz,        //身份证号
		sfzFront,          //身份证正面照
		sfzOpposite,       //身份证反面照
		licenceNum,        //营业执照注册号
		licenceImg,        //营业执照图片
        organizeNum,       //组织机构代码
        orgImg,            //组织机构代码图片
        accountImg,        //开户许可证图片
        goBack,            //返回上一步
        leadingChange,  //负责人更新
        leadingTelChange,  //负责人手机更新
        codeChange,       //验证码更新
        leadingSfzChange,   //负责人身份证
        licenceNumChange,   //营业执照更新
        organizeNumChange,  //组织机构代码更新
        sfzFrontChange,     //身份证正面照更新
        sfzOppositeChange,  //身份证反面照更新
        licenceImgChange,   //营业执照照片更新
        orgImgChange,       //组织机构代码照更新
        accountImgChange,   //开户许可证照更新

        /*第三步*/
       	bankUser,          //银行卡户主
		bankType,          //银行卡类型
//        contactLine,       //联行号
        account,        //开户支行搜索结果

        submitUpdate,      //提交按钮事件

        modalLoading,      //页面加载

        flag,              //判断审核失败的两种情况
        bool,
		protocolFunc,      //跳转到收单协议
    };

    return (
        <div>
            <ActivityIndicator text="loading" toast animating ={modalLoading} />
            <StepTwoComponent {...StepTwoProps} />
        </div>

    );
}

StepTwoPage.propTypes = {
//  StepsModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ StepsModel , SearchModel }) {
  return { StepsModel , SearchModel};
}

export default connect(mapStateToProps)(StepTwoPage);
