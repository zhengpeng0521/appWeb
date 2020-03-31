import React, {PropTypes} from 'react';
import styles from './MicroEarlyEducationcPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,

}) {
		
	let url = `url(${data.head_imgUrl || ''})`;

	return(
		<div className="js_early_educationc">
			<div className={styles.page1_bg}>
								<div className={styles.page1_header_image} style={{backgroundImage : url}}></div>
			{
				nIndex == index 
					? 
							<div>
								<div className={styles.page1_image_deng_l}></div>
								<div className={styles.page1_image_deng_r}></div>
								<div className={styles.page1_image_student_table_l}></div>
								<div className={styles.page1_image_student_table_r}></div>
								<div className={styles.page1_image_teacher_table}></div>
								<div className={styles.page1_image_teacher}></div>
								<div className={styles.page1_image_pencil}></div>
								<div className={styles.page1_image_kuang}>
									<div className={styles.page1_title}>
										{data.sub_title || ''}
									</div>
									<div className={styles.page1_sub_title}>
										{data.title || ''}
									</div>
								</div>
							</div>
					: 
						""
			}
			</div>
		</div>
    );
}

export default MicroLeafletsInvitationPage;