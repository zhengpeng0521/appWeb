import React, { PropTypes } from 'react';
import { Button, List,InputItem,Toast,ImagePicker,TextareaItem,Checkbox,Popup,Icon,DatePicker,Radio,SegmentedControl,Picker} from 'antd-mobile';
import KoubeiGoodsOrgSelectComponent from './KoubeiGoodsOrgSelectComponent';
import QueueAnim from 'rc-queue-anim';
import { createForm } from 'rc-form';
import moment from 'moment';
import style from './less/KoubeiGoodsForm.less';
import styles from './less/KoubeiGoodsByZj.less';
const Item = List.Item;
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;

function KoubeiGoodsFormComponent({
    goodsType,
    goodsData,
    goodsImgChange,
    courseTypeList,
    courseAgeList,
    koubeiOrgList,
    koubeiGoodsSubmit,
    goodsIntroList,
    addGoodsIntroItem,
    removeGoodsIntroItem,
    orgList,

    categoryIdList,             //商品类目数据
    tabsDefaultValue,           //新增时默认的类型(0早教模板/1自定义)
    customCourseList,           //自定义时课程简介内容
    customExtraIntro,           //自定义补充说明内容

    TabsOnChange,               //新增编辑是tabs切换事件
    addCustomGoodsIntroItem,            //增加一组简介事件
    removeCustomGoodsIntroItem,         //移除一组简介事件

    addCustomGoodsDetailIntroItem,      //增加一个详情事件
    removeCustomGoodsDetailIntroItem,   //移除一个详情事件

    freeContentTitleOnChange,           //课程名称输入框onChange事件
    detailContentOnChange,              //课程详情输入框onChange事件

    freeContentSuppleTitleOnChange,     //补充说明名称输入框onChange事件
    detailContentSuppleOnChange,        //补充说明详情输入框onChange事件

    form : {
        getFieldDecorator,
        validateFields,
        getFieldProps,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
    }, form,
}) {

    //校验是否包含关键字
	function checkWrongWord(rule, value, callback) {
        if(value && value != '') {
            if((/^.*(储\s*值\s*卡|充\s*值\s*卡|会\s*员\s*卡|v\s*i\s*p\s*卡|充\s*值\s*卡|打\s*折\s*卡|年\s*卡|美\s*容\s*卡|健\s*身\s*卡).*$/.test(value.toLowerCase()))){
                callback('不能包含关键字');
            } else {
                callback();
            }
        } else {
            callback();
        }
	}

    //校验是否是纯数字
	function checkOnlyNum(rule, value, callback) {
		if((/^[0-9.]+$/.test(value))){
    		callback('内容项不可以是纯数字');
    	} else {
    		callback();
    	}
	}

    //校验正数
	function checkPositiveNum(rule, value, callback) {
		if(value && value != '') {
			if(!(/^[0-9]*(.[0-9]*)?$/.test(value))){
	    		callback('请填写数字');
	    	} else if(value > 0){
	    		callback();
	    	} else {
	    		callback('请填写一个正数');
	    	}
		} else {
			callback();
		}
	}

     //校验整数
	function checkIntegerNum(rule, value, callback) {
		if(value && value != '') {
			if(!(/^-?\d+$/.test(value))){
	    		callback('请填写整数');
	    	} else {
	    		callback();
	    	}
		} else {
			callback();
		}
	}

    function checkPriceRule(rule, value, callback) {
        if(value && value != '') {
            let price = parseFloat( '0' + value);
            if(price < 0) {
                callback('价格不能能负数');
            } else if(price >= 0.01) {
                if(price > 5000) {
					callback('价格不能超过5000');
                } else {
                    callback();
                }
            } else {
                callback('价格至少为0.01');
            }
        } else {
            callback();
        }
    }

    //校验原价
	function checkPriceAndYuanjia(rule, value, callback) {

		let price = parseFloat( (getFieldValue('price') || 0) + '');
		let yuanjia = parseFloat( (getFieldValue('originalPrice') || 0) + '');

        if(yuanjia > 0 && price > yuanjia) {
            callback('原价必须大于现价');
        } else {
            callback();
        }
	}

    //校验库存
	function checkInventory(rule, value, callback) {
        if(value && value != '') {
            let inventory = parseFloat( (value || 0) + '');
            if(inventory >= 1 && inventory <= 9999) {
                callback();
            } else {
                callback('必须设置为1~9999中某个整数');
            }
        } else {
            callback();
        }
	}

    //校验库存
	function checkWeight(rule, value, callback) {
        if(value && value != '') {
            let inventory = parseFloat( (value || 0) + '');
            if(inventory >= 0 && inventory <= 9999) {
                callback();
            } else {
                callback('必须设置为0~9999中某个整数');
            }
        } else {
            callback();
        }
	}

    //校验有效天数
    function checkValidityPeriod(rule, value, callback) {
        if(value && value != '') {
            let value_num = parseFloat( (value || 0) + '');
            if(value_num >= 7 && value_num <= 360) {
                callback();
            } else {
                callback('有效天数控制在7-360之间');
            }
        } else {
            callback();
        }
    }

    //校验活动时间
    function checkActivityTime(rule, value, callback) {
        let timeBegin = getFieldValue('activityTimeBegin');
        let timeEnd = getFieldValue('activityTimeEnd');
        if(timeBegin && timeBegin != '' && timeEnd && timeEnd != '') {
            if(timeBegin>timeEnd) {
                callback('开始时间不能晚于结束时间');
            } else {
                callback();
            }
        } else {
            callback();
        }
    }

    //校验商品上架时间
    function checkGmtStart(rule, value, callback) {
    	if(isGoodsUpdate) {
    		callback();
    	}
        if(value == '') {
            callback('请选择上架时间');
        } else if(!value) {
            callback('请选择上架时间');
        } else {
            if(value < moment().startOf('day')) {
                callback('上架时间不能早于当天');
            } else {
                callback();
            }
        }
    }

    //关闭pop弹出框
    function closePop() {
        Popup.hide();
    }

    //修改课程类型
    function changeCourseType(courseCat) {
        setFieldsValue({courseCat});
        validateFields(['courseCat']);
        closePop();
    }

    //弹出选择课程类型
    function popCourseType() {
        let courseTypeComponentProps = {
            courseTypeList,courseCat: getFieldValue('courseCat'),
            changeCourseType,closePop,
        };
        Popup.show(
            <KoubeiGoodsCourseTypeComponent {...courseTypeComponentProps} />,
        { animationType: 'slide-up', maskClosable: true }
        );
    }

    //修改适合年龄
    function changeCourseAge(courseAge) {
        setFieldsValue({courseAge});
        validateFields(['courseAge']);
        closePop();
    }

    //pop 弹出适合年龄的选中框
    function popCourseAge() {
        let courseAgeComponentProps = {
            courseAgeList,courseAge: getFieldValue('courseAge'),
            changeCourseAge,closePop,
        };
        Popup.show(
            <KoubeiGoodsCourseAgeComponent {...courseAgeComponentProps} />,
        { animationType: 'slide-up', maskClosable: true }
        );
    }

    //门店选择变更
    function changeGoodsOrg(selectedOrg) {
        setFieldsValue({goodsOrg: selectedOrg.join(',')});
        validateFields(['goodsOrg']);
        closePop();
    }

    //弹出适用门店选择框
    function popGoodsOrg() {
        let goodsOrgProps = {
            koubeiOrgList : orgList,
            selectedOrg: formOrgDataArr,
            changeGoodsOrg,
            closePop,
        }

        Popup.show(
            <KoubeiGoodsOrgSelectComponent {...goodsOrgProps} />,
        { animationType: 'slide-up', maskClosable: true }
        );
    }

    //更改上架时间类型
    function changeSelectValue(selectedValue) {
        setFieldsValue({gmtStartType: selectedValue});
        validateFields(['gmtStartType']);
        closePop();
        
        //选择立即上架时 只能选择相对核销有效期
        if(selectedValue == '1') {
        	setFieldsValue({validityPeriodType: '2'});
        }
    }

    //选择商品上架时间类型
    function popMgtStartTypeSelect() {
        let selectprops = {
            selectedValue: getFieldValue('gmtStartType'),
            changeSelectValue,closePop,
        }
        Popup.show(
            <KoubeiGoodsGmtStartTypeComponent {...selectprops} />,
        { animationType: 'slide-up', maskClosable: true }
        );
    }
    
    //更改上架时间类型
    function changeSelectValidateTypeValue(selectedValue) {
        setFieldsValue({validityPeriodType: selectedValue});
        validateFields(['validityPeriodType']);
        closePop();
    }
    
    //选择商品核销类型
    function popValidateTypeSelect() {
        let selectprops = {
            selectedValue: getFieldValue('validityPeriodType'),
            changeSelectValue: changeSelectValidateTypeValue, closePop,
        }
        Popup.show(
            <KoubeiGoodsValidateTypeComponent {...selectprops} />,
        { animationType: 'slide-up', maskClosable: true }
        );
    }

    //商品点击提交
    function koubeiGoodsFormSubmit() {
        let coverStr = goodsData.cover || '';
        if(coverStr && coverStr.length > 0) {
            let coverObj = JSON.parse(coverStr);
            let coverUrl = coverObj ? coverObj.imgurl : '';
            setFieldsValue({goodsCover: coverUrl});
        }
        validateFields((err, values) => {
            if (!!err) {
                return;
            }

            let data = getFieldsValue();
            //处理商品类目
            data.categoryId = (data.categoryId)[(data.categoryId).length - 1];

            //处理类型(早教模板1/自定义2)
            data.goodSrc = tabsDefaultValue;

            //发送请求时编译后台所需结构(课程)
            let courseArray = [];
            customCourseList.map((first,index) => {
                let obj = {};
                obj.title = first.title;
                let detailArr = [];
                first.details.map((details,index) => {
                    detailArr.push(details.value)
                });
                obj.details = detailArr;
                courseArray.push(obj);
            })

            //发送请求时编译后台所需结构(补充说明)
            let courseSuppleArray = [];
            let isPass = true;                  //是否可通过最终检验(默认可通过)
            customExtraIntro.map((first,index) => {
                let titleNull = false;          //标题为空
                let detailsNotNull = false;     //内容不为空
                let obj = {};
                if(first.title == '' || first.title == null || first.title == undefined || /^[\s]*$/.test(first.title)){
                    titleNull = true;
                }
                obj.title = first.title;
                let detailArr = [];
                first.details.map((details,index) => {
                    if(details.value != '' && details.value != null && details.value != undefined && !/^[\s]*$/.test(details.value)){
                        detailsNotNull = true;
                        detailArr.push(details.value);
                    }
                });
                if(detailArr.length > 0){
                    obj.details = detailArr;
                }
                //标题和内容都为空 标题为空内容不为空 标题不为空内容为空 都不会通过检测(isPass变为false)
                if((titleNull == true && detailsNotNull == true) || (titleNull == false && detailsNotNull == false)){
                    isPass = false;
                }

                //标题和简介都不为空时才添加进数组
                if(titleNull == false && detailsNotNull == true){
                    courseSuppleArray.push(obj);
                }
            })

            if(!isPass){
                Toast.info('若补充说明标题或补充说明内容其中一项已填写，则另一项必填');
                return isPass;
            }

            //选择类型是自定义模板类型时才封装自定义数据
            if(tabsDefaultValue == '2'){
                data.descriptions = JSON.stringify(courseArray);
                data.buyer_notes = JSON.stringify(courseSuppleArray);
            }

            koubeiGoodsSubmit(data);
        });
    }
    
    let isGoodsUpdate = goodsData && goodsData.id && goodsData.id.length > 0;
    
    let gmtStartInit = goodsData && goodsData.gmtStart;
    let gmtStartInitM = (gmtStartInit && gmtStartInit.length > 0) ? moment(gmtStartInit, 'YYYY-MM-DD hh:mm:ss') : undefined;
    
    let gmtEndInit = goodsData && goodsData.gmtEnd;
    let gmtEndInitM = (gmtEndInit && gmtEndInit.length > 0) ? moment(gmtEndInit, 'YYYY-MM-DD hh:mm:ss') : undefined;
    
    let goodsCover = [];
    let coverStr = goodsData.cover || '';
    let goodsCoverForm = '';
    if(coverStr && coverStr.length > 0) {
        let coverObj = JSON.parse(coverStr);
        let coverUrl = coverObj ? coverObj.imgurl : '';
        goodsCover.push({
            id: coverObj.imgId,
            url: coverObj.imgurl,
        });
        goodsCoverForm += coverObj.imgurl;
    }

    let pictureDetails = [];
    let pictureDetailStr = goodsData.pictureDetails;
    if(pictureDetailStr && pictureDetailStr.length > 0) {
        let pictureDetailObj = JSON.parse(pictureDetailStr);
        pictureDetailObj && pictureDetailObj.length > 0 && pictureDetailObj.map(function(p_item) {
            pictureDetails.push({
                id: p_item.imgId,
                url: p_item.imgurl,
            });
        });
    }
    
    function getOrgSelectExtra() {
    	let formOrgData_t = getFieldValue('goodsOrg') || '';

    	let formOrgDataArr_t = formOrgData_t && formOrgData_t.length > 0 ? formOrgData_t.split(',') : [];
    	
    	return formOrgDataArr_t && formOrgDataArr_t.length > 0 ? `已选择${formOrgDataArr_t.length}家门店` : "选择门店";
    }
    
    //form表单内的 选择的门店
    let formOrgData = getFieldValue('goodsOrg') || '';

    let formOrgDataArr = formOrgData && formOrgData.length > 0 ? formOrgData.split(',') : [];

    let activityTimeBeginMsg = !!getFieldError('activityTimeBegin') ? getFieldError('activityTimeBegin').join('、') :
                                getFieldValue('activityTimeBegin') && getFieldValue('activityTimeBegin') != '' ?
                                getFieldValue('activityTimeBegin').format('YYYY-MM-DD HH:mm'):
                                "请选择活动开始时间";
    let activityTimeEndMsg = !!getFieldError('activityTimeEnd') ? getFieldError('activityTimeEnd').join('、') :
                                getFieldValue('activityTimeEnd') && getFieldValue('activityTimeEnd') != '' ?
                                getFieldValue('activityTimeEnd').format('YYYY-MM-DD HH:mm'):
                                "请选择活动结束时间";

    let gmtStartTypeMsg = getFieldValue('gmtStartType') == '1' ? '立即上架' :
                          getFieldValue('gmtStartType') == '2' ? '指定时间' : '请选择上架时间';

    let mgtStartMsg = !!getFieldError('gmtStart') ? getFieldError('gmtStart').join('、') :
                        getFieldValue('gmtStart') && getFieldValue('gmtStart') != '' ?
                        getFieldValue('gmtStart').format('YYYY-MM-DD HH:mm') :
                        '请选择售卖开始时间';
                        
    let mgtEndMsg = !!getFieldError('gmtEnd') ? getFieldError('gmtEnd').join('、') :
                        getFieldValue('gmtEnd') && getFieldValue('gmtEnd') != '' ?
                        getFieldValue('gmtEnd').format('YYYY-MM-DD HH:mm') :
                        '请选择售卖结束时间';
                        
    let gmtValidateTypeMsg = getFieldValue('validityPeriodType') == '1' ? '绝对时间段' :
                          getFieldValue('validityPeriodType') == '2' ? '相对有效期' : '请选择核销有效期类型';
                          
    let validateStartMsg = !!getFieldError('validityPeriodRangeFrom') ? getFieldError('validityPeriodRangeFrom').join('、') :
                        getFieldValue('validityPeriodRangeFrom') && getFieldValue('validityPeriodRangeFrom') != '' ?
                        getFieldValue('validityPeriodRangeFrom').format('YYYY-MM-DD HH:mm') :
                        '请选择核销开始时间';
                        
    let validateEndMsg = !!getFieldError('validityPeriodRangeTo') ? getFieldError('validityPeriodRangeTo').join('、') :
                        getFieldValue('validityPeriodRangeTo') && getFieldValue('validityPeriodRangeTo') != '' ?
                        getFieldValue('validityPeriodRangeTo').format('YYYY-MM-DD HH:mm') :
                        '请选择核销结束时间';
                        

    let canChangeMgtStart = !(goodsData.status && goodsData.status != '');
    let courseHour = goodsData.courseHour;
    if(courseHour && courseHour.length > 0) {
        let courseHourArr = courseHour.split('-');
        if(courseHourArr && courseHourArr.length > 0) {
            courseHour = courseHourArr[0];
        }
    }

    let courseDuring = goodsData.courseDuring;
    if(courseDuring && courseDuring.length > 0) {
        let courseDuringArr = courseDuring.split('-');
        if(courseDuringArr && courseDuringArr.length > 0) {
            courseDuring = courseDuringArr[0];
        }
    }

    //创建 商品简介的右侧工具栏
    function createGoodsIntrobar(key) {
        return (
            <div className={style.goods_intro_bars}>
                <Icon type="plus" className={style.goods_intro_bar_item} size="lg" onClick={()=>addGoodsIntroItem()}/>
                <Icon type="cross-circle" className={style.goods_intro_bar_item}  size="lg"  onClick={()=>removeGoodsIntroItem(key)}/>
            </div>
        );
    }

    let courseDescRender = [];
    if(tabsDefaultValue == '1'){
        goodsIntroList && goodsIntroList.length > 0 && goodsIntroList.map(function(introItem) {
            courseDescRender.push(
                getFieldDecorator(introItem.key, {
                        initialValue: introItem.value || '',
                        rules: [
                            { required: true, message: '请输入简介', type: 'string' },
                            { max: 100 , message : '限100汉字以内'},
                            { validator: checkWrongWord },
                            { validator: checkOnlyNum },
                        ],
                      })(
                        <InputItem className="common_require_list_item" key={introItem.key}
                            clear
                            error={!!getFieldError(introItem.key)}
                            onErrorClick={() => {
                                 Toast.info(getFieldError(introItem.key).join('、'));
                            }}
                            rows={2}
                            title=""
                            extra={createGoodsIntrobar(introItem.key)}
                            placeholder={goodsType == 'koubei_course' ? '请输入课程简介' : '请输入活动简介'} />
                      )
            );
        });
    }


    //创建 自定义条件下 商品简介的右侧工具栏
    function createGoodsCustomIntrobar(fatherKey,type) {
        return (
            <div style={{width:'90px'}}>
            </div>
        );
    }

    //创建 自定义条件下 商品简介详情的右侧工具栏
    function createGoodsDetailCustomIntrobar(fatherKey,ownKey,type) {
        return (
            <div className={style.goods_intro_bars}>
                <Icon type="plus" className={style.goods_intro_bar_item} size="lg" onClick={()=>addCustomGoodsDetailIntroItem(fatherKey,ownKey,type)}/>
                <Icon type="cross-circle" className={style.goods_intro_bar_item} size="lg" onClick={()=>removeCustomGoodsDetailIntroItem(fatherKey,ownKey,type)}/>
            </div>
        );
    }

    //创建 自定义条件下课程标题与简介
    let customCourseArray = [];
    if(tabsDefaultValue == '2'){
        customCourseArray = customCourseList.map((customCourseListItem,customCourseListIndex) => {
            let fatherKey = customCourseListItem.key;
            let customCourseInnerArray = [];
            customCourseInnerArray = (customCourseListItem.details).map((customCourseListDetailItem,customCourseListDetailItemIndex) => {
                let ownKey = customCourseListDetailItem.key;
                return(
                    <div key={'free_goods_intro_formitem_detail' + ownKey} className='free_goods_intro_formitem_detail'>
                        {getFieldDecorator('free_goods_intro_formitem_detail' + ownKey, {
                            initialValue : customCourseListDetailItem.value || undefined,
                            rules: [
                                { required: true, message: '请输入简介', type: 'string' },
                                { max: 100 , message : '限100汉字以内'},
                                { validator: checkWrongWord },
                                { validator: checkOnlyNum },
                            ],
                          })(
                            <InputItem
                                clear
                                error={!!getFieldError('free_goods_intro_formitem_detail' + ownKey)}
                                onErrorClick={() => {
                                     Toast.info(getFieldError('free_goods_intro_formitem_detail' + ownKey).join('、'));
                                }}
                                rows={2}
                                title=""
                                extra={createGoodsDetailCustomIntrobar(fatherKey,ownKey,'content')}
                                placeholder={ goodsType == 'koubei_course' ? '请输入课程简介详情' : '请输入活动简介详情' }
                                onChange={(value) => detailContentOnChange(value,ownKey)}>
                            </InputItem>
                          )}
                    </div>
                );
            })
            return(
                <div key={'free_goods_intro_formitem_title' + fatherKey} className='free_goods_intro_formitem_title'>
                    <div>
                        {getFieldDecorator('free_goods_intro_formitem_title' + fatherKey, {
                            initialValue : customCourseListItem.title || undefined,
                            rules: [
                                { required: true, message: '请输入课程简介', type: 'string' },
                                { max: 100 , message : '限100汉字以内'},
                                { validator: checkWrongWord },
                                { validator: checkOnlyNum },
                            ],
                          })(
                            <InputItem
                                clear
                                error={!!getFieldError('free_goods_intro_formitem_title' + fatherKey)}
                                onErrorClick={() => {
                                     Toast.info(getFieldError('free_goods_intro_formitem_title' + fatherKey).join('、'));
                                }}
                                rows={2}
                                title=""
                                extra={createGoodsCustomIntrobar(fatherKey,'content')}
                                placeholder={ goodsType == 'koubei_course' ? '请输入课程简介名称' : '请输入活动简介名称' }
                                onChange={(value) => freeContentTitleOnChange(value,fatherKey)}>
                            </InputItem>
                          )}
                    </div>
                    { customCourseInnerArray || [] }
                    <div className='zj_button_group'>
                        <div className='zj_button_left' onClick={() => addCustomGoodsIntroItem(fatherKey,'content')}>增加一组</div>
                        <div className='zj_button_right' onClick={()=>removeCustomGoodsIntroItem(fatherKey,'content')}>删除此组</div>
                    </div>
                </div>
            );
        })
    }


    //创建 自定义条件下补充说明标题与简介
    let customExtraArray = [];
    if(tabsDefaultValue == '2'){
        customExtraArray = customExtraIntro.map((customExtraIntroItem,customExtraIntroIndex) => {
            let fatherKey = customExtraIntroItem.key;
            let customExtraInnerArray = [];
            customExtraInnerArray = (customExtraIntroItem.details).map((customExtraListDetailItem,customExtraListDetailIndex) => {
                let ownKey = customExtraListDetailItem.key;
                return(
                    <div key={'free_goods_supple_intro_formitem_detail' + ownKey} className='free_goods_intro_formitem_detail'>
                        {getFieldDecorator('free_goods_supple_intro_formitem_detail' + ownKey, {
                            initialValue : customExtraListDetailItem.value || undefined,
                          })(
                            <InputItem
                                clear
                                error={!!getFieldError('free_goods_supple_intro_formitem_detail' + ownKey)}
                                onErrorClick={() => {
                                     Toast.info(getFieldError('free_goods_supple_intro_formitem_detail' + ownKey).join('、'));
                                }}
                                rows={2}
                                title=""
                                extra={createGoodsDetailCustomIntrobar(fatherKey,ownKey,'suppleContent')}
                                placeholder='请输入补充说明详情'
                                onChange={(value) => detailContentSuppleOnChange(value,ownKey)}>
                            </InputItem>
                          )}
                    </div>
                );
            })
            return(
                <div key={'free_goods_supple_intro_formitem_title' + fatherKey} className='free_goods_intro_formitem_title'>
                    <div>
                        {getFieldDecorator('free_goods_supple_intro_formitem_title' + fatherKey, {
                            initialValue : customExtraIntroItem.title || undefined,
                            rules: [
                                { max: 100 , message : '限100汉字以内'},
                                { validator: checkWrongWord },
                                { validator: checkOnlyNum },
                            ],
                          })(
                            <InputItem
                                clear
                                error={!!getFieldError('free_goods_supple_intro_formitem_title' + fatherKey)}
                                onErrorClick={() => {
                                     Toast.info(getFieldError('free_goods_supple_intro_formitem_title' + fatherKey).join('、'));
                                }}
                                rows={2}
                                title=""
                                extra={createGoodsCustomIntrobar(fatherKey,'suppleContent')}
                                placeholder='请输入补充说明名称'
                                onChange={(value) => freeContentSuppleTitleOnChange(value,fatherKey)}>
                            </InputItem>
                          )}
                    </div>
                    { customExtraInnerArray || [] }
                    <div className='zj_button_group'>
                        <div className='zj_button_left' onClick={() => addCustomGoodsIntroItem(fatherKey,'suppleContent')}>增加一组</div>
                        <div className='zj_button_right' onClick={()=>removeCustomGoodsIntroItem(fatherKey,'suppleContent')}>删除此组</div>
                    </div>
                </div>
            );
        })
    }
    
    return (
        <div className="koubei_goods_form_cont">
             <List
                renderHeader={() => '基本信息'}
                renderFooter={null}
              >

                 {getFieldDecorator('subject', {
                    initialValue: goodsData.subject || '',
                    rules: [
                        { required: true, message: goodsType == 'koubei_course' ? '请输入课程名称' : '请输入活动名称', type: 'string' },
                        { max: 20 , message : goodsType == 'koubei_course' ? '课程名称限20汉字以内' : '活动名称限20汉字以内'},
                        { validator: checkWrongWord },
                        { validator: checkOnlyNum },
                    ],
                  })(
                    <InputItem className="common_require_list_item"
                        clear
                        error={!!getFieldError('subject')}
                        onErrorClick={() => {
                             Toast.info(getFieldError('subject').join('、'));
                        }}
                        placeholder={goodsType == 'koubei_course' ? '请输入课程名称' : '请输入活动名称'} >
                    {goodsType == 'koubei_course' ? '课程名称' : '活动名称'}
                    </InputItem>
                  )}

                 <div className='zj_goodsCover_adjust'>
                    {getFieldDecorator('goodsCover', {
                        initialValue: goodsCoverForm,
                        rules: [
                            { required: true, message: goodsType == 'koubei_course' ? '请选择课程封面' : '请选择活动封面', type: 'string' },
                        ],
                      })(
                         <Item className="picture_field"
                             extra={<div>
                                 <ImagePicker
                                    files={goodsCover}
                                    action={BASE_URL + '/systemController/upload'}
                                    onChange={(files, operationType, index)=> goodsImgChange(files, operationType, index, 'cover')}
                                    selectable={goodsCover.length == 0}
                                  />
                                  <p className={style.item_desc}
                                      style={goodsCoverForm && goodsCoverForm.length  > 0 ? {color: '#A5A5A5'} : {color: '#f50'}}>
                                          {goodsCoverForm && goodsCoverForm.length  > 0 ?
                                          '上传封面' : '请选择封面'}
                                      </p>
                                  <ImagePicker style={{marginTop: '10px'}}
                                    files={pictureDetails}
                                    action={BASE_URL + '/systemController/upload'}
                                    onChange={(files, operationType, index)=> goodsImgChange(files, operationType, index, 'pictureDetails')}
                                    selectable={pictureDetails.length < 5}
                                  />
                                  <p className={style.item_desc}>上传详情</p>
                             </div>}
                             error={!!getFieldError('goodsCover')}
                             onErrorClick={() => {
                                 Toast.info(getFieldError('goodsCover').join('、'));
                             }}>
                         {goodsType == 'koubei_course' ? '课程图片' : '活动图片'}
                         </Item>
                     )}
                 </div>

                  {getFieldDecorator('price', {
                    initialValue: goodsData.price == undefined ? '' : goodsData.price+'',
                    rules: [
                        { required: true, message: goodsType == 'koubei_course' ? '请输入课程现价' : '请输入活动现价'},
                        { validator: checkPositiveNum },
                        { validator: checkPriceRule },
                        { validator: checkPriceAndYuanjia },
                    ],
                  })(
                    <InputItem className="common_require_list_item"
                        clear
                        error={!!getFieldError('price')}
                        onErrorClick={() => {
                             Toast.info(getFieldError('price').join('、'));
                        }}
                        placeholder={goodsType == 'koubei_course' ? '请输入课程现价' : '请输入活动现价'} >
                    {goodsType == 'koubei_course' ? '课程现价' : '活动现价'}
                    </InputItem>
                  )}

                  {getFieldDecorator('originalPrice', {
                    initialValue: goodsData.originalPrice == undefined ? '' : goodsData.originalPrice+'',
                    rules: [
                        { required: true, message: goodsType == 'koubei_course' ? '请输入课程原价' : '请输入活动原价' },
                        { validator: checkPositiveNum },
                        { validator: checkPriceRule },
                        { validator: checkPriceAndYuanjia },
                    ],
                  })(
                    <InputItem className="common_require_list_item"
                        clear
                        error={!!getFieldError('originalPrice')}
                        onErrorClick={() => {
                             Toast.info(getFieldError('originalPrice').join('、'));
                        }}
                        placeholder={goodsType == 'koubei_course' ? '请输入课程原价' : '请输入活动原价'} >
                    {goodsType == 'koubei_course' ? '课程原价' : '活动原价'}
                    </InputItem>
                  )}

                  {getFieldDecorator('inventory', {
                    initialValue: goodsData.inventory == undefined ? '' : goodsData.inventory+'',
                    rules: [
                        { required: true, message: goodsType == 'koubei_course' ? '请输入课程库存' : '请输入活动库存' },
                        { validator: checkInventory },
                        { validator: checkIntegerNum },
                    ],
                  })(
                    <InputItem className="common_require_list_item"
                        clear
                        error={!!getFieldError('inventory')}
                        onErrorClick={() => {
                             Toast.info(getFieldError('inventory').join('、'));
                        }}
                        placeholder="1~9999间的整数" >
                    {goodsType == 'koubei_course' ? '课程库存' : '活动库存'}
                    </InputItem>
                  )}

                  {getFieldDecorator('weight', {
                    initialValue: goodsData.weight,
                    rules: [
                        { validator: checkWeight },
                        { validator: checkIntegerNum },
                    ],
                  })(
                    <InputItem
                        clear
                        error={!!getFieldError('weight')}
                        onErrorClick={() => {
                             Toast.info(getFieldError('weight').join('、'));
                        }}
                        placeholder="排序值大的会排在前面" >
                    排序值
                    </InputItem>
                  )}

                 <div className='zj_goodsOrg_and_gmtStartType_adjust'>
                      {getFieldDecorator('goodsOrg', {
			            initialValue: goodsData.goodsOrg,
			            rules: [
			                { required: true, message: '请选择适用门店', type: 'string' },
			            ],
			          })(
			            <Item
			                className="common_require_list_item my_list_line_item"
			                 extra={getOrgSelectExtra()}
			                 arrow="horizontal"
			                 onClick={popGoodsOrg}
			                 error={!!getFieldError('goodsOrg')}
			                 onErrorClick={() => {
			                    Toast.info(getFieldError('goodsOrg').join('、'));
			                 }}
			             >适用门店</Item>
			        )}

                    {!isGoodsUpdate && getFieldDecorator('gmtStartType', {
                        initialValue: goodsData.gmtStartType || '',
                        rules: [
                            { required: true, message: '请选择上架时间', type: 'string' },
                        ],
                      })(
                        <Item
                            className="common_require_list_item my_list_line_item"
                             extra={gmtStartTypeMsg}
                             arrow="horizontal"
                             disabled={isGoodsUpdate}
                             onClick={!isGoodsUpdate && popMgtStartTypeSelect}
                             error={!!getFieldError('gmtStartType')}
                             onErrorClick={() => {
                                Toast.info(getFieldError('gmtStartType').join('、'));
                             }}
                         >上架时间</Item>
                    )}
                 </div>
                 {((!isGoodsUpdate && getFieldValue('gmtStartType')==='2') || (isGoodsUpdate && goodsData.gmtStart)) && getFieldDecorator('gmtStart', {
                    initialValue: gmtStartInitM || '',
                    rules: [
                        { validator: checkGmtStart },
                    ],
                  })(
                        <DatePicker
                          mode="datetime"
                          extra={mgtStartMsg}
                          format={()=>mgtStartMsg}
                          minDate={moment().startOf('day')}
                          disabled={isGoodsUpdate}
                        >
                          <Item
                              className="common_require_list_item activity_time_item my_list_line_item  zj_koubei_shangjiashijian"
                              extra={mgtStartMsg}
                              arrow="horizontal"
                              disabled={isGoodsUpdate}
                              error={!!getFieldError('gmtStart')}
                         >售卖开始时间</Item>
                        </DatePicker>
                  )}
                 
                 {((!isGoodsUpdate && getFieldValue('gmtStartType')==='2') || (isGoodsUpdate && goodsData.gmtEnd)) && getFieldDecorator('gmtEnd', {
                    initialValue: gmtEndInitM || '',
                    rules: [
                        { validator: checkGmtStart },
                    ],
                  })(
                        <DatePicker
                          mode="datetime"
                          extra={mgtEndMsg}
                          format={()=>mgtEndMsg}
                          minDate={moment().startOf('day')}
                          disabled={isGoodsUpdate}
                        >
                          <Item
                              className="common_require_list_item activity_time_item my_list_line_item  zj_koubei_shangjiashijian"
                              extra={mgtEndMsg}
                              arrow="horizontal"
                              disabled={isGoodsUpdate}
                              error={!!getFieldError('gmtStart')}
                         >售卖结束时间</Item>
                        </DatePicker>
                  )}
                 
                 <div className='zj_goodsOrg_and_gmtStartType_adjust'>
                 	{getFieldDecorator('validityPeriodType', {
                        initialValue: ((goodsData.validity_period_type || '') == 'FIXED' ? '1' : '2'),
                        rules: [
                            { required: true, message: '请选择核销有效期类型', type: 'string' },
                        ],
                      })(
                        <Item
                            className="common_require_list_item my_list_line_item"
                             extra={gmtValidateTypeMsg}
                             arrow="horizontal"
                             disabled={isGoodsUpdate || (getFieldValue('gmtStartType')==='1')}
                             onClick={!(isGoodsUpdate || (getFieldValue('gmtStartType')==='1')) && popValidateTypeSelect}
                             error={!!getFieldError('validityPeriodType')}
                             onErrorClick={() => {
                                Toast.info(getFieldError('validityPeriodType').join('、'));
                             }}
                         >核销有效期类型</Item>
                    )}
				
				{getFieldValue('validityPeriodType')==='1' && getFieldDecorator('validityPeriodRangeFrom', {
                    initialValue: goodsData.validityPeriodRangeFrom || '',
                    rules: [
                        { validator: checkGmtStart },
                    ],
                  })(
                        <DatePicker
                          mode="datetime"
                          extra={validateStartMsg}
                          format={()=>validateStartMsg}
                          minDate={moment().startOf('day')}
                        >
                          <Item
                              className="common_require_list_item activity_time_item my_list_line_item  zj_koubei_shangjiashijian"
                              extra={validateStartMsg}
                              arrow="horizontal"
                              error={!!getFieldError('validityPeriodRangeFrom')}
                         >核销开始时间</Item>
                        </DatePicker>
                  )}
                 
                 {getFieldValue('validityPeriodType')==='1' && getFieldDecorator('validityPeriodRangeTo', {
                    initialValue: goodsData.validityPeriodRangeTo || '',
                    rules: [
                        { validator: checkGmtStart },
                    ],
                  })(
                        <DatePicker
                          mode="datetime"
                          extra={validateEndMsg}
                          format={()=>validateEndMsg}
                          minDate={moment().startOf('day')}
                        >
                          <Item
                              className="common_require_list_item activity_time_item my_list_line_item  zj_koubei_shangjiashijian"
                              extra={validateEndMsg}
                              arrow="horizontal"
                              error={!!getFieldError('validityPeriodRangeTo')}
                         >核销结束时间</Item>
                        </DatePicker>
                  )}
		
                  {getFieldValue('validityPeriodType')==='2' && getFieldDecorator('validityPeriod', {
                    initialValue: goodsData.validityPeriod == undefined ? '' : goodsData.validityPeriod+'',
                    rules: [
                        { required: true, message: '请输入有效天数' },
                        { validator: checkValidityPeriod },
                        { validator: checkIntegerNum },
                    ],
                  })(
                    <InputItem className="common_require_list_item"
                        clear
                        error={!!getFieldError('validityPeriod')}
                        onErrorClick={() => {
                             Toast.info(getFieldError('validityPeriod').join('、'));
                        }}
                        placeholder="用户购买后有效期限" >
                    有效天数
                    </InputItem>
                  )}
                  
                  </div>
            </List>

            <div className='zj_koubei_choose_categoryId'>
                <Picker extra="请选择商品类目"
                    data={categoryIdList}
                    title="商品类目"
                    {...getFieldProps('categoryId', {
                        initialValue: goodsData && goodsData.categoryPath || [],
                    })}
                    >
                    <List.Item arrow="horizontal">商品类目</List.Item>
                </Picker>
            </div>

            <div className='zj_tabs'>
                <List renderHeader={() => '请选择类型'}>
                    <SegmentedControl
                        values={['早教模板', '自定义']}
                        tintColor={'#ef5522'}
                        style={{height:'100%',width: '80%',border:'1px solid #ef5522',marginLeft:'10%'}}
                        selectedIndex={parseInt(tabsDefaultValue) - 1}
                        onValueChange={TabsOnChange}
                    />
                </List>
            </div>

            { tabsDefaultValue == '1' ?
                <div>
                    <div key='tabs_course_modal'>
                        <List
                            renderHeader={() => '商品简介'}
                            renderFooter={null}
                         >
                             {courseDescRender}
                        </List>

                        <div className='zj_koubei_course_or_koubei_activity'>
                            {goodsType == 'koubei_course' ?
                            (<List
                                renderHeader={() => '课程描述'}
                                renderFooter={null}
                              >

                                 {getFieldDecorator('courseCat', {
                                    initialValue: goodsData.courseCat || '',
                                    rules: [
                                        { required: true, message: '请选择课程类型', type: 'string' },
                                    ],
                                  })(
                                    <Item
                                        className="common_require_list_item my_list_line_item"
                                         extra={getFieldValue('courseCat') || "请选择课程类型"}
                                         arrow="horizontal"
                                         onClick={popCourseType}
                                         error={!!getFieldError('courseCat')}
                                         onErrorClick={() => {
                                            Toast.info(getFieldError('courseCat').join('、'));
                                         }}
                                     >课程类型</Item>
                                )}

                                {getFieldDecorator('courseAge', {
                                    initialValue: goodsData.courseAge || '',
                                    rules: [
                                        { required: true, message: '请选择适合年龄', type: 'string' },
                                    ],
                                  })(
                                    <Item
                                        className="common_require_list_item my_list_line_item"
                                         extra={getFieldValue('courseAge') || "请选择适合年龄"}
                                         arrow="horizontal"
                                         onClick={popCourseAge}
                                         error={!!getFieldError('courseAge')}
                                         onErrorClick={() => {
                                            Toast.info(getFieldError('courseAge').join('、'));
                                         }}
                                     >适合年龄</Item>
                                )}

                                {getFieldDecorator('courseHour', {
                                    initialValue: courseHour || '',
                                    rules: [
                                        { required: true, message: '请输入课时数' },
                                        { validator: checkPositiveNum },
                                        { validator: checkIntegerNum },
                                    ],
                                  })(
                                    <InputItem className="common_require_list_item"
                                        clear
                                        error={!!getFieldError('courseHour')}
                                        onErrorClick={() => {
                                             Toast.info(getFieldError('courseHour').join('、'));
                                        }}
                                        placeholder="请输入课时数" >
                                    课时数
                                    </InputItem>
                                  )}

                                  {getFieldDecorator('courseDuring', {
                                    initialValue: courseDuring || '',
                                    rules: [
                                        { required: true, message: '请输入每节时长' },
                                        { validator: checkPositiveNum },
                                        { validator: checkIntegerNum },
                                    ],
                                  })(
                                    <InputItem className="common_require_list_item"
                                        clear
                                        error={!!getFieldError('courseDuring')}
                                        onErrorClick={() => {
                                             Toast.info(getFieldError('courseDuring').join('、'));
                                        }}
                                        placeholder="请输入每节时长" >
                                    每节时长
                                    </InputItem>
                                  )}

                              </List>)
                            :
                            goodsType == 'koubei_activity' ?

                            (<List
                                renderHeader={() => '活动简介'}
                                renderFooter={null}
                              >

                                  {getFieldDecorator('activityTimeBegin', {
                                    initialValue: goodsData.activityTimeBegin || '',
                                    rules: [
                                        { required: true, message: '请选择活动开始时间', type: 'object' },
                                        { validator: checkActivityTime },
                                    ],
                                  })(
                                    <DatePicker
                                      mode="datetime"
                                      extra={activityTimeBeginMsg}
                                      format={()=>activityTimeBeginMsg}
                                    >
                                      <Item
                                          className="common_require_list_item activity_time_item my_list_line_item"
                                          extra={activityTimeBeginMsg}
                                          arrow="horizontal"
                                          error={!!getFieldError('activityTimeBegin')}
                                     >活动开始时间</Item>
                                    </DatePicker>
                                  )}

                                  {getFieldDecorator('activityTimeEnd', {
                                    initialValue: goodsData.activityTimeEnd || '',
                                    rules: [
                                        { required: true, message: '请选择活动结束时间', type: 'object' },
                                        { validator: checkActivityTime },
                                    ],
                                  })(
                                    <DatePicker
                                      mode="datetime"
                                      extra={activityTimeEndMsg}
                                      format={()=>activityTimeEndMsg}
                                    >
                                      <Item
                                          className="common_require_list_item activity_time_item my_list_line_item"
                                         arrow="horizontal"
                                         extra={activityTimeEndMsg}
                                         error={!!getFieldError('activityTimeEnd')}
                                     >活动结束时间</Item>
                                    </DatePicker>
                                  )}

                                  {getFieldDecorator('activityAddr', {
                                    initialValue: goodsData.activityAddr || '',
                                    rules: [
                                        { required: true, message: '请输入活动地址', type: 'string' },
                                        { max: 200 , message : '限200汉字以内'},
                                        { validator: checkWrongWord },
                                        { validator: checkOnlyNum },
                                    ],
                                  })(
                                    <TextareaItem className="common_require_list_item"
                                        clear
                                        error={!!getFieldError('activityAddr')}
                                        onErrorClick={() => {
                                             Toast.info(getFieldError('activityAddr').join('、'));
                                        }}
                                        rows={2}
                                        title="活动地址"
                                        placeholder='请输入活动地址' />
                                  )}

                                  {getFieldDecorator('courseAge', {
                                    initialValue: goodsData.courseAge || '',
                                    rules: [
                                        { required: true, message: '请选择适合年龄', type: 'string' },
                                    ],
                                  })(
                                    <Item
                                        className="common_require_list_item my_list_line_item"
                                         extra={getFieldValue('courseAge') || "请选择适合年龄"}
                                         arrow="horizontal"
                                         onClick={popCourseAge}
                                         error={!!getFieldError('courseAge')}
                                         onErrorClick={() => {
                                            Toast.info(getFieldError('courseAge').join('、'));
                                         }}
                                     >适合年龄</Item>
                                )}

                              </List>)
                            :null
                            }
                        </div>
                    </div>
                    <div key='tabs_extra_modal'>
                        <List
                            renderHeader={() => '补充信息'}
                            renderFooter={null}
                          >
                            <div key='tabs_extra'>
                                    {getFieldDecorator('reservation', {
                                        initialValue: goodsData.reservation || '',
                                        rules: [
                                            { max: 200 , message : '限200汉字以内'},
                                            { validator: checkWrongWord },
                                            { validator: checkOnlyNum },
                                        ],
                                      })(
                                        <InputItem
                                            clear
                                            error={!!getFieldError('reservation')}
                                            onErrorClick={() => {
                                                 Toast.info(getFieldError('reservation').join('、'));
                                            }}
                                            placeholder='请输入预约信息' >
                                        预约信息
                                        </InputItem>
                                      )}

                                      {getFieldDecorator('fitPerson', {
                                        initialValue: goodsData.fitPerson || '',
                                        rules: [
                                            { max: 200 , message : '限200汉字以内'},
                                            { validator: checkWrongWord },
                                            { validator: checkOnlyNum },
                                        ],
                                      })(
                                        <InputItem
                                            clear
                                            error={!!getFieldError('fitPerson')}
                                            onErrorClick={() => {
                                                 Toast.info(getFieldError('fitPerson').join('、'));
                                            }}
                                            placeholder='请输入试用人群' >
                                        试用人群
                                        </InputItem>
                                      )}

                                      {getFieldDecorator('ruleRemind', {
                                        initialValue: goodsData.ruleRemind || '',
                                        rules: [
                                            { max: 200 , message : '限200汉字以内'},
                                            { validator: checkWrongWord },
                                            { validator: checkOnlyNum },
                                        ],
                                      })(
                                        <InputItem
                                            clear
                                            error={!!getFieldError('ruleRemind')}
                                            onErrorClick={() => {
                                                 Toast.info(getFieldError('ruleRemind').join('、'));
                                            }}
                                            placeholder='请输入规则提醒' >
                                        规则提醒
                                        </InputItem>
                                      )}
                                </div>

                        </List>
                    </div>
                </div>
                :
                <div>
                    <div key='tabs_free_define_course'>
                        <List
                            renderHeader={() => '商品简介'}
                            renderFooter={null}
                          >
                        </List>
                        { customCourseArray || [] }
                    </div>
                    <div key='tabs_free_define_extra'>
                        <List
                            renderHeader={() => '补充信息'}
                            renderFooter={null}
                          >
                        { customExtraArray || [] }
                        </List>
                    </div>
                </div>
            }

            <List
                renderHeader={()=>(
                    <div style={{height: '48px'}}></div>
                )}
                renderFooter={null}
              >
              <Button
                  inline
                  type="primary"
                  onClick={koubeiGoodsFormSubmit}
                  className={style.koubei_h5_form_submit_btn}>
                  提交
                </Button>
            </List>
        </div>
    );
}

