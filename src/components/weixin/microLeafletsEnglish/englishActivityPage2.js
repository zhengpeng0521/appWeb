import React, {PropTypes} from 'react';
import styles from './englishActivity.less';

const englishActivity = ({
    newIndex,
    index,
    obj,
}) => {
	let data = obj;
	let img_data = obj.img_intro;
    return(
		<div className="english_div">
			<div className={styles.background2}>
				<div className={styles.background2_p}>{data&&data.title}</div>
				<div className={styles.background2_photo_div}>
					<div className={styles.background2_photo_cover}>
						<img src={img_data&&img_data.length > 0 ? img_data[0].imgurl : null} className={styles.background2_photo_image} />
					</div>
					<div className={styles.background2_photo_cover}>
						<img src={img_data&&img_data.length > 1 ? img_data[1].imgurl : null} className={styles.background2_photo_image} />
					</div>
				</div>
				<div className={styles.background2_content_sub_fuzzy}>
					<p className={styles.background2_content_sub_fuzzy_p}>{data&&data.intro}</p>
				</div>
        	    <div className={styles.background2_content_sub_fuzzy1}>
					{
						data.course_intro&&data.course_intro.map(function(item,index) {
							return  <div key={index}>
										<p className={styles.background2_content_sub_fuzzy_p1}>{item}</p>
									</div>
						})	
					}
				</div>
			</div>
            {
                newIndex == index ? 
                    <div>
                        <div className={styles.hotAirBalloon}></div>
                    </div> : ''
            }
		</div>
    );
}
export default englishActivity;
