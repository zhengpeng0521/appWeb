import React from 'react'
import styles from './microMaaHistryComponent.less'
import { WhiteSpace, WingBlank, ListView } from 'antd-mobile'
import MicroEmptyDataComponent from '../common/microEmptyDataComponent.jsx'

function MicroMaaHistryComponent({
  dp,
  historyList,
  historypageData,
  historyIsLoading,
  historyIsLoadingEnd,
  historyListDataSource
}) {
  let totalPage = historypageData && historypageData.resultCount
  let hIndex = historyList && historyList.length

  //转换时间
  function formatDateTime(timeStamp) {
    var date = new Date()
    date.setTime(timeStamp)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    var h = date.getHours()
    h = h < 10 ? '0' + h : h
    var minute = date.getMinutes()
    var second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  }
  //课程布局
  function historyRow(rowData, sectionID, rowID) {
    let birthDay = null
    if (rowData.childBirthday != null) {
      birthDay = formatDateTime(rowData.childBirthday)
    }
    if (hIndex < 0) {
      hIndex = historyList.length - 1
    }
    let newDate = new Date()
    newDate.setTime(rowData.createTime)
    let time = newDate
      .toLocaleDateString()
      .replace('/', '-')
      .replace('/', '-')

    return (
      <div style={{ backgroundColor: '#f0f1f2' }}>
        <WhiteSpace />
        <div className={styles.js_history_row}>
          <div
            style={{
              background: '#3b72b7',
              float: 'left',
              height: 87,
              width: 14
            }}
          ></div>
          <div className={styles.js_history_left_p}>
            {rowData.orgName || ''}
          </div>
          <div
            className={styles.js_history_right_p}
            style={{ width: 'calc(30% - 30px)' }}
          ></div>
          <div className={styles.js_history_clearance}></div>
          <WingBlank>
            <div className={styles.js_history_content_left_p}>学员信息</div>
            <div className={styles.js_history_content_right_p}>
              {rowData.childName || ''}{' '}
              {rowData.sex == '1' ? '男' : rowData.sex == '2' ? '女' : ''}{' '}
              {birthDay}
            </div>
            <div className={styles.js_history_content_left_p}>联系方式</div>
            <div className={styles.js_history_content_right_p}>
              {rowData.tel || ''}
            </div>
            <div className={styles.js_history_content_left_p}>提交时间</div>
            <div className={styles.js_history_content_right_p}>
              {time || ''}
            </div>
          </WingBlank>
          <div className={styles.js_history_clearance}></div>
        </div>
      </div>
    )
  }

  //课程数据加载完成
  function onHistoryEndReached(event) {
    if (historyList.length >= totalPage) {
      if (!historyIsLoadingEnd) {
        dp('updateState', {
          historyIsLoading: false,
          historyIsLoadingEnd: true
        })
      }
    } else {
      dp('getMoreMicroMaaHistory', {
        historyIsLoading: true,
        historyIsLoadingEnd: false
      })
    }
  }

  return (
    <div className="js_history">
      {totalPage && totalPage > 0 ? (
        <ListView
          dataSource={historyListDataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {historyIsLoading ? '加载中...' : '已经到底啦~'}
            </div>
          )}
          renderRow={historyRow}
          useBodyScroll
          pageSize={20}
          scrollRenderAheadDistance={500}
          onEndReached={onHistoryEndReached}
        />
      ) : (
        <MicroEmptyDataComponent
          title="您还没有预约哦"
          top="calc( 50% + 120px )"
        />
      )}
    </div>
  )
}

export default MicroMaaHistryComponent
