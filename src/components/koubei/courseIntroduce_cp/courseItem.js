import React, {PropTypes} from 'react';
import courseStyle from './courseItem.less';
import MaaComponent from '../koubeiComponent_cp/koubeiComponent';
import SupplierComponent from '../supplier_cp/supplier';

import { Button } from 'antd-mobile';
function Item({
	touchCurrentItem,
	loadNextPage,
	dataSource,
	dataPage,
    currentPageIndex,
	currentPageSize,
	alipayUserId,
	merchant_pid,
	shop_id,
	tenant_id,
}) {    

	let maaProps = {
		alipayUserId,
		merchant_pid,
		shop_id,
		tenant_id,
	};
	
	let isShowMaa = {
		dataPage
	};

    return(
        <div>
			<div>
                {  
					dataSource.map(function(item, index) {
						var imageurl =  'url(' + item.couseCover + ')';
						var classname = index % 2 == 0 ? courseStyle.course_item_base_div_left : courseStyle.course_item_base_div_right;
						return <div key={item.id} onClick={()=>touchCurrentItem(item.id)}>
									<div className={classname} >
										<div className={courseStyle.course_item_base_div_cover} style={{backgroundImage:imageurl}}></div>
										<p className={courseStyle.course_title}>{item.courseName}</p>
										<p className={courseStyle.course_subtitle}>适合年龄: {item.adage}</p>
									</div>
								</div>  
					})
				}	
			</div>   
			<div className={courseStyle.course_load_next_page_buttom_div}>
				<p className={courseStyle.course_load_next_page_buttom_text} onClick={()=>loadNextPage()}>
					{++dataPage.pageIndex >= dataPage.pageCount ? '加载完毕' : '加载更多'}
				</p>
			</div>
			<SupplierComponent {...isShowMaa}/>
			{dataPage.showBtn ? <MaaComponent {...maaProps}/> : ''}
        </div>
    );   
} 

Item.propTypes = {
    touchCurrentItem    : PropTypes.func,
	loadNextPage		: PropTypes.func,
	touchMaa			: PropTypes.func,
    dataSource          : PropTypes.array,
    dataPage            : PropTypes.any,
    currentPageSize     : PropTypes.any,
    currentPageIndex    : PropTypes.any,
    loading             : PropTypes.any,
	alipayUserId		: PropTypes.any,
	merchant_pid		: PropTypes.any,
	shop_id				: PropTypes.any,
};
  
export default Item;
