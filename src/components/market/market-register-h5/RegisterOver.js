/*
 * showText			展示文案
 */
import React, {PropTypes} from 'react';
import styles from './RegisterOver.less';
function RegisterH5Component({

	showText,
	
}) {
		
	return(
		<div className="register_over">	
			<div className={styles.overBox}>
				{showText.length > 0 ? <div className={styles.overBoxImage}></div> : ''}
				<div className={styles.overBoxText}>{showText || ''}</div>
			</div>
		</div>
    );
}


export default RegisterH5Component;
