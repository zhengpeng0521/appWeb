import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microFatherDayPage.less';
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

	let submitProps = {
		dot_title : '微活动2017父亲节预约',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			width: '90%',
			height: '1rem',
			margin: 'auto',
			marginTop: '20px',
			marginTop: '20px',
			borderRadius: '15px',
			border: '6px @pc solid',
			backgroundColor: 'rgba(255, 255, 255, 0.8)',
		},
		submitStyles : {
			width: '90%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '20px',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			borderRadius: '15px',
			background: 'rgb(240, 196, 94)',
			border: '6px rgb(240, 196, 94) solid',
			color: 'white',
		},
	}
	
	return(
		<div className="father">
			<div className={styles.father_lase_page_background} style={{minHeight : initWindowHeight}}>
				<div className={styles.bg_title_image}><div className={styles.bg_title}>{data.title}</div></div>				
				<SubmitComponent {...submitProps} />
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroMotherDayComponent);
