import React from 'react';
import { Router, Route, IndexRoute , IndexRedirect} from 'dva/router';
import AccountUntieLoginPage from '../../../pages/checkstand/accountUntie/AccountUntieLoginPage';
import AccountUntieChoosePage from '../../../pages/checkstand/accountUntie/AccountUntieChoosePage';
import AccountUntiePage from '../../../pages/checkstand/accountUntie/AccountUntiePage';

export default function ({ history }) {
    let indexRouter = window._init_data.indexRouter || '/UntieLoginPage'
    return (
        <Router history = { history }>
            <Route path ="/">
                <IndexRedirect to={indexRouter} />
                    <Route path = "/UntieLoginPage" component = { AccountUntieLoginPage } />
                    <Route path = "/UntieChoosePage" component = { AccountUntieChoosePage } />
                    <Route path = "/AccountUntiePage" component = { AccountUntiePage } />
            </Route>
        </Router>
    );
}
