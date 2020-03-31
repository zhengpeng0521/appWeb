import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './MicroLeafletsDancePage.less';
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
		dot_title : '微传单2017舞蹈模板预约',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			height: '1rem',
			width: '80%',
			margin: 'auto',
			marginTop: '20px',
			backgroundColor: 'white',
		},
		submitStyles : {
			height: '1rem',
			width: '80%',
			margin: 'auto',
			marginTop: '20px',
			background: '#fcb435',
			border: '6px #fcb435 solid',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			color: 'white',
		},
	}
	
	return(
		<div className="base_dance">
			<div className={styles.background_page6_image} style={{minHeight : initWindowHeight}}>
				<div className={styles.page6_title}>{data.title || ''}</div>
				<div className={styles.page6_sub_title}>{data.subTitle || ''}</div>
				<div className={styles.page2_baby_img} style={{top : initWindowHeight * 0.70}}></div>
			</div>	
			<div className={styles.input_box}>
				<SubmitComponent {...submitProps} />
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroSummerSigningComponent);
