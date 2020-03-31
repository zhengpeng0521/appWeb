import React, {PropTypes} from 'react';
import styles from './Saas3NoticeComponent.less';

function Saas3NoticeComponent() {

    return (
        <div className={styles.notice_cont}>

            <div className={styles.notice_title_cont}>
                <div className={styles.saas_logo}>
                    <img src='http://115.29.172.104/gimg/img/20fda21a3c4f514fe1832fd03c06cc78' />
                </div>

                <div className={styles.notice_title}>
                    <div className={styles.title_one}>闪闪早教机构SaaS<span className={styles.version_text}>3.0</span></div>
                    <div className={styles.title_two}>将于2017-04-26日全面上线</div>
                </div>
            </div>

            <div className={styles.notice_content}>
                <div className={styles.content_title}>
                    您将获得以下的全新体验
                </div>

                <div className={styles.content_item}>
                    1.营销，CRM，教学3大独立模块助您轻松完成线上招生，会员转化，教学管理所有关于学员的工作。
                </div>
                <div className={styles.content_item}>
                    2.营销模块现在包括微信和口碑线上市场的渠道管理，各种招生工具让您游刃有余，不断地获取生源名单到手软。
                </div>
                <div className={styles.content_item}>
                    3.CRM可以帮助机构将收集到的学员名单转化成签约会员。对销售过程中各个环节进行把控，不错过任何一个商机。
                </div>
                <div className={styles.content_item}>
                    4.教学模块着重解决排课，签到，家校通等重点的机构业务，让机构不在为管理头疼，提升家长满意度，打造极致服务体验，从而提高学员续费率
                </div>

                <div className={styles.notice_time}>
                    2017年04月24日
                </div>
            </div>
        </div>
    );
}

export default Saas3NoticeComponent;
