import React, {PropTypes} from 'react';
import styles from './microAutumnTwoComponent.less';

function MicroAutumnTwoComponent({

	index, nIndex, data

}) {
	
	let cover1  = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';
	let cover2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl})` : '';
		
	return(
		<div className="autumn_two">
			<div className={styles.page4_background}>
				<div className={styles.pageFourTopSunImage}></div>
				<div className={styles.pageFourTitleText}>{data.title || ''}</div>
				<div className={styles.pageFourCoverImage} style={{backgroundImage : cover1}}></div>
				<div className={styles.pageFourCoverImage} style={{backgroundImage : cover2}}></div>
				<div className={styles.pageFourBottomImage}></div>
			</div>
		</div>
    );
}

export default MicroAutumnTwoComponent;
