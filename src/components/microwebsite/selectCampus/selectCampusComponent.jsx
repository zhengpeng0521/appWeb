import React from 'react';
import styles from './selectCampusComponent.less';
import {WhiteSpace, WingBlank, SearchBar, ActivityIndicator, ListView} from 'antd-mobile';

function MicroSelectCampusComponent({

	dp,
	animating,
	isLoading,
	isLoadingEnd,
	activityIndicatorString,
	campusListSource,
	campusListSourceList,
	campusListDataPage,
	touchCampusFunction,
	touchSearchCampusFunction,
	touchCancelCampusFunction,
	
}) {
	
	
	let campusTotalPage = campusListDataPage.resultCount || 0;
	
    let cIndex = campusListSource.length;
		
    function campusRow (rowData, sectionID, rowID) {

        if (cIndex < 0) {cIndex = campusListSource.length - 1;}
		let newH = h * 0.2;
		return <div key={rowID} style={{backgroundColor : '#3b72b7'}}>
					<WingBlank size="sm">
						<div className={styles.js_row_div} style={{height : h * 0.2}} onClick={() => touchCampusFunction(rowData.orgId || '')}>
							<WingBlank size="md">
								<div className={styles.js_row_cover} 
									 style={{
										height : newH - 40,
										backgroundImage : `url(${rowData.imgurl || 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f'}?p=image/resize,l_500)`,
										width					: '40%',
										backgroundColor		: '#3b72b7',
										marginTop			: '20px',
										borderRadius	: '10px',
										float					: 'left',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat'
									}}>
								</div>
								<p className={styles.js_campus_name}
									style={{
										width : 'calc(60% - 20px)',
										fontsize				: '30px',
										color					: '#333',
										float					: 'left',
										margin					: 0,
										height					: '40%',
										lineHeight				: '40px',
										marginTop				: '30px',
										marginLeft				: '20px',
										overflow				: 'hidden'
								}}>{rowData.orgName}</p>
								<p className={styles.js_campus_address}
								style={{
									width : 'calc(60% - 20px)',
									fontSize				: '26px',
									color					: '#999',
									margin					: '0',
									marginLeft				: '20px',
									marginTop				: '6%',
									float					: 'left',
									whiteSpace				: 'nowrap',
									textOverflow			: 'ellipsis',
									overflow				: 'hidden'
									}}>{rowData.address || ''}</p>
							</WingBlank>
						</div>
					</WingBlank>
					<WhiteSpace size="sm" />
				</div>
    }
	
	/*
	let layout = (
		campusListSource&&campusListSource.length>0&&campusListSource.map((item, index) => {
			let newH = h * 0.2;
			return <div key={index}>
						<WingBlank size="sm">
							<div className={styles.js_row_div} style={{height : h * 0.2}} onClick={() => touchCampusFunction(item.orgId || '')}>
								<WingBlank size="md">
									<div className={styles.js_row_cover} 
										 style={{
											height : newH - 40,
											backgroundImage : `url(${item.imgurl || 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f'}!s500)`,
										}}>
									</div>
									<p className={styles.js_campus_name} style={{width : 'calc(60% - 20px)'}}>{item.orgName}</p>
									<p className={styles.js_campus_address} style={{width : 'calc(60% - 20px)'}}>{item.address || ''}</p>
								</WingBlank>
							</div>
						</WingBlank>
						<WhiteSpace size="sm" />
					</div>
		})
	)
	*/
	
	//列表数据加载完成
    function onCampusEndReached (event) {
				
        if(campusListSource.length >= campusTotalPage) {
            if(!isLoadingEnd) {
                dp('updateState', {isLoading : false, isLoadingEnd : true});
            }
        } else {			
            dp('getMoreSelectCampus', {isLoading : true, isLoadingEnd : false,});
        }
    }
	
	let empty = (
		<div className={styles.lodding_status}>
		  <ActivityIndicator
			text={activityIndicatorString}
			animating={animating}
		  />
		</div>
	)

	return(
		<div className="js_micro_select_campus">
			<SearchBar 
				placeholder="搜索校区" 
				onSubmit={value => touchSearchCampusFunction(value)}
				onClear={() => touchCancelCampusFunction()}
				/>
			{
				campusTotalPage&&campusTotalPage > 0  
					?
					<ListView
						dataSource={campusListSourceList}
						renderFooter={() => <div style={{ padding: 30, textAlign: 'center', color : 'white' }}>{isLoading ? '加载中...' : '已经到底啦~'}</div>}
						renderRow={campusRow}
						useBodyScroll
						pageSize={20}
						scrollRenderAheadDistance={500}
						onEndReached={onCampusEndReached}
					/>
					:
					animating ? empty : <p className={styles.empty_string}>未查询到校区列表数据</p>
			}
		</div>
    );
}

export default MicroSelectCampusComponent;



