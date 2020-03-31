import React, { PropTypes } from 'react';
import {Modal } from 'antd-mobile';

//微信 用浏览器打开的mosk
function MaskComponent({ maskVisible }) {
    return (
        <Modal
            title={null}
            closable={false}
            maskClosable
            transparent
            visible={maskVisible}
            className="mosk_modal_content"
          >
            <img style={{float: 'right', marginRight: '15px'}} src="http://115.29.172.104/gimg/img/90ca004b6e49e382381051d7c34bf95b" />
          </Modal>
    );
}

export default MaskComponent;
