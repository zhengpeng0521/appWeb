import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ChooseOrgComponent from '../../../components/checkstand/login/ChooseOrgComponent';

function ChooseOrgPage({ dispatch,ChooseOrgModel,StepsModel}) {
    let {
        orgList,
    } = ChooseOrgModel;

    let {
        step,
        errorMessage,
        flag,
        auditMsg,

    }= StepsModel;

    function openOrgFunc(item){
        if(item.status == '3'){
            dispatch(routerRedux.push({
                pathname: 'StepThreePage',
                query:{ }
            }));
			 dispatch({
                type:'StepsModel/updateState',
                payload:{
					mchId : item.mchId,
					orgName : '',
                }
            });
        }else if(item.status == '2'){
            dispatch(routerRedux.push({
                pathname: 'StepFourPage',
            }))
            dispatch({
                type:'StepsModel/updateState',
                payload:{
                    step : 3,
                    status : '3',
                    flag : false,
                    errorMessage,
                    auditMsg : item.auditMsg,
					mchId : item.mchId,
					orgName :item.orgName,
                }
            })
        }else if(item.status == '1'){
            dispatch(routerRedux.push({
                pathname: 'StepFourPage',
                query:{ }
            }));
            dispatch({
                type:'StepsModel/updateState',
                payload:{
                    step : 3,
                    status : '2',
					mchId : item.mchId,
					orgName :item.orgName,
                }
            });
        }
//        dispatch({
//            type : 'StepsModel/updateState',
//            payload : {
//                mchId : '',
//				orgName :'',
//            }
//        })
    }

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
	/*返回*/
	function goBackFunc(){
		 dispatch(routerRedux.push({
            pathname: 'LoginPage',
            query:{ }
        }))
	}

    function protocolFunc(){
        dispatch(routerRedux.push({
            pathname: 'ProtocolPage',
            query:{ }
        }))
    }

    let ChooseOrgProps = {
        orgList,openOrgFunc,goBackFunc,protocolFunc,
    };
    return (
        <ChooseOrgComponent {...ChooseOrgProps} />
    );
}

ChooseOrgPage.propTypes = {
//  ChooseOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ ChooseOrgModel , StepsModel}) {
  return { ChooseOrgModel , StepsModel};
}

export default connect(mapStateToProps)(ChooseOrgPage);
