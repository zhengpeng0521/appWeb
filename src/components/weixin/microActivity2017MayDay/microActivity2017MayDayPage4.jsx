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
			<div className={styles.js_bg4} >
				<div className={styles.js_bg4_title}>{obj&&obj.title}</div>
				<div className={styles.js_bg4_photo_div}>
					<div className={styles.js_bg4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 0 ? 'url(' + img_data[0].imgurl + ')' : null}} className={styles.js_bg4_photo_image} />
					</div>
					<div className={styles.js_bg4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 1 ? 'url(' + img_data[1].imgurl + ')' : null}} className={styles.js_bg4_photo_image} />
					</div>
					<div className={styles.js_bg4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 2 ? 'url(' + img_data[2].imgurl + ')' : null}} className={styles.js_bg4_photo_image} />
					</div>
					<div className={styles.js_bg4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 3 ? 'url(' + img_data[3].imgurl + ')' : null}} className={styles.js_bg4_photo_image} />
					</div>
				</div>
				{
					newIndex == index 
						? 
						<div>
							<div className={styles.js_bg4_girl_image} />
						</div>
						: ''
				}
			</div>
		</div>
    );
}

export default MicroActivity2017MayDayPage;
