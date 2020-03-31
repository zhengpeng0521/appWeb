var service = require('../common/common.js');

// 主教助教列表
export async function teacherQuery(params) {
    return service.generalMicroWebsiteCharacteristics('/summaryControl/teacherQuery', params);
}
// 详情教室
export async function summaryQuery(params) {
    return service.generalMicroWebsiteCharacteristics('/summaryControl/classRoomQuery', params);
}

// 详情课程
export async function courseQuery(params) {
    return service.generalMicroWebsiteCharacteristics('/summaryControl/courseQuery', params);
}

//请求首页banner数据
export async function queryBanner(params) {
    return service.generalMicroWebsiteCharacteristics('/orgHomeController/queryBanner', params);
}

//请求聚合页面列表和搜索
export async function queryJuheList(params) {
    return service.generalMicroWebsiteCharacteristics('/orgHomeController/queryJuheList', params);
}

//请求首页数据
export async function queryOrg(params) {
    return service.generalMicroWebsiteCharacteristics('/orgHomeController/queryOrg', params);
}

//获取界面配置信息
export async function queryConfig(params) {
    return service.generalMicroWebsiteCharacteristics('/orgConfigController/queryConfig', params);
}

//获取课程列表信息
export async function getCourseList(params) {
    return service.generalMicroWebsiteCharacteristics('/orgCourseController/queryCourse', params);
}

//获取活动列表信息
export async function getActivityList(params) {
    return service.generalMicroWebsiteCharacteristics('/h5ActivityController/getH5ActivityList', params);
}

//获取游戏prover
export async function getGameProverList(params) {
    return service.generalMicroWebsiteCharacteristics('/micNetGameController/infos/list', params);
}

//获取游戏列表信息
export async function getGameList(params) {
    return service.generalMicroWebsiteCharacteristics('/micNetGameController/inst/list', params);
}

//获取游戏链接
export async function getGameAction(params) {
    // return service.generalMicroWebsiteCharacteristics('/micNetGameController/dispatch/action', params);
    return service.gameTranspond(params);
}

//获取活动确认列表信息
export async function getAffirmList(params) {
    return service.generalMicroWebsiteCharacteristics('/h5ActivityController/affirmList', params);
}

//宝宝报名
export async function submitActivityApply(params) {
    return service.generalMicroWebsiteCharacteristics('/h5ActivityController/activityApply', params);
}

//个人主页
export async function getPersonCenter(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/verifyLogin', params);
}
//个人主页可以显示的模块
export async function menuConfList(params) {
    return service.generalMicroWebsiteCharacteristics('/commentMenuController/menuConfList', params);
}
//宝宝列表
export async function getBabyList(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/stuList', params);
}

//Crm宝宝列表
export async function getCrmBabyList(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/stuListByPid', params);
}

//添加宝宝
export async function addBaby(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/createStu', params);
}

//添加会员宝宝
export async function vipAddBaby(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/updateStuHeadImg', params);
}

//添加宝宝
export async function modifyBaby(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/getSingleStu', params);
}

//获取vip宝宝详情
export async function vipModifyBaby(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/getStuInfo', params);
}

//删除宝宝
export async function delectBaby(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/delStu', params);
}

//家长关系
export async function getParentsRelationship(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/dictGet', params);
}

//预约历史
export async function getHistoryList(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/reservationQueryList', params);
}

//预约
export async function createReservation(params) {
    return service.generalMicroWebsiteCharacteristics('/orgReservationController/createReservation', params);
}

//获取验证码
export async function getVcCode(params) {
    return service.generalMicroWebsiteCharacteristics('/sMSVerifyController/genVerifyCode', params);
}

//验证手机号和验证码
export async function validation(params) {
    return service.generalMicroWebsiteCharacteristics('/sMSVerifyController/verifySms', params);
}

//完善信息 
export async function submitInfo(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/perfectInformation', params);
}

//预约配置项 
export async function getMaaConfig(params) {
    return service.generalMicroWebsiteCharacteristics('/orgConfigController/queryReservation', params);
}

//取消报名 
export async function ownCancel(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/ownCancel', params);
}

//上传头像获取url
export async function getHeaderUrl(params) {
    return service.generalMicroWebsiteCharacteristics('/uploadController/upload', params);
}

//创建学员签到二维码信息
export async function createStuSignCode(params) {
    return service.generalMicroWebsiteCharacteristics('/micCrmStuSignInfo/getSignInfo', params);
}

//查询二维码的状态
export async function searchQrcodeStatus(params) {
    return service.generalMicroWebsiteCharacteristics('/micCrmStuSignInfo/signDetail', params);
}

//查询二维码的状态
export async function queryRecord(params) {
    return service.generalMicroWebsiteCharacteristics('/micCrmStuSignInfo/getSignList', params);
}

//得到个人中心信息
export async function getVipCardInfo(params) {
    return service.generalMicroWebsiteCharacteristics('/stuCardInfo/getDetailInfo', params);
}

//新增请假信息
export async function onLeaveCreate(params) {
    return service.generalMicroWebsiteCharacteristics('/micStuVacationController/create', params);
}

//查询家长的请假记录
export async function queryRecordData(params) {
    return service.generalMicroWebsiteCharacteristics('/micStuVacationController/getList', params);
}

//得到课程列表
export async function getCourseListData(params) {
    return service.generalMicroWebsiteCharacteristics('/coursePlan/stuCpbookQuery', params);
}

