import React from 'react';
import styles from './ProductDetailComponent.less';
import moment from 'moment';
import { WhiteSpace, WingBlank, Icon, Button, ListView, Popover } from 'antd-mobile';

const Item = Popover.Item;

function ProductDetailComponent({
	title,        //标题
	date,         //日期
	imgurl,
}){
	return(
		<div className = { styles.product_detail_wrap }>
			<div className = { styles.product_detail_wrap_img }>
                <img src = {imgurl}/>
            </div>
			<div className = { styles.product_detail_title }>{ title }</div>
			<div className = { styles.product_detail_time }>2017年7月20日 20:13</div>
		</div>
	)
}

export default ProductDetailComponent;
