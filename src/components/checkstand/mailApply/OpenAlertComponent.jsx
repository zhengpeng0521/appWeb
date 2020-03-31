import React from 'react';
import styles from './OpenAlertComponent.less';
import { Button , Modal} from 'antd-mobile';

function OpenAlertComponent({
      CancelOpenModal,
      alertVisible,
}) {


    return(
        <Modal
            visible={alertVisible}
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
                    非常抱歉，您不是此次活动对象，只有闪闪收银宝用户才能参加此活动，请先开通收银宝哦
                </div>
                <Button onClick={CancelOpenModal}>知道了</Button>
            </div>
        </Modal>
    );
}

export default OpenAlertComponent;
