import React from 'react';
import styles from './personMyactivityComponent.less';
import {  WingBlank, WhiteSpace, ListView, Toast} from 'antd-mobile';
import MicroEmptyDataComponent from '../common/microEmptyDataComponent.jsx';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

function personMyactivityComponent ({
	dp,
    myactivityCancelFun,
    myactivitySourceArr,
    myactivitySourcePage,
    isLoadingEnd,
    isLoading,
    dataSource,
}) {
	
    let totalPage = myactivitySourcePage&&myactivitySourcePage.resultCount;
    let myactivity = myactivitySourceArr;

    //呈现组件
    let index = myactivity.length;
    function myactivityList (rowData, sectionID, rowID) {

        if (index < 0) {
            index = myactivity.length - 1;
        }

        const obj = myactivity[rowID];
        //查看取消原因
        function myactivityCancelReason () {
            alert(obj&&obj.reason || '请联系机构咨询');
        }

        //活动取消时间
        let timestamp = Date.parse(new Date());
		let tempTime = obj&&obj.cancelTime;

		//取消报名
        function myactivityCancel (id){
            if( timestamp > tempTime) {
                Toast.info('已超过最晚取消报名时间，如有疑问，请联系机构'); 
            }else{
                myactivityCancelFun(id);
            }
        }

        //去支付
        function myactivityPay(data) {
            dp('requistPay', { data: data});
        }

        return (
            <div key={rowID}>
                <div className="myactivityTitlebox">
                        <p className={styles.myactivityUserBox}>
                            <span className={styles.myactivityLabel}>活动名称：</span>
                            <span className={styles.myactivityUser}>{obj && obj.actName}</span>
                            <span className={styles.myactivityUserState}>
                                {
                                obj && obj.applyStatus == '0' ? '已取消' : (obj && obj.applyStatus == '1' ? '等位中' : obj && obj.applyStatus == '2' ? '报名成功' : obj && obj.applyStatus == '3' ? '未支付' : obj && obj.applyStatus == '4' ? '已关闭' : '')
                                }
                            </span>
                        </p>

                        <p className={styles.myactivityUserBox}> 
                            <span className={styles.myactivityLabel}>学员姓名：</span>
                            <span className={styles.myactivityUser}>{obj && obj.stuName}</span>
                        </p>

                        <p className={styles.myactivityUserBox}> 
                            <span className={styles.myactivityLabel}>活动时间：</span>
                            <span className={styles.myactivityUser}>
                                {
                                    new Date(Date.parse(obj && obj.activitystartTime.replace(/-/g, "/"))).getFullYear()
                                }
                                .
                                {
                                    new Date(Date.parse(obj && obj.activitystartTime.replace(/-/g, "/"))).getMonth() + 1
                                }
                                .
                                {
                                    new Date(Date.parse(obj && obj.activitystartTime.replace(/-/g, "/"))).getDate()
                                }
                            </span>
                        </p>

                        <p className={styles.myactivityUserBox}>
                            <span className={styles.myactivityLabel}>活动地点：</span>
                            <span className={styles.myactivityUser}>{obj && obj.address}</span>
                        </p>

                        <p className={styles.myactivityUserBox}>
                            <span className={styles.myactivityLabel}>报名时间：</span>
                            <span className={styles.myactivityUser}>{obj && obj.applyTime || ''}</span>
                        </p>
                        
                        { /* 1和2是等位和支付成功状态 3是待支付状态 0 取消状态 */
                            (obj&&obj.applyStatus == '1' || obj&&obj.applyStatus == '2' ) ?
                                <p className={styles.myactivityBtn} onClick={() => myactivityCancel(rowData.id)}>取消报名</p>
                                : obj && obj.applyStatus == '3' ?
                                <p className={styles.myactivityBtn} onClick={() => myactivityPay(rowData)}>去支付</p>
                                : obj && obj.applyStatus == '4' ?
                                <p className={styles.myactivityCancelBtn}>超时未支付</p>
                                :
                                <p className={styles.myactivityCancelBtn} onClick={myactivityCancelReason}>查看取消原因</p>
                        }
                </div>
            </div>
      );
    }

    //数据加载完成
    function onEndReached (event) {

        //加载数据
        if(myactivity.length >= totalPage) {
            if(!isLoadingEnd) {
                dp('updateState', {isLoading : false, isLoadingEnd : true});
            }
        } else {
            dp('getMoremyActivitys', {isLoading : true, isLoadingEnd : false});
        }
    }

    //间隙
    let separator = (sectionID, rowID) => (
        <WhiteSpace key={`${sectionID}-${rowID}`} style={{ background: "rgb(240,241,242)"}}/>
    );

    return (
        <div className="personMyactivityBox">
            <WhiteSpace style={{ background : 'rgb(240,241,242)' }} />
			{
				totalPage&&totalPage > 0
				?
				<ListView
					dataSource={dataSource}
					renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>{isLoading ? '加载中...' : '已经到底啦~'}</div>}
					renderRow={myactivityList}
					useBodyScroll
					pageSize={20}
					renderSeparator={separator}
					scrollRenderAheadDistance={500}
					onEndReached={onEndReached}
				/>
				:
				<MicroEmptyDataComponent title = '您还没有参加活动哦' top = 'calc( 50% + 120px )' />
			}
        </div>
    )
}
export default personMyactivityComponent;
