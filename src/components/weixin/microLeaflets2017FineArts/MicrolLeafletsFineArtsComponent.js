import React, {PropTypes} from 'react';
import { InputItem, Modal, DatePicker, List, Toast } from 'antd-mobile';
import styles from './MicrolLeafletsFineArtsComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

const gmtNow = moment().utcOffset(0);

function FineArtsComponent({

	dp,
    data,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {

	//提交数据
	function submit() {	
		_hmt.push(['_trackEvent', '微传单2017美术', `点击了预约按钮`, ``, '-']);
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
	let p2Content = data.p2Content&&data.p2Content.length > 0 ? data.p2Content.split('\n') : '';
	let p4Content = data.p4Content&&data.p4Content.length > 0 ? data.p4Content.split('\n') : '';
	let p7Content = data.p7Content&&data.p7Content.length > 0 ? data.p7Content.split('\n') : '';

	function segmentationText(text) {
		let tempArr = [];
		for(let i = 0; i < Object(text).length; i++) {
			tempArr.push(Object(text)[i]);
		}
		return tempArr;
	}
	
	let page2TitleArr = segmentationText(data.p2Title || '');
	let page3TitleArr = segmentationText(data.p3Title || '');
	let page4TitleArr = segmentationText(data.p4Title || '');
	let page5TitleArr = segmentationText(data.p5Title || '');
	let page6TitleArr = segmentationText(data.p6Title || '');
	let page7TitleArr = segmentationText(data.p7Title || '');

	let hudie = (
		<animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
			<mpath xlinkHref="#path1"/>
		</animateMotion>
	)

	let sunmitProps = {
		submitFun : function(props){ dp('submit', props)},
		
		dot_title : '微传单2017美术模板',
		
		inputStyles1 : {
			width: '80%',
			height: '1rem',
			margin: 'auto',
			marginTop: '0.3rem',
			marginBottom: '0.3rem',
			lineHeight: '1rem',
			textAlign: 'center',
			fontSize: '0.35rem',
			background: 'rgb(248, 231, 202)',
			borderRadius: '0.5rem',
		},
		submitStyles : {
			width: '80%',
			height: '1rem',
			margin: 'auto',
			marginTop: '0.5rem',
			marginBottom: '0.3rem',
			lineHeight: '1rem',
			textAlign: 'center',
			fontSize: '0.35rem',
			background: 'rgb(234, 148, 83)',
			borderRadius: '0.5rem',
			color : 'white',
		}
	}
	
	return(
			<div className="fine_arts_div">
				<div className={styles.page1_bg}>
					<div className={styles.page1_caihong}></div>
					<div className={styles.page1_yunduo}></div>
					<div className={styles.page1_gril1}></div>		
					<div className={styles.page1_title_kuang}></div>
					<div className={styles.page1_title}>{data.p1Title || ''}</div>
					<div className={styles.page1_sub_title}>{data.p1SubTitle || ''}</div>
		
					<div className={styles.page1_header_kuang}>
						<img src={data.p1HeadImgUrl || ''} className={styles.page1_header_image}/>
					</div>
					<div className={styles.page1_org_name}>{data.p1OrgName || ''}</div>
					<div className={styles.page1_huaban}></div>
					<div className={styles.page1_huaban_content}></div>
					<div className={styles.page1_gril2}></div>
					<div className={styles.page1_bi}></div>
					<div className={styles.page1_svg_huaban}>
						<svg
							width="100%"
							height="150%"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink" 
						>	
							<path id="path1" d="M1.500,301.500 C1.500,301.500 121.883,178.469 201.500,201.500 C281.117,224.531 281.500,223.500 281.500,223.500 C281.500,223.500 379.273,245.719 427.500,167.500 C475.727,89.281 557.632,81.159 597.500,89.500 C659.898,102.555 695.185,138.181 756.500,161.500 C824.025,187.180 1009.500,1.500 1009.500,1.500" fill="none" stroke="none" strokeWidth="0"  />

							<path fill="#5EC8EF" d="M99.3,99.8c0,0,13.3-15.6,1.8-21c-16.7,4.3-21.3,9.4-22.8,15.7c-2-1.8-10.6,5.7,2.5,10.8
						C95.5,101.9,94.9,103.1,99.3,99.8z">
								{hudie}
							</path>
							<path fill="#5EC8EF" d="M102.2,104.3c0,0,20.6,6.1,15.3,15.8c-7.3,3.7-23.3,1.1-28.7-4.4c-3.9,2.4-11.3,2.7-7.2-8.4
								C88.8,108.1,97,106.9,102.2,104.3z">
								{hudie}
							</path>
							<path fill="#41237A" d="M100.6,100.9c0,0,8.3-3.5,4.9,0c-3.4,3.5-18.9,8.4-23,5.4C83,106.2,100.6,100.9,100.6,100.9z">
								{hudie}
							</path>
							<path fill="none" stroke="#41237A" strokeMiterlimit="10" d="M108,99.9c0,0,12.4-5.5,14.7-14">
								{hudie}
							</path>
							<path fill="none" stroke="#41237A" strokeMiterlimit="10" d="M106.3,102.4c0,0,11.9-0.4,20-11.2">
								{hudie}
							</path>
						</svg>
					</div>
					<div className={styles.page1_flower}></div>
					<div className={styles.general_kongbai}></div>
				</div>
				<div className={styles.page2_bg}>
					<div className={styles.page2_title_base_div}>
						{
							page2TitleArr&&page2TitleArr.map((item, index) => {
								return  <div key={index} className={styles.page2_title_div}>
											{item}
										</div>
							})
						}
					</div>
					<div className={styles.page2_content}>
						{
							p2Content&&p2Content.map((item, index) => {
								return <p key={index} className={styles.text}>{item}</p>
							})
						}
					</div>
					<div className={styles.page2_image1}></div>
					<div className={styles.page2_image2}></div>
				</div>

				<div className={styles.page3_bg}>
					<div className={styles.page3_title_base_div}>
						{
							page3TitleArr&&page3TitleArr.map((item, index) => {
								return  <div key={index} className={styles.page3_title_div}>
											{item}
										</div>
							})
						}
					</div>
					{
						data.p3Content&&data.p3Content.map((item, index) => {
							let sty = (index == 2 || index == 3 || index == 6 || index == 7) ? styles.page3_cover_div2 : styles.page3_cover_div1;
							let url = `url(${item.imgurl})`;							
							if(item.imgurl && item.imgurl.length > 0 && item.imgurl != undefined) {
								return  <div key={index}>
											{index == 4 ? <div className={styles.page3_image}></div> : ''}
											<div className={styles.page3_row}>
												<div className={sty}>
													<div className={styles.page3_cover} key={index} style={{backgroundImage : url}}></div>
												</div>
											</div>
										</div>
							}
						})
					}
				</div>
					
				<div className={styles.page4_bg}>
					<div className={styles.page4_title_base_div}>
						{
							page4TitleArr&&page4TitleArr.map((item, index) => {
								return  <div key={index} className={styles.page4_title_div}>
											{item}
										</div>
							})
						}
					</div>
					
					<div className={styles.page4_content}>
						{
							p4Content&&p4Content.map((item, index) => {
								return <p key={index} className={styles.text}>{item}</p>
							})
						}
					</div>
					<div className={styles.page4_image}></div>
				</div>
						
				<div className={styles.page5_bg}>
					<div className={styles.page5_title_base_div}>
						{
							page5TitleArr&&page5TitleArr.map((item, index) => {
								return  <div key={index} className={styles.page5_title_div}>
											{item}
										</div>
							})
						}
					</div>
					{
						data.p5Content&&data.p5Content.map((item, index) => {
							let url = `url(${item.imgurl})`;
							return <div key={index}>
										<div className={styles.page5_cover_div}>
											<div className={styles.page5_cover} key={index}
												style={{backgroundImage : url}}	
											>
											</div>
										</div>
									</div>
						})
					}
				<div className={styles.page5_image1}></div>
				<div className={styles.page5_image2}></div>
				</div>
				
				<div className={styles.page6_bg}>
					<div className={styles.page6_title_base_div}>
						{
							page6TitleArr&&page6TitleArr.map((item, index) => {
								return  <div key={index} className={styles.page6_title_div}>
											{item}
										</div>
							})
						}
					</div>
					<SubmitComponent {...sunmitProps} />
					<div className={styles.page6_image1}></div>
					<div className={styles.page6_image2}></div>
					<div className={styles.page6_image3}></div>
				</div>
					
					
				<div className={styles.page7_bg}>
					<div className={styles.page7_title_base_div}>
						{
							page7TitleArr&&page7TitleArr.map((item, index) => {
								return  <div key={index} className={styles.page7_title_div}>
											{item}
										</div>
							})
						}
					</div>
					<div className={styles.page7_image1}></div>
					<div className={styles.page7_image2}>
						<img src={data.p7CodeImgUrl} className={styles.qr_code} />
						<div className={styles.page7_remark}>{data.p7Remark || '扫码关注哦'}</div>
					</div>
					<div className={styles.page7_image3}></div>
					<div className={styles.page7_content_text_item_div}>
						{
							p7Content&&p7Content.map((item, index) => {
								return <p key={index} className={styles.page7_content_text_item}>{item}</p>
							})
						}
					</div>
				</div>
				<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
			</div>
    );
}

export default createForm()(FineArtsComponent);