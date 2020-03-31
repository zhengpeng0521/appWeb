import qs from 'qs';

var BASETHINKNODE = '/thinknode';
let gameCode = 'vote';

//实例首页基本信息
export async function queryVoteGameData(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/queryGameInfo',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}

//获取排行榜列表数据
export async function queryRankingList(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/player/ranking',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}


//获取个人主页接口
export async function queryPlayerDetails(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/queryPlayerDetails',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}

//投票
export async function voteGameDone(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/done',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}

//获取表单接口
export async function queryGameFormConfig(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/queryGameFormConfig',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}


//提交接口
export async function voteGameApply(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/apply',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}

//提交接口
export async function getOgranData(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/queryOrgInfo',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}

//分享接口
export async function getShare(params) {
	
	let service_param = {
		service : BASE_URL + '/game/vote/queryShareInfo',
		data : params,
	}
	
  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}

//获取表单接口

export async function getGameFormConfig(params){
    let service_param = {
		service : BASE_URL + '/game/vote/getGameFormConfig',
		data : params,
	}

  	return requestData(`${BASETHINKNODE}/game/${gameCode}/mApi`, {
    	method: 'post',
    	headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
    	},
    	body: qs.stringify(service_param),
  	});
}





