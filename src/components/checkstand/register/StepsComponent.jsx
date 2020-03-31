import React from 'react';
import styles from './StepsComponent.less';
import { Button , InputItem , List , Steps, WhiteSpace , Tabs , ActivityIndicator , Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import StepOneComponent from './StepOneComponent';
import StepTwoComponent from './StepTwoComponent';
import StepThreeComponent from './StepThreeComponent';
import StepFourComponent from './StepFourComponent';

const TabPane = Tabs.TabPane;
const Step = Steps.Step;
const Item = List.Item;
function StepsComponent({
	step,           //步骤数
    title,          //步骤名称
    StepOperation,  //步骤切换事件
    submitFun,      //确定 或 修改信息
    getValiCode,    //获取验证码事件
    radioChange,    //商户类型的切换
    /*第一步*/
    workType,       //商户类型
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
    orgImg,         //组织结构代码图片
    accountImg,     //开户许可证图片

    /*第三步*/
    bankUser,       //银行卡户主
	bankNum,        //银行卡号
	bankType,       //银行卡类型
//    contactLine,    //联行号
	addr,           //开户行地址
	province ,      //省
    city ,          //市
    district ,      //区
    stepThreeChange,  //银行卡类型切换
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

    orgList,       //机构列表
    orgName,       //机构名称
    submitUpdate,  //提交事件
    errorMessage,  //错误信息
    status,        //审核状态
    modalLoading,  //页面加载
    queryinfo,
    flag,          //判断审核失败的两种情况
    auditMsg,      //审核失败反馈信息
    bool,

    form: {
    	getFieldProps,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        setFields,
        resetFields,
    }
}) {
   /*提交*/
   function onSubmit(status){
        validateFields((err, values) => {
        	if(!!((err && (err.code || err.leading || err.leadingSfz || err.leadingTel || err.sfzFront || err.sfzOpposite)))){
                if(err.leading){
                     Toast.info("请输入负责人");
                }else if(err.leadingTel){
                     Toast.info("您输入的手机号有误");
                }else if(err.code){
                     Toast.info("请输入验证码");
                }else if(err.leadingSfz){
                     Toast.info("请输入身份证号");
                } else if(err.sfzFront){
                     Toast.info("上传身份证正面异常，请重新上传");
                }else if(err.sfzOpposite){
                     Toast.info("上传身份证反面异常，请重新上传");
                }
                return;
            }else if(( err && (err.code || err.leading || err.leadingSfz || err.leadingTel || err.sfzFront || err.sfzOpposite || err.licenceNum || err.licenceImg))){
                if(err.leading){
                     Toast.info("请输入负责人");
                }else if(err.leadingTel){
                     Toast.info("您输入的手机号有误");
                }else if(err.code){
                     Toast.info("请输入验证码");
                }else if(err.leadingSfz){
                     Toast.info("请输入身份证号");
                } else if(err.sfzFront){
                     Toast.info("上传身份证正面异常，请重新上传");
                }else if(err.sfzOpposite){
                     Toast.info("上传身份证反面异常，请重新上传");
                }else if(err.licenceNum){
                    Toast.info("请输入营业执照工商号");
                }else if(err.licenceImg){
                    Toast.info("上传营业执照影印件异常，请重新上传");
                }
                return;
            }else if(( err && (err.code || err.leading || err.leadingSfz || err.leadingTel || err.sfzFront || err.sfzOpposite || err.licenceNum || err.licenceImg || err.organizeNum || err.orgImg || err.accountImg || err.firmName ))){
                if(err.firmName){
                    Toast.info("请输入企业名称");
                }else if(err.leading){
                     Toast.info("请输入负责人");
                }else if(err.leadingTel){
                     Toast.info("您输入的手机号有误");
                }else if(err.code){
                     Toast.info("请输入验证码");
                }else if(err.leadingSfz){
                     Toast.info("请输入身份证号");
                } else if(err.sfzFront){
                     Toast.info("上传身份证正面异常，请重新上传");
                }else if(err.sfzOpposite){
                     Toast.info("上传身份证反面异常，请重新上传");
                }else if(err.licenceNum){
                    Toast.info("请输入营业执照工商号");
                }else if(err.licenceImg){
                    Toast.info("上传营业执照影印件异常，请重新上传");
                }else if(err.organizeNum){
                    Toast.info("请输入组织机构代码")
                }else if(err.orgImg){
                    Toast.info("上传组织机构代码影印件异常，请重新上传");
                }else if(err.accountImg){
                    Toast.info("上传营业开户许可证影印件异常，请重新上传");
                }
                return;
            }

            submitUpdate && submitUpdate(values, ()=> {
                setFields && setFields();
                Modal.success({
                    title  : '提交成功!',
                });
            });
        });
//       if(window._init_data){
	        let buriedPointParam = {
	        	PageCode : 'h5_checkstand',
	        	PageName: '收银台h5',
	        	Activeness: 1,
				_orgId : '',
				_tenantId : '',
				_opId : '',
				_account : "",
				_btnName : '提交',
			}
			sa && sa.track('click' , buriedPointParam);
//		}
   }

    let StepOneProp = {
        step,            //步骤数
        StepOperation,   //步骤切换事件
        title,           //步骤名称
        radioChange,     //商户类型切换
        workType,        //商户类型
        businessName,    //商户名称
        businessShort,   //商户简称
        businessPerson,  //联系人
        businessTel,     //联系人电话
        serviceTel,      //客服电话
        orgList,         //机构列表
        orgName,         //结构名称
        bool,
        bankType,        //银行卡类型
        bankUser,        //银行卡户名
        form: {
            getFieldProps,
            validateFields,
            getFieldsValue,
            getFieldValue,
            getFieldError,
            setFieldsValue,
            setFields,
            resetFields,
        }
    }
    let StepTwoProp = {
          step,            //步骤数
          StepOperation,   //步骤切换事件
          title,           //步骤名称
          workType,        //商户类型
          getValiCode,     //验证码发送事件
          firmName,        //企业名称
          leading,         //负责人
          leadingTel,      //负责人电话
          code,            //验证码
          leadingSfz,      //身份证号
          sfzFront,        //身份证正面
          sfzOpposite,     //身份证反面
          licenceNum,      //营业执照注册号
          licenceImg,      //营业执照图片
          organizeNum,     //组织机构代码
          orgImg,          //组织机构代码图片
          accountImg,      //开户许可证图片
          bool,
          bankType,
          bankUser,
          form: {
            getFieldProps,
            validateFields,
            getFieldsValue,
            getFieldValue,
            getFieldError,
            setFieldsValue,
            setFields,
            resetFields,
          }
    }
    let StepThreeProp = {
          step,            //步骤数
          StepOperation,   //步骤切换事件
          title,           //步骤名称
          firmName,        //企业名称
          leading,         //负责人
          workType,        //商户类型
          bankUser,        //银行卡户主
          bankNum,         //银行卡号
          bankType,        //银行卡类型
//          contactLine,     //联行号
          addr,            //开户行地址
          province ,       //省
          city ,           //市
          district ,       //区
          stepThreeChange, //银行卡类型的切换事件
          bool,
          bankName ,      //开户银行
          accountOpen ,   //开户支行
          bankNameArr ,   //开户银行列表
          bankAddrData,   //省市列表
          bankNameChange, //开户银行更新
          bankAddrChange, //开户地址更新
          accountArr,     //开户支行列表
          searchFunc,     //打开搜索页面
          account,        //开户支行搜索结果
          bankNumChange,  //银行卡号的更新
          bankUserChange,  //银行卡户名的更新
          isSearch,
          form: {
            getFieldProps,
            validateFields,
            getFieldsValue,
            getFieldValue,
            getFieldError,
            setFieldsValue,
            setFields,
            resetFields,
          }
    }
    let StepFourProp = {
          step,           //步骤数
          StepOperation,  //步骤数切换事件
          title,          //步骤名称
          submitFun,      //修改信息或确定
          errorMessage,   //错误信息
          status,         //审核状态
          flag,           //判断审核失败的两种情况
          orgList,
          auditMsg,       //审核失败反馈信息
    }

    return(
           <div className={styles.register_all}>
            {
                step == '3' ?
                null
                :
                <div className='step'>
                   <Steps current = { step } direction="horizontal">
		                { !!title && title.map((item,index) => {
		                   		return <Steps.Step title = { item } key = { index } className='step_num'/>
		                   })
		                }
		            </Steps>
                </div>
            }
               <div className='content_all'>
                   <ActivityIndicator text="loading" toast animating ={modalLoading} />
                        <Tabs defaultActiveKey="0"  activeKey={ step + '' } animated={false}>
                          <TabPane tab="" key="0"><StepThreeComponent {...StepThreeProp} /></TabPane>
                          <TabPane tab="" key="1"><StepOneComponent {...StepOneProp} /> </TabPane>
                          <TabPane tab="" key="2"><StepTwoComponent {...StepTwoProp} /></TabPane>
                          <TabPane tab="" key='3'><StepFourComponent {...StepFourProp}/> </TabPane>
                        </Tabs>
                </div>
                {
					step == '2' ?
					<div className='btn_end' >
		        		<Button type = 'primary' size = 'small' onClick = {() => onSubmit(status)}>提交</Button>
                        <Button type = 'primary' size = 'small'  onClick = {() => StepOperation('third_pre')} disabled = { step == '0' ? true : false }>上一步</Button>
			    	</div>
			    	:null
				}
           </div>
    );
}

export default createForm()(StepsComponent);
