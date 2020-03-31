import React from 'react';
import styles from './activityDetialComponent.less';
import { Carousel, WingBlank, WhiteSpace, Icon, Toast, Modal } from 'antd-mobile';
import {getTimeDifference} from '../../../utils/date.js';

function activityDetialComponent({
	dp,
    activitySource,  //所有数据
    activityAddress,
    showModal,
    functionMyActivityPage,

}){

    //查看更多校区
    function showMoreSchool () {
        activityAddress.showMoreSchool()
    }
    //报名用户
    let RegisteredUsers = activitySource.successStus || [];

    //等位用户
    let NotRegisteredUsers = activitySource.waitStus || [];

    //拨打电话
	function callPhone() {
       if(activitySource.mobile == '' || activitySource.mobile == undefined || activitySource.mobile == 'undefined') {
			Toast.info('手机号码号码为空', 2);
			return;
		} else {
//			let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
//			let phone = activitySource.mobile.replace(/\s/g, "");
//			if (!reg.test(phone)) {
//				Toast.fail("手机号码错误", 2);
//				return;
//			}
			if(isNaN(activitySource.mobile.replace(/\s/g, ""))) {
				return Toast.fail("电话号码错误", 1);
			} 
		}
		window.location.href = `tel:${activitySource.mobile || ''}`;
	}

    //会员专属
    let activityType = activitySource.activityType == 1 ? ' [会员专属]' : '';

    //详情图片
    let detailPic = activitySource && activitySource.actBanner || (activitySource&&activitySource.detailPic || 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f');
    detailPic = detailPic.split(',');
    let detailImg = [];
    detailPic&&detailPic.map((img_item, index) => {
        detailImg.push(
            <div key={index} className={styles.activity_banner} style={{backgroundImage: `url(${img_item})`}}>

            </div>
        )
    });

    //活动时间
    let activitystartTime = activitySource.activitystartTime;   //活动开始时间
    let activityendTime = activitySource.activityendTime;       //活动结束时间
    var timestamp = Date.parse(new Date());             	 	//当时时间
    let activityTime	= '';

    //立即报名
    let applystartTime = activitySource.applystartTime; //报名开始时间
    let applyendTime = activitySource.applyendTime;   //报名结束时间

    //是否过期
    let overdue = activityendTime > timestamp;

    function activityJoin () {

        if(applystartTime > 0 && applyendTime > 0) {
            if( applystartTime > timestamp) {
                //活动未开始
                Toast.info('报名还未开始，请再耐心等待一下哦',2);
            }else if( applyendTime  < timestamp) {
                //已结束
                Toast.info('报名已经结束，下次早点来哦',2);
            }else if(applystartTime  < timestamp && applyendTime  > timestamp) {
                //活动中
                activityAddress.showactivityJoin();
            }
        }
    }

    let activityStatusString = '';

    function baoming () {
        let layout = '';
        if(applystartTime>0 && applyendTime>0) {
            if(applystartTime > timestamp) {
                //开始时间和结束时间大于当前时间
                activityStatusString = '未开始';
                layout = <div className={styles.activityState} style={{opacity:'0.5'}}>未开始</div>
            }
            if(applyendTime  < timestamp) {
                //开始时间和结束时间都小于开始时间当前时间
                activityStatusString = '已结束';
                layout = <div className={styles.activityState} style={{background:'#999'}} >已结束</div>
            }
            if(applystartTime  < timestamp && applyendTime  > timestamp) {
                //开始时间大于当前时间并且结束时间小于当前时间
                activityStatusString = '我要报名';
                layout = <div className={styles.activityState} >报名中</div>
            }
            if (activitySource.status) {
                activityStatusString = parseInt(activitySource.status) === 2 ? '已下架' : activityStatusString;
            }
            return layout;
        }
    }

    if(applystartTime>0 && applyendTime>0) {
        if(applystartTime > timestamp) {
            //开始时间和结束时间大于当前时间
            let time = getTimeDifference(timestamp, applystartTime);
            activityTime = `距报名开始还有：${time.d} 天 ${time.h} 时 ${time.m} 分`;
        }
        if(applyendTime  < timestamp) {
            //开始时间和结束时间都小于开始时间当前时间
            activityTime = '报名已经结束，下次早点来哦';

        }
        if(applystartTime  < timestamp && applyendTime  > timestamp) {
            //开始时间大于当前时间并且结束时间小于当前时间
            let time = getTimeDifference(timestamp, applyendTime);
            activityTime = `距报名结束还有：${time.d} 天 ${time.h} 时 ${time.m} 分`;
        }
    }

    //活动费用
    let materialFee = '' ;
    let classCus = '';
    if( activitySource.materialFee == 0 && activitySource.classCus == 0 ){
        materialFee = '免费';
        classCus = '';
    } else {
        if( activitySource.materialFee > 0 ){
            materialFee = `物料费：${activitySource.materialFee} 元`;
        }
        if( activitySource.classCus > 0 ){
            classCus = `消耗课时：${activitySource.classCus} 节 `;
        }
    }

    //添加选项
    let activityIntroStr = activitySource.activityContent || '';
    let activityIntroArr= eval(activityIntroStr ? activityIntroStr : []);
    let activityIntro = [];
    activityIntroArr&&activityIntroArr.map((item, index) => {
        let activityIntroInnerArr = item.content || [];
        let activityIntroInner = [];
        activityIntro.push(
            <div key={index}>
                <div className={styles.activityIntroTop}>
                    <p className={styles.circle}></p>
                    <p className={styles.activityIntroName}>{item.title}</p>
                </div>

                {
                    activityIntroInnerArr&&activityIntroInnerArr.map((item1, index1) => {
                        activityIntroInner.push(
                            item1.contentDetail == '' ? '' :
                            <p key={index1} className={styles.activityIntro}>{item1.contentDetail || ''}</p>
                        )
                    })
                }
                {activityIntroInner}

            </div>

        )
    });

    //活动开始时间
    function add0(m){
        return m<10?'0'+m:m
    };
    let activityBegainTime = activitySource.activitystartTime || '';
    let activityBegainTime1 = new Date(parseInt(activityBegainTime));
    let starty = activityBegainTime1.getFullYear();
    let startm = activityBegainTime1.getMonth()+1;
    let startd = activityBegainTime1.getDate();
    let starth = activityBegainTime1.getHours();
    let startmm = activityBegainTime1.getMinutes();
    let starts = activityBegainTime1.getSeconds();
    let activityBegainTimeShow = starty+'-'+add0(startm)+'-'+add0(startd)+' '+add0(starth)+':'+add0(startmm)+':'+add0(starts);

	let activityEndTime = activitySource.activityendTime || '';
    let activityEndTime1 = new Date(parseInt(activityendTime));
    let endy = activityEndTime1.getFullYear();
    let endm = activityEndTime1.getMonth()+1;
    let endd = activityEndTime1.getDate();
    let endh = activityEndTime1.getHours();
    let endmm = activityEndTime1.getMinutes();
    let ends = activityEndTime1.getSeconds();
    let activityEndTimeShow = endy+'-'+add0(endm)+'-'+add0(endd)+' '+add0(endh)+':'+add0(endmm)+':'+add0(ends);

	function onClose() {
		dp('updateState', {showModal : !showModal})
    }

    //我也要创建活动
    function functionCreateActivity() {
        window.open('https://saas.ishanshan.com/saas-web/orgApplyController/redirectPage/395505165635026944', '_blank');
    }

    //查看我的活动
    function functionMyActivity() {
        functionMyActivityPage();
    }

    return(
        <div className="activityDetialBase">
            <div className={styles.toJsHome} onClick={() => activityAddress.touchHomeIconFunction()}>
				<img src="//img.ishanshan.com/gimg/img/36ae96c3de6d8635246351fac47b482f" alt=""/>
				<p>首页</p>
            </div>
          <Carousel
				className="activity-carousel"
			  	dots={false} 
				dragging={false} 
				infinite={detailImg&&detailImg.length>1}
				swiping={detailImg&&detailImg.length>1}
				autoplay
				style={{height : '400px'}}
			>
              {detailImg}
			</Carousel>
            <div className={styles.activityTitlebox}>
                <WingBlank size="md">
                    <p className={styles.activityTitle}><span className={styles.activityVip}>{activityType}</span> {activitySource.name || '默认活动名称'}</p>
                    {baoming()}
                    <div className={styles.activityTime}>
                        {activityTime}
                    </div>
                </WingBlank>
            </div>
            <WhiteSpace style={{background : "rgb(240,241,242)"}} />

            <div className={styles.activityAddressbox}>
                {/*
                <WingBlank size="md">
                    <div style={{overflow:'hidden'}}>
                        <div className={styles.activitySchool}>{activitySource.orgName || '活动校区'}{activitySource.orgNum == 1 ? '' : `（${activitySource.orgNum}）`}</div>
						{
							activitySource.orgNum > 1 ? <div className={styles.activityArrow} onClick={showMoreSchool}>查看更多></div> : ''
						}
                    </div>

                    <div className={styles.bottomline}></div>
                </WingBlank>
                */}
                <WingBlank size="md">
					<div className={styles.activityAddress} onClick={activityAddress.callbackMap}>
                        <div className={styles.mapIcon}>
							<svg aria-hidden="true"
								style={{height : 40, width : 40}}
								onClick={() => activityAddress.touchHomeIconFunction()}>
                                <use xlinkHref="#anticon-addressnew"></use>
							</svg>
					    </div>
                        <p className={styles.address_p}>{activitySource.address || '无法获取地址'}
                        </p>
                        <div className={styles.right_line}></div>
                    </div>
                    <div className={styles.activityTelBox}>
                        <div className={styles.telIcon} onClick={callPhone}>
							<svg aria-hidden="true" style={{height : 50, width : 50, marginTop : 25}}>
								<use xlinkHref="#anticon-phone"></use>
							</svg>
					    </div>
                    </div>
				</WingBlank>
            </div>
            <div className={styles.setOption}>
                <WingBlank size="md">
                    <p className={styles.actLabel}>
                        <span>
                            <svg aria-hidden="true" style={{ height: 35, width: 35, paddingRight: 20 }}>
                                <use xlinkHref="#anticon-Shape"></use>
                            </svg>
                        </span>
                            所属校区:{activitySource.orgName || ''}
                        <span className={styles.moreCampus} onClick={() => showMoreSchool()}>
                            查看更多>
                        </span>
                    </p>
                    <p className={styles.actLabel}>
                        <span>
                            <svg aria-hidden="true" style={{ height: 35, width: 35, paddingRight: 20 }}>
                                <use xlinkHref="#anticon-location"></use>
                            </svg>
                        </span>活动地址：{activitySource.actAdress || '获取失败' }
                    </p>
                    <p className={styles.actLabel}>
                        <span>
                            <svg aria-hidden="true" style={{ height: 35, width: 35, paddingRight: 20 }}>
                                <use xlinkHref="#anticon-time1"></use>
                            </svg>
                        </span>活动时间：{activityBegainTimeShow || ''} 至 {activityEndTimeShow || ''}
                    </p>
                    {
                        activitySource.number ?
                            <p className={styles.actLabel}>
                                <span>
                                    <svg aria-hidden="true" style={{ height: 35, width: 35, paddingRight: 20 }}>
                                        <use xlinkHref="#anticon-peoplenew"></use>
                                    </svg>
                                </span>活动人数：{activitySource.number || '0'}人
                                </p>
                            : ''
                    }
                    {
                        activitySource.target ?
                            <p className={styles.actLabel}>
                                <span>
                                    <svg aria-hidden="true" style={{ height: 35, width: 35, paddingRight: 20 }}>
                                        <use xlinkHref="#anticon-duixiangnew"></use>
                                    </svg>
                                </span>活动对象：{activitySource.target || ''}
                            </p>
                            : ''
                    }
                    <p className={styles.actLabel}>
                        <span>
                            <svg aria-hidden="true" style={{ height: 35, width: 35, paddingRight: 20 }}>
                                <use xlinkHref="#anticon-moneynew"></use>
                            </svg>
                        </span>报名缴费：
                        {
                            activitySource.classCus && activitySource.materialFee ?
                            <span>
                                {activitySource.classCus ? `消耗课时 ${activitySource.classCus} 节` : '0节'}&nbsp;&nbsp;
                                {activitySource.materialFee ? `物料费 ${activitySource.materialFee} 元` : '0元'}
                            </span>
                            :
                            activitySource.classCus ?
                            <span>
                                {activitySource.classCus ? `消耗课时 ${activitySource.classCus} 节` : '0节'}&nbsp;&nbsp;
                            </span>
                            : activitySource.materialFee ?
                            <span>
                                {activitySource.materialFee ? `物料费 ${activitySource.materialFee} 元` : '0元'}
                            </span>
                            : '免费'
                        }
                    </p>
                </WingBlank>
            </div>
            <WhiteSpace style={{background : "rgb(240,241,242)"}} />
            <div className={styles.activityDetailbox}>
                <WingBlank size="md">
                    <div className={styles.blueBox}></div>
                    <p className={styles.activityDetailTitle}>活动内容</p>
                    {
                        activitySource.actHtml != undefined && activitySource.actHtml != ''
                            ?
                            <div className="htmlStyle" dangerouslySetInnerHTML={{ __html: activitySource.actHtml }}></div>
                            :
                            <div className={styles.activityIntroBox}>
                                <div className={styles.activityIntroTop}>
                                    <p className={styles.circle}></p>
                                    <p className={styles.activityIntroName}>活动时间</p>
                                </div>
                                <p className={styles.activityIntro}>{activityBegainTimeShow || '默认活动时间'} - {activityEndTimeShow || ''}</p>

                                <div className={styles.activityIntroTop}>
                                    <p className={styles.circle}></p>
                                    <p className={styles.activityIntroName}>活动地点</p>
                                </div>
                                <p className={styles.activityIntro}>{activitySource.actAdress || '默认活动地点'}</p>

                                <div className={styles.activityIntroTop}>
                                    <p className={styles.circle}></p>
                                    <p className={styles.activityIntroName}>活动人数</p>
                                </div>
                                <p className={styles.activityIntro}>{activitySource.number || '默认活动人数'}</p>

                                <div className={styles.activityIntroTop}>
                                    <p className={styles.circle}></p>
                                    <p className={styles.activityIntroName}>报名缴费</p>
                                </div>
                                <p className={styles.activityIntro}>{(classCus + materialFee) || '默认活动缴费'}</p>

                                <div className={styles.activityIntroTop}>
                                    <p className={styles.circle}></p>
                                    <p className={styles.activityIntroName}>活动对象</p>
                                </div>
                                <p className={styles.activityIntro}>{activitySource.target || '默认活动对象'}</p>

                                {activityIntro}
                            </div>
                    }
                </WingBlank>
            </div>
            <WhiteSpace style={{background : "rgb(240,241,242)"}} />

            {activitySource && activitySource.participate == '1' ?
                <div className={styles.activityRegisteredbox}>
                    <WingBlank size="md">
                        <div className={styles.blueBox}></div>
                        <p className={styles.activityTitle}>已报名<span className={styles.activityRegistered}>{RegisteredUsers.length}</span>人 </p>
                        <div className={styles.RegisteredUsersBox}>
                            {
                                RegisteredUsers&&RegisteredUsers.length>0&&RegisteredUsers.map(function(item, index) {
                                    let newName = '';
                                    switch (item.name&&item.name.length) {
                                        case 1:
                                            newName = item.name&&item.name;
                                        break;
                                        case 2:
                                            newName = item.name&&item.name.substring(0, item.name.length - 1) + '*';
                                        break;
                                        default:
                                            newName = item.name&&item.name.substring(0, 1) + "*" + item.name.substring(item.name.length, item.name.length - 1);
                                            break;
                                        }
                                    return <div key={index} className={styles.usersBox}>
                                        <img src={item.headimgurl || 'http://img.ishanshan.com/gimg/img/8fff183edf337819cbe9bb3c6e96ba44'} />
                                        <p className={styles.usersBoxName}>{newName || item.name}</p>
                                    </div>
                                })
                            }
                        </div>
                    </WingBlank>
                </div>
            : '' }

            <WhiteSpace style={{background : "rgb(240,241,242)"}} />

            {activitySource && activitySource.waiting ?
                <div className={styles.activityRegisteredbox}>
                    <WingBlank size="md">
                        <div className={styles.blueBox}></div>
                        <p className={styles.activityTitle}>已等位<span className={styles.activityRegistered}>{NotRegisteredUsers.length}</span>人</p>
                        <div className={styles.RegisteredUsersBox}>
                            {
                                NotRegisteredUsers&&NotRegisteredUsers.length>0&&NotRegisteredUsers.map(function(item, index) {
                                    let newName = '';
                                    switch (item.name&&item.name.length) {
                                        case 1:
                                            newName = item.name&&item.name;
                                            break;
                                        case 2:
                                            newName = item.name&&item.name.substring(0, item.name.length - 1) + '*';
                                            break;
                                        default:
                                            newName = item.name&&item.name.substring(0, 1) + "*" + item.name.substring(item.name.length, item.name.length - 1);
                                            break;
                                    }
                                    return <div key={index} className={styles.usersBox}>
                                        <img src={item.headimgurl || 'http://img.ishanshan.com/gimg/img/8fff183edf337819cbe9bb3c6e96ba44'}/>
                                        <p className={styles.usersBoxName}>{newName}</p>
                                    </div>

                                })
                            }
                        </div>
                    </WingBlank>
                </div>
            : ''}

            <div className={styles.createActivityButton} onClick={() => functionCreateActivity()}>我也要创建活动<span className={styles.addIcon}>+</span></div>

			<Modal
				  title=""
				  transparent
				  maskClosable={false}
				  visible={showModal}
				  onClose={() => onClose()}
				  footer={[{ text: '确定', onPress: () => onClose()}]}
				>
					该活动为会员专属活动，系统暂未检测到会员信息，无法报名，如有疑问，请联系机构
			</Modal>

            <div className={styles.createActivityLeft1} onClick={() => functionCreateActivity()}>
                <svg aria-hidden="true" style={{ height: 35, width: 35, marginBottom: 10 }}>
                    <use xlinkHref="#anticon-jianew"></use>
                </svg>
                <p className={styles.createActivityString}>创建活动</p>
            </div>
            <div className={styles.createActivityLeft2} onClick={() => functionMyActivity()}>
                <svg aria-hidden="true" style={{ height: 35, width: 35, marginBottom: 7 }}>
                    <use xlinkHref="#anticon-huodong"></use>
                </svg>
                <p className={styles.createActivityString}>我的活动</p>
            </div>
            <p className={activityStatusString == '我要报名' ? styles.activityJoinBtn : styles.activityJoinBtnDis} onClick={activityStatusString == '我要报名' ? () => activityJoin() : ''}>
                {activityStatusString}
            </p>

        </div>
    )
}

export default activityDetialComponent;
