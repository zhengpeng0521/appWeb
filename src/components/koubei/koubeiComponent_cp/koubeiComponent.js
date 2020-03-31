import React, {PropTypes} from 'react';
import koubeiComponentStyle from './koubeiComponent.less';

function Maa({
	alipayUserId,
	merchant_pid,
	shop_id,
	tenant_id,
}) {    
	
	let maaUrl = `${BASE_URL}/h5Reservation/koubeiMaa?merchant_pid=${merchant_pid}&shop_id=${shop_id}&alipayUserId=${alipayUserId}`
	return( 
		<div className={koubeiComponentStyle.maa_base_div_maa} >
			<a href={maaUrl}>
			<p className={koubeiComponentStyle.maa_base_div_maa_btn} type="primary">预约试听</p>
			</a>
		</div>
	)
} 

Maa.propTypes = {
    alipayUserId    : PropTypes.any,
	merchant_pid    : PropTypes.any,
	shop_id    		: PropTypes.any,
	tenant_id    	: PropTypes.any,
};
  
export default Maa;
