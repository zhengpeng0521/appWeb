import React from 'react';
import styles from './CustomImagePicker.less';

import {ImagePicker, Toast, ActivityIndicator} from 'antd-mobile';
import EXIF from 'exif-js';

/**
 * 自定义的H5端文件选择器
 * props:
 * 	action: 上传图片服务器地址
 *  selectable: 是否可添加图片
 *  className: 样式名称
 */
class CustomImagePicker extends React.Component{
    constructor(props){
        super(props);

        let initFiles = props && props.value;

        this.state = {
        	files: initFiles || [],
        	loading: false,
        };

        this.onChange = this.onChange.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
        this.changeFileList = this.changeFileList.bind(this);
        this.rotateImg = this.rotateImg.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    	if(this.props.value != nextProps.value) {
    		this.setState({
    			files: nextProps.value
    		});
    	}
    }

    onChange(files, type, index) {

    	let me = this;
    	let {action} = this.props;

    	let newFiles = [];

    	if(action && action.length > 0) {

    		files && files.length > 0 && files.map(function(item, index) {

    			let fileSize = item && item.file && item.file.size;
    			if(fileSize > 5242880) { //5242880
    				Toast.info('图片不得大于5M', 2);
    				return;
    			}

    			if(item.status != 'done') {
    				me.imageUpload(item);
    			}
    			newFiles.push(item);
    		});
    	} else {
    		newFiles = files;
    	}

    	this.setState({
			files: newFiles,
		});

		me.props.onChange && me.changeFileList(newFiles);
    }

    changeFileList(fileList) {
    	let me = this;
    	let hasUploadAll = true;
		fileList && fileList.length > 0 && fileList.map(function(item, index) {
			if(hasUploadAll && item.status != 'done') {
				hasUploadAll = false;
			}
		});
		me.setState({
			loading: true,
		});

		if(hasUploadAll) {
			me.setState({
				loading: false,
			});
			me.props.onChange && me.props.onChange(fileList);
		} else {
			setTimeout(function() {
				me.changeFileList(fileList);
			}, 500);
		}
    }

    imageUpload(file) {
    	let me = this;
    	let {action} = this.props;
    	var formData = new FormData();
		formData.append("file", file.file);

		//处理IOS 拍照方向
	 	let img_Orientation = '';
      	EXIF.getData(file.file,function(){
          	img_Orientation = EXIF.getTag(this,'Orientation');
          	file.file.img_Orientation = img_Orientation;
          	file.img_Orientation = img_Orientation;
      	});

		var request = new XMLHttpRequest();
		request.open("post", action);

		me.setState({
			loading: true,
		});

		request.onload = function(oEvent) {
			if(oEvent.currentTarget.status === 200) {
				let response = oEvent.currentTarget.response && JSON.parse(oEvent.currentTarget.response);
				if(response && response.errorCode == 9000) {
					file.url = response.data && response.data.url;
					file.status = 'done';
					file.img_Orientation = img_Orientation;

					if(img_Orientation == '6') {
						me.rotateImg(file);
					} else {
						me.setState({
							loading: false,
						});
					}

				}
			} else {
				Toast.info('图片上传出错啦', 2);
				console.info('image upload error', oEvent);
			}
		}

		request.send(formData);
    }

    rotateImg(descFile) {
    	let me = this;
    	me.setState({
			loading: true,
		});

    	let img_src = descFile.url;
    	let imgid = '';
    	if(img_src && img_src.length > 0) {
    		let img_src_arr = img_src.split('/');
    		if(img_src_arr && img_src_arr.length > 0) {
    			imgid = img_src_arr[img_src_arr.length-1];
    		}
    	}

    	if(imgid == '') {
    		return;
    	}

    	let image = new Image();
    	image.src = '/thinknode-dd/dingding/controller/imageProxy?imgid=' + imgid;

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        image.onload = function() {
        	me.setState({
				loading: true,
			});
        	let expectWidth = image.naturalWidth;
        	let expectHeight = image.naturalHeight;

        	canvas.width = expectHeight;
        	canvas.height = expectWidth;

        	let degree = 1 * 90 * Math.PI / 180;
        	ctx.rotate(degree);

        	ctx.drawImage(image, 0, expectHeight * -1, expectHeight, expectWidth);

        	let base64 = canvas.toDataURL("image/jpeg", 0.8);

	        let request_base64 = new XMLHttpRequest();
			request_base64.open("post", BASE_URL +'/upload/imageBase64');

			request_base64.onload = function(oEvent) {
				if(oEvent.currentTarget.status === 200) {
					let response = oEvent.currentTarget.response && JSON.parse(oEvent.currentTarget.response);
					if(response && response.errorCode == 9000) {
						descFile.url = response.data && response.data.url;
						descFile.status = 'done';
						descFile.img_Orientation = '1';
						me.setState({
							loading: false,
						});
					}
				} else {
					Toast.info('图片上传出错啦', 2);
					console.info('image upload error', oEvent);
				}
			}

			let formData = new FormData();
			formData.append("data", base64);

			request_base64.send(formData);
        }

    }

    render(){

    	let {
    		files
    	} = this.state;

    	let {
    		selectable,
    		title,helper,
    		className,
    	} = this.props;

        return (
        	<div className={styles.custom_image_picker_cont}>
        		<ActivityIndicator
	                toast
	                text="图片上传中..."
	                animating={this.state.loading}
	              />
        		{!!title && <div className={styles.custom_image_picker_title}>{title}</div>}
	            <ImagePicker
	            	files={files}
	            	multiple={false}
	            	onChange={this.onChange}
	            	selectable={selectable}
	            	className={styles.custom_image_picker_imgs}
	            />
	            {!!helper && <div className={styles.custom_image_picker_helper_cont}><div className={styles.custom_image_picker_helper}>{helper}</div></div>}

            </div>
        );
    }
}


export default CustomImagePicker;
