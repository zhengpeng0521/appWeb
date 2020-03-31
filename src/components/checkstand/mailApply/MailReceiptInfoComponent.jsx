import React from 'react';
import styles from './MailReceiptInfoComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast , Picker , List } from 'antd-mobile';
import ChinaDivision from '../register/CascaderAddressOptions';
import {createForm} from 'rc-form';

function MailReceiptInfoComponent({
     modalLoading,
     goBackFunc,
     submitFunc,
     orgName,
     userName,  //收件人
     tel,      //收件人电话
     address,  //详细地址
     addr,
     status,
     dataSource,
     flags,
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

    function sureFunc(){
        validateFields((err, values) => {
            if (!!err) {
                Toast.info("请输入手机号或是验证码");
                return;
            }
            submitFunc && submitFunc(values, ()=> {
                setFields && setFields();
                Modal.success({
                    title  : '提交成功!',
                });
            });
        });
     }
    function checkRadio(rule, value, callback){
        if(value[0] && value[1] && value[2]){
            callback();
        }else{
            Toast.info("请选择省市区");
        }
    }

    return(
         <div className='content_all'>
            <ActivityIndicator text="loading" toast animating ={modalLoading} />
            <img src = 'https://img.ishanshan.com/gimg/img/8295270dffcb3129ea976d24a796f38f' style={{width:'100%'}}/>
            <div className={styles.share_login}>
               <div className={styles.share_title}>
                   <div><span style={{color:'#fffc00'}}>完善收货信息</span></div>
               </div>
                {
                    flags && dataSource && status == '1'  ?
                    <div className='mail_submit'>
                        <InputItem
                             {...getFieldProps('orgName', {
                                initialValue : dataSource.mchName,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            disabled
                            className={styles.mobile}
                            >机构名称
                        </InputItem>
                        <InputItem
                             {...getFieldProps('userName', {
                                initialValue : dataSource.userName,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            disabled
                            className={styles.mobile}
                            >收件人
                        </InputItem>
                        <InputItem
                             {...getFieldProps('tel', {
                                initialValue : dataSource.tel,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            type="number"
                            disabled
                            className={styles.mobile}
                            >手机号
                        </InputItem>
                        <Picker
                              {...getFieldProps('addr', {
                                initialValue : dataSource.addr,
                                rules: [
                                    { required: true, },
                                    { validator: checkRadio },
                                ],
                              })}
                              title="地址"
                              extra="请选择"
                              data={ChinaDivision}
                              disabled
                            >
                          <List.Item arrow="horizontal">省/市/区</List.Item>
                        </Picker>
                        <InputItem
                             {...getFieldProps('address', {
                                initialValue : dataSource.address,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            disabled
                            className={styles.mobile}
                            >收货地址
                        </InputItem>
                         <div className={styles.footer}>
                           <Button className='submit_btn' disabled>已提交</Button>
                           <div className={styles.warmTip}>温馨提示：我们将在7个工作日内安排邮寄，请耐心等候。如有问题，请至微信公号“闪闪收银宝”留言。</div>
                         </div>
                    </div>
                    :
                    flags && dataSource==[] ?
                    <div className='mail_Info'>
                        <InputItem
                             {...getFieldProps('orgName', {
                                initialValue : orgName,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            disabled
                            className={styles.mobile}
                            >机构名称
                        </InputItem>
                        <InputItem
                             {...getFieldProps('userName', {
                                initialValue : userName,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            placeholder = '请输入收件人姓名'
                            className={styles.mobile}
                            >收件人
                        </InputItem>
                        <InputItem
                             {...getFieldProps('tel', {
                                initialValue : tel,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            type="number"
                            placeholder = '请输入手机号'
                            className={styles.mobile}
                            >手机号
                        </InputItem>
                        <Picker
                              {...getFieldProps('addr', {
                                initialValue : addr,
                                rules: [
                                    { required: true, },
                                    { validator: checkRadio },
                                ],
                              })}
                              title="地址"
                              extra="请选择"
                              data={ChinaDivision}
                            >
                          <List.Item arrow="horizontal">省/市/区</List.Item>
                        </Picker>
                        <InputItem
                             {...getFieldProps('address', {
                                initialValue : address,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            placeholder = '请填写详细街道'
                            className={styles.mobile}
                            >收货地址
                        </InputItem>
                         <div className={styles.btns}>
                            <Button type="primary" className='back_btn' onClick={goBackFunc}>返回</Button>
                            <Button type="primary" className='sure_btn' onClick={sureFunc}>确认</Button>
                        </div>
                    </div>
                    :
                    <div className='mail_Info'>
                        <InputItem
                             {...getFieldProps('orgName', {
                                initialValue : orgName,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            editable = {false}
                            className={styles.mobile}
                            >机构名称
                        </InputItem>
                        <InputItem
                             {...getFieldProps('userName', {
                                initialValue : userName,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            placeholder = '请输入收件人姓名'
                            className={styles.mobile}
                            >收件人
                        </InputItem>
                        <InputItem
                             {...getFieldProps('tel', {
                                initialValue : tel,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            type="number"
                            placeholder = '请输入手机号'
                            className={styles.mobile}
                            >手机号
                        </InputItem>
                        <Picker
                              {...getFieldProps('addr', {
                                initialValue : addr,
                                rules: [
                                    { required: true, },
                                    { validator: checkRadio },
                                ],
                              })}
                              title="地址"
                              extra="请选择"
                              data={ChinaDivision}
                            >
                          <List.Item arrow="horizontal">省/市/区</List.Item>
                        </Picker>
                        <InputItem
                             {...getFieldProps('address', {
                                initialValue : address,
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            placeholder = '请填写详细街道'
                            className={styles.mobile}
                            >收货地址
                        </InputItem>
                         <div className={styles.btns}>
                            <Button type="primary" className='back_btn' onClick={goBackFunc}>返回</Button>
                            <Button type="primary" className='sure_btn' onClick={sureFunc}>确认</Button>
                        </div>
                    </div>
                }
              </div>
         </div>
    );
}



export default createForm()(MailReceiptInfoComponent);
