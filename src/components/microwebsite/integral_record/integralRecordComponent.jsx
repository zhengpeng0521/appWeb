import React from 'react';
import styles from './IntegralRecordComponent.less';
// import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';
import { RefreshControl, ListView } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

function integralRecordComponent({
  allData,
	dataSource,             //积分列表数据
	endLoading,             //是否到底部

  onEndReached,           //下拉加载
  onRefresh,               // 上拉刷新
  refreshing
}){
	const ds = new ListView.DataSource({
    rowHasChanged : ( r1, r2 ) => r1 !== r2
  });
	const data = ds.cloneWithRows( dataSource );

	// 积分列表
  function renderRow ( rowData, sectionID, rowID ) {
    return (
      <div className = {styles.integral}>
        {/* <div className = {styles.item}>
          <div className = {styles.left}>
            <p className = {styles.type}>{rowData.type}</p>
            <p className = {styles.stuName}>{rowData.stuName}</p>
            <p className = {styles.createTime}>{rowData.createTime}</p>
          </div>
          <div className = {styles.right}>
            <p className = {rowData.integralChange.slice(0,1) === '-'? styles.minus : ''}>{rowData.integralChange}</p>
          </div>
        </div> */}

        <div className = {styles.item}>
          <div className = {styles.top}>
            <span className = {styles.type}>{rowData.type}</span>
            <span className = {rowData.integralChange.slice(0,1) === '-'? styles.subtraction : styles.addition }>{rowData.integralChange}</span>
          </div>
          <div className = {styles.bottom}>
            <span className = {styles.stuName}>{rowData.stuName}</span>
            <span className = {styles.createTime}>{rowData.createTime}</span>
          </div>
        </div>
      </div>
    )
  }

    //渲染列表项头部
    function renderHeader() {
      return (
        <div className = {styles.available}>可用积分12123：{ allData }</div>
      );
    }

	return(
    <div className = {styles.list}>
      <div className = {styles.available}>可用积分：{ allData }</div>
      <div style = {{ width : '100%', height : '100%' }}>
        { dataSource.length > 0 ?
          <ListView
            className = 'contract_list_view_wrap'
            style = {{ height : '100%' }}
            dataSource = { data }
            renderRow = { renderRow }
            renderFooter = { () => <div style={{ padding : 30, textAlign : 'center' }}>{ endLoading ? '已经到底啦~' : '拼了老命加载中...' }</div> }
            pageSize = { 5 }
            scrollRenderAheadDistance = { 500 }
            // renderHeader={renderHeader}
            onEndReached = { onEndReached }
            refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            onEndReachedThreshold = { 50 }
          />
          :
          <PlaceHolderComponent tips = '暂无积分记录' />
        }
      </div>
    </div>
	)
}

export default integralRecordComponent;
