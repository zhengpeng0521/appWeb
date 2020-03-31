import React, {PropTypes} from 'react';
import styles from './springOutingActivityPage.less';

const SpringFestivalActivity = ({
    obj,
    newIndex,
    index,
}) => {

    let image1 = obj.img_intro.length > 0 ? obj.img_intro[0] : '';
    let image2 = obj.img_intro.length > 1 ? obj.img_intro[1] : '';
    let image3 = obj.img_intro.length > 2 ? obj.img_intro[2] : '';
    return(
		<div className="spring_outing_div">
            <div className={styles.background3}>
                <div className={styles.background_title_image}><div className={styles.background_title}>{obj.title}</div></div>
				{
					newIndex == index 
						? 
						<div className={styles.background3_base_white_background}>
							<div className={styles.background3_top_div}>
								<div className={styles.background_left_div}>
									<div className={styles.background3_l_img} style={{backgroundImage : 'url(' + image1.imgurl + ')'}} />
								</div>
								<div className={styles.background_right_div}>
									<div className={styles.background3_text}>{obj.title1}</div>
								</div>
							</div>

							<div className={styles.background3_center_div}>
								<div className={styles.background_left_div}>
									<div className={styles.background3_l_img} style={{backgroundImage : 'url(' + image2.imgurl + ')'}}/>
								</div>
								<div className={styles.background_right_div}>
									<div className={styles.background3_text}>{obj.title2}</div>
								</div>
							</div>

							<div className={styles.background3_bottom_div}>
								<div className={styles.background_left_div}>
									<div className={styles.background3_l_img} style={{backgroundImage : 'url(' + image3.imgurl + ')'}}/>
								</div>
								<div className={styles.background_right_div}>
									<p className={styles.background3_text}>{obj.title3}</p>
								</div>
							</div>
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
