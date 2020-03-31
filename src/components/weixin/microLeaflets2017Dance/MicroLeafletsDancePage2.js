import React, {PropTypes} from 'react';
import styles from './MicroLeafletsDancePage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {

	let textArr1 = data.content.length > 0 ? data.content.split('\n') : '';
	
	return(
		<div className="base_dance">
			<div className={styles.background_page2_image}>
				<div className={styles.common_clouds_img}></div>
				<div className={styles.common_plane_img}></div>
				<div className={styles.common_bubble_img_static}></div>
		
				<div className={styles.page2_title}>{data.title || ''}</div>
				<div className={styles.page2_box_img}>
					{
						textArr1&&textArr1.map((item, index) => {
							return <p key={index} className={styles.page2_content}>{item}</p>
						})
					}
				</div>
				<div className={styles.page2_baby_img}></div>
		
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;

