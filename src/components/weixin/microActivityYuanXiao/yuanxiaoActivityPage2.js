import React, {PropTypes} from 'react';
import styles from './yuanxiaoActivityPage.less';

function YuanxiaoActivity({
    obj,
    newIndex,
    index,
}) {
	let data = obj
	let dataIntro = obj.intro;
    return(
		<div className="yuanxiao_div">
			<div className={styles.background}>
				<div className={styles.background2_top_fuzzy} />
				<div className={styles.background2_p}>{data&&data.title}</div>
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
                {
                    newIndex == index ? <div className={styles.background2_yuanxiao_image}></div> : ''    
                }
			</div>
		</div>
    );
}

export default YuanxiaoActivity;
