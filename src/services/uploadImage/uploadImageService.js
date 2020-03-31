import qs from 'qs';

var BASETHINKNODE = '/thinknode';

//图片上传接口
export async function uploadImage(params) {
	
  	return requestData(`${BASETHINKNODE}/upload/imageBase64`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(params),
  	});
}

//图片上传接口
//param : 是图片的file
export async function uploadImageFile(params) {
	
	let value = undefined;
	
	return new Promise(function(resolve, reject) {
	
		var formData = new FormData();

		formData.append("file", params);

		var request = new XMLHttpRequest();

		request.open("post", `${BASETHINKNODE}/upload/image`);

			request.onload = function(oEvent) {

				if(oEvent.currentTarget.status === 200) {		

					 value = resolve(JSON.parse(oEvent.currentTarget.response));
					
				} else {
					reject(new Error('图片上传失败'))
				}
			}

		request.send(formData);	
	}).catch(function(err) {
		_(err);	
	})
}