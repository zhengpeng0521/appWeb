import React from 'react';
import styles from './SignSelfRecordComponent.less';
import {WhiteSpace, WingBlank, ListView, } from 'antd-mobile';

function SignSelfRecordComponent({
    recordList,pageIndex,pageSize,resultCount,loadMore,
}) {
    let hasMore = ((pageIndex + 1) * pageSize) < resultCount;

	return(
		<div className={styles.leave_record_page_cont}>
		    {recordList && recordList.length > 0 && recordList.map(function(recordItem, idnex) {
                let status = '', handel = '';
                let itemstatus = recordItem.status;

                if(itemstatus == '0') {
                    status = '无效';
                    handel = '无效';
                } else if(itemstatus == '1') {
                    status = '未确认';
                    handel = '未确认';
                } else if(itemstatus == '2') {
                    status = '已销假';
                    handel = '已销假';
                } else if(itemstatus == '3') {
                    status = '已确认';
                    handel = '同意';
                } else if(itemstatus == '4') {
                    status = '已确认';
                    handel = '不同意';
                }

                return (
                    <div className={styles.leave_record_item} key={'leave_record_item_'+idnex}>
                        <div className={styles.record_org}>{recordItem.orgName}</div>
                        <div className={styles.record_baby_name}>{recordItem.stuName||'学员姓名'}</div>
                        <div className={styles.record_createtime}>{recordItem.createTimeStr}</div>
                    </div>
                )
            })}

            <div className={styles.handle_cont}>
                {hasMore ?
                    <div className={styles.load_more} onClick={loadMore}>加载更多</div>
                :
                    <div className={styles.no_more_text}>已经到底啦~</div>
                }
            </div>
		</div>
    );
}

export default SignSelfRecordComponent;



