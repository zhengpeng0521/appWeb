import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroActivitySummerSigningPage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {

    let image1 = data.img_intro&&data.img_intro.length > 0 ? (data.img_intro[0].imgurl.length > 0 ? `url(${data.img_intro[0].imgurl}!s300)` : '') : '';
    let image2 = data.img_intro&&data.img_intro.length > 1 ? (data.img_intro[1].imgurl.length > 0 ? `url(${data.img_intro[1].imgurl}!s300)` : '') : '';
    let image3 = data.img_intro&&data.img_intro.length > 2 ? (data.img_intro[2].imgurl.length > 0 ? `url(${data.img_intro[2].imgurl}!s300)` : '') : '';

	let sty = {
		height : document.body.clientWidth * 0.32,
		width : document.body.clientWidth * 0.32,
	}
	return(
		<div className="summer_signing">
			<div className={styles.background_page3_image}>
				<div className={styles.bg3_title}>
					<p className={styles.bg_title_p}>{data.title || ''}</p>
					{/*第一组*/}
					{
						(data.title1&&data.title1.length != 0 || image1.length != 0) ?
							<div>
								<div className={styles.bg3_left_text_div} style={sty}>
									<p className={styles.bg3_left_text_div_p}>{data.title1 || ''}</p>
								</div>
								<div className={styles.bg3_right_image_div}
									style={{
										height : document.body.clientWidth * 0.32,
										width : document.body.clientWidth * 0.32,
										backgroundImage : image1,
									}}>
								</div>
							</div> : ''
					}
					{/*第二组*/}
					{
						(data.title2&&data.title2.length != 0 || image2.length != 0) ?
							<div>
								<div className={styles.bg3_left_image_div}
									style={{
										height : document.body.clientWidth * 0.32,
										width : document.body.clientWidth * 0.32,
										backgroundImage : image2,
									}}>
								</div>
								<div className={styles.bg3_right_text_div} style={sty}>
									<p className={styles.bg3_right_text_div_p}>{data.title2 || ''}</p>
								</div>
							</div> : ''
					}
					{/*第三组*/}
					{
						(data.title3&&data.title3.length != 0 || image3.length != 0) ?
							<div>
								<div className={styles.bg3_left_text_div} style={sty}>
									<p className={styles.bg3_left_text_div_p}>{data.title3 || ''}</p>
								</div>
								<div className={styles.bg3_right_image_div}
									style={{
										height : document.body.clientWidth * 0.32,
										width : document.body.clientWidth * 0.32,
										backgroundImage : image3,
									}}>
								</div>
							</div> : ''
					}
					<div className={styles.bg3_title_right_angle}></div>
					<div className={styles.bg3_title_left_angle}></div>
				</div>

				<div className={styles.bg3_little_mermaid_image}></div>
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
