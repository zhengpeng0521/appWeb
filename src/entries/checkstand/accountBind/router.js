import React from 'react';
import { Router, Route, IndexRoute , IndexRedirect} from 'dva/router';
import AccountBindLoginPage from '../../../pages/checkstand/accountBind/AccountBindLoginPage';
import AccountChoosePage from '../../../pages/checkstand/accountBind/AccountChoosePage';
import AccountBindPage from '../../../pages/checkstand/accountBind/AccountBindPage';

export default function ({ history }) {
    let indexRouter = window._init_data.indexRouter || '/AccountLoginPage'
    return (
        <Router history = { history }>
            <Route path ="/">
                <IndexRedirect to={indexRouter} />
                    <Route path = "/AccountLoginPage" component = { AccountBindLoginPage } />
                    <Route path = "/AccountChoosePage" component = { AccountChoosePage } />
                    <Route path = "/AccountBindPage" component = { AccountBindPage } />
            </Route>
        </Router>
    );
}
