import React, {PropTypes} from 'react';
import styles from './MicroEarlyEducationcPage.less';

function MicroLeafletsInvitationPage({

    data, nIndex, index, markOver, dp, 

}) {

	let stringArr = [];
	for(let i = 0; i < Object(data.content).length; i++) {
		stringArr.push(Object(data.content)[i]);
	}
	
    return(
		<div className="js_early_educationc">
			<div className={styles.page4_bg}>
				{
					nIndex == index 
					?
					<div>
						<div className={styles.page2_image}>{data.title}</div>
						<div className={styles.page4_text_div}>
							{
								stringArr&&stringArr.map((item, index) => {
									return <div key={index}
												className={styles.page4_print_text}
												style={{animationDelay : index * 100 + 'ms'}}
											>
											{item}
											</div>
								})
							}
						</div>
						<div className={styles.page4_qiqiu}></div>
						<div className={styles.page4_pencil1}></div>
						<div className={styles.page4_pencil2}></div>
						<div className={styles.page4_book}></div>
					</div>
		 			: ''
				}
			</div>
		</div>
    );
}
export default MicroLeafletsInvitationPage;
