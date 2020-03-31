import React from 'react';
import styles from './StepThreeComponent.less';
import { Button , InputItem , List , Picker ,Flex ,Radio ,Toast ,Steps , ActivityIndicator} from 'antd-mobile';
import {createForm} from 'rc-form';
import ChinaDivision from './CascaderAddressOptions';

const Item = List.Item;
const Step = Steps.Step;

function StepThreeComponent({
	step,           //步骤
    title,          //步骤名称
    bankUser,       //银行卡户主
    bankNum,        //银行卡号
    bankType,       //银行卡类型
    addr,           //开户行地址
//    contactLine,    //联行号
    province ,      //省
    city ,          //市
    district ,      //区
    stepThreeChange,  //银行卡类型切换事件
    bankName ,      //开户银行
    accountOpen ,   //开户支行
    bankNameArr,    //开户银行列表
    bankAddrData,   //省市列表
    bankNameChange, //开户银行更新
    bankAddrChange, //开户地址更新
    accountArr,     //开户支行列表
    searchFunc,     //搜索页面打开
    account,        //开户支行搜索结果
    bankNumChange,  //银行卡号的更新
    bankUserChange,  //银行卡户名的更新
    isSearch,
    modalLoading,
    ThreeToOne,     //第一项到第二项的跳转
    form: {
        getFieldProps,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        setFields,
        resetFields,
    },

}) {

    let radioSource1 = [
        {
            label: '请选择',
            value: '03',
        },
        {
            label: '对私',
            value: '01',
        },
        {
            label: '对公',
            value: '02',
        },
    ];

    let bankNameList = [
        {
            label : '请选择',
            value : '00',
        }
    ];
    bankNameArr && bankNameArr.map(function(item,index){
        let bankNameObj = {};
        bankNameObj.label = item;
        bankNameObj.value = item;
        bankNameList.push(bankNameObj);
    })

    /*遍历开户支行*/
    let accountList = [];
    accountArr && accountArr.map(function(item,index){
        let accountObj = {};
        accountObj.label = item.bankName;
        accountObj.value = item.bankCode;
        accountList.push(accountObj);
    })

    /*校验银行卡类型是否选择*/
    function checkbank(rule, value, callback){
        if(value[0] !='' && value[0] !== '03'){
            callback();
        }else{
            Toast.info("请选择银行卡类型");
        }
    }

    /*校验开户银行是否选择*/
    function checkbankName(rule, value, callback){
        if(value[0] && value[0]!='00'){
            callback();
        }else{
            Toast.info("请选择开户银行");
        }
    }

  /*开户行地址*/
	let addrInit = [];
	addrInit.push(
		province
	)
	addrInit.push(
		city
	)

  /*
 	 * 银行卡号更新
 	 */
    function bankNumChangeFunc(value){
        bankNumChange(value);
    }

    /*
 	 * 银行卡户名更新
 	 */
    function bankUserChangeFunc(value){
        bankUserChange(value);
    }

    /*
 	 * 账户类型切换
 	 */
 	function radioChangeFunction(value){
			if(value && value.length>0){
					let data=value[0];
					stepThreeChange(data);
			}
	 }

    /*
 	 * 开户银行获取
 	 */
 	function bankNameChangeFunc(value){
		if(value && value.length>0){
			let data=value[0];
			bankNameChange(data);
		}
	 }

    /*
 	 * 开户地址获取
 	 */
 	function bankAddrChangeFunc(value){
			if(value && value.length>0){
				let [pro,citys] = value;
				bankAddrChange(pro,citys);
			}
	 }

	/*校验开户行地址*/
	function checkBankAddr(rule, value, callback){
			if(value[0] && value[1]){
					callback();
			}else{
					Toast.info("请选择开户地址");
			}
	}

	/*下一步*/
	function onSubmit(){
		validateFields((error, values) => {
			if (error && Object.keys(error).length > 0) {
						for (const i in error) {
								Toast.info(error[i].errors[0].message);
								return;
						}
				}else if(!isSearch && bankType == '02'){
						Toast.info("请选择开户支行");
						return;
				}
				else{
					ThreeToOne();
				}
		});

//        if(window._init_data){
		let buriedPointParam = {
			PageCode : 'h5_checkstand',
			PageName: '收银台h5',
			Activeness: 1,
			_orgId : '',
			_tenantId : '',
			_opId : '',
			_account : "",
			_btnName : '第一步',
		}
		sa && sa.track('click' , buriedPointParam);
//		}
	}

    return(
        <div className={styles.register_all}>
           <div className='step'>
               <Steps current={0} direction="horizontal">
                  <Step title="结算信息" />
                  <Step title=" 商户信息" />
                  <Step title="资质信息" />
                </Steps>
            </div>
            <div className='content_all'>
						 	<div className='stepThree'>
								 <List>
										 <Picker
											 {...getFieldProps('bankType', {
													initialValue : [bankType],
													rules: [
															{ required: true, },
															{ validator: checkbank },
													],
												})}
												title="类型"
												extra="请选择"
												cols={1}
												data={radioSource1}
												onPickerChange ={radioChangeFunction}
											>
												<List.Item arrow="horizontal">账户类型</List.Item>
											</Picker>
											<InputItem
													{...getFieldProps('bankUser', {
															initialValue : bankUser,
															rules: [
																	{ required: true, message : '请输入银行卡户名' },
															],
													})}
													value = {bankUser}
													placeholder="请输入银行卡户名"
													onChange={bankUserChangeFunc}
											>银行卡户名</InputItem>
											<div className={styles.tip}>对私请填写银行卡户主姓名，对公请填写银行卡公司名称</div>
											<InputItem
												{...getFieldProps('bankNum', {
														initialValue : bankNum,
														rules: [
																{ required: true, message : '请输入银行卡卡号'},
														],
												 })}

												 type="number"
												 placeholder="请输入银行卡卡号"
												 onChange={bankNumChangeFunc}
											>银行卡号</InputItem>
										 <div className={styles.tip}>请填写结算银行卡号，网商银行将自动结算款项至该卡</div>
											<Picker
														{...getFieldProps('bankName', {
															initialValue : [bankName],
															rules: [
																	{ required: true, },
																	{ validator : checkbankName }
															],
														})}
														title="开户银行"
														extra="请选择"
														cols={1}
														data={bankNameList}
														onPickerChange ={bankNameChangeFunc}
													>
												<List.Item arrow="horizontal">开户银行</List.Item>
											</Picker>
											<Picker
														{...getFieldProps('addr', {
															initialValue : addrInit,
															rules: [
																	{ required: true, },
																	{ validator: checkBankAddr },
															],
														})}
														title="开户地址"
														extra="请选择省市"
														cols={2}
														data={ChinaDivision}
														onPickerChange ={bankAddrChangeFunc}
													>
												<List.Item arrow="horizontal">开户地址</List.Item>
											</Picker>
											{
												 bankType == '02' ?
												 <Item
														arrow="horizontal"
														extra={account}
														onClick={() => searchFunc()}
													>
															开户支行
													</Item>
													:
													null
											}

									</List>
									<div className='btns' >
										<Button type = 'primary' size = 'small'  onClick = {() => onSubmit()} disabled = { step == (title.length - 1) ? true : false }>下一步</Button>
									</div>
               </div>
            </div>
        </div>
    );
}
export default createForm()(StepThreeComponent);
