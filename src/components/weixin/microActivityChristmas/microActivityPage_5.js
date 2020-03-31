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
			<div className={styles.microActivity_background_image5}>
				<div className={styles.background2_top_fuzzy} />
				<div className={styles.background2_p}>{data&&data.title}</div>
				<div src="src/assets//weixin/microActivity/Leaf@2x.png" className={styles.background4_top_image} />
				<div className={styles.bg5_photo_div}>
					<div className={styles.background4_photo_cover}>
						<img src={img_data&&img_data.length > 0 ? img_data[0].imgurl : null} className={styles.background4_photo_image} />
					</div>
					<div className={styles.background4_photo_cover}>
						<img src={img_data&&img_data.length > 1 ? img_data[1].imgurl : null} className={styles.background4_photo_image} />
					</div>
				</div>
				<div className={styles.background5_content_fuzzy} />
				<div className={styles.background5_content_sub_fuzzy}>
					<p className={styles.background5_content_sub_fuzzy_p}>{data&&data.intro}</p>
				</div>
			</div>
		</div>
    );
}

MicroActivity.propTypes = {
	detailData : PropTypes.any,
};

export default MicroActivity;
