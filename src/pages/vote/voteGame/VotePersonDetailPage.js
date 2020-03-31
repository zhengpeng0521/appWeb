import React, { PropTypes } from 'react';
import { connect } from 'dva';
import VotePersonDetailComponent from '../../../components/vote/voteGame/VotePersonDetailComponent';
import { routerRedux } from 'dva/router';
import styles from './VotePage.less';
import { Toast, InputItem} from 'antd-mobile';


function VoteGamePersonPage({location, dispatch, vote_person_detail}) {
	
	let {
		
		errorMsgString,
		dataSource,
		userId,
		gameBaseId,	
		verificationCode,
		inputVerificationCode,
		playerId,
		popMask,
		showShare,
		touchVoteButton,
		orgData,
        orgName,
		
	} = vote_person_detail;
	

	function dp(name, param) {
		dispatch({
			type : `vote_person_detail/${name}`,
			payload : {
				...param
			}
		})
	}
	
	function backPage() {
		setParam(
			'game_fill_before',
			vote_person_detail.tenantId || '未获取',
			vote_person_detail.orgId || '未获取',
			vote_person_detail.gameBaseId || '未获取',
			vote_person_detail.dataSource.gameName || '未获取',
			'详情页填写资料前',
		);

		dispatch(
			routerRedux.push({
				pathname : '/voteGame',
				state : {
					gameBaseId : gameBaseId,
					userId : userId,
				}
			})
		)
	}
		
	//投票
	function voteFunction() {		
		setParam(
			'game_vote',
			vote_person_detail.tenantId || '未获取',
			vote_person_detail.orgId || '未获取',
			vote_person_detail.gameBaseId || '未获取',
			vote_person_detail.dataSource.gameName || '未获取',
			'详情页投票',
		);

		dp('voteGameDone', {playerId : dataSource.playerId, gameBaseId : gameBaseId, userId : userId});
	}
	
	//报名参加
	function pushBaomingFunction() {
		setParam(
			'game_play',
			vote_person_detail.tenantId || '未获取',
			vote_person_detail.orgId || '未获取',
			vote_person_detail.gameBaseId || '未获取',
			vote_person_detail.dataSource.gameName || '未获取',
			'详情页我要报名',
		);

		dispatch(
			routerRedux.push({
				pathname : '/voteGameSubmit',
				state : {
					gameBaseId : gameBaseId,
					userId : userId,
				}
			})
		)
	}
	
	//返回主页
	function returnMainPageFunction() {
		dispatch(
			routerRedux.push({
				pathname : '/voteGame',
				state : {
					gameBaseId : gameBaseId,
					userId : userId,
				}
			})
		)
	}
	
	//查看自己的报名信息
	function pushSelfDetailFunction() {
				
		setParam(
			'game_mypage',
			vote_person_detail.tenantId || '未获取',
			vote_person_detail.orgId || '未获取',
			vote_person_detail.gameBaseId || '未获取',
			vote_person_detail.dataSource.gameName || '未获取',
			'详情页查看报名详情',
		);

		dispatch(
			routerRedux.push({
				pathname : '/voteGamePersonCenter',
				state : {
					playerId : dataSource.userPlayerId || undefined,
					userId : userId,
					gameBaseId : gameBaseId,
				}
			})
		)
	}
	
	let personDetailProps = {
		dp,
		showShare,
		backPage,
		dataSource,
		errorMsgString,
		voteFunction,
		pushBaomingFunction,
		returnMainPageFunction,
		pushSelfDetailFunction,
		touchVoteButton,
		orgData,
        orgName,
	}

			
	let vcProps = {
		dp,
		popMask,
		userId,
		playerId,
		gameBaseId,
		verificationCode,
		inputVerificationCode,
		touchVoteButton,
	}
	
    return (
		<div style={{height : '100%'}}>
			<VotePersonDetailComponent {...personDetailProps} />
			{popMask ? <MaskVerificationCode {...vcProps} /> : ''}
		</div>
    );
}

function MaskVerificationCode({
	
	dp,
	popMask,
	userId,
	verificationCode,
	playerId,
	gameBaseId,
	inputVerificationCode,
	touchVoteButton,
	
}) {	
		
	function cancel() {
		dp('updateState', {maskName : undefined, popMask : !popMask, verificationCode : undefined, touchVoteButton : false});
	}
	
	function determine() {		
		if(inputVerificationCode&&inputVerificationCode.length > 0) {
			if(inputVerificationCode.replace(/\s/g,"") === verificationCode) {
				dp('voteGameDone', {code : inputVerificationCode.replace(/\s/g,""), userId : userId, gameBaseId : gameBaseId, playerId : playerId});
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



VoteGamePersonPage.propTypes = {
    vote_person_detail: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ vote_person_detail }) {
    return { vote_person_detail };
}

export default connect(mapStateToProps)(VoteGamePersonPage);
