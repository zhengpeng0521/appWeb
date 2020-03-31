import React, {PropTypes} from 'react';
import styles from './microMotherDayPage.less';


function MicroMotherDayComponent({

	index, nIndex, data

}) {

	return(
		<div className="mather">
			<div className={styles.mather_background}>
				<div className={styles.user_header_border_image}></div>
				<div className={styles.user_header} style={{backgroundImage : `url(${data.imgUrl}!s300)`, left : 'calc(50% - 110px)'}}></div>
				<div className={styles.bg_title}>{data.title}</div>
				<div className={styles.bg1_right_box}>
					<div className={styles.bg1_right_box_content}>
						<div className={styles.bg3_content_div}>
							<p className={styles.bg1_right_box_content_text}>{data.sub_title}</p>
						</div>
					</div>
				</div>
				{
					index == nIndex ? <div className={styles.bg_person_image}></div> : ''
				}
			</div>
		</div>
    );
}

export default MicroMotherDayComponent;

/*
	背景
	http://115.29.172.104/gimg/img/5c5d5195e472dc294a721820ce741d28
	首页
	http://115.29.172.104/gimg/img/4ff74cb02249a94cc1bae9c9fe483ea5
	二夜
	http://115.29.172.104/gimg/img/25426b0e00ad2f9a99a6f9ec0cf256c9
	三爷
	http://115.29.172.104/gimg/img/f9c40a3c3ee1972793a39f74fb5b35c6
	四爷
	http://115.29.172.104/gimg/img/140e006bf82fa690ad5dbde388327e2a
	http://115.29.172.104/gimg/img/2d147a9a886a8b0aa564589e0c870461
	物业
	http://115.29.172.104/gimg/img/e875f173e736a2a5b72707049f741ee8
	http://115.29.172.104/gimg/img/256a1737f95f7b3f9eb2ad2d0d9a359b
*/
