import React from 'react';
import styles from './StepOneComponent.less';
import { Button , InputItem , List , Picker, Toast , Steps , ActivityIndicator,TextareaItem } from 'antd-mobile';
import {createForm} from 'rc-form';

const Item = List.Item;
const Step = Steps.Step;

function StepOneComponent({
	step,           //步骤条数
    title,          //步骤名称
    workType,       //商户类型选择
    radioChange,    //商户类型的切换事件
    businessName,   //商户名称
    businessShort,  //商户简称
    businessPerson, //联系人
    businessTel,    //联系人电话
    serviceTel,     //客服电话
    bankType,       //银行卡类型
    bankUser,       //银行卡户名
    bankAddrData,   //经营地址列表
    orgAddr,        //经营地址
    orgAddr_province, //经营地址省
    orgAddr_city,     //经营地址市
    modalLoading,
    goBack,        //第二项到第一项跳转
    OneToTwo,         //第二项到第三项跳转
    bussNameChange,   //商户全称更新
    bussShortChange,   //商户简称更新
    serviceTelChange,   //客服电话更新
    bussPersonChange,   //联系人更新
    bussTelChange,     //联系人电话更新
    businessShortAddrData,   //省市列表
    orgAddrChange,     //详细地址改变
	orgAddrPrevChange,   //经营地址改变
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
    /*下一步*/
    function onSubmit(){
         if(workType == '04' || workType == ''){
            Toast.info("请选择商户类型");
            return;
         }
         validateFields((error, values) => {
            if (error && Object.keys(error).length > 0) {
                for (const i in error) {
                    Toast.info(error[i].errors[0].message);
                    return;
                }
            }else {
                OneToTwo();
            }
         });

         let buriedPointParam = {
            PageCode : 'h5_checkstand',
            PageName: '收银台h5',
            Activeness: 1,
            _orgId : '',
            _tenantId : '',
            _opId : '',
            _account : "",
            _btnName : '第二步',
         }
         sa && sa.track('click' , buriedPointParam);
    }
    let dataSource1 = [
        {
          label:'请选择',
          value:'04',
        },
        {
          label: '自然人',
          value: '01',
        },
        {
          label: '个体工商户',
          value: '02',
        },
    ]

    let dataSource2 = [
        {
          label:'请选择',
          value:'04',
        },
        {
          label: '企业商户',
          value: '03',
        },
    ]

	/*
 	 * 单选按钮切换
 	 */
 	function radioChangeFunction(value){
        if(value && value.length>0){
            let data=value[0];
            radioChange(data);
        }
     }

	/*
	 * 校验电话
	 */
	 function checkTel(rule, value, callback) {
			if((/^1\d{10}$/.test(value))){
					callback();
			} else {
					callback('联系方式格式不正确');
			}
    }

     /*
     * 校验字数
     */
    function checkNum(rule, value, callback){
        let data = [];
        data.push(value);
        if(data && data[0].length<=12){
            callback();
        }else{
            callback("商户简称最多12字");
        }
    }

    /*
     * 校验详细地址字数
     */
    function checkorgAddrNum(rule, value, callback){
        let data = [];
        data.push(value);
        if(data && data[0].length<=30){
            callback();
        }else{
            callback("经营地址最多30字");
        }
    }

    /*商户全称*/
    function bussNameChangeFunc(value){
        setFieldsValue({businessName: value})
        bussNameChange(value);
    }

    /*商户简称*/
    function bussShortChangeFunc(value){
        setFieldsValue({businessShort: value})
        bussShortChange(value);
    }

    /*客服电话*/
    function serviceTelChangeFunc(value){
        setFieldsValue({serviceTel: value})
        serviceTelChange(value);
    }

    /*联系人*/
    function bussPersonChangeFunc(value){
        setFieldsValue({businessPerson: value})
        bussPersonChange(value);
    }

    /*联系人电话*/
    function bussTelChangeFunc(value){
        setFieldsValue({businessTel: value})
        bussTelChange(value);
    }

	/*经营地址*/
	let addrInit = [];
	addrInit.push(
		orgAddr_province
	)
	addrInit.push(
		orgAddr_city
	)


     /*遍历省市级联*/
     let provinceArr = bankAddrData && bankAddrData.province;
     let cityArr = bankAddrData && bankAddrData.cityList;
     cityArr && cityArr.forEach((city) => {
         const matchProvince = provinceArr.filter(province => province.code === city.provinceCode)[0];
         if (matchProvince) {
             matchProvince.children = matchProvince.children || [];
             matchProvince.children.push({
                 label: city.name,
                 value: city.name,
                 children: city.children,
             });
         }
     });
     const ChinaDivision = provinceArr && provinceArr.map(province => ({
         label: province.name,
         value: province.name,
         children: province.children,
     }));

    /*
 	 * 详细地址获取
 	 */
 	function orgAddrChangeFunc(value){
        setFieldsValue({orgAddr: value})
        orgAddrChange(value);
     }
	/*经营地址更新*/
	function orgAddrPrevChangeFunc(value){
		if(value && value.length>0){
             let pro=value[0];
             let citys=value[1];
             orgAddrPrevChange(pro,citys);
         }
	}
	/*校验经营地址*/
    function checkPrevAddr(rule, value, callback){
        if(value[0] && value[1]){
            callback();
        }else{
            Toast.info("请选择经营地址");
        }
    }

	return(
        <div className={styles.register_all}>
           <div className='step'>
                <Steps current={1} direction="horizontal">
                  <Step title="结算信息" />
                  <Step title=" 商户信息" />
                  <Step title="资质信息" />
                </Steps>
            </div>
            <div className='content_all'>
               <ActivityIndicator text="loading" toast animating ={modalLoading} />
               <div className='stepOne'>
                    <List>
                        {
                            bankType == '01' ?
                            <div>
                                <Picker
                                    {...getFieldProps('workType', {
                                        initialValue : [workType],
                                        rules: [
                                            { required: true, type:'array' },
                                        ],
                                    })}
                                    extra="请选择"
                                    data = {dataSource1}
                                    cols={1}
                                    onPickerChange ={radioChangeFunction}
                                >
                                  <List.Item arrow="horizontal">商户类型</List.Item>
                                </Picker>
                                <div className={styles.tip}>建议选择个体工商户，若无营业执照请选择自然人</div>
                                <InputItem
                                    {...getFieldProps('businessName', {
                                        initialValue : businessName,
                                        rules: [
                                            { required: true, message: '请输入门店名称' },
                                        ],
                                    })}
                                    placeholder='请输入门店名称'
                                    onChange={bussNameChangeFunc}
                                > 商户全称</InputItem>
                                <div className={styles.tip}>提交对私银行卡，请勿带“公司”二字</div>
                            </div>
                            :
                            bankType == '02' ?
                            <div>
                                <Picker
                                    {...getFieldProps('workType', {
                                        initialValue : [workType],
                                        rules: [
                                            { required: true, type:'array' },
                                        ],
                                    })}
                                    extra="请选择"
                                    data = {dataSource2}
                                    cols={1}
                                    onPickerChange ={radioChangeFunction}
                                >
                                  <List.Item arrow="horizontal">商户类型</List.Item>
                                </Picker>
                                <InputItem
                                    value={bankUser}
                                    placeholder='请输入门店名称'
                                    disabled
                                > 商户全称</InputItem>
                                <div className={styles.tip}>自动读取对公银行卡户名，如需修改请返回修改银行卡户名</div>
                            </div>
                            :
                            null
                        }
                        <InputItem
                            {...getFieldProps('businessShort', {
                                initialValue : businessShort,
                                rules: [
                                    { required: true, message: '请输入门店简称' },
                                    { validator: checkNum },
                                ],
                            })}
                            placeholder='请输入门店简称'
                            onChange = {bussShortChangeFunc}
                        >商户简称</InputItem>
                        <div className={styles.tip}>用户付款看到的收款方名称</div>
                        <Picker
                              {...getFieldProps('orgAddrPrev', {
                                initialValue : addrInit,
                                rules: [
                                    { required: true, },
									{validator :checkPrevAddr}
                                ],
                              })}
                              title="经营地址"
                              extra="请选择省市"
                              cols={2}
                              data={ChinaDivision}
                              onPickerChange ={orgAddrPrevChangeFunc}
                            >
                          <List.Item arrow="horizontal">经营地址</List.Item>
                        </Picker>
                        <TextareaItem
                             {...getFieldProps('orgAddr', {
                                initialValue : orgAddr,
                                rules: [
                                    { required: true, message: '请输入详细地址' },
                                    { validator: checkorgAddrNum}
                                ],
                            })}
                            title='详细地址'
                            placeholder='请输入详细地址'
                            onChange = {orgAddrChangeFunc}
                            autoHeight
                        ></TextareaItem>

                        <InputItem
                             {...getFieldProps('serviceTel', {
                                initialValue : serviceTel,
                                rules: [
                                    { required: true, message: '请输入客服电话' },
                                ],
                            })}
                            placeholder='请输入客服电话'
                            onChange = {serviceTelChangeFunc}
                        >客服电话</InputItem>
                        <div className={styles.tip}>用户付款看到的收款方的客服电话</div>
                        <InputItem
                            {...getFieldProps('businessPerson', {
                                initialValue : businessPerson,
                                rules: [
                                    { required: true,  message: '请输入联系人'},
                                ],
                            })}
                            placeholder='请输入联系人姓名'
                            onChange = {bussPersonChangeFunc}
                        >联系人姓名</InputItem>
                        <div className={styles.tip}>开通结果将会联系此人</div>
                        <InputItem
                            {...getFieldProps('businessTel', {
                                initialValue : businessTel,
                                rules: [
                                    { required: true,  message: '请输入联系方式' },
                                    { validator: checkTel },
                                ],
                            })}
                            type="number"
                            placeholder='请输入联系人手机号'
                            onChange = {bussTelChangeFunc}
                        >联系方式</InputItem>
                        <div className={styles.tip}>开通结果短信(系统账号和密码)将会发送到该号码</div>
                     
                    </List>
                    <div className='btn_two' >
                        <Button type = 'primary' size = 'small' onClick = {() => onSubmit()} disabled = { step == (title.length - 1) ? true : false }>下一步</Button>
                        <Button type = 'primary' size = 'small' onClick = {goBack} >上一步</Button>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default createForm()(StepOneComponent);
