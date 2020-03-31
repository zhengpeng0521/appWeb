import React from 'react';
import styles from './AppMineComponent.less';
import { ActivityIndicator } from 'antd-mobile';
import {createForm} from 'rc-form';

function AppMineComponent({
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
	return(
        <div className={styles.mine_all}>
            <div className={styles.userInfo}>
                <div className={styles.headImg}>
                    <img src = 'https://img.ishanshan.com/gimg/img/5b3ddd4d13f46043419059001b8e4b33' />
                </div>
                <div className={styles.content}>
                    <div className={styles.name}>杭州美吉姆下沙店</div>
                    <div className={styles.tel}>
                        <div style={{lineHeight:'1.4rem',display:'inline-block',fontSize:'1.4rem'}}>15778788787</div>
                        <div className={styles.logo}>校长</div>
                    </div>
                </div>
            </div>
            <div className={styles.bank_info}>
                <div className={styles.bank_title}>结算银行</div>
                <div className={styles.bank_content}>
                    <div className={styles.content_cont}>
                        <div className={styles.content_cont_name}>银行卡号</div>
                        <div className={styles.content_cont_answer}>&nbsp;622****************6715</div>
                    </div>
                    <div className={styles.content_cont}>
                        <div className={styles.content_cont_name}>银行卡类型</div>
                        <div className={styles.content_cont_answer}>&nbsp;对私账户</div>
                    </div>
                    <div className={styles.content_cont}>
                        <div className={styles.content_cont_name}>银行卡户名</div>
                        <div className={styles.content_cont_answer}>&nbsp;*夏鸥</div>
                    </div>
                </div>
            </div>
            <div className={styles.bank_info}>
                <div className={styles.bank_title}>结算银行</div>
                <div className={styles.bank_content}>
                    <div className={styles.content_cont}>
                        <div className={styles.content_cont_name}>银行卡号</div>
                        <div className={styles.content_cont_answer}>&nbsp;622****************6715</div>
                    </div>
                    <div className={styles.content_cont}>
                        <div className={styles.content_cont_name}>银行卡类型</div>
                        <div className={styles.content_cont_answer}>&nbsp;对私账户</div>
                    </div>
                    <div className={styles.content_cont}>
                        <div className={styles.content_cont_name}>银行卡户名</div>
                        <div className={styles.content_cont_answer}>&nbsp;*夏鸥</div>
                    </div>
                </div>
            </div>
            <div className={styles.logout}>退出登录</div>
        </div>
    );
}

export default createForm()(AppMineComponent);
