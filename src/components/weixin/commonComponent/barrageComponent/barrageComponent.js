/*
 * 弹幕数据(简陋版)
 * barrageSwitch 		开关 	 			bool
 * barrageData   		数据源    		   Array
 * callbackFunction		点击关闭回调		 function
 */

import React, {PropTypes} from 'react';
import {Toast} from 'antd-mobile';
import styles from './barrageComponent.less';

function BarrageComponent({

	barrageData,
	barrageSwitch,
	callbackFunction,
	
}) {
	
	if(barrageData&&barrageData.length == 0) {
		barrageSwitch = false;
	}
	
	barrageData.sort(function(){ return 0.5 - Math.random()});
	let textWidth = document.body.clientWidth / 7.5 * 0.3;
	function touchme() {		
		if(callbackFunction == undefined) {
			Toast.info('请传入回调方法');
		} else {
			callbackFunction(barrageSwitch = !barrageSwitch);
		}
	}
	    
	return(
		<div>
			{!!barrageSwitch ? 
				barrageData&&barrageData.map((item, index) => {				
					let randomDur = Math.round(Math.random()*5) + 5;
					let randomDelay = Math.round(Math.random()*2)+1;
					let randomMarginLeft = Math.round(Math.random()*barrageData.length)+barrageData.length;
			 		let textLength = Object(item);
					 
					return <p className={styles.barrageStyle} key={index}
								style={{
									animationDuration : randomDur + 's',
									animationDelay	: randomDelay,
									width : textLength.length * textWidth,
								}}>
								{item}
							</p>
				}) : ''
			}
			<div className={styles.closeBarrage} onClick={() => touchme()}>{barrageSwitch ? 'close' : 'open'}</div>
		</div>
    );
}

export default BarrageComponent;