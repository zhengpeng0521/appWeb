import React from 'react';
import styles from './AppPaycodeComponent.less';
import { ActivityIndicator , Flex , List} from 'antd-mobile';
import {createForm} from 'rc-form';
import QRCode from 'qrcode.react';
const Item = List.Item;
function AppPaycodeComponent({
	 form: {
    	getFieldProps,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        setFields,
        resetFields,
    },
    toCardFunc,
    toBadgeFunc,
}) {
	return(
        <div className={styles.payCode}>
            <div className={styles.payCard}>
                <div className={styles.card_info}>
                    <div className={styles.head}>青青幼儿艺术中心</div>
                    <div className={styles.payName}>扫一扫二维码，向我付钱</div>
                    <div className={styles.qrCode}>
                        <QRCode value = { `www.baidu.com`||'' } size = { 360 } />
                    </div>
                    <Flex className={styles.foot_icon}>
                        <Flex.Item className={styles.icon_content}>
                            <img className={styles.iconImg} src='//img.ishanshan.com/gimg/img/aa78159930938d25d95ceaf1f7a5252f' />
                            <div className={styles.iconName}>支付宝</div>
                        </Flex.Item>
                        <Flex.Item className={styles.icon_content}>
                            <img className={styles.iconImg} src='//img.ishanshan.com/gimg/img/6b32396e91301367a78f95f7e6cf7439' />
                            <div className={styles.iconName}>微信</div>
                        </Flex.Item>
                        <Flex.Item className={styles.icon_content}>
                            <img className={styles.iconImg} src='//img.ishanshan.com/gimg/img/4997c64d301f32614d30dd82c82c2b23'/>
                            <div className={styles.iconName}>花呗分期</div>
                        </Flex.Item>
                        <Flex.Item className={styles.icon_content}>
                            <img className={styles.iconImg} src='//img.ishanshan.com/gimg/img/6fa2fd1ee96af77915875b0044a86011' />
                            <div className={styles.iconName}>信用卡</div>
                        </Flex.Item>
                    </Flex>
                </div>
                {/*<div className={styles.btn}>
                    <List>
                        <Item
                          thumb="https://img.ishanshan.com/gimg/img/604afb0fffa0fa52f577fd0a58673fb4"
                          arrow="horizontal"
                          onClick={() => toCardFunc() }
                        >台卡</Item>
                        <Item
                          thumb="https://img.ishanshan.com/gimg/img/3b998de165b2432bdc17d75b54b294af"
                          arrow="horizontal"
                          onClick={() => toBadgeFunc() }
                        >工牌</Item>
                    </List>
                </div>*/}
            </div>
            <div className={styles.download}>保存图片</div>
        </div>
    );
}

export default createForm()(AppPaycodeComponent);
