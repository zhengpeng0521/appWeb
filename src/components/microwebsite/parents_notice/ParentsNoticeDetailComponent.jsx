import React from 'react';
import styles from './ParentsNoticeDetailComponent.less';
// import EvaluateComponentTwo from './EvaluateComponent';
// import { WhiteSpace, WingBlank, Icon, Button, ListView, Modal, TextareaItem, Popup, List } from 'antd-mobile';
import { createForm } from 'rc-form';
// import ParentsNoticevideo from './parentsNoticeVideo'
// const alert = Modal.alert;

function ParentsNoticeDetailComponent({

	currentItem,             //当前选中课程的详细信息
	parentEvaluateInfo,      //当前选中的课程评价详情

	clickToEvaluate,         //点击评价
	clickToPic,              //点击查看大图


	// getNum,                  //得到评价级别
	// evaluateVisible,        //评价modal visible
	// score,                  //评价等级
	// saveInfo,               //提交家长评价
	// cancelSaveInfo,         //取消家长评价

	// resetNum,
	// changePathImg,
	// changePathVideo,
	// CHAimg,
	// picList, //接收的数组
	// form: {
	// 	getFieldProps,
	// 	getFieldsValue,
	// 	resetFields,
	// }

}) {
	// function openvideoClick(src) {
	// 	window.open(src)
	// }
	let coursePicComponents = [];
	let courseLength = (!!currentItem && !!currentItem.pictures && JSON.parse(currentItem.pictures).length) || 0;
	//console.log(currentItem.pictures, JSON.parse(currentItem.pictures) )
	!!currentItem && !!currentItem.pictures && currentItem.pictures.length > 0 && JSON.parse(currentItem.pictures).map(function (item, index) {
		// console.log(item)
		if (item.indexOf('mp4') !== -1) {
			coursePicComponents.push(
				<div style={{ position: "relative" }} key={'course_picture_' + index} className={courseLength == 1 ? styles.course_img_one : courseLength == 2 ? styles.course_img_two : courseLength == 3 ? styles.course_img_three : courseLength == 4 ? styles.course_img_three : courseLength == 5 ? styles.course_img_three : courseLength == 6 ? styles.course_img_three : courseLength == 7 ? styles.course_img_three : courseLength == 8 ? styles.course_img_three :courseLength == 9 ? styles.course_img_three : ''}>
					<video src={item} style={{ objectFit: "fill", background: "rgba(0,0,0,.8)", borderRadius: "10px", width: "100%", height: "100%" }}></video>
					<img onClick={() => clickToPic(JSON.parse(currentItem.pictures), index)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
				</div>
				// <ParentsNoticevideo ingurl={item} className = { courseLength == 1 ? styles.course_img_one : courseLength == 2 ? styles.course_img_two : courseLength == 3 ? styles.course_img_three : '' } onClick = { () => clickToPic( JSON.parse(currentItem.pictures), index ) } />
				// <video src={item} style="object-fit:cover" key={'course_picture_' + index} className={courseLength == 1 ? styles.course_img_one : courseLength == 2 ? styles.course_img_two : courseLength == 3 ? styles.course_img_three : ''} onClick={() => clickToPic(JSON.parse(currentItem.pictures), index)} ></video>
			)
		} else {
			coursePicComponents.push(
				<div style={{ backgroundImage: `url( ${item} )`,borderRadius: "10px" }} key={'course_picture_' + index} className={courseLength == 1 ? styles.course_img_one : courseLength == 2 ? styles.course_img_two : courseLength == 3 ? styles.course_img_three : courseLength == 4 ? styles.course_img_three : courseLength == 5 ? styles.course_img_three : courseLength == 6 ? styles.course_img_three : courseLength == 7? styles.course_img_three : courseLength == 9 ? styles.course_img_three : ''} onClick={() => clickToPic(JSON.parse(currentItem.pictures), index)} ></div>
			)
		}

	})

	let teacherPicComponents = [];
	let teacherLength = (!!parentEvaluateInfo && !!parentEvaluateInfo.tcrPics && JSON.parse(parentEvaluateInfo.tcrPics).length) || 0;
	!!parentEvaluateInfo && !!parentEvaluateInfo.tcrPics && parentEvaluateInfo.tcrPics.length > 0 && JSON.parse(parentEvaluateInfo.tcrPics).map(function (item, index) {
		if (item.indexOf('mp4') !== -1) {
			teacherPicComponents.push(
				// <ParentsNoticevideo ingurl={item} key = { 'teacher_picture_' + index } className = { teacherLength == 1 ? styles.course_img_one : teacherLength == 2 ? styles.course_img_two : teacherLength == 3 ? styles.course_img_three : '' } onClick = { () => clickToPic( JSON.parse( parentEvaluateInfo.tcrPics ), index ) } />
				<div style={{ position: "relative" }} key={'teacher_picture_' + index} className={teacherLength == 1 ? styles.course_img_one : teacherLength == 2 ? styles.course_img_two : teacherLength == 3 ? styles.course_img_three : teacherLength == 4 ? styles.course_img_three : teacherLength == 5 ? styles.course_img_three  : teacherLength == 6 ? styles.course_img_three  : teacherLength == 7 ? styles.course_img_three : teacherLength == 8 ? styles.course_img_three  : teacherLength == 9 ? styles.course_img_three  : ''}>
					<video src={item} style={{ objectFit: "fill", background: "rgba(0,0,0,.8)", borderRadius: "10px", width: "100%", height: "100%" }}></video>
					<img onClick={() => clickToPic(JSON.parse(parentEvaluateInfo.tcrPics), index)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
				</div>
			)
		} else {
			teacherPicComponents.push(
				<div style={{ backgroundImage: `url( ${item} )`,borderRadius: "10px" }} key={'teacher_picture_' + index} className={teacherLength == 1 ? styles.course_img_one : teacherLength == 2 ? styles.course_img_two : teacherLength == 3 ? styles.course_img_three : teacherLength == 4 ? styles.course_img_three : teacherLength == 5 ? styles.course_img_three : teacherLength == 6 ? styles.course_img_three : teacherLength == 7 ? styles.course_img_three  : teacherLength == 8 ? styles.course_img_three  : teacherLength == 9 ? styles.course_img_three  : ''} onClick={() => clickToPic(JSON.parse(parentEvaluateInfo.tcrPics), index)} ></div>
			)
		}
	})

	let parentEvaluateComponents = [];
	!!parentEvaluateInfo && !!parentEvaluateInfo.results && parentEvaluateInfo.results.length > 0 && parentEvaluateInfo.results.map(function (item, index) {
	let paertLength = item.pictures.split(',').length
		parentEvaluateComponents.push(
			<div key={'parent_evaluate_' + index} className={styles.parent_evaluate_item} >
				<p className={styles.evaluate_time} >{item.time} </p>
				<p className={styles.evaluate_title} >{item.stuName + '家长'}</p>
				<p className={styles.course_detail_item}>
					<span className={styles.course_detail_item_label} >综合评价 : </span>
					<span><EvaluateComponent num={item.parentScore || 0} /></span>
				</p>
				<div style={{ margin: '20px 0', display: item.pictures.length > 0 ? 'block' : 'none' }}>
					{
						item.pictures.split(',').map((items, indes) => {
							if (items.indexOf('mp4') != -1) {
								return (

									<div style={{ position: "relative" }} className={paertLength == 1 ? styles.course_img_one : paertLength == 2 ? styles.course_img_two : paertLength == 3 ? styles.course_img_three : ''} key={indes}>
										<video src={items} style={{ objectFit: "fill", background: "rgba(0,0,0,.8)", borderRadius: "10px", width: "100%", height: "100%" }}></video>
										<img onClick={() => clickToPic(item.pictures.split(','), indes)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
									</div>
								)
							} else {
								return (
									<div style={{ backgroundImage: `url( ${items} )`,borderRadius: "10px" }} className={paertLength == 1 ? styles.course_img_one : paertLength == 2 ? styles.course_img_two : paertLength == 3 ? styles.course_img_three : ''} key={indes} onClick={() => clickToPic(item.pictures.split(','), indes)}></div>
									// <div className={styles.upload_list_items} key={indes}>
									// 	<img src={items} onClick={() => clickToPic(item.pictures.split(','), indes)} style={{ width: "100%", height: "100%" }} alt="" />
									// </div>
								)
							}
						})
					}
				</div>
				<p className={styles.course_detail_item}>
					<span className={styles.course_detail_item_label} >家长点评 : </span>
					<span className={styles.course_detail_item_value} >{item.parentComm || '无'}</span>
				</p>
			</div>
		)
	})

	// function saveInfoAction() {
	// 	let values = getFieldsValue();
	// 	let pic = { 'pictures': picList }
	// 	let newV = {
	// 		...values,
	// 		...pic
	// 	}
	// 	saveInfo(newV)
	// }

	// function cancelSaveInfoAction() {
	// 	resetFields();
	// 	!!resetNum && resetNum();
	// 	cancelSaveInfo()
	// }
	// function onFaSucees(){
	// 	Popup.hide()
	// }
	// function onClose(sel) {
	// 	Popup.hide()
	// }
	// function changeAll(){
	// 	Popup.show(<div >
	// 		<List 
	// 			className="popup-list"
	// 		>
	// 			<List.Item className={styles.isItem}>
	// 				<span>视频</span>
	// 				<input type='file' accept='video/*'onChange={changePathVideo}/></List.Item>
	// 			<List.Item className={styles.isItem}>
	// 				<span>图片</span>
	// 				<input type='file' accept='image/*' onChange={changePathImg}/></List.Item>
	// 			<List.Item onClick={() => onClose('cancel')} style={{borderTop:'10px solid #f0f0f0',height:'110px'}}>取消</List.Item>
	// 		</List>
	// 	</div>, { animationType: 'slide-up', maskClosable: false })
	// }
	// const showAlert = () => {
	// 	const alertInstance = alert('', '当前评价信息不会保留，是否继续？', [
	// 		{ text: '继续', onPress: cancelSaveInfoAction, style: 'default' },
	// 		{ text: '再想想' },
	// 	]);
	// };

	// let evaluateComponentProps = {
	// 	getNum,
	// 	score,
	// }

	return (
		<div className={styles.parent_notice_detail_wrap}>
			<div className={styles.course_detail} >
				<p className={styles.course_detail_item} style={{ marginBottom: '20px', height: '28px', lineHeight: '28px', fontSize: '28px' }} >
					<span className={styles.course_detail_item_label} >课程 : </span>
					<span style={{ color: '#333' }} >{currentItem.courseName || '无'}</span>
				</p>
				<p className={styles.course_detail_item} >
					<span className={styles.course_detail_item_label} >上课时间 : </span>
					<span className={styles.course_detail_item_value} >
						{!!currentItem.studyDate && !!currentItem.startTime && !!currentItem.endTime && (currentItem.studyDate + ' ' + currentItem.startTime + ' ~ ' + currentItem.endTime) || '无'}
					</span>
				</p>
				<p className={styles.course_detail_item} >
					<span className={styles.course_detail_item_label} >课程主教 : </span>
					<span className={styles.course_detail_item_value} >{currentItem.mtNames || '无'}</span>
				</p>
				<p className={styles.course_detail_item} >
					<span className={styles.course_detail_item_label} >课程内容 : </span>
					<span className={styles.course_detail_item_value} >{currentItem.content || '无'}</span>
					<br/>
					<span className={styles.course_detail_item_value} >{currentItem.homework ? '【作业】:' : ''}</span>
					<span className={styles.course_detail_item_value} >{currentItem.homework}</span>
				</p>
				{/* <p className={styles.course_detail_item} style={{ marginBottom: '10px' }} >
					<span className={styles.course_detail_item_label} >课后作业 : </span>
					<span className={styles.course_detail_item_value} >{currentItem.homework || '无'}</span>
				</p>/ */}
				<div className={styles.course_img_wrap} >
					{coursePicComponents}
				</div>
			</div>
			{/*老师评价*/}
			<div className={styles.teacher_evaluate_sperator} ></div>
			<div className={styles.teacher_evaluate}>
				<p className={styles.evaluate_title} >老师评价</p>
				<p className={styles.course_detail_item}>
					<span className={styles.course_detail_item_label} >综合评价 : </span>
					<span><EvaluateComponent num={!!parentEvaluateInfo && parentEvaluateInfo.tcrScore || 0} /></span>
				</p>
				<p className={styles.course_detail_item} style={{ marginBottom: '10px' }}>
					<span className={styles.course_detail_item_label} >老师点评 : </span>
					<span className={styles.course_detail_item_value} >{!!parentEvaluateInfo && parentEvaluateInfo.tcrComm || '无'}</span>
				</p>
				<div className={styles.course_img_wrap}>
					{teacherPicComponents}
				</div>
			</div>
			{/*家长评价*/}
			<div className={styles.parent_evaluate_wrap} >
				{parentEvaluateComponents}
			</div>
			{/*我要评价按钮*/}
			{!!parentEvaluateInfo && !parentEvaluateInfo.isComm &&
				<div className={styles.evaluate_btn} onClick={clickToEvaluate} >
					我要评价
				</div>
			}
			{/* <Modal
				className='evaluate_modal'
				popup={true}
				visible={evaluateVisible}
				closable={false}
				maskClosable={false}
				animationType="slide-up"
			>
				<div className={styles.parent_evaluate_box} >
					<div className={styles.evaluate_content} >
						<span className={styles.evaluate_label} >综合dd评价 : </span>
						<span><EvaluateComponentTwo {...evaluateComponentProps} /></span>
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
												<img onClick={() => openvideoClick(item)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
												<img className={styles.CHAimg} src="http://img.ishanshan.com/gimg/n/20190802/a7e148e3cbb13a2ec87f9fc28702df30" onClick={() => CHAimg(index)} alt="" />
											</div>
										)
									} else {
										return (
											<div className={styles.upload_list_item} key={index}>
												<img src={item} onClick={() => clickToPic(picList, index)} style={{ width: "100%", height: "100%" }} alt="" />
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
					<div className={styles.evaluate_content} style={{fontSize:'22px',margin:'0',lineHeight:"30px"}}>
						<span className={styles.evaluate_label} style={{visibility:'hidden'}}>我的评论 : </span>
						<span style={{marginLeft:'10px',color:'#ccc'}}>支持png、jpg、jpeg、gif格式的图片，不大于5M。</span>
					</div>
					<div className={styles.evaluate_content} style={{fontSize:'22px',margin:'0',lineHeight:"30px"}}>
						<span className={styles.evaluate_label} style={{visibility:'hidden'}}>我的评论 : </span>
						<span style={{marginLeft:'10px',color:'#ccc'}}>支持mp4格式的视频，不大于80M。</span>
					</div>
					<div className={styles.evaluate_content} >
						<span className={styles.evaluate_label}>我的点评 : </span>
						<p className='evaluate_input' >
							<TextareaItem
								{...getFieldProps('comment')}
								rows={10}
								placeholder="本次课还满意吗, 老师上课如何? ( 您的鼓励是我们进步的最大动力哟~ )"
								count={500}
							/>
						</p>
					</div>
					<div className={styles.evaluate_btn_group} >
						<div className={styles.evaluate_cancel} onClick={showAlert} >取消</div>
						<div className={styles.evaluate_save} onClick={saveInfoAction} >提交</div>
					</div>
					<div >
					</div>
				</div>
			</Modal> */}
		</div >
	)
}

export default createForm()(ParentsNoticeDetailComponent);


export function EvaluateComponent({
	num
}) {
	let arr = Array.from({ length: 5 });

	return (
		<ul className={styles.evaluate_wrap} >
			{
				arr.map(function (item, index) {
					if (index < num) {
						return (<li key={'evaluate_' + index} className={styles.selected} ></li>)
					} else {
						return (<li key={'evaluate_' + index} className={styles.notSelected} ></li>)
					}
				})
			}
		</ul>
	)
}
