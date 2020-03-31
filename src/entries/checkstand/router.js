import React from 'react';
import { Router, Route, IndexRoute , IndexRedirect} from 'dva/router';
import ProductAdPage from '../../pages/checkstand/login/ProductAdPage';
import ProtocolPage from '../../pages/checkstand/login/ProtocolPage';
import RegisterChoosePage from '../../pages/checkstand/login/RegisterChoosePage';
import LoginPage from '../../pages/checkstand/login/LoginPage';
import ChooseOrgPage from '../../pages/checkstand/login/ChooseOrgPage';
import StepsPage from '../../pages/checkstand/register/StepsPage';
import StepThreePage from '../../pages/checkstand/register/StepThreePage';
import StepOnePage from '../../pages/checkstand/register/StepOnePage';
import StepTwoPage from '../../pages/checkstand/register/StepTwoPage';
import StepFourPage from '../../pages/checkstand/register/StepFourPage';
import SearchPage from '../../pages/checkstand/register/SearchPage';
import ShareMobilePage from '../../pages/checkstand/share/ShareMobilePage';
import ShareOrgPage from '../../pages/checkstand/share/ShareOrgPage';
import ShareHeadPage from '../../pages/checkstand/share/ShareHeadPage';
import AcceptInvitePage from '../../pages/checkstand/share/AcceptInvitePage';
import MailLoginPage from '../../pages/checkstand/mailApply/MailLoginPage';
import MailOrgPage from '../../pages/checkstand/mailApply/MailOrgPage';
import MailReceiptInfoPage from '../../pages/checkstand/mailApply/MailReceiptInfoPage';
import SubmitSuccPage from '../../pages/checkstand/mailApply/SubmitSuccPage';
import AppPage from '../../pages/checkstand/App/AppPage';
import AppFlowPage from '../../pages/checkstand/App/flow/AppFlowPage';
import AppMemberPage from '../../pages/checkstand/App/AppMemberPage';
import AppMinePage from '../../pages/checkstand/App/AppMinePage';
import AppPaycodePage from '../../pages/checkstand/App/AppPaycodePage';
import TradeDetailPage from '../../pages/checkstand/App/flow/TradeDetailPage';
import CardPage from '../../pages/checkstand/App/payCode/CardPage';
import BadgePage from '../../pages/checkstand/App/payCode/BadgePage';
import AppLoginPage from '../../pages/checkstand/App/login/AppLoginPage';
import LinkToSharePage from '../../pages/checkstand/createLink/LinkToSharePage';
import ResultPage from '../../pages/checkstand/createLink/ResultPage';
import PicEnlargePage from '../../pages/checkstand/createLink/PicEnlargePage';

export default function ({ history }) {
	  let indexRouter =  window._init_data.indexRouter || '/ProductAdPage'
    return (
			<Router history = { history }>
					<Route path ="/">
							<IndexRedirect to={indexRouter} />
							<Route path = "/ProductAdPage" component = { ProductAdPage } />
							<Route path = "/LoginPage" component = { LoginPage } />
							<Route path = "/StepsPage" component = { StepsPage } />
							<Route path = "/StepThreePage" component = { StepThreePage } />
							<Route path = "/StepOnePage" component = { StepOnePage } />
							<Route path = "/StepTwoPage" component = { StepTwoPage } />
							<Route path = "/StepFourPage" component = { StepFourPage } />
							<Route path = "/SearchPage" component = { SearchPage } />
							<Route path = "/chooseOrg_page" component = { ChooseOrgPage } />
							<Route path = "/ProtocolPage" component = { ProtocolPage } />
							<Route path = "/RegisterChoosePage" component = { RegisterChoosePage } />
							/*收款码推广*/
							<Route path = "/ShareHeadPage" component = { ShareHeadPage } />
							<Route path = "/AcceptInvitePage" component = { AcceptInvitePage } />
							<Route path = "/ShareMobilePage" component = { ShareMobilePage } />
							<Route path = "/ShareOrgPage" component = { ShareOrgPage } />
							/*邮寄物料*/
							<Route path = "/MailLoginPage" component = { MailLoginPage } />
							<Route path = "/MailOrgPage" component = { MailOrgPage } />
							<Route path = "/MailReceiptInfoPage" component = { MailReceiptInfoPage } />
							<Route path = "/SubmitSuccPage" component = { SubmitSuccPage } />
							/*App*/
							<Route path = "/AppPage" component = { AppPage } />
							<Route path = "/AppLoginPage" component = { AppLoginPage } />
							<Route path = "/AppFlowPage" component = { AppFlowPage } />
							<Route path = "/AppMemberPage" component = { AppMemberPage } />
							<Route path = "/AppMinePage" component = { AppMinePage } />
							<Route path = "/AppPaycodePage" component = { AppPaycodePage } />
							<Route path = "/TradeDetailPage" component = { TradeDetailPage } />
							<Route path = "/CardPage" component = { CardPage } />
							<Route path = "/BadgePage" component = { BadgePage } />
							/*供销售分享使用*/
							<Route path = "/LinkToSharePage" component = { LinkToSharePage } />
							<Route path = "/ResultPage" component = { ResultPage } />
							<Route path = "/PicEnlargePage" component = { PicEnlargePage } />
					</Route>
			</Router>
    );

}

