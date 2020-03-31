import React, {PropTypes} from 'react';
import styles from './PayInfosComponent.less';
import {Carousel} from 'antd-mobile';

/*
 * 自定义微活动的支付凭证组件
 */
function PayInfosComponent({
    payInfos, visible, changePayInfosVisible,x_scale,y_scale,
}) {
	
	let pay_infos_icon_width = 90;
	let pay_infos_icon_height = pay_infos_icon_width * x_scale / y_scale;

    return (
        <div className={styles.pay_infos_cont}>
        	
        	{!!(!visible) &&
        	<div className={styles.pay_infos_icon_cont}>
        		<img onClick={changePayInfosVisible} 
        			className={styles.pay_infos_icon} 
        			src="http://img.ishanshan.com/gimg/img/03dd4f2dc85cf8e32215af4e019e6150" />
        	</div>
        	}
        	
        	<div className={visible ? styles.pay_infos_list_modal_open : styles.pay_infos_list_modal_close}>
        		
        		<div className={styles.pay_infos_list_modal_content}>
        			<div className={styles.pay_infos_list_modal_btn_cont}><div className={styles.pay_infos_list_modal_btn} onClick={changePayInfosVisible}></div></div>
        			
        			<div className={styles.pay_infos_list_cont}>
        			
        				{!!(payInfos &&payInfos.length > 1) && <div className={styles.carousel_arrow_cont}><img className={styles.carousel_arrow_img} src="http://img.ishanshan.com/gimg/img/66ca6f75b6770b8aec65131d5ec02c18" />向左滑动</div> }
        				
        				{!!(payInfos &&payInfos.length > 1) &&
        				<Carousel
				          className="my-carousel"
				          autoplay={false}
				          dots={false}
				          infinite={false}
				          selectedIndex={0}
				          swipeSpeed={35}
				          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
				          afterChange={index => console.log('slide to', index)}
				        >
        				
        				{payInfos &&payInfos.length > 0 && payInfos.map(function(item, index) {
        					
        					return (
        						<div key={'pay_infos_item_' + index} className={styles.pay_infos_item}>
        						
        							<div className={styles.pay_infos_modal_title}>
				        				支付凭证
				        			</div>
        							
		        					<div className={styles.pay_infos_item_line}>
		        						<div className={styles.pay_info_item_line_title}>支付项目:</div>
		        						<div className={styles.pay_info_item_line_text}>{item.payName}</div>
		        					</div>
		        					
		        					<div className={styles.pay_infos_item_line}>
		        						<div className={styles.pay_info_item_line_title}>支付对象:</div>
		        						<div className={styles.pay_info_item_line_text}>{item.orgName}</div>
		        					</div>
		        					
		        					<div className={styles.pay_infos_item_line}>
		        						<div className={styles.pay_info_item_line_title}>支付金额:</div>
		        						<div className={styles.pay_info_item_line_text}>¥{item.payAmount || 0}</div>
		        					</div>
		        					
		        					<div className={styles.pay_infos_item_line}>
		        						<div className={styles.pay_info_item_line_title}>报名学员:</div>
		        						<div className={styles.pay_info_item_line_text}>{item.babyName}</div>
		        					</div>
		        					
		        					<div className={styles.pay_infos_item_line}>
		        						<div className={styles.pay_info_item_line_title}>支付时间:</div>
		        						<div className={styles.pay_info_item_line_text}>{item.payTime}</div>
		        					</div>
		        					
		        					<div className={styles.pay_infos_item_line}>
		        						<div className={styles.pay_info_item_line_title}>支付状态:</div>
		        						<div className={styles.pay_info_item_line_text}>{item.payStatus}</div>
		        					</div>
		        					<div className={styles.pay_infos_item_line} style={{height: '30px'}}></div>
		        				</div>
        					)
        				})}
        				
        				 </Carousel>
        				}
        				
        				{!!(payInfos &&payInfos.length == 1) &&
        					<div key={'pay_infos_item_' + 1} className={styles.pay_infos_item}>
        						
    							<div className={styles.pay_infos_modal_title}>
			        				支付凭证
			        			</div>
    							
	        					<div className={styles.pay_infos_item_line}>
	        						<div className={styles.pay_info_item_line_title}>支付项目:</div>
	        						<div className={styles.pay_info_item_line_text}>{payInfos[0].payName}</div>
	        					</div>
	        					
	        					<div className={styles.pay_infos_item_line}>
	        						<div className={styles.pay_info_item_line_title}>支付对象:</div>
	        						<div className={styles.pay_info_item_line_text}>{payInfos[0].orgName}</div>
	        					</div>
	        					
	        					<div className={styles.pay_infos_item_line}>
	        						<div className={styles.pay_info_item_line_title}>支付金额:</div>
	        						<div className={styles.pay_info_item_line_text}>¥{payInfos[0].payAmount || 0}</div>
	        					</div>
	        					
	        					<div className={styles.pay_infos_item_line}>
	        						<div className={styles.pay_info_item_line_title}>报名学员:</div>
	        						<div className={styles.pay_info_item_line_text}>{payInfos[0].babyName}</div>
	        					</div>
	        					
	        					<div className={styles.pay_infos_item_line}>
	        						<div className={styles.pay_info_item_line_title}>支付时间:</div>
	        						<div className={styles.pay_info_item_line_text}>{payInfos[0].payTime}</div>
	        					</div>
	        					
	        					<div className={styles.pay_infos_item_line}>
	        						<div className={styles.pay_info_item_line_title}>支付状态:</div>
	        						<div className={styles.pay_info_item_line_text}>{payInfos[0].payStatus}</div>
	        					</div>
	        					<div className={styles.pay_infos_item_line} style={{height: '30px'}}></div>
	        				</div>
        				}
        				
        			</div>
        		</div>
        	</div>
        </div>
    );
}

export default PayInfosComponent;
