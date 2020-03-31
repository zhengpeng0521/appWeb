import React, {PropTypes} from 'react';
import styles from './MicroModulePageComponent.less';
import {moduleRenderParse} from '../../utils/micro-module-render-util-dingding/microModuleRenderUtil';

/*
 * 自定义微活动 - 单页的渲染
 */
function MicroModulePageComponent({
    pageType,pageItem,pageIndex,currentPageIndex,
}) {

    let items = pageItem && pageItem.items;

    let pageProps = pageItem.props;
    let pageBg = (pageProps && pageProps.bg) || {};
    let page_bg_img = pageBg.bg_img;
    let page_bg_color = pageBg.bg_color;

    let bgStyle = {};
    if(page_bg_img && page_bg_img.length > 0) {
        bgStyle.backgroundImage = 'url(' + page_bg_img + ')';
        bgStyle.backgroundRepeat ='no-repeat'
        bgStyle.backgroundSize = '100% 100%';
    }

    if(page_bg_color && page_bg_color.length > 0) {
        bgStyle.backgroundColor = page_bg_color;
    }

    if(pageType == 'one') {
        bgStyle.overflowY = 'auto';
        bgStyle.overflowX = 'hidden';
    }

    return (
        <div
          style={{...bgStyle}}
          className={styles.micro_module_page_cont}>
           {!!(pageIndex == currentPageIndex) &&
            items && items.length > 0 && items.map(function(item, index) {
                return moduleRenderParse('4', item, index);
            })
           }
        </div>
    );
}

export default MicroModulePageComponent;
