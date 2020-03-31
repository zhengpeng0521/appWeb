import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroLeafletsDancePage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {

    let image1 = data.img_intro&&data.img_intro.length > 0 ? (data.img_intro[0].imgurl.length > 0 ? `url(${data.img_intro[0].imgurl}!s300)` : '') : '';
    let image2 = data.img_intro&&data.img_intro.length > 1 ? (data.img_intro[1].imgurl.length > 0 ? `url(${data.img_intro[1].imgurl}!s300)` : '') : '';
    let image3 = data.img_intro&&data.img_intro.length > 2 ? (data.img_intro[2].imgurl.length > 0 ? `url(${data.img_intro[2].imgurl}!s300)` : '') : '';

	return(
		<div className="base_dance">
			<div className={styles.background_page3_image}>
				<div className={styles.page3_title}>{data.title || ''}</div>
				<div className={styles.page1_cover} style={{backgroundImage : image1}}></div>
				<div className={styles.page2_cover} style={{backgroundImage : image2}}></div>
				<div className={styles.page3_cover} style={{backgroundImage : image3}}></div>		
				<div className={styles.common_clouds_img}></div>
				<div className={styles.common_plane_img}></div>
				<div className={styles.common_bubble_img_static}></div>
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
