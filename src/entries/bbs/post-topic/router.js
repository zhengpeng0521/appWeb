import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import PostTopicPage from       '../../../pages/bbs/post-topic/PostTopicPage';
import PostTopicDetailPage from '../../../pages/bbs/post-topic/PostTopicDetailPage';
import TalentPage from          '../../../pages/bbs/post-topic/TalentPage';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={PostTopicPage} />
      <Route path="/postTopicDetail" component={PostTopicDetailPage} />
      <Route path="/talent" component={TalentPage} />
    </Router>
  );
}
