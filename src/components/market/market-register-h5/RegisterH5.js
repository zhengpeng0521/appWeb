/*
 * configData				配置数据
 * sunmitCallFunction 		提交回调
 * updateStateModalParam    更新modal显隐
 */
import React, { PropTypes } from 'react';
import { InputItem, DatePicker, List, Toast, WingBlank, WhiteSpace, TextareaItem, Checkbox, ActionSheet, Modal, Picker, Radio, Button } from 'antd-mobile';
import moment from 'moment';
import { createForm } from 'rc-form';
const gmtNow = moment().utcOffset(0);
const CheckboxItem = Checkbox.CheckboxItem;
import RegisterOverComponent from './RegisterOver.js';
// const RadioItem = Radio.RadioItem;

import styles_h5_common from './regist_h5_common.less';

import { defaultTopic, cartoonTopic, limpidTopic } from './topic'


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps; if (isIPhone) { wrapProps = { onTouchStart: e => e.preventDefault(), }; }

function RegisterH5Component({
	configData,
	sunmitCallFunction,
	updateStateModalParam,
	updateStateProps,
	invalid,
	showText,
	userId,
	submitAfterData,
	showSuccess,
	changeSubmiteBtnStatus,
	onCloseShowSuccessFunction,
	touchSubmit,
	CheckboxChange,
	checkBoxall,
	clearCheck,
	checkChose,
	form: {
		getFieldProps,
		getFieldValue,
		getFieldsValue,
		resetFields,
	}

}) {
	// console.log(checkBoxall)
	// console.log(checkChose)
	let TopicComponent = undefined;
	let styles = undefined;

	let topicProps = {
		pageTitle: configData && configData.pageTitle,
		pageLogo: configData && configData.pageLogo,
	};
	// function checkPhone(rule, value, callback){
	// 	var reg = /^[0-9]*$/;
	// 	if(reg.test(value) == false){
	// 		Toast.info('只能输入数字', 1);
	// 	}
	// }
	function goback(){
		window.scroll(0,0); //让页面归位
	}
	if (configData.topicCode == 'default') {
		styles = defaultTopic.styles;
		TopicComponent = defaultTopic.component;
	} else if (configData.topicCode == 'cartoon') {
		styles = cartoonTopic.styles;
		TopicComponent = cartoonTopic.component;
	} else if (configData.topicCode == 'limpid') {
		styles = limpidTopic.styles;
		TopicComponent = limpidTopic.component;
	} else {
		styles = defaultTopic.styles;
		TopicComponent = defaultTopic.component;
	}

	let fromConfig = Object.keys(configData).length > 0 ? JSON.parse(configData && configData.baseForm) : undefined;

	let componentArray = [];
	if (fromConfig && fromConfig.length > 0) {
		fromConfig.map((val, index) => {
			if (val.hide != 1) {
				switch (val.type) {
					case 'input':
						componentArray.push(
							<div className={styles.inputBox} key={index}>
								{
									val.name === 'vcode'
										?
										<WingBlank size="md">
											<div className={styles.inputLabel}>{val.label}</div>
											<div className={styles.inputVcCodeValue}>
												<InputItem
													type={val.valueType || 'number'}
													{...getFieldProps(val.name)}
													placeholder={'请输入' + val.label}
												/>
											</div>
											<div className="vertifyBtn">获取验证码</div>
										</WingBlank>
										:
										<WingBlank size="md">
											<div className={styles.inputLabel}>{val.label}</div>
											<div className={styles.inputValue}>
												<InputItem
													type={val.valueType === 'phone' ? 'number' : val.valueType || 'text'}
													name={val.name === 'tel' ? 'mobile' : ''}
													{...getFieldProps(val.name)}
													placeholder={'请输入' + val.label}
												/>
											</div>
										</WingBlank>
								}
							</div>
						)
						break;
					case 'date':
						let label = '请选择' + val.label;
						componentArray.push(
							<div className={styles.inputBox} key={index}>
								<WingBlank size="md">
									<div className={styles.inputLabel}>{val.label}</div>
									<div className={styles.inputValue}>
										<DatePicker
											style={{ fontSize: '20px' }}
											extra={label}
											mode="date"
											{...getFieldProps(val.name, {
												initialValue: gmtNow,
											})}
											minDate={moment('1980-01-01', 'YYYY-MM-DD').utcOffset(8)}
											maxDate={gmtNow}
										>
											<List.Item arrow="horizontal"></List.Item>
										</DatePicker>
									</div>
								</WingBlank>
							</div>
						)
						break;
					case 'select':
						let dataSource = [];
						if (val.data && val.data.length > 0) {
							for (let idx in val.data) {
								val.data[idx].label = val.data[idx].value;
								dataSource = val.data;
							}
						}
						// console.log(dataSource)
						let checkoutLabel = val.data && val.data.length > 0 ? val.data[0].value : '请选择' + val.label;
						componentArray.push(
							<div className={styles.inputBox} key={index}>
								<WingBlank size="md">
									<div className={styles.inputLabel}>{val.label}</div>
									<div className={styles.inputValue}>
										<Picker
											extra={checkoutLabel}
											data={dataSource}
											cols={1}
											{...getFieldProps(val.name, {
												initialValue: [checkoutLabel]
											})}>
											<List.Item arrow="horizontal"></List.Item>
										</Picker>
									</div>
								</WingBlank>
							</div>
						)
						break;
					case 'newForm':
						console.log(val.newForm)
						val.newForm.map((item, indexs) => {
							if (item.name == 'textBox') {
								if (item.rows == '' && item.num == '' || item.rows == false && item.num == false) {
									componentArray.push(
										<div className={styles.inputBox} key={indexs + 'textBox'}>

											<WingBlank size="md">
												<div className={styles.inputLabel}>{item.con}</div>
												<div className={styles.inputValue}>
													<InputItem
														type='text'
														placeholder="请输文本内容"
														{...getFieldProps(item.name + indexs)}
														onBlur={()=>goback()}
													/>
												</div>
											</WingBlank>

										</div>
									)
								} else if (item.rows == '' && item.num == true || item.rows == false && item.num == true) {
									componentArray.push(
										<div className={styles.inputBox} key={indexs + 'textBox'}>

											<WingBlank size="md">
												<div className={styles.inputLabel}>{item.con}</div>
												<div className={styles.inputValue}>
													<InputItem
														{...getFieldProps(item.name + indexs)}
														type="number"
														placeholder="请输入数字"
														onBlur={()=>goback()}
													/>
												</div>
											</WingBlank>

										</div>
									)
								} else if (item.rows == true && item.num == '' || item.rows == true && item.num == false) {
									componentArray.push(
										<div key={indexs + 'textBox'} className={styles.inputText}>
											<WingBlank size="md">
												<div className={styles.inputLabel}>{item.con}</div>
												<div className={styles.textareText}>
													<TextareaItem
														{...getFieldProps(item.name + indexs)}
														placeholder="请输入内容"
														autoHeight
														labelNumber={5}
														count={500}
														onBlur={()=>goback()}
													/>
												</div>
											</WingBlank>
										</div>
									)
								} else {
									componentArray.push(
										<div key={indexs + 'textBox'} className={styles.inputText}>
											<WingBlank size="md">
												<div className={styles.inputLabel} style={{marginRight:'4%'}}>{item.con}</div>
												<div className={styles.textareText}>
													<InputItem
															{...getFieldProps(item.name + indexs)}
															type="number"
															placeholder="请输入数字"
															onBlur={()=>goback()}
														/>
													{/* <TextareaItem
														// type="number"
														{...getFieldProps(item.name + indexs, {
															rules: [
																{validator : checkPhone}]
														})}
														placeholder="请输入数字"
														autoHeight
														labelNumber={5}
														count={500}
														onBlur={()=>goback()}
													/> */}
												</div>
											</WingBlank>
										</div>
									)
								}
							}
							if (item.name == 'choseBox') {
								let choseBox = []
								item.list.map((i, indexl) => (
									choseBox.push({ value:indexl, label: i.con, choseBox: 'choseBox' + indexl })
								))
								// let checkoutBox = choseBox && choseBox.length > 0 ? choseBox[0].label : '';
								// console.log(choseBox)
								let numA = 'choseBox' + indexs
								componentArray.push(
									<div className={styles.inputChosebox} key={indexs + 'choseBox'}>
										<WingBlank size="md">
											<div className={styles.inputLabel}>{item.con}</div>
											<div className={styles.choseBox}>
												{
													choseBox.map((i, indexl) => (
														<Checkbox checked={checkChose[numA][checkChose[numA].indexOf(i.choseBox)] == i.choseBox} onChange={(e) => CheckboxChange(i.label, e, indexs, i.choseBox)} key={i.value}
														>{i.label}</Checkbox >
													))
												}

											</div>
										</WingBlank>
									</div>
								)
							}
							if (item.name == 'downBox') {
								let districts = [];
								if (item.list && item.list.length > 0) {
									item.list.map((i, indexl) => (
										districts.push({ value: i.con +'_'+ indexl, key: indexl, label: i.con })
									))
								}
								// console.log(districts)
								// let checkoutLabels = '请选择内容';
								let checkoutLabels = districts && districts.length > 0 ? districts[0].label : '请选择内容';
								componentArray.push(
									<div className={styles.inputBox} key={indexs + 'downBox'}>
										<WingBlank size="md">
											<div className={styles.inputLabel}>{item.con}</div>
											<div className={styles.inputValue}>
												<Picker
													data={districts}
													cols={1}
													extra={checkoutLabels}
													{...getFieldProps(item.name + indexs, {
														initialValue: [checkoutLabels]
													})}>
													<List.Item arrow="horizontal"></List.Item>
												</Picker>
											</div>
										</WingBlank>
									</div>
								)
							}
							if (item.name == 'dayBox') {
								// 日期加时间
								let labels = '请选择日期时间';
								componentArray.push(
									<div className={styles.inputBox} key={indexs + 'dayBox'}>
										<WingBlank size="md">
											<div className={styles.inputLabel}>{item.con}</div>
											<div className={styles.inputValue}>
												<DatePicker
													style={{ fontSize: '20px' }}
													extra={labels}
													mode="datetime"
													{...getFieldProps(item.name + indexs, {
														initialValue: '',
													})}
												>
													<List.Item arrow="horizontal"></List.Item>
												</DatePicker>
											</div>
										</WingBlank>
									</div>
								)

							}
						})
						break;
					default:
						break;
				}
			}
		})
	}

	function submit() {
		let data = getFieldsValue();
		// console.log(fromConfig)
		let newForm = fromConfig[fromConfig.length - 1]
		if (newForm.type == 'newForm') {
			newForm.newForm && newForm.newForm.map((item, index) => {
				if (item.name == 'dayBox') {
					fromConfig.push({ label: item.con, name: item.name + index, type: 'date' })
				} else {
					fromConfig.push({ label: item.con, name: item.name + index })
				}
			})
		}
		// console.log(fromConfig)
		let dateKey = Object.keys(data);
		let submitDataSource = {};
		dateKey && dateKey.map((item, index) => {
			let k = dateKey[index];
			fromConfig && fromConfig.map((item, index) => {
				if (k == item.name) {
					let v = getFieldValue(k);
					if (item.require) {
						if (v == undefined || v == '') {
							return Toast.info('请完善' + item.label, 1);
						} else {

							if (item.type == 'date') {
								submitDataSource[k] = v.format('YYYY-MM-DD');
							} else {
								submitDataSource[k] = v;
							}
						}
					} else {
						if (v == undefined || v == '') {
							return Toast.info('请完善' + item.label, 1);
						}
						if (item.type == 'date') {
							submitDataSource[k] = v.format('YYYY-MM-DD');
						} else {
							submitDataSource[k] = v;
						}
					}
				}
			})
		})
		fromConfig && fromConfig.map((item, index) => {
			// console.log(checkBoxall[item.name])
			if (checkBoxall[item.name] != undefined) {
				if (checkBoxall[item.name].length == 0) {
					return Toast.info('请完善' + item.label, 1);
				}
			}
		})
		let submitArr = [];
		// console.log(submitDataSource)
		// console.log(dateKey)
		if (Object.keys(submitDataSource).length === dateKey.length) {
			dateKey.map((item, index) => {
				let dict = {};
				dict.name = item;
				if (typeof (submitDataSource[item]) === 'object') {
					dict.value = (submitDataSource[item] = submitDataSource[item][0]);
				} else {
					dict.value = submitDataSource[item];
				}
				submitArr.push(dict);
			})
			// if (checkBoxall.length == 0){
			// 	return Toast.info('请完善多选框', 1);
			// }
			submitArr.map((item, index) => {
				if (item.name.indexOf('downBox') != -1){
					// console.log(item.value.indexOf('_'))
					if(item.value.indexOf('_') != -1){
						item.value = item.value.split('_')[0]
					}
				}
			})
			submitArr.push(checkBoxall)
			if (JSON.stringify(submitArr[submitArr.length-1]) == "{}"){
				submitArr.splice(submitArr.length-1,1)
			}
			// console.log(submitArr)
			// return
			changeSubmiteBtnStatus();
			sunmitCallFunction({ formData: submitArr });
		}
	}

	//更新modal显隐
	function onClose(e) {
		e.preventDefault();
		updateStateModalParam();
	}

	function onCloseShowSuccess() {
		resetFields();
		onCloseShowSuccessFunction();
		// clearCheck()
	}

	function updateStateModal() {
		onCloseShowSuccessFunction();
	}

	let membersArr = configData && configData.members;

	let isInvalid = false;

	membersArr && membersArr.map((item, index) => {
		if (item.id == userId) {
			isInvalid = true;

		}
	})

	if (isInvalid) {
		showText = showText;
	} else {
		if (membersArr && membersArr.length) {
			showText = '市场人员未找到';
		}
	}

	// showText = isInvalid ? showText : membersArr && membersArr.length > 0 ? '二维码已失效' : '市场人员未找到';

	let overProps = {
		showText,
	}


	let component = (
		<div className={styles.boxStyle}>
			{
				submitAfterData && submitAfterData.errorCode != 9000 ?
					<Modal
						title={showText}
						transparent
						maskClosable={false}
						visible={showSuccess}
						onClose={onClose}
						footer={[{ text: '知道了', onPress: () => updateStateModal() }]}
					>
					</Modal>
					:
					<Modal
						title="恭喜您，报名成功"
						transparent
						maskClosable={false}
						visible={showSuccess}
						onClose={onCloseShowSuccess}
						footer={[{ text: '知道了', onPress: () => onCloseShowSuccess() }]}
					>
					</Modal>
			}
			<WhiteSpace size="lg" />
			{
				componentArray && componentArray.map((item, index) => {
					return item
				})
			}

			<div className={styles.submitBtn}>
				<Button className={styles.submitButton} disabled={touchSubmit} className="btn" type="primary" onClick={() => submit()}>提交</Button>
			</div>
		</div>
	);

	return (
		<div className="register_h5">
			{
				isInvalid
					?
					invalid
						?
						<RegisterOverComponent {...overProps} />
						:
						<TopicComponent {...topicProps}>{component}</TopicComponent>
					:
					<RegisterOverComponent {...overProps} />
			}
		</div>
	);
}


export default createForm()(RegisterH5Component);
