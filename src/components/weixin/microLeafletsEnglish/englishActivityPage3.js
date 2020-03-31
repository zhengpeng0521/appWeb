import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './englishActivity.less';

const EnglishActivity = ({
	babyName,
	babyPhone,
	assignmentBabyNameFunction,
	assignmentBabyPhoneFunction,
	submitUserDataFunction,
    iosAutoPlay,
    obj,
    newIndex,
    index,
}) => {

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
		_hmt.push(['_trackEvent', '微传单2017英语模板预约', `点击了预约按钮`, ``, '-']);
		submitUserDataFunction(babyName, babyPhone);
	};

    return(
			<div className="english_div">
				<div className={styles.background3} style={{height : HEIGHT_MIN * 100}}>
					<div className={styles.background3_p}>{obj&&obj.title}</div>
					<div className={styles.inputbackground_key}></div>
					<div className={styles.inputbackground_value}></div>
					<InputItem type="text" placeholder="学员姓名" className={styles.inputName} onChange={getInputBabyName}></InputItem>
					<InputItem type="phone" placeholder="手机号码" className={styles.inputValue} onChange={getInputBabyPhone}></InputItem>
					<div className={styles.inputbackground_submit} onClick={subUserData}>
                        <p className={styles.background3_submit_button}>提 交</p>
                    </div>
					<a href="http://www.ishanshan.com/"><p className={styles.technicalSupport}>闪宝科技提供技术支持</p></a>
				</div>
                {
                    newIndex == index ? 
                        <div>
                          
                        </div> : ''
                }
			</div>
    );
}

EnglishActivity.propTypes = {
	assignmentBabyNameFunction : PropTypes.func,
	assignmentBabyPhoneFunction : PropTypes.func,
	submitUserDataFunction	: PropTypes.func,
    iosAutoPlay : PropTypes.any,
    babyName: PropTypes.any,
	babyPhone: PropTypes.any,
};

export default EnglishActivity;
