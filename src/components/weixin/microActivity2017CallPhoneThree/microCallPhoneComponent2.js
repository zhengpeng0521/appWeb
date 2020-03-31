import React, {PropTypes} from 'react';
import styles from './microCallPhoneComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	return(
		<div className="three_phone">
			<div className={styles.page2_background}>
				<div className={styles.page2_title_imgae}></div>
				<div className={styles.page2_person_image}></div>
				<div className={styles.page2_bicycle_image}></div>
				<div className={styles.page2_content}>{data.title || ''}</div>
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
