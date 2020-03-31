import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroSchoolWouldBeStartingPage.less';

function MicroSchoolWouldBeStartingComponent({

	index, nIndex, data,

}) {
	
	let textArr = data.content.length > 0 ? data.content.split('\n') : '';
	
	return(
		<div className="base_school_would_be_starting">
			<div className={styles.background_page3_image}>
				<div className={styles.pageThreeBookBoxTitle}>{data.title || ''}</div>
				<div className={styles.pageThreeBoxContent}>
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.pageThreeBoxContentItem}>{item}</p>
						})
					}
				</div>
				<div className={styles.pageThreePersonImage}></div>
				<div className={styles.pageThreePencilImage}></div>
				<div className={styles.pageThreepaintingImage}></div>
			</div>
		</div>
    );
}

export default MicroSchoolWouldBeStartingComponent;
