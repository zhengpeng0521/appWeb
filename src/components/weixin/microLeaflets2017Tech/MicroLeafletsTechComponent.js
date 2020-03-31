import React, {PropTypes} from 'react';
import { InputItem, Modal, DatePicker, List, Toast } from 'antd-mobile';
import styles from './MicroLeafletsTechComponent.less';
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

	let head_img = `url(${data.headImgUrl || ''})`;
	let orgInfoArr = data.orgIntro.length > 0 ? data.orgIntro.split('\n') : '';
	let orgContentArr = data.orgContent.length > 0 ? data.orgContent.split('\n') : '';
	let coutentArr = data.couContent.length > 0 ? data.couContent.split('\n') : '';
	let contentArr = data.conContent.length > 0 ? data.conContent.split('\n') : '';
	let expContentArr = data.expContent.length > 0 ? data.expContent.split('\n') : '';

	return(
			<div className="tech_base_div">
				<div className={styles.bg}>
					<div className={styles.xq1}></div>
					<div className={styles.xq2}></div>
					<div className={styles.xq3}></div>
					<div className={styles.xq4}></div>
					<div className={styles.star}></div>
					<div className={styles.star_stop}></div>
					<div className={styles.spacecraft}></div>
					<div className={styles.spacecraft_fire}></div>

					<div className={styles.background_title}>{data.orgTitle || ''}</div>

					<div className={styles.background_kuang1_image}>
						<div className={styles.line_flashing4}></div>
						<div className={styles.background_sub_title}>{data.actiTitle || ''}</div>
					</div>
					<div className={styles.background_header} style={{backgroundImage:head_img}}></div>
					<div className={styles.background_kuang3_image}></div>
					<div className={styles.background_planet_image}></div>
					<div className={styles.background_planet_kuang1_image}>
						<div className={styles.line_flashing1}></div>
						<div className={styles.planet_kuang_title}>{data.expTitle || ''}</div>
					</div>
					<div className={styles.background_planet_kuang2_image}>
					<div className={styles.star}></div>
					{
						expContentArr&&expContentArr.length > 0 ? expContentArr.map((item, index) => {
							return  <div className={styles.background_planet_kuang2_image_p} key={index}>
										{item}
									</div>
						}) : ''
					}
					</div>
					<div className={styles.background_planet_kuang3_image}></div>

					<div className={styles.background_introduction_kuang1_image}>
						<div className={styles.line_flashing}></div>
						<div className={styles.planet_kuang_title}>{data.orgIntro || ''}</div>
					</div>
					<div className={styles.background_introduction_kuang2_image}>
						<div className={styles.star_2}></div>
						<div className={styles.introduction_kuang_sub_title}>
							{
								orgContentArr&&orgContentArr.length > 0 ? orgContentArr.map((item, index) => {
									return  <div key={index}>
												<p className={styles.contact_value}>{item}</p>
											</div>
								}) : ''
							}
						</div>
							{
								data.orgImgs&&data.orgImgs.length>0 ? data.orgImgs.map((item, index) => {
									let url = item.imgurl.length > 0 ? `${item.imgurl}!s300` : '';
									if(url.length > 0) {
										return <img key={index} className={styles.introduction_image} src={url} />
									}
								})
								: ''
							}
					</div>
					<div className={styles.background_introduction_kuang2_image}></div>
					<div className={styles.background_introduction_kuang3_image}></div>

					<div className={styles.background_introduction_kuang1_image}>
						<div className={styles.line_flashing}></div>
						<div className={styles.star_2}></div>
						<div className={styles.planet_kuang_title}>{data.couTitle}</div>
					</div>
					<div className={styles.background_introduction_kuang2_image}>
						<div className={styles.content_div}>
							{
								coutentArr&&coutentArr.length > 0 ? coutentArr.map((item, index) => {
									return  <div className={styles.content_p} key={index}>
												{item}
											</div>
								}) : ''
							}
						</div>
					</div>
					<div className={styles.background_introduction_kuang3_image}></div>

					<div className={styles.background_contact_kuang1_image}>
						<div className={styles.star}></div>
						<div className={styles.line_flashing}></div>
						<div className={styles.planet_kuang_title}>{data.conTitle || ''}</div>
					</div>
					<div className={styles.background_contact_kuang2_image}>
						<div className={styles.contact_div}>
							{
								contentArr&&contentArr.length > 0 ? contentArr.map((item, index) => {
									return  <div className={styles.contact_p} key={index}>
												<p className={styles.contact_value}>{item}</p>
											</div>
								}) : ''
							}
						</div>
						<img className={styles.qr_code} src={data.codeImgUrl} alt="二维码加载失败" />
						<div className={styles.robot}></div>
						<div className={styles.qr_text}>{data.remark || ''}</div>
					</div>
					<div className={styles.background_contact_kuang3_image}>
					</div>
					<div className={styles.star}></div>
					<div className={styles.star_2}></div>
				</div>
				<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
			</div>
    );
}

export default createForm()(TechComponent);
