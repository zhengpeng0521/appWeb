import React, {PropTypes} from 'react';
import styles from './microAutumnTwoComponent.less';
import CommonFallingComponent from '../../../components/common/commonComponent/CommonFallingComponent/CommonFallingComponent.js';

function MicroAutumnTwoComponent({

	index, nIndex, data, swiperSlideClassName, dp, nextFunction,

}) {

	let header_url = `url(${data.imgUrl})`;
	
	let props = {
		number 		: 5,
		imageArr 	: ["http://img.ishanshan.com/gimg/img/9d2cdf77d0efc09dfe9b909e6e539113"],
		isCustomNumber : true,
		itemImageStyle : {
			height: '0.3rem',
    		width: '0.3rem',
		},
	}
		
	
	return(
		<div className="autumn_two">
			<div className={styles.page1_background}>
				<CommonFallingComponent {...props} />
				<div className={styles.pageOneArtTextImage}></div>
				<div className={styles.pageOneTopLeftImage}></div>
				<div className={styles.pageOneTopRightImage}></div>
				<div className={styles.pageOneTextBox}>
					<div className={styles.pageOneTitleText}>{data.title || ''}</div>
					<div className={styles.pageOneSubTitleText}>{data.sub_title || ''}</div>
					<div className={styles.pageOneOrgNameText}>{data.org_name || ''}</div>
				</div>
				<div className={styles.pageOneBottomImage}></div>
			</div>
		</div>
    ); 
}

export default MicroAutumnTwoComponent;
