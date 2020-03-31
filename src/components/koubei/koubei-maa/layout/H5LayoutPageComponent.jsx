import React from 'react';
import styles from './H5LayoutPageComponent.less';

function H5LayoutPageComponent ({
    children,
}) {

    return (
        <div className={styles.h5_layout}>
            <div className={styles.h5_layout_content}>
                {children}
            </div>
        </div>

    );
}

export default H5LayoutPageComponent;
