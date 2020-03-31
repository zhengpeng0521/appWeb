import React, {PropTypes} from 'react';
import styles from './microActivity2017MayDayPage.less';

function MicroActivity2017MayDayPage({
    obj,
	newIndex,
	index,
}) {

	let img_url = "url(" + obj.imgUrl + ")";
	return(
		<div className="js_may_day_page" >
			<div className={styles.js_bg1}>
				<div className={styles.js_bg1_icon} style={{backgroundImage:img_url}}></div>
				<div className={styles.js_bg1_title}>{obj.title}</div>
				<div className={styles.js_bg1_text_div}>
					<p className={styles.js_bg1_text}>{obj.sub_title}</p>
				</div>
				{
					newIndex == index 
						? 
						<div>
							<div className={styles.js_bg1_boy_image} />
							<div className={styles.js_bg1_girl_image} />
						</div>
						: ''
				}
			</div>
		</div>
    );
}

export default MicroActivity2017MayDayPage;
