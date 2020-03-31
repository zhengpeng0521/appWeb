import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductAdComponent from '../../../components/checkstand/login/ProductAdComponent';

function ProductAdPage({ dispatch,ProductAdModel }) {
    let {

    } = ProductAdModel;

    function openFunc(){
        dispatch(routerRedux.push({
            pathname: 'RegisterChoosePage',
            query:{ }
        }));
    }

    let ProductAdProps = {
        openFunc
    };
    return (
        <ProductAdComponent {...ProductAdProps} />
    );
}

ProductAdPage.propTypes = {
//  ChooseOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ ProductAdModel }) {
  return { ProductAdModel };
}

export default connect(mapStateToProps)(ProductAdPage);
