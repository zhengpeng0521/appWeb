import React, {PropTypes} from 'react';
import styles from './admissionsMicroMarketing.less';

function MicroActivity({
    obj,
    newIndex,
    index,
}) {
    return(
		<div className="admm_div">
			<div className={styles.admm_bg2}>
				<div className={styles.admm_bg2_titile}>{obj.title}</div>
                <div className={styles.admm_bg2_content}>
                {
                    obj.intro.map(function(item, index) {
                        return  <div key={index}>
                                    <p className={styles.admm_bg2_content_left_p}>【{item.label}】</p>
                                    <p className={styles.admm_bg2_content_right_p}>{item.value}</p>
                                </div>
                    })
                }
                </div>
                {
                    newIndex == index ?  <div>
                                            <div className={styles.football}></div>
                                            <div className={styles.admm_b2_football_person}></div>
                                        </div> : ''
                }
			</div>
		</div>
    );
}

MicroActivity.propTypes = {
	detailData  : PropTypes.any,
    indexPage   : PropTypes.any,
};

export default MicroActivity;
