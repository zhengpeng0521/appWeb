import React, {PropTypes} from 'react'
import {createForm} from 'rc-form';
import Input from 'antd/lib/input';
import {  Modal, List, Button, WhiteSpace, WingBlank, DatePicker, Toast, InputItem, Picker } from 'antd-mobile';
import styles from './microModuleRenderUtil.less';
import qs from 'qs';
import moment from 'moment';
import OrgPickerPage from "../../pages/common/orgPickerPage/OrgPickerPage";

function FormRender({
    dateItem, renderType, handleSubmit,changeModalVisible,visibleModal,
    form : {
		getFieldProps,
        getFieldValue,//获取一个输入控件的值
		getieldsValue,//getFieldsValue	获取一组输入控件的值，如不传入参数，则获取全部组件的值
        validateFields,
        setFieldsValue,
        resetFields,
	}
}) {

    async function submitAPI(params) {
    	
    	//判断页面是否有openid   有则添加到参数列表里
    	if(window._init_data && window._init_data.openid) {
    		params.openId = window._init_data.openid;
    	}

        let params_service = {
            service: BASE_URL + `/appMicroActivity/addSubscribe`,
            data: params,
        }

        return requestData(`/thinknode/weixinh5/microwebsite/microwebsite/service`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params_service),
        });
    }

    function scrollToTop(){
        window.scrollTo(0, 0);
    }

    function checkPhoneNum(rule, value, callback) {
        value = value && value.replace(new RegExp(" ","g"), '');
        if(!(/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value))){
    		callback('请输入正确的手机号码');
    	} else {
    		callback();
    	}
    }

    function checkOnlyNum(rule, value, callback) {
        if((/^[0-9.]+$/.test(value))){
    		callback('内容项不可以是纯数字');
    	} else {
    		callback();
    	}
    }

    function pickerOnChange(rule, value, callback) {
        value.length ? callback() : callback('请选择机构');
    }

    function locationFun(){
        history.go(0) ;
    }

    function eorryFun(){
         resetFields();
    }

    function handleFormBtnClick() {
        validateFields((err, values) => {
            if (!!err) {
                for(let key in err) {
                    let errObj = err[key];
                    let errors = errObj.errors || [];
                    if(errors && errors.length > 0) {
                        Toast.fail(errors[0].message);
                        return;
                    }
                }
                return;
            }

            window._init_data.name = values.name || '';
//            console.info(values.name,"values")
            let activityDataId = (window._init_data && window._init_data.activityDataId) || '';
            values.id = activityDataId;

            if(values.birthday) {
                values.birthday = values.birthday.format('YYYY-MM-DD');
            }

            if (window._activity_data.isHq) {
                if (values.orgId) {
                    values.orgId = values.orgId[0];
                }
            } else {
                values.orgId = window._activity_data.orgId || '';
            }

            if(values.mobile) {
                values.mobile = values.mobile.replace(new RegExp(" ","g"), '');
            }

            submitAPI(values).then(result => {
                let {ret} = result;
                if(ret && ret.errorCode == 9000) {
                	//判断是否需要支付
                	if(ret.data) {
                		window.location = ret.data;
                	} else {
//                		Toast.info('表单信息提交成功!');
//                        resetFields();
                        setFieldsValue({
                            formSubmitModalVisible: true
                        });
                	}
                } else {
                    Toast.info(ret&&ret.errorMessage || '表单信息提交失败');
                }
            });
        });
    }

    let inputContent = dateItem.inputSet.map(function(item,index){

        let form_input_div_style = {
            width: '100%',
            height: '15%',
            textAlign: 'center',
            marginTop: '2.5%',
            position: 'relative',
            display: 'block',
        };

        let form_input_style = {
            width: '70%',
            height: '1.8rem',
            // height: '100%',
            lineHeight: '1',
            display: 'block',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontSize: dateItem.inputPublicSet.font_size,
            color: dateItem.inputPublicSet.color,
            borderColor: dateItem.inputPublicSet.border_color,
            borderRadius: dateItem.inputPublicSet.border_radius+'px',
            textIndent: '20px',
            float: 'inherit',
            margin: '0 auto',
            paddingLeft: 0,
            paddingRight: 0,
        };

        let form_input_props = {};
        if(renderType != '4') {
            return (
                <div key={item.input_key} style={form_input_div_style}>
                    <Input type='text' readOnly='true'  placeholder={item.textcontent} style={form_input_style} />
                </div>
            );
        } else {

//            let input_type_arr = ['input','phone','date','area',];
//            let input_name_arr = ['name','mobile','birthday','note',];

//            item.input_type = input_type_arr[index];
//            item.name = input_name_arr[index];

            let form_data_pop_style = {
                baakgroundColor: '#DDD',
            };

            let date_extra_style = {
                fontSize: dateItem.inputPublicSet.font_size,
                borderRadius: dateItem.inputPublicSet.border_radius+'px',
                verticalAlign: 'middle',
            };

            let defaultSelect = window._activity_data.isHq === 1 ? undefined : String(window._activity_data.orgId);
            return (
                <div key={item.input_key} style={form_input_div_style} className={styles.form_input_div_class}>
                    {item.input_type == 'select'  ?
                        window._activity_data && window._activity_data.isHq === 1
                            ?
                            <OrgPickerPage {...getFieldProps('orgId', {
                                initialValue: [defaultSelect],
                                rules: [
                                    { required: true, message: '请选择机构', type: 'array'},
                                    { validator: pickerOnChange },
                                ]
                            })}
                                picker_style={styles.form_input_div_class}
                                form_input_style={form_input_style}
                                onBlur={scrollToTop}
                            />
                            :
                            <InputItem
                                type='text'
                                disabled={true}
                                placeholder={window._activity_data && window._activity_data.orgName || ''}
                                style={form_input_style}
                                className={styles.form_input_class}
                                onBlur={scrollToTop}
                            />
                    :item.input_type == 'input' ?
                        <InputItem type='text'
                           {...getFieldProps(item.name,{
                                validateTrigger: 'onBlur',
                                rules: [
                                    { required: true, message: '请输入' + item.textcontent, whitespace: true },
                                    { validator: checkOnlyNum },
                                ]
                            })}
                            placeholder={item.textcontent}
                            style={form_input_style} className={styles.form_input_class} 
                            onBlur={scrollToTop}
                            />
                    : item.input_type == 'phone' ?
                        <InputItem type='phone'
                            {...getFieldProps(item.name,{
                                validateTrigger: 'onBlur',
                                rules: [
                                    { required: true, message: '请输入' + item.textcontent, whitespace: true },
                                    { validator: checkPhoneNum },
                                ]
                            })}
                            placeholder={item.textcontent}
                            style={form_input_style}
                            onBlur={scrollToTop}
                        />
                    : item.input_type == 'date' ?
                        <div className={styles.form_date_item} style={form_input_style}>
                            <DatePicker
                               {...getFieldProps(item.name,{
                                    rules: [
                                        { required: true, message: '请选择' + item.textcontent, type: 'object' },
                                    ]
                                })}
                                extra={item.textcontent}
                                mode="date"
                                minDate={moment('1980-01-01', 'YYYY-MM-DD').utcOffset(8)}
                                maxDate={moment()}
                                onBlur={scrollToTop}
                            >
                                <List.Item className={styles.form_date_picker} style={date_extra_style} arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>

                    : item.input_type == 'area' ?
                        <InputItem type='text'
                           {...getFieldProps(item.name)}
                            placeholder={item.textcontent}
                            style={form_input_style} 
                            onBlur={scrollToTop}
                            />
                    :
                        <InputItem type='text'
                           {...getFieldProps(item.name||'other')}
                            placeholder={item.textcontent} style={form_input_style} 
                            onBlur={scrollToTop}
                            />
                    }
                </div>
            );
        }
    });

    let form_div_style = {
        width: '100%',
        height: '100%',
        backgroundColor: dateItem.background,
        backgroundImage: 'url('+dateItem.background_img+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        borderRadius: dateItem.border_radius,
        padding: '6% 0 3% 0 ',
    };

    let form_btn_cont_style = {
        width: '100%',
        height: '15%',
        textAlign: 'center',
        marginTop: '6%',
    };
    function codeSubmit(paramer){

        let url = window.location.href.split("?")[1];              /*获取url里"?"后面的值*/
          if(url.indexOf("&")>0){                                  /*判断是否是一个参数还是多个参数*/
             let urlParamArry=url.split("&");                          /*分开每个参数，并放到数组里*/
             for(var i=0; i<urlParamArry.length; i++){
             let paramerName=urlParamArry[i].split("=");           /*把每个参数名和值分开，并放到数组里*/
                 if(paramer==paramerName[0]){                  /*匹配输入的参数和数组循环出来的参数是否一样*/
                      return paramerName[1];                      /*返回想要的参数值*/
                 }
             }
          }else{                                                /*判断只有个参数*/
               var paramerValue=url.split("=")[1];
               return paramerValue;
            }
     }

    let orgId = codeSubmit('org_id');
    let activityId = codeSubmit('activityId');
    let activityDataId = codeSubmit('activityDataId');
    let moduleCode = codeSubmit('moduleCode');
    moduleCode = moduleCode.split('#')[0];
    getFieldProps('formSubmitModalVisible', {
        initialValue: false,
    });
    getFieldProps('qrcodeMoisibleForm', {
        initialValue: false,
    });

    function handleOnQrcodeModalClose() {
        console.info('handleOnQrcodeModalClose');
        setFieldsValue({
            qrcodeMoisibleForm: false
        });
    }
     function formSubmitModalVisibleClose() {
        console.info('handleOnQrcodeModalClose');
        setFieldsValue({
            formSubmitModalVisible: false
        });

    }

	return(
        <WingBlank>
		<div style={form_div_style}>
            {inputContent}
            <div style={form_btn_cont_style} >
                <button
                    style={{
                        display: 'inline-block',
                        width: '70%',
                        // height: '100%',
                        height : '1.8rem',
                        backgroundColor: dateItem.buttonSet.background_color,
                        border: dateItem.buttonSet.border,
                        borderRadius: dateItem.buttonSet.border_radius+'px',
                        color: dateItem.buttonSet.font_color,
                        backgroundImage: 'url('+dateItem.buttonSet.background_img+')',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        fontSize: dateItem.buttonSet.font_size,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: dateItem.buttonSet.border_color,
                    }}
                    onClick={renderType == '4' ? handleFormBtnClick : null}
                >
                    {dateItem.buttonSet.btn_text}
                </button>
            </div>

            <Modal
              visible={getFieldValue('qrcodeMoisibleForm')}
              transparent
              closable={true}
              maskClosable={true}//点击蒙层是否允许关闭 默认false
              onClose={handleOnQrcodeModalClose}
              className={styles.common_qrcode_modal}
            >

                 <div style={{ height: 720, overflow: 'scroll'}}>

                     <div id="maskidName" onClick={() => maskidNameClick()}>
                            <img id="myrame" src={"/thinknode/weixinh5/page/attentionQrcodeImage?openid="+window._init_data.openid+'&activityId='+window._init_data.activityId+'&activityDataId='+window._init_data.activityDataId+'&moduleCode='+moduleCode+'&orgId='+orgId+'&name='+window._init_data.name+'&activityName='+window._activity_data.activityName+'&type=2'}  />

                            <img id="img_min_logo" src="/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/114e3b02913a0b8a117bac2f8a5e9253" />

                            <div id="btmTxt">
                              长按关注闪闪可实时查看报名活动情况
                            </div>
                   </div>

                </div>


            </Modal>

                <Modal
              visible={getFieldValue('formSubmitModalVisible')}
              transparent
              closable
              maskClosable={false}//点击蒙层是否允许关闭 默认false
              onClose={formSubmitModalVisibleClose}
              title="信息提交成功"
              footer={[{ text: '关注我们及时接收报名进度', onPress: () => {
                console.info("ok");
                   setFieldsValue({
                        qrcodeMoisibleForm: true
                    });
                } }]}
            >

                <div style={{ height: 220, overflow: 'scroll'}}>
                    <div className="button" onClick={() => locationFun()}>好的</div>
                    <div className="errbtn" onClick={() => eorryFun()}>
                        <img src="https://img.ishanshan.com/gimg/img/0f464f9eeeb2bbbc2db24a007a8c4590" />
                    </div>
                </div>
            </Modal>

            </div>
        </WingBlank>
    );
   }

export default createForm()(FormRender);
