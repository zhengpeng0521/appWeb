import React, { PropTypes } from 'react';
import { Tabs, Button, Carousel, Flex, ActivityIndicator,ActionSheet,NoticeBar, } from 'antd-mobile';
import style from './less/KoubeiGoodsList.less';
const TabPane = Tabs.TabPane;

function KoubeiGoodsList({ activityGoodsStatus,
                          goodsListEffective,
                          goodsListPause,
                          goodsListInvalid,
                          goodsListLoading,
                          onStatusChange,
                          onGoodsAdd,
                          loadMore,
                          onGoodsEdit,
                          onGoodsShare,
                          onGoodsEffective,
                          onGoodsPause,
                          onGoodsDelete,
                         }) {
    let goodsHandle = {
        onGoodsEdit,
        onGoodsShare,
        onGoodsEffective,
        onGoodsPause,
        onGoodsDelete,
    };
    return (
        <div className={style.goods_list_cont}>

            <div className={style.goods_list_header}>
                <div className={style.header_btn_cont} style={{width: document.body.clientWidth - 60}}>
                    <Button className={style.header_btn} onClick={onGoodsAdd}>新增</Button>
                </div>

                <div className="goods_list_tabs">
                    <Tabs
                       activeKey={activityGoodsStatus||'effective'}
                       animated={false}
                       onChange={onStatusChange} >
                        <TabPane tab={'已上架 (' + (goodsListEffective.count || 0) + ')'} key="effective" >
                           {goodsListEffective && goodsListEffective.count && goodsListEffective.count > 0 ?
                                <KoubeiGoodsListTabPanel
                                    goodsList={goodsListEffective.list}
                                    goodsListLoading={goodsListLoading}
                                    goodsStatus="effective"
                                    loadMore={loadMore}
                                    allCount={goodsListEffective.count||0}
                                    {...goodsHandle} />
                           :    <KoubeiGoodsListTabPanel_Empty />
                           }
                        </TabPane>

                        <TabPane tab={'未上架 (' + (goodsListPause.count || 0) + ')'} key="pause">
                            {goodsListPause && goodsListPause.count && goodsListPause.count > 0 ?
                                <KoubeiGoodsListTabPanel
                                    goodsList={goodsListPause.list}
                                    goodsListLoading={goodsListLoading}
                                    goodsStatus="pause"
                                    loadMore={loadMore}
                                    allCount={goodsListPause.count||0}
                                    {...goodsHandle} />
                           :    <KoubeiGoodsListTabPanel_Empty />
                           }
                        </TabPane>

                        <TabPane tab={'失效/冻结 (' + (goodsListInvalid.count || 0) + ')'} key="invalid">
                            {goodsListInvalid && goodsListInvalid.count && goodsListInvalid.count > 0 ?
                                <KoubeiGoodsListTabPanel
                                    goodsList={goodsListInvalid.list}
                                    goodsListLoading={goodsListLoading}
                                    goodsStatus="invalid"
                                    loadMore={loadMore}
                                    allCount={goodsListInvalid.count||0}
                                    {...goodsHandle} />
                           :    <KoubeiGoodsListTabPanel_Empty />
                           }
                        </TabPane>
                    </Tabs>
                </div>
            </div>

        </div>
    );
}

