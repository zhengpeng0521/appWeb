import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductDetailComponent from '../../../components/microwebsite/product_info/ProductDetailComponent.jsx';

function ProductDetailPage({ dispatch, productDetailModel }) {

	let {
		title,
		date,
		imgurl

	} = productDetailModel;

	let props = {
		title,        //标题
		date,         //日期
		imgurl
	}

    return (
		<ProductDetailComponent { ...props } />
    );
}


function mapStateToProps({ productDetailModel }) {
  return { productDetailModel };
}

export default connect(mapStateToProps)(ProductDetailPage);
