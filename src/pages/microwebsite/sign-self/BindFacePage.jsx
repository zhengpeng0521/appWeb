import React from "react"
import { connect } from "dva"
import { routerRedux } from "dva/router"
import lrz from "lrz"
import { WingBlank, Button, Toast, Flex, Icon } from "antd-mobile"
import EXIF from "exif-js"
import styles from "./BindFacePage.less"

function BindFacePage({ dispatch, bindFaceModel }) {
  let {
    tenantId,
    orgId,
    mobile,
    parentId,
    stuName,
    url,
    stuId,
    parentInfo,

    imgUrl
  } = bindFaceModel

  /** 选取图片并压缩 */
  function changeHandle(e) {
    dispatch(
      routerRedux.push({
        pathname: "/microSignSelf",
        query: {
          tenantId,
          orgId,
          mobile,
          parentId,
          stuName,
          url,
          stuId
        }
      })
    )
    dispatch({
      type: "signSelfModel/updateState",
      payload: {
        activeKey: "face"
      }
    })
    window.COMMON_DATA.signSelfListen = false
    Toast.loading("正在上传", 0)
    // 图片处理
    let files = e.target.files
    // lrz(files[0], { quality: 0.1 }).then(rst => {
    //     // 处理成功会执行
    //     console.log("压缩成功", rst)
    //     uploadPic(rst.base64)
    //   }).catch(err => {
    //     // 处理失败会执行
    //     Toast.fail("压缩失败!")
    //   })

    let oReader = new FileReader()
    let file = files[0]
    let Orientation = null
    //获取照片方向角属性，用户旋转控制
    EXIF.getData(file, function() {
      EXIF.getAllTags(this)
      Orientation = EXIF.getTag(this, "Orientation")
    })

    oReader.readAsDataURL(file)
    oReader.onload = function(e) {
      let image = new Image()
      image.src = e.target.result
      image.onload = function() {
        let expectWidth = this.naturalWidth
        let expectHeight = this.naturalHeight

        let canvas = document.createElement("canvas")
        let ctx = canvas.getContext("2d")
        canvas.width = expectWidth
        canvas.height = expectHeight
        ctx.drawImage(this, 0, 0, expectWidth, expectHeight)
        let base64 = null
        //修复ios
        if (navigator.userAgent.match(/iphone/i)) {
          //如果方向角不为1，都需要进行旋转 added by lzk
          if (Orientation != "" && Orientation != 1) {
            switch (Orientation) {
              case 6: //需要顺时针（向左）90度旋转
                rotateImg(this, "left", canvas)
                break
              case 8: //需要逆时针（向右）90度旋转
                rotateImg(this, "right", canvas)
                break
              case 3: //需要180度旋转  //转两次
                rotateImg(this, "right", canvas)
                rotateImg(this, "right", canvas)
                break
            }
          }
          base64 = canvas.toDataURL("image/jpeg", 0.1)
        } else if (navigator.userAgent.match(/Android/i)) {
          // 修复android

          if (Orientation != "" && Orientation != 1) {
            switch (Orientation) {
              case 6: //需要顺时针（向左）90度旋转
                rotateImg(this, "left", canvas)
                break
              case 8: //需要逆时针（向右）90度旋转
                rotateImg(this, "right", canvas)
                break
              case 3: //需要180度旋转 //转两次
                rotateImg(this, "right", canvas)
                rotateImg(this, "right", canvas)
                break
            }
          }
          base64 = canvas.toDataURL("image/jpeg", 0.1)
        } else {
          if (Orientation != "" && Orientation != 1) {
            switch (Orientation) {
              case 6: //需要顺时针（向左）90度旋转
                rotateImg(this, "left", canvas)
                break
              case 8: //需要逆时针（向右）90度旋转
                rotateImg(this, "right", canvas)
                break
              case 3: //需要180度旋转 //转两次
                rotateImg(this, "right", canvas)
                rotateImg(this, "right", canvas)
                break
            }
          }
          base64 = canvas.toDataURL("image/jpeg", 0.1)
        }
        uploadPic(base64)
      }
    }
  }

  //对图片旋转处理
  function rotateImg(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0
    var max_step = 3
    if (img == null) return
    var height = img.height
    var width = img.width
    var step = 2
    if (step == null) {
      step = min_step
    }
    if (direction == "right") {
      step++
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step)
    } else {
      step--
      step < min_step && (step = max_step)
    }
    //旋转角度以弧度值为参数
    var degree = (step * 90 * Math.PI) / 180
    var ctx = canvas.getContext("2d")
    switch (step) {
      case 0:
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
        break
      case 1:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, 0, -height)
        break
      case 2:
        canvas.width = width
        canvas.height = height
        ctx.rotate(degree)
        ctx.drawImage(img, -width, -height)
        break
      case 3:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, -width, 0)
        break
    }
  }

  /** 上传文件 */
  function uploadPic(base64) {
    // 上传图片
    dispatch({
      type: "signSelfModel/uploadImg",
      payload: {
        file: base64,
        parentInfo
      }
    })
  }

  return (
    <div className={styles.bind_container}>
      <div className={styles.read_me}>
        <Flex className={styles.common_box}>
          <div className={styles.box_left}>
            <img src="https://img.ishanshan.com/gimg/user/n///1555055320.png" />
            <Icon type="check-circle" className={styles.box_icon_right} />
          </div>
          <div className={styles.box_right}>
            <p>光线充足</p>
            <p>正对手机</p>
          </div>
        </Flex>
        <Flex className={styles.common_box}>
          <div className={styles.box_left}>
            <img src="https://img.ishanshan.com/gimg/user/n///1555056622.png" />
            <Icon type="cross-circle" className={styles.box_icon} />
          </div>
          <div className={styles.box_right}>不要遮挡脸部</div>
        </Flex>
        <Flex className={styles.common_box}>
          <div className={styles.box_left}>
            <img src="https://img.ishanshan.com/gimg/user/n///1555056777.png" />
            <Icon type="cross-circle" className={styles.box_icon} />
          </div>
          <div className={styles.box_right}>不要斜视手机</div>
        </Flex>
      </div>

      <WingBlank className={styles.image_btn_box}>
        <div className={styles.image_btn}>
          <input type="file" accept="image/*" onChange={changeHandle} />
        </div>
        <Button type="primary">开始拍摄</Button>
      </WingBlank>
    </div>
  )
}

const mapStateToProps = ({ bindFaceModel }) => ({ bindFaceModel })

export default connect(mapStateToProps)(BindFacePage)
