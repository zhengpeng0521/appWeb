import React from 'react';
import styles from './ContractDetailComponent.less';
import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';

function ContractDetailComponent({
	contractDetailInfo,      //合同详情
}){
	let productList = [];
	if( !!contractDetailInfo.classpkg || !!contractDetailInfo.teachTools ){
		let classpkg = contractDetailInfo.classpkg || [];
		let teachTools = contractDetailInfo.teachTools || [];
		productList = [ ...classpkg, ...teachTools ];
	}
	let stuInfo = contractDetailInfo.stuInfo;

	return(
		<div className = { styles.contract_detail_wrap }>
			<div className = { styles.contract_detail_box_top } >
				<p className = { styles.contract_order_number }>
					<span>合同编号 : </span>
					<span>{ contractDetailInfo.orderNum || '暂无' }</span>
				</p>
			</div>
			<div className = { styles.contract_detail_box_middle }>
				<div className = { styles.contract_detail_box_middle_box }>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>所属校区 : </span>
						<span className = { styles.contract_detail_item_value }>{ contractDetailInfo.orgName || '暂无' }</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>签约家长 : </span>
						<span className = { styles.contract_detail_item_value }>{ contractDetailInfo.parentName || '暂无' }</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>会员卡号 : </span>
						<span className = { styles.contract_detail_item_value }>{ contractDetailInfo.stuCardId || '暂无' }</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>所选学员 : </span>
						<span className = { styles.contract_detail_item_value }>
							{ !!stuInfo && stuInfo.map(function( item, index ){
								return ( <span key = { 'order_detail_stu' + index } style = {{ marginRight : '5px' }} className = { styles.item_text }>{ item.stuName || '' }</span> )
							})}
						</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>合同期限 : </span>
						<span className = { styles.contract_detail_item_value }>
							{ (!!contractDetailInfo.startTime && contractDetailInfo.startTime + ' ~ ' + contractDetailInfo.endTime) || '暂无' }
						</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>合同类型 : </span>
						<span className = { styles.contract_detail_item_value }>{ contractDetailInfo.type == '1' ? '充值' : contractDetailInfo.type == '2'  ? '课时包' : '暂无' }</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>购买类型 : </span>
						<span className = { styles.contract_detail_item_value }>{ contractDetailInfo.signType == '0' ? '新签约' : contractDetailInfo.signType == '1' ? '续约' : '暂无' }</span>
					</p>
				</div>
				<div className = { styles.contract_detail_box_middle_product } >
					<ul className = { styles.contract_detail_product_header } >
						<li className = { styles.product_header_item } style={{width: '30%', textAlign: 'left'}}>商品名称</li>
						<li className = { styles.product_header_item } style={{width: '22%'}}>原价*数量</li>
						<li className = { styles.product_header_item } style={{width: '30%'}}>优惠</li>
						<li className = { styles.product_header_item } style={{width: '18%'}}>价格(元)</li>
					</ul>
					{ productList.length > 0 && productList.map(function(item, index){
						return (
							<ul className = { styles.contract_detail_product } >
								<li className = { styles.product_item } style={{width: '30%'}}><div style={{textAlign: 'left'}}>{ item.name || '暂无' }</div></li>
								<li className = { styles.product_item } style={{width: '22%'}}><div style={{textAlign: 'center', width: '100%'}}>{ item.price + ' * ' + item.amount }</div></li>
								<li className = { styles.product_item } style={{width: '30%'}}><div style={{textAlign: 'center', width: '100%'}}>{ item.preferentialPrice || '暂无' }</div></li>
								<li className = { styles.product_item } style={{width: '18%'}}><div style={{textAlign: 'center', width: '100%'}}>{ item.money || '暂无' }</div></li>
							</ul>
						)
					})}
				</div>
				<div className = { styles.contract_detail_box_middle_footer } >
					<p style = {{ fontSize : '28px', marginBottom : '30px' }}>
						<span className = { styles.contract_detail_item_label }>实收金额 : </span>
						<span style = {{ color : '#D41318' }}>{ (contractDetailInfo.totalMoney != undefined) ? Math.round(contractDetailInfo.totalMoney*100)/100 : '暂无' }</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>赠送课时 : </span>
						<span className = { styles.contract_detail_item_value }>{ contractDetailInfo.extPeriod || '0' }</span>
					</p>
					<p className = { styles.contract_detail_box_item }>
						<span className = { styles.contract_detail_item_label }>备注 : </span>
						<span className = { styles.contract_detail_item_value }>{ contractDetailInfo.remark || '暂无' }</span>
					</p>
				</div>
			</div>
			<div className = { styles.contract_detail_box_footer }>
			</div>
		</div>
	)
}

export default ContractDetailComponent;
