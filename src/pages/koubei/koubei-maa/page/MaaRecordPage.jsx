import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import './MaaRecordPage.css';

const MaaHistory = React.createClass({

	getInitialState: function(){
		return {
			successOrfailure : '',
			resultsArr : ''
		}
	},

	componentDidMount: function () {
		var _alipayUserId 	= _baseParams.alipayUserId;
		let self 		= this;
        var _shopId	= _baseParams.shopId;

        //埋点
        window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'获取口碑预约提交记录','booking_detail','action');

		serviceRequest(
			BASE_URL+'/h5Reservation/reservationRecords', {
			threePartId : _alipayUserId || ''
		},

		function(result){
			if(result.results.length > 0) {
				self.setState({
					successOrfailure : 'success',
					resultsArr	 : result.results
				});
			} else {

				var truthBeTold = alert('您还没有预约过任何机构哦');
				if(truthBeTold) {

				} else {
					self.props.dispatch(routerRedux.push({
                        pathname: 'maa',
                    }));
				}
			}

            //埋点
            window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'获取口碑预约提交记录成功','booking_detail','end');
		},

		function(result){
			self.setState({
				successOrfailure : 'failure'
			});
            //埋点
            window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'获取口碑预约提交记录失败','booking_detail','error');
		})
	},


	render : function() {
		return (
			<div className="koubeiMaaHistory_baseDiv">
				{
					this.state.successOrfailure == 'success' ? <SubView data={this.state.resultsArr} /> : ''
				}
			</div>
		)
	}
});

const SubView = React.createClass({

	render() {
		var newclassname 	= '';
		var data 		= this.props.data;
		return (
			  <div>
		                {
		                	data&&data.map(function (item, index) {
	                		  return <div key={'koubei_maa_record_' + index}>
                                        <div style={{height : '280px', backgroundColor: '#f1f1f1'}}>
                                                <div className="koubeiMaaHistory_item_p_first_title">{item.orgName}</div>
                                                <div className="koubeiMaaHistory_item_p_first_value">已预约</div>
                                                <hr className="koubeiMaaHistory_item_p_first_hr"/>
                                                <div className="appointmentHistory_p_other_title">宝宝信息</div>
                                                <div className="appointmentHistory_p_other_value">{item.childName}&nbsp;{item.sex}&nbsp;{item.childBirthday}</div>
                                                <div className="appointmentHistory_p_other_title">联系方式</div>
                                                <div className="appointmentHistory_p_other_value">{item.tel}</div>
                                                <div className="appointmentHistory_p_other_title">提交时间</div>
                                                <div className="appointmentHistory_p_other_value">{item.createTime}</div>
                                    </div>
                                </div>
		                    })
		                }
		            </div>
		)
	},
})

function mapStateToProps() {
  	return {};
}

export default connect(mapStateToProps)(MaaHistory);
