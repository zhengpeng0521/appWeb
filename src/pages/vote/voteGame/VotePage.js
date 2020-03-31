import React, { PropTypes } from 'react';
import { connect } from 'dva';
import VoteGameComponent from '../../../components/vote/voteGame/VoteComponent';
import {Toast, InputItem} from 'antd-mobile';
import styles from './VotePage.less';
import { routerRedux } from 'dva/router';
var QRCode = require('qrcode.react');
import html2canvas from 'html2canvas';
import qs from 'qs';
import { resolve } from 'dns';
import { reject } from 'any-promise';

function VoteGamePage({dispatch, voteGameModel}) {
	
	let {
		searchKey,
		loading,
		overStatus,
		searchValue,
		homeDataSource,
		ListSource,
		ListPageData,
		ListIsLoading,
		ListIsLoadingEnd,
		popMask,
		maskName,
		gameBaseId,
		selectIndex,
		playClassName,
		currentUserId,
		verificationCode,
		playerId,
		qrBase64,
		rowData,
		touchVoteButton,
		inputVerificationCode,
		globalDivId,
		globalButtonId,
		qrCodeUrl,
		
	} = voteGameModel;

	function dp(name, param) {
		dispatch({
			type : `voteGameModel/${name}`,
			payload : {
				...param
			}
		})
	}
	
	
	/**
	 * 因dispatch不调用 此出改为直接请求跳过转发 （具体为什么掉不起来dispath不知道原因）
	 */
	async function funcLoadMoreDataSoucre(param) {
		dp("updateState", {
			loading: true,
		})
		let newListSource = voteGameModel.ListSource || [];
		let pageIndex = voteGameModel.pageIndex || 0;
		if (param && param.resetMark) {
			newListSource = [];
			pageIndex = 0;
		}
		if (param && param.loadNextPage) {
			pageIndex = ++voteGameModel.pageIndex;
			let num = Math.ceil(voteGameModel.ListPageData.resultCount / 10);
			if (voteGameModel.ListPageData.pageIndex == pageIndex) {
				pageIndex += 1
			}
			if (voteGameModel.ListPageData.pageIndex == (num - 1)) {
				pageIndex -= 1
			}
		}

		let paramter = {
			gameBaseId: param && param.gameBaseId || voteGameModel.gameBaseId,
			pageIndex: pageIndex || 0,
			pageSize: voteGameModel.pageSize || 20,
			searchKey: param && param.searchKey || voteGameModel.searchKey,
		}	

		let service_param = {
			service: BASE_URL + '/game/vote/player/ranking',
			data: paramter,
		}

		let dataSource = await requestData(`/thinknode/game/vote/mApi`, {
			method: 'post',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: qs.stringify(service_param),
		});
	
		let { ret } = dataSource;

		if (ret && ret.errorCode == 9000) {
			if (ret.data && ret.data.resultCount > ret.data.start) {
				if (param && param.searchKey != '') {
					if (param.loadNextPage) {
						ret.results && ret.results.map((item, index) => {
							newListSource.push(item);
						})
					} else {
						newListSource = ret.results;
					}
				} else {
					ret.results && ret.results.map((item, index) => {
						newListSource.push(item);
					})
				}

				dp('updateState', {
						ListSource: newListSource,
						ListPageData: ret && ret.data || {},
						ListIsLoadingEnd: param.ListIsLoadingEnd || false,
						ListIsLoading: param.ListIsLoading || false,
						pageIndex: pageIndex,
						searchKey: param.searchKey || ''
					}
				)
			} else {
				if (ret.data && ret.data.resultCount == 0) {
					dp("updateState", {
						ListIsLoadingEnd: true,
						ListSource: []
					})
				}
			}
		} else {
			Toast.info(ret && ret.errorMessage || '列表数据请求失败');
		}
		window.beingLoaded = false;
		dp("updateState", {
			loading: false,
		})

		// dp('getListDataSource', param);
	}

	function passValue(param) {
		dispatch({
			type : 'count_down/updateState',
			payload : {
				...param
			}
		})
	}
	
	//查看他人详情
	function pushPersonCenter(playerId, gameId) {
		
		var u = navigator.userAgent;
		var isiOS 	= !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		
		if(isiOS) {
			dp('updateState', {playClassName : 'stopPlayer'});
		} 
		dispatch(
			routerRedux.push({
				pathname : '/voteGamePersonCenter',
				query : {
					router : 'voteGamePersonCenter',
				},
				state : {
					playerId : playerId,
					//userId : currentUserId,
					gameBaseId : gameId,
				}
			})
		)
	}
	
	//首页投票
	function voteGameDoneFunction(playerId, userId, gameBaseId, aId, rowData, btnId) {
		setParam(
			'game_vote',
			voteGameModel.tenantId || '未获取',
			voteGameModel.orgId || '未获取',
			voteGameModel.gameBaseId || '未获取',
			voteGameModel.homeDataSource.gameName || '未获取',
			'首页投票',
		);
		let params = {
			playerId:playerId,
			userId : userId,
			gameBaseId : gameBaseId,
			aId: aId,
			btnId:btnId,
		}
		voteDoneFun(params,rowData);
//		dp('voteGameDone', {playerId : playerId, userId : userId, gameBaseId : gameBaseId, aId : aId, rowData : rowData, btnId : btnId});
	}
	async function voteDoneFun(param,rowData) {
		let service_param = {
			service: BASE_URL + '/game/vote/done',
			data: param,
		}

		let dataSource = await requestData(`/thinknode/game/vote/mApi`, {
			method: 'post',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: qs.stringify(service_param),
		});

		let { ret } = dataSource;
		var operationBtn = document.getElementById(param.btnId);
		operationBtn.innerHTML = "投票中";
		function changeButton() {
			setTimeout(function() {
				if(operationBtn) {
					operationBtn.innerHTML = "投 票";
				}
			}, 1000)
		}

		if (ret && ret.errorCode === 9000) {
			var num = document.getElementById(param.aId);

			if(num) {
				num.textContent = parseInt(num&&num.textContent)+1;
			}

			var voteNum = homeDataSource&&homeDataSource.voteNum;

			homeDataSource.voteNum = String(parseInt(voteNum)+1);
			dp("updateState", {
				...param,
				playerId : undefined,
				popMask : false,
				maskName : undefined,
				touchVoteButton : false,
				rowData : undefined,
				homeDataSource : homeDataSource,
			})
			changeButton();
			Toast.info('投票成功', 1);

		}else if(ret && ret.errorCode === 4000) {
			dp("updateState", {
				popMask : true,
				maskName : 'vcCode',
				playerId : param.playerId,
				verificationCode : ret.errorMessage || undefined,
				rowData : rowData || undefined,
				globalDivId : param.aId,
				globalButtonId : param.btnId,
			})
		}
		else{
			changeButton();
			dp("updateState", {
				touchVoteButton : false,
			})
			Toast.info(ret&&ret.errorMessage || '投票失败', 1);
		}
	}
	
	//查看个人详情
	function reviewOrParticipate() {
		
		let isApply = homeDataSource.isApply;
					
		if(homeDataSource.gameStatus != '1' && homeDataSource.gameStatus !='3') {					
			var gameStatusString = homeDataSource.gameStatus == '0' ? '活动未开始' : homeDataSource.gameStatus == '2' ? '活动已结束' : '活动已下架';
			
			if(homeDataSource.gameStatus == '2') {
			   
				if(isApply == '1') {
					dp('updateState', {playClassName : 'stopPlayer'});
					dispatch(
						routerRedux.push({
							pathname : '/voteGamePersonCenter',
							state : {
								playerId : homeDataSource.playerId || undefined,
								userId : currentUserId || undefined,
								gameBaseId : gameBaseId || undefined,
							}
						})
					)
				} else {
					Toast.info(gameStatusString);	
				}
			} else {
				Toast.info(gameStatusString);			
			}
		} else {
			if(isApply == '0') {
				//打点信息
				setParam(
					'game_play',
					voteGameModel.tenantId || '未获取',
					voteGameModel.orgId || '未获取',
					voteGameModel.gameBaseId || '未获取',
					voteGameModel.homeDataSource.gameName || '未获取',
					'我要报名',
				);
				dp('updateState', {playClassName : 'stopPlayer'});
				dispatch(
					routerRedux.push({
						pathname : '/voteGameSubmit',
						state : {
							gameBaseId : gameBaseId,
							userId  : currentUserId,
						}
					})
				)
			} else {
				
				setParam(
					'game_mypage',
					voteGameModel.tenantId || '未获取',
					voteGameModel.orgId || '未获取',
					voteGameModel.gameBaseId || '未获取',
					voteGameModel.homeDataSource.gameName || '未获取',
					'首页查看报名详情',
				);
				dp('updateState', {playClassName : 'stopPlayer'});
				dispatch(
					routerRedux.push({
						pathname : '/voteGamePersonCenter',
						state : {
							playerId : homeDataSource.playerId || undefined,
							userId : currentUserId || undefined,
							gameBaseId : gameBaseId || undefined,
							playClassName : 'stopPlayer',
						}
					})
				)
			}
		}
	}
		
	let props = {
		dp,
		searchKey,
		loading,
		passValue,
		homeDataSource,
		overStatus,
		searchValue,
		ListSource,
		ListPageData,
		ListIsLoading,
		ListIsLoadingEnd,
		popMask,
		maskName,
		selectIndex,
		pushPersonCenter,
		reviewOrParticipate,
		currentUserId,
		verificationCode,
		voteGameDoneFunction,
		touchVoteButton,
		rowData,
		globalDivId,
		globalButtonId,
		funcLoadMoreDataSoucre,
	}
	
	let maskActivityProps = {
		dp,
		popMask,
		maskName,
		selectIndex,
		homeDataSource,
	}
	let maskQrProps = {
		dp,
		popMask,
		maskName,
		qrBase64,
		qrCodeUrl,
        homeDataSource,
	}
	
	let maskContactProps = {
		dp,
		popMask,
		maskName,
		homeDataSource,
	}
		
	let vcProps = {
		dp,
		popMask,
		maskName,
		verificationCode,
		currentUserId,
		inputVerificationCode,
		touchVoteButton,
		rowData,
		globalDivId,
		globalButtonId,
        homeDataSource,
	}
	
    function touchMusic()                {
        var audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
            } else {
                audio.pause();
            }
			dp('updateState', {playClassName : playClassName == "startPlayer" ? 'stopPlayer' : 'startPlayer'});
        }
	};
	
	function setParamFunc(name) {
		sa.track("game_btn", {
			_tenantId : voteGameModel.tenantId,
			_orgId : voteGameModel.orgId,
			_gameTag : '助力类',
			_gameName : '投票游戏',
			_gameInst : voteGameModel.gameBaseId || '未获取',
			_gameInstName : voteGameModel.homeDataSource.gameName || '未获取',
			_gameBtn : name || '',
		});
	}
	
	//事件打点	
	if(maskName == 'maskQr') {
		setParamFunc('二维码');
	} else if(maskName == 'maskContact') {
		setParamFunc('联系商家');
	} else {
		
	}
	
    return (
		<div className={styles.baseBox}>
			<div onClick={() => touchMusic()} className={playClassName} id="video_div"></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={homeDataSource&&homeDataSource.musicUrl} id='audio_cp'></audio>
			<VoteGameComponent {...props} />
			<MaskQrComponent {...maskQrProps} />
			{
				popMask 
					? (maskName == 'maskActivtiy' 
						? <MaskActivityComponent {...maskActivityProps} /> 
						: maskName == 'maskContact' 
						? <MaskContactComponent {...maskContactProps} />
						: maskName == 'vcCode'
					  	? <MaskVerificationCode {...vcProps} />
					  	: '') 
					: ''	
			}
		</div>
    );
}

					
function MaskActivityComponent({
				
	dp,
	popMask,
	maskName,
	selectIndex,
	homeDataSource,
						
}) {
					
	function selectItemIndex(index) {
		dp('updateState', {selectIndex : index});		
	}

	function closeMask() {
		dp('updateState', {popMask : !popMask, maskName : undefined});		
	}
	
	let titleArr = ["活动奖品", "活动规则", "机构介绍"];
	
	//活动奖品
	let awardIntroImgArr = JSON.parse(homeDataSource&&homeDataSource.awardIntroImg);
	
	//机构简介图片
	let orgIntroImgArr = JSON.parse(homeDataSource&&homeDataSource.orgIntroImg);
	
	//活动规则
	let gameRuleArr = JSON.parse(homeDataSource&&homeDataSource.gameRule);

	
	return (
		<div className={styles.LayoutMask}>
			<div className={styles.LayouMaskClose} onClick={() => closeMask()}></div>
			<div className={styles.LayoutTitleBox}>
				{
					titleArr&&titleArr.map((item, index) => {
						let titleStyle = selectIndex == index ? styles.selectItem : styles.noSelectItem;
						return <div key={index} className={titleStyle} onClick={() => selectItemIndex(index)}>{item}</div>
					})		
				}	
			</div>
			{
				selectIndex == 0 
					? 
					<div className={styles.LayoutMaskBox}>	
						<pre className={styles.ActivityPrizeTitle}>{homeDataSource&&homeDataSource.awardIntro}</pre>
						{
							awardIntroImgArr&&awardIntroImgArr.length > 0 ? awardIntroImgArr.map((item, index) => {
									//let itemUrl = 'url(' + item + ')';
									return <img src={item} className={styles.AvtivityCoverImage} />
								})
								: <div className={styles.emptyDataPrompt}>暂无活动奖品</div>
						}
					</div>
					:
				selectIndex == 1 ? 
					<div className={styles.LayoutMaskBox}>	
					<div className={styles.LayoutGameRuleBox}>
						{
							gameRuleArr&&gameRuleArr.map((item, index) => {
								return <pre className={styles.ActivityPrizeTitle}>{item}</pre>
							})
						}
					</div>
					</div>
					: 
				<div className={styles.LayoutMaskBox}>	
					<pre className={styles.ActivityPrizeTitle}>{homeDataSource&&homeDataSource.orgIntro}</pre>
					{
						orgIntroImgArr&&orgIntroImgArr.length > 0 ? orgIntroImgArr.map((item, index) => {
							//let itemUrl = 'url(' + item + ')';
							return <img src={item} className={styles.AvtivityCoverImage} />
						})
						: <div className={styles.emptyDataPrompt}>暂无活动奖品</div>
					}
				</div>
			}
		</div>
	)				
}

