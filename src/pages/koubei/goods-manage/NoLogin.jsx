import React, { PropTypes } from 'react';
import { Result } from 'antd-mobile';
import { connect } from 'dva';

function NoLogin({ dispatch, noLogin }) {

    return (
        <div>
            <Result
                imgUrl="http://115.29.172.104/gimg/img/b1b33552cc097a9e936db2d3bbae8cb5"
                title="登陆信息已失效"
                message={
                    <div>
                    请退出重新登陆
                    </div>
                }
              />
        </div>
    );
}

NoLogin.propTypes = {
  noLogin: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ noLogin }) {
  return { noLogin };
}

export default connect(mapStateToProps)(NoLogin);
