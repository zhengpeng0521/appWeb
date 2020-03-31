import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import FreeTrialPage from '../../../pages/saas/free-trial/FreeTrialPage';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={FreeTrialPage} />
    </Router>
  );
}
