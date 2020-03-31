import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microCallPhoneComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroCallPhoneComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let pro = {
		width: '70%',
		height: '1rem',
		margin: 'auto',
		marginTop: '30px',
		borderRadius: '15px',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		border: '3px #f75f00 solid',
		borderRadius: '1rem',
    	overflow: 'hidden',
	}

	let submitProps = {
		dot_title : '微活动2017秋招第三版',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			...pro,
		},
		inputStyles2 : {
			...pro,
		},
		inputStyles3 : {
			...pro,
		},
		submitStyles : {
			width: '70%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '30px',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			borderRadius: '1rem',
			background: '#f75f00',
			color: 'white',
		},
	}
		
	return(
		<div className="three_phone">
			<div className={styles.page8_background} style={{minHeight : initWindowHeight}}>
				<div>
					<div className={styles.page8_title}>{data.title || ''}</div>
					<SubmitComponent {...submitProps} />
				</div>
			</div>
			<div className={styles.pagr8_person_image} style={{top : initWindowHeight * 0.65}}></div>
			<div className={styles.page8_num_image}></div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroCallPhoneComponent);

