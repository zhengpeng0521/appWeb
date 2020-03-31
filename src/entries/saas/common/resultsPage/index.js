import './index.html';
import './index.css';
import dva from 'dva';

import '../../../../utils/request';

window.BASE_URL = window.BASE_URL || ''; 

const app = dva();

app.model(require('../../../../models/saas/common/resulutPage/resultsModel'));

app.router(require('./router'));

app.start('#results');
