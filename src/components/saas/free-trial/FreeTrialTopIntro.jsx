import React, {PropTypes} from 'react';
import {  } from 'antd-mobile';
import styles from './FreeTrial.less';

function FreeTrialTopIntro({
    htmlDetail
}) {

    return (
        <div style={{width:'100%'}}>
            <div dangerouslySetInnerHTML={{__html : htmlDetail }}></div>
        </div>
    );
}

export default FreeTrialTopIntro;
