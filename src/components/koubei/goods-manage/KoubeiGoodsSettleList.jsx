import React, { PropTypes } from 'react';
import { ListView, ActivityIndicator,Popup,Tabs, } from 'antd-mobile';
import KoubeiGoodsOrgSelectComponent from './KoubeiGoodsOrgSelectComponent';
import style from './less/KoubeiGoodsSettle.less';
const TabPane = Tabs.TabPane;

function KoubeiGoodsSettleList({
    goodsListLoading,
    koubeiOrgList,
    koubeiGoodsSettleList,
    readMoreSettleList,
    has_more_settle,
    fieltOrgId,fieltOrgName,
    fieltSettleByOrg,
    settleStateChange,settleStatus,
}) {

    //关闭pop弹出框
    function closePop() {
        Popup.hide();
    }

    //门店选择变更
    function changeGoodsOrg(selectedOrg, selectedOrgNames) {
        closePop();
        let fieltOrgId = '';
        let fieltOrgName = '全部门店';
        if(selectedOrg && selectedOrg.length > 0) {
            fieltOrgId = selectedOrg[0];
            fieltOrgName = selectedOrgNames[0];
        }
        fieltSettleByOrg(fieltOrgId, fieltOrgName);
    }

    //选择全部门店时
    function selectAllOrg() {
        closePop();
        fieltSettleByOrg('', '全部门店');
    }

    //弹出适用门店选择框
    function popGoodsOrg() {
        let goodsOrgProps = {
            koubeiOrgList,selectedOrg: [fieltOrgId],selectedOrgNames: [fieltOrgName],
            changeGoodsOrg,closePop,selectAllOrg,
        }

        Popup.show(
            <KoubeiGoodsOrgSelectComponent {...goodsOrgProps} maxSelectCount={1}/>,
        { animationType: 'slide-down', maskClosable: true }
        );
    }

    let settleListViewProp = {
        goodsListLoading,
        koubeiGoodsSettleList,
        readMoreSettleList,
        has_more_settle,
    };

    return (
        <div className="goods_list_tabs">
           <div className={style.org_select_key} onClick={popGoodsOrg}>
                {fieltOrgName||'全部门店'}
            </div>
            <Tabs
               activeKey={settleStatus || 'SETTLE'}
               animated={false}
               onChange={settleStateChange} >
                   <TabPane tab={'已核销'} key="SETTLE" >
                        <KoubeiSettleListView {...settleListViewProp} />
                    </TabPane>
                    <TabPane tab={'待核销'} key="PAY" >
                        <KoubeiSettleListView {...settleListViewProp} />
                    </TabPane>
                    <TabPane tab={'已退款'} key="REFUND" >
                        <KoubeiSettleListView {...settleListViewProp} />
                    </TabPane>
            </Tabs>
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

function KoubeiSettleListView({
    goodsListLoading,
    koubeiGoodsSettleList,
    readMoreSettleList,
    has_more_settle,
}) {

    function renderFooter() {
        return (
            <div>
                {koubeiGoodsSettleList && koubeiGoodsSettleList.length > 0 ?
                    <div className={style.list_foot}></div>
                :
                    <KoubeiGoodsListTabPanel_Empty />
                }
            </div>
        );
    }

    function onEndReached() {
        if(!goodsListLoading && has_more_settle) {
            readMoreSettleList();
        }
    }

    function renderRow(rowData, sectionID, rowID) {

        let row_data_item = rowData[rowID];

        let shopStr = row_data_item.shop;
        let shopName = '未知的门店';
        if(shopStr && shopStr.length > 0) {
            let shopObj = JSON.parse(shopStr);
            shopName = shopObj && shopObj.shop_name;
        }

        let settle_status = row_data_item.status == 'UNPAY' ? '待支付' :
                            row_data_item.status == 'PAY' ? '待核销' :
                            row_data_item.status == 'SETTLE' ? '已核销' :
                            row_data_item.status == 'REFUND' ? '已退款' : '无效的状态';

        let cover = row_data_item.cover;
        let goodsDetailImgUrl = 'http://115.29.172.104/gimg/img/e937c0427f01dd660a8b4909b728616f';
        if(cover && cover.length > 0) {
            let coverObj = JSON.parse(cover);
            goodsDetailImgUrl = coverObj && coverObj.imgurl;
        }

        return (
            <div key={'list_separator_' + sectionID + '_' + rowID} className={style.koubei_settle_list_row_cont}>
                <div className={style.row_item_top}>
                    <span className={style.row_item_outBizNo}>{row_data_item.outBizNo}</span>
                    <span className={style.row_item_status}>{settle_status}</span>
                </div>

                <div className={style.row_item_desc} key={'row_item_desc_' + row_data_item.outBizNo}>
                    <div className={style.row_item_desc_img}
                        style={{background: `url(${goodsDetailImgUrl}) 0% 0% / cover no-repeat`}}></div>
                    <div className={style.row_item_desc_cont}>
                        <div className={style.desc_cont_top}>
                            <div className={style.desc_title}>
                                {row_data_item.subject}
                            </div>
                            <div className={style.desc_price}>
                                ￥{row_data_item.price || 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.row_item_org_info}>
                    <div className={style.buy_org}>
                        购买门店: {row_data_item.buyOrgName}
                    </div>
                    <div className={style.buy_org}>
                        核销门店: {row_data_item.settleOrgName}
                    </div>
                </div>

                <div className={style.row_item_all}>
                    <div className={style.row_item_time}>{row_data_item.createTime}</div>
                    <div className={style.row_item_all_price}>
                        订单总价:
                        <span className={style.row_item_all_price_num}>￥{row_data_item.realAmount || 0}</span>
                    </div>
                </div>
            </div>
        );
    }

    function renderSeparator(sectionID, rowID) {
        return (
            <div key={'list_separator_' + sectionID + '_' + rowID} className={style.list_separator}></div>
        );
    }

    let koubeiSettleDataSource = new ListView.DataSource({
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
        <div className="koubei_goods_settle_list_cont">
           {!!goodsListLoading && <ActivityIndicator toast /> }
            <ListView
                dataSource={koubeiSettleDataSource.cloneWithRows(koubeiGoodsSettleList)}
                renderFooter={renderFooter}
                renderRow={renderRow}
                renderSeparator={renderSeparator}
                pageSize={10}
                onEndReached={onEndReached}
                style={{
                  height: document.body.clientHeight - 150,
                  overflow: 'auto',
                  border: '1px solid #ddd',
                  margin: '0.1rem 0',
                }}
                onEndReachedThreshold={5}
            />
        </div>
    );
}

export default KoubeiGoodsSettleList;
