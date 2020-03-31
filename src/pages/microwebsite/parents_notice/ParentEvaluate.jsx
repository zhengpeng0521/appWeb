import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ParentEvaluateComponent from '../../../components/microwebsite/parents_notice/ParentEvaluateComponent.jsx';
import { Toast,Popup } from 'antd-mobile';
function ParentEvaluate({ dispatch, parentEvaluateModel }) {

	let {
		tenantId,
		orgId,
		stuId,
		picList,
		score,                  //评价等级
		isgo,
		resetNum,               //清空评价等级
	} = parentEvaluateModel;

	//提交数据
	function saveInfo( values ){
		dispatch({
			type : 'parentEvaluateModel/saveInfo',
			payload : {
				values
			}
		})
	}
	//点击查看大图
	function clickToPic(arrs, index) {
		dispatch(
			routerRedux.push({
				pathname: '/parent_pic',
				state: {
					arrs, index
				}
			})
		)
	}
	//提交评价
	function saveInfo(values) {
		dispatch({
			type: 'parentEvaluateModel/saveInfo',
			payload: {
				values
			}
		})
	}
	//取消提交评价
	function cancelSaveInfo() {
		dispatch({
			type: 'parentEvaluateModel/updateState',
			payload: {
				score: 0,
				resetNum: undefined,
				picList: []
			}
		})
		dispatch(
			routerRedux.go(-1)
		)
	}
	function changePathVideo(e){
		Popup.hide()
		// 上传视频
		const values = e.target.files[0]
		// console.log(values)
		const isLt80M = values.size / 1024 / 1024  < 80;
		if (!isLt80M) {
			Toast.info("上传的视频大小不能超过80M哦!", 1)
			return false;
		}
		let formData = new FormData()
		formData.append('file', values)
		formData.append('oid', orgId)
		formData.append('tid', tenantId)
		Toast.loading("正在上传", 0)
		fetch('https://img.ishanshan.com/gimg/user/upload', {
			method: 'POST',
			body: formData
		}).then(res => {
			return res.text()
		}).then(text => {
			const url = JSON.parse(text)
			if(url.state == 'sucess'){
				const newUrl = url.url
				if (newUrl.indexOf('mp4') === -1) {
					Toast.info("上传的视频只能是mp4格式!", 1)
					return false
				}
				Toast.loading("上传成功", 1)
				picList.push(newUrl)
				dispatch({
					type: 'parentEvaluateModel/updateState',
					payload: {
						picList: picList,
					}
				})
			}
		})
	}
	function changePathImg(e) {
		Popup.hide()
		// 上传图片
		const values = e.target.files[0]
		// console.log(values)
		const isLt10M = values.size / 1024 / 1024  < 5;
		if (!isLt10M) {
			Toast.info("上传的图片大小不能超过5M哦!", 1)
			return false;
		}
		if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(values.type) === -1) {
			Toast.info("上传的图片只能是 png、jpg、jpeg、gif格式的图片!", 1)
			return false
		  }
		let formData = new FormData()
		formData.append('file', values)
		formData.append('oid', orgId)
		formData.append('tid', tenantId)
		Toast.loading("正在上传", 0)
		fetch('https://img.ishanshan.com/gimg/user/upload', {
			method: 'POST',
			body: formData
		}).then(res => {
			return res.text()
		}).then(text => {
			const url = JSON.parse(text)
			if(url.state == 'sucess'){
				Toast.loading("上传成功", 1)
				const newUrl = url.url
				picList.push(newUrl)
				dispatch({
					type: 'parentEvaluateModel/updateState',
					payload: {
						picList: picList,
					}
				})
			}
		})
	}
	//得到评价等级
	function getNum(value, resetNum) {
		dispatch({
			type: 'parentEvaluateModel/updateState',
			payload: {
				score: value,
				resetNum
			}
		})
	}
	// 点击评价的图片删除
	function CHAimg(index){
		
		picList.splice(index, 1)
		
		dispatch({
			type: 'parentEvaluateModel/updateState',
			payload: {
				picList: picList,
			}
		})
	}
	function gotoBack(){
		let u = navigator.userAgent, app = navigator.appVersion;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
		if (isAndroid){
			dispatch({
				type: 'parentEvaluateModel/updateState',
				payload: {
					isgo: true,
				}
			})
		}
	}
	function iscosBack(){
		let u = navigator.userAgent, app = navigator.appVersion;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
		if (!isAndroid) {
			setTimeout(() => {
				const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
				window.scrollTo(0, Math.max(scrollHeight - 1, 0))
				}, 200)
		}
	}
	let props = {
		saveInfo,
		getNum,
		clickToPic,              //点击查看大图
		picList,
		cancelSaveInfo,
		score,                  //评价等级
		changePathVideo,
		changePathImg,
		resetNum,               //清空评价等级
		CHAimg,
		stuId,
		gotoBack,
		iscosBack,
		isgo
	}

    return (
		<ParentEvaluateComponent { ...props } />
    );
}


function mapStateToProps({ parentEvaluateModel }) {
  return { parentEvaluateModel };
}

export default connect(mapStateToProps)(ParentEvaluate);
