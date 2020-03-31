import React, {PropTypes} from 'react';
import styles from './englishPage.less';
import CommonLaoyout from './englishPageCommon.js';

function englishActivity({

    newIndex,index, data, answer_results, dp, showMask, swiperSlideClassName, nextFunction,

}) {
	
	let props = {
		dp, data, index, newIndex, answer_results, showMask, swiperSlideClassName, nextFunction,
		bg_url : 'http://img.ishanshan.com/gimg/ori/6c522ee7db8b6387aafc51ab48ca3815',
		style_name : styles.bg4_image,
	}

    return(
		<CommonLaoyout {...props} />
    );
}
export default englishActivity;
