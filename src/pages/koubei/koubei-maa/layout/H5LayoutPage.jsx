import React from 'react';
import H5LayoutPageComponent from '../../../../components/koubei/koubei-maa/layout/H5LayoutPageComponent';

function H5LayoutPage({children}) {
    let comProps = {
        children
    };
    return (
        <H5LayoutPageComponent {...comProps} />
    );
}

export default H5LayoutPage;
