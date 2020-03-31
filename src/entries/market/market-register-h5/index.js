
import './index.html';
import '../../../utils/request';
import './index.less';
import '../../../utils/fontSize.js';
import dva from 'dva';

window.BASE_URL = window.BASE_URL || '';

const app = dva();

app.model(require('../../../models/market/market-register-h5/RegisterModel'));

app.router(require('./router'));

app.start('#marketRegisterH5');
