import React, {PropTypes} from 'react';
import styles from './springOutingActivityPage.less';

const SpringFestivalActivity = ({
	obj,
	newIndex,
	index,
}) => {
	
	let headerimage = 'url(' + obj.imgUrl + ')';
	return(
		<div className="spring_outing_div" >
			<div className={styles.background1}>
                <div className={styles.background_title_image}>
                    <div className={styles.background_title}>{obj.title}</div>
                </div>
				{
						newIndex == index 
							? 
							<div>
								<div className={styles.background1_center_image} />
								<div className={styles.background1_content_image}>
										<p className={styles.background1_fuzzy_content}>{obj.sub_title}</p>
								</div>
								<div className={styles.background1_father_image}></div>
								<div className={styles.background1_mother_image}></div>
							</div>
							: ''
				}
            </div>
		</div>
    );
}

SpringFestivalActivity.propTypes = {
	detailData : PropTypes.any,
};

export default SpringFestivalActivity;
