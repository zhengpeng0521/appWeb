import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';

import VoteGamePage  		from '../../../pages/vote/voteGame/VotePage';
import VoteGamePersonPage  	from '../../../pages/vote/voteGame/VotePersonDetailPage';
import VoteGameSubmitPage 	from '../../../pages/vote/voteGame/VoteSubmitPage';

export default function ({ history }) {
	
	function GetQueryString(name) {
	 	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 	var r = window.location.search.substr(1).match(reg);
	 	if(r!=null)return  unescape(r[2]); return null;
	}

	var router = GetQueryString("router");
	var orgId = GetQueryString("orgId");
	var tenantId = GetQueryString("tenantId");
	
	var newRouter = undefined;

	if(router && router.length > 0 && router != null && router != undefined) {
		newRouter = `/${router}`;
	} else {
		newRouter = `/`;
	}
		
  	return (
		<Router history={history}>
			<Route path={newRouter != '/' ? '/' : ''}>
				<IndexRedirect to = {newRouter} />
				<Route path="/" 						component={VoteGamePage} />
				<Route path="/voteGame" 				component={VoteGamePage} />  
				<Route path="/voteGamePersonCenter" 	component={VoteGamePersonPage} />  
				<Route path="/voteGameSubmit" 			component={VoteGameSubmitPage} />  	 
			</Route>
    	</Router>
  	);
}
