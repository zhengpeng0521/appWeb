import React, {PropTypes} from 'react';
import styles from './microAutumnTwoComponent.less';

function MicroAutumnTwoComponent({

	index, nIndex, data,

}) {

	let textArr = data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="autumn_two">
			<div className={styles.page3_background}>
				<div className={styles.pageThreeTitleText}>{data.title || ''}</div>
				<div className={styles.pageThreeTextbox}>
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.pageThreeContentItem}>{item}</p>
						})
					}
					<div className={styles.pageThreeArrowImage}></div>
					<div className={styles.pageThreeLoveImage}></div>
				</div>
			</div>
			<div className={styles.pageThreeBottomImage}></div>
		</div>
    );
}

export default MicroAutumnTwoComponent;
