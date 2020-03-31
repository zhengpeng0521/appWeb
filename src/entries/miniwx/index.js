import './index.html';
import './index.less';
import '../../utils/request';
import 'antd-mobile/dist/antd-mobile.min.css';
import '../../assets/microwebsite/iconfont/iconfont.js';

import dva from 'dva';

window.BASE_URL = window.BASE_URL || '';

window.COMMON_DATA = {};

const app = dva();

app.model( require( '../../models/miniwx/reportIndex/reportIndexModel' ) );                              //报表首页
app.model( require( '../../models/miniwx/reportFormSearch/reportFormSearchModel' ) );                    //报表搜索组件
app.model( require( '../../models/miniwx/reportFormDetail/reportFormDetailModel' ) );                    //报表详情

app.router(require( './router' ));

app.start( '#wx_report_form' );
