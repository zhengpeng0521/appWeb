import React from 'react';
import styles from './SearchComponent.less';
import { SearchBar ,ActivityIndicator } from 'antd-mobile';

function SearchComponent({
	accountArr,
    search,
    serachChange,
    accountFunc,
    modalLoading,
}) {
    function searchChangeFunc(search){
        serachChange(search);
    }

    return(
        <div className='search'>
           <ActivityIndicator text="加载中..." toast animating ={modalLoading} />
           <SearchBar placeholder="请输入支行名称" maxLength={16} onChange={searchChangeFunc} />
           <div className={styles.bankList} >
               {
                   accountArr && accountArr.map(function(item,index){
                       return(
                           <div className={styles.account} key={index+'_'} onClick={()=>accountFunc(item.bankName,item.bankCode)}>
                               <div className={styles.content}>{item.bankName}</div>
                           </div>
                       )
                   })
               }
           </div>
        </div>
    );
}

export default SearchComponent;
