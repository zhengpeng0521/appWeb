import React from 'react';
import styles from './OpenAlertComponent.less';
import { Button , Modal} from 'antd-mobile';

function OpenAlertComponent({
      CancelOpenModal,
      openModelVisible,
      openFunc,
}) {


    return(
        <Modal
            visible={openModelVisible}
            transparent
            closable={false}
            onClose={CancelOpenModal}
            title={null}
            className='h5_open_model'
        >
            <div className={styles.h5_open_model_cont}>
                <div className={styles.h5_open_model_close_btn}>
                    <img onClick={CancelOpenModal} className={styles.h5_open_model_close_btn_img} src="//img.ishanshan.com/gimg/img/a11cb9b3ed3e325c7a1a462c2390463d"/>
                </div>
                <div className={styles.h5_content}>
                    非常抱歉，您不是此活动对象，只有闪闪收银宝用户才能参加此活动，请先开通收银宝哦
                </div>
                <Button onClick={openFunc}>免费开通</Button>
            </div>
        </Modal>
    );
}

export default OpenAlertComponent;
