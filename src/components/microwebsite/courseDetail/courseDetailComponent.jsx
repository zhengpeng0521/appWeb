import React from 'react';
import styles from './courseDetailComponent.less';
import { Carousel, WingBlank, WhiteSpace, Icon } from 'antd-mobile';

function courseDetailComponent({
    courseSource,
    showmoreSchoolFun,
    microMaaFun,
    touchHomeIconFunction,
    callbackMap,
}){

	//详情图片
    let detailPic = courseSource&&courseSource.detailPic || 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f';
    detailPic = detailPic.split(',');
    let detailImg = [];
    detailPic&&detailPic.map((img_item, index) => {
        detailImg.push(
            <div key={index} className={styles.course_banner} style={{backgroundImage: `url(${img_item})`}}>

            </div>
        )
    });

     //跳转到校区列表
    function showmoreSchool (){
        showmoreSchoolFun();
    }

    //预约试听
    function microMaaBtn () {
        microMaaFun();
    }

    //拨打电话
	function callPhone() {
		
		if(isNaN(courseSource.tel.replace(/\s/g, ""))) {
			return Toast.fail("电话号码错误", 2);
		} else {
			sa.track("mic_site_btn", {
				_tenantId	: courseSource.tenantId || '未获取',
				_orgId		: courseSource.orgId || '未获取',
				_wxId		: openid || '未获取',
				_micSiteBtn : '联系机构',
			});
			window.location.href = `tel:${courseSource.tel || ''}`;
		}
	}

    //添加选项
    let courseIntroStr = courseSource.detailContent || '';
    let courseIntroArr= eval(courseIntroStr ? courseIntroStr : []);

    let courseIntro = [];
    courseIntroArr&&courseIntroArr.map((item, index) => {
        let courseIntroInnerArr = item.content || [];
        let courseIntroInner = [];
        courseIntro.push(
            <div key={index}>
                {
                     item.title != '' ?
                        <div className={styles.courseIntroTop}>
                            <p className={styles.circle}></p>

                            <p className={styles.courseIntroName}>{item.title}</p>
                        </div>
                     : ''
                }
                {
                    courseIntroInnerArr&&courseIntroInnerArr.map((item1, index1) => {
                        if(item1.contentDetail != '' && item1.contentDetail != undefined) {
                            return <pre key={index1} className={styles.courseIntro}>{item1.contentDetail || ''}</pre>
                        }
                    })
                }

            </div>

        )
    });

    //课程类型
    let coursetypeListArr = courseSource.coursetypeList || [];
    let coursetypeList = [];
    coursetypeListArr&&coursetypeListArr.map((item, index) => {
        coursetypeList.push(
            <span key={index}>{`${item}  ` || '默认课程类型'}</span>
        )
    });

    //活动对象
    let agetagListArr = courseSource.agetagList || [];
    let agetagListList = [];
    agetagListArr&&agetagListArr.map((item, index) => {
        agetagListList.push(
            <span key={index}>{`${item}  ` || '默认活动对象'}</span>
        )
    });

    //课程状态
    let _courseStatus = String(courseSource.status || '');

    return (
        <div className={styles.courseDetialBase} style={{paddingBottom:'120px'}}>
            <div className={styles.toJsHome} onClick={() => touchHomeIconFunction()}>
            	<img src="//img.ishanshan.com/gimg/img/36ae96c3de6d8635246351fac47b482f" alt=""/>
				<p>首页</p>
            </div>
            
            <Carousel
				className="course-carousel"
				dots={false}
				dragging={false}
				infinite={detailImg&&detailImg.length>1}
				swiping={detailImg&&detailImg.length>1}
				autoplay
				style={{height : '400px'}}
			>
				{detailImg}
			</Carousel>

            <div className={styles.courseTitlebox}>
                <WingBlank size="md">
                    <div className={styles.blueBox}></div>
                    <p className={styles.courseTitle}>{courseSource.name || '默认课程'}</p>
                </WingBlank>
            </div>
            <WhiteSpace style={{background : "rgb(240,241,242)"}} />

            <div className={styles.courseAddressbox}>
                <WingBlank size="md">
                    <div style={{overflow:'hidden'}}>
                        <div className={styles.courseSchool}>{ courseSource.orgName || '活动校区'}{courseSource.orgNum == 1 ? '' : `（${courseSource.orgNum}）`}</div>
						{
							courseSource.orgNum > 1 ? <div className={styles.courseArrow} onClick={showmoreSchool}>查看更多></div> : ''
						}
                    </div>
                    <div className={styles.bottomline}></div>

				</WingBlank>
                <WingBlank size="md">
					<div className={styles.courseAddress} onClick={callbackMap}>
						<svg aria-hidden="true" className={styles.mapIcon} onClick={callPhone} >
								<use xlinkHref="#anticon-address"></use>
						</svg>
                        <p>{courseSource.address || '无法获取地址'}</p>
                        <div className={styles.right_line}></div>
                    </div>
                    <div className={styles.courseTelBox}>
                        <div className={styles.telIcon}>
							<svg aria-hidden="true" 
								style={{
									height : 50,
									width : 50,
									marginTop : 20,
								}} 
								onClick={callPhone} >
								<use xlinkHref="#anticon-phone"></use>
							</svg>
					    </div>
                    </div>
				</WingBlank>
            </div>
            <WhiteSpace style={{background : "rgb(240,241,242)"}} />

            <div className={styles.courseDetailbox}>
                <WingBlank size="md">
                    <div className={styles.blueBox}></div>
                    <p className={styles.courseDetailTitle}>课程详情</p>
                    <div className={styles.courseIntroBox}>

                        <div className={styles.courseIntroTop}>
                            <p className={styles.circle}></p>
                            <p className={styles.courseIntroName}>课程类型</p>
                        </div>
                        <p className={styles.courseIntro}>{coursetypeList}</p>

                        <div className={styles.courseIntroTop}>
                            <p className={styles.circle}></p>
                            <p className={styles.courseIntroName}>适合年龄</p>
                        </div>
                        <p className={styles.courseIntro}>{courseSource.adAge}</p>

                        <div className={styles.courseIntroTop}>
                            <p className={styles.circle}></p>
                            <p className={styles.courseIntroName}>每节时长</p>
                        </div>
                        <p className={styles.courseIntro}>{courseSource.perTime >= '0' ? `${courseSource.perTime}分钟` : '默认课程类型'}</p>

                        {courseIntro}

                    </div>
                </WingBlank>
            </div>

            <p className={_courseStatus == '1' ? styles.courseJoinBtn : styles.courseJoinBtnDis} onClick={_courseStatus == '1' ? microMaaBtn : ''}>
                {_courseStatus == '1' ? '预约试听' : '已下架'}
            </p>


        </div>
    )
}
export default courseDetailComponent;
