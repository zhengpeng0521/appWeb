import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'dva/router';

import H5LayoutPage from '../../../pages/koubei/koubei-maa/layout/H5LayoutPage';

import MaaPage from '../../../pages/koubei/koubei-maa/page/MaaPage';
import MaaRecordPage from '../../../pages/koubei/koubei-maa/page/MaaRecordPage';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path='/' component={H5LayoutPage}>
            <IndexRedirect to='maa' />
            <Route path='maa' component={MaaPage}/>
            <Route path='record' component={MaaRecordPage}/>
      </Route>
    </Router>
  );
}
