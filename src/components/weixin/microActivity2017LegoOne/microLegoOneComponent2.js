import React, {PropTypes} from 'react';
import styles from './microLegoOneComponent.less';

function MicroLegoOneComponent({

	index, nIndex, data,

}) {
	
		
	let textArr = data.intro&&data.intro.length > 0 ? data.intro.split('\n') : '';
	let cover  	= data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';

	return(
		<div className="lego_one">
			<div className={styles.page2_background}>
				<div className={styles.pageTwoTitleBox}>
					<div className={styles.pageTwoTitleText}>{data.title || ''}</div> 
				</div>
				<div className={styles.pageTwoCoverBox}>
					<div className={styles.pageTwoCover} style={{backgroundImage : cover}}></div>
				</div>
				<div className={styles.pageTwoText}>
				{
					textArr&&textArr.map((item, index) => {
						return <p key={index} className={styles.pageTwoTextItem}>{item}</p>
					}) 
				}
				</div>
				{index == nIndex ? <div className={styles.pageTwoIronManImage}></div> : ''}
				<div className={styles.pageTwoBottomImage}></div>
			</div>
		</div>
    );
}

export default MicroLegoOneComponent;
