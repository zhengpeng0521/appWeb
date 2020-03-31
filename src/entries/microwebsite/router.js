import React from 'react';
import {Router, Route, Redirect, IndexRedirect} 			from 'dva/router';
import Micro404 				from '../../pages/microwebsite/micro404/micro404Page';
import MicroWebsite 			from '../../pages/microwebsite/home/microwebsitePage';
import MicroMaa 				from '../../pages/microwebsite/maa/microMaaPage';
import MicroMaaHistory 			from '../../pages/microwebsite/maaHistory/microMaaHistoryPage';
import MicroVerificationCode 	from '../../pages/microwebsite/verificationCode/verificationCodePage';
import MicroModifyBabyInfo	 	from '../../pages/microwebsite/modifyBabyInfo/modifyBabyPage';
import MicroPersonCenter	 	from '../../pages/microwebsite/personalCenter/personCenterPage';
import MicroBabyList		 	from '../../pages/microwebsite/babyList/babyListPage';
import SignSelfPage		 	    from '../../pages/microwebsite/sign-self/SignSelfPage';
import SignSelfRecordPage		from '../../pages/microwebsite/sign-self/SignSelfRecordPage';
import MicroToViewClass		 	from '../../pages/microwebsite/toViewClass/toViewClassPage';
import MicroCancelParticipate	from '../../pages/microwebsite/cancelParticipate/cancelParticipatePage';
import MicroSelectCampus		from '../../pages/microwebsite/selectCampus/selectCampusPage';
import MicroConfirmAvtivity		from '../../pages/microwebsite/confirmAvtivity/confirmAvtivityPage';
import MicroActivityDetail   	from '../../pages/microwebsite/activity/microActivityDetailPage';
import MicroActivitySchool  	from '../../pages/microwebsite/activity/microActivitySchoolPage';
import MicroCourseDetail    	from '../../pages/microwebsite/course/microCourseDetailPage';
import MicroMapView    			from '../../pages/microwebsite/mapView/mapViewPage';
import MicroPersonMyactivity    from '../../pages/microwebsite/personMyactivity/personMyactivityPage'
import MicroResults		        from '../../pages/microwebsite/MicroResultsPage/MicroResultsPage';
import MicroShowCover 			from '../../pages/microwebsite/homeScrollCoverPage/homeScrollCoverPage';

/*家校通*/
import PersonCenterPage         from '../../pages/microwebsite/person_center/PersonCenterPage';           //个人中心
import ContractInfoPage         from '../../pages/microwebsite/contract_info/ContractInfoPage';           //合同列表
import ContractDetailPage       from '../../pages/microwebsite/contract_info/ContractDetailPage';         //合同详情
import VipCardInfoPage          from '../../pages/microwebsite/vip_card_info/VipCardInfoPage';			  //会员详情
import ClassRecordPage          from '../../pages/microwebsite/class_record/ClassRecordPage';			  //课时记录
import ProductInfoPage          from '../../pages/microwebsite/product_info/ProductInfoPage';			  //作品列表
import ProductDetailPage        from '../../pages/microwebsite/product_info/ProductDetailPage';			  //作品详情
import ScheduleInfoPage         from '../../pages/microwebsite/schedule_info/ScheduleInfoPage';			  //课程列表
import ScheduleDetailPage       from '../../pages/microwebsite/schedule_info/ScheduleDetailPage';		  //课程列表
import OrderClassPage           from '../../pages/microwebsite/order-class/OrderClassPage';               //约课
import classDetailPage          from '../../pages/microwebsite/order-class/classDetailPage';              //约课详情
import OrderResult              from '../../pages/microwebsite/order-class/OrderResult';                  //约课结果
import CancelResult             from '../../pages/microwebsite/order-class/CancelResult';                 //取消约课结果
import BindFacePage          		from '../../pages/microwebsite/sign-self/BindFacePage';                 	//人脸绑定

import ParentsNotice            from '../../pages/microwebsite/parents_notice/ParentsNotice';	     	  //家校通知 家长评价
import ParentsNoticeDetail      from '../../pages/microwebsite/parents_notice/ParentsNoticeDetail';	      //家校通知 评价详情
import ParentEvaluate           from '../../pages/microwebsite/parents_notice/ParentEvaluate';	          //家校通知 提交评价

import ParentPicPage           from '../../pages/microwebsite/parents_notice/ParentPicPage';	          //家校通知 图片详情

import AskForLeavePage         from '../../pages/microwebsite/ask_for_leave/AskForLeavePage';	          //请假
import integralRecordPage         from '../../pages/microwebsite/integral_record/integralRecordPage';	          //请假


// 闪闪云校手动消课微信通知详情
import HandleCancelClasspage from '../../pages/ss-web/handleCancelClasspage';

