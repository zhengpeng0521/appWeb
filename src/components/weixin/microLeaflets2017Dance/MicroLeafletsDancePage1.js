import React, {PropTypes} from 'react';
import styles from './MicroLeafletsDancePage.less';


function MicroSummerSigningComponent({

	index, nIndex, data, initWindowHeight,

}) {

	let url = data.head_imgUrl.length > 0 ? `url(${data.head_imgUrl || ''}!s300)` : '';
	
	return(
		<div className="base_dance">
			<div className={styles.background_page1_image}>
				<div className={styles.layou_header_image} style={{backgroundImage : url}}></div>
				<div className={styles.page1_sub_title}>{data.sub_title || ''}</div>
				<div className={styles.layou_zhaosheng_img}></div>
				<div className={styles.page1_title}>{data.title || ''}</div>
				<div className={styles.common_clouds_img}></div>
				<div className={styles.common_clouds_img1}></div>
				<div className={styles.common_bubble_img_static}></div>
				<div className={styles.common_plane_img}></div>
				<div className={styles.layou_baby_img}></div>
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
