import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { CurrentKernelCss } from '../../../../utils/currentKernel';
import { SelfMask } from '../../../../components/saas-common/common-component/component';
import styles from './MainLayout.less';
import QueueAnim from 'rc-queue-anim';

function MainLayout({ dispatch , mainLayout , children }) {

    let {

        bthGroup,               //tab组
        chooseKey,              //选中tab的key
        addGroup,               //点击加号渲染数组
        addMaskVisible,         //点击加号蒙层是否显示
        wetherClickCloseMask,   //是否点击关闭蒙层
        closeWaitingTime,       //点击关闭蒙层等待时间

    } = mainLayout;

    function dp(path,obj){
        dispatch({
            type : path,
            payload : obj
        })
    }

    function BarItemCss(type){
        //直接return不break也可以
        switch(type){
            case 'pick' : return { width : `calc(100%/${bthGroup.length})` , color : '#fff' , background : '#5d9cec' } ; break ;
            case 'leave' : return { width : `calc(100%/${bthGroup.length})` , color : '#666' } ; break ;
            default : return { width : `calc(100%/${bthGroup.length})` }
        }
    }

    //tab项目点击事件
    function TabBarItemOnChoose(key){
        if(key != 'add'){
            dispatch(routerRedux.push({
                pathname: key
            }));
            dp('mainLayout/updateState',{ chooseKey : key })
        }else{
            dp('mainLayout/updateState',{ addMaskVisible : true , wetherClickCloseMask : false })
        }
    }

    //关闭addtab
    function CloseOperationBar(){
        dp('mainLayout/setTimeout')
    }

    return (
        <div className={styles.all}>
            <SelfMask visible = { addMaskVisible }>
                <div className={ !wetherClickCloseMask ? styles.mask_bottom_area : styles.mask_bottom_area_will_close } style = { !!wetherClickCloseMask ? { animationDuration : closeWaitingTime } : null }>
                    { addMaskVisible ?
                        <QueueAnim
                            type={['bottom', 'bottom']}
                            ease={['easeOutQuart', 'easeInOutQuart']}
                            className={styles.operation_area} style = {{ height : `${(1 + 5 + 0.5 + 1.2 + 1)*Math.ceil(addGroup.length/4)}rem` /*, maxHeight : `${(0.5 + 5 + 0.5 + 1.2)*2}rem` */}}>
                             { addGroup.map((item,index) => {
                                return(
                                    <div className={ styles.operation_area_item } key = { item.key }>
                                        <div style = {{ background : item.color }}></div>
                                        <div>{ item.name }</div>
                                    </div>
                                )
                             }) }
                        </QueueAnim> : null
                    }
                    <div className={styles.tab_bar} key = 'tab_bar' style = {{ border : 0 }}>
                        <div className={ styles.circle_area_rotate } onClick = { CloseOperationBar } style = {{ animationDuration : `${addGroup.length/10}s` }}/>
                    </div>
                </div>
            </SelfMask>
            <div className={styles.children} /*style = { !!addMaskVisible ? CurrentKernelCss('filter','blur(2px)') : null }*/>
                { children }
            </div>
            <div className={styles.tab_bar}>
                { bthGroup && bthGroup.length > 0 ? bthGroup.map((item,index) => {
                    if(item.key == 'add'){
                        return (
                            <div style = { BarItemCss() } key = { index } className={styles.tab_bar_item} onClick = {() => TabBarItemOnChoose(item.key)}>
                                <div className={styles.circle_area}/>
                            </div> )
                    }else{
                        return(
                            <div style = { BarItemCss(chooseKey == item.key ? 'pick' : 'leave') } key = { index } className={styles.tab_bar_item} onClick = {() => TabBarItemOnChoose(item.key)}>
                                { item.name }
                            </div>
                        )
                    }

                }) :
                    <div>当前没有操作菜单</div>
                }
            </div>
        </div>
    );
}

function mapStateToProps({ mainLayout }) {
  	return { mainLayout };
}

export default connect(mapStateToProps)(MainLayout);
