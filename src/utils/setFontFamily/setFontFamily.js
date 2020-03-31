export function setFontFamily(AccessKey="", Content="", Tag="") {
	let entity = {
		AccessKey	: AccessKey, 　	 //AccessKey即是字体的代码，登录有字库后，在字体列表中获取。
		Content		: Content, 　　　 //Content即时当前需要用到的文字内容 
		Tag			: Tag,　　　　　　//可不填的参数 
	}; 

	$youzikuClient.getFontFace(entity, function (result) { 
		 //如果没有填写Tag参数，则需要通过FontFamily将字体效果应用于文字上
	});
};

