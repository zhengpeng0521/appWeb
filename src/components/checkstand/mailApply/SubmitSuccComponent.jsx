import React from 'react';
import styles from './SubmitSuccComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast} from 'antd-mobile';
import {createForm} from 'rc-form';

function SubmitSuccComponent({

}) {

    return(
         <div className={styles.content_all} style={{ 'height': 'calc(100vh - 19.3rem)'}}>
            <div className={styles.contain_img}>
                <img src='https://img.ishanshan.com/gimg/img/4acfdfbd80c495e7d12040f82a1bc859' />
            </div>
            <div className={styles.tip}>提交成功</div>
            <div className={styles.remark}>您申请的物料，我们将在7个工作日内</div>
            <div className={styles.remark}>安排邮寄，请耐心等候</div>
            <div className={styles.footer}>闪闪收银宝 · 收费神器</div>
        </div>
    );
}


export default SubmitSuccComponent;
