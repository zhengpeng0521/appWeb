import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'dva/router';

import ValidationMobilePage	from '../../../../pages/saas/common/verificationMobile/VerificationMobilePage';
import EmptyDataPage		from '../../../../pages/saas/common/verificationMobile/EmptyDataPage';

export default function ({ history }) {
	
	function GetQueryString(name) {
	 	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 	var r = window.location.search.substr(1).match(reg);
	 	if(r!=null)return  unescape(r[2]); return null;
	}

	var router = GetQueryString("router");
	var orgId = GetQueryString("orgId");
	var tenantId = GetQueryString("tenantId");

	let newRouter = "";
    if(orgId != null && orgId != '' && orgId != undefined && tenantId != undefined && tenantId != null && tenantId != '') {
        if(router && router.length > 0 && router != null && router != undefined) {
            newRouter = `/${router}`;
        } else {
            newRouter = `/`;
        }
    } else {
        newRouter = `/`;
    }
		
  return (
    <Router history={history}>
	  <Route path={newRouter != '/' ? '/' : ''}>
	  	<IndexRedirect to = {newRouter} />
	  	<Route path="/" 								component={EmptyDataPage} />  
	  	<Route path="/validationMobilePage" 			component={ValidationMobilePage} />  
	  </Route>	  
    </Router>
  );
}
