import './index.html';
import '../../../utils/request';                        //引入请求
import './index.less';
import dva from 'dva';
window.BASE_URL = window.BASE_URL || '';

const app = dva();

app.model(require('../../../models/weixin/bind-h5/bindingModel'));

app.router(require('./router'));

app.start('#root');
