import React, {PropTypes} from 'react';
import styles from './microAutumnOneComponent.less';
import CommonFallingComponent from '../../../components/common/commonComponent/CommonFallingComponent/CommonFallingComponent.js';

function MicroAutumnOneComponent({

	index, nIndex, data,

}) {

	let props = {
		number 		: 20,
		imageArr 	: ["http://img.ishanshan.com/gimg/ori/1e3425f79c9f94982051c77832a57d83"],
		direction 	: 'left',
		isCustomNumber : true,
		speenArr 	: [2, 5],
		itemImageStyle : {
			height: '1rem',
    		width: '0.3rem',
		},
	}
	
	let textArr = data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="autumn_one">
			<div className={styles.page3_background}>
				<CommonFallingComponent {...props} />
				<div className={styles.commonBox}>
					{index == nIndex ? <div className={styles.commonTitle}>{data.title || ''}</div> : ''}
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.pageThreeContentItem}>{item}</p>
						})
					}
				</div>
				<div className={styles.pageThreeBottomImage}></div>
				<div className={styles.commonClouds1Image}></div>
				<div className={styles.commonClouds2Image}></div>
				<div className={styles.commonClouds3Image}></div>
			</div>
		</div>
    );
}

export default MicroAutumnOneComponent;
