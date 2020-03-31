import React, {PropTypes} from 'react';
import styles from './MicroLeafletsInvitationPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,

}) {

	let expContentTextArr = data.content&&data.content.length > 0 ? data.content.split('\n') : '';

    return(
		<div className="js_invitation">
				{
					index == nIndex 
					? 
						<div className={styles.base_content}>
							<div>
								<p className={styles.page3_title}>{data.title || ''}</p>
								<div className={styles.page3_content}>
									{
										expContentTextArr&&expContentTextArr.map((item, index) => {
											return <div key={index}>{item}</div>
										})
									}
								</div>
								<div className={styles.page3_image1}></div>
								<div className={styles.page3_image2}></div>
								<div className={styles.page3_image3}></div>
								<div className={styles.page3_image4}></div>
								<div className={styles.page3_image5}></div>
							</div> 
						</div>
					: ''
				}
		</div>
    );
}
export default MicroLeafletsInvitationPage;
