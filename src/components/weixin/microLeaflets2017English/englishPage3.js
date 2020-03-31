import React, {PropTypes} from 'react';
import styles from './englishPage.less';
import CommonLaoyout from './englishPageCommon.js';

function englishActivity({

    newIndex,index, data, answer_results, dp, showMask, swiperSlideClassName, nextFunction,

}) {

	let props = {
		dp, data, index, newIndex, answer_results, showMask, swiperSlideClassName, nextFunction,
		bg_url : 'http://img.ishanshan.com/gimg/ori/d6f0c512457f52532e8425672ebe8157',
		style_name : styles.bg3_image,
	}
	
    return(
		<CommonLaoyout {...props} />
    );
}
export default englishActivity;
