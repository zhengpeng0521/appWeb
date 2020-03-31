import React from 'react';
import { Router, Route } from 'dva/router';
import ColumnList from '../../../../pages/bbs/public-modal/public-modal-one/PublicModalOneColumnList.js';
import TopicList from '../../../../pages/bbs/public-modal/public-modal-one/PublicModalOneTopicList.js';


export default function ({ history }) {
  return (
    <Router history={history}>
	  <Route path="/" component={ColumnList} />
      <Route path="/publicModalOneColumnList" component={ColumnList} />
      <Route path="/publicModalOneTopicList" component={TopicList} />
    </Router>
  );
}

