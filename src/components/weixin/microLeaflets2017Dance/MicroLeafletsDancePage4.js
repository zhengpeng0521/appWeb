import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroLeafletsDancePage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {


	let url1 = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl}!s300)` : '';
	let url2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl}!s300)` : '';
	let url3 = data.img_intro&&data.img_intro.length > 2 ? `url(${data.img_intro[2].imgurl}!s300)` : '';
	let url4 = data.img_intro&&data.img_intro.length > 3 ? `url(${data.img_intro[3].imgurl}!s300)` : '';

	return(
		<div className="base_dance">
			<div className={styles.background_page4_image}>
				<div className={styles.page4_title}>{data.title || ''}</div>	
				<div className={styles.common_clouds_img}></div>
				<div className={styles.common_bubble_img_static}></div>
		
				<div className={styles.page4_spacecraft_img}></div>
				<div className={styles.page4_baby_img}></div>
		
				<div className={styles.page4_image_box}>
					<div className={styles.page4_cover} style={{backgroundImage : url1}}></div>
					<div className={styles.page4_cover} style={{backgroundImage : url2}}></div>
					<div className={styles.page4_cover} style={{backgroundImage : url3}}></div>
					<div className={styles.page4_cover} style={{backgroundImage : url4}}></div>
				</div>
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
