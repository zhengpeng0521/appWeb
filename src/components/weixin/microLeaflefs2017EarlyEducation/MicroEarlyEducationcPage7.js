import React, {PropTypes} from 'react';
import styles from './MicroEarlyEducationcPage.less';

function MicroLeafletsInvitationPage({

	dp, data, nIndex, index,
	
}) {

	let contentTextArr = data.content&&data.content.length > 0 ? data.content.split('\n') : '';
	
    return(
		<div className="js_early_educationc">
			<div className={styles.page5_bg}>
			{
			 nIndex == index 
				?
					<div>
						<div className={styles.page2_image}>{data.title || ''}</div>
						<div className={styles.page7_content}>
							<div className={styles.page7_content_title}>{data.subTitle || ''}</div>
							<img src={data.qrImgUrl || ''} className={styles.page7_code}/>
							<div className={styles.page7_content_text}>
								{
									contentTextArr&&contentTextArr.map((item, index) => {
										return <p key={index} className={styles.page7_content_text_item}>{item}</p>
									})
								}
							</div>
						</div>
						<div className={styles.page7_person1}></div>
						<div className={styles.page7_person2}></div>
						<div className={styles.page7_image1}></div>
					</div>
				: ''
			}
			</div>
			<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
		</div> 
    );
}

export default MicroLeafletsInvitationPage;
