import React, {PropTypes} from 'react';
import { InputItem, Modal } from 'antd-mobile';
import styles from './microLeafletsEnglishLongPage.less';

var top_y = 0;

const EnglishActivityComponent = ({
	babyName,
	babyPhone,
	assignmentBabyNameFunction,
	assignmentBabyPhoneFunction,
	submitUserDataFunction,
    iosAutoPlay,
	modalisShow,
	modalIshowFunction,
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

	function getInputBabyName(value) {
		assignmentBabyNameFunction(value);
	};

	function getInputBabyPhone(value) {
		assignmentBabyPhoneFunction(value);
	};

	function subUserData() {
		_hmt.push(['_trackEvent', '微传单2017英语长模板预约', `点击了预约按钮`, ``, '-']);
		submitUserDataFunction(babyName, babyPhone);
	};
	
	function changeModalIsShow() {
		top_y = (document.body.scrollTop || document.documentElement.scrollTop) + 100;
		modalIshowFunction(true);
	};
	
	function onClose() {
		top_y = 0;
		modalIshowFunction(false);
	};
	
	let showState = modalisShow ? 'block' :'none';

	let head_img = 'url(' + obj.head_imgUrl + ')';
	return(
			<div className="microLeafletsEnglishLong_div">
				<div className={styles.background} style={{minHeight : HEIGHT_MIN * 100}}>
					<div className={styles.maa} onClick={changeModalIsShow}></div>
					<div className={styles.background_header} style={{backgroundImage:head_img}}></div>	
					<div className={styles.background_title}>{obj.title}</div>	
					<div className={styles.background_sub1_title}>机构简介</div>	
					<div className={styles.background_sub1_star}></div>	
					<div className={styles.background_sub1_content_image}>
						<p className={styles.background_sub1_content}>{obj.intro}</p>
					</div>
					<div className={styles.background_sub1_shu_image}></div>
					<div className={styles.background_sub2_title}>机构环境</div>
					<div className={styles.background_sub2_image_div}>
						{
							obj.organImgs&&obj.organImgs.map(function(item,index) {
								let imgurl = 'url(' + item.imgurl + ')';
								return  <div key={index}>
											{
												index % 2 == 0 
												? <div className={styles.background_sub2_l_iamge} style={{backgroundImage:imgurl}} ></div> 
												: <div className={styles.background_sub2_r_iamge} style={{backgroundImage:imgurl}} ></div>
											}

										</div>
							})	
						 }
					</div>	
					<div className={styles.background_sub3_shu_image}></div>
					<div className={styles.background_sub3_title}>课程体系</div>
					<div className={styles.background_sub3_star}></div>	
					<div className={styles.background_sub3_content_image}>
						<div className={styles.background_sub3_content}>
							{
								obj.course_intro&&obj.course_intro.map(function(item, index) {
									return  <div key={index}>
												<p className={styles.background2_content_right_p}>{item}</p>
											</div>
								})
							}
						</div>
					</div>
					<img className={styles.background_qr} src={obj.code_imgUrl} />
					<div className={styles.qr_p1}>长按扫码</div>
					<div className={styles.qr_p2}>免费预约试听</div>
					<div className={styles.background_sub4_content_image}>
						<div className={styles.background1_contact}>联系方式</div>
						<div className={styles.bottom_contact_div}>
							{
								obj.contact&&obj.contact.map(function(item,index) {
									return  <div key={index}>
												<div className={styles.background1_l_text}>{item.label}:</div>
												<div className={styles.background1_r_text}>{item.value}</div>
											</div>
								})	
							}
						</div>	
					</div>
					<div className={styles.background_sub4_shu_image}></div>
					<a href="http://www.ishanshan.com/"><p className={styles.technicalSupport}>闪宝科技提供技术支持</p></a>
					<div onTouchStart={onClose} className={styles.maskbackground} style={{'display' : showState}}></div>
						<div className={styles.maskbackground_content_show} style={{'display' : showState}}>
							<div className={styles.maa_p}>预约试听</div>
							<div className={styles.inputbackground_key_div}></div>
							<div className={styles.inputbackground_value_div}></div>
							<div className={styles.inputbackground_key}></div>
							<div className={styles.inputbackground_value}></div>
							<InputItem type="text" placeholder="学员姓名" className={styles.inputName} onChange={getInputBabyName}></InputItem>
							<InputItem type="number" placeholder="手机号码" className={styles.inputValue} onChange={getInputBabyPhone}></InputItem>
							<div className={styles.maa_submit} onClick={subUserData}>
						</div>
					</div>
				</div>
			</div>
    );
}

EnglishActivityComponent.propTypes = {
	assignmentBabyNameFunction : PropTypes.func,
	assignmentBabyPhoneFunction : PropTypes.func,
	submitUserDataFunction	: PropTypes.func,
    iosAutoPlay : PropTypes.any,
    babyName: PropTypes.any,
	babyPhone: PropTypes.any,
	modalisShow : PropTypes.any,
	modalIshowFunction : PropTypes.func,
};

export default EnglishActivityComponent;
