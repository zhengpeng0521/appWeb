import React from 'react';
import styles from './modifyBabyComponent.less';
import { WhiteSpace, WingBlank, InputItem, Picker, List, DatePicker, Toast, Modal, Radio, ImagePicker, ActivityIndicator } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import EXIF from 'exif-js'
const gmtNow = moment().utcOffset(0);
const alert = Modal.alert;
//const sexData =[{value: '1', label: '男'}, {value: '2', label: '女'}];

function MicroBabyComponent({

	dp,
	modify,
	value,
	files,
	babyInfo,
	animating,
	saveBaby,
	headerUrl,
	relationshipList,
	currentSexFemale,
	currentSexMan,
	delectBabyInfoFunction,
	isModify,
	initWindowHeight,
	form: {
		getFieldProps,
		getFieldsValue,
		resetFields,
	}

}) {
	var newDate = new Date(); newDate.setTime(babyInfo && babyInfo.birthday);

	let time = newDate.toLocaleDateString().replace('/', '-').replace('/', '-');

	//	let baby_bir = obj.baby_birthday&&obj.baby_birthday.format('YYYY-MM-DD');

	let relationshipData = [];

	relationshipList && relationshipList.length > 0 && relationshipList.map((item, index) => {
		let obj = {
			value: item.key,
			label: item.value,
		};
		relationshipData.push(obj);
	})

	function delectBabyInfo() {

		const alertInstance = alert('删除操作', '确定删学员么', [
			{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
			{ text: '确定', onPress: () => delectBabyInfoFunction(), style: { fontWeight: 'bold' } },
		]);
	}

	function selectSexManFunction() {
		dp('updateState', {
			currentSexFemale: false,
			currentSexMan: true,
		});
	}

	function selectSexFemaleFunction() {
		dp('updateState', {
			currentSexFemale: true,
			currentSexMan: false,
		});
	}

	function saveBabyInfo() {

		let obj = getFieldsValue();

		let baby_bir = obj.baby_birthday && obj.baby_birthday._d;

		if (baby_bir) {
			baby_bir = baby_bir.toLocaleDateString().replace('/', '-').replace('/', '-');
		}

		//验证宝宝姓名
		if (obj.baby_name == '' || obj.baby_name == undefined || obj.baby_name == 'undefined') {
			Toast.info('请输入学员姓名', 1);
			return;
		}

		//验证宝宝姓名是否含有数字
		if (obj.baby_name.match(/\d+/g)) {
			Toast.info('姓名不能包含数字', 1);
			return;
		}

		//验证宝宝生日
		if (baby_bir == '' || baby_bir == undefined || baby_bir == 'undefined') {
			Toast.info('请输入学员生日', 1);
			return;
		}

		//验证宝宝性别
		//		if(obj.baby_sex == '' || obj.baby_sex == undefined || obj.baby_sex == 'undefined') {
		//			Toast.info('请输入宝宝性别', 1);
		//			return;
		//		}

		if (currentSexFemale == false && currentSexMan == false) {
			Toast.info('请输入学员性别', 1);
			return;
		}

		//验证联系方式
		if (obj.baby_phone != '' && obj.baby_phone != undefined && obj.baby_phone != 'undefined') {
			let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			let phone = obj.baby_phone.replace(/\s/g, "");
			if (!reg.test(phone)) {
				Toast.info("请输入正确的手机号码", 1);
				return;
			}
		} else {
			Toast.info('请输入联系方式', 1);
			return;
		}

		//验证宝宝关系
		if (obj.baby_relationship == '' || obj.baby_relationship == undefined || obj.baby_relationship == 'undefined') {
			Toast.info('请输入家长关系', 1);
			return;
		}

		let paramter = {
			baby_birthday: baby_bir,
			baby_name: obj.baby_name,
			baby_sex: currentSexFemale ? '2' : '1',
			baby_relationship: obj.baby_relationship[0],
			baby_phone: obj.baby_phone.replace(/\s/g, ""),
			baby_headerImage: headerUrl,
		}
		// console.log('------------')
		dp('saveBabyInfo', { paramter: paramter });
	}

	//上传(未使用)
	function inputChange(e) {
		let pic = document.getElementById('file_upload');
		let pic1 = document.getElementById('file_upload1');

		let render = new FileReader();
		let files = [];

		if (pic.files.length > 0) {
			files = pic.files[0];
		}
		if (pic1.files.length > 0) {
			files = pic1.files[0];
		}

		dp('updateState', { animating: !animating });

		var img = new Image();

		render.readAsDataURL(files);
		render.onload = function (e) {
			var img = document.createElement('img');
			img.src = e.target.result;
			img.onload = function () {
				var data = getBase64Image(img);
				dp('getHeaderUrl', { file: data });
			}
		}
	}

	//安卓进行转换
	function getBase64Image(img) {
		var canvas = document.createElement("canvas");
		canvas.width = 300;
		canvas.height = 300;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, 300, 300);
		var dataURL = canvas.toDataURL("image/png");
		return dataURL;
	}

	//图片上传
	function selectFileImage() {

		let pic = document.getElementById('file_upload');
		let pic1 = document.getElementById('file_upload1');

		let render = new FileReader();
		let file = [];

		if (pic.files.length > 0) {
			file = pic.files[0];
		}
		if (pic1.files.length > 0) {
			file = pic1.files[0];
		}

		dp('updateState', { animating: !animating });

		var Orientation = null;

		if (file) {
			var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式  
			if (!rFilter.test(file.type)) {
				//showMyTips("请选择jpeg、png格式的图片", false);  
				return;
			}

			//获取照片方向角属性，用户旋转控制  
			EXIF.getData(file, function () {
				EXIF.getAllTags(this);
				Orientation = EXIF.getTag(this, 'Orientation');
			});

			var oReader = new FileReader();

			oReader.readAsDataURL(file);

			oReader.onload = function (e) {
				var image = new Image();
				image.src = e.target.result;
				image.onload = function () {
					var expectWidth = this.naturalWidth;
					var expectHeight = this.naturalHeight;

					if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
						expectWidth = 800;
						expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
					} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
						expectHeight = 1200;
						expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
					}
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
					var base64 = null;
					//修复ios  
					if (navigator.userAgent.match(/iphone/i)) {
						//如果方向角不为1，都需要进行旋转 added by lzk  
						if (Orientation != "" && Orientation != 1) {
							switch (Orientation) {
								case 6://需要顺时针（向左）90度旋转  
									rotateImg(this, 'left', canvas);
									break;
								case 8://需要逆时针（向右）90度旋转  
									rotateImg(this, 'right', canvas);
									break;
								case 3://需要180度旋转  //转两次  
									rotateImg(this, 'right', canvas);
									rotateImg(this, 'right', canvas);
									break;
							}
						}
						base64 = canvas.toDataURL("image/jpeg", 0.1);
					} else if (navigator.userAgent.match(/Android/i)) {// 修复android 

						//						base64 = getBase64Image(image);
						//						var encoder = new JPEGEncoder();  
						//						base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);  

						if (Orientation != "" && Orientation != 1) {
							switch (Orientation) {
								case 6://需要顺时针（向左）90度旋转  
									rotateImg(this, 'left', canvas);
									break;
								case 8://需要逆时针（向右）90度旋转  
									rotateImg(this, 'right', canvas);
									break;
								case 3://需要180度旋转 //转两次 
									rotateImg(this, 'right', canvas);
									rotateImg(this, 'right', canvas);
									break;
							}
						}
						base64 = canvas.toDataURL("image/jpeg", 0.1);
					} else {
						if (Orientation != "" && Orientation != 1) {
							switch (Orientation) {
								case 6://需要顺时针（向左）90度旋转  
									rotateImg(this, 'left', canvas);
									break;
								case 8://需要逆时针（向右）90度旋转  
									rotateImg(this, 'right', canvas);
									break;
								case 3://需要180度旋转 //转两次 
									rotateImg(this, 'right', canvas);
									rotateImg(this, 'right', canvas);
									break;
							}
						}

						base64 = canvas.toDataURL("image/jpeg", 0.1);
					}

					dp('getHeaderUrl', { file: base64 });
				};
			};
		}
	}

	//对图片旋转处理
	function rotateImg(img, direction, canvas) {
		//最小与最大旋转方向，图片旋转4次后回到原方向    
		var min_step = 0;
		var max_step = 3;
		if (img == null) return;
		var height = img.height;
		var width = img.width;
		var step = 2;
		if (step == null) {
			step = min_step;
		}
		if (direction == 'right') {
			step++;
			//旋转到原位置，即超过最大值    
			step > max_step && (step = min_step);
		} else {
			step--;
			step < min_step && (step = max_step);
		}
		//旋转角度以弧度值为参数    
		var degree = step * 90 * Math.PI / 180;
		var ctx = canvas.getContext('2d');
		switch (step) {
			case 0:
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0);
				break;
			case 1:
				canvas.width = height;
				canvas.height = width;
				ctx.rotate(degree);
				ctx.drawImage(img, 0, -height);
				break;
			case 2:
				canvas.width = width;
				canvas.height = height;
				ctx.rotate(degree);
				ctx.drawImage(img, -width, -height);
				break;
			case 3:
				canvas.width = height;
				canvas.height = width;
				ctx.rotate(degree);
				ctx.drawImage(img, -width, 0);
				break;
		}
	}

	return (
		<div className="js_micro_modify_baby_info" style={{ minHeight: initWindowHeight, height: initWindowHeight }} >
			<WhiteSpace />
			<ActivityIndicator
				toast
				text="正在上传"
				animating={animating}
			/>
			<ActivityIndicator
				toast
				text="保存中.."
				animating={saveBaby}
			/>
			<div className={styles.js_modify_user_Image_div} style={{ marginBottom: '30px' }}>
				<div className={styles.js_user_Image_l_div} >
					<div className={styles.js_modify_l_title_div}>学员头像</div>
				</div>
				<div className={styles.js_modify_r_title_div} >
					<input
						id="file_upload"
						className={styles.uploadImage_center_input}
						type="file"
						accept={isiOS ? "image/*;capture=camera" : "image/*"}
						onChange={() => selectFileImage()}>
					</input>
					<div className={styles.js_modify_user_Image}
						style={{ backgroundImage: `url(${headerUrl || 'http://115.29.172.104/gimg/img/bf41b56b65fb5ca1a3673a75fdd83e6a'})` }}
					>
						<input
							id="file_upload1"
							className={styles.uploadImage}
							type="file"
							accept={isiOS ? "image/*;capture=camera" : "image/*"}
							onChange={() => selectFileImage()}>
						</input>
					</div>
				</div>
			</div>
			<div>
				<div className={styles.js_modify_div}>
					<WingBlank>
						<div className={styles.js_general_base_div} >
							<div className={styles.js_modify_left_title_div}>学员姓名</div>
							<div className={styles.js_modify_right_title_div} style={{ width: 'calc(100% - 160px)' }}>
								<InputItem
									{...getFieldProps('baby_name', {
										initialValue: babyInfo.name || '',
									})}
									disabled={isModify}
									clear
									placeholder="请填写学员姓名"
								></InputItem>
							</div>
						</div>
					</WingBlank>
				</div>
				<div className={styles.js_modify_div}>
					<WingBlank>
						<div className={styles.js_general_base_div} >
							<div className={styles.js_modify_left_title_div}>学员生日</div>
							<div className={styles.js_modify_right_title_div} style={{ width: 'calc(100% - 160px)' }}>
								<DatePicker
									disabled={isModify}
									mode="date"
									{...getFieldProps('baby_birthday', {
										initialValue: modify == '1' ? moment(time, 'YYYY-MM-DD').utcOffset(8) : gmtNow,
									})}
									minDate={moment('1980-01-01', 'YYYY-MM-DD').utcOffset(8)}
									maxDate={moment((new Date()).toISOString().slice(0, 10), 'YYYY-MM-DD').utcOffset(8)}
								>
									<List.Item arrow="down"></List.Item>
								</DatePicker>
							</div>
						</div>
					</WingBlank>
				</div>
				<div className={styles.js_modify_div}>
					<WingBlank>
						<div className={styles.js_general_base_div} >
							<div className={styles.js_modify_left_title_div}>学员性别</div>
							<div className={styles.js_modify_right_sex_div} style={{ width: 'calc(100% - 160px)' }}>
								<Radio
									disabled={isModify}
									className="my-radio"
									onChange={() => selectSexManFunction()}
									checked={currentSexMan}> 男</Radio>
								<Radio
									disabled={isModify}
									className="my-radio"
									onChange={() => selectSexFemaleFunction()}
									checked={currentSexFemale}> 女</Radio>
							</div>
						</div>
					</WingBlank>
				</div>
				<div className={styles.js_modify_div}>
					<WingBlank>
						<div className={styles.js_general_base_div} >
							<div className={styles.js_modify_left_title_div}>联系方式</div>
							<div className={styles.js_modify_right_title_div} style={{ width: 'calc(100% - 160px)' }}>
								<InputItem
									{...getFieldProps('baby_phone', {
										initialValue: babyInfo.mobile || '',
									})}
									disabled={isModify}
									type="phone"
									placeholder="请输入联系方式">
								</InputItem>
							</div>

						</div>
					</WingBlank>
				</div>
				<div className={styles.js_modify_div}>
					<WingBlank>
						<div className={styles.js_general_base_div_lase} >
							<div className={styles.js_modify_left_title_div}>家长关系</div>
							<div className={styles.js_modify_right_title_div} style={{ width: 'calc(100% - 160px)' }}>
								<Picker data={relationshipData}
									disabled={isModify}
									cols={1}
									className="forss"
									{...getFieldProps('baby_relationship', {
										initialValue: modify == '1' ? [
											babyInfo.relation,
											babyInfo.relation == 'father' ? '爸爸'
												: babyInfo.relation == 'mother' ? '妈妈'
													: babyInfo.relation == 'grandfather' ? '爷爷'
														: babyInfo.relation == 'grandmother' ? '奶奶'
															: babyInfo.relation == 'motherfather' ? '外公'
																: babyInfo.relation == 'mothermother' ? '外婆'
																	: ''
										] : '',
									})}
								>
									<List.Item arrow="down"></List.Item>
								</Picker>
							</div>
						</div>
					</WingBlank>
				</div>
			</div>

			{isModify &&
				<div className={styles.vip_baby_tips}>
					该学员已是会员身份，仅可更换学员头像，若需修改其他学员信息，请联系机构相关人员进行修改
				</div>
			}
			{
				modify && !isModify
					?
					<div className={styles.js_modify_bottom_button} style={{ top: initWindowHeight - 108 + 'px' }}>
						<div style={{ marginRight: '10px' }} className={styles.modify_delect} onClick={() => delectBabyInfo()}>删除</div>
						{/* <div className={styles.modify_save} onClick={() => saveBabyInfo()}>保存</div> */}
					</div>
					: null
			}
			{
				!isModify ? <div className={styles.create_save} style={{ top: initWindowHeight - 108 + 'px' }} onClick={() => saveBabyInfo()}>保存</div> : null
			}
		</div>
	);
}

export default createForm()(MicroBabyComponent);
