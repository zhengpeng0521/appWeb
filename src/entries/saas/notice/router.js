import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Saas3Notice from '../../../pages/saas/notice/Saas3Notice';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/saas3_notice" component={Saas3Notice} />
      <Route path="/*" component={Saas3Notice} />
    </Router>
  );
}