function MaskQrComponent({
	
	dp,
	popMask,
	maskName,
	qrBase64,
	qrCodeUrl,
    homeDataSource,
	
}) {
				
	function closeMask() {
		dp('updateState', {popMask : !popMask, maskName : undefined});		
	}
	
	let fontSize = document.getElementsByTagName('html')[0].style.fontSize;
	
	let fontSizeNum = fontSize.substring(fontSize.indexOf('p'), 0);
    //切图
    function makeQr(){
                    if(!window._init_qrcode_div_to_img) {
                         html2canvas(document.getElementById("qrCodeBaseDivFirst")).then(function(canvas) {
                             var image = canvas.toDataURL("image/png");
                             var imgQr = document.createElement('img');
                             imgQr.src = image;
                             imgQr.style.height = "inherit";
                             imgQr.style.borderRadius = "20px";
                             document.getElementById("qrCodeBaseDivFirst").appendChild(imgQr);
                        }).then(function(){
                             document.getElementById("qrCodeBaseDivFirst").removeChild(document.getElementById("qrmain"));
                         });
                        window._init_qrcode_div_to_img = true;
                    }

    }

    if(maskName == 'maskQr'){
        setTimeout(makeQr,300);
    }
	return (
		<div className={styles.LayoutMask} style={maskName == 'maskQr' ? {display : 'inline-block'} : {display : 'none'}}>
			<div className={styles.QrBox} id="qrCodeBaseDivFirst">
                <div  id="qrmain" style={{position:"relative",height:"100%",}}>
				<div className={styles.QrTitle}>活动二维码(长按保存)</div>
                <p className={styles.UserHelperLeft}>
                    我正在参加<span style={{color:"yellow"}} id="gameName">“{homeDataSource.gameName&&homeDataSource.gameName.length>25?(homeDataSource.gameName.slice(0,20)+"..."):homeDataSource.gameName}”</span>活动，赶紧帮我加油哦！
                </p>
				<div className={styles.Qrimage} id="qrCodeBaseDiv" style={{display : 'none'}}>
					<QRCode value={qrCodeUrl || window.location.href} size={fontSizeNum * 3} level="M" />	
					<canvas id="myCanvas" width="300" height="300"></canvas>
				</div>
				<img className={styles.qrCodeStyle} src={qrBase64} />
                <div className={styles.shaoQRC}>
                    <p>长按识别二维码</p>
                    <p>一起参加活动</p>
                </div>
                <p className={styles.helperFoot}>闪闪招生宝提供技术支持</p>
                </div>
                 <img src="//img.ishanshan.com/gimg/img/be3a9ce5345a0939285777a5dba4f533" onClick={() => closeMask()} className={styles.boxClose} alt=""/>
			</div>
                <p className={styles.footerQr}>长按图像保存分享给好友</p>
		</div>
	)
}

