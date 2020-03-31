import React from 'react';
import styles from './homeScrollCoverComponent.less';
import { Carousel } from 'antd-mobile';
function MicroWebsteComponent({

	dp,
	selectBigAlbumIndex,
	selectTeacherIndex,
	orgAlbumArr,
	teachersArr,
	showBigAlbum,
	showBigTeacher,

}) {

	//打开图片预览
	function touchAlbum(index) {
		dp('updateState', { showBigAlbum: !showBigAlbum, selectBigAlbumIndex: index });
	}

	//打开老师预览
	function touchTeacher(index) {
		dp('updateState', { showBigTeacher: !showBigTeacher, selectTeacherIndex: index });
	}

	let _height = document.body.clientHeight + 'px';
	let newH = h - 280;
	return (
		<div style={{ height: '100%' }} className="js_home">
			{
				showBigAlbum
					?
					<Carousel
						selectedIndex={selectBigAlbumIndex}
						className="js-carousel"
						style = {{ height : _height}}
						dots = { false }
						autoplay = { false }
						dragging={false}
						swipeSpeed = { 35 }
					>
						{
							orgAlbumArr && orgAlbumArr.length > 0 && orgAlbumArr.map(function (albumItem, albumIndex) {
								let ingurl = (albumItem != undefined && albumItem != '') ? `${albumItem}` : 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f!s300';
								if (ingurl.indexOf('mp4') !== -1) {
									return <div key={albumIndex} className={styles.js_environment_background} onClick={() => touchAlbum(albumIndex)}>
										{/* <div
											style={{
												height: h,
												width: w,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
											}}
										> */}
											<video controls="controls" width="100%" style={{objectFit:'fill'}}>
												<source src={ingurl} type="video/mp4" />
											</video>
										{/* </div> */}
									</div>
								} else {
									return <div key={albumIndex} className={styles.js_environment_background} onClick={() => touchAlbum(albumIndex)}>
										{/* <div
											style={{
												backgroundImage: `url(${ingurl})`,
												height: h,
												width: w,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
											}}
										>
										</div> */}
										 <img src={ingurl} style={{display:'block',width:'100%'}}/>
									</div>
								}

							})
						}
					</Carousel>
					:
					showBigTeacher
						?
						<Carousel
							selectedIndex={selectTeacherIndex}
							className="js-carousel"
							dots={false}
							dragging={false}
							style={{ height: h, width: w, zIndex: 10000 }}
						>
							{
								teachersArr && teachersArr.length > 0 && teachersArr.map(function (tItem, tIndex) {
									let ingurl = (tItem.teacherImg != undefined && tItem.teacherImg != '') ? `${tItem.teacherImg}` : 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f!s300';
									return <div key={tIndex} className={styles.js_teacher_background} onClick={() => touchTeacher(tIndex)}>
										<div className={styles.js_teacher_icon}
											style={{
												backgroundImage: `url(${ingurl})`,
												height: newH,
												width: w,
												backgroundPosition: 'center',
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
												paddingTop: '30px',
											}}
										>
											<div className={styles.js_teacher_name_banner}>{tItem.teacherName}</div>
											<div className={styles.js_teacher_intro_banner}>{tItem.teacherIntro}</div>
										</div>
									</div>
								})
							}
						</Carousel>
						: ''
			}
		</div>
	);
}

export default MicroWebsteComponent;
