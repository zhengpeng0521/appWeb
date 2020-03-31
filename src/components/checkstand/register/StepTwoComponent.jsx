import React from 'react';
import styles from './StepTwoComponent.less';
import { Button , InputItem , List , Picker , ImagePicker ,  WhiteSpace , Flex , Toast , Steps , ActivityIndicator} from 'antd-mobile';
import {createForm} from 'rc-form';
import CustomImagePicker from './custom-image-picker/CustomImagePicker';

const Item = List.Item;
const Step = Steps.Step;

function StepTwoComponent({
	step,            /*步骤数*/
    title,           //步骤名称
    workType,        //商户类型
    getValiCode,     //验证码发送事件
    firmName,        //企业名称
    leading,         //负责人
    leadingTel,      //负责人手机号
    code,            //验证码
    leadingSfz,      //负责人身份证
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
    modalLoading,
    goBack,        //返回上一步
    leadingChange,  //负责人
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
    submitUpdate,
	protocolFunc,
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

    /*
     * 校验身份证
     */
    function checkSfz(rule, value, callback){
    	if((/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value))){
            callback();
        } else {
            callback('身份证格式不正确');
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
    /*函数传递*/
    function getValiCodeEvent(){
        getValiCode(getFieldValue('leadingTel'));
    }
    /*时间倒计时的参数*/
    let HeadContTimeProps = {
        bool,
        getValiCodeEvent,
    }
    /*图片选择上传的参数*/
    let imagePickerProps_1 = {
        action: '/thinknode/upload/image',
        selectable :!(getFieldValue('sfzFront') && getFieldValue('sfzFront').length == 1),
    };
     let imagePickerProps_2 = {
        action: '/thinknode/upload/image',
        selectable :!(getFieldValue('sfzOpposite') && getFieldValue('sfzOpposite').length == 1),
    };
    let imagePickerProps_3 = {
        action: '/thinknode/upload/image',
        selectable :!(getFieldValue('licenceImg') && getFieldValue('licenceImg').length == 1),
    };
    let imagePickerProps_4 = {
        action: '/thinknode/upload/image',
        selectable :!(getFieldValue('orgImg') && getFieldValue('orgImg').length == 1),
    };
    let imagePickerProps_5 = {
        action: '/thinknode/upload/image',
        selectable :!(getFieldValue('accountImg') && getFieldValue('accountImg').length == 1),
    };

    /*身份证正面*/
    let idcard1InitList = [];
    if(sfzFront && sfzFront.length > 0) {
    	idcard1InitList.push({
    		uid: -1,
    		name: '-1',
    		status:'done',
    		url: sfzFront
    	});
    }

    /*身份证反面*/
    let idcard2InitList = [];
    if(sfzOpposite && sfzOpposite.length > 0) {
    	idcard2InitList.push({
    		uid: -1,
    		name: '-1',
    		status:'done',
    		url: sfzOpposite
    	});
    }

    //营业执照
    let licenceInitList = [];
    if(licenceImg && licenceImg.length > 0) {
    	licenceInitList.push({
    		uid: -1,
    		name: '-1',
    		status:'done',
    		url: licenceImg
    	});
    }

    //组织机构代码
    let orgInitList = [];
    if(orgImg && orgImg.length > 0) {
    	orgInitList.push({
    		uid: -1,
    		name: '-1',
    		status:'done',
    		url: orgImg
    	});
    }

    //开户行许可证
    let accountInitList = [];
    if(accountImg && accountImg.length > 0) {
    	accountInitList.push({
    		uid: -1,
    		name: '-1',
    		status:'done',
    		url: accountImg
    	});
    }

    function onSubmit(status){
        validateFields((error, values) => {
        	if (error && Object.keys(error).length > 0) {
                for (const i in error) {
                    Toast.info(error[i].errors[0].message);
                    return;
                }
            }
            submitUpdate && submitUpdate(values, ()=> {
                setFields && setFields();
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
    /*负责人更新*/
    function leadingChangeFunc(value){
        setFieldsValue({leading: value});
        leadingChange(value);
    }

    /*负责人手机更新*/
    function leadingTelChangeFunc(value){
        setFieldsValue({leadingTel: value});
        leadingTelChange(value);
    }

    /*验证码更新*/
    function codeChangeFunc(value){
        setFieldsValue({code: value});
        codeChange(value);
    }

    /*负责人身份证更新*/
    function leadingSfzChangeFunc(value){
        setFieldsValue({leadingSfz: value});
        leadingSfzChange(value);
    }

    /*营业执照更新*/
    function licenceNumChangeFunc(value){
        setFieldsValue({licenceNum: value});
        licenceNumChange(value);
    }

    /*组织机构代码更新*/
    function organizeNumChangeFunc(value){
        setFieldsValue({organizeNum: value});
        organizeNumChange(value);
    }
    /*身份证正面照*/
    function sfzFrontChangeFunc(e){
        setFieldsValue({sfzFront: e});
        if(e && e.length>0){
            let url = e[0].url;
            sfzFrontChange(url);
        }
    }
    /*身份证反面照*/
    function sfzOppositeChangeFunc(e){
        setFieldsValue({sfzOpposite: e});
        if(e && e.length>0){
            let url = e[0].url
            sfzOppositeChange(url);
        }
    }
    /*营业执照照片*/
    function licenceImgChangeFunc(value){
        setFieldsValue({licenceImg: value});
        if(value && value.length>0){
            let url = value && value[0].url
            licenceImgChange(url);
        }
    }
    /*组织机构代码照*/
    function orgImgChangeFunc(value){
        setFieldsValue({orgImg: value});
        if(value && value.length>0){
            let url = value && value[0].url
            orgImgChange(url);
        }
    }
    /*开户许可证照*/
    function accountImgChangeFunc(value){
        setFieldsValue({accountImg: value});
        if(value && value.length>0){
            let url = value && value[0].url
            accountImgChange(url);
        }
    }

	return(
        <div className={styles.register_all}>
           <div className='step'>
               <Steps current={2} direction="horizontal">
                  <Step title="结算信息" />
                  <Step title=" 商户信息" />
                  <Step title="资质信息" />
                </Steps>
            </div>
            <div className='content_all'>
                <div className='stepTwo'>
                   <List>
                       {
                           bankType == '02' ?
                            <div>
                                <InputItem
                                    value={bankUser}
                                    disabled
                                >商户名称</InputItem>
                                <div className={styles.tip}>自动读取对公银行卡户名，如需修改请返回修改银行卡户名</div>
                                 <InputItem
                                     {...getFieldProps('leading', {
                                            initialValue : leading,
                                            rules: [
                                                { required: true, message : '请输入负责人'},
                                            ],
                                    })}
                                    placeholder="请输入负责人"
                                    onChange = {leadingChangeFunc}
                                >负责人</InputItem>
                                <div className={styles.tip}>请填写营业执照法人姓名</div>
                            </div>
                            :
                           <div>
                               <InputItem
                                   value={bankUser}
                                   disabled
                                >负责人</InputItem>
                                <div className={styles.tip}>自动读取对私银行卡户名，如需修改请返回修改银行卡户名</div>
                           </div>
                        }

                        <InputItem
                             {...getFieldProps('leadingTel', {
                                    initialValue : leadingTel,
                                    rules: [
                                        { required: true, message : '请输入负责人手机' },
                                        { validator : checkTel },
                                    ],
                            })}
                            type="number"
                            placeholder="请输入负责人手机"
                            onChange = {leadingTelChangeFunc}
                        >负责人手机</InputItem>
                        {
                           bankType == "02" ?
                           <div className={styles.tip}>请填写营业执照法人手机</div>
                           :
                           <div className={styles.tip}>请填写结算银行卡户主手机号</div>
                        }

                        <InputItem style={{postion:'relative'}}
                            {...getFieldProps('code', {
                                    initialValue :code,
                                    rules: [
                                        { required: true, message : '请输入验证码' },
                                    ],
                            })}
                            type="number"
                            className='getCode'
                            placeholder="请输入验证码"
                            onChange = {codeChangeFunc}
                        >
                            验证码
                            <HeadContTimeComponent {...HeadContTimeProps}/>
                            {/*<div className={styles.checkCode} onClick={()=> getValiCode(getFieldValue('leadingTel')) }>获取验证码</div>*/}
                        </InputItem>
                        <InputItem
                            {...getFieldProps('leadingSfz', {
                                    initialValue : leadingSfz,
                                    rules: [
                                        { required: true, message : '请输入负责人身份证号' },
                                        { validator : checkSfz },
                                    ],

                            })}
                            placeholder="请输入负责人身份证号"
                            onChange = {leadingSfzChangeFunc}
                        >负责人身份证</InputItem>
                        {
                           bankType == "02" ?
                           <div className={styles.tip}>请填写营业执照法人的身份证号</div>
                           :
                           <div className={styles.tip}>请填写结算银行卡户主的身份证号</div>
                        }
                       <div>
                           <div className={styles.sfz_front}>身份证正面</div>
                           <CustomImagePicker

                               {...getFieldProps('sfzFront', {
                                    initialValue:  idcard1InitList,
                                    rules: [
                                        { required: true, message : '请上传身份证正面照片' },
                                    ],

                                })}
                               {...imagePickerProps_1}
                               className={styles.idCard_front}
                               onChange = {sfzFrontChangeFunc}
                            />
                       </div>
                       <div className={styles.tipPhoto}>请上传清晰彩色的身份证正面照片(上限5M)</div>
                       <div className={styles.sfz_front}>身份证反面</div>
                       <CustomImagePicker

                               {...getFieldProps('sfzOpposite', {
                                    initialValue:  idcard2InitList,
                                    rules: [
                                        { required: true, message : '请上传身份证反面照片'},
                                    ],

                                })}
                               {...imagePickerProps_2}
                               className='idCard_opposite'
                               onChange = {sfzOppositeChangeFunc}
                            />
                       <div className={styles.tipPhoto}>请上传清晰彩色的身份证反面照片(上限5M)</div>
                    </List>

                    {
                        workType == "02" || workType == "03"?
                        <List>
                            <InputItem
                                {...getFieldProps('licenceNum', {
                                        initialValue : licenceNum,
                                        rules: [
                                            { required: true, message : '请输入注册号'},
                                        ],
                               })}
                               placeholder ="请输入注册号"
                               onChange = {licenceNumChangeFunc}
                            >营业执照工商注册号</InputItem>
                            <div>
                                <div className={styles.licence_img}>营业执照影印件</div>
                                <CustomImagePicker

                                   {...getFieldProps('licenceImg', {
                                        initialValue:  licenceInitList,
                                        rules: [
                                            { required: true, message : '请上传营业执照影印件'},
                                        ],

                                    })}
                                   {...imagePickerProps_3}
                                   className='licence'
                                   onChange = {licenceImgChangeFunc}
                                />
                            </div>
                            <div className={styles.tipPhoto}>请上传清晰彩色的营业执照照片(上限5M)</div>
                        </List>
                        :
                        null
                     }

                    {
                        workType == '03' ?

                             <List>
                                <InputItem
                                    {...getFieldProps('organizeNum', {
                                            initialValue : organizeNum,
                                            rules: [
                                                { required: true, message : '请输入组织机构代码'},
                                            ],
                                    })}
                                    placeholder="请输入组织机构代码"
                                    onChange = {organizeNumChangeFunc}
                                >组织机构代码</InputItem>
                                <div className={styles.tip}>若五证合一，请输入营业执照工商注册号</div>
                                 <div>
                                     <div className={styles.org_img}>组织机构代码影印件</div>
                                     <CustomImagePicker
                                           {...getFieldProps('orgImg', {
                                                initialValue:  orgInitList,
                                                rules: [
                                                    { required: true, message : '请上传组织机构代码影印件' },
                                                ],
                                            })}
                                           {...imagePickerProps_4}
                                           className='licence'
                                           onChange = {orgImgChangeFunc}
                                    />
                                 </div>
                                 <div className={styles.tipPhoto}>若五证合一，请上传清晰彩色的营业执照照片(上限5M)</div>
                                 <div style={{width:'100%'}}>
                                     <div className={styles.openAccount_img}>开户许可证影印件</div>
                                     <CustomImagePicker
                                           {...getFieldProps('accountImg', {
                                                initialValue:  accountInitList,
                                                rules: [
                                                    { required: true, message : '请上传营业开户许可证影印件' },
                                                ],
                                            })}
                                           {...imagePickerProps_5}
                                           className='licence'
                                           onChange = {accountImgChangeFunc}
                                    />
                                </div>
                                <div className={styles.tipPhoto}>请上传清晰彩色的开户许可证照片(上限5M)</div>
                            </List>

                        :
                        null
                    }
                </div>
            </div>
			<div className={styles.protocol}>
                <span>点击“提交”即同意</span>
                <span style={{color:'#367AFF'}} onClick={ protocolFunc }>《收单服务协议》</span>
            </div>
            <div className='btn_end' >
                <Button type = 'primary' size = 'small' onClick = {() => onSubmit(status)}>提交</Button>
                <Button type = 'primary' size = 'small'  onClick = {goBack} >上一步</Button>
            </div>
        </div>
    );
}
/*倒计时组件*/
class HeadContTimeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time : 31,
            timeFun : undefined,
            bool:this.props.bool,
        }
    }

    componentWillUnmount(){
        if(!!this.state.timeFun){ clearTimeout(this.state.timeFun) };
        this.setState = (state,callback) => {
            return;
        }
    }

    componentDidMount(){
//        this.time();
    }

     _getValiCode(){
        this.setState( { time : 31} , ()=>this.time());
        this.props.getValiCodeEvent();
     }

    time(){
        let { time , timeFun } = this.state;
        if(time > 0){
            this.setState({
                time : time - 1 ,
                timeFun : setTimeout(() => this.time(), 1000)
            })
        }else{
            if(!!timeFun){ clearTimeout(timeFun) };
            this.setState({ timeFun : undefined })
        }
    }

    render(){
        (this.state)
            let { time } = this.state;
            let bool = this.props.bool;
            return(
                <div style={{display:"inline"}}>
                {
                    bool && time > 0 ?
                    <div className={styles.getCodeTime} >
                        <span id='showtimes'>{time}</span>s重新获取
                    </div>
                    :
                    bool && time <= 0?
                    <div className={styles.checkCode} onClick={ this._getValiCode.bind(this) }>获取验证码</div>
                    :
                    <div className={styles.checkCode} onClick={ this._getValiCode.bind(this) }>获取验证码</div>
                }
                </div>
            )
    }

}

export default createForm()(StepTwoComponent);
