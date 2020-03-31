import React, {PropTypes} from 'react';

import { Button } from 'antd-mobile';

var QRCode = require('qrcode.react');
function TwoCodePageComponent({
	urlCode
}){

	return(
		<div id="qrcode_img_cont_455645432">
			<div className="code">
				<img className="img_max" src = {"/thinknode/upload/imageProxy?src=" + urlCode} />
                <img className="img_min" src="/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/114e3b02913a0b8a117bac2f8a5e9253" />
			</div>

            <div className="btmTxt">
              长按关注闪闪可实时查看报名活动情况
            </div>
		</div>
	);

}

export default TwoCodePageComponent;
