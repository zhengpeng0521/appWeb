import React from 'react';
import { Router, Route, Redirect, IndexRedirect } from 'dva/router';
import ReportIndex from '../../pages/miniwx/reportIndex/reportIndexPage';                          //报表首页
import ReportFormDetail from '../../pages/miniwx/reportFormDetail/reportFormDetailPage';           //报表详情页

export default function ({ history, params, children }) {
	return (
		<Router history = { history }>
			<Route path = '/' >
				<IndexRedirect to = { '/reportIndex' } />
				<Route path = '/reportIndex' component = { ReportIndex } />
				<Route path = '/reportDetail' component = { ReportFormDetail } />
			</Route>
		</Router>
  	);
}
