import React, { PropTypes } from 'react';
import { Button } from 'antd-mobile';

import style from './SwitchButton.less';
/*
let props = {
        selectKey : gmtStartType,
        onChange : onGmtStartChange,
        options : [
            {
                key : '1',
                label : '立即上架',
            },
            {
                key : '0',
                label : '指定时间',
            }
        ]
    };
*/
function SwitchButton({selectKey, options, onChange}) {

    let loopOptionDiv = data => data.map(function(item) {
        return (<div key={item.key}
                    onClick={()=>onChange(item.key)}
                    className={item.key == selectKey ? style.switch_btn_select_item : style.switch_btn_item}>
                    {item.label}
                </div>);
    });

    return (
        <div className={style.switch_btn_cont}>
            {loopOptionDiv(options)}
        </div>
    );
}

SwitchButton.propTypes = {
    onChange : PropTypes.func,
};

export default SwitchButton;
