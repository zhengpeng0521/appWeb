/*
 * NullData 无数据页面
 * SelfMask 自定义蒙层
 * NewModal 右边划入框
 * BlockTitle 带蓝色图标的标题
 * CommonList 公共列表样式
 */

import React from 'react';
import { WhiteSpace, WingBlank, Icon, Button, ListView } from 'antd-mobile';
import nullData from './common-less/NullData.less';
import selfMask from './common-less/SelfMask.less';
import newModal from './common-less/NewMOdal.less';
import blockTitle from './common-less/BlockTitle.less';
import list from './common-less/List.less';

/*
 * 无数据页面
 * @author 赵健
 * className string 自定义类名
 * height string/number => ('200px',200) 高度 默认200 最小100
 * content string 无数据页面内容，优先级高
 * children string 无数据页面内容，优先级低
 */
export function NullData({
    className,
    height,
    width,
    content,
    children,
}) {
    return(
        <div className = { 'common_null_data ' + (className || '') } style={{ height : height || 200 , width : width || '100%' }}>
            <img src = 'http://img.ishanshan.com/gimg/img/0f4b3e548fb0edce54c578866babc7af' />
            <div>{ content || children || '暂时没有数据'}</div>
        </div>
    );
}

/*
 * 自定义蒙层
 * @author 赵健
 * className string 自定义类名
 * visible boolean 蒙层是否显示
 * style object 自定义样式(注意:style中的visibility属性不可用)
 * children 子元素
 */

export function SelfMask({
    className,
    visible,
    style,
    children
}) {
    return(
        <div className = { 'common_blur_modal ' + (className || '') } style = {{ ...style , display : !!visible ? 'block' : 'none' }}>
            { children }
        </div>
    );
}

/*
 * 右边划入框
 * @author 赵健
 * className string 自定义类名
 * children string/ReactNode 内容
 * visible string 是否显示(默认false)
 * width string modal宽度(默认100%)
 * height string/number 高度(默认100%)
 * transitionDuration num 动画时间，默认0.2s
 */
export function NewModal({
    className,
    children,
    visible,
    width,
    height,
    transitionDuration,
    style
}) {
    return(
        <div className = { visible ? 'common_page_right_enter_modal_open ' + (className || '') : 'common_page_right_enter_modal_close ' + (className || '') }
             style={{ ...style , width : width || '100%' , height : height || '100%' , transitionDuration : transitionDuration || '0.2s' }}>
            { children }
        </div>
    );
}

/*
 * 带蓝色图标的标题
 * @author 赵健
 * className string 自定义类名
 */
export function BlockTitle({
    className,
    content,
    children,
    style
}) {
    return(
        <div className={ 'common_block_title ' + (className || '') } style = { style }>
            <div className = 'common_block_title_title'></div>
            <div className = 'common_block_title_content'>{ content || children || '请设置标题' }</div>
        </div>
    );
}

/*
 * 公共列表样式
 * outClassName string 外层div自定义类名
 * outStyle object 外层div自定义样式对象
 * listClassName string 列表自定义类名
 * dataSource array 列表数据
 * pageSize 每页条数
 * wetherEnd boolean 是否到底部
 * loadingText string 下拉刷新请求时文案
 * endText string 数据全部加在完成文案
 * emptyText string 空数据文案
 * onEndReached functoin 到达底部事件
 */
export function CommonList({
    outClassName,
    outStyle,
    listClassName,
	dataSource,
    pageSize,
	wetherEnd,
    loadingText,
    endText,
    emptyText,
	onEndReached,
    onSelect
}){

	const ds = new ListView.DataSource({
        rowHasChanged : ( r1, r2 ) => r1 !== r2
    });

	const data = ds.cloneWithRows( dataSource || [] );

	//课程布局
    function renderRow ( rowData, sectionID, rowID ) {
        console.info(rowData)
        return (
			<div className = { list.render_row } key = { 'render_row_' + rowID }>
                { !!onSelect ?
                    <div className = { list.render_row_choose }></div> : null
                }
                <div className = { list.render_row_item }>
				    <div>张三丰</div>
				    <div>18358188430</div>
                </div>
			</div>
      	);
    }

	/*列表之间的间隙*/
	function renderSeparator( sectionID, rowID ){
		return (
			<div className = { list.render_separator } key = { 'render_separator_' + rowID }></div>
		)
	}

	return(
		<div style = {{ width : '100%' , height : '100%' , ...outStyle }} className = { outClassName || '' }>
			{ dataSource.length > 0 ?
				<ListView
					className = { 'common_list_view_wrap ' + (listClassName + '') }
					style = {{ height : '100%', background : '#f9f9f9' }}
					dataSource = { data }
					renderRow = { renderRow }
					renderSeparator = { renderSeparator }
					renderFooter = {
                        () => <div style={{ textAlign : 'center' }}>
                                  { wetherEnd ? ( loadingText || '已经到底啦~' ) : ( endText || '拼了老命加载中...' ) }
                              </div>
                    }
					pageSize = { !isNaN(pageSize) ? parseFloat(pageSize) : 20 }
					scrollRenderAheadDistance = { 500 }
					onEndReached = { onEndReached }
					onEndReachedThreshold = { 50 }
			   />
				:
				<NullData content = { emptyText } />
			}
		</div>
	)
}
