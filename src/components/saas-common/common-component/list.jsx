/*
 * 下拉刷新长列表封装listView
 * @author zhaojian
 * outClassName string 外层div自定义类名
 * outStyle object 外层div自定义样式对象
 * listClassName string 列表自定义类名
 * dataSource array 列表数据
 * formatDataSource array 开启复选框情况下加入zj_index的列表数据
 * pageSize 每页条数
 * wetherEnd boolean 是否到底部
 * loadingText string 下拉刷新请求时文案
 * endText string 数据全部加在完成文案
 * emptyText string 空数据文案
 * selectRows array 选中项的数组
 * onEndReached functoin 到达底部事件
 */

import React from 'react';
import { WhiteSpace , WingBlank , Icon , Button , ListView , Checkbox , Toast } from 'antd-mobile';
import list from './common-less/List.less';
import { NullData } from './component';
const CheckboxItem = Checkbox.CheckboxItem;

class CommonList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            outClassName : this.props.outClassName || '',
            outStyle : this.props.outStyle || '',
            listClassName : this.props.listClassName || '',
            dataSource : this.props.dataSource || [],
            resultCount : this.props.resultCount || 0,
            pageSize : this.props.pageSize || 20,
            wetherEnd : false,
            endText : this.props.loadingText || '已加载完成~',
            loadingText : this.props.endText || '拼了老命加载中...',
            emptyText : this.props.emptyText || undefined,
            selectRows : [],
        }
    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps){
            this.setState(nextProps);
            if(nextProps.dataSource.length == nextProps.resultCount && !this.state.wetherEnd){
                this.setState({ wetherEnd : true });
            }
        }
    }

    componentDidMount(){

    }

    onChoose(checked,rowData){
        this.props.onSelect && this.props.onSelect(checked,rowData)
    }

    //课程布局
    renderRow( rowData, sectionID, rowID ) {
        return (
			<div className = { list.render_row } key = { 'render_row_' + sectionID + '_' + rowID }>
                { !!this.props.onSelect ?
                    <CheckboxItem onChange={(e) => this.onChoose(e.target.checked,rowData)}>
                        <div className = { list.render_row_item }>
                            <div>{ rowData.name }</div>
                            <div>18358188430</div>
                        </div>
                    </CheckboxItem>
                    :
                    <div className = { list.render_row_item }>
                        <div>{ rowData.name }</div>
                        <div>18358188430</div>
                    </div>
                }
			</div>
      	);
    }

	/*列表之间的间隙*/
	renderSeparator( sectionID, rowID ){
		return (
			<div className = { list.render_separator } key = { 'render_separator_' + rowID }></div>
		)
	}

    onEndReached(){
        if(this.state.dataSource.length > this.state.resultCount){
            return console.error('数据总条数不能少于数组长度')
        }
		if(this.state.dataSource.length < this.state.resultCount){
            this.props.onLoad && this.props.onLoad();
		}
	}

    render(){
        const ds = new ListView.DataSource({
            rowHasChanged : ( r1, r2 ) => r1 !== r2
        });

        const data = ds.cloneWithRows( this.state.dataSource || [] );

        console.info('this.state.',this.state.dataSource)

        return(
            <div style = {{ width : '100vw' , height : '100vh' , ...this.state.outStyle }} className = { this.state.outClassName || '' }>
			 { !!this.state.dataSource && this.state.dataSource.length > 0 ?
                    <ListView
                        className = { 'common_list_view_wrap ' + (this.state.listClassName + '') }
                        style = {{ height : '100%', background : '#f9f9f9' }}
                        dataSource = { data }
                        renderRow = {(rowData,sectionID,rowID) => this.renderRow(rowData,sectionID,rowID)}
                        renderSeparator = {(sectionID,rowID) => this.renderSeparator(sectionID,rowID)}
                        renderFooter = {
                            () => <div style={{ textAlign : 'center' }}>
                                      { this.state.wetherEnd ? this.state.endText : this.state.loadingText }
                                  </div>
                        }
                        initialListSize = { !isNaN(this.state.pageSize) ? parseFloat(this.state.pageSize) : 20 }
                        scrollRenderAheadDistance = { 200 }
                        onEndReached = {() => this.onEndReached()}
                        onEndReachedThreshold = { 50 }
                    />
                    :
                    <NullData content = { this.state.emptyText } height = '100%'/>
                }
            </div>
        )
    }
}

export default CommonList;
