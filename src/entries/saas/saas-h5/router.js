import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import NotFound from '../../../pages/saas/saas-h5/not-found/NotFound';                 //路由未找到页面
import MainLayout from '../../../pages/saas/saas-h5/main-layout/MainLayout';           //总布局
import MainPage from '../../../pages/saas/saas-h5/main-page/MainPage';                 //主页菜单

/*办公菜单*/
import CommonMenu from '../../../pages/saas/saas-h5/work/menu/common-menu/CommonMenu';  //常用菜单
import AllMenu from '../../../pages/saas/saas-h5/work/menu/all-menu/AllMenu';           //常用菜单

/*子菜单*/
import Leads from '../../../pages/saas/saas-h5/work/leads/Leads';                       //名单

export default function ({ history }) {
    return (
        <Router history = { history }>
            <Route path="/" component = { MainLayout }>
                <Route path = "/main_page" component = { MainPage } />
                <Route path = "/common_menu" component = { CommonMenu } />
                <Route path = "/all_menu" component = { AllMenu } />
                <Route path = "/crm_leads_all" component = { Leads } />
                <Route path = "/*" component ={ NotFound } />
            </Route>
        </Router>
    );
}
