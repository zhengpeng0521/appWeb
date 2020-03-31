import React, { PropTypes } from 'react';
import { Button,ListView,ActivityIndicator,SearchBar,Icon,Carousel,Flex, } from 'antd-mobile';
import ListViewEmpty from '../../common/list-view-empty/ListViewEmpty';
import style from './less/TalentComponent.less';

function TalentComponent({
    listLoading,hasMore,pageIndex,pageSize,talentList,bannerList,
    queryTalentList,openTopicList,
}) {

    //渲染列表项头部
    function renderHeader() {

        let carouselProps = {
            dots: true,
            autoplay: true,
            infinite: true,
        };
        let bannerImgArr = [];
        if(bannerList && bannerList.length > 0) {
            bannerList.map(function(item) {
                bannerImgArr.push(item.imgurl);
            });
        } else {
            bannerImgArr.push('http://115.29.172.104/gimg/img/00e561f865f5dd50b1b073da1b48c600');
        }
        return (
            <div className={style.talent_header_img} >
                <div className={style.banner_cont}
                   style={{
                      width: document.body.clientWidth,
                    }}>
                    <Carousel {...carouselProps}>
                        {bannerImgArr && bannerImgArr.length > 0 && bannerImgArr.map(function(item, index) {
                            return (<Flex justify="center" key={`carousel_key_${index}`}
                                          className={style.banner_item_cont}>
                                           <img src={item} width="100%" height="100%" />
                                      </Flex>);
                            })
                        }
                    </Carousel>
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
                {talentList && talentList.length > 0 ?
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
            queryTalentList({
                pageSize: pageSize + 5,
            });
        }
    }

    //渲染列表项内容
    function renderRow(rowData, sectionID, rowID) {

        let row_data_item = rowData[rowID];

        let headimgurl = row_data_item.headimgurl || 'http://115.29.172.104/gimg/img/bdf934794ead4e77ed35e78de0a61b53';
        return (
            <div className={style.item_talent_layout}>
                <div className={style.item_talent_cont} >
                    <div className={style.talent_title_img_layout}>
                        <div className={style.talent_title_img}>
                            <div
                                className={style.item_topic_cover}
                                style={{
                                    background: `url(${headimgurl}) 0% 0% / cover no-repeat`
                                }}
                                ></div>
                            <div className={style.item_nickname_count}>
                                <div className={style.item_nickname}>
                                    {row_data_item.nickname||'达人昵称'}
                                </div>
                                <div className={style.item_topic_count}>
                                    {row_data_item.topicCnt||0}帖子
                                </div>
                                <div className={style.item_topic_count}>
                                    {row_data_item.relatedCardTopicNum||0}专题
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.item_talent_intro}>
                        {row_data_item.intro}
                    </div>
                    <div className={style.item_talent_handle}>
                        <span className={style.item_talent_handle_topic} onClick={()=>openTopicList(row_data_item.id)}>查看专题</span>
                    </div>
                </div>
            </div>
        );
    }

    let talentDataSource = new ListView.DataSource({
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
        <div className="talent_list_cont">
            {!!listLoading && <ActivityIndicator toast /> }

            <ListView
                dataSource={talentDataSource.cloneWithRows(talentList)}
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

export default TalentComponent;
