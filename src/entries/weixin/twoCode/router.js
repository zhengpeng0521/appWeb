import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';

import TwoCodePage from '../../../pages/weixin/twoCode/TwoCodePage'

export default function ({ history }) {
	return (
		<Router history = { history }>
			<Route path = '/' >
				<IndexRedirect to = { '/twoCodePage' } />
				<Route path="/twoCodePage" component={TwoCodePage} />
			</Route>
		</Router>
	);
}
