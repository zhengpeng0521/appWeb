import React from 'react';
import styles from './microLeafletsDefault.less';

const MicroLeafletsDefault = ({
    
    data, newIndex, index,
    
}) => {
    
    let headerImageUrl = 'url(' + data.head_imgUrl || '' + ')';
    return(
        <div className="js_defaultPage">
            <div className={styles.js_background1}>
                <img 
                    src="http://115.29.172.104/gimg/img/6e55334a1ecdf287c3a2d0bc976120a9" 
                    style={{
                        width:'90%',
                        height:HEIGHT_MIN * 38,
                        position: 'absolute',
                        top: '3rem',
                        left: '5%',
                    }}
                />
                <img className={styles.js_headerImg} src={data.head_imgUrl} />
                <img className={styles.js_qr} style={{width : WIDTH_MIN * 30, height : WIDTH_MIN * 30}} src={data&&data.code_imgUrl} />
                <div className={styles.js_qr_p1}>长按扫码</div>
                <div className={styles.js_qr_p2}>免费预约试听</div>
                <img 
                    src="http://115.29.172.104/gimg/img/367e839abb2197ffdf3b43e46ee82de9" 
                    style={{
                        width:WIDTH_MIN * 52,
                        height:WIDTH_MIN * 40 - 4,
                        position: 'absolute',
                        bottom: '0.5rem',
                        right: '5%',
                    }}
                />
                {
                    newIndex == index 
                    ?
                        <div>
                            <div className={styles.js_title}>{data&&data.title}</div>
                            <div className={styles.js_person1} style={{top : HEIGHT_MIN * 35}}></div>
                            <div className={styles.js_person2} style={{top : HEIGHT_MIN * 35}}></div>
                            <div className={styles.js_info} style={{top : HEIGHT_MIN * 61 + 7}}>{data&&data.sub_title}</div>
                            <div className={styles.js_contact_way}>联系方式</div>
                            <div className={styles.js_bottom_contact_div}>
                                {
                                    data&&data.contact&&data&&data.contact.map(function(item,index) {
                                        return  <div key={index}>
                                                    <div className={styles.js_l_text}>{item.label}:</div>
                                                    <div className={styles.js_r_text}>{item.value}</div>
                                                </div>
                                    })  
                                }
                            </div>
                        </div>
                    : ''
                }
            </div>
        </div>
    );
}

export default MicroLeafletsDefault;