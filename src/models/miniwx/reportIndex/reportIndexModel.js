import {
	getSellerJobList,              //销售工作表 列表数据
	getSellerPerfortList,          //销售业绩表 列表数据
	getStuUseClassList,            //学员消课表 列表数据
	getStuCheckList,               //学员考勤表 列表数据

	getSellerJobListByYear,        //按年月 查询销售工作表 列表数据
	getSellerPerfortListByYear,    //按年月 查询销售业绩表 列表数据
	getStuUseClassListByYear,      //按年月 查询学员消课表 列表数据
	getStuCheckListByYear   ,       //按年月 查询学员考勤表 列表数据
    queryUserMenu,

} from '../../../services/miniwx/reportIndex/reportIndexService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Toast } from 'antd-mobile';

export default {

    namespace : 'reportIndexModel',
    state : {
		orgName             : undefined,                       //机构名称
		orgId               : undefined,                       //机构编号
		token               : undefined,

		sellerJobList       : [],                              //销售工作表 列表数据
		sellerPerfortList   : [],                              //销售业绩表 列表数据
		stuUseClassList     : [],                              //学员消课表 列表数据
		stuCheckList        : [],                              //学员考勤表 列表数据

		timeVisible         : false,                           //搜索框显隐
		startDate           : moment(),
		endDate             : moment(),
		timeSelectKey       : 'today',                         //所选筛选 key值
		timeSelectValue     : '今日',                           //所选筛选 value值

		selectedYear        : undefined,                       //所选年份 ( timeSelectKey yearAndMonth有值 )
		selectedMonth       : undefined,                       //所选月份 ( timeSelectKey yearAndMonth有值 )

        wetheropen          : true,                       //是否开通报表

	},
    subscriptions : {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/reportIndex' ) {
                    //判断是否开通报表权限
                    dispatch({
						type : 'queryUserMenu',
						payload : {
                            userId : userId
                        }
					})
					dispatch({ //回到报表首页 若时间框未隐藏着隐藏
						type : 'reportFormSearchModel/updateState',
						payload : { timeVisible : false }
					})
					//数据初始化
					dispatch({
						type : 'updateState',
						payload : {
							orgName : orgName,
						}
					})
					//调用接口得到 首页所需列表数据
					dispatch({ type : 'getReportFormListParams' });

              	}
		  	});
		},
    },

    effects: {
        //初次进入页面得到调用报表列表数据 所需接口
		*queryUserMenu({ payload },{ call, put, select }){
            let { params } = payload;
            let state = yield select( state => state.reportIndexModel );
			let sellerJob = yield call( queryUserMenu, ( params ) );
            let reportList = sellerJob.ret.results[1];
            if(reportList.children.length==0){
                yield put({ type : 'updateState', payload : { wetheropen : false } })
            }else{
                yield put({ type : 'updateState', payload : { wetheropen : true } })
            }

		},



		//初次进入页面得到调用报表列表数据 所需接口
		*getReportFormListParams({ payload },{ call, put, select }){
			let state = yield select( state => state.reportIndexModel );
			if( state.timeSelectKey === 'yearAndMonth' ){   //年月搜索
				let params = {
					year  : state.selectedYear[0],
					month : (!!state.selectedMonth && state.selectedMonth[0]) || undefined
				}
				yield put({ type : 'getReportFormListByYear', payload : { params } })
			}else{  //其他条件搜索, 传入参数为开始时间 和 结束时间
				let params = {
					startDate : state.startDate.format('YYYYMMDD'),
					endDate   : state.endDate.format('YYYYMMDD')
				}
				yield put({ type : 'getReportFormList', payload : { params } });
			}
		},

		//按开始时间 结束时间查询 报表首页列表数据
		*getReportFormList({ payload },{ call, put, select }){
			let { params } = payload;
			//得到销售工作表 列表数据
			let sellerJob = yield call( getSellerJobList, ( params ) );
			if( sellerJob && sellerJob.ret && sellerJob.ret.errorCode === 9000 && sellerJob.ret.results != null ){
				yield put({ type : 'updateState', payload : { sellerJobList : sellerJob.ret.results }})
			}else if( sellerJob && sellerJob.ret && sellerJob.ret.errorCode === 9000 && sellerJob.ret.results == null ){
                yield put({ type : 'updateState', payload : { sellerJobList : [] }})
            }else{
				Toast.info( sellerJob && sellerJob.ret && sellerJob.ret.errorMessage || '获取销售工作表数据失败', 1 )
			}

			//得到销售业绩表 列表数据
			let sellerPerfort = yield call( getSellerPerfortList, ( params ) );
			if( sellerPerfort && sellerPerfort.ret && sellerPerfort.ret.errorCode === 9000 && sellerPerfort.ret.results != null){
				yield put({ type : 'updateState', payload : { sellerPerfortList : sellerPerfort.ret.results }})
			}else if( sellerPerfort && sellerPerfort.ret && sellerPerfort.ret.errorCode === 9000 && sellerPerfort.ret.results == null){
                 yield put({ type : 'updateState', payload : { sellerPerfortList : [] }})
            }else{
				Toast.info( sellerPerfort && sellerPerfort.ret && sellerPerfort.ret.errorMessage || '获取销售业绩表数据失败', 1 )
			}

			//得到学员消课表 列表数据
			let stuUseClass = yield call( getStuUseClassList, ( params ) );
			if( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorCode === 9000 &&　stuUseClass.ret.results!=null){
				yield put({ type : 'updateState', payload : { stuUseClassList : stuUseClass.ret.results }})
			}else if( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorCode === 9000 &&　stuUseClass.ret.results==null){
				yield put({ type : 'updateState', payload : { stuUseClassList : [] }})
			}else{
				Toast.info( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorMessage || '获取学员消课表数据失败', 1 )
			}

			//得到学员考勤表 列表数据
			let stuCheck = yield call( getStuCheckList, ( params ) );
			if( stuCheck && stuCheck.ret && stuCheck.ret.errorCode === 9000 && stuCheck.ret.results!=null ){
				yield put({ type : 'updateState', payload : { stuCheckList : stuCheck.ret.results }})
			}else if( stuCheck && stuCheck.ret && stuCheck.ret.errorCode === 9000 && stuCheck.ret.results==null ){
				yield put({ type : 'updateState', payload : { stuCheckList : [] }})
			}else{
				Toast.info( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorMessage || '获取学员考勤表数据失败', 1 )
			}
		},

		//按年月查询
		*getReportFormListByYear({ payload },{ call, put, select }){
			let { params } = payload;
			//得到销售工作表 列表数据
			let sellerJob = yield call( getSellerJobListByYear, ( params ) );
			if( sellerJob && sellerJob.ret && sellerJob.ret.errorCode === 9000 && sellerJob.ret.results !=null ){
				yield put({ type : 'updateState', payload : { sellerJobList : sellerJob.ret.results }})
			}else if( sellerJob && sellerJob.ret && sellerJob.ret.errorCode === 9000 && sellerJob.ret.results ==null ){
                yield put({ type : 'updateState', payload : { sellerJobList : [] }})
            }else{
				Toast.info( sellerJob && sellerJob.ret && sellerJob.ret.errorMessage || '获取销售工作表数据失败', 1 )
			}

			//得到销售业绩表 列表数据
			let sellerPerfort = yield call( getSellerPerfortListByYear, ( params ) );
			if( sellerPerfort && sellerPerfort.ret && sellerPerfort.ret.errorCode === 9000 && sellerPerfort.ret.results!=null){
				yield put({ type : 'updateState', payload : { sellerPerfortList : sellerPerfort.ret.results }})
			}
            else if( sellerPerfort && sellerPerfort.ret && sellerPerfort.ret.errorCode === 9000 && sellerPerfort.ret.results==null){
				yield put({ type : 'updateState', payload : { sellerPerfortList : [] }})
			}else{
				Toast.info( sellerPerfort && sellerPerfort.ret && sellerPerfort.ret.errorMessage || '获取销售业绩表数据失败', 1 )
			}

			//得到学员消课表 列表数据
			let stuUseClass = yield call( getStuUseClassListByYear, ( params ) );
			if( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorCode === 9000 && stuUseClass.ret.results!=null){
				yield put({ type : 'updateState', payload : { stuUseClassList : stuUseClass.ret.results }})
			}else if( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorCode === 9000 && stuUseClass.ret.results==null){
				yield put({ type : 'updateState', payload : { stuUseClassList : [] }})
			}else{
				Toast.info( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorMessage || '获取学员消课表数据失败', 1 )
			}

			//得到学员考勤表 列表数据
			let stuCheck = yield call( getStuCheckListByYear, ( params ) );
			if( stuCheck && stuCheck.ret && stuCheck.ret.errorCode === 9000 && stuCheck.ret.results!=null ){
				yield put({ type : 'updateState', payload : { stuCheckList : stuCheck.ret.results }})
			}else if( stuCheck && stuCheck.ret && stuCheck.ret.errorCode === 9000 && stuCheck.ret.results==null ){
				yield put({ type : 'updateState', payload : { stuCheckList : [] }})
			}else{
				Toast.info( stuUseClass && stuUseClass.ret && stuUseClass.ret.errorMessage || '获取学员考勤表数据失败', 1 )
			}
		},

		//点击搜索
		*onSearchToList({ payload },{ call, put, select }){
			let { values } = payload;
			if( !!values.timeSelectKey && values.timeSelectKey === 'yearAndMonth' ){   //年月搜索 传参为 年月
				let params = {
					year : values.selectedYear[0],
					month : (!!values.selectedMonth && values.selectedMonth[0]) || undefined
				}
				yield put({ type : 'getReportFormListByYear', payload : { params } });
			}else{  //其他条件搜索, 传入参数为开始时间 和 结束时间
				let params = {
					startDate : values.startDate.format('YYYYMMDD'),
					endDate   : values.endDate.format('YYYYMMDD')
				}
				yield put({ type : 'getReportFormList', payload : { params } });
			}
			yield put({ type : 'updateState', payload : { ...values } })
		}
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
