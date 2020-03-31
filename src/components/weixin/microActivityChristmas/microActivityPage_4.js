import React, {PropTypes} from 'react';
import styles from './microActivity.less';

function MicroActivity({
	detailData,
    obj,
}) {
	let data = obj;
	let img_data = obj.img_intro;

    return(
		<div className="content-base">
			<div className={styles.microActivity_background_image4} >
				<div className={styles.background2_top_fuzzy} />
				<div className={styles.background2_p}>{obj&&obj.title}</div>
				<div src="src/assets/weixin/microActivity/Leaf@2x.png" className={styles.background4_top_image} />
				<div className={styles.photo_div}>
					<div className={styles.background4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 0 ? 'url(' + img_data[0].imgurl + ')' : null}} className={styles.background4_photo_image} />
					</div>
					<div className={styles.background4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 1 ? 'url(' + img_data[1].imgurl + ')' : null}} className={styles.background4_photo_image} />
					</div>
					<div className={styles.background4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 2 ? 'url(' + img_data[2].imgurl + ')' : null}} className={styles.background4_photo_image} />
					</div>
					<div className={styles.background4_photo_cover}>
						<div style={{backgroundImage : img_data&&img_data.length > 3 ? 'url(' + img_data[3].imgurl + ')' : null}} className={styles.background4_photo_image} />
					</div>
				</div>
			</div>
		</div>
    );
}

MicroActivity.propTypes = {
	detailData : PropTypes.any,
};

export default MicroActivity;
