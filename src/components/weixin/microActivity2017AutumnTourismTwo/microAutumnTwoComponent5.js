import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microAutumnTwoComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroAutumnTwoComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let pro = {
		width: '80%',
		height: '1rem',
		margin: 'auto',
		marginTop: '30px',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: '50px',
		border: '5px #ef8d0d solid',
	}

	let submitProps = {
		dot_title : '微活动2017秋游第二版',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			...pro,
		},
		submitStyles : {
			width: '80%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '30px',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			backgroundColor: 'rgb(228,185,69)',
			borderRadius: '50px',
    		border: '5px #ef8d0d solid',
			color: 'white',
		},
	}
		
	return(
		<div className="autumn_two">
			<div className={styles.page5_background} style={{minHeight : initWindowHeight}}>
				
				<div className={styles.pageOneTopLeftImage}></div>
				<div className={styles.pageOneTopRightImage}></div>
				<div className={styles.pageSixTitleText}>{data.title || ''}</div>
				<div className={styles.pageSixinputBox}>
					<SubmitComponent {...submitProps} />
				</div>
				<div className={styles.pageSixBottomRightImage}></div>
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroAutumnTwoComponent);

