import React, {PropTypes} from 'react';
import styles from './microActivity2017MayDayPage.less';

function MicroActivity2017MayDayPage({
    obj,
	newIndex,
	index,
}) {
	let data = obj;
	let img_data = obj.img_intro;
    return(
		<div className="js_may_day_page">
			<div className={styles.js_bg5}>
				<div className={styles.js_bg4_title}>{data&&data.title}</div>
				<div className={styles.js_bg4_photo_div}>
					<div className={styles.js_bg4_photo_cover}>
						<img src={img_data&&img_data.length > 0 ? img_data[0].imgurl : null} className={styles.js_bg4_photo_image} />
					</div>
					<div className={styles.js_bg4_photo_cover}>
						<img src={img_data&&img_data.length > 1 ? img_data[1].imgurl : null} className={styles.js_bg4_photo_image} />
					</div>
				</div>
				{
					newIndex == index 
					? 
					<div>
						<div className={styles.js_bg5_flower_big_image}>
							<p className={styles.js_bg5_content_sub_fuzzy_p}>{data&&data.intro}</p>
						</div>
						<div className={styles.js_bg5_girl_image} />
					</div>
					: ''
				}
			</div>
		</div>
    );
}

export default MicroActivity2017MayDayPage;
