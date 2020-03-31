import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microCallPhoneSecondComponent.less';
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
		marginTop: '0.4rem',
		borderRadius: '5px',
	}

	let submitProps = {
		dot_title : '微活动2017来电第二版',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			...pro,
		},
		submitStyles : {
			width: '70%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '0.4rem',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			backgroundColor: 'rgb(100, 57, 36)',
			color: 'white',
		},
	}
	
	return(
		<div className="autumn_recruit_second">
			<div className={styles.page8_background}>
				<div style={{minHeight : initWindowHeight}}>
					<div className={styles.page7_top_image}></div>
					<div className={styles.page7_top_r_image}></div>
					<div className={styles.page7_title}>{data.title || ''}</div>
					<SubmitComponent {...submitProps} />
				</div>
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroCallPhoneComponent);

