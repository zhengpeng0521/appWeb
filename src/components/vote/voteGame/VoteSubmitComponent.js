import React, {PropTypes} from 'react';
import { InputItem, Radio, ImagePicker, WingBlank, DatePicker, List, Picker, TextareaItem, Modal, Toast, ActivityIndicator } from 'antd-mobile';
import moment from 'moment';
import {createForm} from 'rc-form';
import styles from './VoteSubmitComponent.less';

const gmtNow = moment().utcOffset(0);

function VoteGameSubmitComponent({

	dp,
	files,
	showMask,
	agreedStatus,
	popDetermine,
	touchType,
	popTerms,
	gameBaseId,
	userId,
	showAgreementModal,
	fromData,
	orgData,
	returnPopPageFunction,
	ActivityIndicatorImage,
    pickscarea,
    scareas,
	
	form : {
		getFieldProps,
		getFieldValue,
		getFieldsValue,
	},
	
}) {
	function  onChange (files, type, index) {

		if(index != undefined && type != 'add') {
			//删除操作
		   dp('updateState', {files : files});	
			
		} else {

			
			let size = files[files.length - 1]&&files[files.length - 1].file.size / 1024;  //K

			if(size > 5120) {
				
				return Toast.info('图片不得大于5M', 1);
				
			} else {
				
				dp('updateState', {ActivityIndicatorImage : !ActivityIndicatorImage});
				
				dp('uploadImageFile', {'file' : files[files.length - 1].file});
				
				/*
				var formData = new FormData();

				formData.append("file", files[files.length - 1].file);

				var request = new XMLHttpRequest();

				request.open("POST", `/thinknode/upload/image`);


				request.onload = function(oEvent) {

					if(oEvent.currentTarget.status == 200) {		

						var  data = JSON.parse(oEvent.currentTarget.response);

						dp('uploadImage', {data : data});				   

					} 
				}
				request.send(formData);	
				*/
			}
		
			
			/*
			
			let size = files[files.length - 1]&&files[files.length - 1].file.size / 1024;  //K

			if(size > 5120) {
				return Toast.info('图片不得大于5M', 1);
			} else {
							
				//dp('updateState', {ActivityIndicatorImage : !ActivityIndicatorImage});
				
				var img = new Image();
				
				var srcValue = files[files.length - 1].url;	
				
				img.src = srcValue;
																
				var degree 	= 1 * 90 * Math.PI / 180;

				var isRotate = false;

				if(files[files.length - 1].orientation == 6) {
					isRotate = true;  
				}

				img.onload = function () {
					
					var width 		= img.width, height = img.height;
					var _canvas 	= document.createElement("canvas");
					var _ctx 		= _canvas.getContext("2d");
					_canvas.width 	= width;
					_canvas.height 	= height;
										
					if(isRotate) {
						_ctx.rotate(degree);   
						_ctx.drawImage(img, 0, (-height)-1000, img.width, img.height + 1000);  
					} else {
						_ctx.drawImage(img, 0, 0, img.width, img.height);						
					}
										
					var base64 = _canvas.toDataURL('image/jpeg', 0.5);
						
					dp('uploadImage', {base64URL : img.src});
				}			  
			}
			*/
     	};	
	}

	var configData = fromData&&fromData.data&&fromData.data.gameBaseConfig;
	
	let fromConfig = undefined;
	
	if(configData&&configData.length > 0) {
	 	fromConfig = Object.keys(configData).length > 0 ? JSON.parse(configData&&configData) : undefined;
	 }
				
	let componentArray = [];
	if(fromConfig&&fromConfig.length > 0 ) {
		   fromConfig.map((val, index) => {		   
			   if(val.hide == 1) {
					switch(val.type) {
						case 'input': 
							componentArray.push(
								<div className={styles.inputBox} key={index}>
									<WingBlank size="md">
										<div className={styles.inputValue}> 
											<InputItem
												type= {val.valueType || 'text'}
												{...getFieldProps(val.name)}
												placeholder={'请输入' + val.label}
											/>
										</div>
									</WingBlank>
								</div>
							)
							break; 
						case 'date' :
							let label = '请选择' + val.label;
							componentArray.push(
								<div className={styles.inputBox} key={index}>
									<WingBlank size="md">
										<div className={styles.inputValue}> 
											<DatePicker
												style={{fontSize : '20px'}}
												extra={label}
												mode="date"
												{...getFieldProps(val.name, {
													  //initialValue: gmtNow,
												})}
												 minDate={moment('1980-01-01', 'YYYY-MM-DD').utcOffset(8)}
												 maxDate={gmtNow}
												>
												<List.Item arrow="horizontal"></List.Item>
											</DatePicker>
										</div>
									</WingBlank>
								</div>
							)
							break; 
						case 'select' :
			   				let dataSource = [];
			   				if(val.data&&val.data.length > 0) {
								for(let idx in val.data) {
									val.data[idx].label = val.data[idx].value;
									dataSource = val.data;
								}
							}
							//let checkoutLabel = val.data&&val.data.length>0 ? val.data[0].value : '请选择' + val.label;
			   				let checkoutLabel = '请选择' + val.label;
			   				componentArray.push(
							   <div className={styles.inputBox} key={index}>
									<WingBlank size="md">
										<div className={styles.inputValue}>
											<Picker
												extra={checkoutLabel}
												data={dataSource} 
												cols={1} 
												{...getFieldProps(val.name, {
													//initialValue : [checkoutLabel]
												})}>
												<List.Item arrow="horizontal"></List.Item>
											</Picker>
										</div>
									</WingBlank>
								</div>
							)
							break;
						default : 
							break; 	  
					}
			   }
		   })
	}
	
	function popTermsFunction() {
		popTerms();
	}

	let keyDic = {};

	fromConfig&&fromConfig.map((item, index) => {		
		keyDic[item.name] = item.label;
	})

	function popDetermineFunction() {		
				
		let data = getFieldsValue();
		let tempDateKey = Object.keys(data);
		let dateKey = [];
		tempDateKey.map((item, index) => {
			if(item != 'note') {
				dateKey.push(item);
			}
		})
		let submitDataSource = {};		
		
		if(agreedStatus) {
			//数据处理
			let isCompletion = false;
			
			dateKey&&dateKey.map((item, index) => {
				let k = dateKey[index];
				fromConfig&&fromConfig.map((item, index) => {
					if(k == item.name) {
						let v = getFieldValue(k);
						if(item.require) {
							if(v == undefined || v == '') {
								isCompletion = true;
								return Toast.info('请完善' + item.label, 1);
							} else {
								if(item.type == 'date') {
									submitDataSource[k] = v.format('YYYY-MM-DD');
								} else {
									submitDataSource[k] = v;	
								}
							}
						} else {
							if(item.type == 'date') {
								submitDataSource[k] = v.format('YYYY-MM-DD');
							} else {
								submitDataSource[k] = v;
							}
						}					
					} 
				})
			})
			
//			错误返回
			if(isCompletion) {
				return '';
			}
			
			let submitArr = [];
				
			let phoneTest = false;
			if(Object.keys(submitDataSource).length === dateKey.length) {
				
				Object.keys(submitDataSource).map((item, index) => {
					
					let dict = {};
					dict.name = item;
					dict.label = keyDic[item];
					if(typeof(submitDataSource[item]) === 'object') {
						dict.value = (submitDataSource[item] = submitDataSource[item][0]);	
					} else {
						dict.value = submitDataSource[item];
					}
					
					submitArr.push(dict);

					if(dict.name == 'tel') {						
						let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
						let phone = submitDataSource[item].replace(/\s/g, "");
						if (!reg.test(phone)) {
							return phoneTest = false;
						}  else {
							return phoneTest = true;
						}
					}
				})
			}

            if( !pickscarea || pickscarea.length == 0){
                 return Toast.info('请选择校区', 1);
            }
			
			if(phoneTest == false) {
				return  Toast.info("请输入正确的手机号码", 1);
			}
			
			let tempArr = [];
			
			files&&files.map((item, index) => {
				tempArr.push(item.url);
			})
			
			if(tempArr.length == 0) {
			   return Toast.info('请选择图片', 1);
			}
			
			if(data.note == undefined || data.note.length == 0){
			    return Toast.info('请填写宣言', 1);
			}

            let orgName,tenantId;
            scareas.map((item)=>{
                if(item.orgId == pickscarea[0]){
                    orgName = item.label;
                    tenantId = item.tenantId + "";
                    submitArr.push({
                        "name":"orgName",
                        "label":"校区",
                        "value":item.orgName,
                    });
                }
            })

			let parma = {
				babyName : data.babyName || undefined,
				userForm : JSON.stringify(submitArr),
				imageUrl : tempArr.join(','),
				intro 	: data.note || undefined,
				gameBaseId : gameBaseId,
				userId : userId,
                orgName,
                tenantId,
			}			  
			popDetermine(parma);
		} else {
			dp('updateState', {showAgreementModal : !showAgreementModal});
		}
	}

	function touchAgreedRadio() {
		dp('updateState', {agreedStatus : !agreedStatus});
	}

	function onClose() {
		dp('updateState', {showAgreementModal : !showAgreementModal});
	}
	
	let agreedRadio = agreedStatus ? styles.selectStatus : styles.noSelectStatus;

    const CustomChildren = props => (
      <div
        onClick={props.onClick}
        className = {styles.scareaPicker}
      >
        <div className={styles.scareatxt}>
          <div style={{ textAlign: 'center', color: '#5d3cb9',width:'100%'}}>{props.extra}</div>
        </div>
      </div>
    );

    function changeValue(v){
        dp('updateState', v);
    }
	return (

		<div className="voteGameSubmit">
			<ActivityIndicator
                toast
                text="图片上传中..."
                animating={ActivityIndicatorImage}
              />
			<div className={styles.orgName}>{orgData&&orgData.orgName}</div>

                 <Picker
                  title="校区选择"
                  extra={ "请选择校区" }
                  data={scareas}
                  cols= {1}
                  value={pickscarea}
                  onChange={v => changeValue({ pickscarea: v })}
                  onOk={v =>changeValue({ pickscarea: v })}
                >
                  <CustomChildren></CustomChildren>
                </Picker>

            {componentArray}
			<ImagePicker
				files={files}
			  	onChange={onChange}
			  	onImageClick={(index, fs) => console.log(index, fs)}
			  	selectable={files.length < 3}
			/>
			<div className={styles.promptText}>上传参赛图片，不大于5M，至少一张，最多三张</div>
			<div className={styles.noteCss}> 
				<TextareaItem
					{...getFieldProps('note')}
  					placeholder="请输入参赛宣言，最多不超过50字"
					rows={4}
					count={50}
				  />
			</div>

			<div className={styles.agreedBox}>
				<div className={agreedRadio} onClick={() => touchAgreedRadio()}></div>
			  	<div className={styles.termsStatus}>同意</div>
				<div className={styles.terms} onClick={() => popTermsFunction()}>用户条款</div>
			</div>

			<div className={styles.buttonBox}>
				<div className={styles.cancelButton} onClick={() => returnPopPageFunction()}>返回主页</div>
				<div className={styles.determineButton} onClick={() => popDetermineFunction()}>确定</div>
			</div>

				<div className="serviceProviders">由闪闪招生宝提供技术支持</div>

 			<Modal
          		title="提示"
          		transparent
				closable={false}
				maskClosable={false}
				visible={showAgreementModal}
          		onClose={() => onClose()}
          		footer={[{ text: '确定', onPress: () => {onClose()} }]}
        		>
          		请先同意条用户条款，再提交信息
			</Modal>
		</div>
    );
};
					
export default createForm()(VoteGameSubmitComponent);
