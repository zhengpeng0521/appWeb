import React from 'react';
import styles from './CardComponent.less';
import { ActivityIndicator , Flex } from 'antd-mobile';
import {createForm} from 'rc-form';
import QRCode from 'qrcode.react';

function CardComponent({


}) {
	return(
        <div className={styles.card}>
            <div className={styles.tip}>
                <div>尺寸:10*15cm</div>
                <div>请用A4纸打印</div>
            </div>
            <div className={styles.card_info}>
                <img src="//img.ishanshan.com/gimg/img/736f3c6e3f0e8d090020eb8e1e5414c9" />
            </div>
            <div className={styles.foot_tip}>
               <div>长按保存至相册</div>
            </div>
        </div>
    );
}

export default CardComponent;
