var service = require('../../common/common.js');
export async function queryUserMenu(params) {
    return service.generalMiniWxCharacteristics( '/menu/queryUserMenu', params );
}
//请求首页banner数据
export async function queryBanner(params) {
    return service.generalMiniWxCharacteristics( '/orgHomeController/queryBanner', params );
}

//销售工作表 列表数据
export async function getSellerJobList( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/sellerJobDataOverviewSe', params );
}

//销售业绩表 列表数据
export async function getSellerPerfortList( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/sellerPerforDataOverviewSe', params );
}

//学员消课表 列表数据
export async function getStuUseClassList( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/course/stuPeriodDataOverviewByCourseSe', params );
}

//学员考勤表 列表数据
export async function getStuCheckList( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/course/stuCheckDataOverviewByCourseSe', params );
}

//按年月 查询销售工作表 列表数据
export async function getSellerJobListByYear( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/sellerJobDataOverviewYe', params );
}

//按年月 查询销售业绩表 列表数据
export async function getSellerPerfortListByYear( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/sellerPerforDataOverviewYe', params );
}

//按年月 查询学员消课表 列表数据
export async function getStuUseClassListByYear( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/course/stuPeriodDataOverviewByCourseYe', params );
}

//按年月 查询学员考勤表 列表数据
export async function getStuCheckListByYear( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/course/stuCheckDataOverviewByCourseYe', params );
}


//报表详情
//进入报表详情 查询报表类型 下拉列表
export async function getTypeSelectList( params ) {
    return service.generalMiniWxCharacteristics( '/reportIndex/getSmallKeyByBigKey', params );
}

//点击下拉列表切换 报表类型
export async function clickToChangeType( params ) {
    return service.generalMiniWxCharacteristics( params.url, params );
}

//点击下拉列表切换报表类型 按照年月
export async function clickToChangeTypeByYear( params ) {
    return service.generalMiniWxCharacteristics( params.url, params );
}
