import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import KoubeiGoodsManage from '../../../pages/koubei/goods-manage/KoubeiGoodsManage';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={KoubeiGoodsManage} />
    </Router>
  );
}