let KoubeiGoodsCourseTypeComponent = React.createClass({
    getInitialState() {
        return {
            courseTypeList: this.props.courseTypeList,
            courseCat: this.props.courseCat || '',
        };
    },

    changeCourseTypeValue(item,e) {
        let courseCat = this.state.courseCat || '';
        let handleType = e.target.checked;//操作类型  true 选中  false 取消选中
        if(handleType) {
            if(courseCat == '') {
                courseCat += item.name;
            } else {
                courseCat += ',' + item.name;
            }
        } else {
            let courseTypeArr = courseCat.split(',');
            let new_courseTypeArr = [];
            courseTypeArr && courseTypeArr.length > 0 && courseTypeArr.map(function(courseType_item) {
                if(courseType_item != item.name) {
                    new_courseTypeArr.push(courseType_item);
                }
            });
            courseCat = new_courseTypeArr.join(',');
        }
        this.setState({
            courseCat
        });
    },

    render() {
        let {courseTypeList, courseCat} = this.state;
        return (
            <div>
                <List
                   renderHeader={() => (
                        <div className={style.course_type_select_cont}>
                            <span className={style.pop_close_btn_cont}>
                                <Button
                                    className={style.pop_close_btn}
                                    inline size="small"
                                    onClick={this.props.closePop}>取消</Button>
                            </span>
                            <span className={style.pop_title}>课程类型</span>
                            <span className={style.pop_submit_btn_cont}>
                                <Button
                                    className={style.pop_submit_btn}
                                    inline
                                    size="small"
                                    type="primary"
                                    onClick={() => this.props.changeCourseType(courseCat)}>确定</Button>
                            </span>

                        </div>
                    )} >
                    <div className={style.pop_cont}>
                       {courseTypeList.map(item => {
                           let courseTypeArr = courseCat.split(',');
                           let check = false;
                           courseTypeArr && courseTypeArr.length > 0 && courseTypeArr.map(function(typeItem) {
                               if(!check) {
                                   check = typeItem == item.name;
                               }
                           });
                           return (
                              <CheckboxItem key={item.id} checked={check} onChange={(e) => this.changeCourseTypeValue(item,e)}>
                                {item.name}
                              </CheckboxItem>
                            )
                        })}
                    </div>
                </List>
            </div>
        );
    }
});

