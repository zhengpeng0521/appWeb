import React, {PropTypes} from 'react';
import styles from './MicroLeafletsInvitationPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,

}) {

	let url1 = `url(${data.img_intro&&data.img_intro.length > 0 ? data.img_intro[0].imgurl : ''}!s300)`;
	let url2 = `url(${data.img_intro&&data.img_intro.length > 1 ? data.img_intro[1].imgurl : ''}!s300)`;
	
    return(
		<div className="js_invitation">
				{
					index == nIndex 
					? 
						<div className={styles.base_content}>
							<div>
								<p className={styles.page5_title}>{data.title || ''}</p>
								<div className={styles.page5_cover1} style={{backgroundImage : url1}}></div> 
								<div className={styles.page5_cover2} style={{backgroundImage : url2}}></div> 
								<div className={styles.page5_image1}></div> 
								<div className={styles.page5_image2}></div> 
								<div className={styles.page5_image3}></div> 
								<div className={styles.page5_image4}></div> 
							</div> 
						</div>
					: ''
				}
		</div>
    );
}
export default MicroLeafletsInvitationPage;
