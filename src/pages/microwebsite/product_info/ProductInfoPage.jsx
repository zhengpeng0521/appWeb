import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductInfoComponent from '../../../components/microwebsite/product_info/ProductInfoComponent.jsx';

function ProductInfoPage({ dispatch, productInfoModel }) {

	let {
		tenantId,
		orgId,
		stuId,
		stuName,

		sortTime,            //正序 倒序
		tagId,               //类型
		visible,             //选择作品显隐
		tagList,             //作品类型

		dataSource,          //作品列表
		resultCount,
		pageIndex,
		pageSize,
		endLoading,          //是否到底部

		productType

	} = productInfoModel;

	/*上拉加载*/
	function onEndReached(){
		if( dataSource.length >= resultCount ){
			if( !endLoading ) {
				dispatch({
					type : 'productInfoModel/updateState',
					payload : {
						endLoading : true
					}
				})
			}
		}else {
			dispatch({
				type : 'productInfoModel/getMoreList',
				payload : {
					pageSize,
					pageIndex : pageIndex + 1
				}
			})
		}
	}

	/*倒序或正序排列*/
	function descOrAscFunc(){
		if( sortTime == 'desc' ){
			dispatch({
				type : 'productInfoModel/descOrAscFunc',
				payload : { sortTime : 'asc' }
			})
		}else if( sortTime == 'asc' ){
			dispatch({
				type : 'productInfoModel/descOrAscFunc',
				payload : { sortTime : 'desc' }
			})
		}
	}

	/*选中作品类型*/
	function selectProductType( item ){
		let productType = item.props.children;
		let tagId = undefined;
		if( item.key != '-1' ){
			tagId = item.key
		}
		dispatch({
			type : 'productInfoModel/selectProductType',
			payload : {
				tagId : tagId,
				productType
			}
		})
	}

	function onVisibleChange(){
		dispatch({
			type : 'productInfoModel/updateState',
			payload : {
				visible : !visible
			}
		})
	}

	/*点击进入作品详情*/
	function clickToProductDetail( item ){
		dispatch(
			routerRedux.push({
				pathname : '/product_detail',
				query:  {
					date : item.date,
					title : item.title,
					imgurl : item.imgurl
				}
			})
		)
	}

	let props = {
		stuName,

		dataSource,             //作品列表
		endLoading,             //是否到底部

		onEndReached,           //上拉加载

		sortTime,               //正序 倒序
		tagId,                  //类型
		tagList,                //作品类型
		selectProductType,      //选择作品类型
		visible,                //选择作品显隐
		onVisibleChange,

		descOrAscFunc,          //点击切换正序倒序

		clickToProductDetail,   //点击进入作品详情

		productType
	}

    return (
		<ProductInfoComponent { ...props } />
    );
}


function mapStateToProps({ productInfoModel }) {
  return { productInfoModel };
}

export default connect(mapStateToProps)(ProductInfoPage);
