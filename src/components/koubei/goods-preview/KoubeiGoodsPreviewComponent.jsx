import React, { PropTypes } from 'react';
import {Carousel, Flex, TabBar, Modal } from 'antd-mobile';
import style from './KoubeiGoodsPreviewComponent.less';
import MaskComponent from '../../common/mask-component/MaskComponent';

import TechnicalSupport from '../../common/technical-support/TechnicalSupport';

function KoubeiGoodsPreviewComponent({ goodsData, tenantId, shopId, goodsId, outItemId, maskVisible, openMask }) {

    let bannerImgArr = [];//banner的图片
    let cover = goodsData.cover;
    if(cover && cover.length > 0) {
        let coverObj = JSON.parse(cover);
        let coverUrl = coverObj ? coverObj.imgurl : '';
        bannerImgArr.push(coverUrl);
    } else {
        bannerImgArr.push('http://115.29.172.104/gimg/img/e937c0427f01dd660a8b4909b728616f');
    }

    let pictureDetails = goodsData.pictureDetails;
    if(pictureDetails && pictureDetails.length > 0) {
        let pictureDetailsArr = JSON.parse(pictureDetails);
        pictureDetailsArr && pictureDetailsArr.length > 0 && pictureDetailsArr.map(function(item) {
            bannerImgArr.push(item.imgurl);
        });
    }

    const carouselProps = {
        dots: true,
        autoplay: true,
        infinite: true,
    };

    function openKoubeiGoods() {
        ///window.open(`https://d.alipay.com/i/index.htm?iframeSrc=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FappId%3D20001039%26target%3DgoodsDetail%26itemId%3D${outItemId}%26shopId%3D${shopId}`);
    };

    //商品简介
    let courseDesc = goodsData.goodsType == '1' ? goodsData.courseDesc : goodsData.activityDesc;
    let goodsDescArr = [];

    if(courseDesc != undefined && courseDesc.length > 0) {
        let arr = courseDesc.split('#$@&$#');

        arr && arr.length > 0 && arr.map(function(item, index) {
            goodsDescArr.push(<p className={style.cont_content}><li className={style.goods_intro_li}>{(index + 1) + '. ' + item}</li></p>);
        });
    }

    //课程/活动自定义模板课程及详情数据渲染
    let freeModalCourse = [];
    freeModalCourse = goodsData.descriptions.map((freeModalContentItem,freeModalContentIndex) => {
        if(freeModalContentItem.title != '' && freeModalContentItem.title != null && freeModalContentItem.title != undefined){
            let freeModalCourseDetail = [];
            freeModalCourseDetail = (freeModalContentItem.details).map((freeModalCourseDetailItem,freeModalCourseDetailIndex) => {
                if(freeModalCourseDetailItem != '' && freeModalCourseDetailItem != undefined && freeModalCourseDetailItem != null){
                    return(
                        <p className={style.cont_content} key={'free_cont_detail_content_'+freeModalCourseDetailIndex}>
                            <li>{freeModalCourseDetailItem}</li>
                        </p>
                    );
                }
            })
            return(
                <div key={'free_cont_content_'+freeModalContentIndex}>
                    <p className={style.cont_sub_title} >
                        {freeModalContentItem.title || '课程简介'}
                    </p>
                    { freeModalCourseDetail || [] }
                </div>

            );
        }

    })

    //课程/活动自定义模板补充说明及详情数据渲染
    let freeModalCourseSupple = [];
    freeModalCourseSupple = goodsData.buyer_notes.map((freeModalCourseSuppleItem,freeModalCourseSuppleIndex) => {
        if(freeModalCourseSuppleItem.title != '' && freeModalCourseSuppleItem.title != null && freeModalCourseSuppleItem.title != undefined){
            let freeModalCourseSuppleDetail = [];
            freeModalCourseSuppleDetail = (freeModalCourseSuppleItem.details).map((freeModalCourseSuppleDetailItem,freeModalCourseSuppleDetailIndex) => {
                if(freeModalCourseSuppleDetailItem != '' && freeModalCourseSuppleDetailItem != undefined && freeModalCourseSuppleDetailItem != null){
                    return(
                        <p className={style.cont_content} key={'free_cont_detail_content_supple'+freeModalCourseSuppleDetailIndex}>
                            <li>{freeModalCourseSuppleDetailItem}</li>
                        </p>
                    );
                }
            })
            return(
                <div key={'free_cont_content_supple' + freeModalCourseSuppleIndex}>
                    <p className={style.cont_sub_title} >
                        {freeModalCourseSuppleItem.title || ''}
                    </p>
                    { freeModalCourseSuppleDetail || [] }
                </div>
            );
        }
    })

    return (
        <div className={style.koubei_goods_preview_cont}>
            <div className={style.banner_cont}>
                <Carousel {...carouselProps}>
                    {bannerImgArr && bannerImgArr.length > 0 && bannerImgArr.map(function(item, index) {
                        return (<Flex justify="center" key={`carousel_key_${index}`}
                                      className={style.banner_item_cont}>
                                       <img src={item} width="100%" height="100%" />
                                  </Flex>);
                        })
                    }
                </Carousel>
            </div>

            <div className={style.goods_introduction}>
                <div className={style.goods_title}>
                    <span className={style.goods_subject}>{goodsData.subject || ''}</span>
                </div>

                <div className={style.goods_priceandcount}>
                    <div className={style.goods_price}>
                        <span className={style.xianjia_price}>
                            {goodsData.price || '0'}
                        </span>
                        <span className={style.xianjia_price_unit}>元</span>
                        <span className={style.yuanjia_price}>
                            <s>{goodsData.originalPrice || '0'}</s>
                        </span>
                        <span className={style.yuanjia_price_unit}><s>元</s></span>
                    </div>

                    <div className={style.pre_goods_count}>
                        <span className={style.all_count}>仅售{goodsData.inventory || '0'}份</span>
                        <span className={style.hassale_count}>已售{goodsData.sellNum || '0'}份</span>
                    </div>
                </div>

                <div className={style.other}>
                    <span className={style.other_item}>
                        <img src='http://115.29.172.104/gimg/img/c9f9893bb98bb7d722d9a81a6444f650' />
                        <span className={style.other_item_text}>随时退</span>
                    </span>
                    <span className={style.other_item}>
                        <img src='http://115.29.172.104/gimg/img/c9f9893bb98bb7d722d9a81a6444f650' />
                        <span className={style.other_item_text}>过期退</span>
                    </span>
                </div>

            </div>

            {goodsData.goodsType == '1' && goodsData.goodSrc == '1'?

                <div className={style.goods_desc}>
                    <p className={style.desc_cont_title}>详细内容</p>

                    <p className={style.cont_sub_title}>课程简介</p>
                    {goodsDescArr}

                    <p className={style.cont_sub_title}>课程类型</p>
                    <p className={style.cont_content}><li>{goodsData.courseCat || '无'}</li></p>

                    <p className={style.cont_sub_title}>适合年龄</p>
                    <p className={style.cont_content}><li>{goodsData.courseAge || '无'}</li></p>

                    <p className={style.cont_sub_title}>课时数</p>
                    <p className={style.cont_content}><li>{goodsData.courseHour || '无'}</li></p>

                    <p className={style.cont_sub_title}>课程时长</p>
                    <p className={style.cont_content}><li>{goodsData.courseDuring || '无'}</li></p>
                </div>
                :
             goodsData.goodsType == '1' && goodsData.goodSrc == '2'?
                <div className={style.goods_desc}>
                    <p className={style.desc_cont_title}>详细内容</p>
                    { freeModalCourse || [] }
                </div>
                :
             goodsData.goodsType == '2' && goodsData.goodSrc == '1'?
                <div className={style.goods_desc}>
                    <p className={style.desc_cont_title}>详细内容</p>

                    <p className={style.cont_sub_title}>活动简介</p>
                    {goodsDescArr}

                    <p className={style.cont_sub_title}>活动时间</p>
                    <p className={style.cont_content}><li>{goodsData.activityTime || '无'}</li></p>

                    <p className={style.cont_sub_title}>活动地址</p>
                    <p className={style.cont_content}><li>{goodsData.activityAddr || '无'}</li></p>

                    <p className={style.cont_sub_title}>适合年龄</p>
                    <p className={style.cont_content}><li>{goodsData.courseAge || '无'}</li></p>

                </div>
                :
             goodsData.goodsType == '2' && goodsData.goodSrc == '2'?
                <div className={style.goods_desc}>
                    <p className={style.desc_cont_title}>详细内容</p>
                    { freeModalCourse || [] }
                </div>
                :
            null
            }

            <div className={style.goods_desc}>
                <p className={style.desc_cont_title}>购买须知</p>

                <p className={style.cont_sub_title}>有效期</p>
                <p className={style.cont_content}><li>{goodsData.validityPeriod ? `购买后${goodsData.validityPeriod}天内有效` : ''}</li></p>

                { goodsData.goodSrc == '2' ?
                    <div>
                        { freeModalCourseSupple || [] }
                    </div>
                    :
                    <div>
                        <p className={style.cont_sub_title}>预约信息</p>
                        <p className={style.cont_content}><li>{goodsData.reservation || '无'}</li></p>

                        <p className={style.cont_sub_title}>试用人群</p>
                        <p className={style.cont_content}><li>{goodsData.fitPerson || '无'}</li></p>

                        <p className={style.cont_sub_title}>规则提醒</p>
                        <p className={style.cont_content}><li>{goodsData.ruleRemind || '无'}</li></p>
                    </div>
                }
            </div>

            <TechnicalSupport />

            <div className={style.buy_btn} onClick={openMask}>
                <span>去买单</span>
            </div>
            <MaskComponent maskVisible={maskVisible} />
        </div>
    );
};

KoubeiGoodsPreviewComponent.propTypes = {
    loading : PropTypes.any,
    goodsData : PropTypes.object,
};

export default KoubeiGoodsPreviewComponent;
