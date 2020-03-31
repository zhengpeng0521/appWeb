import React from 'react';
import styles from './AcceptInviteComponent.less';
import { Button } from 'antd-mobile';

function AcceptInviteComponent({
	acceptInviteFunc,
    userInfo,
}) {


    return(
        <div className={styles.share_head}>
           <img src = 'https://img.ishanshan.com/gimg/img/054af7f9f42fb971295b6fb09303f1a7' style={{width:'100%'}}/>
               <div className={styles.avatar_content}>
                   <div className={styles.avatar}>
                       <img className={styles.avatar_img} src={userInfo.headImg}/>
                   </div>
                   <div className={styles.avatar_name}>{userInfo.nickName}</div>
                   <div className={styles.avatar_tip}>
                       <span style={{fontSize:'1.7rem',color:'#333333'}}>{userInfo.mchName}</span>&nbsp;
                       <span>刚帮你抢到</span>
                   </div>
               </div>
               <div className={styles.link_btn} onClick = {() => acceptInviteFunc()}>
                   <img src="https://img.ishanshan.com/gimg/img/de62c7bdd2b5bfa56ca836aa4c3c3184" />
               </div>
        </div>
    );
}

export default AcceptInviteComponent;
