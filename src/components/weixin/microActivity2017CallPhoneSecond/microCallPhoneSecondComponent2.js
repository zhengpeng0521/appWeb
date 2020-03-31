import React, {PropTypes} from 'react';
import styles from './microCallPhoneSecondComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {
	
	return(
		<div className="autumn_recruit_second">
			<div className={styles.page2_background}>
				{index == nIndex ? <div className={styles.page2_top_image}></div> : ''}
				<div className={styles.page2_content}>{data.title || ''}</div>
				{index == nIndex ? <div className={styles.page2_person}></div> : ''}
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
