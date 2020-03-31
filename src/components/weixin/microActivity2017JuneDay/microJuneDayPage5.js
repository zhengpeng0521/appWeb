import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microJuneDayPage.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroJuneDayComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let submitProps = {
		dot_title : '微活动2017六一预约',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			height: '1rem',
			width: '90%',
			marginTop: '20px',
			borderRadius: '15px',
			border: '6px #654ad9 solid',
			marginTop: '20px',
			background: 'rgba(255, 255, 255, 0.8)',
		},
		submitStyles : {
			height: '1rem',
			width: '90%',
			margin: 'auto',
			marginTop: '20px',
			borderRadius: '15px',
			background: '#f2d12d',
			border: '6px #f2d12d solid',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			color: 'white',
		},
	}

	return(
		<div className="june">
			<div className={styles.bg5_background} style={{minHeight : initWindowHeight}}>
				<div className={styles.bg_title}>{data.title}</div>
				<SubmitComponent {...submitProps} />
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroJuneDayComponent);
