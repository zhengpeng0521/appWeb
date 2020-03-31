import React, {PropTypes} from 'react';
import styles from './admissionsMicroMarketing.less';

function MicroActivity({
    obj,
    newIndex,
    index,
}) {
    let image1 = obj.img_intro.length > 0 ? obj.img_intro[0] : '';
    let image2 = obj.img_intro.length > 1 ? obj.img_intro[1] : '';
    return(
		<div className="admm_div">
			<div className={styles.admm_bg4} >
				<div className={styles.admm_bg4_title}>{obj.title}</div>
				<div className={styles.admm_bg4_left_image} style={{backgroundImage : 'url(' + image1.imgurl + ')'}}/>
                <div className={styles.admm_bg4_right_image} style={{backgroundImage : 'url(' + image2.imgurl + ')'}}/>
                {
                    index == newIndex ? <div>
                                            <div className={styles.admm_bg4_penJitter}></div>
                                            <div className={styles.admm_b4_football_person}></div>
                                        </div> : ''
                }
				<div className={styles.admm_bg4_content}>
                    <p className={styles.admm_bg4_content_intro}>{obj.intro}</p>
                </div>
			</div>
		</div>
    );
}

MicroActivity.propTypes = {
	detailData : PropTypes.any,
};

export default MicroActivity;
