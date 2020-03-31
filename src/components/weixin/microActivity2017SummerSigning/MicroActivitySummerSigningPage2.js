import React, {PropTypes} from 'react';
import styles from './MicroActivitySummerSigningPage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {

	let strArr1 = data.content.length > 0 ? data.content.split('\n') : '';
	let strArr2 = data.content2.length > 0 ? data.content2.split('\n') : '';

	return(
		<div className="summer_signing">
			<div className={styles.background_page2_image}>
				<div className={styles.bg2_top_content}>
					<p className={styles.bg2_title_p}>{data.title || ''}</p>
					<div className={styles.title_content_div}>
						{
							strArr1&&strArr1.map((item, index) => {
								return  index < 5 ? <p key={index} className={styles.bg2_title_content}>{item}</p> : ''
							})
						}
					</div>
				</div>
				<div className={styles.bg_title_left_angle}></div>
				<div className={styles.bg_title_right_angle}></div>
				<div className={styles.bg2_bottom_content}>
					<p className={styles.bg_title_p}>{data.title2 || ''}</p>
					<div className={styles.title_content_div}>
						{
							strArr2&&strArr2.map((item, index) => {
								return  index < 5 ? <p key={index} className={styles.bg2_title_content}>{item}</p> : ''
							})
						}
					</div>
				</div>
				<div className={styles.bg_title_left_angle}></div>
				<div className={styles.bg_title_right_angle}></div>
				{
					index == nIndex ?
						<div>
							<div className={styles.bg2_haitun_image}></div>
							<div className={styles.bg2_person_image}></div>
						</div>
						: ''
				}
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;

