import React from 'react';
import styles from './AccountBindComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast , List ,Modal} from 'antd-mobile';
import {createForm} from 'rc-form';
const alert = Modal.alert;
const Item = List.Item;
function AccountBindComponent({
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
    accountUniteFunc,
    userInfo,
}) {
    return(
        <div style={{height:'100%'}}>
            <div className={styles.account_Bind}>
                <div className={styles.logo_img}>
                    <img src='https://img.ishanshan.com/gimg/img/8223cec553820e9b41bbbd7e5568e1c8'/>
                </div>
                <div className={styles.logo_tip}>- 让支付更流畅 让赚钱更简单 -</div>
                <List className={styles.userInfo}>
                    <InputItem value={userInfo.mchId} disabled>商户号</InputItem>
                    <InputItem value={userInfo.businessName} disabled>商户名称</InputItem>
                    <InputItem value={userInfo.businessShort} disabled>商户简称</InputItem>
                    <InputItem value={userInfo.businessTel} disabled>手机号码</InputItem>
                </List>
                <div style={{margin:'1.1rem 0 3rem 1.5rem',fontSize:'1.4rem',color:'#999999'}}>温馨提示： 微信将推送该商户的收款信息</div>
                <div style={{padding:'0 3rem'}}>
                <Button className={styles.sure_btn} onClick={accountUniteFunc}>账号解绑</Button>
                </div>
            </div>
         </div>
    );
}

export default createForm()(AccountBindComponent);
