
import './index.html';
import 'antd-mobile/dist/antd-mobile.min.css'; 			//引入css
import '../../../utils/request';                        //引入请求
import './index.less';
import '../../../utils/flexible.debug.js';
import '../../../utils/flexible_css.debug.js';
import '../../../utils/swiper/swiper-3.4.1.min.js';
import '../../../utils/swiper/swiper-3.4.1.min.css';
import dva from 'dva';

window.BASE_URL = window.BASE_URL || '';

const app = dva();

app.model(require('../../../models/weixin/microActivityChristmas/microActivityModels'));
app.model(require('../../../models/weixin/microActivitySpringFestival/springFestivalActivityModels'));
app.model(require('../../../models/weixin/microActivityAdmissions/admissionsMicroMarketingModels'));
app.model(require('../../../models/weixin/microActivityYuanXiao/yuanxiaoActivityModels'));
app.model(require('../../../models/weixin/microLeafletsEnglish/englishActivityModels'));
app.model(require('../../../models/weixin/microActivitySpringOuting/springOutingActivitymodels'));
app.model(require('../../../models/weixin/microLeafletsDefault/microLeafletsDefaultModels'));
app.model(require('../../../models/weixin/microActivity2017MayDay/microActivity2017MayDayModels'));
app.model(require('../../../models/weixin/microActivityDragonBoatFestival/microActivityDragonBoatFestivalModel'));
app.model(require('../../../models/weixin/microLeafletsEnglishLong/microLeafletsEnglishLongModel'));

app.router(require('./router'));

app.start('#shanshanH5');
