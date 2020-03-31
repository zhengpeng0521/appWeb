import './index.html';
import './index.less';
import '../../utils/request';
import '../../assets/micro-module/iconfont/iconfont.css';
import '../../assets/micro-module/font/font.css';

import '../../utils/swiper/swiper-3.4.1.min.js';
import '../../utils/swiper/swiper-3.4.1.min.css';

import dva from 'dva';

window.BASE_URL = window.BASE_URL || '/zsb-dd';
window._init_data = window._init_data || {};

const app = dva();

app.router(require('./router'));

app.start('#root');
