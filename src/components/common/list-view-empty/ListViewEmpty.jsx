import React, { PropTypes } from 'react';

import style from './ListViewEmpty.less';

//列表项为空时
function ListViewEmpty({ }) {

    return (
        <div className={style.list_empty}>
            这里没有数据
        </div>
    );
};

export default ListViewEmpty;
