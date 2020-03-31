import React, { PropTypes } from 'react';
import { Button,ListView,ActivityIndicator,SearchBar,Icon, } from 'antd-mobile';
import ListViewEmpty from '../../common/list-view-empty/ListViewEmpty';
import style from './less/PostTopicDetailComponent.less';

function PostTopicDetailComponent({
    topicDetail,listLoading,hasMore,pageIndex,pageSize,topicList,itemTopicCount,
    queryItemTopicList,openCommunityDetail,
}) {

    //渲染列表项头部
    function renderHeader() {
        return (
            <div>
                <div className={style.topic_detail_cont}>
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
                            {topicDetail.mainTitle || '无标题'}
                        </div>
                    </div>
                    <div className={style.topic_intro}>
                        {topicDetail.intro || '专题简介'}
                    </div>
                    <div className={style.data_count}>
                        <span className={style.like_count}>{topicDetail.praises || 0}</span>
                        <span className={style.collection_count}>{topicDetail.collect || 0}</span>
                    </div>
                </div>
                <div className={style.list_header}>
                    精选帖子 ( {itemTopicCount || 0} )
                </div>
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
            queryItemTopicList({
                pageSize: pageSize + 5,
            });
        }
    }

    //渲染列表项内容
    function renderRow(rowData, sectionID, rowID) {

        let row_data_item = rowData[rowID];
        let contentStr = row_data_item.content;
        let coverUrl = '';
        if(contentStr && contentStr.length > 0) {
            let contentObj = JSON.parse(contentStr);
            if(contentObj && contentObj.length > 0) {
                contentObj.map(function(item) {
                    if(coverUrl == '' && item.img && item.img != '') {
                        coverUrl = item.img;
                    }
                });
            }
        }
        if(coverUrl == '') {
            coverUrl = 'http://115.29.172.104/gimg/img/bdf934794ead4e77ed35e78de0a61b53';
        }
        return (
            <div className={style.item_topic_layout}>
                <div className={style.item_topic_item_cont} onClick={()=>openCommunityDetail(row_data_item.id)}>
                    <div
                        className={style.item_topic_cover}
                        style={{
                            background: `url(${coverUrl}) 0% 0% / cover no-repeat`
                        }}
                        >
                        <div className={style.topic_goods_count}>{row_data_item.goodCnt}</div>
                    </div>
                    <div className={style.item_topic_title}>
                        {row_data_item.title}
                    </div>
                    <div className={style.item_topic_author}>
                       <span className={style.item_author_by}>by</span>
                       <span className={style.item_author_name}>{row_data_item.authorName}</span>
                    </div>
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

    let coverUrl = topicDetail.cover || 'http://115.29.172.104/gimg/img/980aa589a1ec5bfb0dafe5a5e320a50c';
    let smallImgUrl = topicDetail.smallImg || 'http://115.29.172.104/gimg/img/bdf934794ead4e77ed35e78de0a61b53';
    return (
        <div className="topic_detail_cont">
            {!!listLoading && <ActivityIndicator toast /> }

            <ListView
                dataSource={postTopicDataSource.cloneWithRows(topicList)}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
                renderRow={renderRow}
                onEndReached={onEndReached}
                style={{
                  height: document.body.clientHeight,
                  overflow: 'auto',
                  margin: '0px 0 10px 0',
                }}
                pageSize={5}
                scrollRenderAheadDistance={100}
                scrollEventThrottle={20}
                onEndReachedThreshold={20}
            />
        </div>
    );
}

export default PostTopicDetailComponent;
