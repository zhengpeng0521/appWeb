import React from 'react';
import styles from './microVerificationCodeComponent.less';
import {WhiteSpace, WingBlank, InputItem, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';

function MicroVerificationCodeComponent({

	dp,
	s,
	veriText,
	submitFunction,
	getVeriCodeAction,
	getVerificationCodeFunction,
	form : {
		getFieldProps,
		getFieldsValue,
		resetFields,
	}
	
}) {

	function submit() {
		let data = getFieldsValue();
		if(data.phone == '' || data.phone == undefined || data.phone == 'undefined') {
			Toast.info('手机号码号码不能为空', 1);
			return;
		} else {
			let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			let phone = data.phone.replace(/\s/g, "");
			if (!reg.test(phone)) {
				Toast.info("请输入正确的手机号码", 1);
				return;
			} 
		}
		
		if(data.verificationCode == '' || data.verificationCode == undefined || data.verificationCode == 'undefined') {
			Toast.info('验证码不能为空', 1);
			return;
		} else {
			if(data.verificationCode.length == 4) {
				
			} else {
				Toast.info('输入错误', 1);
				return;
			}
		}
		
		submitFunction({
			phone : data.phone.replace(/\s/g, ""),
			verificationCode : data.verificationCode,
		});
	}

	//获取验证码
	function getVerification() {
		if(getVeriCodeAction) {
			return;	
		}
		
		let data = getFieldsValue();
		if(data.phone == '' || data.phone == undefined || data.phone == 'undefined') {
			Toast.info('手机号码号码不能为空', 1);
			return;
		} else {
			let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			let phone = data.phone.replace(/\s/g, "");
			if (!reg.test(phone)) {
				Toast.info("请输入正确的手机号码", 1);
				return;
			} 
		}	
		
		let s = 60;
		let clearTime = false;
		let time = setInterval(function() {
			if (--s == 0) {
				clearInterval(time);
				dp('updateState', {s : undefined, veriText : '重新获取', getVeriCodeAction : false})
			} else {
				if(clearTime == false) {
					clearTime = true;
					getVerificationCodeFunction({
						phone : data.phone.replace(/\s/g, ""),
					});
				}
				dp('updateState', {s : s, veriText : `${s}s后重新获取`, getVeriCodeAction : true})
			}
		}, 1000);	
	}

	return(
		<div className="js_v_code">
			<div className={styles.new_wrap}>
				<div className={styles.new_login}>
					<h3 className={styles.new_login_title}>请完善您的信息</h3>
					<div className={styles.new_line}></div>
					<div className={styles.new_tel}>
						<InputItem
							{...getFieldProps('phone')}
							type="phone"
							clear
							placeholder="请输入手机号码"
						/>
					</div>
					<div className={styles.new_code}>
						<InputItem
							{...getFieldProps('verificationCode')}
							type="number"
							placeholder="请输入验证码"
						/>
						<div
							className={styles.new_code_btn}
							onClick={() => getVerification()}
						>{veriText}</div>
					</div>
					<div className={styles.new_submit} onClick={() => submit()}>提交</div>
				</div>
			</div>

			{/* <WingBlank>
				<div className={styles.js_v_code_title}>请先完善您的信息</div>
			</WingBlank>
			<div className={styles.js_v_code_content}>
				<WingBlank>
				<div className={styles.js_div}>
					<div className={styles.js_left_vc_div}>手机号</div>
					<div className={styles.js_right_vc_phone_div}>
						<InputItem
							{...getFieldProps('phone')}
							type="phone"
							clear
							placeholder="请输入手机号码"
						>
						</InputItem>
					</div>
				</div>
				<div className={styles.js_div}>
					<div className={styles.js_left_vc_div}>验证码</div>
					<div className={styles.js_right_vc_base_div}>
						<div className={styles.js_right_vc_div}>
							<InputItem
								{...getFieldProps('verificationCode')}
								type="number"
								placeholder="请输入验证码"
							>
							</InputItem>
						</div>
						<div className={styles.js_line}></div>
						<div className={styles.js_get_vc_p} 
							 style={{fontSize : w == 640 ? 23 : 26}}
							 onClick={() => getVerification()}
						>{veriText}</div>
					</div>
				</div>
				</WingBlank>
				<div className={styles.js_submit_btn} onClick={() => submit()}>提交</div>
			</div> */}
		</div>
    );
}

export default createForm()(MicroVerificationCodeComponent);



