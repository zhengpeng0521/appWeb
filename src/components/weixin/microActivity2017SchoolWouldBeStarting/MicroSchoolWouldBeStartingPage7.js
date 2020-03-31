import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './MicroSchoolWouldBeStartingPage.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroSchoolWouldBeStartingComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {

	let submitProps = {
		dot_title : '微活动2017开学季模板',
		submitFun : function(props){ dp('submit', props)},
		showNote : true,
		inputStyles1 : {
			height: '0.8rem',
			width: '77%',
			margin: 'auto',
			marginTop: '20px',
			borderRadius: '0.1rem',
			backgroundColor: 'white',
		},
		submitStyles : {
			height: '0.8rem',
			width: '77%',
			margin: 'auto',
			marginTop: '20px',
			background: '#ef9224',
			border: '6px #ef9224 solid',
			textAlign: 'center',
			borderRadius: '0.1rem',
			lineHeight: '0.8rem',
			fontSize: '0.4rem',
			color: 'white',
		},
	}

	return(
		<div className="base_school_would_be_starting">
			<div className={styles.background_page7_image} style={{minHeight : initWindowHeight}}>
				<div className={styles.pageSevenBoxTitle}>{data.title || ''}</div>
				<div className={styles.pageSevenBoxLunziLeft} style={{top : initWindowHeight * 0.9}}></div>
				<div className={styles.pageSevenBoxLunziRight} style={{top : initWindowHeight * 0.9}}></div>
				<div className={styles.input_box}>
					<SubmitComponent {...submitProps} />
				</div>
			</div>	
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroSchoolWouldBeStartingComponent);
