import React from 'react';
import styles from './linkAlertComponent.less';
import { Button , Modal} from 'antd-mobile';

function linkAlertComponent({
      CancelOpenModal,
      linkModelVisible,
      shareFunc,
}) {


    return(
        <Modal
            visible={linkModelVisible}
            transparent
            closable={false}
            onClose={CancelOpenModal}
            title={null}
            className='h5_link_model'
        >
            <div className={styles.h5_link_model_cont}>
                <div className={styles.h5_link_model_close_btn}>
                    <img onClick={CancelOpenModal} className={styles.h5_link_model_close_btn_img} src="//img.ishanshan.com/gimg/img/a11cb9b3ed3e325c7a1a462c2390463d"/>
                </div>
                <div className={styles.h5_content}>
                    <div className={styles.h5_content_title}>生成链接成功</div>
                    <div className={styles.h5_content_middle}>您将以金宝贝的名义发送邀请</div>
                </div>
                <Button onClick={shareFunc}>立即邀请</Button>
            </div>
        </Modal>
    );
}

export default linkAlertComponent;
