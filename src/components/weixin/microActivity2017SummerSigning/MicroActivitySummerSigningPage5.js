import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroActivitySummerSigningPage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {

	let url1 = data.img_intro&&data.img_intro.length > 0 ? `url(${data.img_intro[0].imgurl}!s300)` : '';
	let url2 = data.img_intro&&data.img_intro.length > 1 ? `url(${data.img_intro[1].imgurl}!s300)` : '';
	let url3 = data.img_intro&&data.img_intro.length > 2 ? `url(${data.img_intro[2].imgurl}!s300)` : '';
	let url4 = data.img_intro&&data.img_intro.length > 3 ? `url(${data.img_intro[3].imgurl}!s300)` : '';

	return(
		<div className="summer_signing">
			<div className={styles.background_page4_image}>
				<div className={styles.bg4_title}>
					<p className={styles.bg_title_p}>{data.title}</p>
					<div className={styles.bg4_top_left_image}
						style={{
							width : document.body.clientWidth * 0.33,
							height : document.body.clientWidth * 0.33,
							backgroundImage : url1,
						}}>
					</div>
					<div className={styles.bg4_top_right_image}
						style={{
							width : document.body.clientWidth * 0.33,
							height : document.body.clientWidth * 0.33,
							backgroundImage : url2,
						}}>
					</div>
{/*第二组*/}
					<div className={styles.bg4_bottom_left_image}
						style={{
							width : document.body.clientWidth * 0.33,
							height : document.body.clientWidth * 0.33,
							backgroundImage : url3,
						}}>
					</div>
					<div className={styles.bg4_bottom_right_image}
						style={{
							width : document.body.clientWidth * 0.33,
							height : document.body.clientWidth * 0.33,
							backgroundImage : url4,
						}}>
					</div>
					<div className={styles.bg3_title_right_angle}></div>
					<div className={styles.bg3_title_left_angle}></div>
				</div>
				{
					index == nIndex ? <div className={styles.bg4_person_image}></div> : ''
				}

			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
