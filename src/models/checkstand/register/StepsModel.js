import {
    sendMsg,
    saveRegister,
    updateRegister,
    queryRegister,
    bankList,
    cityList,
    queryBankCode,
    queryAppInfo,
} from '../../../services/checkstand/StepService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'StepsModel',

  state: {
      step : 0,   //步骤条数
      title : ['结算信息','商户信息','资质信息'],
      /*第一步*/
      workType: '04',  //商户类型选择
      businessName : '',    //商户名称
      businessShort : '',   //商户简称
      businessPerson : '',  //联系人
      businessTel : '',     //联系人手机
      serviceTel : '',      //客服电话
      /*第二步*/
      firmName : '',       //企业名称
      leading : '',        //负责人
      leadingTel : '',     //负责人电话
      code : '',           //验证码
      leadingSfz : '',     //负责人身份证
      sfzFront : '',       //身份证正面
      sfzOpposite : '',    //身份证反面
      licenceNum : '',     //营业执照注册号
      licenceImg : '',     //营业执照图片
      organizeNum :'',     //组织机构代码
      orgImg : '',         //组织机构代码图片
      accountImg : '',     //开户许可证图片
      orgAddr:'',          //经营地址
      orgAddr_province:'',  //经营地址省
      orgAddr_city:'',      //经营地址市
      /*第三步*/
      bankUser : '',      //户主
      bankNum : '',       //银行卡号
      bankType : '',     //账户类型
      addr : '',          //开户地址
      province : '',      //省
      city : '',          //市
      district : '',      //区
      bankName : '',      //开户银行
      accountOpen : '',   //开户支行
      bankAddrData : {},  //开户地址列表
      bankNameArr : [],   //开户银行列表
      contactLine : '',   //联行号
      orgList: [],
      modalLoading:false,
      mchId : '',
      orgName : '',

      status : '',    //注册审核状态

      orgChoose : '',

      errorMessage : '', //审核报错信息

      flag : false ,    //判断审核失败的两种情况

      auditMsg : '',   //审核状态信息

      bool : false,   //暂时不用

      isSearch : false,  //是否点击搜索
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/StepThreePage') {
                  dispatch({
                    type: 'bankList',
                  });
                  dispatch({
                    type: 'cityList',
                  });
              }
          });
      }
  },

  effects: {
          //手机验证码获取
           *sendMsg({ payload },{ select, call, put}) {
           	  let params = {
              	 data:{
              	 	mobile: payload.leadingTel
              	 }
              };
              let {ret} = yield call( sendMsg, parse(params));
              if( ret && ret.errorCode == 9000 ){
                  Toast.info('发送成功');
              } else {
//               message.error('查询数据出错');
              }
              yield put({
                  type : 'updateState',
                  payload : {
                      loading: true,
                  }
              });
          },

          //开户银行列表获取
           *bankList({ payload },{ select, call, put}) {
           	  let params = {};
              let {ret} = yield call( bankList, parse(params));

              if( ret && ret.errorCode == 9000 ){

              } else {
              }
              yield put({
                  type : 'updateState',
                  payload : {
                      loading: true,
                      bankNameArr : ret.results,
                  }
              });
          },

          //开户地址列表获取
           *cityList({ payload },{ select, call, put}) {
           	  let params = {};
              let {ret} = yield call( cityList, parse(params));

              if( ret && ret.errorCode == 9000 ){

              } else {
              }
              yield put({
                  type : 'updateState',
                  payload : {
                      loading: true,
                      bankAddrData : ret.data,
                     
                  }
              });
          },

           //注册保存
           *saveRegister({ payload },{ select, call, put}) {
           	  yield put({ type : 'showModalLoading' });
              let current_model = yield select(state => state.StepsModel);
              let workType = (payload && payload.workType != undefined) ? payload.workType :current_model.workType;
              let businessName = (payload && payload.businessName != undefined) ? payload.businessName :current_model.businessName;
              let businessShort = (payload && payload.businessShort != undefined) ? payload.businessShort :current_model.businessShort;
              let businessPerson = (payload && payload.businessPerson != undefined) ? payload.businessPerson :current_model.businessPerson;
              let businessTel = (payload && payload.businessTel != undefined) ? payload.businessTel :current_model.businessTel;
              let firmName = (payload && payload.firmName != undefined) ? payload.firmName :current_model.firmName;
              let leading = (payload && payload.leading != undefined) ? payload.leading :current_model.leading;
              let leadingTel = (payload && payload.leadingTel != undefined) ? payload.leadingTel :current_model.leadingTel;
              let leadingSfz = (payload && payload.leadingSfz != undefined) ? payload.leadingSfz :current_model.leadingSfz;
              let sfzFront = (payload && payload.sfzFront != undefined) ? payload.sfzFront :current_model.sfzFront;
              let sfzOpposite = (payload && payload.sfzOpposite != undefined) ? payload.sfzOpposite :current_model.sfzOpposite;
              let licenceNum = (payload && payload.licenceNum != undefined) ? payload.licenceNum :current_model.licenceNum;
              let licenceImg = (payload && payload.licenceImg != undefined) ? payload.licenceImg :current_model.licenceImg;
              let organizeNum = (payload && payload.organizeNum != undefined) ? payload.organizeNum :current_model.organizeNum;
              let orgImg = (payload && payload.orgImg != undefined) ? payload.orgImg :current_model.orgImg;
              let accountImg = (payload && payload.accountImg != undefined) ? payload.accountImg :current_model.accountImg;
              let bankUser = (payload && payload.bankUser != undefined) ? payload.bankUser :current_model.bankUser;
              let bankNum = (payload && payload.bankNum != undefined) ? payload.bankNum :current_model.bankNum;
              let bankType = (payload && payload.bankType != undefined) ? payload.bankType :current_model.bankType;
              let addr = (payload && payload.addr != undefined) ? payload.addr :current_model.addr;
              let serviceTel = (payload && payload.serviceTel != undefined) ? payload.serviceTel :current_model.serviceTel;
              let code = (payload && payload.code != undefined) ? payload.code :current_model.code;
              let mchId = (payload && payload.mchId != undefined) ? payload.mchId :current_model.mchId;
              let account = (payload && payload.account != undefined) ? payload.account :current_model.account;
              let bankName = (payload && payload.bankName != undefined) ? payload.bankName :current_model.bankName;
              let contactLine = (payload && payload.contactLine != undefined) ? payload.contactLine :current_model.contactLine;
              let province = (payload && payload.province != undefined) ? payload.province :current_model.province;
              let city = (payload && payload.city != undefined) ? payload.city :current_model.city;
              let orgAddr = (payload && payload.orgAddr != undefined) ? payload.orgAddr :current_model.orgAddr;
              let orgAddr_province = (payload && payload.orgAddr_province != undefined) ? payload.orgAddr_province :current_model.orgAddr_province;
              let orgAddr_city = (payload && payload.orgAddr_city != undefined) ? payload.orgAddr_city :current_model.orgAddr_city;

              let sfzFrontImgArr = [];
              let sfzFrontImg ='';
              let sfzOppositeImgArr = [];
              let sfzOppositeImg ='';
              let licenceImgArr = [];
              let licenceImgs = '';
              let orgImgArr = [];
              let orgImgs = '';
              let accountImgArr = [];
              let accountImgs = '';

              sfzFrontImgArr = payload.values.sfzFront;
              if(sfzFrontImgArr && sfzFrontImgArr.length>0){
	              	sfzFrontImg = sfzFrontImgArr[0].url;
	          }

              sfzOppositeImgArr = payload.values.sfzOpposite;
              if(sfzOppositeImgArr && sfzOppositeImgArr.length>0){
	             sfzOppositeImg = sfzOppositeImgArr[0].url;
	          }


              licenceImgArr = payload.values.licenceImg;
	          if(licenceImgArr && licenceImgArr.length>0){
	              	licenceImgs = licenceImgArr[0].url;
	          }

              orgImgArr = payload.values.orgImg;
	          if(orgImgArr && orgImgArr.length>0){
	              	orgImgs = orgImgArr[0].url;
	          }

              accountImgArr = payload.values.accountImg;
	          if(accountImgArr && accountImgArr.length>0){
	              	accountImgs = accountImgArr[0].url;
	          }

              let leader = '';
              if(workType == '03'){
                  leader = payload.values.leading;
              }else{
                  leader = bankUser;
              }

              let firm = '';
              if(workType == '03'){
                  firm = bankUser;
              }else{
                  firm = '';
              }

              let bussName = '';
              if(workType == '03'){
                  bussName = bankUser;
              }else{
                  bussName = businessName;
              }

              let address = [];
               address.push(
                   province,
               );
               address.push(
                   city,
               );

               let OrgAddress = '';
			   			 OrgAddress = orgAddr_province + orgAddr_city + orgAddr;
//               OrgAddress.push(
//                orgAddr_province,
//               );
//               OrgAddress.push(
//                orgAddr_city,
//               );
//			   OrgAddress.push(
//				   orgAddr
//			   );

              let params = {
              	data : {
              			workType:workType,
              			businessName:bussName,
              			businessShort:businessShort,
              			businessPerson:businessPerson,
              			businessTel:businessTel,
										firmName:firm,
              			leading:leader,
              			leadingTel:payload.values.leadingTel,
              			sfzFront:sfzFrontImg,
              			leadingSfz:payload.values.leadingSfz,
              			sfzOpposite:sfzOppositeImg,
              			licenceNum:payload.values.licenceNum,
              			licenceImg:licenceImgs,
										organizeNum:payload.values.organizeNum,
										orgImg:orgImgs,
										accountImg:accountImgs,
										bankUser:bankUser,
										bankNum:bankNum,
										bankName:bankName,
										accountOpen:account,
              			addr:address,
              			bankType:bankType,
              			serviceTel:serviceTel,
              			code:payload.values.code,
              			contactLine:contactLine,
										mchId:current_model.mchId,
										sourceOpenId : window._init_data.sourceOpenId,
										sourceMchId : window._init_data.sourceMchId,
										appId : window._init_data.appId,
										orgAddr:OrgAddress,  //经营地址
              		}

              };

              let {ret} = yield call( saveRegister, parse(params));
              if( ret && ret.errorCode == 9000){

              }
              yield put({
                  type : 'updateState',
                  payload : {
                      loading: false,
                      step: 3,
                      status: ret.errorCode == 9000 ? '1' : '3',
                      errorMessage: ret.errorMessage,
                  }
              });
              yield put(routerRedux.push({
                    pathname: 'StepFourPage',
               }))
               yield put({ type : 'closeModalLoading' });
          	},

          	//注册审核不通过修改后保存
           *updateRegister({ payload },{ select, call, put}) {

//	           	yield put({ type : 'showModalLoading' });
				  let current_model = yield select(state => state.StepsModel);
	              let workType = (payload && payload.workType != undefined) ? payload.workType :current_model.workType;
	              let businessName = (payload && payload.businessName != undefined) ? payload.businessName :current_model.businessName;
	              let businessShort = (payload && payload.businessShort != undefined) ? payload.businessShort :current_model.businessShort;
	              let businessPerson = (payload && payload.businessPerson != undefined) ? payload.businessPerson :current_model.businessPerson;
	              let businessTel = (payload && payload.businessTel != undefined) ? payload.businessTel :current_model.businessTel;
	              let firmName = (payload && payload.firmName != undefined) ? payload.firmName :current_model.firmName;
                  let leading = (payload && payload.leading != undefined) ? payload.leading :current_model.leading;
	              let leadingTel = (payload && payload.leadingTel != undefined) ? payload.leadingTel :current_model.leadingTel;
	              let leadingSfz = (payload && payload.leadingSfz != undefined) ? payload.leadingSfz :current_model.leadingSfz;
	              let sfzFront = (payload && payload.sfzFront != undefined) ? payload.sfzFront :current_model.sfzFront;
	              let sfzOpposite = (payload && payload.sfzOpposite != undefined) ? payload.sfzOpposite :current_model.sfzOpposite;
	              let licenceNum = (payload && payload.licenceNum != undefined) ? payload.licenceNum :current_model.licenceNum;
	              let licenceImg = (payload && payload.licenceImg != undefined) ? payload.licenceImg :current_model.licenceImg;
	              let organizeNum = (payload && payload.organizeNum != undefined) ? payload.organizeNum :current_model.organizeNum;
                  let orgImg = (payload && payload.orgImg != undefined) ? payload.orgImg :current_model.orgImg;
                  let accountImg = (payload && payload.accountImg != undefined) ? payload.accountImg :current_model.accountImg;
                  let bankUser = (payload && payload.bankUser != undefined) ? payload.bankUser :current_model.bankUser;
	              let bankNum = (payload && payload.bankNum != undefined) ? payload.bankNum :current_model.bankNum;
	              let bankType = (payload && payload.bankType != undefined) ? payload.bankType :current_model.bankType;
	              let addr = (payload && payload.addr != undefined) ? payload.addr :current_model.addr;
	              let serviceTel = (payload && payload.serviceTel != undefined) ? payload.serviceTel :current_model.serviceTel;
	              let code = (payload && payload.code != undefined) ? payload.code :current_model.code;

	              let sfzFrontImgArr = [];
	              let sfzFrontImg ='';
	              let sfzOppositeImgArr = [];
	              let sfzOppositeImg ='';
	              let licenceImgArr = [];
	              let licenceImgs = '';
                  let orgImgArr = [];
                  let orgImgs = '';
                  let accountImgArr = [];
                  let accountImgs = '';

	              sfzFrontImgArr = payload.values.sfzFront;
	              if(sfzFrontImgArr && sfzFrontImgArr.length>0){
		              	sfzFrontImg = sfzFrontImgArr[0].url;
		          }

	              sfzOppositeImgArr = payload.values.sfzOpposite;
	              if(sfzOppositeImgArr && sfzOppositeImgArr.length>0){
		             sfzOppositeImg = sfzOppositeImgArr[0].url;
		          }

              	  licenceImgArr = payload.values.licenceImg;
	              if(licenceImgArr && licenceImgArr.length>0){
	              	 licenceImgs = licenceImgArr[0].url;
	              }

                  orgImgArr = payload.values.orgImg;
                  if(orgImgArr && orgImgArr.length>0){
                        orgImgs = orgImgArr[0].url;
                  }

                  accountImgArr = payload.values.accountImg;
                  if(accountImgArr && accountImgArr.length>0){
                        accountImgs = accountImgArr[0].url;
                  }

                  let leader = '';
                  if(workType == '03'){
                      leader = payload.values.leading;
                  }else{
                      leader = payload.values.bankUser;
                  }

                  let firm = '';
                  if(workType == '03'){
                      firm = payload.values.bankUser;
                  }else{
                      firm = '';
                  }

            let params = {
	              	data : {
	              			workType:payload.values.workType,
	              			businessName:payload.values.businessName,
	              			businessShort:payload.values.businessShort,
	              			businessPerson:payload.values.businessPerson,
	              			businessTel:payload.values.businessTel,
                            firmName:firm,
	              			leading:leader,
	              			leadingTel:payload.values.leadingTel,
	              			sfzFront:sfzFrontImg,
	              			leadingSfz:payload.values.leadingSfz,
	              			sfzOpposite:sfzOppositeImg,
	              			licenceNum:payload.values.licenceNum,
	              			licenceImg:licenceImgs,
                            organizeNum:payload.values.organizeNum,
                            orgImg:orgImgs,
                            accountImg:accountImgs,
	              			bankUser:bankuser,
	              			bankNum:payload.values.bankNum,
	              			addr:payload.values.addr,
                            bankName:payload.values.bankName,
                            accountOpen:payload.values.accountOpen,
	              			bankType:payload.values.bankType,
	              			serviceTel:payload.values.serviceTel,
	              			code:payload.values.code,
                            sourceOpenId : window._init_data.sourceOpenId,
                            sourceMchId : window._init_data.sourceMchId,
                            appId : window._init_data.appId,
	              		}

         		};

	           let {ret} = yield call( updateRegister, parse(params));
	              yield put({
	                  type : 'updateState',
	                  payload : {
	                      loading: false,
	                      step: 3,
	                      status: ret.errorCode == 9000 ? '1' : '3',
	                      errorMessage: ret.errorMessage,
	                  }
	              });
//	               yield put({ type : 'closeModalLoading' });
          	},
  },

  reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
     //加载状态
     showModalLoading( state, action ){
        return { ...state, modalLoading : true };
     },
     closeModalLoading( state, action ){
        return { ...state, modalLoading : false };
     },
  },

};
