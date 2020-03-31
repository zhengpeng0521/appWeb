import React from 'react';
import styles from './RegisterChooseComponent.less';
import { Button } from 'antd-mobile';

function RegisterChooseComponent({
	openFunc,openNewOrgFunc
}) {


    return(
        <div className={styles.chooseWay}>
			<div className={styles.other} style={{marginBottom:'1.8rem',marginTop:'3.4rem'}}>
				<div className={styles.other_name}>其他商户开通</div>
				<div className={styles.other_cont}>申请新商户进行收银宝业务开通</div>
				<div className={styles.next_btn}>
					<Button type='primary' onClick={openNewOrgFunc}>下一步</Button>
				</div>
			</div>
			<div className={styles.other}>
				<div className={styles.other_name}>招生宝/云校机构绑定</div>
				<div className={styles.other_cont}>选择已有机构进行收银宝业务绑定</div>
				<div className={styles.next_btn}>
					<Button type='primary' onClick={openFunc}>下一步</Button>
				</div>
			</div>
        </div>
    );
}

export default RegisterChooseComponent;
