import React from 'react';
import styles from './microwebsteComponent.less';
import {WingBlank, Icon} from 'antd-mobile';

function MicroMapComponent({

	address,
	callbackMap,
	
}) {
	

	return(
		<div className={styles.js_tabs1_address}>
				<WingBlank>
					<div className={styles.js_address_left}>
						<div className={styles.js_map_icon_div}>
							<Icon type="address" style={{fontSize : 40}} />
						</div>
						<p className={styles.js_tabs1_address_p} onClick={callbackMap}>{address || '无法获取地址'}</p>
					</div>
					<Icon type='right' className={styles.js_arrow}/>
					<div className={styles.js_line}></div>
				</WingBlank>
			</div>
    );
}

export default MicroMapComponent;

