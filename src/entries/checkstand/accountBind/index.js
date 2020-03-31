import './index.html';
import './index.css';
import dva from 'dva';
import '../../../utils/request';

///*
// * 闪闪收银宝H5
// */
window.BASE_URL = window.BASE_URL ||'/thinknode/checkstand/h5';

const app = dva();

// 2. Model
app.model(require('../../../models/checkstand/accountBind/AccountBindLoginModel'));                   //账号未绑定页
app.model(require('../../../models/checkstand/accountBind/AccountChooseModel'));                      //账户选择绑定页
app.model(require('../../../models/checkstand/accountBind/AccountBindModel'));                        //账户绑定页


// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
