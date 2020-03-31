import React from 'react';
import styles from './PlaceHolderComponent.less';
import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';

function PlaceHolderComponent({
	tips,
	height
}){

	return(
		<div className = { styles.place_holder_box } style = {{ height : height }}>
			<div className = { styles.place_holder_box_img }>
				<span className = { styles.place_hoder_box_label }>{ tips }</span>
			</div>
		</div>
	)
}

export default PlaceHolderComponent;
