import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './MicroLeafletsDancePage.less';

function MicroSummerSigningComponent({

	index, nIndex, data,

}) {

	let textArr = data.content.length > 0 ? data.content.split('\n') : '';

	return(
		<div className="base_dance">
			<div className={styles.background_page5_image}>
				<div className={styles.page5_title}>{data.title || ''}</div>
				<div className={styles.page2_box_img}>
					<img src={data.qrUrl} className={styles.page5_qr_code} />
					{
						textArr&&textArr.map((item, index) => {
							return <p key={index} className={styles.page2_content}>{item}</p>
						})
					}
				</div>
				<div className={styles.page5_person_image}></div>
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
