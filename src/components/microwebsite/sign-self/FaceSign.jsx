import React from 'react';
import { WingBlank, WhiteSpace, List, Flex } from 'antd-mobile';
import styles from './FaceSign.less'

const Item = List.Item;

function FaceSign({
  stuName,
  faceUrl,
  headimgurl,
  isBind,
  parentsFace,

  toSignRecord, // 签到记录
  goBindFace    // 绑定人脸
}){

  function extra(isBind, parentInfo){
    return (
      <Flex justify="center" className={styles.bind_btn} onClick={goBindFace.bind(this, parentInfo)}>
        <img src={isBind ? 'https://img.ishanshan.com/gimg/user/n///1555053308.png' : 'https://img.ishanshan.com/gimg/user/n///1555053252.png'} />
        <span>{isBind ? '重设人脸' : '绑定人脸'}</span>
      </Flex>
    )
  }

  return (
    <div className={styles.face_box}>
      <WingBlank>
        <WhiteSpace size="lg" />
        <p className={styles.face_tip}>在签到机刷脸即可签到</p>
        <WhiteSpace />
      </WingBlank>
      <List className={styles.face_sign_list}>
        <Item
          thumb={<div className={styles.item_img} style={{ backgroundImage: `url(${faceUrl && faceUrl != '' ? faceUrl : headimgurl})`, backgroundSize: faceUrl ? '1.6rem' : 'auto' }} />}
          extra={extra(isBind)}
          multipleLine
        >
          {stuName}
        </Item>
      </List>

      <WingBlank>
        <WhiteSpace size="lg" />
        <p className={styles.face_tip}>家长绑定人脸后可替孩子刷脸签到</p>
        <WhiteSpace />
      </WingBlank>

      <List className={styles.face_sign_list}>
        {parentsFace.length > 0 && parentsFace.map((parent, index) => (
          <Item
            key={`parentFace${index}`}
            thumb={<div className={styles.item_img} style={{ backgroundImage: `url(${parent.faceUrl && parent.faceUrl != '' ? parent.faceUrl : headimgurl})`, backgroundSize: parent.faceUrl ? '1.6rem' : 'auto'  }} />}
            extra={extra(parent.isBind, parent)}
            multipleLine
          >
            {parent.parentName}
          </Item>
        ))}
      </List>
      <div className={styles.leave_record_cont}>
        <a className={styles.leave_record_text} onClick={toSignRecord}>签到记录 >></a>
      </div>
    </div>
  )
}

export default FaceSign
