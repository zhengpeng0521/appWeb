import React, {PropTypes} from 'react';
import { Toast, Button } from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './VotePersonDetailComponent.less';

function VoteGamePersonDetailComponent({

	dp,
	showShare,
	backPage,
	errorMsgString,
	dataSource,
	voteFunction,
	pushBaomingFunction,
	returnMainPageFunction,
	pushSelfDetailFunction,
	touchVoteButton,
	orgData,
    orgName,
	
	status,
	form : {
		getFieldProps,
		getFieldValue,
		getFieldsValue,
	},
	
}) {
		
	function backPageFunction() {
		backPage()
	}
	

	let props = {
		dp,
		showShare,
		backPageFunction,
		errorMsgString,
		voteFunction,
		dataSource,
		touchVoteButton,
		pushBaomingFunction,
		returnMainPageFunction,
		pushSelfDetailFunction,
		orgData,
        orgName,
	}

	return (
		errorMsgString.length > 0 ? <FailurePage {...props} /> : <DetaultPage {...props} / >
    );
};


function DetaultPage({
	
	dp,
	showShare,
	dataSource,
	touchVoteButton,
	voteFunction,
	pushBaomingFunction,
	returnMainPageFunction,
	pushSelfDetailFunction,
	orgData,
	orgName,
}) {
				
	var gameStatus = dataSource&&dataSource.gameStatus;
		
	var gameStatusString = gameStatus == '0' ? '活动未开始' : gameStatus == '1' ? undefined : gameStatus == '2' ? '活动已结束' : '活动已下架';

	//取消分享弹框	
	function showShareFunction() {
		dp('updateState', {showShare : !showShare});
	}
		
	//投票
	function voteFun(v) {
		dp('updateState', {touchVoteButton : !touchVoteButton});
		if(gameStatus == '1') {
			if(dataSource.isSelf == '1') {
				voteFunction();
			} else {
				//投票他人
				voteFunction()
			}
		} else {
			 Toast.info(gameStatusString, 1);
		}
	}
			
	//参加
	function participateFunction(v) {
		
		if(gameStatus != '1' ) {
		   Toast.info(gameStatusString, 1);
		} else {			
			if(v == '我也要报名参加') {
				pushBaomingFunction();
			} else if (v == '查看我的报名信息') {
				pushSelfDetailFunction();
			} else if (v == '我要拉票') {
				dp('updateState', {showShare : !showShare});
			}
		}
	}
		
	//返回主页
	function returnMainPage() {
		returnMainPageFunction();
	}

    function createGame(){
        window.location.href = "http://saas.ishanshan.com/saas-web/orgApplyController/redirectPage/389774704052928512";
    }
				
	//获取个人id和当前详情页userId以及是否报名过

	let _isSelf = dataSource&&dataSource.isSelf == '0' ? false : true;
	let _participateLater = dataSource&&dataSource.isApply == '0' ? false : true;
		
	let voteString = _isSelf ? '投自己一票' : '投Ta一票';
	let participateString = '';
		
	if(_isSelf && _participateLater) {
		//自己页面
		participateString = '查看我的报名信息';
	} else {
		//他人页面
		if(_participateLater == '1') {
		   	participateString = '查看我的报名信息';
			
		} else {
			participateString = '我也要报名参加';
		}
	}
	
	if(_isSelf) {
		participateString = '我要拉票';
	} 
	
	let imageUrlArr = dataSource&&dataSource.imageUrl ? dataSource.imageUrl.split(',') : [];
		
	//let adImage = `url(${dataSource&&dataSource.adImg})`;
			
	return (
		<div className="votePersonDetail" style={showShare ? {overflow : 'hidden'} : {overflow : 'auto'}}>
			<div className={styles.baseBox}>
        	    <div className={styles.orgName} style={orgName ? {marginTop : '0.5rem'}:{}}>{orgName}</div>
				<div className={styles.userName}>{dataSource&&dataSource.playerName}</div>
				<div className={styles.topDataBox}>
					<div className={styles.commonTopDataText}>编号: {dataSource&&dataSource.orderNo || 0}</div>
					<div className={styles.commonTopDataText}>票数: {dataSource&&dataSource.voteNum || 0}</div>
					<div className={styles.commonTopDataText}>排名: {dataSource&&dataSource.rankNo || 0}</div>
				</div>
			</div>
			
			<div className={styles.contentBox}>
				<div className={styles.declaration}>参赛宣言： {dataSource&&dataSource.intro}</div>
				{
					imageUrlArr&&imageUrlArr.map((item, index) => {
						return <img key={index} className={styles.personWorkImage} src={item} />
					})
				}
				<div className={styles.vote}>
					<Button disabled={touchVoteButton} className="btn" onClick={() => voteFun(voteString)}>{voteString}</Button>
				</div>
				<div className={styles.participate} onClick={() => participateFunction(participateString)}>{participateString}</div>
				<div className={styles.pop} onClick={() => returnMainPage()}>返回主页</div>
				{dataSource&&dataSource.adImg != null ? <img className={styles.ad} src={dataSource&&dataSource.adImg} /> : ''}
				<div className="serviceProviders">由闪闪招生宝提供技术支持</div>
			</div>
			{showShare ? <div className={styles.shareBg} className={styles.shareBg} onClick={() => showShareFunction()}>
                                <img className={styles.gameFindImg} src="//img.ishanshan.com/gimg/img/489dbd67426c73e543fb746bcd674cb3"/>
                                <div className={styles.gameFindBody}>
                                    <p className={styles.gameFindFenxiang}>点击右上角“<img src="//img.ishanshan.com/gimg/img/f2efbf19966fd4d65fcecea5bdae5ce2"/>”<br/>分享给好友</p>
                                    <div className={styles.createGameForMe} id="createGameBtn" onClick={()=>createGame()}>点击创建我的游戏>>></div>
                                </div>
                            </div>
                : ''
            }
		</div>
	)
}

function FailurePage({
	
	errorMsgString,
	backPageFunction,
	
}) {
		
	return (
		<div className="votePersonDetail">
			<div className={styles.notThroughImage}></div>
			<div className={styles.notThroughText}>{errorMsgString || ''}</div>
			<div className={styles.backButton} onClick={() => backPageFunction()}>返回主页</div>
		</div>
	)
}
export default createForm()(VoteGamePersonDetailComponent);
