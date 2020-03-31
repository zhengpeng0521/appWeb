/*
 *	1.成功
 *	2.失败
 *	3.（结果文案暂时只支持绑定成功和绑定失败）
 *
 */
import React from 'react';
import styles from './ResultsComponent.less';

function ResultsComponent({
	
	resultType,
	
}) {

	let caseStyle = resultType === '1' ? styles.successImage : resultType === '2' ? styles.failImage : '';
	
	return(
		<div className="results">
			<div className={styles.resultsBox}>
				<div className={caseStyle}></div>
				<div className={styles.resultsString}>{resultType === '1' ? '绑定成功' : resultType === '2' ? '绑定失败' : ''}</div>
			</div>
		</div>
    );
}

export default ResultsComponent;



