import React, {PropTypes} from 'react';
import styles from './yuanxiaoActivityPage.less';

function YuanxiaoActivity({
    obj,
    newIndex,
    index,
}) {
	let data = obj;
	let img_data = obj.img_intro;

    return(
		<div className="yuanxiao_div">
			<div className={styles.background} >
                {
                    newIndex == index ? 
                        <div>
                            <div className={styles.background4_l_denglong}></div>
                            <div className={styles.background4_r_denglong}></div>
                        </div> : ''
                }
				<div className={styles.background2_top_fuzzy} />
				<div className={styles.background2_p}>{obj&&obj.title}</div>
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
                {
                    newIndex == index ? 
                        <div>
                            <div className={styles.background4_image}></div>
                        </div> : ''
                }
			</div>
		</div>
    );
}

export default YuanxiaoActivity;
