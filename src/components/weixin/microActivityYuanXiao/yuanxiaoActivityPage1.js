import React, {PropTypes} from 'react';
import styles from './yuanxiaoActivityPage.less';

function YuanxiaoActivity({
    obj,
    newIndex,
    index,
}) {

	return(
		<div className="yuanxiao_div" >
			<div className={styles.background1}>
            {
                newIndex == index ?  
                    <div> 
                        <div className={styles.background1_lantern_left} />
                        <div className={styles.background1_lantern_right} />
		                <div className={styles.background1_chicken} />
                        <div className={styles.background1_chicken2} />
						<div className={styles.background1_fuzzy} />
						<div className={styles.background1_p}>{obj.title}</div>
                    </div> : ''
            }
			</div>
		</div>
    );
}

export default YuanxiaoActivity;

//                        <div className={styles.background1_curtain}><div className={styles.background1_curtain_text} /></div>
