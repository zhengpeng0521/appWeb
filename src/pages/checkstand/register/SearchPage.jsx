import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SearchComponent from '../../../components/checkstand/register/SearchComponent';

function SearchPage({ dispatch,SearchModel,StepsModel }) {
    let {
       accountArr,
       search,
       account,
       modalLoading,
       contactLine
    } = SearchModel;

    let {
        province,
        city,
        bankName,
        step,
        accountOpen,
    }=StepsModel;

    function serachChange(search){
        dispatch({
            type:'SearchModel/updateState',
            payload:{
                search,
            }
        });
        dispatch({
            type:'SearchModel/queryBankCode',
            payload:{
                province,
                city,
                bankName,
            }
        })
    }

    function accountFunc(name,code){
        dispatch({
            type:'SearchModel/updateState',
            payload:{
                account : name,
                contactLine : code,
            }
        })
        dispatch(routerRedux.push({
            pathname: 'StepThreePage',
        }))
    }

    let SearchProps = {
        accountArr,search,serachChange,accountFunc,modalLoading
    };
    return (
            <SearchComponent {...SearchProps} />
    );
}

SearchPage.propTypes = {
//  ChooseOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ SearchModel,StepsModel }) {
  return { SearchModel ,StepsModel};
}

export default connect(mapStateToProps)(SearchPage);
