import React from 'react';
import { Result, Button } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function OrderResult({dispatch, orderResultModel}){
    let {
        failContent,
        result,
        selectedDate,

        tenantId,
        orgId,
        stuId,
    } = orderResultModel

    /*跳转课程*/
    let toOrdered = () => {
        dispatch(routerRedux.push({
            pathname: '/schedule_info',
            query: {
                selectedDate,
                tenantId,
                orgId,
                stuId,
            }
        }))
    }

    return (
        <div>
            {!!result && result == 'ok' ? <Result
                imgUrl="https://zos.alipayobjects.com/rmsportal/hbTlcWTgMzkBEiU.png"
                title="预约成功"
                message={
                    <Button type="primary" style={{ width: '60%' }} onClick={toOrdered}>查看已约课程</Button>
                }
              /> : <Result
                imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                title="预约失败"
                message={`原因: ${failContent}`}
              />
            }
        </div>
    )
}

function mapStateToProps({ orderResultModel }) {
  return { orderResultModel };
}

export default connect(mapStateToProps)(OrderResult);
