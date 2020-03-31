import React, {PropTypes} from 'react';
import styles from './microJuneDayPage.less';

function MicroJuneDayComponent({

	index, nIndex, data
	
}) {

	return(
		<div className="june">
			<div className={styles.june_day_background}>
				{
					index == nIndex ? 
							<div>
								<div className={styles.bg_top_image}></div> 
								<div className={styles.bg_balloon_left_image}></div> 
								<div className={styles.bg_balloon_right_image}></div> 
								<div className={styles.bg_train_image}></div> 
								<div className={styles.bg_person_image}></div> 
							</div>
									: 
							''
				}
				<div className={styles.bg_title}>{data.title}</div>
			</div>
		</div>
    );
}

export default MicroJuneDayComponent;