//课程类型checkbox选择框
let KoubeiGoodsCourseAgeComponent = React.createClass({
    getInitialState() {
        return {
            courseAgeList: this.props.courseAgeList,
            courseAge: this.props.courseAge || '',
        };
    },

    changeCourseAgeValue(item,e) {
        let courseAge = this.state.courseAge || '';
        let handleType = e.target.checked;//操作类型  true 选中  false 取消选中
        if(handleType) {
            if(courseAge == '') {
                courseAge += item.dictName;
            } else {
                courseAge += ',' + item.dictName;
            }
        } else {
            let courseAgeArr = courseAge.split(',');
            let new_courseAgeArr = [];
            courseAgeArr && courseAgeArr.length > 0 && courseAgeArr.map(function(courseAge_item) {
                if(courseAge_item != item.dictName) {
                    new_courseAgeArr.push(courseAge_item);
                }
            });
            courseAge = new_courseAgeArr.join(',');
        }
        this.setState({
            courseAge
        });
    },

    render() {
        let {courseAgeList, courseAge} = this.state;
        return (
            <div>
                <List
                   renderHeader={() => (
                        <div className={style.course_type_select_cont}>
                            <span className={style.pop_close_btn_cont}>
                                <Button
                                    className={style.pop_close_btn}
                                    inline size="small"
                                    onClick={this.props.closePop}>取消</Button>
                            </span>
                            <span className={style.pop_title}>适合年龄</span>
                            <span className={style.pop_submit_btn_cont}>
                                <Button
                                    className={style.pop_submit_btn}
                                    inline
                                    size="small"
                                    type="primary"
                                    onClick={() => this.props.changeCourseAge(courseAge)}>确定</Button>
                            </span>

                        </div>
                    )} >
                    <div className={style.pop_cont}>
                       {courseAgeList.map(item => {
                           let courseAgeArr = courseAge.split(',');
                           let check = false;
                           courseAgeArr && courseAgeArr.length > 0 && courseAgeArr.map(function(ageItem) {
                               if(!check) {
                                   check = ageItem == item.dictName;
                               }
                           });
                           return (
                              <CheckboxItem key={item.id} checked={check} onChange={(e) => this.changeCourseAgeValue(item,e)}>
                                {item.dictName}
                              </CheckboxItem>
                            )
                        })}
                    </div>
                </List>
            </div>
        );
    }
});

