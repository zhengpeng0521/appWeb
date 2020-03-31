import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroSchoolWouldBeStartingPage.less';

function MicroSchoolWouldBeStartingComponent({

	index, nIndex, data,

}) {
		
	let textArr = data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="base_school_would_be_starting">
			<div className={styles.background_page5_image}>
				<div className={styles.pageFiveBoxTitle}>{data.title || ''}</div>
				<div className={styles.pageFiveBoxContent}>
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.pageFiveBoxContentItem}>{item}</p>
						})
					}
				</div>
				<div className={styles.pageFiveBoxPersonImage}></div>
				{index == nIndex ? <div className={styles.pageFiveBoxPersonLegImage}></div> : ''}
				{index == nIndex ? <div className={styles.pageFiveBoxPersonBallImage}></div>  : ''}
			</div>
		</div>
    );
}

export default MicroSchoolWouldBeStartingComponent;
