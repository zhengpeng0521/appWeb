import React, {PropTypes} from 'react';
import styles from './MicroEarlyEducationcPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,

}) {

//	let expContentTextArr = data.content&&data.content.length > 0 ? data.content.split('\n') : '';

    return(
		<div className="js_early_educationc">
			<div className={styles.page3_bg}>
			{
				nIndex == index 
					? 
						<div>
							<div className={styles.page2_image}>{data.title || ''}</div>
							<div className={styles.page3_content}>
								<div className={styles.page3_content_text}>
									{data.content || ''}
								</div>
							</div>
							<div className={styles.page3_image_brush}></div>
							<div className={styles.page3_image_person_female}></div>
							<div className={styles.page3_image_person_man}></div>
							<div className={styles.page3_image_red}></div>
							<div className={styles.page3_image_yellow}></div>
							<div className={styles.page3_image_blue}></div>
						</div>
					: 
						''
			}
			</div>
		</div>
    );
}
export default MicroLeafletsInvitationPage;
