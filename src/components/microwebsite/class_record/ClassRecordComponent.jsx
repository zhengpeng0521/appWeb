import React from 'react';
import styles from '../contract_info/ContractInfoComponent.less';
import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

function ClassRecordComponent({
	dataSource,             //合同列表数据
	endLoading,             //是否到底部

	onEndReached,           //上拉加载
}){

	const ds = new ListView.DataSource({
        rowHasChanged : ( r1, r2 ) => r1 !== r2
    });

	const data = ds.cloneWithRows( dataSource );

	//课程布局
    function renderRow ( rowData, sectionID, rowID ) {
		let periodChange = rowData.periodChange;
		let isPlus = Number( periodChange ) || 0;
		let courseInfo = !!rowData && !!rowData.courseInfo && rowData.courseInfo[0] || undefined;
		let course = !!courseInfo && '( ' + courseInfo.courseName + ' ' + courseInfo.itemTime + ' ' + courseInfo.startTime + ' ~ ' + courseInfo.endTime + ' )';
        return (
			<div className = { styles.render_row } style = {{ borderColor : isPlus < 0 ? '#D41318' : '#5D9CEC' }} key = { 'render_row_' + rowID } >
				<p className = { styles.render_row_item } style = {{ fontSize : '28px', margin : '30px 0 30px 20px', height : '28px' }}>
					<span style = {{ color : '#333' }} >课时变动 : </span>
					<span style = {{ color : isPlus < 0 ? '#D41318' : '#5D9CEC' }} >{ rowData.periodChange || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >关联合同 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.purchaseId || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >交易类型 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.tradeType + ( !!course && course || '' ) || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >变动描述 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.tradeDesc || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >所属校区 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.orgName || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >创建时间 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.createTime || '暂无' }</span>
				</p>
                <p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >变动学员 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.stuName || '' }</span>
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
					style = {{ height : '100%' }}
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
				<PlaceHolderComponent tips = '暂无课时记录' />
			}
		</div>
	)
}

export default ClassRecordComponent;
