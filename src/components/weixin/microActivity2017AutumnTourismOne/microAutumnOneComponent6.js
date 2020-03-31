import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microAutumnOneComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroAutumnOneComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let pro = {
		width: '100%',
		height: '1rem',
		margin: 'auto',
		marginTop: '30px',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
	}

	let submitProps = {
		dot_title : '微活动2017秋游第一版',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			...pro,
		},
		submitStyles : {
			width: '100%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '30px',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			background: 'rgb(121,81,42)',
			color: 'white',
		},
	}
		
	return(
		<div className="autumn_one">
			<div className={styles.page6_background} style={{minHeight : initWindowHeight}}>
				<div className={styles.commonBox}>
					{index == nIndex ? <div className={styles.commonTitle}>{data.title || ''}</div> : ''}
					<SubmitComponent {...submitProps} />
				</div>
				<div className={styles.pageSixBottomLeftImage} style={{top : initWindowHeight * 0.75}}></div>
				<div className={styles.pageSixBottomRightImage} ></div>
				<div className={styles.commonClouds1Image}></div>
				<div className={styles.commonClouds2Image}></div>
				<div className={styles.commonClouds3Image}></div>
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : '#7b7676', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroAutumnOneComponent);

