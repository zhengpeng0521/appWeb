/**
 * 市场活动H5主题1
 * 默认
 */

import React, {PropTypes} from 'react';
import TechnicalDiv from '../common/TechnicalDiv';
import AdComponent from '../common/AdComponent';
import styles from './DefaultTopic.less';

function DefaultTopic({
	children, pageTitle, pageLogo,
}) {
	
	return (
		<div className={styles.topic_cont}>
			
			<div className={styles.topic_content}>
				{!!(pageLogo && pageLogo.length > 0) && <div className={styles.page_logo_cont}>
					<img className={styles.page_logo_img} src={pageLogo}/>
				</div>}
				
				{!!(pageTitle && pageTitle.length > 0) && <div className={styles.page_title_cont}>
					{pageTitle}
				</div>}
			</div>
			
			<div className={styles.form_content}
				style={{
					maxHeight: (pageLogo && pageLogo.length > 0) ? 'calc(100% - 4rem)' : 'calc(100% - 1.2rem)'
				}}
			>
				{children}
				
				<div className={styles.ad_cont}>
					<AdComponent text="我也要创建市场活动>>" href="http://192.168.1.52/zsb-web/#/scrm_market_activity?_k=5pvr3k"/>
				</div>
			</div>
			
			<div className={styles.tech_cont}>
				<TechnicalDiv />
			</div>
		</div>
	)
}

export default DefaultTopic;