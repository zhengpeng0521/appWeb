import React from 'react';
import styles from './VipCardInfoComponent.less';
import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

function VipCardInfoComponent({
	vipCardInfo,
}){
    let periodCourseList =!!vipCardInfo && vipCardInfo.periodCourseList;
	return(
		<div className = { styles.card_info_wrap }>
			{ !!vipCardInfo.cardId ?
				<div style = {{ height : '100%', width : '100%' }}>
					<div className = { styles.card_base_info } >
						<div className = { styles.card_base_info_content }>
							<p className = { styles.card_base_info_item }>
								<span className = { styles.card_base_info_item_label } >适用学员 : </span>
								<span className = { styles.card_base_info_item_value } >{ !!vipCardInfo && vipCardInfo.stuName || '暂无' }</span>
							</p>
							<p className = { styles.card_base_info_item }>
								<span className = { styles.card_base_info_item_label } >适用家长 : </span>
								<span className = { styles.card_base_info_item_value } >{ !!vipCardInfo && vipCardInfo.parentName || '暂无' }</span>
							</p>
							<p className = { styles.card_base_info_item }>
								<span className = { styles.card_base_info_item_label } >所属校区 : </span>
								<span className = { styles.card_base_info_item_value } >{ !!vipCardInfo && vipCardInfo.orgName || '暂无' }</span>
							</p>
							<p className = { styles.card_base_info_item }>
								<span className = { styles.card_base_info_item_label } >创建时间 : </span>
								<span className = { styles.card_base_info_item_value } >{ !!vipCardInfo && vipCardInfo.createTime || '暂无' }</span>
							</p>
							<p className = { styles.card_num } >
								<span className = { styles.card_base_info_item_label } >会员卡号 : </span>
								<span className = { styles.card_base_info_item_value } >{ !!vipCardInfo && vipCardInfo.cardId || '暂无' }</span>
							</p>
						</div>
					</div>
					<div className = { styles.card_all_info } >
						<div className = { styles.card_all_info_content }>
							<p className = { styles.card_all_info_item }>
								<span className = { styles.card_all_info_item_label }>总课时 ( 赠送 ) : </span>
								<span className = { styles.card_all_info_item_value }>{ ( !!vipCardInfo && vipCardInfo.periodAll || 0 ) + ' ( ' + ( !!vipCardInfo && vipCardInfo.periodExt || 0 ) + ' )' }</span>
							</p>
							<p className = { styles.card_all_info_item }>
								<span className = { styles.card_all_info_item_label }>剩余课时 : </span>
								<span className = { styles.card_all_info_item_value }>{ !!vipCardInfo && vipCardInfo.periodLeft || 0 }</span>
							</p>
                            <div className = { styles.card_all_info_detail}>
                                <div className = { styles.card_all_info_detail_title}>
                                    <p>课时类型</p><p>剩余课时</p>
                                </div>
                                <ul className = { styles.card_all_info_detail_list}>
                                    {!!vipCardInfo && !!vipCardInfo.periodCourseList && periodCourseList.length>0?periodCourseList.map((item,index)=>{
                                            return <li className = { styles.card_all_info_detail_item} key={index}><p>{item.courseName}</p><p>{(item.periodLeft).toFixed(2)}</p></li>
                                        })
                                     :
                                        <li className = { styles.card_all_info_detail_items}>无</li>
                                    }

                                </ul>
                            </div>
							<p className = { styles.card_all_info_item }>
								<span className = { styles.card_all_info_item_label }>可用课时 : </span>
								<span className = { styles.card_all_info_item_value }>{ !!vipCardInfo && vipCardInfo.periodAvailable || 0 }</span>
							</p>
							<p className = { styles.card_all_info_item }>
								<span className = { styles.card_all_info_item_label }>已预约课时 : </span>
								<span className = { styles.card_all_info_item_value }>{ !!vipCardInfo && vipCardInfo.periodFreeze || 0 }</span>
							</p>
							<p className = { styles.card_all_info_item }>
								<span className = { styles.card_all_info_item_label }>已消耗课时 : </span>
								<span className = { styles.card_all_info_item_value }>{ !!vipCardInfo && vipCardInfo.periodExpend || 0 }</span>
							</p>
							<p className = { styles.card_all_info_item }>
								<span className = { styles.card_all_info_item_label }>已退课时 : </span>
								<span className = { styles.card_all_info_item_value }>{ !!vipCardInfo && vipCardInfo.periodRefund || 0 }</span>
							</p>
                            <p className = { styles.card_all_info_item }>
								<span className = { styles.card_all_info_item_label }>积分 : </span>
								<span className = { styles.card_all_info_item_value }>{ !!vipCardInfo && vipCardInfo.integral || 0 }</span>
							</p>
						</div>
						{/* <p className = { styles.card_balance }>
							<span className = { styles.card_all_info_item_label }>余额 : </span>
							<span style = {{ color : '#D41318' }}>{ ( !!vipCardInfo && vipCardInfo.balance || 0 ) + '元' }</span>
						</p> */}
					</div>
				</div>
				:
				<PlaceHolderComponent tips = '暂无会员卡~' />
			}
		</div>
	)
}

export default VipCardInfoComponent;


