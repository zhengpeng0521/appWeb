import './index.html';
import './index.css';
import dva from 'dva';
import '../../../utils/request';

/*
 * 闪闪Saas系统的通知H5
 */
// 1. Initialize
const app = dva();

// 2. Model

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
