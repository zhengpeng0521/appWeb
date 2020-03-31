import React, {PropTypes} from 'react';
import styles from './MicroLeafletsInvitationPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,

}) {

	let url1 = `url(${data.address_url || ''}!s300)`;

    return(
		<div className="js_invitation">
				{
					index == nIndex 
					? 
						<div className={styles.base_content}>
							<div>
								<p className={styles.page6_title}>{data.title || ''}</p>
								<div className={styles.page6_cover} style={{backgroundImage : url1}}></div> 
								<div className={styles.page6_addressAndTime}>{data.content || ''}</div>
								<div className={styles.page6_image1}></div> 
								<div className={styles.page6_image2}></div> 
								<div className={styles.page6_image3}></div> 
								<div className={styles.page6_image4}></div> 
								<div className={styles.page6_image5}></div>
							</div> 
						</div>
					: ''
				}
		</div>
    );
}
export default MicroLeafletsInvitationPage;
