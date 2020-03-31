import React, {PropTypes} from 'react';
import styles from './microLegoTwoComponent.less';

function MicroLegoTwoComponent({

	index, nIndex, data

}) {
	
	let cover1  = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';
	let cover2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl})` : '';	
	
	return(
		<div className="lego_one">
			<div className={styles.page3_background}>
				<div className={styles.pageThreeTitleText}>{data.title || ''}</div> 
				<div className={styles.pageThreeCoverImage1} style={{backgroundImage : cover1}}></div>
				<div className={styles.pageThreeCoverImage2} style={{backgroundImage : cover2}}></div>
				<div className={styles.pageThreeBottomGifImage}></div>
			</div>
		</div>
    );
}

export default MicroLegoTwoComponent;