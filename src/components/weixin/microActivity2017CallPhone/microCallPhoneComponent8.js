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
		marginTop: '20px',
		marginTop: '20px',
		borderRadius: '15px',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
	}

	let submitProps = {
		dot_title : '微活动2017秋招第一版',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			...pro,
			border: '10px #f4a600 solid',
		},
		inputStyles2 : {
			...pro,
			border: '10px #f46200 solid',
		},
		inputStyles3 : {
			...pro,
			border: '10px #a52102 solid',
		},
		submitStyles : {
			width: '50%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '60px',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			borderRadius: '15px',
			background: '#d0761b',
			color: 'white',
		},
	}
		
	return(
		<div className="call_phone">
			<div className={styles.page8_background}>
				<div style={{minHeight : initWindowHeight}}>
					<div className={styles.common_top_img}>
						<div className={styles.common_top_title}>{data.title || ''}</div>
					</div>
					<SubmitComponent {...submitProps} />
				</div>
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroCallPhoneComponent);

