import React, {PropTypes} from 'react';
import styles from './microCallPhoneSecondComponent.less';

function MicroCallPhoneComponent({

	index, nIndex, data,

}) {

	return(
		<div className="autumn_recruit_second">
			<div className={styles.page5_background}>
				<div className={styles.page5_top_image}></div>
				<div className={styles.page5_common_top_title}>{data.title || ''}</div>
				{
					data.intro&&data.intro.map((item, index) => {
						return <div key={index} >
									<div className={styles.page5_info}>{item.value}</div>
								</div>
					})
				}
			</div>
		</div>
    );
}

export default MicroCallPhoneComponent;
