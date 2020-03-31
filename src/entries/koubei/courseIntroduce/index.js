import './index.html';
import './index.less';
import '../../../utils/request';                        //引入请求
import 'antd-mobile/dist/antd-mobile.min.css'; 			//引入css
import dva from 'dva';

window.BASE_URL = window.BASE_URL || '/koubei';

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../../../models/koubei/courseIntroduceModels/courseIntroduceModels'));
app.model(require('../../../models/koubei/courseIntroduceModels/courseIntroduceDetailModels'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
