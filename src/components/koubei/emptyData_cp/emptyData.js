import React, {PropTypes} from 'react';
import emptyDataStyle from './emptyData.less';
function EmptyData({

}) {    
	
    return( 
        <div>
			<div className={emptyDataStyle.base_div_content}>
             	课程介绍马上就来~ <br/> 请耐心等待 
            </div>
			<div>
				<p className={emptyDataStyle.supply}>服务由 <a className={emptyDataStyle.supply_a} href="http://www.ishanshan.com/">闪闪早教</a>（ishanshan.com）提供</p>
			</div>
		</div>
    );   
} 
export default EmptyData;