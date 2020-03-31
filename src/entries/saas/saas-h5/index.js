import './index.html';
import './index.css';
import dva from 'dva';
import '../../../utils/request';

/*
 * 闪闪Saas系统H5
 */
window.BASE_URL = window.BASE_URL||'/saas-mobile';//本地测试环境请求地址
window.COMMON_SLEEP = (ms) => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => { resolve() } , ms);
                    })}
// 1. Initialize
const app = dva();

// 2. Model

/*总布局*/
app.model(require('../../../models/saas/saas-h5/main-layout/MainLayout'));

/*首页菜单*/
app.model(require('../../../models/saas/saas-h5/main-page/MainPage'));

/*办公菜单*/
app.model(require('../../../models/saas/saas-h5/work/menu/common-menu/CommonMenu'));        //常用菜单
app.model(require('../../../models/saas/saas-h5/work/menu/all-menu/AllMenu'));              //所有菜单
app.model(require('../../../models/saas/saas-h5/work/leads/Leads'));                        //名单

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
