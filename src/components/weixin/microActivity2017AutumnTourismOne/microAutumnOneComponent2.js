import React, {PropTypes} from 'react';
import styles from './microAutumnOneComponent.less';

function MicroAutumnOneComponent({

	index, nIndex, data,

}) {

	let textArr = data.intro&&data.intro.length > 0 ? data.intro.split('\n') : '';
	let cover  	= data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';

	return(
		<div className="autumn_one">
			<div className={styles.page2_background}>
				<div className={styles.commonBox}>
					{index == nIndex ? <div className={styles.commonTitle}>{data.title || ''}</div> : ''}
					<div className={styles.pageTwoCover} style={{backgroundImage : cover}}></div>
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.pageTwoText}>{item}</p>
						}) 
					}
				</div>
				{index == nIndex ? <div className={styles.pageTwoBottomPersonImage}></div> : ''}
				<div className={styles.pageTwoBottomImage}></div>
				<div className={styles.commonClouds1Image}></div>
				<div className={styles.commonClouds2Image}></div>
				<div className={styles.commonClouds3Image}></div>
			</div>
		</div>
    );
}

export default MicroAutumnOneComponent;
