import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { BlockTitle , CommonList } from '../../../../../saas-common/common-component/component';
import styles from '../MenuLess.less';

function CommonMenu({
    renderMenuList,             //所有菜单数组

    OpenMenu,                   //打开菜单/点击管理
}) {

    return (
        <div className={styles.all}>
            <div className={styles.top}>
                <p>常用功能</p>
                <a onClick = {() => OpenMenu('all_menu')}>管理</a>
            </div>
            <div className={styles.menu}>
                { renderMenuList && renderMenuList.length > 0 ? renderMenuList.map((out_item,out_index) => {
                    let innerMenu = [];
                    if(out_item && !!out_item.children && out_item.children.length > 0){
                        for(let i in out_item.children){
                            if(out_item.children[i].choose){
                                innerMenu.push(
                                    <div key = { out_index + '_' + i } className={styles.menu_item_content_item} onClick = {() => OpenMenu(out_item.children[i].menu_key)}>
                                        <div className={styles.menu_item_content_item_icon}></div>
                                        <div className={styles.menu_item_content_item_title}>{ out_item.children[i].name }</div>
                                    </div>
                                )
                            }
                        }
                    }
                    if(!!out_item.children && out_item.children.length > 0 && innerMenu.length > 0){
                        //筛选出有子菜单的父级菜单
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
                    }else{
                        return null;
                    }
                }) : null}
                {/*<CommonList dataSource = {[{name:'123'},{name:'222'}]}/>*/}
            </div>
        </div>
    );
}

export default CommonMenu;
