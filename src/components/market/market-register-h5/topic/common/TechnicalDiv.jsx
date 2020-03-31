/**
 * 技术支持文案
 */

import React, {PropTypes} from 'react';
import styles from './TechnicalDiv.less';

function TechnicalDiv({
	text, style
}) {
	
	return (
		<div className={styles.text_cont} style={style}>
			{text || '由闪宝科技提供技术支持'}
		</div>
	)
}

export default TechnicalDiv;