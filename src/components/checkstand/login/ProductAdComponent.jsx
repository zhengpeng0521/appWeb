import React from 'react';
import styles from './ProductAdComponent.less';
import { Button } from 'antd-mobile';

function ProductAdComponent({
	openFunc
}) {


    return(
        <div className={styles.share_head}>
           <img src = 'https://img.ishanshan.com/gimg/img/85c898077ee558c2d45f9d97d9ce0dcd' style={{width:'100%'}}/>
               <div className={styles.link_btn} onClick = {() => openFunc()}>
                   <img src="https://img.ishanshan.com/gimg/img/105cf73180f38a9690d045c1bdda8f4f" />
               </div>
        </div>
    );
}

export default ProductAdComponent;
