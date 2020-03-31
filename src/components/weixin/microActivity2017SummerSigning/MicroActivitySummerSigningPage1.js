import React, {PropTypes} from 'react';
import styles from './MicroActivitySummerSigningPage.less';


function MicroSummerSigningComponent({

	index, nIndex, data, initWindowHeight,

}) {

	let seagulls = (
		<animateMotion dur="6s" repeatCount="indefinite" rotate="auto" >
		   <mpath xlinkHref="#theMotionPath"/>
		</animateMotion>
	)

	let url = data.imgUrl.length > 0 ? `url(${data.imgUrl}!s300)` : '';
	return(
		<div className="summer_signing">
			<div className={styles.background_page1_image}>
				<div className={styles.header_image} style={{backgroundImage : url}}></div>
				<svg
					width="100%"
					height={initWindowHeight * 0.48}
		    		xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					style={{position : "relative"}}
				>
					<path d="M16.062,344.000 C16.062,344.000 299.062,393.000 324.062,225.000 C347.062,108.000 467.062,107.000 536.062,130.000 C605.062,153.000 375.062,-74.000 155.062,28.000 C-64.938,130.000 16.062,344.000 16.062,344.000 Z"
							stroke="lightgrey"
							strokeWidth="0"
							fill="none"
							id="theMotionPath"/>

					<path fill="#FFFFFF" d="M47,36c0,0-3.2-18.4,1.4-23.2c4.6-4.8-12-4.6-35.1-6c0,0,29.5,7.3,28.1,30.5l-7.1,1.4l6.9,11.6l2.7-9.6c0,0,24,2.1,24.6,31.5c0,0,7-17.2-0.6-36.7C67.9,35.4,54,41.1,47,36z">
					{seagulls}
					</path>
					<path d="M38.4,8.2c0,0-16.7-1.1-25.1-1.5c0,0,15.4,6,18.4,9.5l-1.5-3.2l2.1-0.2l-0.8-1.4C31.5,11.5,32.3,9.3,38.4,8.2z">
					{seagulls}
					</path>
					<path d="M61.6,50.7c0,0,7.5,10.6,6.8,21.4c0,0,4.2-9.3,2.6-23.5l-1.4,2.5l-1.2-2.5l-0.3,2.2l-2.4-2.7l-0.4,3.2L61.6,50.7z">
					{seagulls}
					</path>
				</svg>
				<div className={styles.bg_title}>
					<p className={styles.bg_title_p}>{data.title || ''}</p>
					<p className={styles.bg_title_content}>{data.sub_title || ''}</p>
				</div>
				<div className={styles.bg_title_left_angle}></div>
				<div className={styles.bg_title_right_angle}></div>
				{
					index == nIndex ?
						<div>
							<div className={styles.pangxie_ani}></div>
							<div className={styles.persons_ani}></div>
						</div>: ''
				}
			</div>
		</div>
    );
}

export default MicroSummerSigningComponent;
