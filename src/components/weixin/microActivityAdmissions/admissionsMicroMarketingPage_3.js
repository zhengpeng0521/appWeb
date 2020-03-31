import React, {PropTypes} from 'react';
import styles from './admissionsMicroMarketing.less';

function MicroActivity({
    obj,
    newIndex,
    index,
}) {
    let image1 = obj.img_intro.length > 0 ? obj.img_intro[0] : '';
    let image2 = obj.img_intro.length > 1 ? obj.img_intro[1] : '';
    let image3 = obj.img_intro.length > 2 ? obj.img_intro[2] : '';
    return(
		<div className="admm_div">
            <div className={styles.admm_bg3}>
                <div className={styles.admm_bg3_top_div}>
                    <div className={styles.admm_bg3_top_img} style={{backgroundImage : 'url(' + image1.imgurl + ')'}}></div>
                    <div className={styles.admm_bg3_top_right_div}>
                        <div className={styles.admm_bg3_top_text}>{obj.title1}</div>
                    </div>
                </div>

                <div className={styles.admm_bg3_center_div}>
                    <div className={styles.admm_bg3_center_left_div}>
                        <div className={styles.admm_bg3_center_text}>{obj.title2}</div>
                    </div>
                    <div className={styles.admm_bg3_center_img} style={{backgroundImage : 'url(' + image2.imgurl + ')'}}></div>
                </div>

                <div className={styles.admm_bg3_bottom_div}>
                    <div className={styles.admm_bg3_bottom_img} style={{backgroundImage : 'url(' + image3.imgurl + ')'}}></div>
                    <div className={styles.admm_bg3_buttom_right_div}>
                        <div className={styles.admm_bg3_bottom_text}>{obj.title3}</div>
                    </div>
                </div>
                {
                    index == newIndex ? <div>
                                            <div className={styles.admm_bg3_left_top_penJitter} />
                                            <div className={styles.admm_bg3_left_bottom_penJitter} />
                                            <div className={styles.admm_bg3_right_top_penJitter} />
                                            <div className={styles.admm_bg3_right_center_penJitter} />
                                            <div className={styles.admm_bg3_right_bottom_penJitter} />
                                        </div> : ''
                }
                <div className={styles.admm_bg3_title}>{obj.title}</div>
			</div>
		</div>
    );
}

MicroActivity.propTypes = {
	detailData : PropTypes.any,
};

export default MicroActivity;
