import React, {PropTypes} from 'react';
import styles from './microAutumnOneComponent.less';

function MicroAutumnOneComponent({

	index, nIndex, data, swiperSlideClassName, dp, nextFunction,

}) {

	let header_url = `url(${data.imgUrl})`;
	
	return(
		<div className="autumn_one">
			<div className={styles.page1_background}>
				<div className={styles.pageOneArtTextImage}></div>
				<div className={styles.pageOneTextBox}>
					<div className={styles.pageOneSubTitleText}>{data.sub_title || ''}</div>
					<div className={styles.pageOneTitleText}>{data.title || ''}</div>
					<div className={styles.pageOneOrgNameText}>{data.org_name || ''}</div>
				</div>
				<div className={styles.pageOneBottomImage}></div>
				<div className={styles.pageOneballoonbigImage}></div>
				<div className={styles.pageOneballoonSmallImage}></div>
			</div>
		</div>
    ); 
}


export default MicroAutumnOneComponent;
