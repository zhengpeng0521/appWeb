
import './index.html';
import '../../../utils/request';                        //引入请求
import './index.less';
//import '../../../utils/flexible.debug.js';
//import '../../../utils/flexible_css.debug.js';
import '../../../utils/fontSize.js';
import '../../../utils/swiper/swiper-3.4.1.min.js';
import '../../../utils/swiper/swiper-3.4.1.min.css';
import '../../../utils/swiper/swiper-styles.js';
import dva from 'dva';

window.BASE_URL = window.BASE_URL || '';

const app = dva();

app.model(require('../../../models/weixin/microActivity2017MotherDay/microMotherDayModel'));
app.model(require('../../../models/weixin/microActivity2017FatherDay/microFatherDayModel'));
app.model(require('../../../models/weixin/microActivity2017JuneDay/microJuneDayModel'));
app.model(require('../../../models/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningModel'));
app.model(require('../../../models/weixin/microActivity2017SummerTraining/microActivitySummerTrainingModel'));
app.model(require('../../../models/weixin/microActivity2017SummerCamp/microActivitySummerCampModel'));
app.model(require('../../../models/weixin/microActivity2017Graffiti/microGraffitiModel'));
app.model(require('../../../models/weixin/microActivity2017CallPhone/microCallPhoneModel'));
app.model(require('../../../models/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondModel'));
app.model(require('../../../models/weixin/microActivity2017CallPhoneThree/microCallPhoneModel'));
app.model(require('../../../models/weixin/microActivity2017Animation/microAnimationModel'));
app.model(require('../../../models/weixin/microLeaflets2017Tech/microLeafletsTechModel'));
app.model(require('../../../models/weixin/microLeaflets2017English/englishModels'));
app.model(require('../../../models/weixin/microLeaflets2017Invitation/microLeafletsInvitationModel'));
app.model(require('../../../models/weixin/microLeaflefs2017EarlyEducation/microEarlyEducationModel'));
app.model(require('../../../models/weixin/microLeaflets2017FineArts/microLeafletsFineArtsModel'));
app.model(require('../../../models/weixin/microLeaflets2017Dance/MicroLeafletsDanceModel'));
app.model(require('../../../models/weixin/commonModels/flowIntoModel/flowIntoModel'));
app.model(require('../../../models/weixin/microActivity2017Barrage/microBarrageModel'));
app.model(require('../../../models/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingModel'));
app.model(require('../../../models/weixin/microActivity2017SchoolWouldBeStartingSecond/MicroSchoolWouldBeStartingSecondModel'));
app.model(require('../../../models/weixin/microActivity2017AutumnTourismOne/microAutumnOneModel'));
app.model(require('../../../models/weixin/microActivity2017AutumnTourismTwo/microAutumnTwoModel'));
app.model(require('../../../models/weixin/microActivity2017LegoOne/microLegoOneModel'));
app.model(require('../../../models/weixin/microActivity2017LegoTwo/microLegoTwoModel'));
app.model(require('../../../models/weixin/microActivity2017TeachersDay/microTeachersDayModel'));

app.router(require('./router'));

app.start('#weixinH5');

_('%c一杯敬朝阳 一杯敬月光', 'background : #d0b6b6; color : white; font-size : 12px');
_('%c一杯敬故乡 一杯敬远方', 'background : #b99898; color : white; font-size : 12px');
_('%c一杯敬明天 一杯敬过往', 'background : #9e7b7b; color : white; font-size : 12px');
_('%c一杯敬自由 一杯敬死亡', 'background : #846060; color : white; font-size : 12px');
_('%c           湿人 -- 路飞  ', 'background : #613f3f; color : white; font-size : 12px');