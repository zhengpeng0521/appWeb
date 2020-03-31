import React, {PropTypes} from 'react';
import styles from './microAutumnOneComponent.less';

function MicroAutumnOneComponent({

	index, nIndex, data

}) {
	
	let cover1  = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';
	let cover2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl})` : '';
		
	return(
		<div className="autumn_one">
			<div className={styles.page4_background}>
				<div className={styles.commonBox}>
					{index == nIndex ? <div className={styles.commonTitle}>{data.title || ''}</div> : ''}
					<div className={styles.pageFourCoverImage} style={{backgroundImage : cover1}}></div>
					<div className={styles.pageFourCoverImage} style={{backgroundImage : cover2}}></div>
				</div>
				<div className={styles.pageFourBottomLeftImage}></div>
				<div className={styles.pageFourBottomRightImage}></div>
				<div className={styles.commonClouds1Image}></div>
				<div className={styles.commonClouds2Image}></div>
				<div className={styles.commonClouds3Image}></div>
			</div>
		</div>
    );
}

export default MicroAutumnOneComponent;
