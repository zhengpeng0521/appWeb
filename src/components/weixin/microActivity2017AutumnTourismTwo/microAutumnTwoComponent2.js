import React, {PropTypes} from 'react';
import styles from './microAutumnTwoComponent.less';

function MicroAutumnTwoComponent({

	index, nIndex, data,

}) {
	
		
	let textArr = data.intro&&data.intro.length > 0 ? data.intro.split('\n') : '';
	let cover  	= data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';

	return(
		<div className="autumn_two">
			<div className={styles.page2_background}>
				<div className={styles.pageTwoTopImage1}></div>
				<div className={styles.pageTwoTopImage2}></div>
				<div className={styles.pageTwoTopImage3}></div>
				<div className={styles.pageTwoTopImage4}></div>
		
				<div className={styles.pageTwoTitleText}>{data.title || ''}</div> 
				<div className={styles.pageTwoCover} style={{backgroundImage : cover}}></div>
				<div className={styles.pageTwoText}>
				{
					textArr&&textArr.map((item, index) => {
						return <p key={index} className={styles.pageTwoTextItem}>{item}</p>
					}) 
				}
				</div>
			</div>
			<div className={styles.pageTwoBottomRabbitImage}></div>
			<div className={styles.pageTwoBottomDragonflyImage}></div>
			<div className={styles.pageTwoBottomImage}></div>
		</div>
    );
}

export default MicroAutumnTwoComponent;
