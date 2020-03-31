import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './microCallPhoneComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	let cover1  = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';
	let cover2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl})`: '';
	
	return(
		<div className="three_phone">
			<div className={styles.page3_background}>
				<div className={styles.common_top_title}>{data.title || ''}</div>
				<div className={styles.page3_letter}></div>
				<div className={styles.page3_hat}></div>
				<div className={styles.page3_cover_left} style={{backgroundImage : cover1}}></div>
				<div className={styles.page3_text_left}>{data.title1 || ''}</div>
				<div className={styles.page3_text_right}>{data.title2 || ''}</div>
				<div className={styles.page3_cover_right} style={{backgroundImage : cover2}}></div>
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
