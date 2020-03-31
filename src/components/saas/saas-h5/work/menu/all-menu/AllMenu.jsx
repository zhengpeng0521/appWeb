import React from 'react';
import { Icon } from 'antd-mobile';
import { NewModal , BlockTitle } from '../../../../../saas-common/common-component/component';
import styles from '../MenuLess.less';

function AllMenu({
    allMenuList,            //所有菜单数组
    visible,                //此页面是否显示
    time,                   //页面打开与关闭时长

    Back,                   //点击返回
    PickMenuItem            //点击选中或者取消选中菜单项
}) {

    return (
        <NewModal visible = { visible } transitionDuration = { time/1000 + 's' }>
            <div className={styles.all}>
                <div className={styles.top}>
                    <div>请选择常用功能</div>
                    <a onClick = { Back }>返回</a>
                </div>
                <div className={styles.menu}>
                    { allMenuList && allMenuList.length > 0 ? allMenuList.map((out_item,out_index) => {
                        let innerMenu = [];
                        if(out_item && !!out_item.children && out_item.children.length > 0){
                            innerMenu = out_item.children.map((inner_item,inner_index) => {
                                return(
                                    <div key = { out_index + '_' + inner_index } className={styles.menu_item_content_item} onClick = {() => PickMenuItem(inner_item.id,inner_item.parent_id)}>
                                        { !!inner_item.choose ?
                                            <div className={styles.menu_item_content_item_pick}/> : null }
                                        <div className={styles.menu_item_content_item_icon}></div>
                                        <div className={styles.menu_item_content_item_title}>{ inner_item.name }</div>
                                    </div>
                                )
                            })
                        }
                        return(
                            <div className={styles.menu_item} key = { out_index }>
                                <BlockTitle content = { out_item.name || '--' } className={styles.menu_item_title}/>
                                { innerMenu && innerMenu.length > 0 ?
                                    <div className={styles.menu_item_content}>
                                        { innerMenu || [] }
                                    </div> : null
                                }
                            </div>
                        )
                    }) : null}
                </div>
            </div>
        </NewModal>
    );
}

export default AllMenu;
