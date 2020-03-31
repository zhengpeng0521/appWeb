import React from 'react';
import styles from './BadgeComponent.less';
import { ActivityIndicator , Flex } from 'antd-mobile';
import {createForm} from 'rc-form';
import QRCode from 'qrcode.react';

function BadgeComponent({


}) {
	return(
        <div className={styles.card}>
            <div className={styles.tip}>
                <div>尺寸:5.4*8.55cm</div>
                <div>请用A4纸打印</div>
            </div>
            <div className={styles.card_info}>
                <img src="//img.ishanshan.com/gimg/img/d095fc9e1aa3218410d11a18f9417494" />
            </div>
            <div className={styles.foot_tip}>
                <div>此为版本样式参考图</div>
                <div>个人工牌请长按保存至相册</div>
            </div>
        </div>
    );
}

export default BadgeComponent;
