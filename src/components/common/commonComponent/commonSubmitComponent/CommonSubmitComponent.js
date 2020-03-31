/*
 *	dot_title : 打点内容 例(微活动2017母亲节预约)
 *	inputStyles1 	input样式，
 *	inputStyles2 	默认是1
 *	inputStyles3 	默认是1
 *	submitStyles 	提交按钮样式
 *  submitFun 	 	提交回调
 *  showNote       	是否显示备注输入框
 */
import React, {PropTypes} from 'react';
import { InputItem, Modal, DatePicker, List, Toast } from 'antd-mobile';
import styles from './CommonSubmitComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);

function FineArtsComponent({

	dot_title, inputStyles1, inputStyles2, inputStyles3, submitStyles, submitFun, showNote,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	//提交数据
	function submit() {	
		if(dot_title === undefined || dot_title == '') {
			return Toast.info('dot_title未输入');
		}
		_hmt.push(['_trackEvent', dot_title, `点击了预约按钮`, ``, '-']);
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
			note		: data.note || '',
		}
		submitFun({paramter : paramter})
	}
	
	return(
			<div>
				<div className={styles.input} style={inputStyles1}>
					<InputItem
						{...getFieldProps('baby_name')}
						placeholder="请输入学员姓名"
					/>
				</div>
				<div className={styles.input} style={inputStyles2 != undefined ? inputStyles2 : inputStyles1}>
					<InputItem
						{...getFieldProps('baby_phone')}
						type="phone"
						placeholder="请输入手机号码"
					/>
				</div>
				<div className={styles.input} style={inputStyles3 != undefined ? inputStyles3 : inputStyles1}>
					<DatePicker
						style={{fontSize : '20px'}}
						extra="请选择学员生日"
						mode="date"
						{...getFieldProps('baby_birthday')}
						 minDate={moment('1980-01-01', 'YYYY-MM-DD').utcOffset(8)}
						 maxDate={gmtNow}
						>
						<List.Item arrow="horizontal"></List.Item>
					</DatePicker>
				</div>
				{
					!!showNote ? 
						<div className={styles.input} style={inputStyles1}>
							<InputItem
								{...getFieldProps('note')}
								placeholder="请填写备注"
							/>
						</div>
 						:
						''
				}
				<div className={styles.input_submit} style={submitStyles} onClick={submit}>
					提 交
				</div>
			</div>
    );
}

export default createForm()(FineArtsComponent);