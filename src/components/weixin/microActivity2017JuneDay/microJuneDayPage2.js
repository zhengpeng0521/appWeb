import React, {PropTypes} from 'react';
import styles from './microJuneDayPage.less';

function MicroJuneDayComponent({

	index, nIndex, data,
	
}) {

	return(
		<div className="june">
			<div className={styles.june_day_background2}>
				<div className={styles.bg_title}>{data.title}</div>
				<div className={styles.bg2_content}>
					<div className={styles.content_layout}>
						{
							data.intro.map((item, index) => {
								return  <div key={index}>
											<p className={styles.bg2_label} style={{width : 'calc(30% - 20px)'}}>{item.label}</p>
											<p className={styles.bg2_value} style={{width : 'calc(70% - 20px)'}}>{item.value}</p>
										</div>
							})
						}
					</div>
				</div>
				{
					index == nIndex ? 
						<div>
							<div className={styles.bg_balloon_left_image}></div> 
							<div className={styles.bg_balloon_right_image}></div> 
							<div className={styles.bg2_image}></div> 
						</div>
						: ''
				}	
			</div>
		</div>
    );
}

export default MicroJuneDayComponent;
