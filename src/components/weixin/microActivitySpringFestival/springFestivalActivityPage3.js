import React, {PropTypes} from 'react';
import styles from './springFestivalActivityPage.less';

function SpringFestivalActivity({
    obj,
    newIndex,
    index,
}) {
	
    let image1 = obj.img_intro.length > 0 ? obj.img_intro[0] : '';
    let image2 = obj.img_intro.length > 1 ? obj.img_intro[1] : '';
    let image3 = obj.img_intro.length > 2 ? obj.img_intro[2] : '';
    return(
		<div className="sfa_div">
            <div className={styles.background3}>
                <div className={styles.background3_title}>{obj.title}</div>
                <div className={styles.background3_backImage}>
                    <div className={styles.background3_base_white_background}>
                        <div className={styles.background3_top_div}>
                            <div className={styles.background3_top_img} style={{backgroundImage : 'url(' + image1.imgurl + ')'}}></div>
                            <div className={styles.background3_top_right_div}>
                                <div className={styles.background3_top_text}>{obj.title1}</div>
                            </div>
                        </div>

                        <div className={styles.background3_center_div}>
                            <div className={styles.background3_center_img} style={{backgroundImage : 'url(' + image2.imgurl + ')'}}></div>
                            <div className={styles.background3_center_left_div}>
                                <div className={styles.background3_center_text}>{obj.title2}</div>
                            </div>
                        </div>

                        <div className={styles.background3_bottom_div}>
                            <div className={styles.background3_bottom_img} style={{backgroundImage : 'url(' + image3.imgurl + ')'}}></div>
                            <div className={styles.background3_buttom_right_div}>
                                <div className={styles.background3_bottom_text}>{obj.title3}</div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
    );
}

SpringFestivalActivity.propTypes = {
	detailData : PropTypes.any,
};

export default SpringFestivalActivity;