//商品上架时间类型选择框
let KoubeiGoodsGmtStartTypeComponent = React.createClass({
    getInitialState() {
        return {
            selectedValue: this.props.selectedValue || '',
        };
    },

    changeSelectItem(item,e) {
        this.setState({
            selectedValue: item
        });
    },

    render() {
        let {selectedValue} = this.state;
        return (
            <div>
                <List
                   renderHeader={() => (
                        <div className={style.course_type_select_cont}>
                            <span className={style.pop_close_btn_cont}>
                                <Button
                                    className={style.pop_close_btn}
                                    inline size="small"
                                    onClick={this.props.closePop}>取消</Button>
                            </span>
                            <span className={style.pop_title}>商品上架时间</span>
                            <span className={style.pop_submit_btn_cont}>
                                <Button
                                    className={style.pop_submit_btn}
                                    inline
                                    size="small"
                                    type="primary"
                                    onClick={() => this.props.changeSelectValue(selectedValue)}>确定</Button>
                            </span>

                        </div>
                    )} >
                    <div className={style.pop_cont}>
                       <CheckboxItem key='1' checked={selectedValue=='1'} onChange={(e) => this.changeSelectItem('1',e)}>
                        立即上架
                      </CheckboxItem>
                      <CheckboxItem key='2' checked={selectedValue=='2'} onChange={(e) => this.changeSelectItem('2',e)}>
                        指定时间
                      </CheckboxItem>
                    </div>
                </List>
            </div>
        );
    }
});

