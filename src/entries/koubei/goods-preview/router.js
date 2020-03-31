import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import KoubeiGoodsPreview from '../../../pages/koubei/goods-preview/KoubeiGoodsPreview';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={KoubeiGoodsPreview} />
    </Router>
  );
}
