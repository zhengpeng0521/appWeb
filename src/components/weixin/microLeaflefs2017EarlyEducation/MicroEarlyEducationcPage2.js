import React, {PropTypes} from 'react';
import styles from './MicroEarlyEducationcPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,
	
}) {

    return(
		<div className="js_early_educationc">
			<div className={styles.page2_bg}>
				{
					nIndex == index 
						? 
							<div>
								<div className={styles.page2_image}>{data.title || ''}</div>
								{
									data.img_intro&&data.img_intro.map((item, index)=> {
										let url = `url(${item.imgurl || ''})`;
										return  <div className={styles.page2_image_div} key={index}>
													<div className={styles.page2_image_content} style={{backgroundImage : url}}>
														<div className={styles.page2_image_content_border} 
															 style={(index != 1 || index != 2) ? {animationDelay : 0.5} : {animationDelay : 0}}>
														</div>
													</div>
												</div>
									})
								}
								<div className={styles.page2_image_star}></div>
								<div className={styles.page2_image_person_female}></div>
								<div className={styles.page2_image_person_man}></div>
								<div className={styles.page2_image_applause}></div>
								<div className={styles.page2_image_book}></div>
								<div className={styles.page2_image_potted}></div>
							</div>
						: 
						''
				}
			</div>
		</div>
    );
}
export default MicroLeafletsInvitationPage;
