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

        return (
            <div key={rowID}>
                <div className="myactivityTitlebox">
                    <WingBlank size="md">
                        <p className={styles.myactivityUserBox}>
                            <span className={styles.myactivityUser}>{obj&&obj.stuName}</span>
                            <span className={styles.myactivityUserState}>
                                {
                                    obj&&obj.applyStatus == '0' ? '已取消' : ( obj&&obj.applyStatus == '1' ? '等位中' : '报名成功')
                                }
                            </span>
                        </p>
                        <div className={styles.myactivityCon}>
                            <div className={styles.myactivityIcon} style={{backgroundImage: `url(${obj&&obj.activityCover})`}}>

                            </div>
                            <div className={styles.myactivityInttro}>
                                <p className={styles.myactivityInttroTitle}>{obj&&obj.actName}</p>

                                <p className={styles.myactivityTimeAdd}>
                                    <span>
                                        {
                                            new Date(Date.parse(obj&&obj.activitystartTime.replace(/-/g, "/"))).getMonth()+1
                                        }
                                        .
                                        {
                                           new Date(Date.parse(obj&&obj.activitystartTime.replace(/-/g, "/"))).getDate()
                                        }
                                        （{
                                            obj&&obj.weekDay == '0' ?
                                                '周一'
                                                :
                                                ( obj&&obj.weekDay == '1' ?
                                                    '周二'
                                                    :
                                                    ( obj&&obj.weekDay == '2' ?
                                                        '周三'
                                                        :
                                                        ( obj&&obj.weekDay == '3' ?
                                                            '周四'
                                                            :
                                                            ( obj&&obj.weekDay == '4' ?
                                                                '周五'
                                                                :
                                                                ( obj&&obj.weekDay == '5' ?
                                                                    '周六'
                                                                    :
                                                                    '周日'
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                        }）
                                    </span>
									 | &nbsp;&nbsp;
                                    {obj&&obj.address}
                                </p>
                            </div>
                        </div>
                        {
                            (obj&&obj.applyStatus == '1' || obj&&obj.applyStatus == '2' ) ?
                                <p className={styles.myactivityBtn} onClick={() => myactivityCancel(rowData.id)}>取消报名</p>
                                :
                                <p className={styles.myactivityCancelBtn} onClick={myactivityCancelReason}>查看取消原因</p>
                        }
                    </WingBlank>
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
      <WhiteSpace key={`${sectionID}-${rowID}`} style={{background : "rgb(240,241,242)"}}/>
    );

    return (
        <div className={styles.personMyactivityBox}>
            <WhiteSpace style={{ background : '#f9f9f9' }} />
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
