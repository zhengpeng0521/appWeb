import React, {PropTypes} from 'react';
import styles from './admissionsMicroMarketing.less';

function MicroActivity({
    obj,
}) {
	return(
		<div className="admm_div" >
			<div className={styles.admm_bg1}>
                <div className={styles.admm_bg1_title}>{obj.title}</div>
                <div className={styles.admm_bg1_admissions_title}></div>
                <div className={styles.admm_bg1_fuzzy}>
                    <p className={styles.admm_bg1_fuzzy_content}>{obj.sub_title}</p>
                </div>
            </div>
		</div>
    );
}

MicroActivity.propTypes = {
	detailData : PropTypes.any,
};

export default MicroActivity;
