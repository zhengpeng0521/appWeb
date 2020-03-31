import React, {PropTypes} from 'react';
import styles from './microCallPhoneSecondComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	let cover1  = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl})` : '';
	let cover2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl})`: '';
	
	let textArr = data.content&&data.content.length > 0 ? data.content.split('\n') : '';
		
	return(
		<div className="autumn_recruit_second">
			<div className={styles.page3_background}>
				<div className={styles.page3_tio_image}></div>
				<div className={styles.common_top_title}>{data.title || ''}</div>
				<div className={styles.page3_content}>
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.page3_p}>{item}</p>
						})
					}
				</div>
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
