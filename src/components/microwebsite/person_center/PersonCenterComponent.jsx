import React from 'react';
import styles from './PersonCenterComponent.less';
import { WhiteSpace, WingBlank, Icon, Button } from 'antd-mobile';

function PersonCenterComponent({
	personCenterInfo,       //个人中心信息
	cardStus,               //会员宝宝列表
	outStus,
	dataSource,             //宝宝列表

	selectedStuId,          //选中的宝宝id
	selectedStuItem,        //选中的宝宝信息

	selectedStuFunc,        //点击选中宝宝
	addBabyInfoFunc,        //新增宝宝
	editBabyInfoFunc,       //编辑宝宝信息
	clickToHistoryFunc,     //点击跳到预约历史
	clickToActivityFunc,    //点击跳到我的活动
	clickToHomeFunc,        //点击返回首页

    menuConfList,           //可配置的模块信息
    clickToSomePage,        //统一的点击事件

    flag,

}){

	return(
		<div className = { styles.person_center_wrap } >
			<div className = { styles.person_center_bg }></div>
			<div className = { styles.home_btn } onClick = { clickToHomeFunc }></div>
			<div className = { styles.person_center_box }>
				<div className = { styles.person_head_img_bg }></div>
				<div className = { styles.person_head_img } style = {{ backgroundImage : `url('http://img.ishanshan.com/gimg/img/0c1f8e514dcc558490578e608c42117a')` }}></div>
				<p className = { styles.person_name }>{ personCenterInfo.wxName || '暂无' }</p>
				<p className = { styles.person_info }>
					<span style = {{ marginRight : '10px', display : 'inline-block' }}>{ personCenterInfo.mobile || '暂无' }</span>
					<span style = {{ display : 'inline-block' }}>{ personCenterInfo.orgName || '暂无' }</span>
				</p>
				<div className = { styles.stu_img_list }>
					<div className = { styles.stu_img_list_box }>
						{
							!!dataSource && dataSource.length > 0 && dataSource.map(function(item, index){
								let isSelected = item.id == selectedStuId;            //是否选中当前宝宝
								let headimgurl = item.sex == '1' ?
												'http://img.ishanshan.com/gimg/img/d75fdb312bbaca043a97d24c5453a337'
												: 'http://img.ishanshan.com/gimg/img/ad8cc625441146bdf8e373dec1cd600f';
								return (
									<div className = { styles.stu_img_list_item } onClick = { () => selectedStuFunc( item ) } key = { 'stu_img_list_item_' + index }>
										<div
											className = { styles.stu_img_list_item_img }
											style = {{ backgroundImage : `url(${ item.headimgurl || headimgurl })`,
														border : isSelected ? '4px solid #5d9cec' : 'none'  }}
										>
											{ item.sex == '1' ? <div className = { styles.stu_sex_male }></div> : <div className = { styles.stu_sex_female }></div> }
										</div>
										<p className = { styles.stu_name } style = {{ color : isSelected ? '#5d9cec' : '' }} >{ item.name || '暂无' }</p>
										{ !!item.vip && <div className = { styles.stu_vip }></div> }
										{ !!isSelected && <div className = { styles.selected_flag }></div> }
									</div>
								)
							})
						}
						{/* <div className = { styles.stu_img_list_add } >
							<div
								onClick = { addBabyInfoFunc }
								className = { styles.stu_img_list_item_img }
								style = {{ backgroundImage : `url('http://img.ishanshan.com/gimg/img/770e4f2ddab3cc44a30921e188caa2ae')`, border : 'none' }} >
							</div>
							{  dataSource.length > 0 ?
								<p className = { styles.stu_name } >添加学员123123312</p>
								:
								<p className = { styles.stu_special_name }>您还没有添加学员, 赶紧添加哦</p>
							}
						</div> */}
					</div>
				</div>
				{ !!selectedStuItem && !!selectedStuItem.vip && dataSource.length > 0 ?
					<div className = { styles.vip_rights }>
                        <div className = { styles.vip_rights_top }>
                            {!!menuConfList && menuConfList.length>0 && !flag ? menuConfList.map((item,index)=>{
                                if(item.status=='1'){
                                    return (
                                        <div className = { styles.vip_rights_item } key={ index }>
                                            <div
                                                onClick = { ()=>clickToSomePage(item) }
                                                className = { styles.vip_rights_item_icon }
                                                >
                                                <img src={item.icon}/>
                                            </div>
                                            <div className = { styles.vip_rights_item_label }>{item.value}</div>
                                        </div>
                                    )
                                }
                            })
                            :
                            <div style={{height:'200px',lineHeight:'200px',textAlign:'center',fontSize:'22px'}}>
                                暂无可显示的功能模块
                            </div>
                            }
                        </div>
					</div>
					: dataSource.length > 0 ?
					<div className = { styles.no_vip_box }>
						<p className = { styles.no_vip_box_label }>
							学员还不是会员, 暂无会员信息
						</p>
						<div className = { styles.edit_baby_info_btn } >
							<span style = {{ fontSize : '28px' }} onClick = { () => editBabyInfoFunc( selectedStuItem ) } >编辑学员资料</span>
						</div>
					</div>
					: null
				}
				<div className = { styles.all_rights }>
					<div className = { styles.all_rights_item } onClick = { clickToHistoryFunc }>
						<div className = { styles.all_rights_item_icon } style = {{ backgroundImage : `url('http://img.ishanshan.com/gimg/img/35673063f27b3de20460c955f32a7719!s300')`}}></div>
						<div className = { styles.all_rights_item_label }>预约历史</div>
						<Icon className = { styles.all_rights_item_arrow } type = 'right' />
					</div>
					<div className = { styles.all_rights_item_line } ></div>
					<div className = { styles.all_rights_item } onClick = { clickToActivityFunc } >
						<div className = { styles.all_rights_item_icon } style = {{ backgroundImage : `url('http://img.ishanshan.com/gimg/img/c6f22d0af40923c5eb4270e3350b006c!s300')`}}></div>
						<div className = { styles.all_rights_item_label }>我的活动</div>
						<Icon className = { styles.all_rights_item_arrow } type = 'right' />
					</div>
				</div>
			</div>
		</div>
    )
}

export default PersonCenterComponent;
