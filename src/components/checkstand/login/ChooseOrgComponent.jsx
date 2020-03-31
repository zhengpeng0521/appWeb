import React from 'react';
import styles from './ChooseOrgComponent.less';
import { Button , InputItem , List} from 'antd-mobile';

const Item = List.Item;
function ChooseOrgComponent({
	orgList,
    openOrgFunc,
    goBackFunc,
    protocolFunc,
}) {
	return(
        <div className={styles.org_select}>
			{
				 orgList && orgList.length>0 ?
				 <div className={styles.org_select_tip}>请选择以下已有商户进行收银宝业务开通</div>
				 :
				 null
			}
           <List  className='orgList'>
               {
                   orgList && orgList.length>0 && orgList.map(function(item,index){
                       return(
                            <Item key={'org_'+index}
                                extra={
                                  item.status == '1'? "已绑定"
                                   :
                                  item.status == '3' ? "立即绑定"
                                   :
                                  item.status == '2' ? "审核失败"
                                   :
                                  item.status == '0' ? "审核中"
                                   :
                                   null
                                }
                                arrow="horizontal"
                                onClick={() => openOrgFunc(item)}>
                               {item.orgName}</Item>
                       );
                   })
               }
            </List>
            {/*
                   orgList && orgList.length>0 ?
                    <div className={styles.tip}>请选择上方已有商户进行开通；若要继续开通新商户请点击下方按钮开通新商户</div>
                    :
                   null
            */}

            <div style={{padding:'0 3rem'}}>
                <Button type="primary" style={{borderRadius:'10px'}} className='openOrg' onClick={() => goBackFunc()}>返回</Button>
            </div>

        </div>
    );
}

export default ChooseOrgComponent;
