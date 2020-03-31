import React, {PropTypes} from 'react';
import styles from './MicroSchoolWouldBeStartingSecondPage.less';


function MicroSummerSigningComponent({

	index, nIndex, data, initWindowHeight,

}) {

	let url = data.imgUrl && data.imgUrl.length > 0 ? `url(${data.imgUrl || ''}!s300)` : '';
		
	return(
		<div className="base_school_would_be_starting_second">
			<div className={styles.background_page1_image}>		
				<div className={styles.pageOneKaixueImage}></div>
				<div className={styles.pageOneHornImage}></div>
				<div className={styles.pageOnePersonImage}></div>
				<div className={styles.pageOneHouseImage}></div>
				<div className={styles.pageOneCarImage}></div>
				<div className={styles.pageOneHederImage} style={{backgroundImage : url}}></div>	
				<div className={styles.pageOneContentText}>{data.title || ''}</div>
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
