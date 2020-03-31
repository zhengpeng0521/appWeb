import React from 'react';
import styles from './activitySchoolComponent.less';
import {  WingBlank, WhiteSpace, ListView, } from 'antd-mobile';
import MicroEmptyDataComponent from '../common/microEmptyDataComponent.jsx';

function activitySchoolComponent ({
        dp,isLoadingEnd,
        activitySchoolIntroArr,isLoading,dataSource,
        activitySchoolIntroPage,
        showSchoolList,
   }) {

    let totalPage = activitySchoolIntroPage&&activitySchoolIntroPage.resultCount;
    //校区列表
    let activitySchoolIntro = activitySchoolIntroArr;

    //呈现的组件
    let index = activitySchoolIntro.length;
    function schoolList (rowData, sectionID, rowID) {

        if (index < 0) {
            index = activitySchoolIntro.length - 1;
        }

        const obj = activitySchoolIntro[rowID];

        return (
            <div key={rowID} onClick={() => showSchoolList(rowData.orgId)}>
                <div className={styles.activitySchoolIntro}>
                    <WingBlank size="md">
                        <p className={styles.activitySchoolName}>{obj&&obj.orgName}</p>
                        <p className={styles.activitySchoolAddress}>{obj&&obj.address}</p>
                        <div className={styles.activitySchoolIntroLine}></div>
                    </WingBlank>
                </div>
            </div>
      );
    }


    //数据加载完成
    function onEndReached (event) {
        //加载数据
        if(activitySchoolIntro.length >= totalPage) {
            if(!isLoadingEnd) {
                dp('updateState', {isLoading : false, isLoadingEnd : true});
            }
        } else {
            dp('getMoreActivitySchool', {isLoading : true, isLoadingEnd : false});
        }
    }

    return(
        <div className="activitySchoolBox">
			{
				totalPage > 0 
					? 
					<ListView
						dataSource={dataSource}
						renderHeader={() => <p className={styles.totalSchool}>共{activitySchoolIntroPage&&activitySchoolIntroPage.resultCount}个校区</p>}
						renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
						{isLoading ? '加载中...' : '已经到底啦~'}
						</div>}
						renderRow={schoolList}
						useBodyScroll
						pageSize={20}
						scrollRenderAheadDistance={500}
						onEndReached={onEndReached}
					/>
					:
					<MicroEmptyDataComponent top="calc(100% / 2)" title="还没有校区哦"/>
			}
        </div>
    )
}
export default activitySchoolComponent;
