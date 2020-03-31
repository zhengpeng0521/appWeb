import React, { PropTypes } from 'react';
import { ActivityIndicator, Toast } from 'antd-mobile';
import KoubeiGoodsFormComponent from '../../../components/koubei/goods-manage/KoubeiGoodsFormComponent';
import { connect } from 'dva';

function KoubeiGoodsForm({ dispatch, koubeiGoodsForm }) {

    let {
        tenantId,
        merchantPid,
        formLoading,
        goodsType,
        goodsData,
        courseTypeList,
        courseAgeList,
        koubeiOrgList,
        goodsIntroList,
        orgList,

        categoryIdList,             //商品类目数据
        tabsDefaultValue,           //新增时默认的类型(0早教模板/1自定义)
        customCourseList,           //自定义时课程简介内容
        customExtraIntro,           //自定义补充说明内容
    } = koubeiGoodsForm;

    function goodsImgChange(files, operationType, index, imgType, afterChange) {
        dispatch({
        	type: 'koubeiGoodsForm/goodsImgChange',
            payload : {
                files, operationType, index, imgType, afterChange
            }
        });
    }

    function koubeiGoodsSubmit(values) {
        dispatch({
        	type: 'koubeiGoodsForm/koubeiGoodsSubmit',
            payload : {
                ...values,
                tenantId,
                merchantPid,
                goodsType: goodsType == 'koubei_course' ? '1' : goodsType == 'koubei_activity' ? '2' : '',
                id: goodsData.id||''
            }
        });
    }

    function addGoodsIntroItem() {
        dispatch({
        	type: 'koubeiGoodsForm/addGoodsIntroItem',
        });
    }

    function removeGoodsIntroItem(key) {
        dispatch({
        	type: 'koubeiGoodsForm/removeGoodsIntroItem',
            payload: {
                key,
            }
        });
    }

    //新增编辑时tabs切换事件
    function TabsOnChange(value){
        let type;
        if(value == '早教模板'){
            type = '1';
        }else if(value == '自定义'){
            type = '2';
        }
        dispatch({
            type:'koubeiGoodsForm/updateState',
            payload:{
                tabsDefaultValue : type
            }
        });
    }

    //增加一组简介事件
    function addCustomGoodsIntroItem(fatherKey,type){
       if(type == 'content'){
            if(customCourseList.length == 10){
                Toast.info('课程名称项不能少于1项或者多于10项');
            }else{
                let resultArray = customCourseList;
                let fatherIndex = -1;
                for(let i in resultArray){
                    fatherIndex ++ ;
                    if(fatherKey == resultArray[i].key){
                        break;
                    }
                }
                resultArray.splice(fatherIndex+1,0,{title:undefined,key:(parseInt(fatherKey)+1)+'',details:[{value:undefined,key:(parseInt(fatherKey)+1) + '-0'}]});
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customCourseList : resultArray
                    }
                });
            }
        }else if(type == 'suppleContent'){
            if(customExtraIntro.length == 10){
                Toast.info('补充说明项不能少于1项或者多于10项');
            }else{
                let resultArray = customExtraIntro;
                let fatherIndex = -1;
                for(let i in resultArray){
                    fatherIndex ++ ;
                    if(fatherKey == resultArray[i].key){
                        break;
                    }
                }
                resultArray.splice(fatherIndex+1,0,{title:undefined,key:(parseInt(fatherKey)+1)+'',details:[{value:undefined,key:(parseInt(fatherKey)+1) + '-0'}]});
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customExtraIntro : resultArray
                    }
                });
            }
        }
    }

    //移除一组简介事件
    function removeCustomGoodsIntroItem(fatherKey,type){
        if(type == 'content'){
            if(customCourseList.length == 1){
                Toast.info('课程名称项不能少于1项或者多于10项');
            }else{
                let resultArray = customCourseList;
                let fatherIndex = -1;
                for(let i in resultArray){
                    fatherIndex ++ ;
                    if(fatherKey == resultArray[i].key){
                        break;
                    }
                }
                resultArray.splice(fatherIndex,1);                 //剔除当前删除的元素
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customCourseList : resultArray
                    }
                });
            }
        }else if(type == 'suppleContent'){
            if(customExtraIntro.length == 1){
                Toast.info('补充说明项不能少于1项或者多于10项');
            }else{
                let resultArray = customExtraIntro;
                let fatherIndex = -1;
                for(let i in resultArray){
                    fatherIndex ++ ;
                    if(fatherKey == resultArray[i].key){
                        break;
                    }
                }
                resultArray.splice(fatherIndex,1);                 //剔除当前删除的元素
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customExtraIntro : resultArray
                    }
                });
            }
        }
    }

    //增加一个详情事件
    function addCustomGoodsDetailIntroItem(fatherKey,ownKey,type){
        let hengIndex = ownKey.indexOf('-');            //获取key值中'-'的索引值
        if(type == 'content'){
            let resultArray = customCourseList;
            let fatherIndex = -1;
            let ownIndex = -1;
            for(let i in resultArray){
                fatherIndex ++ ;
                if(fatherKey == resultArray[i].key){
                    break;
                }
            }
            for(let i in resultArray[fatherIndex].details){
                ownIndex ++ ;
                if(ownKey == (resultArray[fatherIndex].details)[i].key){
                    break;
                }
            }
            if(resultArray[fatherIndex].details.length == 10){
                Toast.info('课程详情数不得少于1项或多于10项');
            }else{
                resultArray[fatherIndex].details.splice(ownIndex+1,0,{value:undefined,key:parseInt(fatherKey) + '-' + (parseInt((ownKey+'').substr(hengIndex+1,100))+1)});     //在当前索引项之后增加元素
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customCourseList : resultArray
                    }
                });
            }
        }else if(type == 'suppleContent'){
            let resultArray = customExtraIntro;
            let fatherIndex = -1;
            let ownIndex = -1;
            for(let i in resultArray){
                fatherIndex ++ ;
                if(fatherKey == resultArray[i].key){
                    break;
                }
            }
            for(let i in resultArray[fatherIndex].details){
                ownIndex ++ ;
                if(ownKey == (resultArray[fatherIndex].details)[i].key){
                    break;
                }
            }
            if(resultArray[fatherIndex].details.length == 10){
                message.warn('补充说明详情数不得少于1项或多于10项');
            }else{
                resultArray[fatherIndex].details.splice(ownIndex+1,0,{value:undefined,key:parseInt(fatherKey) + '-' + (parseInt((ownKey+'').substr(hengIndex+1,100))+1)});                 //在当前索引项之后增加元素
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customExtraIntro : resultArray
                    }
                });
            }
        }
    }

    //移除一个详情事件
    function removeCustomGoodsDetailIntroItem(fatherKey,ownKey,type){
        if(type == 'content'){
            let resultArray = customCourseList;
            let fatherIndex = -1;
            let ownIndex = -1;
            for(let i in resultArray){
                fatherIndex ++ ;
                if(fatherKey == resultArray[i].key){
                    break;
                }
            }
            for(let i in resultArray[fatherIndex].details){
                ownIndex ++ ;
                if(ownKey == (resultArray[fatherIndex].details)[i].key){
                    break;
                }
            }
            if(resultArray[fatherIndex].details.length == 1){
                Toast.info('课程详情数不得少于1项或大多于10项');
            }else{
                resultArray[fatherIndex].details.splice(ownIndex,1);                 //剔除当前删除的元素
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customCourseList : resultArray
                    }
                });
            }
        }else if(type == 'suppleContent'){
            let resultArray = customExtraIntro;
            let fatherIndex = -1;
            let ownIndex = -1;
            for(let i in resultArray){
                fatherIndex ++ ;
                if(fatherKey == resultArray[i].key){
                    break;
                }
            }
            for(let i in resultArray[fatherIndex].details){
                ownIndex ++ ;
                if(ownKey == (resultArray[fatherIndex].details)[i].key){
                    break;
                }
            }
            if(resultArray[fatherIndex].details.length == 1){
                Toast.info('补充说明详情数不得少于1项或大多于10项');
            }else{
                resultArray[fatherIndex].details.splice(ownIndex,1);                 //剔除当前删除的元素
                dispatch({
                    type:'koubeiGoodsForm/updateState',
                    payload:{
                        customExtraIntro : resultArray
                    }
                });
            }
        }
    }

    //课程名称输入框onChange事件
    function freeContentTitleOnChange(value,fatherKey){
        let resultArray = customCourseList;
        let fatherIndex = -1;
        for(let i in resultArray){
            fatherIndex ++ ;
            if(resultArray[i].key == fatherKey){
                break;
            }
        }
        resultArray[fatherIndex].title = value;
        dispatch({
            type:'koubeiGoodsForm/updateState',
            payload:{
                customCourseList : resultArray
            }
        });
    }

    //课程详情输入框onChange事件
    function detailContentOnChange(value,ownKey){
        let resultArray = customCourseList;
        let flag = true;
        let fatherIndex = -1;
        let ownIndex;
        for(let i in resultArray){
            if(flag){
                ownIndex = -1;
                fatherIndex ++ ;
                for(let j in customCourseList[i].details){
                    ownIndex ++
                    if((customCourseList[i].details)[j].key == ownKey){
                        flag = false;
                        break;
                    }
                }
            }
        }
        resultArray[fatherIndex].details[ownIndex].value = value;
        dispatch({
            type:'koubeiGoodsForm/updateState',
            payload:{
                customCourseList : resultArray
            }
        });
    }

    //补充说明名称输入框onChange事件
    function freeContentSuppleTitleOnChange(value,fatherKey){
        let resultArray = customExtraIntro;
        let fatherIndex = -1;
        for(let i in resultArray){
            fatherIndex ++ ;
            if(resultArray[i].key == fatherKey){
                break;
            }
        }
        resultArray[fatherIndex].title = value;
        dispatch({
            type:'koubeiGoodsForm/updateState',
            payload:{
                customExtraIntro : resultArray
            }
        });
    }

    //补充说明详情输入框onChange事件
    function detailContentSuppleOnChange(value,ownKey){
        let resultArray = customExtraIntro;
        let flag = true;
        let fatherIndex = -1;
        let ownIndex;
        for(let i in resultArray){
            if(flag){
                ownIndex = -1;
                fatherIndex ++ ;
                for(let j in customExtraIntro[i].details){
                    ownIndex ++
                    if((customExtraIntro[i].details)[j].key == ownKey){
                        flag = false;
                        break;
                    }
                }
            }
        }
        resultArray[fatherIndex].details[ownIndex].value = value;
        dispatch({
            type:'koubeiGoodsForm/updateState',
            payload:{
                customExtraIntro : resultArray
            }
        });
    }


    let formProps = {
        goodsType,
        goodsData,
        courseTypeList,
        courseAgeList,
        koubeiOrgList,
        goodsIntroList,
        goodsImgChange,
        koubeiGoodsSubmit,
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

        freeContentTitleOnChange,       //课程名称输入框onChange事件
        detailContentOnChange,          //课程详情输入框onChange事件

        freeContentSuppleTitleOnChange, //补充说明名称输入框onChange事件
        detailContentSuppleOnChange,    //补充说明详情输入框onChange事件
    };

    return (
        <div>
          {formLoading?
            <ActivityIndicator toast />
          :
            null
          }
          <KoubeiGoodsFormComponent {...formProps} />
        </div>
    );
}

KoubeiGoodsForm.propTypes = {
  koubeiGoodsForm: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ koubeiGoodsForm }) {
  return { koubeiGoodsForm };
}

export default connect(mapStateToProps)(KoubeiGoodsForm);
