/*
 *	时间函数(获取当前时间)
 */
export function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			+ " " + date.getHours() + seperator2 + date.getMinutes()
			+ seperator2 + date.getSeconds();
	return currentdate;
}



/*
 *	时间函数(获取当前时间)
 */
export function getTimeDifference(currentTime, otherTime) {

	let timediff = (otherTime - currentTime) / 1000;

	//获取当前的天数
	let d = parseInt(timediff / 86400);
	
	//获取当前剩余的秒数
	let shengyumiaoshu1 = parseInt(timediff % 86400);
	
	//得到小时数
	let h = parseInt(shengyumiaoshu1 / 3600);
	
	//获取当前剩余的秒数
	let shengyumiaoshu2 = parseInt(shengyumiaoshu1 % 3600);
	
	//得到分钟数
	let m = parseInt(shengyumiaoshu2 / 60);
	
	//得到秒数
	let s = parseInt(shengyumiaoshu2 % 60);
	
	return {d : d, h : h, m : m, s : s};	
}

export function calcDifference(time) {
		
	let timediff = time;

	//获取当前的天数
	let d = parseInt(timediff / 86400);
	
	//获取当前剩余的秒数
	let shengyumiaoshu1 = parseInt(timediff % 86400);
	
	//得到小时数
	let h = parseInt(shengyumiaoshu1 / 3600);
	
	//获取当前剩余的秒数
	let shengyumiaoshu2 = parseInt(shengyumiaoshu1 % 3600);
	
	//得到分钟数
	let m = parseInt(shengyumiaoshu2 / 60);
	
	//得到秒数
	let s = parseInt(shengyumiaoshu2 % 60);
	
	return {d : d, h : h, m : m, s : s};	
}


