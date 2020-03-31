import React, {PropTypes} from 'react';
import { Modal, Button } from 'antd-mobile';
import styles from './FreeTrial.less';

function fresTrialAlertModal({
    AlertModalVisible,
    AlertModalContent,
    AlertModalSubmitSuccess,
    closeAlertModal
}) {


    return (
        <div>
            <Modal
                transparent
                closable={ false }
                maskClosable={ false }
                visible={ AlertModalVisible }
                onClose={ closeAlertModal }
                footer=''
                style={{ width : 630 , height : 440 ,borderRadius : 15}}
            >
                {   AlertModalSubmitSuccess == true ?
                    <div>
                        <div style={{color:'#333333',fontSize:'28px',height:'50px',lineHeight:'50px',marginTop:'95px'}}>恭喜您成功入住闪闪大本营</div>
                        <div style={{color:'#333333',fontSize:'28px',height:'50px',lineHeight:'50px'}}>闪闪小二将在24小时内与您会师</div>
                        <div style={{color:'#333333',fontSize:'28px',height:'50px',lineHeight:'50px',marginBottom:'55px'}}>敬请期待</div>
                    </div> :
                    <div style={{color:'#333333',fontSize:'30px',height:'50px',lineHeight:'50px',marginTop:'55px',marginBottom:'55px'}}>{AlertModalContent}</div>
                }
                <Button type='primary' onClick={closeAlertModal} style={{height:'98px',width:'500px',fontSize:'34px',color:'#ffffff',marginBottom:'32px'}}>我知道了</Button>

            </Modal>
         </div>
    );
}

export default fresTrialAlertModal;
