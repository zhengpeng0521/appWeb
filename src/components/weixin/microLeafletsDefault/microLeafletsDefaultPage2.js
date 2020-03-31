import React from 'react';
import styles from './microLeafletsDefault.less';

const MicroLeafletsDefault = ({
    newIndex,
    index,
    data,
}) => {
	let img_data = data&&data.img_intro;
	
    return(
		<div className="js_defaultPage">
			<div className={styles.js_background2}>
				<div className={styles.js_background2_title}>{data&&data.title}</div>
				<img 
					src="http://115.29.172.104/gimg/img/894c4cc7c1ebf7881bb050a255e384f0s!200" 
					style={{
						width:'90%',
						height:HEIGHT_MIN * 20,
						position: 'absolute',
						top: '2rem',
						left: '5%',
					}}
				/>
				<div className={styles.js_background2_content_sub_fuzzy}>
					<p className={styles.js_background2_content_sub_fuzzy_p}>{data&&data.intro}</p>
				</div>
		
				<div className={styles.js_background2_photo_l} style={{top : HEIGHT_MIN * 40, height : HEIGHT_MIN * 23}}>
					<img 
						src="http://115.29.172.104/gimg/img/bcb12d99bd97a484a9ae2680e65f24bes!200" 
						className={styles.js_background2_photo_cover_left} 
					/>
					<img src={img_data&&img_data.length > 0 ? img_data[0].imgurl : null} className={styles.js_background2_photo_image_left} />
				</div>
				<div className={styles.js_background2_photo_r} style={{top : HEIGHT_MIN * 40, height : HEIGHT_MIN * 23}}>
					<img 
						src="http://115.29.172.104/gimg/img/bcb12d99bd97a484a9ae2680e65f24bes!200" 
						className={styles.js_background2_photo_cover_right} 
					/>
					<img src={img_data&&img_data.length > 1 ? img_data[1].imgurl : null} className={styles.js_background2_photo_image_right} />
				</div>

				<img 
					src="http://115.29.172.104/gimg/img/894c4cc7c1ebf7881bb050a255e384f0s!200" 
					style={{
						width:'90%',
						height:HEIGHT_MIN * 25,
						position: 'absolute',
						bottom: '1rem',
						left: '5%',
					}}
				/>
		 		<div className={styles.js_background2_content_sub_fuzzy1}>
					{
						data.course_intro&&data.course_intro.map(function(item,index) {
							return  <div key={index}>
										<p className={styles.js_background2_content_sub_fuzzy_p1}>{item}</p>
									</div>
						})	
					}
				</div>
				{
                	newIndex == index ? 
						<div>
							<div className={styles.js_planet}></div>
							<div className={styles.js_preson3}></div>
						</div> : ''
            	}
			</div>
		</div>
    );
}
export default MicroLeafletsDefault;