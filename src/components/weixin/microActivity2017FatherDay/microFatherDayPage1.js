import React, {PropTypes} from 'react';
import styles from './microFatherDayPage.less';


function MicroMotherDayComponent({

	index, nIndex, data

}) {

	let url = `url(${data.imgUrl}!s300)`;
	return(
		<div className="mather">
			<div className={styles.father_background}>
				<div className={styles.user_header} style={{backgroundImage : url, left : 'calc(50% - 110px)'}}></div>
				<div className={styles.title_image}>
					<div className={styles.bg_title}>{data.title}</div>
				</div>

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
	http://115.29.172.104/gimg/img/693db2da97355b7ef549216bb047932e
	框
	http://115.29.172.104/gimg/img/d72a6fb0ab9e5970003547ea7c743ecc
	一夜
	http://115.29.172.104/gimg/img/c072ad2fd3f1ce80966617c6df70302b
	二夜
	http://115.29.172.104/gimg/img/a1f62e21a930859f774bf9b56f857902
	三爷
	http://115.29.172.104/gimg/img/7128fbd609ee6166166659674689eb0a

*/
