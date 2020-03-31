import React, {PropTypes} from 'react';
import styles from './MicroSchoolWouldBeStartingSecondPage.less';

function MicroSchoolWouldBeStartingComponent({

	index, nIndex, data,

}) {
	
	let textArr = data.content.length > 0 ? data.content.split('\n') : '';
	
	return(
		<div className="base_school_would_be_starting_second">
			<div className={styles.background_page2_image}>
				<div className={styles.commonTitleImage}>
					<div className={styles.pageTwoBookBoxTitle}>{data.title || ''}</div>
				</div>		
				<div className={styles.pageTwoPerson}></div>
				<div className={styles.pageTwoContentBoxImage}>
					<div className={styles.pageTwoBoxContent}>
						{
							textArr&&textArr.map((item, index) => {
								return <p key={index} className={styles.pageTwoBoxContentItem}>{item}</p>
							})
						}
					</div>
				</div>
				<div className={styles.pageTwoWavesImage}></div>
				<div className={styles.pageTwoPencliImage}></div>
			</div>
		</div>
    );
}

export default MicroSchoolWouldBeStartingComponent;

