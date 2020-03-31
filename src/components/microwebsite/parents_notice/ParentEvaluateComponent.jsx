import React from 'react';
import styles from './ParentEvaluateComponent.less';
import EvaluateComponent from './EvaluateComponent';
import { Popup, List, TextareaItem, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
const alert = Modal.alert;
function ParentEvaluateComponent({
	saveInfo,          //提交数据
	getNum,            //得到评价级别
	picList,           //上传成功后图片视频的数组
	clickToPic,        // 点击查看大图
	cancelSaveInfo,         //取消家长评价
	resetNum,
	score,
	CHAimg,
	changePathVideo,
	changePathImg,
	gotoBack,
	isgo,
	iscosBack,
	form: {
		getFieldProps,
		getFieldsValue,
		resetFields,
	}
}) {

	//提交数据
	// function saveInfoAction() {
	// 	let values = getFieldsValue();
	// 	saveInfo(values)
	// }
	function saveInfoAction() {
		let values = getFieldsValue();
		let pic = { 'pictures': picList }
		let newV = {
			...values,
			...pic
		}
		saveInfo(newV)
	}
	function cancelSaveInfoAction() {
		resetFields();
		!!resetNum && resetNum();
		cancelSaveInfo()
	}
	let evaluateComponentProps = {
		getNum,
		score
	}
	const showAlert = () => {
		const alertInstance = alert('', '当前评价信息不会保留，是否继续？', [
			{ text: '继续', onPress: cancelSaveInfoAction, style: 'default' },
			{ text: '再想想' },
		]);
	}
	function changeAll() {
		Popup.show(<div >
			<List
				className="popup-list"
			>
				<List.Item className={styles.isItem}>
					<span>视频</span>
					<input type='file' accept='video/*' onChange={changePathVideo} /></List.Item>
				<List.Item className={styles.isItem}>
					<span>图片</span>
					<input type='file' accept='image/*' onChange={changePathImg} /></List.Item>
				<List.Item onClick={() => onClose('cancel')} style={{ borderTop: '10px solid #f0f0f0', height: '110px' }}>取消</List.Item>
			</List>
		</div>, { animationType: 'slide-up', maskClosable: false })
	}
	function onClose(sel) {
		Popup.hide()
	}
	return (
		<div style={{ overflow: 'hidden' }}>
			<div className={styles.parent_evaluate_box} >
				<div className={styles.evaluate_content} >
					<span className={styles.evaluate_label} >综合评价 : </span>
					<span><EvaluateComponent {...evaluateComponentProps} /></span>
				</div>
				<div className={styles.evaluate_content} >
					<span className={styles.evaluate_label} >图片视频 : </span>
					<div className={styles.upload_list}>
						{
							picList.map(function (item, index) {

								if (item.indexOf('mp4') != -1) {
									return (

										<div className={styles.upload_list_item} key={index}>
											<video src={item} style={{ objectFit: "fill", background: "rgba(0,0,0,.8)", borderRadius: "10px", width: "100%", height: "100%" }}></video>
											<img onClick={() => clickToPic(picList, index)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
											<img className={styles.CHAimg} src="http://img.ishanshan.com/gimg/n/20190802/a7e148e3cbb13a2ec87f9fc28702df30" onClick={() => CHAimg(index)} alt="" />
										</div>
									)
								} else {
									return (
										<div className={styles.upload_list_item} key={index} style={{ backgroundImage: `url( ${item} )`,borderRadius: "5px",backgroundSize:'cover',backgroundPosition:'center center'}} onClick={() => clickToPic(picList, index)}>
											{/* <img src={item} onClick={() => clickToPic(picList, index)} style={{ width: "100%", height: "100%" }} alt="" /> */}
											<img className={styles.CHAimg} src="http://img.ishanshan.com/gimg/n/20190802/a7e148e3cbb13a2ec87f9fc28702df30" onClick={() => CHAimg(index)} alt="" />
										</div>
									)
								}


							})
						}
						<div className={styles.evaluate_video} style={{ display: picList.length >= 3 ? 'none' : 'block' }} onClick={() => changeAll()}>

						</div>
					</div>
				</div>
				<div className={styles.evaluate_content} style={{ fontSize: '22px', margin: '0', lineHeight: "30px" }}>
					<span className={styles.evaluate_label} style={{ visibility: 'hidden' }}>我的评论 : </span>
					<span style={{ marginLeft: '10px', color: '#ccc' }}>支持png、jpg、jpeg、gif格式的图片，不大于5M。</span>
				</div>
				<div className={styles.evaluate_content} style={{ fontSize: '22px', margin: '0', lineHeight: "30px" }}>
					<span className={styles.evaluate_label} style={{ visibility: 'hidden' }}>我的评论 : </span>
					<span style={{ marginLeft: '10px', color: '#ccc' }}>支持mp4格式的视频，不大于80M。</span>
				</div>
				<div className={styles.evaluate_content} style={{marginBottom: isgo == true ? '120px' : '20px'}}>
					<span className={styles.evaluate_label}>我的点评 : </span>
					<p className='evaluate_input' >
						<TextareaItem
							{...getFieldProps('comment')}
							rows={10}
							placeholder="本次课还满意吗, 老师上课如何? ( 您的鼓励是我们进步的最大动力哟~ )"
							count={500}
							onFocus={() => gotoBack()}
							onBlur={() => iscosBack()}
						/>
					</p>
				</div>
				<div className={styles.evaluate_btn_group} >
					<div className={styles.evaluate_cancel} onClick={showAlert} >取消</div>
					<div className={styles.evaluate_save} onClick={saveInfoAction} >提交</div>
				</div>
			</div>
		</div>
	)
}

export default createForm()(ParentEvaluateComponent);
