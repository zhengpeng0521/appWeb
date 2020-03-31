import React, {PropTypes} from 'react';
import styles from './englishPage.less';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function EnglishActivity({

	dp, data, newIndex, index, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	
	let submitProps = {
		dot_title : '微传单2017英语模板预约',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			height: '1rem',
			width: '80%',
			margin: 'auto',
			marginTop: '30px',
			background: 'rgba(0, 0, 0, 0.2)',
			borderRadius: '0.5rem',
		},
		submitStyles : {
			height: '1rem',
			width: '80%',
			margin: 'auto',
			marginTop: '50px',
			borderRadius: '0.5rem',
			background: '#f2d12d',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			color: 'white',
		},
	}

    return(
			<div className="english_2017">
				<div className={styles.bg7_bg} style={{minHeight : initWindowHeight || document.body.clientHeight}}>
					<div className={styles.bg7_title}>{data.title || ''}</div>
					<SubmitComponent {...submitProps} />
				</div>
				<p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p>
			</div>
    );
}

export default createForm()(EnglishActivity);
