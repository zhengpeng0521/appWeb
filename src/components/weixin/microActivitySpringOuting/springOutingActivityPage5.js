import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './springOutingActivityPage.less';

const SpringFestivalActivity = ({
	babyName,
	babyPhone,
    iosAutoPlay,
	closeState,
	assignmentBabyNameFunction,
	assignmentBabyPhoneFunction,
	submitUserDataFunction,
	closeBottomBarFunction,
	newIndex,
    index,
    obj,
}) => {

    if(iosAutoPlay) {
         wx.ready(function(){
            document.getElementById('audio_cp').play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
         });
    };
	
	function close() {
		closeBottomBarFunction();
	}

	function getInputBabyName(value) {
		assignmentBabyNameFunction(value);
	};

	function getInputBabyPhone(value) {
		assignmentBabyPhoneFunction(value);
	};

	function submitUserData() {
		_hmt.push(['_trackEvent', '微活动2017春游预约', `点击了预约按钮`, ``, '-']);
		submitUserDataFunction(babyName, babyPhone);
	};

	let showBottomBar = closeState ? 'none' : 'block';
	
	function openLine() {
		window.open('https://jinshuju.net/f/8yHb7S', '_self');
	}
	
	return(
			<div className="spring_outing_div">
				<div className={styles.background5} style={{height : HEIGHT_MIN * 100}}>
                	<div className={styles.background_title_image}><div className={styles.background_title}>{obj.title}</div></div>
					<div className={styles.inputbackground_key}></div>
					<div className={styles.inputbackground_value}></div>
					<InputItem type="text" placeholder="学员姓名" className={styles.inputName} onChange={getInputBabyName}></InputItem>
					<InputItem type="number" placeholder="手机号码" className={styles.inputValue} onChange={getInputBabyPhone}></InputItem>
					<div className={styles.background5_submit_div} onClick={submitUserData}>
                        <p className={styles.background5_submit}>提 交</p>
                    </div>
					{
						newIndex == index 
							? 
							<div>
								<div className={styles.background5_bottom_image} />
							</div>
							: ''
					}
				</div>
				<div className={styles.bottomBar} style={{display : showBottomBar}}>
					<div style={{width : '100%', height : '100%', background : '#f8bf75'}} onClick={openLine}>
						<div className={styles.p1_div}>
							<p className={styles.spanStyle}>创建属于自己的微活动，</p>
							<p className={styles.spanTextColor}>免费申请></p>
						</div>
					</div>
					<div onClick={close} className={styles.close}>X</div>
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
