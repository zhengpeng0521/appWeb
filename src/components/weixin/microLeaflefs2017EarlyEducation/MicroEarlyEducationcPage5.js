import React, {PropTypes} from 'react';
import styles from './MicroEarlyEducationcPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index,

}) {
	
	let imageArr = [
		{url : `url(${data.img_intro.length > 0 ? data.img_intro[0].imgurl : ''})`, text : data.sub_title2 || ''},
		{url : `url(${data.img_intro.length > 1 ? data.img_intro[1].imgurl : ''})`, text : data.sub_title3 || ''},
		{url : `url(${data.img_intro.length > 2 ? data.img_intro[2].imgurl : ''})`, text : data.sub_title4 || ''}
	]
			
    return(
		<div className="js_early_educationc">
			<div className={styles.page5_bg}>
			{
				 nIndex == index 
					?
						<div>
							<div className={styles.page2_image}>{data.title || ''}</div>
							{
								imageArr&&imageArr.map((item, index) => {
									return <div key={index}>
												<div className={styles.page5_cover} 
													style={{
														backgroundImage : item.url,
														animationDelay : 300 * index++ + 'ms'
													}}
												>
												</div>
												<div className={styles.page5_text}
													style={{
														animationDelay : 150 * index++ + 'ms'
													}}
												>
													{item.text}
												</div>
											</div>
								})
							}
							<div className={styles.page5_person1}></div>
							<div className={styles.page5_person2}></div>
						</div>
					: ''
			}
			</div>
		</div>
    );
}
export default MicroLeafletsInvitationPage;
