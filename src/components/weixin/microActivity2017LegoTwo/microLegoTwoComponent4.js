import React, {PropTypes} from 'react';
import styles from './microLegoTwoComponent.less';

function MicroLegoTwoComponent({

	index, nIndex, data,

}) {

	let textArr = data.content&&data.content.length > 0 ? data.content.split('\n') : [];
	
	return(
		<div className="lego_one">
			<div className={styles.page4_background}>
				<div className={styles.pageFourTitleText}>{data.title || ''}</div>
				<div className={styles.pageFourBgbox}>
					<div className={styles.pageFourTextbox}>
						{
							textArr&&textArr.map((item, index) => {
								return <div key={index} className={styles.pageFourContentItem}>{item}</div>
							})
						}
					</div>
				</div>
			</div>
			<div className={styles.pageFourLegoGif2Image}></div>
			<div className={styles.pageFourLegoGif1Image}></div>
		</div>
    );
}

export default MicroLegoTwoComponent;

