import React from 'react';
import styles from './microMaaComponent.less';
import {WhiteSpace, WingBlank, Picker, Icon,List, Popup, InputItem, DatePicker, Toast, Radio, Button} from 'antd-mobile';
import {createForm } from 'rc-form';
import moment from 'moment';


//const sexData =[{value: '1', label: '男'}, {value: '2', label: '女'}];
const gmtNow = moment().utcOffset(0);
function MicroMaaComponent({

	dp,
	isTouchMaa,
	maaConfig,
	requestError,
	selectCampus,
	selectCampusId,
	campusAddress,
	currentSexFemale,
	currentSexMan,
	campusListSource,
	jumpMaaHistoryFunction,
	touchCampusMapFunction,
	tenantId,
	orgId,
	courseName,
	form : {
		getFieldProps,
		getFieldsValue,
		resetFields,
	}
}) {
		
	let isbool = false;
	if(maaConfig.orgChoice != 0 
	   || maaConfig.orgAddr != 0 
	   || maaConfig.babyName != 0 
	   || maaConfig.babyBirthday != 0 
	   || maaConfig.babySex != 0 
	   || maaConfig.tel != 0 
	   || maaConfig.addr != 0 
	   || maaConfig.gift != 0) {
		
	} else {
		isbool = true;
	}

	// let showBabyOrStu = 'baby';//显示宝宝
	// if(tenantId == 35672 || tenantId == '35672'){
		let showBabyOrStu = 'stu'; //显示学员
	// }

	function onMaskClose() {
		
	}
	
	function closePopup(e, orgName, index) {
		let address = '';
		if(campusListSource&&campusListSource.length>0) {
			address = campusListSource[index].address;
		}
		dp('updateState', {selectCampus : orgName, selectCampusId : e, campusAddress : address});
		dp('getMaaConfig', { orgId: e});
		Popup.hide();
	}
	
	//点击地图
	function touchCampusMap() {
		touchCampusMapFunction(campusAddress);
	}
	
	//点击预约历史
	function touchMaaHistory() {
		jumpMaaHistoryFunction();
	}
	
	//点击预约
	function touchMaa() {

		let obj = getFieldsValue();

		let baby_bir = obj.baby_birthday&&obj.baby_birthday.format('YYYY-MM-DD');
		let appointment_time = obj.appointment_time && obj.appointment_time.format('YYYY-MM-DD HH:mm');



		//验证宝宝姓名
		if(obj.baby_name == '' || obj.baby_name == undefined || obj.baby_name == 'undefined') {
			if(maaConfig.babyName == 1) {
				Toast.info(showBabyOrStu = 'stu' ? '请输入学员姓名' : '请输入宝宝姓名', 1);
				return;
			}
		}

		//验证宝宝姓名是否含有数字
		if(obj.baby_name&&obj.baby_name.length>0) {
			if(maaConfig.babyName == 1) {
				if(obj.baby_name.match(/\d+/g)) {
					Toast.info('姓名不能包含数字', 1);
					return;
				}
			}
		}

		//验证宝宝生日
		if(baby_bir == '' || baby_bir == undefined || baby_bir == 'undefined') {
			if(maaConfig.babyBirthday == 1) {
				Toast.info(showBabyOrStu = 'stu'? '请输入学员生日' : '请输入宝宝生日', 1);
				return;
			}
		}

		//验证宝宝性别
//		if(obj.baby_sex == '' || obj.baby_sex == undefined || obj.baby_sex == 'undefined') {
//			if(maaConfig.babySex == 1) {
//				Toast.info('请输入宝宝性别', 1);
//				return;
//			}
//		}
		
		if(currentSexFemale == false && currentSexMan == false) {
			if(maaConfig.babySex == 1) {
				Toast.info(showBabyOrStu = 'stu' ? '请选择学员性别' : '请选择宝宝性别', 1);
				return;
			}
		} 

		//验证联系方式
		if(obj.baby_phone != '' && obj.baby_phone != undefined && obj.baby_phone != 'undefined') {
				
			// let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			let reg = /^1\d{10}$/
			let phone = obj.baby_phone.replace(/\s/g, "");
			if (!reg.test(phone)) {
				Toast.info("请输入正确的手机号码", 1);
				return;
			} 
		} else {
			if(maaConfig.tel == 1) {
				Toast.info('请输入联系方式', 1);
				return;
			}
		}
		
		//验证联系地址
		if(obj.baby_address == '' || obj.baby_address == undefined || obj.baby_address == 'undefined') {
			if(maaConfig.addr == 1) {
				Toast.info('请输入联系地址', 1);
				return;
			}
		}
		
		//验证预约时间
		if(appointment_time == '' || appointment_time == undefined || appointment_time == 'undefined') {
			if(maaConfig.appointmentTime == 1) {
				Toast.info('请选择预约时间', 1);
				return;
			}
		}
		
		dp('updateState', { isTouchMaa: !isTouchMaa });

		let paramter = {
			src 			: '4',
			childBirthday 	: baby_bir,
			childName		: obj.baby_name&&obj.baby_name,
			orgId 			: selectCampusId,
			sex				: currentSexFemale ? '2' : '1',
			addr 			: obj.baby_address&&obj.baby_address,
			tel				: obj.baby_phone&&obj.baby_phone.replace(/\s/g, ""),
			appointmentTime : appointment_time,
			
		}
		if (maaConfig.babyBirthday == 0) {
			delete paramter.childBirthday
		}
		if (maaConfig.babySex == 0) {
			delete paramter.sex
		}
		dp('submitMaa', {paramter : paramter});
	}

	function touchOrg() {
		Popup.show(
			<PopupContent 
				onClose={(e, orgName, index) => closePopup(e, orgName, index)} 
				campusListSource={campusListSource} 
			/>, {animationType: 'slide-up', onMaskClose});
	};
	
	function selectSexManFunction() {
		dp('updateState', {
			currentSexFemale 	: false, 
			currentSexMan 		: true, 
		});
	}
	
	function selectSexFemaleFunction() {
		dp('updateState', {
			currentSexFemale 	: true,
			currentSexMan	 	: false, 
		});
	}

	function blur() {
		document.body.scrollTop=-87
	}
	return(
		<div className="js_maa_home">
			{
				maaConfig&&maaConfig.orgChoice === 1 
					? 
					<div className={styles.js_select_campus_first}>
						<WingBlank>
							<div className={styles.js_general_base_div} onClick={touchOrg}>
								<div className={styles.js_left_title_div}>选择校区</div>
								<div className={styles.js_right_title_div} style={{width :  'calc(100% - 140px)'}}>
									<p className={styles.js_campus_address}>{selectCampus || '请选择'}</p>
									<svg className={styles.js_arrow}>
										<use xlinkHref={`#anticon-xiala`}></use>
									</svg>
								</div>
							</div>
						</WingBlank>
					</div>
					:
				''	
			}
			{
				maaConfig&&maaConfig.orgAddr === 1 
					? 
					<div className={styles.js_select_campus}>
						<WingBlank>
							<div className={styles.js_general_base_div}>
								<div className={styles.js_left_title_div}>校区地址</div>
								<div className={styles.js_right_title_div}>
									<p className={styles.js_campus_address} onClick={touchCampusMap}>
										{campusAddress != "" && campusAddress != undefined ? campusAddress : '地址为空'}
									</p>
									<Icon type="erweima" className={styles.js_map_icon} />
								</div>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
				maaConfig&&maaConfig.babyName === 1 
					? 
					<div className={styles.js_select_campus}>
						<WingBlank>
							<div className={styles.js_general_base_div}>
								<div className={styles.js_left_title_div}>{showBabyOrStu == 'stu' ? '学员姓名' : '宝宝姓名'}</div>
								<InputItem {...getFieldProps('baby_name')}  onBlur={() => { blur()}} placeholder={showBabyOrStu == 'stu' ? '请输入学员姓名' : '请输入宝宝姓名'}></InputItem>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
				maaConfig&&maaConfig.babyBirthday === 1 
					? 
					<div className={styles.js_select_campus}>
						<WingBlank>
							<div className={styles.js_general_base_div}>
								<div className={styles.js_left_title_div}>{showBabyOrStu == 'stu' ? '学员生日' : '宝宝生日'}</div>
								<DatePicker
									mode="date"
									{...getFieldProps('baby_birthday', {
										initialValue: gmtNow,	
									})}
									minDate={moment('1980-01-01 00:00', 'YYYY-MM-DD').utcOffset(8)}
									maxDate={moment((new Date()).toISOString().slice(0,10), 'YYYY-MM-DD').utcOffset(8)}
								>
								  <List.Item arrow="down"></List.Item>
								</DatePicker>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
				maaConfig&&maaConfig.babySex === 1 
					? 
					<div className={styles.js_select_campus}>
						<WingBlank>
							<div className={styles.js_general_base_div}>
								<div className={styles.js_left_title_div}>{showBabyOrStu == 'stu' ? '学员性别' : '宝宝性别'}</div>
								<div className={styles.js_right_sex_div} style={{width : 'calc(100% - 160px)'}}>
									<Radio 
										className="my-radio" 
										onChange={() => selectSexManFunction()} 
										checked={currentSexMan}> 男</Radio>
									<Radio 
										className="my-radio" 
										onChange={() => selectSexFemaleFunction()}
										checked={currentSexFemale}> 女</Radio>
								</div>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
				maaConfig&&maaConfig.tel === 1 
					? 
					<div className={styles.js_select_campus}>
						<WingBlank>
							<div className={styles.js_general_base_div}>
								<div className={styles.js_left_title_div}>联系方式</div>
								<InputItem {...getFieldProps('baby_phone')}  onBlur={() => { blur()}} type="phone" placeholder="请输入联系方式"></InputItem>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
				maaConfig&&maaConfig.addr === 1 
					? 
					<div className={styles.js_select_campus_add}>
						<WingBlank>
							<div className={styles.js_general_base_div}>
								<div className={styles.js_left_title_div}>联系地址</div>
								<InputItem {...getFieldProps('baby_address')}  onBlur={() => { blur()}} placeholder="请输入联系地址"></InputItem>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
				maaConfig && maaConfig.appointmentTime === 1
				?
				<div className={styles.js_select_campus}>
					<WingBlank>
						<div className={styles.js_general_base_div}>
							<div className={styles.js_left_title_div}>预约时间</div>
							<DatePicker
								mode="datetime"
								{...getFieldProps('appointment_time', {
									initialValue: gmtNow,
								})}
								minDate={moment((new Date()).toISOString().slice(0,10), 'YYYY-MM-DD HH:mm').utcOffset(8)}
							>
							  <List.Item arrow="down"></List.Item>
							</DatePicker>
						</div>
					</WingBlank>
				</div>
				:
				''
			}
			{
				!!courseName
				?
				<div>
					<WingBlank>
						<div className={styles.js_general_base_div}>
							<div className={styles.js_left_title_div}>预约课程</div>
							<div className={styles.js_right_title_div} >
								<p className={styles.js_campus_address}>{courseName}</p>
							</div>
						</div>
					</WingBlank>
				</div>
				:''
			}
			{
				maaConfig&&maaConfig.gift === 1 
					? 
					<div className={styles.js_select_campus_add_color}>
						<WingBlank>
							<div className={styles.js_general_base_div_add}>
								<div className={styles.js_left_title_div_add}><img src="http://img.ishanshan.com/gimg/n/20191022/88d71a942c73615cbfea5c423ed36a5b" className={styles.js_tips_icon}/><span>预约有礼:</span></div>
								<div className={styles.js_right_title_div_add} >
									<p className={styles.js_campus_address_add}>{maaConfig.giftContent}</p>
								</div>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
//				maaConfig&&maaConfig.remark === 1
//					?
//					<div className={styles.js_select_campus_add}>
//						<WingBlank>
//							<div className={styles.js_general_base_div_add}>
//								<div className={styles.js_left_title_div}>备注</div>
//								<div className={styles.js_right_title_div} >
//									<p className={styles.js_campus_address}>{maaConfig.remarkContent}</p>
//								</div>
//							</div>
//						</WingBlank>
//					</div>
//					:
//					''
			}
			{
				maaConfig&&maaConfig.remark === 1 
					? 
					<div className={styles.js_select_campus_add_remind}>
						<WingBlank>
							<div className={styles.js_general_base_div_add}>
								<div className={styles.js_left_title_div_add}><img src='http://img.ishanshan.com/gimg/n/20191022/cc2ff4f3048fd5dc31e13e4fcce8023f' className={styles.js_tips_icon} /><span>温馨提醒:</span></div>
								<div className={styles.js_right_title_div_add} >
									<p className={styles.js_campus_address_add}>{maaConfig.remarkContent}</p>
								</div>
							</div>
						</WingBlank>
					</div>
					:
					''
			}
			{
				!isbool&&!requestError
					? 
					<WingBlank>
						<Button className={styles.js_maa_btn_div} disabled={isTouchMaa} onClick={touchMaa}>
							预约
						</Button>
					</WingBlank>
					:
					''
			}
			<p className={styles.js_maa_history} onClick={touchMaaHistory}>预约历史 ></p>
		</div>
    );
}

function PopupContent({
	
	onClose,
	campusListSource,
	
}) {

    return (
		<div>
		  	<List className="js_maa_list">
				{
					campusListSource&&campusListSource.length>0&&campusListSource.map((item, index) => {
						return 	<List.Item onClick={() => onClose(item.orgId, item.orgName, index)} key={index}>{item.orgName}</List.Item>
					})
				}
		  	</List>
		</div>
    );
}

export default createForm()(MicroMaaComponent);