//查询有课日期
export async function getDayList(params) {
    return service.generalMicroWebsiteCharacteristics('/coursePlan/stuDayQuery', params);
}

//查询有预约日期
export async function getOrderList(params) {
    return service.generalMicroWebsiteCharacteristics('/coursePlan/bookStuDayQuery', params);
}

//得到作品列表
export async function getProductList(params) {
    return service.generalMicroWebsiteCharacteristics('/stuWork/workList', params);
}

//得到作品列表
export async function getTagList(params) {
    return service.generalMicroWebsiteCharacteristics('/stuWork/tagList', params);
}

//得到合同列表
export async function getContractList(params) {
    return service.generalMicroWebsiteCharacteristics('/purInfo/purchaseList', params);
}

//得到 合同详情
export async function getContractDetailInfo(params) {
    return service.generalMicroWebsiteCharacteristics('/purInfo/getOrderDetailById', params);
}

//得到合同列表
export async function getClassRecordList(params) {
    return service.generalMicroWebsiteCharacteristics('/stuCardInfo/cardPeriodInfoById', params);
}

//得到积分列表
export async function getIntegralRecordList(params) {
    return service.generalSSCrm('/crm/integral/queryIntegralPersonal', params);
}

//我的活动
export async function getmyActivitys(params) {
    return service.generalMicroWebsiteCharacteristics('/personalCenterController/myActivitys', params);
}

//课程详情
export async function getCouseDetail(params) {
    return service.generalMicroWebsiteCharacteristics('/orgCourseController/courseDetail', params);
}

//活动详情
export async function getActivityDetail(params) {
    return service.generalMicroWebsiteCharacteristics('/h5ActivityController/getH5ActivityDetail', params);
}
  
//校区列表
export async function getActivitySchool(params) {
    return service.generalMicroWebsiteCharacteristics('/orgCourseController/selectOrg', params);
}
//活动列表
export async function getSchoolList(params) {
    return service.generalMicroWebsiteCharacteristics('/h5ActivityController/getActivityOrg', params);
}

//从新支付
export async function getRequistPay(params) {
    return service.generalMicroWebsiteCharacteristics('/mic/activityh5/applyActivity/rePay', params);
}

//得到老师评价课程列表
export async function getParentsNoticeList(params) {
    return service.generalMicroWebsiteCrmCharacteristics('/hscomm/homeQuery', params);
}

//得到评价详情
export async function getParentEvaluate(params) {
    return service.generalMicroWebsiteCrmCharacteristics('/hscomm/homeCommQuery', params);
}

//提交评价
export async function saveEvaluateInfo( params ){
	return service.generalMicroWebsiteCrmCharacteristics('/hscomm/homeCommCreate', params );
}

//请假
//得到可请假列表
export async function getAbleLeaveList( params ){
	return service.generalMicroWebsiteCrmCharacteristics('/web/stu/checkCourseIsVacation', params );
}
//得到已请假列表
export async function getHasLeaveList( params ){
	return service.generalMicroWebsiteCrmCharacteristics('/web/stu/queryVacationList', params );
}
//提交请假申请
export async function saveAskForLeave( params ){
	return service.generalMicroWebsiteCrmCharacteristics('/web/stu/vacationApply', params );
}

//约课列表
export async function getClassList( params ){
	return service.generalMicroWebsiteCharacteristics('/coursePlan/allCourseQuery', params );
}
//约课详情
export async function getClassDetail( params ){
	return service.generalMicroWebsiteCharacteristics('/coursePlan/coursePlanDetail', params );
}
//年龄检测
export async function checkAge( params ){
	return service.generalMicroWebsiteCharacteristics('/coursePlan/stuCheckBirthday', params );
}
//判断适龄
export async function segMent( params ){
	return service.generalSSCrm('/cerp/cpbook/queryAgeLimitInfo', params );
}
//约课
export async function orderClass( params ){
	return service.generalMicroWebsiteCharacteristics('/coursePlan/stuBookCls', params );
}
//取消约课
export async function cancelOrder( params ){
	return service.generalMicroWebsiteCharacteristics('/coursePlan/stuCancelCls', params );
}

// 首页直播列表
export async function queryLiveList( params ){
	return service.generalSSCrm('/cerp/live/class/miniweb/getLiveClassQuery', params );
}

// 签到
// 是否开通
export async function hasFaceSign( params ){
	return service.generalSSCrm('/crm/stuInfo/stu/getMdIsMeal', params );
}

// 是否开通人脸
export async function hasFace( params ){
	return service.generalSmartShop('/smartshop/md/isBind', params );
}
// 获取人脸信息
export async function getFaceInfo( params ){
	return service.generalSmartShop('/smartshop/md/stuBindInfo', params );
}
// 绑定人脸信息
export async function bindFaceInfo( params ){
	return service.generalSmartShop('/smartshop/md/bindMemberToStuEx', params );
}

// 获取家长人脸信息
export async function getParentsFace( params ){
	return service.generalSmartShop('/smartshop/md/allStuParentBindInfo', params );
}
// 绑定家长人脸信息
export async function bindParentsFace( params ){
	return service.generalSmartShop('/smartshop/md/bindMemberToParentEx', params );
}

// 获取签到按钮配置
export async function getSignSet( params ){
	return service.generalMicroWebsiteCrmCharacteristics('/crm/sign/querySignSet', params );
}
// 远程签到
export async function signOnline( params ){
	return service.generalMicroWebsiteCrmCharacteristics('/crm/sign/signByTab', params );
}

