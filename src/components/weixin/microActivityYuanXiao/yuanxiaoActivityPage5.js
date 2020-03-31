import React, {PropTypes} from 'react';
import styles from './yuanxiaoActivityPage.less';

function YuanxiaoActivity({
    newIndex,
    index,
    obj,
}) {
	let data = obj;
	let img_data = obj.img_intro;
    return(
		<div className="yuanxiao_div">
			<div className={styles.background}>
				<div className={styles.background2_top_fuzzy} />
				<div className={styles.background2_p}>{data&&data.title}</div>
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
            {
                newIndex == index ? 
                    <div>
                        <div className={styles.background5_top_r_image}></div>
                        <div className={styles.background1_shiwei}></div>
                        <div className={styles.background1_nvshiwei}></div>
                    </div> : ''
            }
		</div>
    );
}
export default YuanxiaoActivity;
