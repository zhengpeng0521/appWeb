import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './microActivityDragonBoatFestival.less';

function SpringFestivalActivity({
	babyName,
	babyPhone,
    iosAutoPlay,
	assignmentBabyNameFunction,
	assignmentBabyPhoneFunction,
	submitUserDataFunction,
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

	function submitUserData() {
		_hmt.push(['_trackEvent', '微活动2017端午节预约', `点击了预约按钮`, ``, '-']);
		submitUserDataFunction(babyName, babyPhone);
	};

    return(
			<div className="dragonBoatFestivalBaseDiv">
				<div className={styles.background5}>
					<div className={styles.background2_title_fuzzy}></div>
					<div className={styles.background2_title}>{obj.title}</div>
					<div className={styles.inputbackground_key}></div>
					<div className={styles.inputbackground_value}></div>
					<InputItem type="text" placeholder="学员姓名" className={styles.background5_inputName} onChange={getInputBabyName}></InputItem>
					<InputItem type="number" placeholder="手机号码" className={styles.background5_inputValue} onChange={getInputBabyPhone}></InputItem>
					<div className={styles.background5_submit_div} onClick={submitUserData}>
                        <p className={styles.background5_submit}>提 交</p>
                    </div>
					<a href="http://www.ishanshan.com/"><p className={styles.technicalSupport}>闪宝科技提供技术支持</p></a>
				</div>
			</div>
    );
}

SpringFestivalActivity.propTypes = {
	assignmentBabyNameFunction : PropTypes.func,
	assignmentBabyPhoneFunction : PropTypes.func,
	submitUserDataFunction	: PropTypes.func,
    iosAutoPlay : PropTypes.any,
    babyName: PropTypes.any,
	babyPhone: PropTypes.any,
};

export default SpringFestivalActivity;
