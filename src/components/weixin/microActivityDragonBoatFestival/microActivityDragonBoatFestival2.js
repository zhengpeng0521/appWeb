import React, {PropTypes} from 'react';
import styles from './microActivityDragonBoatFestival.less';

function SpringFestivalActivity({
    obj,
    newIndex,
    index,
}) {
    return(
		<div className="dragonBoatFestivalBaseDiv">
			<div className={styles.background2}>
				<div className={styles.background2_title_fuzzy}></div>
				<div className={styles.background2_title}>{obj.title}</div>
				<div className={styles.background2_bakcImage} />
                <div className={styles.background2_content}>
                {
                    obj.intro.map(function(item, index) {
                        return  <div key={index}>
                                    <p className={styles.background2_content_left_p}>{item.label}:</p>
                                    <p className={styles.background2_content_right_p}>{item.value}</p>
                                </div>
                    })
				}
                </div>
				{
						newIndex == index 
							? 
							<div>
								<div className={styles.background2_wine_image} />
							</div>
							: ''
				}
			</div>
		</div>
    );
}

SpringFestivalActivity.propTypes = {
	detailData  : PropTypes.any,
    indexPage   : PropTypes.any,
};

export default SpringFestivalActivity;
