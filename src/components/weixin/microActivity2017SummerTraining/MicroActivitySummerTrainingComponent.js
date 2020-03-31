import React, {PropTypes} from 'react';
import { InputItem, Modal, DatePicker, List, Toast } from 'antd-mobile';
import styles from './MicroActivitySummerTrainingComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);

function TechComponent({

	dp,
    data,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {

	let image1 = data.orgImgs&&data.orgImgs.length > 0 ? (data.orgImgs[0].imgurl.length > 0 ? `${data.orgImgs[0].imgurl}!s300` : '') : '';
    let image2 = data.orgImgs&&data.orgImgs.length > 1 ? (data.orgImgs[1].imgurl.length > 0 ? `${data.orgImgs[1].imgurl}!s300` : '') : '';
    let image3 = data.orgImgs&&data.orgImgs.length > 2 ? (data.orgImgs[2].imgurl.length > 0 ? `${data.orgImgs[2].imgurl}!s300` : '') : '';

	let expContentTextArr = data.expContent&&data.expContent.length > 0 ? data.expContent.split('\n') : '';
	let couContentTextArr = data.couContent&&data.couContent.length > 0 ? data.couContent.split('\n') : '';
	let conContentTextArr = data.conContent&&data.conContent.length > 0 ? data.conContent.split('\n') : '';

	//提交数据
	function submit() {	
		_hmt.push(['_trackEvent', '微活动2017暑期培训预约', `点击了预约按钮`, ``, '-']);
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
		}
		dp('submit', {paramter : paramter})
	}

	let textComponent = (
		<div className={styles.text_content_layout}>
		{
			expContentTextArr&&expContentTextArr.map((item, index) => {
				return <p key={index} className={styles.text_p}>{item}</p>
			})
		}
		</div>
	);

	let courseComponent = (
		<div className={styles.text_content_layout}>
		{
			couContentTextArr&&couContentTextArr.map((item, index) => {
				return <p key={index} className={styles.text_p}>{item}</p>
			})
		}
		</div>
	);

	let imageAndTextComponent = (
		<div className={styles.image_text_div}>
			<img className={styles.l_image} src={image1} />
			<div className={styles.r_text}>
				<div className={styles.content}>{data.orgContent1 || ''}</div>
			</div>
			<div className={styles.l_text}>
				<div className={styles.content}>{data.orgContent2 || ''}</div>
			</div>
			<img className={styles.r_image} src={image2} />
			<img className={styles.l_image} src={image3} />
			<div className={styles.r_text}>
				<div className={styles.content}>{data.orgContent3 || ''}</div>
			</div>
		</div>
	);

	let qrCodeComponent = (
		<div className={styles.text_content_layout}>
			<div className={styles.text_content_layout}>
			{
				conContentTextArr&&conContentTextArr.map((item, index) => {
					return <p key={index} className={styles.text_p}>{item}</p>
				})
			}
			</div>
			<img className={styles.qr_code} src={data.codeImgUrl || ''} />
			<p className={styles.qr_code_text}>{data.remark || '长按识别二维码'}</p>
		</div>
	);

	function kuangLink(color) {
		return <svg
					width="100%"
					height='1.5rem'
					viewBox="230 0 300 150"
					preserveAspectRatio="xMidYMid meet"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					style={{position : "relative"}}
				>
					<path d="m39.11776,35.32861c5.61929,10.98711 5.48244,15.59457 4.11184,26.58167c-2.74123,17.72113 -8.47813,60.06527 15.74168,77.78637l31.51507,-1.23112c117.02383,26.82416 408.79509,-0.07462 613.69194,-0.11194c22.92035,-26.93609 23.87244,-47.15684 26.82166,-80.80829c-5.0542,-20.07151 -8.11115,-40.14299 -39.12781,-44.5453l-170.6413,14.88574l-475.94532,-5.31634z" stroke="#000" strokeWidth="3" fill={color || 'none'} id="kuang" />
				</svg>
	}

	let feiji = (
		<animateMotion dur="4s" repeatCount="indefinite" rotate="auto" >
				<mpath xlinkHref="#plane"/>
		</animateMotion>
	)

	let login_url = `url(${data.headImgUrl}!s300)`;

	let sty = {
		transform : 'rotate(30deg)',
	}
	
	return(
			<div className="summer_training_base_div">
				<div className={styles.image_org_logo}>
					<div className={styles.image_org_logo_url} style={{backgroundImage : login_url}}></div>
				</div>
				<div className={styles.image_balloon}></div>
				<div className={styles.flying_bird}></div>
				<div className={styles.image_red_title}></div>
				<div className={styles.title}>{data.orgTitle || ''}</div>
				<div className={styles.image_black_board}></div>
				<div className={styles.image_butterfly}></div>
				<div className={styles.black_board_content}>{data.actiTitle || ''}</div>
				<div className={styles.image_student}></div>
				<div className={styles.image_brand}></div>
				<div className={styles.image_feiji}></div>

			<svg width="100%" height="100%" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{position : "absolute", top: '9rem'}}>

				<path d="m3,184.5c0,0 261,-267 358,-141c97,126 -179,211 -158,109c21,-102 387,-134 387,-134.5"
					stroke="lightgrey"
					strokeWidth="0"
					fill="none" id="plane"
				/>
				<polygon fill="#FFFFFF" points="54.8,5.2 3.4,21.4 21.7,26.3" 
					style={sty}
				>{feiji}</polygon>
				<path fill="#FFDDE3" d="M46.1,7.9c-7.2,5.8-14.7,11.4-25.1,12.8c-3.8,0.3-8,1.8-14.9-0.1l-2.6,0.8l18.3,4.9L54.8,5.2L46.1,7.9z"
					style={sty}
				>{feiji}</path>
				<path fill="#93785F" d="M55.1,5.4L21.9,26.7L2.2,21.4L54.5,4.9L55.1,5.4l-0.3-0.3L55.1,5.4L55.1,5.4z M21.5,25.9L52.1,6.4l-47.5,15L21.5,25.9L21.5,25.9z"
					style={sty}
				>{feiji}</path>
				<polygon fill="#FFFFFF" points="54.8,5.2 27,30.1 46,38"
					style={sty}
				>{feiji}</polygon>
				<path fill="#FFDDE3" d="M53.4,10.3l1.4-5.1L27,30.1L46,38l0.1-0.2c-2.2-2.7-4.9-5.3-7.1-7.4C31.5,23.9,45.9,16.9,53.4,10.3z"
					style={sty}
				>{feiji}</path>
				<path fill="#93785F" d="M55.2,5.3l-8.9,33.2l-20-8.3l28-25.3L55.2,5.3l-0.5-0.1L55.2,5.3L55.2,5.3z M45.6,37.5l8.3-31L27.7,30.1L45.6,37.5L45.6,37.5z"
					style={sty}
				>{feiji}</path>
				<polyline fill="#FFFFFF" points="54.8,5.2 21.7,26.3 28.1,42.9 27,30.1 54.9,5"
					style={sty}
				>{feiji}</polyline>
				<path fill="#FFDDE3" d="M52,6.9c-7.9,7.9-19.3,14.5-25.6,20.1c-2,1.8-2,4.1-2.1,6.1l3.7,9.8L27,30.1L54.6,5.3L52,6.9z"
					style={sty}
				>{feiji}</path>
				<polygon fill="#FFFFFF" points="54.9,5 54.6,5.3 54.8,5.2"
					style={sty}
				>{feiji}</polygon>
				<path fill="#93785F" d="M28.6,43l-0.9,0l-6.5-16.8l33-21.1l0.3-0.3l0.8,0.4l-0.2,0.2l0,0l-0.2,0.1L27.5,30.3L28.6,43L28.6,43zM26.5,30l24-21.7L22.2,26.4l5.1,13.4L26.5,30L26.5,30z"
					style={sty}
				>{feiji}</path>
				<polygon fill="#FFFFFF" points="27,30.1 28,42.7 37.5,34.6"
					style={sty}
				>{feiji}</polygon>
				<path fill="#FFDDE3" d="M29.4,38.3c-1.1-2.4-0.4-5.8,0.7-6.8L27,30.1L28,42.7l9.5-8.2L36.3,34C34.8,35.8,33,37.4,29.4,38.3z"
					style={sty}
				>{feiji}</path>
				<path fill="#93785F" d="M38.2,34.5l-10.6,9.1l-1.1-14.1l0.7,0.3L38.2,34.5L38.2,34.5z M36.8,34.6l-9.2-3.9l0.8,11.1L36.8,34.6L36.8,34.6z"
					style={sty}
				>{feiji}</path>
			</svg>
				<KuangComponent
					t_color='rgb(83,162,145)'
					imageurl_top="url(http://115.29.172.104/gimg/ori/f38733d98dea3a82813b1f56b67cee0b)"
					imageurl_center="url(http://115.29.172.104/gimg/ori/47a0b4f9c013d2a65307ade02373505a)"
					imageurl_buttom="url(http://115.29.172.104/gimg/ori/0bff6ed1814407dbdff4f8b662e6a3d2)"
					type="top"
					title={data.expTitle || ''}
					subComponent={textComponent}
				/>
				<KuangComponent
					t_color='rgb(138,95,150)'
					imageurl_top="url(http://115.29.172.104/gimg/ori/16a3f6cca5a67268506332147beba628)"
					imageurl_center="url(http://115.29.172.104/gimg/ori/98464149983181cf5e2f3b57cfe6ab59)"
					imageurl_buttom="url(http://115.29.172.104/gimg/ori/8560292a915414cb608128bc31217b71)"
					type="top"
					title={data.orgIntro || ''}
					subComponent={imageAndTextComponent}
				/>
				<KuangComponent
					t_color='rgb(99,145,192)'
					imageurl_top="url(http://115.29.172.104/gimg/ori/9964a114f858d98b5ca597f264258ada)"
					imageurl_center="url(http://115.29.172.104/gimg/ori/f473f16f37c6b62fd5f7047d974fe21a)"
					imageurl_buttom="url(http://115.29.172.104/gimg/ori/5dc28805a80e81ab476532b0eb25677f)"
					type="top"
					title={data.couTitle || ''}
					subComponent={courseComponent}
				/>
				<KuangComponent
					t_color='rgb(221,160,65)'
					imageurl_top="url(http://115.29.172.104/gimg/ori/669d64f93983c2e34bd1a164c9cdfcfb)"
					imageurl_center="url(http://115.29.172.104/gimg/ori/ded5c733b547f1b48a95196d4431b125)"
					imageurl_buttom="url(http://115.29.172.104/gimg/ori/589c85d4436652253c9bcfd0d586d53b)"
					type="top"
					title={data.conTitle || ''}
					subComponent={qrCodeComponent}
				/>
				<KuangComponent
					title={data.apply || ''}
					t_color='rgb(233,109,120)'
				/>
				<div className={styles.clearance}></div>
				{kuangLink()}
				<div className={styles.input}>
					<InputItem
						{...getFieldProps('baby_name')}
						placeholder="请输入学员姓名"
					/>
				</div>
				{kuangLink()}
				<div className={styles.input}>
					<InputItem
						{...getFieldProps('baby_phone')}
						type="phone"
						placeholder="请输入手机号码"
					/>
				</div>
				{kuangLink()}
				<div className={styles.input}>
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
				{kuangLink('rgb(234,109,120)')}
				<div className={styles.input}>
					<p className={styles.submit} onClick={submit}>提 交</p>
				</div>
				<div className={styles.clearance}></div>
				<div className={styles.clearance}></div>
				<a href="http://www.ishanshan.com/"><p className={styles.technicalSupport}>闪宝科技提供技术支持</p></a>
			</div>
    );
}

function KuangComponent({

	title, t_color, imageurl_top, imageurl_center, imageurl_buttom, type, subComponent

}) {

	type = type === 'top' ? type : 'bottom';

	return(
		<div>
			<div className={styles.general_kuang}></div>
			<div className={styles.general_bird_l}></div>
			<div className={styles.general_bird_r}></div>
			<div className={styles.general_kuang_title} style={{color : t_color}}>{title}</div>
			{
				type === 'top'
				?
				<div>
					<div className={styles.general_top_kuang} style={{backgroundImage : imageurl_top}}></div>
					<div className={styles.general_center_kuang} style={{backgroundImage : imageurl_center}}>
						{subComponent}
					</div>
					<div className={styles.general_bottom_kuang} style={{backgroundImage : imageurl_buttom}}></div>
				</div>
				:
				<div></div>
			}
		</div>
	)
}


export default createForm()(TechComponent);
