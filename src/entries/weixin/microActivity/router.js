import React from 'react';
import { Router, Route } from 'dva/router';
import MicroActivityChristmasPage 			from '../../../pages/weixin/microActivityChristmas/microActivityPage'
import MicroActivitySpringFestivalPage 		from '../../../pages/weixin/microActivitySpringFestival/springFestivalActivityPage'
import MicroActivityAdmissionsPage 			from '../../../pages/weixin/microActivityAdmissions/admissionsMicroMarketingPage'
import MicroActivityYuanXiaoPage 			from '../../../pages/weixin/microActivityYuanXiao/yuanxiaoActivityPage'
import MicroActivitySpringOutingPage 		from '../../../pages/weixin/microActivitySpringOuting/springOutingActivityPage'
import MicroActivity2017MayDayPage	 		from '../../../pages/weixin/microActivity2017MayDay/microActivity2017MayDayPage' 
import MicroLeafletsEnglishPage 			from '../../../pages/weixin/microLeafletsEnglish/englishActivityPage'
import MicroLeafletsDefaultPage 			from '../../../pages/weixin/microLeafletsDefault/microLeafletsDefaultPage' 
import MicroActivityDragonBoatFestivalPage  from '../../../pages/weixin/microActivityDragonBoatFestival/microActivityDragonBoatFestivalPage'
import MicroLeafletsEnglishLongPage  		from '../../../pages/weixin/microLeafletsEnglishLong/microLeafletsEnglishLongPage'


export default function ({ history }) {
  return (
    <Router history={history}>
	    <Route path="/" component={MicroActivityChristmasPage} />
        <Route path="/microActivityChristmasPage" 				component={MicroActivityChristmasPage} />
        <Route path="/microActivitySpringFestivalPage" 			component={MicroActivitySpringFestivalPage} />
        <Route path="/microActivityAdmissionsPage" 				component={MicroActivityAdmissionsPage} />
        <Route path="/microActivityYuanXiaoPage" 				component={MicroActivityYuanXiaoPage} />
	  	<Route path="/microActivitySpringOutingPage"			component={MicroActivitySpringOutingPage} />
	  	<Route path="/microActivity2017MayDayPage"				component={MicroActivity2017MayDayPage} />
        <Route path="/microLeafletsEnglishPage" 				component={MicroLeafletsEnglishPage} />  
	  	<Route path="/microLeafletsDefaultPage" 				component={MicroLeafletsDefaultPage} />
	    <Route path="/microActivityDragonBoatFestivalPage" 		component={MicroActivityDragonBoatFestivalPage} />  
	  	<Route path="/microLeafletsEnglishLongPage" 			component={MicroLeafletsEnglishLongPage} />
    </Router>
  );
}
