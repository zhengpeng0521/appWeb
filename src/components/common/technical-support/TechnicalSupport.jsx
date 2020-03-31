import React, { PropTypes } from 'react';

import style from './TechnicalSupport.less';

//技术支持文案
function TechnicalSupport({backgroundColor}) {

    return (
        <div className={style.technical_support} style={backgroundColor?{backgroundColor}:{}}>
            <span>服务由 <a className={style.technical_support_a} href="http://www.ishanshan.com">闪闪早教</a>(ishanshan.com) 提供</span>
        </div>
    );
};

export default TechnicalSupport;
