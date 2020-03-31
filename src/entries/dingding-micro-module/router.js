import React from 'react';
import { Router, Route, } from 'dva/router';
import MicroModuleRender from '../../pages/dingding-micro-module/MicroModuleRender';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/module" component={MicroModuleRender} />
      <Route path="/*" component={MicroModuleRender} />
    </Router>
  );
}
