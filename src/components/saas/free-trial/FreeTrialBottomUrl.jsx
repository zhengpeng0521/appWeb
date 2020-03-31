import React, {PropTypes} from 'react';
import {  } from 'antd-mobile';
import styles from './FreeTrial.less';

function FreeTrialBottomUrl({
    BottomText,
    BottomUrl
}) {
    if(BottomUrl != '' && BottomUrl != null && BottomUrl != undefined){
        return (
            <div style={{marginTop:'50px',marginBottom:'50px',textAlign:'center'}}>
                <a href={BottomUrl} style={{margin:'0 auto',fontSize:'24px',color:'#5d9cec'}}>
                    {BottomText}>
                </a>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }

}

export default FreeTrialBottomUrl;
