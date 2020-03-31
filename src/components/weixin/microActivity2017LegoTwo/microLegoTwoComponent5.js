import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List, Toast} from 'antd-mobile';
import styles from './microLegoTwoComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroLegoTwoComponent({

	dp, index, nIndex, data, initWindowHeight,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let pro = {
		width: '60%',
		height: '1rem',
		margin: 'auto',
		marginTop: '5px',
		backgroundImage: 'url(http://img.ishanshan.com/gimg/img/41168462bef754e0ebd770c54051e6ee)',
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	}

	let submitProps = {
		dot_title : '微活动2017乐高第二版',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			...pro,
		},
		submitStyles : {
			width: '60%',
			color: 'white',
			margin: 'auto',
			height: '1rem',
			marginTop: '5px',
			textAlign: 'center',
			lineHeight: '1rem',
			fontSize: '0.4rem',
			backgroundImage : 'url(http://img.ishanshan.com/gimg/ori/14fb3ecceb901944b792210d35eafea6)',
			backgroundSize: '100% 100%',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			color: '#1a1a1a',
		},
	}
		
	return(
		<div className="lego_one">
			<div className={styles.page5_background} style={{minHeight : initWindowHeight}}>
				<div className={styles.pageSixTitleText}>{data.title || ''}</div>
				<div className={styles.pageSixTopImage}></div>
				<div className={styles.pageSixinputBox}>
					<SubmitComponent {...submitProps} />
				</div>
				<div className={styles.pageSixBottomRightGifImage} style={{top : initWindowHeight * 0.57}}></div>
				<div className={styles.pageSixBottomLeftImage} style={{top : initWindowHeight * 0.75}}></div>
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white', top : initWindowHeight}}>闪宝科技提供技术支持</p></a>
		</div>
    );
}

export default createForm()(MicroLegoTwoComponent);

