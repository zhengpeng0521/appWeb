/*
 *	onClickFunction : function
 *
 */
import React from 'react';
import styles from './microMaaButtonComponent.less';
import {Toast} from 'antd-mobile';

function MicroMaaComponent({

	onClickFunction,
	
}) {

	function touchFunction () {
		if(typeof(onClickFunction) === 'function') {
			onClickFunction();
		} else if(typeof(onClickFunction) === undefined || typeof(onClickFunction) === 'undefined') {
  			Toast.info('未传入方法', 2);
		}
	}
	
	return(
		<div className={styles.js_maa_btn} onClick={() => touchFunction()}>
			预约试听
		</div>
    );
}

export default MicroMaaComponent;



