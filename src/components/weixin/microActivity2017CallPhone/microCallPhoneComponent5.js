import React, {PropTypes} from 'react';
import { InputItem } from 'antd-mobile';
import styles from './microCallPhoneComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	return(
		<div className="call_phone">
			<div className={styles.page5_background}>
				<div className={styles.common_top_img}>
					<div className={styles.common_top_title}>{data.title || ''}</div>
				</div>
				{
					data.intro&&data.intro.map((item, index) => {
						return <div key={index} >
									<div className={styles.page5_header_icon}></div>
									<div className={styles.page5_info}>{item.value}</div>
								</div>
					})
				}
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
