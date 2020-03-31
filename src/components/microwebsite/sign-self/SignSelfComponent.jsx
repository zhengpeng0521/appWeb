import React from 'react';
import styles from './SignSelfComponent.less';
import { Button, Modal } from 'antd-mobile';
import QRCode from 'qrcode.react';

function SignSelfComponent({
	tenantId,orgId,mobile,parentId,stuId,babyList,qrcode,selectStu,toSignRecord,stuName,headimgurl,
	visible,signStatus,tabStatus,btnLoading, closeModal,openModal,onlineSign
}) {


    let qrcodeProps = {
		tenantId,orgId,mobile,parentId,stuId,qrcode,stuName,headimgurl,toSignRecord,
		visible,signStatus,tabStatus,btnLoading, closeModal,openModal,onlineSign
    };

	return(
		<div className={styles.sign_self_cont}>
			<SignSelfQrcodeComponent {...qrcodeProps}/>
		</div>
    );
}

function SignSelfQrcodeComponent({
	tenantId,orgId,mobile,parentId,stuId,qrcode,stuName,headimgurl,toSignRecord,
	visible,signStatus,tabStatus,btnLoading, closeModal,openModal,onlineSign
}) {

	const signStatusText = signStatus == '2' ? '已签到' : signStatus == '3' ? '请假未审核' :
		signStatus == '4' ? '请假已审核' : signStatus == '5' ? '请假审核不通过' : '远程签到'

	return(
		<div className={styles.self_qrcode_cont} style={{minHeight: 'calc((100vh - 2rem) - 85px)'}}>
		    <div className={styles.img_qrcode_cont}>
		        <div className={styles.qrcode_baby_info}>
		            <img src={headimgurl} className={styles.qrcode_baby_img}/>
		            <div className={styles.qrcode_baby_name}>{stuName}</div>
		        </div>

		        <div className={styles.qrcode_content}>
		            <QRCode key="sign_self_qrcode"
                      value={'@@' + tenantId + '#' + orgId + '#' + stuId + '#' + parentId + '@@'}
                      size={400}
                      level="M"
					/>
					<div className={styles.desc_text}>向机构出示可快速扫码签到</div>
		        </div>
		    </div>

			{tabStatus == 'on' && <Button
				className={styles.line_sign_btn}
				type="primary"
				loading={btnLoading}
				onClick={openModal}
			>{signStatusText}</Button>}
			<Modal
				transparent
				visible={visible}
				closable={false}
				onClose={closeModal}
				footer={[
					{ text: '没送到', onPress: closeModal },
					{ text: '立即签到', onPress: onlineSign }
				]}
			>
				<span className={styles.sign_modal_content}>"{stuName || '学员'}"已经送到了吗？</span>
			</Modal>

			<div className={styles.leave_record_cont}>
                <span className={styles.leave_record_text} onClick={toSignRecord}>签到记录 >></span>
            </div>
		</div>
    );
}

export default SignSelfComponent;
