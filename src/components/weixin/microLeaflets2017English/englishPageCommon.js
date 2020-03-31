import React, {PropTypes} from 'react';
import styles from './englishPage.less';
import EnglishaReaultsComponent from './englishResultsCommon';

function englishActivity({

	dp,
	data,
	index, 
	bg_url,
    newIndex,
	showMask,
	style_name,
	nextFunction,
	answer_results,
	swiperSlideClassName,
	
}) {
	
	let answerArr = data.answers || [];

	function selectResults(value) {
		if(value != undefined || value != null || value != '') {
			dp('updateState', {answer_results : value, showMask : !showMask, swiperSlideClassName : 'swiper-slide stop-swiping'});
		}
	}
	
	let bgUrl = bg_url.length > 0 ? `url(${bg_url})` || '' : '';
	
	let props = {
		dp,
		showMask,
		nextFunction,
		answer_results,
		swiperSlideClassName,
	}
		
    return(
		<div className="english_2017">
			<div className={styles.bg} style={{backgroundImage : bgUrl}}>
				<div className={style_name || ''}></div>
				{
					index == newIndex ? 
					<div>
						<div className={styles.bg234_title}>{data.title || ''}</div>
						{
							answerArr&&answerArr.map((item, index) => {
								return <div key={index} 
											className={styles.bg234_answer}
											onClick={() => selectResults(item.state)}
											style={{animationDelay: index * 300 + 'ms'}}
										>
										{item.text || ''}
										</div>
							})
						}
					</div>
					 : 
					 ''
				
				}
				{showMask ? <EnglishaReaultsComponent {...props}/> : ''}
			</div>
		</div>
    );
}
export default englishActivity;
