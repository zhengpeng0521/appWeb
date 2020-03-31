import React, {PropTypes} from 'react';
import styles from './MicroLeafletsInvitationPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,

}) {

	return(
		<div className="js_invitation">
				{
					index == nIndex 
					? 
						<div className={styles.base_content}>
							<div>
								<div className={styles.page1_image1}></div>
								<div className={styles.page1_image2}></div>
								<div className={styles.page1_image3}></div>
								<div className={styles.page1_image4}></div>
								<div className={styles.page1_image5}></div>
								<div className={styles.page1_text_content}>
									<p className={styles.page1_text1}>{data.title || ''}</p>
									<p className={styles.page1_text2}>{data.sub_title || ''}</p>
									<div className={styles.page1_text345}>
										<p className={styles.page1_text3}>{data.content&&data.content[0] || ''}</p>
										<p className={styles.page1_text4}>{data.content&&data.content[1] || ''}</p>
										<p className={styles.page1_text5}>{data.content&&data.content[2] || ''}</p>
									</div>
								</div>
							</div> 
						</div>
					: ''
				}
		</div>
    );
}

export default MicroLeafletsInvitationPage;