import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'dva/router';

import ResultsPage		from '../../../../pages/saas/common/resulutPage/ResultsPage';

export default function ({ history }) {

  return (
    <Router history={history}>
	  	<Route path="/" 								component={ResultsPage} />  
    </Router>
  );
}
