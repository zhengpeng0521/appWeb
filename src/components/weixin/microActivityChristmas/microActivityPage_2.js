import React, {PropTypes} from 'react';
import styles from './microActivity.less';

function MicroActivity({
	detailData,
    obj,
}) {
	let data = obj
	let dataIntro = obj.intro;
    return(
		<div className="content-base">
			<div className={styles.microActivity_background_image2}>
				<div className={styles.background2_top_fuzzy} />
				<div className={styles.background2_p}>{data&&data.title}</div>
				<div src="src/assets/weixin/microActivity/bell@2x.png" className={styles.background2_top_image} />
				<div className={styles.background2_center_fuzzy} />
				<div className={styles.background2_subdiv_center_fuzzy}>
					<p className={styles.background2_content_title_p}>{data&&data.sub_title}</p>
					{
						dataIntro&&dataIntro.map(function(item, index) {
							return  <div key={index}>
										<p className={styles.background2_content_key}>{item.label}:</p>
										<p className={styles.background2_content_value}>{item.value}</p>
									</div>
						})
					}
				</div>
			</div>
		</div>
    );
}

MicroActivity.propTypes = {
	detailData : PropTypes.any,
};

export default MicroActivity;