//商品核销类型选择框
let KoubeiGoodsValidateTypeComponent = React.createClass({
    getInitialState() {
        return {
            selectedValue: this.props.selectedValue || '',
        };
    },

    changeSelectItem(item,e) {
        this.setState({
            selectedValue: item
        });
    },

    render() {
        let {selectedValue} = this.state;
        return (
            <div>
                <List
                   renderHeader={() => (
                        <div className={style.course_type_select_cont}>
                            <span className={style.pop_close_btn_cont}>
                                <Button
                                    className={style.pop_close_btn}
                                    inline size="small"
                                    onClick={this.props.closePop}>取消</Button>
                            </span>
                            <span className={style.pop_title}>核销有效期类型</span>
                            <span className={style.pop_submit_btn_cont}>
                                <Button
                                    className={style.pop_submit_btn}
                                    inline
                                    size="small"
                                    type="primary"
                                    onClick={() => this.props.changeSelectValue(selectedValue)}>确定</Button>
                            </span>

                        </div>
                    )} >
                    <div className={style.pop_cont}>
                       <CheckboxItem key='1' checked={selectedValue=='1'} onChange={(e) => this.changeSelectItem('1',e)}>
                        绝对时间段
                      </CheckboxItem>
                      <CheckboxItem key='2' checked={selectedValue=='2'} onChange={(e) => this.changeSelectItem('2',e)}>
                        相对有效期
                      </CheckboxItem>
                    </div>
                </List>
            </div>
        );
    }
});

export default createForm()(KoubeiGoodsFormComponent);
