import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import CardComponent from '../../../../components/checkstand/App/payCode/CardComponent';

function CardPage({ dispatch,CardModel }) {
    let {

    } = CardModel;



    let CardProps = {

    };

    return (
        <div>
            <CardComponent {...CardProps}/>
        </div>
    );
}

CardPage.propTypes = {
  CardModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ CardModel }) {
  return { CardModel };
}

export default connect(mapStateToProps)(CardPage);
