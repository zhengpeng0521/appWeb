import React from 'react';
import { Router, Route } from 'dva/router';
import CourseIntroducePage from '../../../pages/koubei/courseIntroduce/courseIntroducePage';
import CourseIntroduceDetailPage from '../../../pages/koubei/courseIntroduce/courseIntroduceDetailPage';


export default function ({ history }) {
  return (
    <Router history={history}>
	  <Route path="/" component={CourseIntroducePage} />
      <Route path="/courseIntroducePage" component={CourseIntroducePage} />
	    <Route path="/courseIntroduceDetailPage" component={CourseIntroduceDetailPage} />
    </Router>
  );
}

