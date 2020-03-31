import './index.html';
import './index.css';
import dva from 'dva';

import '../../../utils/request';

window.BASE_URL = window.BASE_URL||'/saas-web';//测试环境请求地址

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../../../models/saas/free-trial/freeTrialModel'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
