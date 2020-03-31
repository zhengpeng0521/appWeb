import React, {PropTypes} from 'react';
import styles from './MicroSchoolWouldBeStartingPage.less';


function MicroSummerSigningComponent({

	index, nIndex, data, initWindowHeight,

}) {

	let url = data.imgUrl && data.imgUrl.length > 0 ? `url(${data.imgUrl || ''}!s300)` : '';
		
	return(
		<div className="base_school_would_be_starting">
			<div className={styles.background_page1_image}>		
				<div className={styles.pageOneHederImageBox}>	
					<div className={styles.pageOneZipperImage}></div>	
				</div>		
				<div className={styles.pageOneHederImage} style={{backgroundImage : url}}></div>	
				<div className={styles.pageOneKaixueImage}></div>
				<div className={styles.pageOneBGShenImage}></div>
				<div className={styles.pageOneBGImage}></div>
				<div className={styles.pageOneContent}>
					<div className={styles.pageOneContentText}>{data.title || ''}</div>
				</div>	
				<div className={styles.pageOneBookImage}></div>		
				<div className={styles.pageOneGrilImage}></div>		
				<div className={styles.pageOnePocketImage}></div>		
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
