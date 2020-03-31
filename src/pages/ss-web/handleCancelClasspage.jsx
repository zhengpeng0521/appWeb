import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './handleCancelClasspage.less'

function handleCancelClasspage ({dispacth, handleCancelClassModel}){
  let {
    stuName,
    courseName,
    courseNum,
    leftNum,
    repealTime,
    reason,
  } = handleCancelClassModel
  return (
    <div className={styles.all}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.topmain}>
            <img src="http://img.ishanshan.com/gimg/n/20200327/e19124781c5a04435b2f1ad3033b6fe1" alt=""/>
            <span>消课详情</span>
          </div>
        </div>


        <div className={styles.bot}>
          <div className={styles.everyone}>
            <span>学员姓名</span>
            <span>{stuName == 'null' ? '' : stuName}</span>
          </div>

          <div className={styles.everyone}>
            <span>课程名称</span>
            <span>{courseName == 'null' ? '' : courseName}</span>
          </div>

          <div className={styles.everyone}>
            <span>消耗课时</span>
            <span>{courseNum == 'null' ? '' : courseNum}</span>
          </div>

          <div className={styles.everyone}>
            <span>剩余课时</span>
            <span>{leftNum == 'null' ? '' : leftNum}</span>
          </div>

          <div className={styles.everyone}>
            <span>消课时间</span>
            <span>{repealTime == 'null' ? '' : repealTime}</span>
          </div>

          <div className={styles.everyone}>
            <span>消课原因</span>
            <span>{reason == 'null' ? '' : reason}</span>
          </div>
        </div>
      </div>
    </div>
  
  )

}


function mapStateToProps({ handleCancelClassModel }) {
  return { handleCancelClassModel };
}

export default connect(mapStateToProps)(handleCancelClasspage);