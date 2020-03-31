/*
 *
 */
import React, {PropTypes} from 'react';
import { InputItem, DatePicker, List, Toast, WingBlank, WhiteSpace, Picker, Radio, ListView, Button, ActivityIndicator } from 'antd-mobile';
import moment from 'moment';
import {createForm} from 'rc-form';
import styles from './VoteComponent.less';
import CountDownPage from '../../../pages/common/datePage/CountDownPage';
var QRCode = require('qrcode.react');

const gmtNow = moment().utcOffset(0);

function VoteGameComponent({

	dp,
	homeDataSource,
	passValue,
	overStatus,
	searchValue,
	ListSource,
	ListPageData,
	currentUserId,
	popMask,
	maskName,
	pushPersonCenter,
	reviewOrParticipate,
	voteGameDoneFunction,
	touchVoteButton,
	loading,
	funcLoadMoreDataSoucre,
	form : {
		getFieldProps,
		getFieldValue,
		getFieldsValue,
	},
}) {	

	var gameStatus = homeDataSource&&homeDataSource.gameStatus;
	let startTime = moment().format(homeDataSource&&homeDataSource.endTime);//结束时间
	let beginTime = moment().format(homeDataSource&&homeDataSource.startTime);//开始时间

	function updateStatePassValue(){
        if(gameStatus == '0'){
           passValue({
                startTime : beginTime,
                namespaceName : 'voteGameModel',
                gameStatus,
           });
        }else{
            passValue({
                startTime : startTime,
                namespaceName : 'voteGameModel',
                gameStatus,
            });
        }

	}
	
	var gameStatusString = gameStatus == '0' ? '活动未开始' : gameStatus == '1' ? undefined : gameStatus == '2' ? '活动已结束' :  gameStatus == '3' ? '活动已下架' : '数据加载中...';
				
	function searchValueChange(e) {		
		dp('updateState', {searchValue : e});
	}
	
	function searchValueFuntion() {
		dp('getListDataSource', {searchKey : searchValue, resetMark : true});
	}
	
	//点击活动介绍
	function popMaskFuntion() {
		dp('updateState', {popMask : !popMask, maskName : 'maskActivtiy'});
	}
	
	var myImage = new Image();			
	var myCanvas, codeList;
	
	function loadQr() {
		myCanvas = document.getElementById('myCanvas');
		codeList = document.getElementById('qrCodeBaseDiv')
		if(codeList) {
			codeList = codeList.getElementsByTagName('canvas');   
		}
		if(myCanvas) {
			myImage.src = codeList[0].toDataURL();
	   	}
	}
	
	loadQr();

	//点击二维码
	function popQrFuntion() {
		if(gameStatus != '1' && gameStatus != '3') {	
			Toast.info(gameStatusString);
		} else {
			if(!window._init_qrcode_div_to_img){
                myImage.src = codeList[0].toDataURL();
			
                var ctx = myCanvas.getContext('2d');

                ctx.drawImage(myImage, 0, 0, 300, 300);

                ctx.fillStyle = "#fec82e";

                var qrBase64 = myCanvas.toDataURL('image/png', 0.5);

                dp('updateState', {popMask : !popMask, maskName : 'maskQr', qrBase64 : qrBase64});
            }else{
                dp('updateState', {popMask : !popMask, maskName : 'maskQr', qrBase64 : qrBase64});
            }
		}
	}
	
	//点击联系方式弹框
	function popContactFuntion() {
		dp('updateState', {popMask : !popMask, maskName : 'maskContact'});
	}
	
	function pushPersonCenterFunction(id, gameid) {
		//请求接口判断是否进行审核通过
		pushPersonCenter(id, gameid);
	}
	
	//投票
	function voteFuntion(rowData, id, btnId) {		
		dp('updateState', {touchVoteButton : !touchVoteButton});
		if(gameStatus != '1') {	
			Toast.info(gameStatusString);
		} else {
			if(currentUserId != undefined) {
				voteGameDoneFunction(rowData.playerId, currentUserId, rowData.gameBaseId, id, rowData, btnId);
			} else {
				Toast.info('userId不能为空');
			}
		}
	}
	
	let ListTotalPage = ListPageData.resultCount || 0;
	
	let LIndex = ListSource.length;

	//判断是否已经报名
	let instructionsStatus = homeDataSource&&homeDataSource.isApply == '0' ? styles.LayouParticipateImage : styles.LayouReviewParticipateImage;

	function loadMoreData() {
		
		let element = undefined;
		if (window['game-vote-scroll']) {
			element = window['game-vote-scroll'];
		} else {
			let e = document.getElementById('scroll-element');
			window['game-vote-scroll'] = e;
			element = e;
		}
		let ch = element.clientHeight;
		let st = element.scrollTop;
		let sh = element.scrollHeight;
		if (LIndex < ListTotalPage) {
			if (ch + st > sh - 400) {
				if (!window.beingLoaded) {
					window.beingLoaded = true;
					funcLoadMoreDataSoucre({
						ListIsLoading: false,
						ListIsLoadingEnd: false,
						loadNextPage: true,
					})
				}
			} 
		}
	}
		
	return (
		<div className="voteGameH5" style={ maskName != 'vcCode' ? (popMask ? {pointerEvents : 'none', overflow : 'hidden'} : {}) : {}}>
			< ActivityIndicator toast animating = {loading} text = "正在加载" / >
			<div className={styles.LayoutTitleImage}>
				<div onClick={ overStatus ? '' : updateStatePassValue()}></div>
				
				<div className={instructionsStatus} onClick={() => reviewOrParticipate()}></div>
				<div className={styles.MainContentText}>{homeDataSource&&homeDataSource.gameName || ''}</div>
				{(gameStatusString == undefined || gameStatus == '0') ? <CountDownPage /> : <div className={styles.TimeContentText}>{gameStatusString}</div>}
				<div className={styles.LayouInstructionsImage} onClick={() => popMaskFuntion()}></div>
				<div className={styles.LayouContactImage} onClick={() => popContactFuntion()}></div>
				<div className={styles.LayouqrImage} onClick={() => popQrFuntion()}></div>
			</div>

			<div className={styles.LayoutBlueBoxBg}>
				<div className={styles.DataLayout}>
					<div className={styles.DataNums}><p className={styles.DateLabel}>&nbsp;&nbsp;浏览数: </p>{homeDataSource&&homeDataSource.pv || 0}</div>
					<div className={styles.DataNums}><p className={styles.DateLabel}>&nbsp;&nbsp;投票数: </p>{homeDataSource&&homeDataSource.voteNum || 0}</div>
					<div className={styles.DataNums}><p className={styles.DateLabel}>&nbsp;&nbsp;报名数: </p>{homeDataSource&&homeDataSource.playerNum || 0}</div>
				</div>							
				<div className={styles.LayoutSearch}>
					<InputItem
						type="text"
						placeholder="请输入编号或者姓名进行搜索"
						onChange={searchValueChange}
						value={searchValue}
				  	>
					</InputItem>
					<div className={styles.ButtonSearch} onClick={() => searchValueFuntion()}>搜索</div>
				</div>

				<div className={styles.LayoutList} onScroll={loadMoreData} id="scroll-element">
					{
						ListSource && ListSource.length ? ListSource.map((item, index) => {
							//封面数组
							let imageUrlArr = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls.split(',') : [];

							let imageUrl = `url(${imageUrlArr.length > 0 ? imageUrlArr[0] + '!s200' : ''})`;

							let number = index;

							let numid = `piaoNum${++number}`;

							let btnKey = `voteBtn${++number}`;

							return (
								< div key={index} className = { styles.ListItem } >
									{(searchValue != undefined && searchValue != '')  ? '' : <div className={styles.RankingNum}> NO. { ++index  || ''}</div>}
									<div className={styles.CoverImage} onClick={() => pushPersonCenterFunction(item.playerId, item.gameBaseId)} style={{backgroundImage : imageUrl}}>
										<div className={styles.UserName} onClick={() => pushPersonCenterFunction(item.id, item.gameBaseId)}>{item.babyName || ''}</div>
									</div>
									<div className={styles.Number}>{item.orderNo || ''}号</div>
									<span className={styles.piao}>票</span><div id={numid} className={styles.Votes}>{item.voteNum}</div>

									<div className={styles.VotesBox}>
									</div>
									<div className={styles.VoteButton}>
										<Button id={btnKey} disabled={touchVoteButton} className="btn" onClick={() => voteFuntion(item, numid, btnKey)}>投票</Button>
									</div>
								</div>
							)
						})
						 :
						<div className={styles.emptyData}>
							<div className={styles.emptyImage}></div>
							<div className={styles.emptyText}>{(searchValue != undefined || searchValue == '' ? '无搜索结果' : '暂无参赛者')}</div>
						</div>
					}
				</div>
				<div className="serviceProviders">由闪闪招生宝提供技术支持</div>
			</div>
		</div>
    );
};
					
export default createForm()(VoteGameComponent);
