import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './MicroActivitySummerSigningPage.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroSummerSigningComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {

	let submitProps = {
		dot_title : '微活动2017暑期招生预约',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			height: '1rem',
			width: '80%',
			borderRadius: '15px',
			border: '5px @border_color solid',
			margin: 'auto',
			marginTop: '40px',
			backgroundColor: 'rgba(255, 255, 255, 0.8)',
		},
		submitStyles : {
			height: '1rem',
			width: '80%',
			margin: 'auto',
			marginTop: '40px',
			borderRadius: '15px',
			background: 'rgb(244, 212, 127)',
			border: '6px rgb(244, 212, 127) solid',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			color: 'white',
		},
	}
	
	let seagulls = (
		<animateMotion dur="6s" repeatCount="indefinite" rotate="auto" >
		   <mpath xlinkHref="#haiou"/>
		</animateMotion>
	)

	return(
		<div className="summer_signing">
			<div className={styles.background_page6_image} style={{minHeight : initWindowHeight}}>
				<svg
					width="100%"
					height={initWindowHeight * 0.48}
		    		xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					style={{position : "absolute"}}
				>
					<path d="m-6,211c350,-93 69,-184 69,-184c0,0 -151,-48 -151,-48"
							stroke="lightgrey"
							strokeWidth="0"
							fill="none"
							id="haiou"/>

							<path fill="#FFFFFF" d="M16.5,11.5c0,0-2.6-6.2-1.4-8.2c1.2-2-4.6-0.7-12.8,0.7c0,0,10.9,0.2,12.3,8.4l-2.4,1.1l3.3,3.5l0.2-3.6c0,0,8.6-1.2,11.1,9.1c0,0,1.1-6.6-3.1-12.8C23.8,9.7,19.3,12.7,16.5,11.5z">
							{seagulls}
							</path>
							<path d="M11.3,2.5c0,0-5.9,1-8.9,1.5c0,0,5.9,0.9,7.2,1.9l-0.8-1l0.7-0.2L9.1,4.2C9.1,4.2,9.2,3.3,11.3,2.5z">
							{seagulls}
							</path>
							<path d="M22.8,15.5c0,0,3.5,3.1,4.1,7c0,0,0.7-3.6-1-8.5l-0.3,1L25,14.2l0.1,0.8L24,14.3l0.1,1.1L22.8,15.5z">
							{seagulls}
							</path>
				</svg>
				<div className={styles.bg6_title}>
					<p className={styles.bg_title_p}>{data.title || ''}</p>
					<p className={styles.bg6_title_content}>{data.subTitle || ''}</p>
				</div>
				<div className={styles.bg_title_left_angle}></div>
				<div className={styles.bg_title_right_angle}></div>
				<SubmitComponent {...submitProps} />
				<a href="http://www.ishanshan.com/">
					<p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p>
				</a>
			</div>
		</div>
    );
}

export default createForm()(MicroSummerSigningComponent);
