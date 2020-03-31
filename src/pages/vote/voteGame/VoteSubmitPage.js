import React, { PropTypes } from 'react';
import { connect } from 'dva';
import VoteGameSubmitComponent from '../../../components/vote/voteGame/VoteSubmitComponent';
import { routerRedux } from 'dva/router';
import styles from './VotePage.less';

function VoteGameSubmitPage({location, dispatch, vote_submit}) {
	
	let {
		
		files,
		showMask,
		touchType,
		agreedStatus,
		submitDateSource,
		showAgreementModal,
		gameBaseId,
		showSuccess,
		userId,
		orgData,
		fromData,
		successPlayerId,
		ActivityIndicatorImage,
        pickscarea,
        scareas,

        homeDataSource,

	} = vote_submit;

    let gameName = homeDataSource.gameName;

	function dp(name, param) {
		dispatch({
			type : `vote_submit/${name}`,
			payload : {
				...param
			}
		})
	}
	
	function passValue(param) {
//		dispatch({
//			type : 'count_down/updateState',
//			payload : {
//				...param
//			}
//		})
	}
	
	function popDetermine(value) {		
		dp('updateState', {showMask : !showMask, touchType : 'submit', submitDateSource : value});
	}
	
	function popTerms() {
		dp('updateState', {showMask : !showMask, touchType : 'terms'});
	}

	//返回主页
	function returnPopPageFunction() {
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
	
	function popHomeFunction() {
		dispatch(
			routerRedux.push({
				pathname : '/voteGame',
				state : {
					gameBaseId : gameBaseId,
					openId : openId,
				}
			})
		)

	}
	
	function popDetailFunction() {
		dispatch(
			routerRedux.push({
				pathname : '/voteGamePersonCenter',
				state : {
					playerId : successPlayerId,
					userId : userId || undefined,
					gameBaseId : gameBaseId || undefined,
				}
			})
		)
	}
	
	let props = {
		dp,
		files,
		gameBaseId,
		userId,
		agreedStatus,
		showMask,
		popTerms,
		touchType,
		popDetermine,
		fromData,
		showAgreementModal,
		submitDateSource,
		showSuccess,
		orgData,
		returnPopPageFunction,
		ActivityIndicatorImage,
        pickscarea,
        scareas,
		
	}
	
	let submitProps = {
		dp,
		showMask,
		touchType,
		showSuccess,
		submitDateSource,
		popHomeFunction,
		popDetailFunction,
        gameName,
		
	}

	let termsProps = {
		dp,
		showMask,
		touchType,
		submitDateSource,
	}
	
    return (
		<div style={{overflow : 'hidden', height: '100%'}}>
			<VoteGameSubmitComponent {...props} />
			{showMask ? touchType == 'submit' ? <SubmitComponent {...submitProps} /> : <TermsComponent {...termsProps}/> : ''}
		</div>
    );
}
//console.info(window.openId,"123456789")
function SubmitComponent({
dispatch,
	dp,
	showMask,
	touchType,
	showSuccess,
	submitDateSource,
	popHomeFunction,
	popDetailFunction,
    gameName,
	
}) {	

    let name = submitDateSource.babyName;
	function cancelSunmit() {
		dp('updateState', {showMask : !showMask, touchType : undefined});	
		if(showSuccess) {
			popHomeFunction();
		} 
	}
	
	function determineSunmit() {
		if(showSuccess) {
			popDetailFunction();
			dp('updateState', {showMask : !showMask, touchType : undefined});
		} else {
			dp('submitValue', {touchType : 'submit', data : submitDateSource});
		}
	}

    function codeSubmit(paramer) {


        let maskidName = document.getElementById("maskidName");
        let myrame = document.getElementById("myrame");

        myrame.style.display="block";
        maskidName.style.display="block";

          let url = window.location.href.split("?")[1];              /*获取url里"?"后面的值*/
          if(url.indexOf("&")>0){                                  /*判断是否是一个参数还是多个参数*/
             let urlParamArry=url.split("&");                          /*分开每个参数，并放到数组里*/
             for(var i=0; i<urlParamArry.length; i++){
             let paramerName=urlParamArry[i].split("=");           /*把每个参数名和值分开，并放到数组里*/
                 if(paramer==paramerName[0]){                  /*匹配输入的参数和数组循环出来的参数是否一样*/
                      return paramerName[1];                      /*返回想要的参数值*/
                 }
             }
          }else{                                                /*判断只有个参数*/
               var paramerValue=url.split("=")[1];
               return paramerValue;
            }

        let gameBaseId = codeSubmit('gameBaseId');
        gameBaseId = gameBaseId.substring(0,18);
        let tenantId = codeSubmit('tenantId');
        let orgId = codeSubmit('orgId');

//        console.info(gameBaseId,tenantId,orgId,gameName,type)
//        dp('getCodePage', {gameBaseId : gameBaseId ,orgId : orgId, gameName : gameName, name : name, type:type});

//        window.location.href="/thinknode/weixinh5/page/attentionQrcode"


       }

    function maskidNameClick(){
        let maskidName = document.getElementById("maskidName");
        let myrame = document.getElementById("myrame");
        maskidName.style.display="none";
        myrame.style.display="none";
        console.info("aaa")


    }
    function ParentPageClick(e){
//        var e = window.event || e;
        console.info("ParentPageClick")
         e.stopPropagation();
    }

    let gameBaseId = window.gameBaseIdValue;
    let openid = window.openId;
    let orgId = window.orgIdValue;


    let address = "/thinknode/weixinh5/page/attentionQrcodeImage?openid="+openid+'&gameBaseId='+gameBaseId+'&orgId='+orgId+'&gameName='+'投票游戏'+'&name='+name+'&type=1&init_font_size=70'


	let newStyle = showSuccess ? styles.determineSuccessImage : styles.determineImage;
	
	let textStyle = showSuccess ? styles.determineCuccessText : styles.determineImageText;



	return (
		<div className={styles.LayoutMask}>
		 	<div className={newStyle}>
		 		<div className={textStyle}>{showSuccess ? '报名成功' : '提交之后，报名信息无法修改，确认提交？'}</div>
		 	</div>
		 	<div className={styles.submitButtonBox}>
		 		<div className={styles.submitCancel} onClick={() => cancelSunmit()}>{showSuccess ? '返回主页' : '我再看看'}</div>
		 		<div className={styles.submitDetermine} onClick={() => determineSunmit()}>{showSuccess ? '查看详情' : '确定'}</div>
                <div className='submitCode' onClick={() => codeSubmit()} data-game="{{gameName}}">关注我们及时接收报名进度</div>


                <div id="maskidName" onClick={maskidNameClick}>
                   <div id="ParentPage" onClick={ParentPageClick}>
                        <img id="myrame" src={address}  />

                        <img id="img_min_logo" src="/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/114e3b02913a0b8a117bac2f8a5e9253" />

                        <div id="btmTxt">
                          长按关注闪闪可实时查看报名活动情况
                        </div>
                 </div>
              </div>

		 	</div>
		 </div>	  
	)
}


function TermsComponent({
	dp,
	showMask,
	touchType,
	
}) {
	
	function closePage() {
		dp('updateState', {showMask : !showMask, touchType : undefined});
	}
	
	let string = "第一条 协议订立\n1.1用户在同意本网站的《用户协议》后，方可使用本网络服务平台（以下简称“平台”）提供的订相关服务（以下简称“服务”）。\n1.2用户在使用本平台提供的服务前务必认真阅读本协议，一旦用户使用本平台提供的服务即表示用户同意与本平台签订本协议且同意受本协议之约束。\n\n第二条 禁止声明\n禁止用户进行以下侵害本公司活动合规性的行为，包括但不限于：\n2.1 违反宪法确定的基本原则的；\n2.2 危害国家统一、主权和领土完整的；\n2.3 泄露国家秘密、危害国家安全或者损害国家荣誉和利益的；\n2.4 煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯的；\n2.5 宣扬邪教、迷信的；\n2.6 散布谣言，扰乱社会秩序，破坏社会稳定的；\n2.7 宣扬淫秽、色情、赌博、非法彩票、暴力，或者教唆犯罪的；\n2.8 侮辱、诽谤他人，侵害他人合法权益的；\n2.9 违背社会公德的；\n2.10 有法律、行政法规和国家规定禁止的其他内容的。\n\n第三条  用户注意事项\n3.1 您理解并同意：为了向您提供有效的服务，本软件会利用您通讯终端的处理器和带宽等资源。本服务使用过程中可能产生流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。 \n3.2您理解并同意：本服务的功能会让第三方知晓用户的信息，例如：用户的报名信息和用户自己上传的图片及参赛信息等。  \n3.3 您理解并同意闪宝科技将会尽其商业上的合理努力保障您在本服务中的数据存储安全，但是，并不能就此提供完全保证，包括但不限于以下情形： \n3.3.1 闪宝科技不对您在本服务中相关数据的删除或储存失败负责； \n3.3.2 闪宝科技有权根据实际情况自行决定单个用户在本软件及服务中数据的最长储存期限。您可根据自己的需要自行备份本软件及服务中的相关数据； \n3.3.3 如果您停止使用本服务或服务被终止或取消，服务停止、终止或取消后，闪宝科技没有义务向您返还任何数据。 \n3.4 用户在使用本软件及服务时，须自行承担如下来自闪宝科技不可掌控的风险内容，包括但不限于： \n3.4.1由于不可抗拒因素可能引起的个人信息丢失、泄漏等风险； \n3.4.2 用户在使用本服务，同时访问第三方网站时，因第三方网站及相关内容所可能导致的风险，由用户自行承担； \n3.4.3 用户发布的内容被他人转发、分享，因此等传播可能带来的风险和责任； \n3.4.4 由于网络信号不稳定、网络带宽小等原因，所引起的登录失败、资料同步不完整、页面打开速度慢等风险。 \n\n第四条 争议解决及法律规范\n4.1在用户的预订生效后，如果在本协议或订单约定内容履行过程中，对相关事宜的履行发生争议，用户同意按照中华人民共和国颁布的相关法律法规来解决争议，并同意接受杭州市滨江区人民法院的管辖。\n4.2 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。 \n4.3 若您和闪宝科技之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。 ";
	
	let stringArr = string.split('\n');
	
	return (
		<div className={styles.LayoutMask}>
			<div className={styles.closeImage} onClick={() => closePage()}></div>
			<div className={styles.bgImage}>
			<div className={styles.declarationTitle}>用户条款</div>
			<div className={styles.textBox}>
				{
					stringArr&&stringArr.map((item, index) => {
						return <div className={styles.termsText}>{item}</div>
					})
				}
			</div>
			</div>
		</div>	 
	)
}

VoteGameSubmitPage.propTypes = {
    vote_submit: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ vote_submit }) {
    return { vote_submit };
}

export default connect(mapStateToProps)(VoteGameSubmitPage);
