import React, {PropTypes} from 'react';
import styles from './microLegoTwoComponent.less';

function MicroLegoTwoComponent({

	index, nIndex, data, dp,

}) {

	let header_url = `url(${data.imgUrl})`;
	
	return(
		<div className="lego_one">
			<div className={styles.page1_background}>
				<div className={styles.pageOneArtTextImage}></div>
				<div className={styles.pageOneOrgNameText}>{data.org_name || ''}</div>
				<div className={styles.pageOneTitleText}>{data.title || ''}</div>
				{index == nIndex ? <div className={styles.pageOneJimuImage}></div> : ''}
			</div>
		</div>
    ); 
}

export default MicroLegoTwoComponent;
