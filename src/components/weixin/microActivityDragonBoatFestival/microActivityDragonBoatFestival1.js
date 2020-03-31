import React, {PropTypes} from 'react';
import styles from './microActivityDragonBoatFestival.less';

function SpringFestivalActivity({
    obj,
}) {

    let headerimage = 'url(' + obj.imgUrl + ')';
	return(
		<div className="dragonBoatFestivalBaseDiv" >
			<div className={styles.background1}>
                <div className={styles.background_title_image}></div>
				<div className={styles.background1_title_div}>
		        	<div className={styles.background1_title}>{obj.title}</div>		
				</div>
                <div className={styles.background1_fuzzy}></div>
                <p className={styles.background1_fuzzy_content}>{obj.sub_title}</p>
            </div>
		</div>
    );
}

SpringFestivalActivity.propTypes = {
	detailData : PropTypes.any,
};

export default SpringFestivalActivity;


