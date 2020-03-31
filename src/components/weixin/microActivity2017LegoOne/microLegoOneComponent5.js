import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microLegoOneComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroLegoOneComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let pro = {
		width: '77%',
		height: '1rem',
		margin: 'auto',
		marginTop: '30px',
		border: '10px #ef8d0d solid',
		opacity : 0,
		animationDuration : '1s',
	}

	let submitProps = {
		dot_title : '微活动2017乐高第一版',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			...pro,
			animationDelay : '0.5s',
		},
		inputStyles2 : {
			...pro,
			animationDelay : '0.7s',
		},
		inputStyles3 : {
			...pro,
			animationDelay : '0.9s',
		},
		submitStyles : {
			width: '77%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '30px',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
    		border: '10px black solid',
			backgroundImage : 'url(http://img.ishanshan.com/gimg/img/d55d68f6681fa5281820307ce855ebb6)',
			color: '#fdcf45',
			opacity : 0,
			animationDelay : '1.1s',
			animationDuration : '1s',
			backgroundSize : '100% 100%',
		},
	}
		
	return(
		<div className="lego_one">
			<div className={styles.page5_background} style={{minHeight : initWindowHeight}}>
				<div className={styles.pageSixTitleText}>{data.title || ''}</div>
				<div className={styles.pageSixinputBox}>
					{index == nIndex ? <SubmitComponent {...submitProps} /> : ''}
				</div>
				<div className={styles.pageSixBottomRightImage}></div>
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroLegoOneComponent);

