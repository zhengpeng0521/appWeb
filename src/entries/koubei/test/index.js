import './index.html';
import './index.less';
import dva from 'dva';

import '../../../utils/request';

window.BASE_URL = window.BASE_URL||'/omp-org';//测试环境请求地址

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../../../models/koubei/goods-manage/KoubeiGoodsManageModel'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
