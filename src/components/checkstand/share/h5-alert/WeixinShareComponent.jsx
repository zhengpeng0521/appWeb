import React from 'react';
import styles from './WeixinShareComponent.less';

function WeixinShareComponent({
    weixinModelVisible,
    onClose,
}) {

    return (
            <div className={styles.game_weixin_share_cont}
                style={{
                    display: weixinModelVisible ? 'block':'none'
                }}
                onClick={onClose}
            >
                <div className={styles.shareBg} id='mask'>
                    <img className={styles.gameFindImg} src="https://img.ishanshan.com/gimg/img/93cae1bd2eb0c2ab58fb90e7afc00e7f"/>
                </div>
            </div>
        );
}

export default WeixinShareComponent;
