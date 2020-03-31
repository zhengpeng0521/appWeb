import React from 'react';
import styles from './microwebsteComponent.less';
import { WingBlank, WhiteSpace, Toast, Icon } from 'antd-mobile';
import { matchingIcon } from '../../../utils/iconMatching.js';

function MicroLayoutComponent({

	data,
	title,

}) {

	//	if(data&&data.length == 0 || data == undefined) {
	//		Toast.info('数据不能为空', 2, null, false);
	//		return 	<div></div>
	//	}

	if (title == null || title == undefined || title == 'null' || title == "") {
		Toast.info('title未传入', 2, null, false);
	}

	//计算设施余数和行数
	let facilitiesRowCount = parseInt(data && data.length / 6) || 0;
	let facilitiesRemainderCount = data && data.length % 6 || 0;
	facilitiesRowCount = facilitiesRemainderCount > 0 ? facilitiesRowCount + 1 : facilitiesRowCount;
	return (
		<div className={styles.js_facilities} style={{ height: ((w - 40) / 6 + 20) * facilitiesRowCount + 80 }}>
			<WingBlank size="md">
				<div className={styles.js_blue_box}></div><p className={styles.js_title}>{title || '请在外面写入title'}</p>
				{
					data && data.length > 0 && data.map(function (item, index) {
						let icon = matchingIcon(item);
						return <div key={index}
							className={styles.js_facilities_item}
							style={{ width: (w - 40) / 6, height: (w - 40) / 6 + 20 }}>
							<div className={styles.js_facilities_icon_div}>
								<svg aria-hidden="true"
									style={{
										height: 45,
										width: 45,
										marginTop: 14,
										color: 'white',
									}}
								>
									<use xlinkHref={`#anticon-${icon}`}></use>
								</svg>
							</div>
							<p className={styles.js_facilities_title} style={{ width: '100%' }}>{item}</p>
						</div>
					})
				}
			</WingBlank>
		</div>
	);
}

export default MicroLayoutComponent;



