import React, {PropTypes} from 'react';
import styles from './MicroEarlyEducationcPage.less';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);

function MicroLeafletsInvitationPage({

    data, nIndex, index, dp, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}
	
}) {

	function submit() {
		_hmt.push(['_trackEvent', '微传单2017机构通用版模板预约', `点击了预约按钮`, ``, '-']);
		let data = getFieldsValue();
		let baby_bir = data.baby_birthday&&data.baby_birthday.format('YYYY-MM-DD');

		//验证宝宝姓名
		if(data.baby_name == '' || data.baby_name == undefined || data.baby_name == 'undefined') {
			return Toast.info('请输入宝宝姓名', 1);
		}

		//验证宝宝姓名是否含有数字
		if(data.baby_name&&data.baby_name.length>0) {
			if(data.baby_name.match(/\d+/g)) {
				return Toast.info('姓名不能包含数字', 1);
			}
		}

		//验证联系方式
		if(data.baby_phone != '' && data.baby_phone != undefined && data.baby_phone != 'undefined') {
			let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			let phone = data.baby_phone.replace(/\s/g, "");
			if (!reg.test(phone)) {
				return Toast.info("请输入正确的手机号码", 1);
			}
		} else {
			return Toast.info('请输入联系方式', 1);
		}

		//验证宝宝生日
		if(baby_bir == '' || baby_bir == undefined || baby_bir == 'undefined') {
			return Toast.info('请输入宝宝生日', 1);
		}

		let paramter = {
			baby_bir 	: baby_bir,
			baby_name 	: data.baby_name,
			baby_phone 	: data.baby_phone.replace(/\s/g, ""),
			baby_note 	: data.note_input,
		}

		dp('submit', {paramter : paramter})
	};

    return(
		<div className="js_early_educationc">
			<div className={styles.page6_bg}>
			{
				 nIndex == index 
					?
						<div style={{minHeight : initWindowHeight || document.body.clientHeight}}>
							<div className={styles.page2_image}>{data.title || ''}</div>
							<div className={styles.baby_name} style={{animationDelay : '200ms'}}>
								<InputItem
									{...getFieldProps('baby_name')}
									placeholder="学员姓名"
								/>
							</div>
							<div className={styles.baby_phone} style={{animationDelay : '400ms'}}>
								<InputItem
									{...getFieldProps('baby_phone')}
									type="phone"
									placeholder="联系方式"
								></InputItem>
							</div>
							<div className={styles.baby_birthday} style={{animationDelay : '600ms'}}>
								<DatePicker
									style={{fontSize : '20px'}}
									extra="学员生日"
									mode="date"
									{...getFieldProps('baby_birthday')}
									 minDate={moment('1990-01-01', 'YYYY-MM-DD').utcOffset(8)}
									 maxDate={gmtNow}
									>
										 <List.Item arrow="horizontal"></List.Item>
								</DatePicker>
							</div>
							<div className={styles.baby_submit}
								 onClick={submit}>提  交
							</div>
							<div className={styles.page6_image1} style={{top : initWindowHeight * 0.78}}></div> 
							<div className={styles.page6_image2_l} style={{top : initWindowHeight * 0.9}}></div> 
							<div className={styles.page6_image2_r} style={{top : initWindowHeight * 0.9}}></div> 
							<div className={styles.page6_image3} style={{top : initWindowHeight * 0.63}}></div> 
							<div className={styles.page6_image4} style={{top : initWindowHeight * 0.55}}></div> 
							<div className={styles.page6_image5} style={{top : initWindowHeight * 0.6}}></div> 
							<div className={styles.page6_image6} style={{top : initWindowHeight * 0.65}}></div> 
						</div>
					: ''
			}
			</div>
		</div>
    );
}

export default createForm()(MicroLeafletsInvitationPage);
