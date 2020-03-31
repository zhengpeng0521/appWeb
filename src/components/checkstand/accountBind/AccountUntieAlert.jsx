import React from 'react';
import styles from './AccountUntieAlert.less';
import { Button , Modal} from 'antd-mobile';

function AccountUntieAlert({
      CancelOpenModal,
      alertVisible,
      uniteSureFunc,
}) {


    return(
        <Modal
            visible={alertVisible}
            transparent
            closable={false}
            onClose={CancelOpenModal}
            title='是否解绑'
            className='account_unite_model'
            footer = {[
                { text:'取消', onPress:()=>CancelOpenModal()},
                { text:'解绑', onPress:()=>uniteSureFunc()}
            ]}
        >
            <div className={styles.h5_open_model_cont}>
                <div className={styles.h5_content}>
                    解绑后将无法在微信中接收收款通知
                </div>
            </div>
        </Modal>
    );
}

export default AccountUntieAlert;
