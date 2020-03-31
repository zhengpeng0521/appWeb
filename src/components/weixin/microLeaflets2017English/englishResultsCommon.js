import React, {PropTypes} from 'react';
import styles from './englishPage.less';

function englishActivity({

	dp,
	showMask,
	answer_results,
	swiperSlideClassName,
	nextFunction,
	
}) {
	
	function hidden_mask(type) {
		dp('updateState', {showMask : !showMask, swiperSlideClassName : 'swiper-slide'})
		if(type === 1) {
			nextFunction();
		}
	}

	let sty = showMask ? styles.show_mask : styles.hidden_mask;
	
	let resultsStyle = answer_results == 1 || answer_results == '1' ? styles.correct : styles.error; 
    return(
		<div className="english_2017">
			<div className={sty}>
				<div className={styles.mask_dabai}>
				<div className={resultsStyle}></div>
				</div>
				{
					answer_results == 1 || answer_results == '1' ? 
						<div className={styles.next} onClick={() => hidden_mask(1)} 
							style={{
								color : answer_results == 1 || answer_results == '1' ? "#1fa803" : "#f75811",
								border : answer_results == 1 || answer_results == '1' ? "1px #1fa803 solid" : "1px #f75811 solid",
							}}
						>下一页</div>
					:
					<div>
						<div className={styles.top_page} onClick={() => hidden_mask()}>返回</div>
						<div className={styles.next_page} onClick={() => hidden_mask(1)}>下一页</div>
					</div>
				}
			</div>
		</div>
    );
}
export default englishActivity;
