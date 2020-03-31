import React, {PropTypes} from 'react';
import styles from './englishPage.less';
import CommonLaoyout from './englishPageCommon.js';

function englishActivity({

    newIndex,index, data, answer_results, dp, showMask, swiperSlideClassName, nextFunction,
	
}) {

	let props = {
		dp, data, index, newIndex, answer_results, showMask, swiperSlideClassName, nextFunction,
		bg_url : 'http://img.ishanshan.com/gimg/ori/00983565f3b0f4db94f4d53b0e33608c',
		style_name : styles.bg2_image,
	}
	
    return(
		<CommonLaoyout {...props} />
    );
}
export default englishActivity;
