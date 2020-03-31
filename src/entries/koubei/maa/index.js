import './index.html';
import dva from 'dva';
import 'babel-polyfill';
import '../../../utils/request';
import './index.css';


window.BASE_URL = window.BASE_URL||'/koubei';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

/*
 * 前端缓存数据
 */
window._init_data = {};

// 1. Initialize
const app = dva();

// 2. Model

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
