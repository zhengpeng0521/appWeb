import React, {PropTypes} from 'react';
import styles from './MicroTeachersDay.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function MicroTeachersDayComponent({
	
	dp,
	data,
	
	form : {
		getFieldProps,
		getFieldsValue,
	}
	
}) {

	
	let submitProps = {
		dot_title : '微活动2017开学季模板二',
		submitFun : function(props){ dp('submit', props)},
		showNote : false,
		inputStyles1 : {
			height: '0.8rem',
			width: '77%',
			margin: 'auto',
			marginTop: '30px',
			borderRadius: '0.1rem',
			backgroundColor: 'white',
		},
		submitStyles : {
			height: '0.8rem',
			width: '77%',
			margin: 'auto',
			marginTop: '30px',
			backgroundColor: 'rgb(249,216,155)',
			textAlign: 'center',
			borderRadius: '0.1rem',
			lineHeight: '0.8rem',
			fontSize: '0.4rem',
			color: '#1a1a1a',
		},
	}
	
	let layoutTwoTextArr = data.twoContent&&data.twoContent.length > 0  ? data.twoContent.split('\n') : [];
	let layoutThreeTextArr = data.threeContent&&data.threeContent.length > 0  ? data.threeContent.split('\n') : [];

	return(
			<div className="teachers_day">
				<div className={styles.layoutBlackboard}>
					<div className={styles.layoutArtWords}></div>
					<div className={styles.layoutPieceChalk}></div>
					<div className={styles.layoutTitleText}>{data.oneTitle || ''}</div>
				</div>
				<div className={styles.layoutSubTitleText}>{data.oneSubTitle || ''}</div>
				{
					data.intro&&data.intro.map((item, index) => {
						return 	<div key={index} className={styles.layoutSubtime}>{item.label}{item.value}</div>
					})
				}
				<div className={styles.layoutTeacherImage}></div>
				<div className={styles.layoutStudentImage}></div>
				<div className={styles.layoutFloorImage}></div>
				{/*第二页布局*/}
				<div className={styles.layoutTwoBlackboard}>
					<div className={styles.layoutTwoTopleftImage}></div>
					<div className={styles.layoutTwoTitleText}>{data.twoTitle || ''}</div>
					<div className={styles.layoutTwoTitleline}></div>
					<div className={styles.layoutTwoSubTitleText}>{data.twosubTitle || ''}</div>
					<div className={styles.layoutTwoContentText}>
						{
							layoutTwoTextArr&&layoutTwoTextArr.map((item, index) => {
								return <p key={index} className={styles.layoutTwoContentTextItem}>{item}</p>
							})
						}
					</div>
				</div>
				<div className={styles.layoutTwoAlarmClockImage}></div>
				<div className={styles.layoutTwoPersonImage}></div>
				{/*第三页布局*/}
				<div className={styles.layoutThreeBlackboard}>
					<div className={styles.layoutThreeYuanguiImage}></div>
					<div className={styles.layoutThreeTitleText}>{data.threeTitle || ''}</div>
					<div className={styles.layoutThreeTitleline}></div>
					<div className={styles.layoutTwoContentText}>
						{
							layoutThreeTextArr&&layoutThreeTextArr.map((item, index) => {
								return <p key={index} className={styles.layoutTwoContentTextItem}>{item}</p>
							})
						}
					</div>
				</div>
				<div className={styles.layoutThreePersonImage}></div>
				{/*第四页*/}
				<div className={styles.layoutFourBlackboard}>
					<div className={styles.layoutFourTitleText}>{data.forTitle || ''}</div>
					<div className={styles.layoutFourTitleline}></div>
					<div className={styles.layoutFourInoutBox}>
						<SubmitComponent {...submitProps} />
					</div>
				</div>
				<div className={styles.layoutFourPersonImage}></div>
				<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
			</div>
    );
}

export default createForm()(MicroTeachersDayComponent);
