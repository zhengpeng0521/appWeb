import React from 'react';
import moment from 'moment';
import { Button} from 'antd-mobile';
import styles from './ClassDetail.less';
function ClassDetail({
    item,
    status,
    detailInfo,             //详情信息
    loading,

    orderClass,
    cancelOrderClass,
}){

    let renderBtn = () => {
        if(moment(detailInfo.studyDate).isBefore(moment(), 'day')){
            return (<Button type="primary" className={styles.class_detail_btn} disabled>已过期</Button>)
        }else if(status == '可预约'){
            return (
       <Button type="primary" className={styles.class_detail_btn} loading={loading} disabled={loading} onClick={orderClass}>预约</Button>
            )
        } else if(status == '已约满'){
            return (<Button type="primary" className={styles.class_detail_btn} disabled>预约</Button>)
        } else if(status == '不可预约'){
            return null
        } else if(status == '已预约'){
            return (<Button type="primary" className={styles.class_detail_btn} disabled={detailInfo.checked || loading} loading={loading} onClick={cancelOrderClass}>取消预约</Button>)
        }
    }

    return (
        <div style={{ paddingTop: 20 }}>
            <div className={styles.class_detail_info}>
                <p>
                    <span>课程 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.courseName || '暂无'}</span>
                </p>
                <p>
                    <span>适龄范围 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.ageLimit || '暂无'}</span>
                </p>
                <p>
                    <span>教室 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.clsRoomName || '暂无'}</span>
                </p>
                <p>
                    <span>主教 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.mTeachers || '暂无'}</span>
                </p>
                <p>
                    <span>助教 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.aTeachers || '暂无'}</span>
                </p>
                <p>
                    <span>上课主题 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.courseThemeName || '暂无'}</span>
                </p>
                <p>
                    <span>消耗课时 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.courseNum || '暂无'}</span>
                </p>
                <p>
                    <span>剩余空位 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.useSeat || '暂无'}</span>
                </p>
                <p>
                    <span>开课校区 : </span>
                    <span className={styles.class_detail_item}>{detailInfo.orgName || '暂无'}</span>
                </p>
                <p>
					<span>上课时间 : </span>
					<span className = { styles.class_detail_item } >
						{ ( !!detailInfo.studyDate && !!detailInfo.startTime && !!detailInfo.endTime && detailInfo.studyDate + ' ' + detailInfo.startTime + ' ~ ' + detailInfo.endTime ) || '暂无' }
					</span>
				</p>
                <p>
                    <span>课程状态 : </span>
                    <span className={styles.class_detail_item}>{moment(detailInfo.studyDate).isBefore(moment(), 'day') ? '已过期' : (status || '暂无')}</span>
                </p>
                {status == '已预约' && detailInfo.checked ? <p>
                    <span style={{color: '#FF7058'}}>提示 : </span>
                    <span className={styles.class_detail_item} style={{color: '#FF7058'}}>当前课程不可取消约课</span>
                </p> : null}
            </div>
            {renderBtn()}
        </div>
    )
}

export default ClassDetail
