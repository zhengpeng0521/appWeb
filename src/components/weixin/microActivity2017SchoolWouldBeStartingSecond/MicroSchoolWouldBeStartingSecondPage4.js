import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroSchoolWouldBeStartingSecondPage.less';

function MicroSchoolWouldBeStartingComponent({

	index, nIndex, data,

}) {


	let url1 = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl}!s300)` : '';
	let url2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl}!s300)` : '';

	return(
		<div className="base_school_would_be_starting_second">
			<div className={styles.background_page4_image}>
				<div className={styles.commonTitleImage}>
					<div className={styles.pageTwoBookBoxTitle}>{data.title || ''}</div>
				</div>
				<div className={styles.pageFourCoverBox1}>
					<div className={styles.pageFourBoxCover1Image} style={{backgroundImage : url1}}></div>
				</div>
				<div className={styles.pageFourCoverBox2}>
					<div className={styles.pageFourBoxCover2Image} style={{backgroundImage : url2}}></div>
				</div>	
				<div className={styles.pageFourBookImage}></div>
				<div className={styles.pageFourPersonImage}></div>
			</div>
		</div>
    );
}

export default MicroSchoolWouldBeStartingComponent;
