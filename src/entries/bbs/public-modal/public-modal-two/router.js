import React from 'react';
import { Router, Route } from 'dva/router';
import KeyList from '../../../../pages/bbs/public-modal/public-modal-two/PublicModalTwoKeyList.js';


export default function ({ history }) {
  return (
    <Router history={history}>
	  <Route path="/" component={KeyList} />
      <Route path="/publicModaTwoKeyList" component={KeyList} />
    </Router>
  );
}