function MaskContactComponent({
	
	dp,
	popMask,
	maskName,
	homeDataSource,
	
}) {
		
	function closeMask() {
		dp('updateState', {popMask : !popMask, maskName : undefined});		
	}
	
	function contactCancel() {
		closeMask();
	}
	
	function contactDetermine(mobile) {
		window.location.href = `tel:${mobile}`;
	}
	
	return (
		<div className={styles.LayoutMask}>
			<div className={styles.ContactBox}>
				<div className={styles.ContactTitle}>提示</div>
				<div className={styles.ContactPhone}>确定拨打电话：{homeDataSource&&homeDataSource.businessTel}</div>
				<div className={styles.ContentButtonBox}>
						<div className={styles.ContactCancel} onClick={() => contactCancel()}>取消</div>
						<div className={styles.ContactDetermine} onClick={() => contactDetermine(homeDataSource&&homeDataSource.businessTel)}>确定</div>	
				</div>
			</div>
		</div>
	)
}

function MaskVerificationCode({
	
	dp,
	popMask,
	maskName,
	currentUserId,
	verificationCode,
	playerId,
	inputVerificationCode,
	touchVoteButton,
	rowData,
	globalDivId,
	globalButtonId,
	
}) {	
	
	function cancel() {
				
		var operationBtn = document.getElementById(globalButtonId);	
		
		operationBtn.innerHTML = "投 票";		
		
		dp('updateState', {maskName : undefined, popMask : !popMask, verificationCode : undefined, touchVoteButton : false});
	}
		
	function determine() {

		if(inputVerificationCode&&inputVerificationCode.length > 0) {
			if(inputVerificationCode.replace(/\s/g,"") === verificationCode) {
				dp('voteGameDone', {code : inputVerificationCode.replace(/\s/g,""), userId : currentUserId, gameBaseId : rowData.gameBaseId || undefined, playerId : rowData.playerId || undefined, aId : globalDivId, btnId : globalButtonId});
			} else {
				Toast.info('验证码输入错误', 1);
			}   
		} else {
			Toast.info('验证码不能为空', 1);	
		}
	}
	
	function inputChange(v) {
		dp('updateState', {inputVerificationCode : v});
	}
	
	return (
			
		<div className="vcMask">
			<div className="VcBox">
				<div className={styles.vcText}>请输入下面验证码</div>
				<div className={styles.vcString}>{verificationCode}</div>
				<div className={styles.inputBox}>
		        	<InputItem placeholder="请输入验证数字" type="phone" onChange={inputChange}></InputItem>
				</div>
				<div className={styles.cancelButton} onClick={ () => cancel()}>取消</div>
				<div className={styles.determineButton} onClick={ () => determine()}>确定</div>
			</div>
		</div>
	)
}


VoteGamePage.propTypes = {
    voteGameModel: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ voteGameModel }) {
    return { voteGameModel };
}
export default connect(mapStateToProps)(VoteGamePage);
