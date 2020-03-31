//import React from 'react';
//import {Router, Route} from 'dva/router';
//
//const MicroActivityMotherDayPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017MotherDay/microMotherDayPage'))
//	}, 'microMotherDayPage')
//}
//
//const MicroActivityFatherDayPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017FatherDay/microFatherDayPage'))
//	}, 'microFatherDayPage')
//}
//
//const MicroActivityJuneDayPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017JuneDay/microJuneDayPage'))
//	}, 'microJuneDayPage')
//}
//
//const MicroActivitySummerSigningPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage'))
//	}, 'microSummerSigningPage')
//}
//
//const MicroActivitySummerTrainingPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017SummerTraining/MicroActivitySummerTrainingPage'))
//	}, 'microSummerTrainingPage')
//}
//
//const MicroActivitySummerCampPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017SummerCamp/MicroActivitySummerCampPage'))
//	}, 'microSummerCampPage')
//}
//
//const MicroTechPage = (location, cb) => {
//	
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microLeaflets2017Tech/MicroLeafletsTechPage'))
//	}, 'microTechPage')
//}
//
//const MicroEnglishPage = (location, cb) => {
//	
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microLeaflets2017English/EnglishPage'))
//	}, 'microEnglishPage')
//}
//
//const MicroGraffitiPage = (location, cb) => {
//	
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017Graffiti/MicroGraffitiPage'))
//	}, 'microGraffitiPage')
//}
//
//const MicroLeafletsInvitationPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage'))
//	}, 'microInvitationPage')
//}
//
//const MicroAnimationPage = (location, cb) => {
//	require.ensure([], require => {
//		cb(null, require('../../../pages/weixin/microActivity2017Animation/microAnimationPage'))
//	}, 'microAnimation')
//}
//
//
//export default function ({ history }) {
//	
//	return (
//	  	<Router history={history}>
//			<Route path="/microMotherDayPage" 						getComponent={MicroActivityMotherDayPage} />  
//			<Route path="/microFatherDayPage" 						getComponent={MicroActivityFatherDayPage} />  
//			<Route path="/microJuneDayPage" 						getComponent={MicroActivityJuneDayPage} />  
//			<Route path="/microSummerSigningPage" 					getComponent={MicroActivitySummerSigningPage} />  
//			<Route path="/microSummerTrainingPage"					getComponent={MicroActivitySummerTrainingPage} />  
//			<Route path="/microSummerCampPage"						getComponent={MicroActivitySummerCampPage} />  
//			<Route path="/microTechPage" 							getComponent={MicroTechPage} />  
//			<Route path="/microEnglishPage" 						getComponent={MicroEnglishPage} />  
//			<Route path="/microGraffitiPage" 						getComponent={MicroGraffitiPage} />  
//			<Route path="/microInvitationPage" 						getComponent={MicroLeafletsInvitationPage} />   
//			<Route path="/microAnimation" 							getComponent={MicroAnimationPage} />   
//	  	</Router>	
//  );
//}


import React from 'react';
import { Router, Route } from 'dva/router';

