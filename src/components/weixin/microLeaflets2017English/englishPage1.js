import React, {PropTypes} from 'react';
import styles from './englishPage.less';

function EnglishActivity({

    data, newIndex, index,

}) {

	let headerImageUrl = 'url(' + data.head_imgUrl + ')';

	return(
		<div className="english_2017">
			<div className={styles.bg1_bg} style={newIndex == index ? {paddingBottom : '1rem'} : {paddingBottom : '0rem'}}>
				<div className={styles.bg1_header_image}>
				{
					newIndex == index
						? 
						<div className={styles.headerAndBorder_div}>
							<div className={styles.header_border2}></div>
							{/*<div className={styles.header_border1}></div>*/}
							<div className={styles.header} style={{backgroundImage : headerImageUrl}}></div>
						</div>
		 				: ''
				}
				</div>
				<div className={styles.bg1_polygon_div}>
					<svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<polygon points="0, 0 4650,2000 0, 2000" style={{fill:'#a80909', fillOpacity : '0.8', fillWidth : 1}} />
					>
					</svg>
				</div>
				<div className={styles.bg1_content}>
					<div className={styles.bg1_title}>{data.title || ''}</div>
					<p className={styles.bg1_subtitle}>{data.sub_title || ''}</p>
				</div>
			</div>
		</div>
    );
}

export default EnglishActivity;