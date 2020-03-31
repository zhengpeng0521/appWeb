import React, {PropTypes} from 'react';
import supplierStyle from './supplier.less';

function Supplier({
	dataPage,
	isShowMaa,
}) {    

	let stylename = (dataPage&&dataPage.showBtn || isShowMaa) ? supplierStyle.supply : supplierStyle.supply1;
    return( 
			<div>
				<p className={stylename}>服务由 <a className={supplierStyle.supply_a} href="http://www.ishanshan.com/">闪闪早教</a>（ishanshan.com）提供</p>
			</div>	
    );   
} 

Supplier.propTypes = {
    dataPage    : PropTypes.any,
	isShowMaa	: PropTypes.any,
};

export default Supplier;