import MicroActivityMotherDayPage  			
from '../../../pages/weixin/microActivity2017MotherDay/microMotherDayPage';
import MicroActivityFatherDayPage  			
from '../../../pages/weixin/microActivity2017FatherDay/microFatherDayPage';
import MicroActivityJuneDayPage  			
from '../../../pages/weixin/microActivity2017JuneDay/microJuneDayPage';
import MicroActivitySummerSigningPage		
from '../../../pages/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage';
import MicroActivitySummerTrainingPage		
from '../../../pages/weixin/microActivity2017SummerTraining/MicroActivitySummerTrainingPage';
import MicroActivitySummerCampPage			
from '../../../pages/weixin/microActivity2017SummerCamp/MicroActivitySummerCampPage';
import MicroLeafletsTechPage				
from '../../../pages/weixin/microLeaflets2017Tech/MicroLeafletsTechPage';
import MicroEnglishPage						
from '../../../pages/weixin/microLeaflets2017English/EnglishPage';
import MicroGraffitiPage					
from '../../../pages/weixin/microActivity2017Graffiti/MicroGraffitiPage';
import MicroAnimationPage					
from '../../../pages/weixin/microActivity2017Animation/microAnimationPage';
import MicroLeafletsInvitationPage			
from '../../../pages/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage';
import MicroLeafletsEarlyEducationPage		
from '../../../pages/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationPage';
import MicroLeafletsFineArtsPage		
from '../../../pages/weixin/microLeaflets2017FineArts/MicroLeafletsFineArtsPage';
import MicroActiityCallPhonePage		
from '../../../pages/weixin/microActivity2017CallPhone/microCallPhonePage';
import MicroActiityCallSecondPhonePage		
from '../../../pages/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondPage';
import MicroActiityCallThreePhonePage
from '../../../pages/weixin/microActivity2017CallPhoneThree/microCallPhonePage';
import MicroLeafletsDancePage		
from '../../../pages/weixin/microLeaflets2017Dance/MicroLeafletsDancePage';
import MicroActivityBarrage
from '../../../pages/weixin/microActivity2017Barrage/MicroBarragePage';
import MicroSchoolWouldBeStartingPage
from '../../../pages/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage';
import MicroAutumnTourismOnePage
from '../../../pages/weixin/microActivity2017AutumnTourismOne/microAutumnOnePage';
import MicroAutumnTourismTwoPage
from '../../../pages/weixin/microActivity2017AutumnTourismTwo/microAutumnTwoPage';
import MicroSchoolWouldBeStartingSecondPage
from '../../../pages/weixin/microActivity2017SchoolWouldBeStartingSecond/MicroSchoolWouldBeStartingSecondPage';
import MicroLegoOnePage
from '../../../pages/weixin/microActivity2017LegoOne/microLegoOnePage';
import MicroLegoTwoPage
from '../../../pages/weixin/microActivity2017LegoTwo/microLegoTwoPage';
import MicroTeachersPage
from '../../../pages/weixin/microActivity2017TeachesDay/MicroTeachersPage';

export default function ({ history }) {
  return (
    <Router history={history}>
		<Route path="/microMotherDayPage" 						component={MicroActivityMotherDayPage} />  
		<Route path="/microFatherDayPage" 						component={MicroActivityFatherDayPage} />  
		<Route path="/microJuneDayPage" 						component={MicroActivityJuneDayPage} />  
		<Route path="/microSummerSigningPage" 					component={MicroActivitySummerSigningPage} />  
		<Route path="/microSummerTrainingPage"					component={MicroActivitySummerTrainingPage} />  
		<Route path="/microSummerCampPage"						component={MicroActivitySummerCampPage} />  
		<Route path="/microTechPage" 							component={MicroLeafletsTechPage} />  
		<Route path="/microEnglishPage" 						component={MicroEnglishPage} />  
		<Route path="/microGraffitiPage" 						component={MicroGraffitiPage} />  
		<Route path="/microInvitationPage" 						component={MicroLeafletsInvitationPage} />   
		<Route path="/microAnimation" 							component={MicroAnimationPage} />  
	  	<Route path="/microEarlyEducationPage" 					component={MicroLeafletsEarlyEducationPage} />  
	  	<Route path="/microLeafletsFineArtsPage" 				component={MicroLeafletsFineArtsPage} />  
	  	<Route path="/microAutumnRecruitCallPage" 				component={MicroActiityCallPhonePage} />  
	  	<Route path="/microAutumnRecruitSecondPage" 			component={MicroActiityCallSecondPhonePage} />  
	  	<Route path="/microAutumnRecruitThreePage" 				component={MicroActiityCallThreePhonePage} />  
	  	<Route path="/microLeafletsDancePage" 					component={MicroLeafletsDancePage} /> 
	  	<Route path="/microBarrage" 							component={MicroActivityBarrage} /> 
	  	<Route path="/microSchoolWouldBeStartingPage" 			component={MicroSchoolWouldBeStartingPage} /> 
	  	<Route path="/MicroSchoolWouldBeStartingSecondPage" 	component={MicroSchoolWouldBeStartingSecondPage} /> 
	  	<Route path="/microAutumnTourismOnePage" 				component={MicroAutumnTourismOnePage} /> 
	  	<Route path="/microAutumnTourismTwoPage" 				component={MicroAutumnTourismTwoPage} /> 
	  	<Route path="/microLegoOnePage" 						component={MicroLegoOnePage} /> 
	  	<Route path="/microLegoTwoPage" 						component={MicroLegoTwoPage} /> 
	  	<Route path="/microTeachersDayPage" 					component={MicroTeachersPage} /> 
	  
    </Router>
  );
}