import React, {PropTypes} from 'react';
import styles from './springFestivalActivityPage.less';

function SpringFestivalActivity({
    obj,
}) {
    let headerimage = 'url(' + obj.imgUrl + ')';
	return(
		<div className="sfa_div" >
			<div className={styles.background1}>
                <div className={styles.background1_headerImageBorder}>
                    <div className={styles.background1_headerImage} style={{backgroundImage : headerimage}}></div>
                </div>
                <div className={styles.background_title_image}>
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


