import React, {PropTypes} from 'react';
import styles from './springFestivalActivityPage.less';

function SpringFestivalActivity({
    obj,
    newIndex,
    index,
}) {
    let image1 = obj.img_intro.length > 0 ? obj.img_intro[0] : '';
    let image2 = obj.img_intro.length > 1 ? obj.img_intro[1] : '';
    return(
		<div className="sfa_div">
			<div className={styles.background4} >
                <div className={styles.background4_title}>{obj.title}</div>
                <div className={styles.background4_top_backImage}>
                    <div className={styles.background4_left_image} style={{backgroundImage : 'url(' + image1.imgurl + ')'}}/>
                    <div className={styles.background4_right_image} style={{backgroundImage : 'url(' + image2.imgurl + ')'}}/>
                </div>
                <div className={styles.background4_bottom_backImage}>
                    <div className={styles.background4_content}>
                        <p className={styles.background4_content_intro}>{obj.intro}</p>
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
