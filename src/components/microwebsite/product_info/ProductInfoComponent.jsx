import React from 'react';
import styles from './ProductInfoComponent.less';
import moment from 'moment';
import { WhiteSpace, WingBlank, Icon, Button, ListView, Popover } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

const Item = Popover.Item;

function ProductInfoComponent({
	stuName,
	dataSource,             //作品列表
	endLoading,             //是否到底部
	sortTime,               //正序 倒序
	tagId,                  //类型

	tagList,                //作品类型
	onEndReached,           //上拉加载
	selectProductType,      //选择作品类型
	visible,                //选择作品显隐
	onVisibleChange,

	descOrAscFunc,          //点击切换正序倒序

	clickToProductDetail,   //点击进入作品详情

	productType

}){

	/*按日期整理*/
	function dataByDate( arr ){
		if( !!arr && arr.length > 0 ){
			let obj = [];
			let keys = [];
			arr.forEach( function( item, index ){
				let label = item['date'];
				if( keys.indexOf( label ) == -1 ){
					keys.push( label );
					obj[ label ] = [ item ];
				}else{
					obj[ label ] = [ ...obj[label], item ];
				}
			})
			return obj;
		}else{
			return [];
		}
	}

	let newData = dataByDate( dataSource );

	const ds = new ListView.DataSource({
        rowHasChanged : ( r1, r2 ) => r1 !== r2
    });

	const data = ds.cloneWithRows( newData );

	//课程布局
    function renderRow ( rowData, sectionID, rowID ) {
		let date = moment( rowID ).format( 'M月DD日');
        return (
			<div className = { styles.render_row } key = { 'render_row_' + rowID } >
				<div className = { styles.render_row_img }>
					{ rowData && rowData.map(function( item, index ){
						return (
							<div className = { styles.render_row_img_item } key = { 'render_row_img_item_' + rowID + index } onClick = { () => clickToProductDetail( item ) } >
								<div
									className = { styles.render_row_item_img }
									style = {{ backgroundImage : `url(${ item.imgurl })`}}
								></div>
								<div className = { styles.render_row_item_label }>{ item.title }</div>
							</div>
						)
					})}
				</div>
				<div className = { styles.render_row_time }>{ date || '暂无' }</div>
			</div>
      	);
    }

	/*列表之间的间隙*/
	function renderSeparator( sectionID, rowID ){
		return (
			<div style = {{ width : '100%', height : '20px' }} key = { 'render_separator_' + rowID }></div>
		)
	}

	let overlay = [ <Item key = '-1' value = '-1'>全部</Item> ];
	tagList && tagList.map(function( item,index ){
		overlay.push(
			<Item key = { item.id } value = { item.id } >{ item.name }</Item>
		)
	})
	return(
		<div style = {{ width : '100%', height : '100%' }}>
			<div className = { styles.product_header }>
				<span className = { styles.product_header_name }>{ stuName || '暂无' }</span>
				<span className = { styles.product_header_time } onClick = { descOrAscFunc }>
					时间
					{ sortTime == 'desc' ?
						<span className = { styles.product_header_time_desc }></span>
						:
						<span className = { styles.product_header_time_asc }></span>
					}
				</span>
				<Popover
					overlayClassName = 'popover_product_info'
					onSelect = { selectProductType }
					visible = { visible }
					overlay = {( overlay )}
				>
					<span className = { styles.product_header_type } onClick = { onVisibleChange } >
						<span className = { styles.type_text }>{ productType }</span>
						<Icon className = { styles.type_down } type = 'down' />
					</span>
				</Popover>
			</div>
			{ dataSource.length > 0 ?
				<ListView
					className = 'product_list_view_wrap'
					dataSource = { data }
					renderRow = { renderRow }
					renderSeparator = { renderSeparator }
					renderFooter = { () => <div style={{ padding : 30, textAlign : 'center' }}>{ endLoading ? '已经到底啦~' : '拼了老命加载中...' }</div> }
					pageSize = { 5 }
					scrollRenderAheadDistance = { 500 }
					onEndReached = { onEndReached }
					onEndReachedThreshold = { 50 }
			   />
				:
				<PlaceHolderComponent tips = '暂无作品哦~' height = 'calc( 100% - 88px )' />
			}
		</div>
	)
}

export default ProductInfoComponent;
