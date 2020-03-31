import React, {PropTypes} from 'react';
import styles from './microCallPhoneSecondComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {
			
	let contentArr = data.content&&data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="autumn_recruit_second">
			<div className={styles.page7_background}>
				<div className={styles.page7_top_image}></div>
				<div className={styles.page7_top_r_image}></div>
				<div className={styles.page7_title}>{data.title || ''}</div>
				<div className={styles.page7_content_box}>
					{
						contentArr&&contentArr.map((item, index) => {
							return <div key={index} className={styles.page7_text}>{item}</div>
						})
					}
					<img src={data.qrImgUrl || ''} className={styles.page7_qr_code_image} />
					<div className={styles.page7_qr_remark}>扫码关注我们哦</div>
				</div>
			</div>	
		</div>
    );
}

export default MicroCallPhoneComponent;
