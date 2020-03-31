import './index.html';
import '../../../utils/request';                        //引入请求
import './index.less';
import dva from 'dva';
window.BASE_URL = window.BASE_URL || '';

const app = dva();

//app.model(require('../../../models/weixin/microActivity2017MotherDay/microMotherDayModel'));
//app.model(require('../../../models/weixin/twoCode/twoCodeModel'));

app.router(require('./router'));

app.start('#root');
