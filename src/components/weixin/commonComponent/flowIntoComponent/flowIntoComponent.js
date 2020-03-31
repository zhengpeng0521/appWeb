import React, {PropTypes} from 'react';
import styles from './flowIntoComponent.less';

function FlowInfoComponent({

	dp,
	requestMark,
	defaultStyle,
	externalLinks,
	showAni,
	aniName,
	
}) {

	function automatedCallback() {
		if(!requestMark) {
			//dp('submitAPI');
		}
	}

	function touchFlowInfo() {
		window.open(externalLinks || 'www.ishanshan.com');
	}
	
	function closeFlowInfo() {	
		
		let nameArr = [{name : "lookingForwardAni1"}, {name : "lookingForwardAni2"}, {name : "lookingForwardAni3"}];

		let number = parseInt(3 * Math.random());
		
		dp('updateState', {showAni : !showAni, aniName : nameArr[number].name || 'lookingForwardAni1'});
	}
	return(
		<div onClick={automatedCallback()}>
			<div 
	 			 style={showAni ? {display: 'none'} : {}}
	 			 className={styles.flow_info_style}
				 onClick={() => touchFlowInfo()}
			 	 dangerouslySetInnerHTML={{__html: defaultStyle}}>
			</div>
			<div className={styles.close} onClick={() => closeFlowInfo()}>X</div>
			{
				showAni ? <div className={styles[aniName]}></div> : ''
			}
		</div>
    );
}

export default FlowInfoComponent;