import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import KoubeiGoodsManage from '../../../pages/koubei/goods-manage/KoubeiGoodsManage';
import KoubeiGoodsForm from '../../../pages/koubei/goods-manage/KoubeiGoodsForm';
import NoLogin from '../../../pages/koubei/goods-manage/NoLogin';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={KoubeiGoodsManage} />
      <Route path="/goodsForm" component={KoubeiGoodsForm} />
      <Route path="/noLogin" component={NoLogin} />
    </Router>
  );
}
