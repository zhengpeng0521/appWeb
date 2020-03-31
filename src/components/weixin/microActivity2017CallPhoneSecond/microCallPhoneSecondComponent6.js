import React, {PropTypes} from 'react';
import styles from './microCallPhoneSecondComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	return(
		<div className="autumn_recruit_second">
			<div className={styles.page6_background}>
				<div className={styles.page5_top_image}></div>
				<div className={styles.page5_common_top_title}>{data.title || ''}</div>
				{
					data.img_intro&&data.img_intro.map((item, index) => {							
						let url = `url(${item.imgurl})`;
						return  <div key={index} className={styles.page6_image} 
									style={{
										backgroundImage : url,
									}}>
								</div>
					})
				}
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
