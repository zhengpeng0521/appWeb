
import './index.html';
import '../../../utils/request';
import './index.less';
import '../../../utils/fontSize.js';
import dva from 'dva';

window.BASE_URL = window.BASE_URL || '/game';

const app = dva();

app.model(require('../../../models/vote/voteGame/VoteModel'));
app.model(require('../../../models/vote/voteGame/VotePersonDetailModel'));
app.model(require('../../../models/vote/voteGame/VoteSubmitModel'));
app.model(require('../../../models/common/dateModel/countDownModel'));

app.router(require('./router'));

app.start('#voteGameH5');
