import React, {PropTypes} from 'react';
import styles from './microCallPhoneComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	return(
		<div className="call_phone">
			<div className={styles.page2_background}>
				{index == nIndex ? <div className={styles.page2_top_image}></div> : ''}
				<div className={styles.page2_content}>{data.title || ''}</div>
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
