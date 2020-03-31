/**
 *  @parma(array)    attTitleParam       (标题副标题)
 *  @parma(array)    attrButtonParam     (确认取消按钮)
 *  @parma(boolean)  attrShowAlertView   (是否显示弹窗)
 *  @parma(style)    attrBoxStyle        (弹框自定义样式)
 *  @parma(function) cancelFunction      (取消回调)
 *  @parma(function) determineFunction   (确定回调)
 */

import React from 'react';
import styles from './common_alert_view.less';

function MicroAlertComponent({

    attrShowAlertView,
    attrTitleParam,
    attrButtonParam,
    attrBoxStyle,
    cancelFunction,
    determineFunction,

}) {
    

    // if (attrShowAlertView) {
    //     document.addEventListener('touchmove', function (e) {
    //         event.preventDefault(); 
    //     });
    // } else {
    //     document.addEventListener('touchmove', function (e) {
    //         e.returnValue = true;
    //     });
    // }

    function cancalMask(index) {
        if (index) {
            determineFunction(index);
        } else {
            cancelFunction(index);
        }
    }
    
    //超出处理
    attrTitleParam = attrTitleParam && attrTitleParam.length > 2 ? attrTitleParam.slice(0, 2) : attrTitleParam;
    
    attrButtonParam = attrButtonParam && attrButtonParam.length > 2 ? attrButtonParam.slice(0, 2) : attrButtonParam;

    //空处理
    attrButtonParam = attrButtonParam && attrButtonParam.length ? attrButtonParam : ['取消', '确定'];

    attrTitleParam = attrTitleParam && attrTitleParam.length ? attrTitleParam : ['标题'] ;

    //占位处理
    attrTitleParam && attrTitleParam.length == 1 ? attrTitleParam.push('') : attrTitleParam;

    return (
        <div>
            {
                attrShowAlertView 
                ? 
                <div className={styles.mask_view}>
                        <div className={styles[attrBoxStyle]}>
                        {
                            attrTitleParam && attrTitleParam.map((item, index) => {
                                    return <p key={index} className={index == 0 ? styles.alert_title : styles.alert_subtitle}>{item}</p>
                            })
                        }
                        {
                            attrButtonParam && attrButtonParam.map((item, index) => {

                                return <div className={styles.alert_button} key={index}
                                            style={{ 
                                                marginLeft: attrButtonParam.length > 1 ? '7%' : 'calc(50% - 20%)',
                                                left : index == 1 ? '46%' : '0%',
                                                backgroundColor: index == attrButtonParam.length - 1 ? '#5d9cec' : '#ABD2F4',
                                            }} 
                                            onClick={() => cancalMask(attrButtonParam.length == 1 ? 1 : index)}>{item}
                                        </div>
                            })
                        }
                    </div>
                </div>
                : 
                ''
            }
        </div>
    )
}

export default MicroAlertComponent;
