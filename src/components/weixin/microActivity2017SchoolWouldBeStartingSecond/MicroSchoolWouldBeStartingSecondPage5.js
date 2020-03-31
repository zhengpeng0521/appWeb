import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroSchoolWouldBeStartingSecondPage.less';

function MicroSchoolWouldBeStartingComponent({

	index, nIndex, data,

}) {
		
	let textArr = data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="base_school_would_be_starting_second">
			<div className={styles.background_page5_image}>
				<div className={styles.pageFourBaseImage}></div>
				<div className={styles.commonTitleImage}>
					<div className={styles.pageTwoBookBoxTitle}>{data.title || ''}</div>
				</div>
				<div className={styles.pageTwoContentBoxImage}>
					<div className={styles.pageFiveBoxContent}>
						{
							textArr&&textArr.map((item, index) => {
								return <p key={index} className={styles.pageFiveBoxContentItem}>{item}</p>
							})
						}
					</div>
				</div>
				<div className={styles.pageFiveBoxPersonImage}></div>
				<div className={styles.pageFiveBoxLabaImage}></div>
			</div>
		</div>
    );
}

export default MicroSchoolWouldBeStartingComponent;
