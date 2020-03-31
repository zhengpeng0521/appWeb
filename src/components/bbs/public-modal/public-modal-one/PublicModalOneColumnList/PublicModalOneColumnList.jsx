import React, {PropTypes} from 'react';
import style from './PublicModalOneColumnList.less';
import { ListView,ActivityIndicator,Button,WingBlank } from 'antd-mobile';

let Times = 0;
function PublicModalOneColumnList({
	pageSize,pageIndex,columnListModalOne,dataLoading,ColumnShowToastModalOne,
    readMoreColumnList,randomColor,CheckColumnListItem,Over,AllItems,
}) {
    let columnListDataSource = new ListView.DataSource({
        getRowData: (dataBlob, sectionID) => {
            //console.info('!!!getRowData',dataBlob,sectionID);
            return dataBlob[sectionID];
        },
        getSectionHeaderData: (dataBlob, sectionID, rowID) => {
            //console.info('getSectionHeaderData');
            return dataBlob[rowID];
        },
        rowHasChanged: (row1, row2) => {
            //console.info('rowHasChanged');
            return row1 !== row2;
        },
        sectionHeaderHasChanged: (s1, s2) => {
            //console.info('sectionHeaderHasChanged');
            return s1 !== s2;
        },
    });

    function renderHeader() {
        return (
            <div className={style.listView_head}>
                全部栏目
            </div>);
    }
    function renderFooter() {
        if(true==Over){
            return (
                <div className={style.listView_foot}>
                    没有更多了喵๑乛◡乛๑
                </div>
            );
        }else if(false==Over){
            return (
                <div className={style.listView_foot}>
                    上拉继续刷新喵๑乛◡乛๑
                </div>
            );
        }

    }

    let index = 0;
    function renderRow(rowData, sectionID, rowID) {
        //console.log('rowData:'+rowData[0]+', sectionID:'+sectionID+', rowID'+rowID);
        const obj  = columnListModalOne[rowID];
        let rgbInner = obj.colorNum+'';  //将颜色数组转化为字符串易于拼接
        if(index>columnListModalOne.length){
            index = 0;
        }
        let Serial = parseInt(rowID)+1;
        let ColumnListItemBorder;
        let ColumnListItemColor;
        let ColumnListImgColor;
        let ColumnListNoColor;
        let ColumnTitleColor;
        if(obj.colorNum&&obj.colorNum.length>0){
            /*ColumnListItemBorder = '2px solid rgb('+rgbInner+')';
            ColumnListItemColor = '2px 2px 2px rgb('+rgbInner+')';
            ColumnListImgColor = '2.5px 2.5px 2.5px rgb('+rgbInner+')';
            ColumnListNoColor = 'inset 0 0 30px rgb('+rgbInner+')';
            ColumnTitleColor = 'rgb('+rgbInner+')'; */
            ColumnListItemBorder = '1px solid #fafafa';
            ColumnListItemColor = '1px 1px 1px #fafafa';
            ColumnListImgColor = '1.5px 1.5px 1.5px #fafafa';
            ColumnListNoColor = 'inset 0 0 30px #fafafa';
            ColumnTitleColor = '#666666';
        }
        /*逆向*/
        /*if (index < 0) {
            index = data.length - 1;
        }
        const obj = data[index--];*/
        const Number = (
            <div>
                <div className={style.ColumnListNo} style={{boxShadow:ColumnListNoColor}} >
                    <div className={style.ColumnListInnerNo}>{Serial}</div>
                </div>
            </div>
        );
        return (
            <div key={rowID} className={style.ColumnListItem}  style={{marginTop:rowID=='0'?'1.7vh':0,boxShadow:ColumnListItemColor,border:ColumnListItemBorder}} onClick={() => CheckColumnList(obj.id,obj.colorNum,obj.title)}>
                {[]||Number}
                <div className={style.ColumnTitle}>{obj.title?((obj.title+'').length < 14?obj.title:(obj.title+'').substring(0,12)+'...'):''}</div>
                <img className={style.ColumnListImg} style={{boxShadow:ColumnListImgColor}} src={obj.pictureUrl} alt={obj.pictureUrl}/>
            </div>
        );
    }
    function renderSeparator(sectionID, rowID) {
        return (
            <div key={'list_separator_' + sectionID + '_' + rowID} className={style.list_separator}>
            </div>
        );
    }

    function onEndReached(){
        Times += 1;
        //console.log('Times',Times);
        let startTime = 4;
        let endTime = 3+parseInt(AllItems/10);
        if(Times>=4&&Times<=endTime&&Times&&columnListModalOne.length<AllItems){
            readMoreColumnList(Times);
        }
    }


    function CheckColumnList(id,colorArray,title){
       setTimeout(CheckColumnListItem,300,id,colorArray,title);
    }
    return (
        <div className={style.allListView}>
            <ListView
                dataSource={columnListDataSource.cloneWithRows(columnListModalOne)}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
                renderRow={renderRow}
                renderSeparator={renderSeparator}
                pageSize={5}
                onEndReached={onEndReached}
                style={{
                    overflow: 'hidden',
                    backgroundColor: '#fafafa',
                    height: document.body.clientHeight,
                    overflow: 'auto',
                    border: '1px solid #ddd',
                    margin: '0.1rem 0',
                }}
                onEndReachedThreshold={5}
            />
            <WingBlank>
                <div className="toast-example">
                  <ActivityIndicator
                    toast
                    text="正在加载"
                    animating={ColumnShowToastModalOne}
                  />
                </div>
            </WingBlank>
        </div>
    );
}

PublicModalOneColumnList.propTypes = {
    pageSize : PropTypes.any,
    pageIndex : PropTypes.any,
    topicListModalOne : PropTypes.any,
    dataLoading : PropTypes.any,
    randomColor : PropTypes.any,
    readMoreColumnList : PropTypes.func,
    CheckColumnListItem : PropTypes.func,
    ColumnShowToastModalOne : PropTypes.any,
};

export default PublicModalOneColumnList;
