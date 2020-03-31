import React, {PropTypes} from 'react';
import styles from './englishActivity.less';

const EnglishActivity = ({
    obj,
    newIndex,
    index,
}) => {
	
	function wid_hei(width, height){
		let w = WIDTH_MIN * width;
		return {width : w, height : w};
	}
	
    let headerImageUrl = 'url(' + obj.head_imgUrl + ')';
	return(
		<div className="english_div">
			<div className={styles.background1}>
            <div className={styles.background1_header}>
				<div className={styles.header} style={{backgroundImage : headerImageUrl}}></div>
			</div>
            <img className={styles.background1_qr} style={wid_hei(25)} src={obj.code_imgUrl} />
            {
                newIndex == index ?  
                    <div> 
                        <div className={styles.background1_p}>{obj.title}</div>
                        <div className={styles.background1_left_chicken}></div>
                        <div className={styles.background1_info}>{obj.sub_title}</div>
                        <div className={styles.background1_contact}>联系方式</div>
                        <div className={styles.bottom_contact_div}>
							{
								obj.contact&&obj.contact.map(function(item,index) {
									return  <div key={index}>
												<div className={styles.background1_l_text}>{item.label}:</div>
												<div className={styles.background1_r_text}>{item.value}</div>
											</div>
								})	
							}
                        </div>
                    </div> : ''
            }
			</div>
		</div>
    );
}

export default EnglishActivity;
//			<img className={styles.background1} src="http://115.29.172.104/gimg/img/a1b09b3378c8f6bd4160465427282f3b"/>
