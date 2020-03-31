import React, {PropTypes} from 'react';
import styles from './springOutingActivityPage.less';

const SpringFestivalActivity = ({
    obj,
    newIndex,
    index,
}) => {	
    return(
		<div className="spring_outing_div">
			<div className={styles.background2}>
                <div className={styles.background_title_image}><div className={styles.background_title}>{obj.title}</div></div>
				<div className={styles.background_content_image}>
					<div className={styles.background2_content}>
						{
							obj.intro.map(function(item, index) {
								return  <div key={index}>
											<p className={styles.background2_content_left_p}>【{item.label}】</p>
											<p className={styles.background2_content_right_p}>{item.value}</p>
										</div>
							})
						}
					</div>
				</div>
					{
						newIndex == index 
							? 
							<div>
								<div className={styles.background2_bottom_image} />
								<div className={styles.background2_dog_image} />
							</div>
							: ''
					}
			</div>
		</div>
    );
}

SpringFestivalActivity.propTypes = {
	detailData  : PropTypes.any,
    indexPage   : PropTypes.any,
};

export default SpringFestivalActivity;
