import React from 'react';
import styles from './AppComponent.less';
import { ActivityIndicator ,Flex } from 'antd-mobile';
import {createForm} from 'rc-form';

function AppComponent({
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
    paycodeFunc,
    memberFunc,
    flowFunc,
    mineFunc
}) {

	return(
        <div>
            <Flex className={styles.foot_icon}>
                <Flex.Item className={styles.icon_content}>
                    <img className={styles.iconImg} src='https://img.ishanshan.com/gimg/img/c73208de5caf573e53cf3a619dad0813' />
                    <div className={styles.iconName}>支付流水</div>
                </Flex.Item>
                <Flex.Item className={styles.icon_content}>
                    <img className={styles.iconImg} src='https://img.ishanshan.com/gimg/img/ec28e5f3028c9a68b4f7837cbdddabc9' />
                    <div className={styles.iconName}>会员信息</div>
                </Flex.Item>
                <Flex.Item className={styles.icon_content}>
                    <img className={styles.iconImg} src='https://img.ishanshan.com/gimg/img/be124a332313e29074610bb7b0b4c010'/>
                    <div className={styles.iconName}>商户详情</div>
                </Flex.Item>
            </Flex>
        </div>
    );
}

export default createForm()(AppComponent);
