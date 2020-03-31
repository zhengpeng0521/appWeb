import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './microActivity.less';

function MicroActivity({
	babyName,
	babyPhone,
	detailData,
	assignmentBabyNameFunction,
	assignmentBabyPhoneFunction,
	submitUserDataFunction,
    iosAutoPlay,
    obj,
}) {

    if(iosAutoPlay) {
         wx.ready(function(){
            document.getElementById('audio_cp').play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
         });
    };

	function getInputBabyName(value) {
		assignmentBabyNameFunction(value);
	};

	function getInputBabyPhone(value) {
		assignmentBabyPhoneFunction(value);
	};

	function subUserData() {
		_hmt.push(['_trackEvent', '微活动2016圣诞预约', `点击了预约按钮`, ``, '-']);
		submitUserDataFunction(babyName, babyPhone);
	};
	
    return(
		<div className="content-base">
			<div className={styles.microActivity_background_image6} style={{height : HEIGHT_MIN * 100}}>
				<div className={styles.background5_top_fuzzy} />
				<div className={styles.background5_p}>{obj&&obj.title}</div>
				<div src="src/assets/weixin/microActivity/Leaf@2x.png" className={styles.background5_top_image} />
				<div className={styles.inputbackground_key}></div>
				<div className={styles.inputbackground_value}></div>
				<InputItem type="text" placeholder="学员姓名" className={styles.inputName} onChange={getInputBabyName}></InputItem>
				<InputItem type="number" placeholder="手机号码" className={styles.inputValue} onChange={getInputBabyPhone}></InputItem>
				<div className={styles.inputbackground_submit} onClick={subUserData}></div>
				<a href="http://www.ishanshan.com/"><p className={styles.technicalSupport}>闪宝科技提供技术支持</p></a>
			</div>
		</div>
    );
}

MicroActivity.propTypes = {
	assignmentBabyNameFunction : PropTypes.func,
	assignmentBabyPhoneFunction : PropTypes.func,
	submitUserDataFunction	: PropTypes.func,
	detailData : PropTypes.any,
    iosAutoPlay : PropTypes.any,
};

export default MicroActivity;
