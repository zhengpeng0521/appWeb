import React, {PropTypes} from 'react';
import styles from './microLegoOneComponent.less';

function MicroLegoOneComponent({

	index, nIndex, data, dp,

}) {

	let header_url = `url(${data.imgUrl})`;
	
	return(
		<div className="lego_one">
			<div className={styles.page1_background}>
				<div className={styles.pageOneArtTextImage}></div>
				<div className={styles.pageOneTextBoxImage}>
					<div className={styles.pageOneOrgNameText}>{data.org_name || ''}</div>
					<div className={styles.pageOneTitleText}>{data.title || ''}</div>
				</div>
				<div className={styles.pageOneSpiderManImage}></div>
				<div className={styles.pageOneBottomImage}></div>
			</div>
		</div>
    ); 
}

export default MicroLegoOneComponent;
