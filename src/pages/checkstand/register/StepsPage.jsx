import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import StepsComponent from '../../../components/checkstand/register/StepsComponent';

function StepsPage({ dispatch,StepsModel , SearchModel }) {
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
	    bankNum,        //银行卡号
	    bankType,       //银行卡类型
//        contactLine,    //联行号
	    addr,           //开户行地址
        province ,      //省
	    city ,          //市
	    district ,      //区
        bankName ,      //开户银行
        accountOpen ,   //开户支行
        bankNameArr,    //开户银行列表
        bankAddrData,   //省市列表
        accountArr,     //开户支行列表
        isSearch,       //是否点击搜索

        orgName,        //机构名称
        orgList,        //机构列表
        errorMessage,   //错误信息
        status,         //审核的状态
        modalLoading,   //页面加载

        queryinfo,

        flag,          //判断审核失败的两种情况
        auditMsg,      //审核失败反馈信息

        bool,

    } = StepsModel;

    let {
       account,
    } = SearchModel;

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
    /*确定返回或是修改信息*/
    function submitFun(){
        if(flag){
                dispatch({
                    type:'StepsModel/updateState',
                    payload:{
                        step : 0,
                    }
                })
        }else{
            dispatch(routerRedux.push({
                pathname: 'chooseOrg_page',
                query:{ }
            }));
        }

	}

    /*提交*/
	function submitUpdate(values){
//        console.log("values",values);
//		if(id){
//			dispatch({
//				type : 'StepsModel/updateRegister',
//				payload : {
//					step : 3,
//					values,
//				}
//			})
//		}else{
			dispatch({
				type : 'StepsModel/saveRegister',
				payload : {
					step : 3,
					values,
                    account,
				}
			});
           dispatch({
               type : 'StepsModel/updateState',
               payload:{
                   flag : true,
               }
           })
//		}
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
    /*银行卡类型的切换*/
    function stepThreeChange(value){
         dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankType : value,
            }
        });
    }
    /*开户银行*/
    function bankNameChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankName : value,
            }
        })
    }
    /*银行卡号码*/
    function  bankNumChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankNum : value,
            }
        })
    }

    function bankUserChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankUser : value,
            }
        })
    }

    function bankAddrChange(pro,citys){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                province : pro,
                city : citys,
            }
        })
    }

    function searchFunc(){
        dispatch(routerRedux.push({
            pathname: 'SearchPage',
        }))
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               isSearch : true,
            }
        })
        dispatch({
            type:'SearchModel/queryBankCode',
            payload:{
                province,
                city,
                bankName,
            }
        })
    }

    let StepsProps = {
        step,              //步骤
        title,             //标题
        submitFun,         //确定或是修改信息事件
        getValiCode,       //验证码发送点击事件
        radioChange,       //商户类型的切换
         /*第一步*/
        workType,          //商户类型选择
        businessName,      //商户名称
		businessShort,     //商户简称
		businessPerson,    //联系人
		businessTel,       //联系人手机
		serviceTel,        //客服电话

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

        /*第三步*/
       	bankUser,          //银行卡户主
		bankNum,           //银行卡号
		bankType,          //银行卡类型
//        contactLine,       //联行号
		addr,              //开户行地址
        stepThreeChange,   //银行卡类型的切换
		province ,         //省
	    city ,             //市
	    district ,         //区
        bankName ,      //开户银行
        accountOpen ,   //开户支行
        bankNameArr,    //开户银行列表
        bankAddrData,   //省市列表
        bankNameChange, //开户银行更新
        bankAddrChange, //开户地址更新
        accountArr,     //开户支行列表
        searchFunc,     //打开搜索页面
        account,        //开户支行搜索结果
        bankNumChange,  //银行卡号的更新
        bankUserChange,  //银行卡户名的更新
        isSearch,

        submitUpdate,      //提交按钮事件
        orgList,           //机构列表
        errorMessage,      //错误信息
        status,            //审核状态
        modalLoading,      //页面加载

        orgName,           //机构名称

        queryinfo,

        flag,              //判断审核失败的两种情况
        auditMsg,          //审核失败反馈信息
        bool,
    };

    return (
        <div>
            <StepsComponent {...StepsProps} />
        </div>

    );
}

StepsPage.propTypes = {
//  StepsModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ StepsModel , SearchModel }) {
  return { StepsModel , SearchModel};
}

export default connect(mapStateToProps)(StepsPage);
