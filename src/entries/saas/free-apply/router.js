import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import FreeApplyPage from '../../../pages/saas/free-apply/FreeApplyPage';
import FreeApplySuccessPage from '../../../pages/saas/free-apply/FreeApplySuccessPage';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={FreeApplyPage} />
      <Route path="/success" component={FreeApplySuccessPage} />
    </Router>
  );
}
