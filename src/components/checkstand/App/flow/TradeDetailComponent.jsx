import React from 'react';
import styles from './TradeDetailComponent.less';
import { ActivityIndicator } from 'antd-mobile';
import {createForm} from 'rc-form';

function TradeDetailComponent({
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
    tab,

}) {

    return(
        <div className={styles.flowDetail}>
            <div className={styles.flow_content}>
                <div className={styles.flow_money}>
                    <div className={styles.money}>+<span>100.00</span></div>
                    {
                        tab == '0' ?
                         <div className={styles.tip}>收款成功</div>
                        :
                        tab == '1' ?
                         <div className={styles.tip}>结算成功</div>
                        :
                        null
                    }

                </div>
                <div className={styles.flow_info}>
                    <div className={styles.flow_cont}>
                        <div className={styles.flow_name}>交易时间</div>
                        <div className={styles.flow_answer}>2018-04-18 14:23:12</div>
                    </div>
                    <div className={styles.flow_cont}>
                        <div className={styles.flow_name}>商户订单号</div>
                        <div className={styles.flow_answer}>2355555522552</div>
                    </div>
                    <div className={styles.flow_cont}>
                        <div className={styles.flow_name}>闪闪编号</div>
                        <div className={styles.flow_answer}>3183918313</div>
                    </div>
                    <div className={styles.flow_cont}>
                        <div className={styles.flow_name}>付款方式</div>
                        <div className={styles.flow_answer}>支付宝</div>
                    </div>
                    <div className={styles.flow_cont}>
                        <div className={styles.flow_name}>支付单号</div>
                        <div className={styles.flow_answer}>2333333333333333</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default createForm()(TradeDetailComponent);
