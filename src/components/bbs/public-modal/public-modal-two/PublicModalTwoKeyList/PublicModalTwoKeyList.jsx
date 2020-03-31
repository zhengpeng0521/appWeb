import React, {PropTypes} from 'react';
import style from './PublicModalTwoKeyList.less';
import { SearchBar, Accordion, List, ActivityIndicator,WingBlank, Icon } from 'antd-mobile';

function PublicModalTwoKeyList({
    keyListModalTow,titleContent,
    Search,
}) {
    let TopicId = -1;   //从序列为0开始
    let children = [];  //关键词数组
    let grandson = [];  //测评项目数组
    let check = [];  //检查此栏目是否有关键词
    if(keyListModalTow && keyListModalTow.length > 0){
        children = keyListModalTow.map((item) => {
            TopicId += 1;     //从序列为0开始
            check.push('1');   //判断关键词数组是否为空，不是则push1
                if(keyListModalTow[TopicId].articleList && (keyListModalTow[TopicId].articleList).length > 0){
                    grandson = (keyListModalTow[TopicId].articleList).map((item) => {
                    return(
                        <List.Item key={item.id+''} className={style.CommentListItem} onClick={() => CommentItemClick(item.article_url)}>{item.article_name}</List.Item>
                    );
                });
                return (<div className={style.KeyListItem} key={item.id+''}>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Panel header={item.themeName}>
                            <List>
                               {keyListModalTow[TopicId].articleList?
                                ((keyListModalTow[TopicId].articleList).length > 0 ? grandson : [] ) : []}
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                </div>
                );
            }else{
                return (<div className={style.KeyListItem} key={item.id+''}>
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
    }

    function searchKey(value){
        Search(value);
    }
    function Focus(){

    }
    function Blur(){

    }
    function CommentItemClick(link){
        setTimeout(toLink,300,link);
    }
    function toLink(link){
        window.open(link);
    }
     //主题文章列表为空显示内容
    const isEmpty = (
        <div className={style.isEmpty}>
            <Icon type="smile-circle" />请静心等待新的内容哦๑乛◡乛๑
        </div>
    );

    //主题文章列表不为空显示内容
    const notEmpty = (
        <div className={style.TopicList}>
            {children||[]}
        </div>
    );
    return (
        <div className={style.alltView}>
            <div className={style.top}>
                <img className={style.picutre} src={titleContent.picture_url}/>
                <div className={style.topTitle}>{titleContent.title}</div>
                <SearchBar
                    placeholder="搜索"
                    onClear={(value) => console.log(value, 'onClear')}
                    onFocus={Focus}
                    onBlur={Blur}
                    onChange={searchKey}
                  />
            </div>
            <div className={style.list}>
            {check.length==1&&check[0]=='0'?isEmpty:notEmpty}
            </div>
        </div>
    );
}

PublicModalTwoKeyList.propTypes = {
    keyListModalTow : PropTypes.any,
    titleContent : PropTypes.any,
    Search : PropTypes.func,
};

export default PublicModalTwoKeyList;
