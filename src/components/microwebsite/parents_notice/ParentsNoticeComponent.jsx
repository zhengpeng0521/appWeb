import React from 'react';
import styles from './ParentsNoticeComponent.less';
import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

function ParentsNoticeComponent({
	dataSource,                  //课程评价列表数据
	endLoading,                  //是否到底部

	onEndReached,                //上拉加载
	clickToContractDetail,       //点击进入详情
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
					<span style = {{ color : '#333' }} >课程 : </span>
					<span style = {{ color : '#333' }} >{ rowData.courseName || '无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >上课时间 :</span>
					<span className = { styles.render_row_item_value } >
						{ !!rowData.studyDate && !!rowData.startTime && !!rowData.endTime && ( rowData.studyDate + ' ' + rowData.startTime + ' ~ ' + rowData.endTime ) || '无' }
					</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >课程主教 :</span>
					<span className = { styles.render_row_item_value } >{ rowData.mtNames || '无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label_spec } >老师点评 :</span>
					<span className = { styles.render_row_item_value_spec } >{ rowData.tcrComm || '无' }</span>
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
					className = 'parents_notice_list_wrap'
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
				<PlaceHolderComponent tips = '暂无课程评价记录~' />
			}
		</div>
	)
}

export default ParentsNoticeComponent;
