import React, {PropTypes} from 'react';
import styles from './microActivity2017MayDayPage.less';

function MicroActivity2017MayDayPage({
    obj,
	newIndex,
	index,
}) {
	let data = obj;
	let dataIntro = obj.intro;
    return(
		<div className="js_may_day_page">
            <div className={styles.js_bg3}>
				<div className={styles.js_bg2_top_fuzzy} />
				<div className={styles.js_bg3_title}>{data&&data.title}</div>
				<div className={styles.js_bg2_center_fuzzy} />
				<div className={styles.js_bg2_subdiv_center_fuzzy}>
					{
						dataIntro&&dataIntro.map(function(item, index) {
							return  <div key={index}>
										<p className={styles.js_bg2_content_key}>{item.label}:</p>
										<p className={styles.js_bg2_content_value}>{item.value}</p>
									</div>
						})
					}
				</div>
				{
					newIndex == index 
						? 
						<div>
							<div className={styles.js_bg3_girlanddog_image} style={{width : '45%', height : '25%'}} />
						</div>
						: ''
				}
			</div>
		</div>
    );
}

export default MicroActivity2017MayDayPage;
