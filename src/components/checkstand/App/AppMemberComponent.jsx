import React from 'react';
import styles from './AppMemberComponent.less';
import { ActivityIndicator } from 'antd-mobile';
import {createForm} from 'rc-form';

function AppMemberComponent({
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
        <div className={styles.member}>
            <div className={styles.memberList}>
                <div className={styles.member_info}>
                    <div style={{position:'relative',display:'inline-block',verticalAlign:'middle'}}>
                        <div className={styles.headImg}>
                            <img src = 'https://img.ishanshan.com/gimg/img/5b3ddd4d13f46043419059001b8e4b33'/>
                        </div>
                        <img className={styles.img_logo} src = 'https://img.ishanshan.com/gimg/img/54af13fc9d38f07aeb0b758cc7609dff' />
                    </div>
                    <div className={styles.name}>几噼里啪啦</div>
                    <div className={styles.member_cont}>
                        <div className={styles.num}>消费<span>3</span>次</div>
                        <div className={styles.money}>共<span>43443.00</span>元</div>
                    </div>
                </div>
                <div className={styles.member_info}>
                    <div style={{position:'relative',display:'inline-block',verticalAlign:'middle'}}>
                        <div className={styles.headImg}>
                            <img src = 'https://img.ishanshan.com/gimg/img/5b3ddd4d13f46043419059001b8e4b33'/>
                        </div>
                        <img className={styles.img_logo} src = 'https://img.ishanshan.com/gimg/img/50d3dedbe67350a39e72ef5ba6c53ddd' />
                    </div>
                    <div className={styles.name}>走马</div>
                    <div className={styles.member_cont}>
                        <div className={styles.num}>消费<span>3</span>次</div>
                        <div className={styles.money}>共<span>43443.00</span>元</div>
                    </div>
                </div>
                 <div className={styles.member_info}>
                    <div style={{position:'relative',display:'inline-block',verticalAlign:'middle'}}>
                        <div className={styles.headImg}>
                            <img src = 'https://img.ishanshan.com/gimg/img/5b3ddd4d13f46043419059001b8e4b33'/>
                        </div>
                        <img className={styles.img_logo} src = 'https://img.ishanshan.com/gimg/img/50d3dedbe67350a39e72ef5ba6c53ddd' />
                    </div>
                    <div className={styles.name}>走马222</div>
                    <div className={styles.member_cont}>
                        <div className={styles.num}>消费<span>3</span>次</div>
                        <div className={styles.money}>共<span>43443.00</span>元</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default createForm()(AppMemberComponent);
