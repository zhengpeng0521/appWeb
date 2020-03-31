import React, {PropTypes} from 'react';
import styles from './microFatherDayPage.less';

function MicroMotherDayComponent({

	index, nIndex, data,

}) {

	return(
		<div className="mather">
			<div className={styles.father_background}>
				<div className={styles.bg_title_image}>
					<div className={styles.bg_title}>{data.title}</div>
				</div>
				<div className={styles.bg2_content}>
					<div className={styles.bg_content_div}>
					{
						data.intro.map((item, index) => {
							return  <div key={index}>
										<p className={styles.bg2_label} style={{width : 'calc(30% - 20px)'}}>{item.label}</p>
										<p className={styles.bg2_value} style={{width : 'calc(70% - 20px)'}}>{item.value}</p>
									</div>
						})
					}
					</div>
				</div>
				{
					index == nIndex ? <div className={styles.bg2_image}></div> : ''
				}
			</div>
		</div>
    );
}

export default MicroMotherDayComponent;
