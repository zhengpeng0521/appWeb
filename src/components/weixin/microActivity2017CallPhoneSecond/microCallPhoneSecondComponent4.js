import React, {PropTypes} from 'react';
import styles from './microCallPhoneSecondComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data

}) {
	
	let cover1  = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';
	let cover2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl})` : '';
	let cover3 = data.img_intro&&data.img_intro.length > 2 ? `url(${data.img_intro[2].imgurl})` : '';
		
	return(
		<div className="autumn_recruit_second">
			<div className={styles.page4_background}>
				<div className={styles.page3_tio_image}></div>
				<div className={styles.common_top_title}>{data.title || ''}</div>
				<div className={styles.page4_cover_image1} style={{backgroundImage : cover1}}></div>
				<div className={styles.page4_cover_image2} style={{backgroundImage : cover2}}></div>
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
