import React from 'react';
import { Router, Route } from 'dva/router';

import MarketPage  			from '../../../pages/market/market-register-h5/RegisterPage';

export default function ({ history }) {
  return (
    <Router history={history}>
	  	<Route path="/" 			component={MarketPage} />  
		<Route path="/register" 	component={MarketPage} />  
    </Router>
  );
}