import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';

import BindingPage from '../../../pages/weixin/bind-h5/BindingPage'

export default function ({ history }) {
	return (
		<Router history = { history }>
			<Route path = '/' >
				<IndexRedirect to = { '/bindingPage' } />
				<Route path="/bindingPage" component={BindingPage} />
			</Route>
		</Router>
	);
}
