import React, {PropTypes} from 'react';
import styles from './englishPage.less';

function englishActivity({

    newIndex, index, data,

}) {

    return(
		<div className="english_2017">
			<div className={styles.bg5_bg}></div>
			<div className={styles.bg5_image}>
				<div className={styles.bg5_content}>{data.title || ''}</div>
			</div>
		</div>
    );
}
export default englishActivity;
