import React, {PropTypes} from 'react';
import styles from './microCallPhoneComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	return(
		<div className="three_phone">
			<div className={styles.page6_background}>
				<div className={styles.common_top_title}>{data.title || ''}</div>
				<div className={styles.page6_box_image}>
				{
					data.img_intro&&data.img_intro.map((item, index) => {							
						let color = index == 0 ? '#f4a600' : index == 1 ? '#f46200' : index == 2 ? '#eacf4d' : '#a52102';
						let url = `url(${item.imgurl})`;
						return  <div key={index} className={styles.page6_image} 
									style={{
										backgroundImage : url,
									}}>
								</div>
					})
				}
				</div>
				<div className={styles.page6_person_image}></div>
				<div className={styles.page5_diqiuyi_image}></div>
				<div className={styles.page5_num_image}></div>
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
