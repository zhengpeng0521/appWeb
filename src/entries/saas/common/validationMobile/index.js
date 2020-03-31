import './index.html';
import './index.css';
import dva from 'dva';

import '../../../../utils/request';

window.BASE_URL = window.BASE_URL || '/saas-web'; 

const app = dva();

app.model(require('../../../../models/saas/common/verificationMobile/verificationMobileModel'));
app.model(require('../../../../models/saas/common/verificationMobile/emptyDataModel'));

app.router(require('./router'));

app.start('#validationMobile');
