import React, {PropTypes} from 'react';
import styles from './MicroActivitySummerSigningPage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {

	let url1 = data.img_intro&&data.img_intro.length > 0 ? (data.img_intro[0].imgurl.length > 0 ? `url(${data.img_intro[0].imgurl}!s300)` : '') : '';
	let url2 = data.img_intro&&data.img_intro.length > 1 ? (data.img_intro[1].imgurl.length > 0 ? `url(${data.img_intro[1].imgurl}!s300)` : '') : '';

	let strArr1 = data.intro.length > 0 ? data.intro.split('\n') : '';

	return(
		<div className="summer_signing">
			<div className={styles.background_page5_image}>

				<div className={styles.bg5_top_content}>
					<p className={styles.bg2_title_p}>{data.title || ''}</p>
					<div className={styles.title_content_div}>
					{
						strArr1&&strArr1.map((item, index) => {
							return  index < 5 ? <p key={index} className={styles.bg5_title_content}>{item}</p> : ''
						})
					}
					</div>
				</div>

				<div className={styles.bg_title_left_angle}></div>
				<div className={styles.bg_title_right_angle}></div>

				<div className={styles.bg5_image_div}>
					<p className={styles.bg_title_p}>{data.title2 || ''}</p>
					<div className={styles.bg5_left_image}
						style={{
							width : document.body.clientWidth * 0.35,
							height : document.body.clientWidth * 0.35,
							backgroundImage : url1,
						}}>
					</div>
					<div className={styles.bg5_right_image}
						style={{
							width : document.body.clientWidth * 0.35,
							height : document.body.clientWidth * 0.35,
							backgroundImage : url2,
						}}>
					</div>
				</div>

				<div className={styles.bg_title_left_angle}></div>
				<div className={styles.bg_title_right_angle}></div>
				<div className={styles.bg5_person_image}></div>
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;

