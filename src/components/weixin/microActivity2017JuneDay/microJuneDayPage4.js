import React, {PropTypes} from 'react';
import styles from './microJuneDayPage.less';

function MicroJuneDayComponent({

	index, nIndex, data,
	
}) {
	
	return(
		<div className="june">
			<div className={styles.june_day_background}>
				<div className={styles.bg_title}>{data.title}</div>
				<div className={styles.bg4_l_image} 
					style={{
						height : document.body.clientWidth / 100 * 42.5 - 12, 
						width : 'calc(42.5% - 12px)',
						backgroundImage : `url(${data.img_intro.length > 0 ? data.img_intro[0].imgurl : ''})`,
					}}>
				</div>
				<div className={styles.bg4_r_image} 
					style={{
						height : document.body.clientWidth / 100 * 42.5 - 12, 
						width : 'calc(42.5% - 12px)',
						backgroundImage : `url(${data.img_intro.length > 1 ? data.img_intro[1].imgurl : ''})`,
					}}>
				</div>
				<div className={styles.bg4_text_image} 
					style={{
						height : document.body.clientWidth / 100 * 50,
					}}>
					<div className={styles.content_layout}>
						<p className={styles.bg4_text}>{data.intro}</p>
					</div>
				</div>
				{
					index == nIndex ? 
						<div>
							<div className={styles.bg4_image_love}></div>
							<div className={styles.bg4_image}></div>
						</div>
						: ''
				}	
			</div>
		</div>
    );
}

export default MicroJuneDayComponent;
