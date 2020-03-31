import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroSchoolWouldBeStartingPage.less';

function MicroSchoolWouldBeStartingComponent({

	index, nIndex, data,

}) {
		
	let textArr = data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="base_school_would_be_starting">
			<div className={styles.background_page6_image}>
				<div className={styles.pageSixeBoxPersonImage}></div>
				<div className={styles.pageSixeBoxPersonhandImage}></div>
				<div className={styles.pageSixeBoxEarthJiaziImage}></div>
				<div className={styles.pageSixeBoxEarthImage}></div>
				<div className={styles.pageSixBoxTitle}>{data.title || ''}</div>
				<div className={styles.pageSixeBoxContent}>
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.pageSixBoxContentItem}>{item}</p>
						})
					}
				</div>
			</div>
		</div>
    );
}

export default MicroSchoolWouldBeStartingComponent;