function KoubeiGoodsListTabPanel({ goodsList, goodsListLoading, goodsStatus, allCount,
                                  loadMore,
                                 onGoodsEdit,
                                 onGoodsShare,
                                 onGoodsEffective,
                                 onGoodsPause,
                                 onGoodsDelete,}) {
    let listCount = goodsList ? goodsList.length : 0;
    let hasMore = listCount < allCount;

    //单个商品的点击事件
    function onGoodsContClick(goodsData) {

        let shareOpts1 = [
                { iconName: 'edit', title: '编辑' },
                { iconName: 'check-circle-o', title: '上架' },
                { iconName: 'qrcode', title: '分享' },
              ];
        let shareOpts2 = [
                { iconName: 'edit', title: '编辑' },
                { iconName: 'cross-circle-o', title: '下架' },
                { iconName: 'qrcode', title: '分享' },
              ];
        let shareOpts3 = [
                { iconName: 'qrcode', title: '分享' },
              ];
        let share_cont_type = goodsData.status == 'EFFECTIVE' ? 1 :
                              goodsData.status == 'PAUSE' ? 0 : 2;
        let shareOptions = [shareOpts1, shareOpts2, shareOpts3];

        ActionSheet.showShareActionSheetWithOptions({
            options: shareOptions[share_cont_type],
            title: (<div className={style.share_cont_title}>{goodsData.subject}</div>),
        }, (buttonIndex, rowIndex)=> {

            if(share_cont_type == 0) {
                //已上架的商品 功能项
                if(buttonIndex == 0) {
                    //编辑
                    onGoodsEdit(goodsData);
                } else if(buttonIndex == 1) {
                    //上架
                    onGoodsEffective(goodsData);
                } else if(buttonIndex == 2) {
                    //分享
                    onGoodsShare(goodsData);
                }
            } else if(share_cont_type == 1) {
                //未上架的商品 功能项
                if(buttonIndex == 0) {
                    //编辑
                    onGoodsEdit(goodsData);
                } else if(buttonIndex == 1) {
                    //下架
                    onGoodsPause(goodsData);
                } else if(buttonIndex == 2) {
                    //分享
                    onGoodsShare(goodsData);
                }
            } else if(share_cont_type == 2) {
                //失效的商品 功能项
                if(buttonIndex == 0) {
                    //分享
                    onGoodsShare(goodsData);
                }
            }
        });
    }

    //单个商品的渲染
    let loopGoodsDetail = data => {

        let coverUrl = '';
        let cover = data.cover;
        if(cover && cover.length > 0) {
            let coverObj = JSON.parse(cover);
            coverUrl = coverObj ? coverObj.imgurl : 'http://115.29.172.104/gimg/img/e937c0427f01dd660a8b4909b728616f';
        }

      return (<div key={data.id} className={style.goods_detail_item} onClick={()=>onGoodsContClick(data)}>
                <div className={style.goods_detail_img}
                    style={{background: 'url(' + coverUrl + ') no-repeat', backgroundSize: 'cover'}}>
                </div>
                <div className={style.goods_detail_subject}>
                    {data.subject}
                </div>

                <div className={style.goods_detail_price_cont}>
                    <span className={style.goods_detail_price}>￥{data.price}</span>
                    <span className={style.goods_detail_yuanjia}>￥{data.originalPrice}</span>
                </div>

                <div className={style.goods_detail_count}>
                        <span className={style.all_count}>仅售{data.inventory || '0'}份</span>
                        <span className={style.hassale_count}>已售{data.selNum || '0'}份</span>
                    </div>
            </div>);
    };

    //商品渲染的列表
    let goodsListCont = [];
    let lineCont = [];
    goodsList && goodsList.map(function(item, index) {
        if(index % 2 == 0) {
            lineCont = [];
            lineCont.push(loopGoodsDetail(item));
        } else {
            lineCont.push(loopGoodsDetail(item));
            goodsListCont.push(
            <div key={goodsStatus + '_goods_detail_line_' + goodsListCont.length} className={style.goods_detail_line}>
                {lineCont}
            </div>
            );
        }
    });
    if(goodsList && goodsList.length % 2 == 1) {
        goodsListCont.push(
            <div key={goodsStatus + '_goods_detail_line_' + goodsListCont.length} className={style.goods_detail_line}>
                {lineCont}
            </div>
        );
    }

    return (
        <div
          className={style.goods_list_tab_panel}
          style={{
              height: document.body.clientHeight - 360,
          }}>
           {goodsListLoading ?
            <ActivityIndicator toast />
            :
            <div>
                {goodsListCont}
                {!!hasMore && <div className={style.load_more} onClick={loadMore}>加载更多</div>}
            </div>
            }
        </div>
    );
}

function KoubeiGoodsListTabPanel_Empty() {
    return (
        <div className={style.goods_list_empty}>
            这里没有数据
        </div>
    );
}

export default KoubeiGoodsList;
