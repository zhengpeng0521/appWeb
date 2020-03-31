import React, { PropTypes } from 'react';
import { TabBar } from 'antd-mobile';
import style from './less/KoubeiGoodsManageComponent.less';

import KoubeiGoodsList       from './KoubeiGoodsList';
import KoubeiGoodsOrderList  from './KoubeiGoodsOrderList';
import KoubeiGoodsSettleList from './KoubeiGoodsSettleList';

/**
 * 口碑商品管理界面
 */
function KoubeiGoodsManageComponent({ goodsType,
                                    activityGoodsStatus,
                                    goodsListEffective,
                                    goodsListPause,
                                    goodsListInvalid,
                                    goodsListLoading,
                                    onGoodsTypeChange, onStatusChange,
                                    onGoodsAdd,
                                    loadMore,
                                    pageIndex, pageSize,
                                    onGoodsEdit,
                                    onGoodsShare,
                                    onGoodsEffective,
                                    onGoodsPause,
                                    onGoodsDelete,
                                    koubeiOrgList,
                                     koubeiGoodsOrderList,
                                     readMoreOrderList,
                                     has_more_order,
                                     fieltOrgId, fieltOrgName,fieltOrderByOrg,
                                     koubeiGoodsSettleList,
                                     settle_pageIndex,
                                     settle_pageSize,
                                     has_more_settle,
                                    readMoreSettleList,fieltSettleByOrg,
                                     settleStateChange,settleStatus,
                                }) {

    let koubeiGoodsListProps = {activityGoodsStatus,
                                goodsListEffective,
                                goodsListPause,
                                goodsListLoading,
                                goodsListInvalid,  onStatusChange,
                                onGoodsAdd,
                                loadMore,
                                pageIndex, pageSize,
                                onGoodsEdit,
                                onGoodsShare,
                                onGoodsEffective,
                                onGoodsPause,
                                onGoodsDelete,
                            };
    let koubeiGoodsOrderListProps = {
        goodsListLoading,
        koubeiOrgList,
        koubeiGoodsOrderList,
        readMoreOrderList,
        has_more_order,
        fieltOrgId,fieltOrgName,fieltOrderByOrg,
    };
    let koubeiGoodsSettleListProps = {
        goodsListLoading,
        koubeiOrgList,
        koubeiGoodsSettleList,
        has_more_settle,
        readMoreSettleList,
        fieltOrgId,fieltOrgName,
        fieltSettleByOrg,
        settleStateChange,settleStatus,
    };

    return (
       <TabBar
            unselectedTintColor="#949494"
            tintColor="#EF5522"
            barTintColor="white"
          >
            <TabBar.Item
              title="课程售卖"
              key="koubei_course"
              selected={goodsType == 'koubei_course'}
              icon={require('./images/koubei_course_un.png')}
              selectedIcon={require('./images/koubei_course.png')}
              onPress={()=> onGoodsTypeChange('koubei_course')}
            >
              <KoubeiGoodsList { ...koubeiGoodsListProps } goodsType='1' />
            </TabBar.Item>

            <TabBar.Item
              title="活动售卖"
              key="koubei_activity"
              selected={goodsType == 'koubei_activity'}
              icon={require('./images/koubei_activity_un.png')}
              selectedIcon={require('./images/koubei_activity.png')}
              onPress={()=> onGoodsTypeChange('koubei_activity')}
            >
              <KoubeiGoodsList {...koubeiGoodsListProps} goodsType='2' />
            </TabBar.Item>

             <TabBar.Item
              title="订单管理"
              key="koubei_order"
              selected={goodsType == 'koubei_order'}
              icon={require('./images/koubei_order_un.png')}
              selectedIcon={require('./images/koubei_order.png')}
              onPress={()=> onGoodsTypeChange('koubei_order')}
            >
              <KoubeiGoodsOrderList {...koubeiGoodsOrderListProps} />
            </TabBar.Item>

            <TabBar.Item
              title="核销管理"
              key="koubei_settle"
              selected={goodsType == 'koubei_settle'}
              icon={require('./images/koubei_settle_un.png')}
              selectedIcon={require('./images/koubei_settle.png')}
              onPress={()=> onGoodsTypeChange('koubei_settle')}
            >
              <KoubeiGoodsSettleList {...koubeiGoodsSettleListProps} />
            </TabBar.Item>

      </TabBar>
    );
};

KoubeiGoodsManageComponent.propTypes = {

};

export default KoubeiGoodsManageComponent;
