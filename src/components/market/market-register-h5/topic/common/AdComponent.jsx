/**
 * 广告组件
 */

import React, {PropTypes} from 'react';
import styles from './AdComponent.less';

function AdComponent({
	text, href,
}) {
	
	function adClick() {
		if(href && href.length > 0) {
			window.open(href, '_blank');
		}
	}
	
	return (
		<div className={styles.ad_cont}>
			<div className={styles.ad_text_content} onClick={adClick}>{text}</div>
		</div>
	)
}

export default AdComponent;