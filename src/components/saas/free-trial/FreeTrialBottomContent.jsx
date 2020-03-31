import React, {PropTypes} from 'react';
import { InputItem, Button, ActivityIndicator, Popup, List, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './FreeTrial.less';

function FreeTrialBottomContent({
    openModal,
    chooseSchool,
    formSubmit,
    openType,
    SchoolType,
    SchoolTypeAllArray,
    SchoolTypeInitialValue,
    SchoolTypeModalClose,
    AlertModalSubmiting,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
}) {

    function handleSubmit(e){
        validateFields((error, values) => {
            if (!!error) {
                return;
            }

            let params = {...getFieldsValue()};
            if('' == params.orgName || undefined == params.orgName || null == params.orgName){
                openModal('请输入机构名称');
                return;
            }
            if('' == params.userName || undefined == params.userName || null == params.userName){
                openModal('请输入联系人姓名');
                return;
            }
            if('' == params.tel || undefined == params.tel || null == params.tel){
                openModal('请输入联系电话');
                return;
            }
            if((params.tel).length<13){
                openModal('请输入正确的联系电话');
                return;
            }
            if('' == params.detailAddr || undefined == params.detailAddr || null == params.detailAddr){
                openModal('请输入详细地址');
                return;
            }
            if('' == SchoolType || undefined == SchoolType || null == SchoolType){
                openModal('请选择学校类型');
                return;
            }
            params.schoolType = SchoolType;
            params.platform = openType;
            params.tel = (params.tel).replace(/\s/g,'');      //取出电话之间的空格
            formSubmit(params);
        });
    }

    function chooseSchoolItem(value,name){
        onClose();
        chooseSchool(value,name);
    }

    /*选择学校类型*/
    function chooseSchoolType(){
        if(SchoolTypeAllArray && SchoolTypeAllArray.length > 0){
            Popup.show(
            <div>
                <List renderHeader={() => (
                    <div style={{ position: 'relative' }}>
                        请选择学校类型
                        <Icon type="cross" style={{float:'right'}} onClick={onClose}/>
                    </div>)}
                    className="popup-list"
                    >
                    {SchoolTypeAllArray.map((item) => (
                        <List.Item key={item.value} onClick={() => chooseSchoolItem(item.value,item.name)}>{item.name}</List.Item>
                    ))}
                </List>
                <ul style={{ padding: '0.18rem 0.3rem', listStyle: 'none' }}>
                </ul>
            </div>, { animationType: 'slide-up', maskClosable: false });
        }
    }

    function onClose(text){
        Popup.hide();
    }

    return (
        <div>
            <div style={{marginRight:'30px',color:'#333333'}}>
                <form>
                    <div className={styles.formItem}>
                        {getFieldDecorator('orgName', {
                          })(
                            <InputItem
                                clear
                                placeholder='详细到品牌及门店名称(必填)'>
                                <span style={{ color:'#333333' }}>机构名称</span>
                            </InputItem>
                          )}
                    </div>
                    <div className={styles.formItem}>
                        {getFieldDecorator('userName', {
                          })(
                            <InputItem
                                clear
                                placeholder='输入联系人姓名(必填)'>
                                <span style={{ color:'#333333' }}>联系人</span>
                            </InputItem>
                          )}
                    </div>
                    <div className={styles.formItem}>
                    {getFieldDecorator('tel', {
                      })(
                        <InputItem
                            type='phone'
                            clear
                            placeholder='输入联系电话(必填)'>
                            <span style={{ color:'#333333' }}>联系电话</span>
                        </InputItem>
                      )}
                    </div>
                    <div className={styles.formItem}>
                        {getFieldDecorator('detailAddr', {
                          })(
                            <InputItem
                                clear
                                placeholder='输入详细地址(必填)'>
                                <span style={{ color:'#333333' }}>详细地址</span>
                            </InputItem>
                          )}
                    </div>
                    <div className={styles.formItem} onClick={chooseSchoolType}>
                        {getFieldDecorator('schoolType', {
                            initialValue : SchoolTypeInitialValue,
                          })(
                            <InputItem
                                clear
                                placeholder='请选择学校类型(必选)'
                                disabled
                                style={{color:'#666666'}}
                                >
                                <span style={{ color:'#333333' }}>学校类型</span>
                            </InputItem>

                          )}
                    </div>
                    <div className={styles.formItem}>
                        {getFieldDecorator('orgNeeds', {
                          })(
                            <InputItem
                                clear
                                placeholder='希望得到哪方面的帮助(选填)'>
                                <span style={{ color:'#333333' }}>机构需求</span>
                            </InputItem>
                          )}
                    </div>
                </form>
            </div>
            <div style={{margin:'80px 30px 0 30px'}}>
                <Button className={styles.submit_btn} style={{height: '98px'}} type="primary" onClick={ handleSubmit } disabled={ AlertModalSubmiting }>提交申请</Button>
            </div>
            <ActivityIndicator
                toast
                text="正在提交申请"
                animating={ AlertModalSubmiting }
            />
        </div>
    );
}

export default createForm()(FreeTrialBottomContent);
