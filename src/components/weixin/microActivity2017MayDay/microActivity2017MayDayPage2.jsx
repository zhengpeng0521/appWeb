import React, {PropTypes} from 'react';
import styles from './microActivity2017MayDayPage.less';

function MicroActivity2017MayDayPage({
    obj,
	newIndex,
	index,
}) {
	let data = obj
	let dataIntro = obj.intro;
    return(
		<div className="js_may_day_page">
			<div className={styles.js_bg2}>
				<div className={styles.js_bg2_title}>{data&&data.title}</div>
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
								<div className={styles.js_bg2_boy_image} />
								<div className={styles.js_bg2_girl_image} />
								<div className={styles.js_bg2_flower1_image} />
								<div className={styles.js_bg2_flower2_image} />
							</div>
							: ''
				}
			</div>
		</div>
    );
}

export default MicroActivity2017MayDayPage;
