import './index.html';
import './index.less';
import '../../utils/request';                      
import 'antd-mobile/dist/antd-mobile.min.css'; 
import '../../assets/microwebsite/iconfont/iconfont.js';

import dva from 'dva';

window.BASE_URL = window.BASE_URL || '';
window.DEFAULT_MAP_ADDRESS = '北京市天安门';

window.COMMON_DATA = {};

const app = dva();

app.model(require('../../models/microwebsite/home/microwebsiteModel'));
app.model(require('../../models/microwebsite/homeScrollCover/homeScrollCoverModel'));		     //首页图片详情

app.model(require('../../models/microwebsite/maa/microMaaModel'));
app.model(require('../../models/microwebsite/maaHistory/microMaaHistoryModel'));
app.model(require('../../models/microwebsite/verificationCode/verificationCodeModel'));
app.model(require('../../models/microwebsite/modifyBabyInfo/modifyBabyModel'));
app.model(require('../../models/microwebsite/personalCenter/personalCenterModel'));           //个人中心
app.model(require('../../models/microwebsite/babyList/babyListModel'));
app.model(require('../../models/microwebsite/sign-self/signSelfModel'));                      //扫码签到
app.model(require('../../models/microwebsite/sign-self/signSelfRecordModel'));                //扫码签到记录
app.model(require('../../models/microwebsite/toViewClass/toViewClassModel'));
app.model(require('../../models/microwebsite/cancelParticipate/cancelParticipateModel'));
app.model(require('../../models/microwebsite/selectCampus/selectCampusModel'));
app.model(require('../../models/microwebsite/confirmAvtivity/confirmAvtivityModel'));
app.model(require('../../models/microwebsite/activity/microActivityDetailModel'));
app.model(require('../../models/microwebsite/activity/microActivitySchoolModel'));
app.model(require('../../models/microwebsite/course/microCourseDetailModel'));
app.model(require('../../models/microwebsite/mapView/mapViewModel'));
app.model(require('../../models/microwebsite/personMyactivity/personMyactivityModel'));
app.model(require('../../models/microwebsite/MicroResultsModel/microResultsModel'));

/*家校通*/
app.model(require('../../models/microwebsite/person_center/personCenterModel'));             //个人中心
app.model(require('../../models/microwebsite/contract_info/contractInfoModel'));			 //合同列表
app.model(require('../../models/microwebsite/contract_info/contractDetailModel'));			 //合同详情
app.model(require('../../models/microwebsite/vip_card_info/vipCardInfoModel'));		     	 //会员卡信息
app.model(require('../../models/microwebsite/class_record/classRecordModel'));		     	 //课时记录列表
app.model(require('../../models/microwebsite/product_info/productInfoModel'));		     	 //作品列表
app.model(require('../../models/microwebsite/product_info/productDetailModel'));		     //作品详情
app.model(require('../../models/microwebsite/schedule_info/scheduleInfoModel'));		     //课表列表
app.model(require('../../models/microwebsite/schedule_info/scheduleDetailModel'));		     //课表详情
app.model(require('../../models/microwebsite/order-class/orderClassModel'));		         //约课
app.model(require('../../models/microwebsite/order-class/classDetailModel'));		         //约课详情
app.model(require('../../models/microwebsite/order-class/orderResult'));		             //约课结果页

app.model(require('../../models/microwebsite/parents_notice/parentsNoticeModel'));		     //课程评价详情
app.model(require('../../models/microwebsite/parents_notice/parentsNoticeDetailModel'));	 //课程评价详情
app.model(require('../../models/microwebsite/parents_notice/parentEvaluateModel'));	         //提交评价

app.model(require('../../models/microwebsite/parents_notice/parentPicModel'));	             //图片详情

app.model(require('../../models/microwebsite/ask_for_leave/askForLeaveModel'));	             //请假
app.model(require('../../models/microwebsite/sign-self/bindFaceModel'));	                   //人脸设置
app.model(require('../../models/microwebsite/integral_record/integralRecordModel'));	       //积分记录

// 闪闪云校手动消课微信通知详情
app.model(require('../../models/microwebsite/ss-web/handleCancelClassModel'))


app.router(require('./router'));

app.start('#microwebsite');
