import React from 'react';
import styles from './toViewClassComponent.less';
import {WhiteSpace, WingBlank, Icon} from 'antd-mobile';
import MicroEmptyDataComponent from '../common/microEmptyDataComponent.jsx';

function MicroToViewClassComponent({

	dp,

}) {

	return(
		<div className="js_micro_toview_class">
			<MicroEmptyDataComponent title="您还没有课时哦" top="calc(100% / 2)"/>	
		</div>
    );
}

export default MicroToViewClassComponent;



