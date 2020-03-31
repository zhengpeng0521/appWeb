import React, {PropTypes} from 'react';
import styles from './microCallPhoneComponent.less';

//import FlowIntoPage from '../../../pages/weixin/commomPages/flowIntoPage/flowIntoPage.js';
//			<FlowIntoPage />

function MicroCallPhoneComponent({

	index, nIndex, data, swiperSlideClassName, dp, nextFunction,

}) {

	function next(type) {
		dp('updateState', {swiperSlideClassName : 'swiper-slide'})
		nextFunction();
	}		
	
	let header_url = `url(${data.imgUrl})`;
	
	return(
		<div className="call_phone">
			<div className={styles.page1_background}>
				<div className={styles.page1_header} style={{backgroundImage : header_url}}></div>
				<div className={styles.page1_org_name}>{data.title || ''}</div>
				<div className={styles.page1_img_1}></div>
				<div className={styles.page1_img_2}></div>
				<div className={styles.page1_agreed} onClick={() => next()}></div>
				<div className={styles.page1_agreed_left_arc_line}></div>
				<div className={styles.page1_agreed_left_arc_line_second}></div>
				<div className={styles.page1_agreed_right_arc_line}></div>
				<div className={styles.page1_agreed_right_arc_line_second}></div>
			</div>
		</div>
    ); 
}


export default MicroCallPhoneComponent;
