import React, { PropTypes } from 'react';
import { Button,ListView,ActivityIndicator,SearchBar,Icon, } from 'antd-mobile';
import ListViewEmpty from '../../common/list-view-empty/ListViewEmpty';
import style from './less/PostTopicComponent.less';

function PostTopicComponent({
    listLoading,
    keyWord,
    topicList,
    hasMore,
    pageIndex,
    pageSize,
    changeKeyWord,
    queryPostTopicList,
    openTopicDetail,
}) {

    //渲染列表项头部
    function renderHeader() {
        return (
            <div className={style.list_header}>
                <SearchBar
                    value={keyWord}
                    placeholder='搜索你要寻找的专题'
                    onChange={changeKeyWord}
                    onSubmit={queryPostTopicList}
                    onBlur={queryPostTopicList}
                 />
            </div>
        );
    }

    //渲染列表项间隔
    function renderSeparator(sectionID, rowID) {
        return (
            <div key={'list_separator_' + sectionID + '_' + rowID} className={style.list_separator}></div>
        );
    }

    //渲染列表项结尾
    function renderFooter() {
        return (
            <div>
                {topicList && topicList.length > 0 ?
                    hasMore ? <div className={style.list_foot}><Icon type="loading" />正在加载</div> :
                    <div className={style.list_foot}>已无更多</div>
                :
                    <ListViewEmpty />
                }
            </div>
        );
    }

    //页面到达底部时 加载更多
    function onEndReached() {
        if(!listLoading && hasMore) {
            queryPostTopicList({
                pageSize: pageSize + 5,
            });
        }
    }

    //渲染列表项内容
    function renderRow(rowData, sectionID, rowID) {

        let row_data_item = rowData[rowID];

        let coverUrl = row_data_item.cover || 'http://115.29.172.104/gimg/img/980aa589a1ec5bfb0dafe5a5e320a50c';
        let smallImgUrl = row_data_item.smallImg || 'http://115.29.172.104/gimg/img/bdf934794ead4e77ed35e78de0a61b53';
        return (
            <div className={style.topic_item_cont} onClick={()=>openTopicDetail(row_data_item)}>
                <div
                    className={style.topic_cover}
                    style={{
                        background: `url(${coverUrl}) 0% 0% / cover no-repeat`
                    }}
                    ></div>
                <div className={style.topic_title_img}>
                    <div
                        className={style.topic_small_img}
                        style={{
                            background: `url(${smallImgUrl}) 0% 0% / cover no-repeat`
                        }}
                        ></div>
                    <div className={style.topic_title}>
                        {row_data_item.mainTitle}
                    </div>
                </div>
                <div className={style.topic_intro}>
                    {row_data_item.intro}
                </div>
            </div>
        );
    }

    let postTopicDataSource = new ListView.DataSource({
      getRowData: (dataBlob, sectionID) => {
          return dataBlob[sectionID];
      },
      getSectionHeaderData: (dataBlob, sectionID, rowID) => {
          return dataBlob[rowID];
      },
      rowHasChanged: (row1, row2) => {
          return row1 !== row2;
      },
      sectionHeaderHasChanged: (s1, s2) => {
          return s1 !== s2;
      },
    });

    return (
        <div className="post_topic_list_cont">
            {!!listLoading && <ActivityIndicator toast /> }

            <ListView
                dataSource={postTopicDataSource.cloneWithRows(topicList)}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
                renderRow={renderRow}
                renderSeparator={renderSeparator}
                onEndReached={onEndReached}
                style={{
                  height: document.body.clientHeight,
                  overflow: 'auto',
                  border: '1px solid #ddd',
                  margin: '0.1rem 0',
                }}
                pageSize={5}
                scrollRenderAheadDistance={100}
                scrollEventThrottle={20}
                onEndReachedThreshold={20}
            />
        </div>
    );
}

export default PostTopicComponent;
