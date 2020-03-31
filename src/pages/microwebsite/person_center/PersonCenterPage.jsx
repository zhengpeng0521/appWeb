import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PersonCenterComponent from '../../../components/microwebsite/person_center/PersonCenterComponent.jsx';

function PersonCenterPage({ dispatch, personCenterModel }) {

	let {
		tenantId,
		orgId,
		noPay,
		personCenterInfo,
		cardStus,
		outStus,
		dataSource,             //宝宝列表

		selectedStuId,          //选中的宝宝
		selectedStuItem,        //选中的宝宝信息

        menuConfList,           //可配置的模块信息
        flag,

	} = personCenterModel;

	/*点击选中宝宝*/
	function selectedStuFunc( item ){
		dispatch({
			type : 'personCenterModel/updateState',
			payload : {
				selectedStuId   : item.id,
				selectedStuItem : item
			}
		})
	}

	/*新增宝宝*/
	function addBabyInfoFunc(){
		dispatch(
			routerRedux.push({
				pathname : '/microModifyBabyInfo',
				query:  {
					type 		 : '0',
					orgId 		 : personCenterInfo.orgId || orgId,
					parentId 	 : personCenterInfo.id,
					tenantId 	 : personCenterInfo.tenantId || tenantId,
					babyId 		 : undefined,
					routerSource : 'microBabyList',
				},
				state : {
					hasCRM		 : personCenterInfo.hasCRM,
					hasCrmParent : personCenterInfo.hasCrmParent,
				}
			})
		)
	}

	/*编辑宝宝信息*/
	function editBabyInfoFunc( item ){
		dispatch(
			routerRedux.push({
				pathname : '/microModifyBabyInfo',
				query:  {
					type 		 : '1',
					orgId 		 : personCenterInfo.orgId || orgId,
					parentId 	 : personCenterInfo.id,
					tenantId 	 : personCenterInfo.tenantId || tenantId,
					babyId 		 : item.id,
					routerSource : 'microBabyList',
				},
				state : {
					hasCRM		 : personCenterInfo.hasCRM,
					hasCrmParent : personCenterInfo.hasCrmParent,
				}
			})
		)
	}

	//点击跳转到预约历史
	function clickToHistoryFunc() {
		let imageArr = personCenterInfo.orgCover && personCenterInfo.orgCover.split(',');
		dispatch(
			routerRedux.push({
				pathname : '/microMaaHistory',
				query:  {
					orgId 		: !!personCenterInfo && personCenterInfo.orgId,
					tenantId 	: !!personCenterInfo && personCenterInfo.tenantId,
				},
				state : {
					cover 		: imageArr && imageArr.length > 0 ? `${ imageArr[0] }!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300',
					orgName		: personCenterInfo.orgName || '',
				}
			})
		)
	}

	//点击跳转到我的活动
	function clickToActivityFunc() {
		let imageArr = personCenterInfo.orgCover && personCenterInfo.orgCover.split(',');
		dispatch(
			routerRedux.push({
				pathname : '/microPersonMyactivity',
				query:  {
					orgId 		: !!personCenterInfo && personCenterInfo.orgId,
					tenantId 	: !!personCenterInfo && personCenterInfo.tenantId,
					parentId 	: !!personCenterInfo && personCenterInfo.id,
				},
				state : {
					cover 		: imageArr && imageArr.length > 0 ? `${imageArr[0]}!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300',
					orgName		: personCenterInfo.orgName || '',
					noPay		: noPay,
				}
			})
		)
	}

	//点击返回首页
	function clickToHomeFunc() {
		dispatch( routerRedux.push({
			pathname : '/microWebsite',
				query:  {
					orgId 		: !!personCenterInfo && personCenterInfo.orgId || orgId,
					tenantId 	: !!personCenterInfo && personCenterInfo.tenantId || tenantId,
				},
			})
		)
	}

	function clickToDetail( router ){
		dispatch( routerRedux.push({
			pathname : router,
				query:  {
					orgId 		: !!personCenterInfo && personCenterInfo.orgId || orgId,
					tenantId 	: !!personCenterInfo && personCenterInfo.tenantId || tenantId,
					stuId       : selectedStuId,
					stuName     : !!selectedStuItem && selectedStuItem.name,
					parentId 	: !!personCenterInfo && personCenterInfo.id,
				},
			})
		)
	}






    //点击进入相应页面
    function clickToSomePage(item){
		console.log(item)
        if(item.key=='courseTable'){
            clickToDetail( '/schedule_info' )
        }else if(item.key=='product'){
            clickToDetail( '/product_info' )
        }else if(item.key=='courseTime'){
            clickToDetail( '/class_record' )
        }else if(item.key=='card'){
            clickToDetail('vip_card_info')
        }else if(item.key=='sign'){
            dispatch(routerRedux.push({
                pathname : '/microSignSelf',
                query: {
                    tenantId : !!personCenterInfo && personCenterInfo.tenantId || tenantId,
                    orgId    : !!personCenterInfo && personCenterInfo.orgId || orgId,
                    mobile   : !!personCenterInfo && personCenterInfo.mobile,
                    parentId : !!personCenterInfo && personCenterInfo.id,
                    stuName  : !!selectedStuItem && selectedStuItem.name,
                    url      : !!selectedStuItem && selectedStuItem.headimgurl,
                    stuId    : selectedStuId
                }
            }));
        }else if(item.key=='leave'){
             clickToDetail('ask_for_leave');
        }else if(item.key=='stuInfo'){
             dispatch(
                routerRedux.push({
                    pathname : '/microModifyBabyInfo',
                    query:  {
                        type 		 : '1',
                        orgId 		 : personCenterInfo.orgId || orgId,
                        parentId 	 : personCenterInfo.id,
                        tenantId 	 : personCenterInfo.tenantId || tenantId,
                        babyId 		 : selectedStuId,
                        routerSource : 'microBabyList',
                        isModify     : true
                    },
                    state : {
                        hasCRM		 : personCenterInfo.hasCRM,
                        hasCrmParent : personCenterInfo.hasCrmParent,
                    }
                })
            )
        }else if(item.key=='purchase'){
            clickToDetail('contract_info')
        }else if(item.key=='comment'){
            clickToDetail('parents_notice')
        }else if(item.key=='bookCls'){
            clickToDetail('order_class')
        }else if(item.key=='integralRecord'){
					clickToDetail('/integral_record')
				}
    }

	let props = {
		personCenterInfo,       //个人中心信息
		cardStus,               //会员宝宝列表
		outStus,				//非会员宝宝列表
		dataSource,             //宝宝列表

		selectedStuId,          //选中的宝宝id
		selectedStuItem,        //选中的宝宝信息

		/*方法*/
		selectedStuFunc,        //点击选中宝宝
		addBabyInfoFunc,        //新增宝宝
		editBabyInfoFunc,       //编辑宝宝信息

		clickToHistoryFunc,     //点击跳到预约历史
		clickToActivityFunc,    //点击跳到我的活动
		clickToHomeFunc,        //点击返回首页

        menuConfList,           //可配置的模块信息
        clickToSomePage,        //模块点击跳转页面
        flag,
	}

    return (
		<PersonCenterComponent { ...props } />
    );
}


function mapStateToProps({ personCenterModel }) {
  return { personCenterModel };
}

export default connect(mapStateToProps)(PersonCenterPage);
