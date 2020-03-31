import React, { PropTypes } from 'react';
import { Button,Icon,List,InputItem,NoticeBar,Popup,ActivityIndicator, } from 'antd-mobile';
import PopSelectComponent from '../../common/pop-select/PopSelectComponent';
import TechnicalSupport from '../../common/technical-support/TechnicalSupport';
import { createForm } from 'rc-form';
import style from './FreeApply.less';
let Item = List.Item;

function FreeApplyComponent({
    formLoading,schoolTypeList,submitAction,
    form : {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
    },
}) {

    function renderHeader() {
        return (
            <div className={style.free_apply_header}>
                申请在线使用闪闪管家
            </div>
        );
    }

    function renderFooter() {
        let orgNameErrors    = getFieldError('orgName');
        let mobileErrors     = getFieldError('mobile');
        let nameErrors       = getFieldError('name');
        let schoolTypeErrors = getFieldError('schoolType');

        let errorMsg = '';
        if(orgNameErrors && orgNameErrors.length > 0) {
            errorMsg = orgNameErrors[0];
        } else if(mobileErrors && mobileErrors.length > 0) {
            errorMsg = mobileErrors[0];
        } else if(nameErrors && nameErrors.length > 0) {
            errorMsg = nameErrors[0];
        } else if(schoolTypeErrors && schoolTypeErrors.length > 0) {
            errorMsg = schoolTypeErrors[0];
        }
        return (
            <div className={style.free_apply_footer}>
                {!!errorMsg!='' && <NoticeBar type="info">{errorMsg}</NoticeBar>}
            </div>
        );
    }

    //关闭pop弹出框
    function closePop() {
        Popup.hide();
    }

    function changeSchoolType(data) {
        let schoolType = '';
        if(data && data.length > 0) {
            schoolType = data[0];
        }
        schoolTypeList && schoolTypeList.map(function(item) {
            if(item.value == schoolType) {
                setFieldsValue({schoolTypeName: item.name});
            }
        });
        setFieldsValue({schoolType});
        validateFields(['schoolType']);
        closePop();
    }

    function popSchoolTypeSelect() {
        let schoolTypeSelectProps = {
            dataSource: schoolTypeList,
            data: [getFieldValue('schoolType')],
            onConfirm: changeSchoolType,
            onCancle: closePop,
            multiple: false,
            title: '选择学校类型'
        };
        Popup.show(
            <PopSelectComponent {...schoolTypeSelectProps} />,
        { animationType: 'slide-up', maskClosable: true }
        );
    }

    function checkMobile(rule, value, callback) {
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(value))) {
			callback('请输入正确的手机号');
		} else {
			callback();
		}
	}

    function submit_btn() {
        validateFields((err, values) => {
            if (err) {
                return;
            }

            let params = {...getFieldsValue(),};
            submitAction(params);
        });
    }

    return (
        <div className="saas_free_apply_cont">
            {!!formLoading && <ActivityIndicator toast /> }

            <div className={style.saas_free_apply_content}>
                <List
                    renderFooter={renderFooter}
                    className={style.free_apply_form_list}>

                {getFieldDecorator('orgName', {
                    initialValue: '',
                    rules: [
                        { required: true, message: '请输入学校或机构名称'},
                    ],
                  })(
                    <InputItem
                        clear
                        placeholder='请输入学校或机构名称'>
                        <div
                            style={{
                                background: 'url(http://115.29.172.104/gimg/img/f2644ed9ecdac3f6ac7e762b51ff9859)',
                                width: '44px',
                                height: '44px',
                            }}
                            className={style.form_input_label} />
                    </InputItem>
                  )}

                  {getFieldDecorator('mobile', {
                    initialValue: '',
                    rules: [
                        { required: true, message: '请输入您的手机号'},
                        { validator: checkMobile },
                    ],
                  })(
                    <InputItem
                        clear
                        placeholder='请输入您的手机号'>
                        <div
                            style={{
                                background: 'url(http://115.29.172.104/gimg/img/741174526dd69c7b51666eca1ff11c39)',
                                width: '44px',
                                height: '44px',
                            }}
                            className={style.form_input_label} />
                    </InputItem>
                  )}

                  {getFieldDecorator('name', {
                    initialValue: '',
                    rules: [
                        { required: true, message: '请输入您的姓名'},
                    ],
                  })(
                    <InputItem
                        clear
                        placeholder='请输入您的姓名'>
                        <div
                            style={{
                                background: 'url(http://115.29.172.104/gimg/img/78570fcca73a4f49497f946f796a9501)',
                                width: '44px',
                                height: '44px',
                            }}
                            className={style.form_input_label} />
                    </InputItem>
                  )}

                  {getFieldDecorator('schoolType', {
                    initialValue: '',
                    rules: [
                        { required: true, message: '请选择学校类型', type: 'string' },
                    ],
                  })(
                    <Item
                        className="my_list_line_item"
                         extra={getFieldValue('schoolTypeName') || "请选择学校类型"}
                         arrow="horizontal"
                         onClick={popSchoolTypeSelect}
                         error={!!getFieldError('schoolType')}
                         onErrorClick={() => {
                            Toast.info(getFieldError('schoolType').join('、'));
                         }}
                         thumb="http://115.29.172.104/gimg/img/42a06212201569ddb3e26fb5b80f09ed"
                     ></Item>
                    )}

                </List>
                <TechnicalSupport backgroundColor='transparent'/>
                <Button className={style.submit_btn} onClick={submit_btn}>提交</Button>
            </div>
        </div>
    );
}

export default createForm()(FreeApplyComponent);
