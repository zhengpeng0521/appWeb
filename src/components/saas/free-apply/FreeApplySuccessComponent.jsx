import React, { PropTypes } from 'react';
import {Result} from 'antd-mobile';
import style from './FreeApplySuccess.less';

function FreeApplySuccessComponent({}) {
    return (
        <div>
            <Result
                imgUrl="http://115.29.172.104/gimg/img/ef2814f770a8c3fa596edc845d0bb2b7"
                title="申请成功"
                message="所提交内容已成功完成验证"
              />
        </div>
    );
}

export default FreeApplySuccessComponent;
