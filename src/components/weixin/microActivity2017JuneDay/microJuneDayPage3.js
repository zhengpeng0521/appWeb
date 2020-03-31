import React, {PropTypes} from 'react';
import styles from './microJuneDayPage.less';

function MicroJuneDayComponent({

	index, nIndex, data,
	
}) {

	return(
		<div className="june">
			<div className={styles.june_day_background2}>
				<div className={styles.bg_title}>{data.title}</div>
				<div className={styles.bg3_left_image}  
					style={{
						height : 'calc(20% - 12px)',
						width : 'calc(33% - 12px)',
						backgroundImage : `url(${data.img_intro.length > 0 ? data.img_intro[0].imgurl + '!s300' : ''})`,
					}}
				>
				</div>
				<div className={styles.bg3_right_image} 
					style={{
						height : 'calc(20% - 12px)', 
						width : 'calc(55% - 12px)',
					}}>
					<div className={styles.content_layout}>
						<p className={styles.bg3_right_image_p}>{data.title1}</p>
					</div>
				</div>
				<div className={styles.bg3_left_image}  
					style={{
						height : 'calc(20% - 12px)', 
						width : 'calc(33% - 12px)',
						backgroundImage : `url(${data.img_intro.length > 1 ? data.img_intro[1].imgurl + '!s300' : ''})`,
					}}>
				</div>
				<div className={styles.bg3_right_image} 
					style={{
						height : 'calc(20% - 12px)', 
						width : 'calc(55% - 12px)',
					}}>
					<div className={styles.content_layout}>
						<p className={styles.bg3_right_image_p}>{data.title2}</p>
					</div>
				</div>
				<div className={styles.bg3_left_image}  
					style={{
						height : 'calc(20% - 12px)', 
						width : 'calc(33% - 12px)',
						backgroundImage : `url(${data.img_intro.length > 2 ? data.img_intro[2].imgurl + '!s300' : ''})`,
					}}>
				</div>
				<div className={styles.bg3_right_image} 
					style={{
						height : 'calc(20% - 12px)', 
						width : 'calc(55% - 12px)',
					}}>
					<div className={styles.content_layout}>
						<p className={styles.bg3_right_image_p}>{data.title3}</p>
					</div>
				</div>
				<div className={styles.bg3_bottom_image}></div>
			</div>
		</div>
    );
}

export default MicroJuneDayComponent;
