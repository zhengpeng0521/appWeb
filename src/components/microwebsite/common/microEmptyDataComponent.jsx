import React from 'react';
import styles from './microEmptyDataComponent.less';

function MicroEmptyDataComponent({
	title,
	top,
}) {

	return(
		<div className="js_empty_data">
			<div className={styles.js_empty_image} style={{marginTop: top}}></div>
			<p className={styles.js_empty_p}>{title}</p>
		</div>
    );
}

export default MicroEmptyDataComponent;



