import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './microActivity2017MayDayPage.less';

function MicroActivity2017MayDayPage({
	babyName,
	babyPhone,
	detailDataSource,
	assignmentBabyNameFunction,
	assignmentBabyPhoneFunction,
	submitUserDataFunction,
    iosAutoPlay,
    obj,
	newIndex,
	index,
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
		_hmt.push(['_trackEvent', '微活动2017五一预约', `点击了预约按钮`, ``, '-']);
		submitUserDataFunction(babyName, babyPhone);
	};

    return(
			<div className="js_may_day_page">
				<div className={styles.js_bg6} style={{height : HEIGHT_MIN * 100}}>
					<div className={styles.js_bg6_p}>{obj&&obj.title}</div>
					<div className={styles.js_inputbackground_key}></div>
					<div className={styles.js_inputbackground_value}></div>
					<InputItem type="text" placeholder="学员姓名" className={styles.js_inputName} onChange={getInputBabyName}></InputItem>
					<InputItem type="number" placeholder="手机号码" className={styles.js_inputValue} onChange={getInputBabyPhone}></InputItem>
					<div className={styles.js_inputbackground_submit} onClick={subUserData}>提交</div>
					<a href="http://www.ishanshan.com/"><p className={styles.technicalSupport}>闪宝科技提供技术支持</p></a>
				</div>
				{
					newIndex == index 
					? 
					<div>
						<div className={styles.js_bg6_image1} />
						<div className={styles.js_bg6_image2} />
						<div className={styles.js_bg6_image3} />
					</div>
					: ''
				}
			</div>
    );
}

MicroActivity2017MayDayPage.propTypes = {
	assignmentBabyNameFunction : PropTypes.func,
	assignmentBabyPhoneFunction : PropTypes.func,
	submitUserDataFunction	: PropTypes.func,
	detailDataSource : PropTypes.any,
    iosAutoPlay : PropTypes.any,
};

export default MicroActivity2017MayDayPage;