export default function ({ history, params, children }) {
	function GetQueryString(name) {
	 	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 	var r = window.location.search.substr(1).match(reg);
	 	if(r!=null)return  decodeURI(r[2]); return null;
	}

	var router = GetQueryString("router");
	var orgId = GetQueryString("orgId");
	var tenantId = GetQueryString("tenantId");
	var parentId = GetQueryString("parentId");
	var type = GetQueryString("type");

	let stuName = GetQueryString("stuName");
	let courseName = GetQueryString("courseName");
	let courseNum = GetQueryString("courseNum");
	let leftNum = GetQueryString("leftNum");
	let repealTime = GetQueryString("repealTime");
	let reason = GetQueryString("reason");
	let newRouter = "";
	console.log(router, 'router-----------')
	//判断是否是支付回跳页面
	if(router == 'notice_class') {
		newRouter = `/notice_class?stuName=${stuName}&courseName=${courseName}&courseNum=${courseNum}&leftNum=${leftNum}&repealTime=${repealTime}&reason=${reason}`;
	} else {
		if (type != undefined && parentId != undefined) {
			newRouter = `/microPersonMyactivity`;
		} else {
			if(orgId != null && orgId != '' && orgId != undefined && tenantId != undefined && tenantId != null && tenantId != '') {
				if(router && router.length > 0 && router != null && router != undefined) {
					newRouter = `/${router}`;
				} else {
					newRouter = `/microWebsite`;
				}
			} else {
				newRouter = `/microSelectCampus`;
			}
		}
	}



	return (
    	<Router history={history}>
			<Route path="/">
				<IndexRedirect to = {newRouter} />
				<Route path="/microMaaHistory" 			component={MicroMaaHistory} />
				<Route path="/microvc" 					component={MicroVerificationCode} />
				<Route path="/showCover"    	    	component={MicroShowCover} />
				<Route path="/microModifyBabyInfo" 		component={MicroModifyBabyInfo} />
				<Route path="/microPersonCenter" 		component={MicroPersonCenter} />
				<Route path="/microBabyList"		 	component={MicroBabyList} />
				<Route path="/microToViewClass"			component={MicroToViewClass} />
        <Route path="/microSignSelf" 		    component={SignSelfPage} />
        <Route path="/signSelfRecord" 		    component={SignSelfRecordPage} />
				<Route path="/microCancelParticipate" 	component={MicroCancelParticipate} />
				<Route path="/microSelectCampus" 		component={MicroSelectCampus} />
				<Route path="/microConfirmAvtivity" 	component={MicroConfirmAvtivity} />
				<Route path="/microWebsite" 			component={MicroWebsite} />
				<Route path="/microMaa" 				component={MicroMaa} />
				<Route path="/microActivityDetail" 		component={MicroActivityDetail} />
				<Route path="/microActivitySchool" 		component={MicroActivitySchool} />
				<Route path="/microCourseDetail" 		component={MicroCourseDetail} />
				<Route path="/microMapView" 			component={MicroMapView} />
				<Route path="/microPersonMyactivity"    component={MicroPersonMyactivity} />
				<Route path="/microResults"    			component={MicroResults} />

				<Route path="/person_center"    		component={PersonCenterPage} />
				<Route path="/contract_info"    		component={ContractInfoPage} />
				<Route path="/contract_detail"    		component={ContractDetailPage} />
				<Route path="/vip_card_info"    		component={VipCardInfoPage} />
				<Route path="/class_record"    	    	component={ClassRecordPage} />
				<Route path="/product_info"    	    	component={ProductInfoPage} />
				<Route path="/product_detail"    	    component={ProductDetailPage} />
				<Route path="/schedule_info"    	    component={ScheduleInfoPage} />
				<Route path="/schedule_detail"    	    component={ScheduleDetailPage} />
				<Route path="/parents_notice"    	    component={ParentsNotice} />
				<Route path="/parents_notice_detail"    component={ParentsNoticeDetail} />
				<Route path="/evaluate"                 component={ParentEvaluate} />
				<Route path="/parent_pic"               component={ParentPicPage} />
				<Route path="/ask_for_leave"            component={AskForLeavePage} />
        <Route path="/order_class"              component={OrderClassPage} />
        <Route path="/class_detail"             component={classDetailPage} />
        <Route path="/order_result"             component={OrderResult} />
        <Route path="/cancel_result"            component={CancelResult} />
				<Route path="/face_sign"      					component={BindFacePage} />
				<Route path="/integral_record"      		component={integralRecordPage} />

				{/* 闪闪云校 */}
				<Route path="/notice_class" component={HandleCancelClasspage} />
			</Route>
    	</Router>
  	);
}
