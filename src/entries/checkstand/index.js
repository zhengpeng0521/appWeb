import './index.html';
import './index.css';
import dva from 'dva';
import '../../utils/request';

///*
// * 闪闪收银宝H5
// */
window.BASE_URL = window.BASE_URL ||'/thinknode/checkstand/h5';
//window.shareParams = {
//                	share_title: "收银宝",
//                	share_desc:"",
//                	share_link: "https://wx.ishanshan.com/thinknode/checkstand/h5/checkstandH5/index/AcceptInvitePage?openId='+ window._init_data.openId+'&&mchId='++'",
//                	share_imgUrl: "",
//                	after_share: "",
//                };
//
//weixinSign_1(shareParams);
//window.COMMON_SLEEP = (ms) => {
//                    return new Promise((resolve, reject) => {
//                        setTimeout(() => { resolve() } , ms);
//                    })}
// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../../models/checkstand/login/ProductAdModel'));                          //品宣页界面
app.model(require('../../models/checkstand/login/ProtocolModel'));                           //电子协议界面
app.model(require('../../models/checkstand/login/RegisterChooseModel'));                     //注册选择界面
app.model(require('../../models/checkstand/login/LoginModel'));                              //登录界面
app.model(require('../../models/checkstand/login/ChooseOrgModel'));                          //机构选择
app.model(require('../../models/checkstand/register/StepsModel'));                           //注册流程
app.model(require('../../models/checkstand/register/SearchModel'));                           //搜索页面
app.model(require('../../models/checkstand/share/ShareHeadModel'));                          //生成邀请链接
app.model(require('../../models/checkstand/share/ShareMobileModel'));                        //邀请登录
app.model(require('../../models/checkstand/share/ShareOrgModel'));                           //登录的机构
app.model(require('../../models/checkstand/share/AcceptInviteModel'));                       //接受邀请
app.model(require('../../models/checkstand/mailApply/MailLoginModel'));                      //邮寄物料的登录
app.model(require('../../models/checkstand/mailApply/MailOrgModel'));                        //邮寄物料机构展示
app.model(require('../../models/checkstand/mailApply/MailReceiptInfoModel'));                //邮寄物料收货信息
app.model(require('../../models/checkstand/mailApply/SubmitSuccModel'));                     //邮寄物料信息提交成功

app.model(require('../../models/checkstand/App/AppModel'));                     //checkstand app首页
app.model(require('../../models/checkstand/App/flow/AppFlowModel'));            //流水
app.model(require('../../models/checkstand/App/AppMemberModel'));               //会员
app.model(require('../../models/checkstand/App/AppMineModel'));                 //商户信息
app.model(require('../../models/checkstand/App/AppPaycodeModel'));              //收款码
app.model(require('../../models/checkstand/App/flow/TradeDetailModel'));        //交易明细
app.model(require('../../models/checkstand/App/payCode/CardModel'));            //台卡
app.model(require('../../models/checkstand/App/payCode/BadgeModel'));           //工牌
app.model(require('../../models/checkstand/App/login/AppLoginModel'));           //app登录
/*供销售使用分享*/
app.model(require('../../models/checkstand/createLink/LinkToShareModel'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');



