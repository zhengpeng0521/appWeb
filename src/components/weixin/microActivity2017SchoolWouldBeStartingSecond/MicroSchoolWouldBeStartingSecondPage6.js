import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroSchoolWouldBeStartingSecondPage.less';

function MicroSchoolWouldBeStartingComponent({

	index, nIndex, data,

}) {
		
	let textArr = data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="base_school_would_be_starting_second">
			<div className={styles.background_page6_image}>
				<div className={styles.commonTitleImage}>
					<div className={styles.pageTwoBookBoxTitle}>{data.title || ''}</div>
				</div>		
				<div className={styles.pageTwoContentBoxImage}>
					<div className={styles.pageSixeBoxContent}>
						{
							textArr&&textArr.map((item, index) => {
								return <div key={index} className={styles.pageSixBoxContentItem}>{item}</div>
							})
						}
					</div>
				</div>
				<div className={styles.PageSixGrassImage}></div>
				<div className={styles.PageSixGirlImage}></div>
				<div className={styles.PageSixboyImage}></div>
				<div className={styles.pageThreePlaneImage}></div>
			</div>
		</div>
    );
}

export default MicroSchoolWouldBeStartingComponent;
