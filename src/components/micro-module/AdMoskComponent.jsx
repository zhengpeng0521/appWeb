import React, {PropTypes} from 'react';
import styles from './AdMoskComponent.less';

/*
 * 自定义微活动的H5渲染
 */
function AdMoskComponent({
    visible, handleClose,
}) {
	
	function adClick() {
		window.open('http://saas.ishanshan.com/saas-web/orgApplyController/redirectPage/373148570607419392', '_self');
	}
	
	return (
		<div className={visible ? styles.ad_mosk_open : styles.ad_mosk_close}>
			<div className={styles.ad_mosk_content}>
				
				<div className={styles.handle_bar_cont}>
					<img onClick={handleClose} className={styles.handle_close_btn} src="https://img.ishanshan.com/gimg/img/b6c3e1ee1eb47398a571a1489f1caca0"/>
				</div>
				
				<div className={styles.qrcode_cont}>
					
					<div className={styles.qrcode_content}>
						<div className={styles.point_img_cont}>
							<img className={styles.point_img} style={{top: '-30px'}} src="https://img.ishanshan.com/gimg/img/870be1c829c22e1e71ea2994aaba54b1" />
						</div>
						<img className={styles.qrcode_img} 		src="https://img.ishanshan.com/gimg/img/d4fddc4c503341932a32f0e72da04366" />
						
						<div className={styles.point_img_cont}>
							<img className={styles.point_img} style={{bottom: '-225px'}} src="https://img.ishanshan.com/gimg/img/fa0491bae141cb849099ceb14916e42b" />
						</div>
					</div>
					
				</div>
				
				<div className={styles.desc_text_cont}>
					<div className={styles.desc_text}>长按二维码</div>
					<div className={styles.desc_text}>海量招生神器任你选</div>
					<div className={styles.desc_text}>更多营销干货</div>
					<div className={styles.desc_text}>助力轻松引生流</div>
				</div>
				
				<div className={styles.help_text}>闪闪, 您身边贴心的招生管家</div>
				
				<div className={styles.ad_btn_cont}>
					<div className={styles.ad_btn_content} onClick={adClick}>
						点击创建我的微活动
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdMoskComponent;