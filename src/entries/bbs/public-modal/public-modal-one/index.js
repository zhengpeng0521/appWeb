
import './index.html';
import 'antd-mobile/dist/antd-mobile.min.css'; 			//引入css
import '../../../../utils/request';                        //引入请求
import './index.less';

import dva from 'dva';

window.BASE_URL = window.BASE_URL||'/intopic';//本地测试环境请求地址
console.log('--------------BASE_URL=',BASE_URL);

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../../../../models/bbs/public-modal/public-modal-one/publicModalColumnList'));
app.model(require('../../../../models/bbs/public-modal/public-modal-one/publicModalTopicList'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#practice');
