import React, {PropTypes} from 'react';
import style from './PublicModalOneTopicList.less';
import { Accordion,List,Button,NavBar,Icon,ActivityIndicator,WingBlank,Toast } from 'antd-mobile';

function PublicModalOneTopicList({
	pageSize,pageIndex,topicListModalOne,dataLoading,TopicShowToastModalOne,
    readMoreColumnList,randomColor,backToColumn,columnTitle,
}) {
    let TopicId = -1;   //从序列为0开始
    let children = [];  //主题数组
    let grandson = [];  //文章数组
    let check = [];  //检查此栏目是否没有主题
    //let border = '4px ridge '+randomColor;
    let border = '4px ridge #000000';
    if(topicListModalOne && topicListModalOne.length > 0){
        children = topicListModalOne.map((item) => {
            TopicId += 1;     //从序列为0开始
            check.push('1');   //判断该栏目是否有主题存在
            if(topicListModalOne[TopicId].articleList && (topicListModalOne[TopicId].articleList).length > 0){
                grandson = (topicListModalOne[TopicId].articleList).map((item) => {
                    return(
                        <List.Item key={item.id+''} className={style.ArticleListItem} onClick={() => listItemClick(item.article_url)}>{item.article_name}</List.Item>
                    );
                });
                return (<div className={style.TopicListItem} key={item.id+''} onClick={() => listItemClick(item.themeUrl)}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Panel header={item.themeName&&item.themeName.length>16?(item.themeName).substring(0,16)+'...':item.themeName}>
                                    <List>
                                       {topicListModalOne[TopicId].articleList?
                                        ((topicListModalOne[TopicId].articleList).length > 0 ? grandson : [] ) : []}
                                    </List>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                );
            }else if(topicListModalOne[TopicId].articleList && (topicListModalOne[TopicId].articleList).length == 0){
                return (<div className={style.TopicListItem} key={item.id+''} onClick={() => listItemClick(item.themeUrl)}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Panel header={item.themeName}>
                                    <List>
                                    </List>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                );
            }
        });
    }else{
        check.push('0');
    }

    //主题文章列表为空显示内容
    const isEmpty = (
        <div className={style.isEmpty} style={{color:'#000000'}}>
            <Icon type="heart" />请静心等待新的内容喵๑乛◡乛๑
        </div>
    );

    //主题文章列表不为空显示内容
    const notEmpty = (
        <div className={style.TopicList}>
            {children||[]}
        </div>
    );

    //回到顶部
    const toTop = (
        <a href='javascript:window.scrollTo(0,0);' className={style.backTop} style={{color:'#000000'}}><Icon type="arrow-up"/></a>
    );
    function backToColumnList(){
        setTimeout(backToColumn,300);
    }
    function listItemClick(link){
        setTimeout(toLink,300,link);
    }
    function toLink(link){
        window.open(link);
    }
    return (
        <div className={style.allListView}>
            <div className={style.NavBar}>
                <NavBar
                    leftContent="返回"
                    mode="light"
                    onLeftClick={backToColumnList}
                    rightContent=''
                    style={{color:'#000000'}}
                >{columnTitle&&columnTitle.length>10?columnTitle.substring(0,10)+'...':columnTitle}</NavBar>
            </div>
            {check.length==1&&check[0]=='0'?isEmpty:notEmpty}
            <WingBlank>
                <div className="toast-example">
                  <ActivityIndicator
                    toast
                    text="正在加载"
                    animating={TopicShowToastModalOne}
                  />
                </div>
            </WingBlank>
            {toTop}
        </div>
    );
}

PublicModalOneTopicList.propTypes = {
    pageSize : PropTypes.any,
    pageIndex : PropTypes.any,
    topicListModalOne : PropTypes.any,
    dataLoading : PropTypes.any,
    randomColor : PropTypes.any,
    columnTitle : PropTypes.any,
    readMoreColumnList : PropTypes.func,
    backToColumn : PropTypes.func,
};

export default PublicModalOneTopicList;
