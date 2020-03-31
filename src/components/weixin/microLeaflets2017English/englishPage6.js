import React, {PropTypes} from 'react';
import styles from './englishPage.less';

function englishActivity({

    newIndex, index, data,

}) {

    return(
		<div className="english_2017">
			<div className={styles.bg6_bg}>
				<div className={styles.bg6_title}>{data.title || ''}</div>
				<div className={styles.bg6_content}>{data.content || ''}</div>		
				<div className={styles.bg6_image}></div>
			</div>
		</div>
    );
}
export default englishActivity;
