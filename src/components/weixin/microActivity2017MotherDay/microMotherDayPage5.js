import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microMotherDayPage.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroMotherDayComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let sunmitProps = {
		dot_title : '微活动2017母亲节预约',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			height	: '1rem',
			width: '90%',
			borderRadius: '15px',
			border: '6px #eeacd1 solid',
			margin: 'auto',
			marginTop: '20px',
		},
		submitStyles : {
			height: '1rem',
			width: '90%',
			margin: 'auto',
			marginTop: '20px',
			borderRadius: '15px',
			background: '#ef3374',
			border: '6px #ef3374 solid',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			color: 'white',
		},
	}

	return(
		<div className="mather">
			<div className={styles.bg5_background} style={{minHeight : initWindowHeight}}>
				<div className={styles.bg_title}>{data.title}</div>
				<SubmitComponent {...sunmitProps} />
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroMotherDayComponent);
