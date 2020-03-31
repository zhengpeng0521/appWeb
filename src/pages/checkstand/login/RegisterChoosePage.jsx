import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import RegisterChooseComponent from '../../../components/checkstand/login/RegisterChooseComponent';

function RegisterChoosePage({ dispatch,RegisterChooseModel,StepsModel }) {
    let {

    } = RegisterChooseModel;

	 let {
        step,
    }= StepsModel;

    function openFunc(){
        dispatch(routerRedux.push({
            pathname: 'LoginPage',
            query:{ }
        }));
    }

	/*其他商户的开通*/
    function openNewOrgFunc(){
        dispatch(routerRedux.push({
            pathname: 'StepThreePage',
            query:{ }
        }))
        dispatch({
            type : 'StepsModel/updateState',
            payload : {
                orgName :'',
                step:0,
				mchId : ''
            }
        })
//        if(window._init_data){
	        let buriedPointParam = {
	        	PageCode : 'h5_checkstand',
	        	PageName: '收银台h5',
	        	Activeness: 1,
				_orgId : '',
				_tenantId : '',
				_opId : '',
				_account : "",
				_btnName : '开通新机构',
			}
			sa && sa.track('click' , buriedPointParam);
//		}
    }

    let RegisterChooseProps = {
        openFunc,openNewOrgFunc
    };
    return (
        <RegisterChooseComponent {...RegisterChooseProps} />
    );
}

RegisterChoosePage.propTypes = {
//  ChooseOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ RegisterChooseModel,StepsModel }) {
  return { RegisterChooseModel,StepsModel };
}

export default connect(mapStateToProps)(RegisterChoosePage);
