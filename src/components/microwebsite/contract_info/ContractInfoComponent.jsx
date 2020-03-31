import React from 'react';
import styles from './ContractInfoComponent.less';
import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

function ContractInfoComponent({
	dataSource,             //合同列表数据
	endLoading,             //是否到底部

	onEndReached,           //上拉加载
	clickToContractDetail,  //点击进入详情
}){

	const ds = new ListView.DataSource({
        rowHasChanged : ( r1, r2 ) => r1 !== r2
    });

	const data = ds.cloneWithRows( dataSource );

	//课程布局
    function renderRow ( rowData, sectionID, rowID ) {
        return (
			<div className = { styles.render_row } key = { 'render_row_' + rowID } onClick = { () => clickToContractDetail( rowData ) }>
				<p className = { styles.render_row_item } style = {{ fontSize : '28px', margin : '30px 0 30px 20px', height : '28px' }}>
					<span style = {{ color : '#333' }} >合同编号 : </span>
					<span style = {{ color : '#333' }} >{ rowData.orderNum || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >签约类型 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.orderNewOldstu == '0' ? '新签约' : rowData.orderNewOldstu == '1' ? '续约' : '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >购买类型 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.orderType == '1' ? '充值' : rowData.orderType == '2' ? '课时包' : '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >合同金额 : </span>
					<span className = { styles.render_row_item_value } >{ ( rowData.orderMoney && rowData.orderMoney + '元' ) || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >合同期限 : </span>
					<span className = { styles.render_row_item_value } >{ ( rowData.startTime && rowData.endTime && rowData.startTime + ' ~ ' + rowData.endTime ) || '暂无' }</span>
				</p>
			</div>
      	);
    }

	/*列表之间的间隙*/
	function renderSeparator( sectionID, rowID ){
		return (
			<div className = { styles.render_separator } key = { 'render_separator_' + rowID }></div>
		)
	}

	return(
		<div style = {{ width : '100%', height : '100%' }}>
			{ dataSource.length > 0 ?
				<ListView
					className = 'contract_list_view_wrap'
					style = {{ height : '100%', background : '#f9f9f9' }}
					dataSource = { data }
					renderRow = { renderRow }
					renderSeparator = { renderSeparator }
					renderFooter = { () => <div style={{ padding : 30, textAlign : 'center' }}>{ endLoading ? '已经到底啦~' : '拼了老命加载中...' }</div> }
					pageSize = { 5 }
					scrollRenderAheadDistance = { 500 }
					onEndReached = { onEndReached }
					onEndReachedThreshold = { 50 }
			   />
				:
				<PlaceHolderComponent tips = '暂无合同记录~' />
			}
		</div>
	)
}

export default ContractInfoComponent;
