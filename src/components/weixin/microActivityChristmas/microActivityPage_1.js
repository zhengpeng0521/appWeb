import React, {PropTypes} from 'react';
import styles from './microActivity.less';

function MicroActivity({
    obj,
}) {

	return(
		<div className="content-base" >
			<div className={styles.microActivity_background_image1}>
			<div className={styles.background1_fuzzy} />
				<div className={styles.background1_p}>{obj.title}</div>
			</div>
		</div>
    );
}


MicroActivity.propTypes = {
	detailData : PropTypes.any,
};

export default MicroActivity;
