import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MarketRegisterComponent from '../../../components/market/market-register-h5/RegisterH5';

function MarketRegisterPage({ location, dispatch, market_register }) {

	let {

		configData,
		invalid,
		showText,
		submitAfterData,
		userId,
		touchSubmit,
		showSuccess,
		checkBoxall,
		checkChose

	} = market_register;

	function dp(name, param) {
		dispatch({
			type: `market_register/${name}`,
			payload: {
				...param
			}
		})
	}
	function changeSubmiteBtnStatus() {
		dp('updateState', { touchSubmit: !touchSubmit });
	}

	function onCloseShowSuccessFunction() {
		dp('updateState', { showSuccess: !showSuccess });
	}
	// function clearCheck() {
	// 	let numObject = {}
	// 	let fromConfig = Object.keys(configData).length > 0 ? JSON.parse(configData && configData.baseForm) : undefined;
	// 	let newForm = fromConfig[fromConfig.length - 1]
	// 	if (newForm.type == 'newForm') {
	// 		newForm.newForm && newForm.newForm.map((item, index) => {
	// 			if (item.name == 'choseBox') {
	// 				fromConfig.push({ label: item.con, name: item.name + index })
	// 			}
	// 		})
	// 	}
	// 	fromConfig && fromConfig.map((item, index) => {
	// 		if (checkBoxall[item.name] != undefined) {
	// 			checkBoxall[item.name] = []
	// 			checkChose[item.name] = []
	// 			numObject[item.name] = []
	// 			dispatch({
	// 				type: 'market_register/updateState',
	// 				payload: {
	// 					checkBoxall: numObject,
	// 					checkChose:numObject
	// 				}
	// 			})
	// 		}
	// 	})
	// }

	function updateStateProps(value) {
		dp('updateState', { configData: value });
	}
	function CheckboxChange(value, e, num, values) {
		let name = 'choseBox' + num
		let newObj = checkBoxall
		let numName = checkBoxall[name]
		let newObjs = checkChose
		let numNames = checkChose[name]
		if (e.target.checked == true) {
			numName.push(value)
			numNames.push(values)
		} else {
			let indexName = numName.indexOf(value)
			let indexNames = numNames.indexOf(values)
			numName.splice(indexName, 1)
			numNames.splice(indexNames, 1)
		}
		dispatch({
			type: 'market_register/updateState',
			payload: {
				checkBoxall: newObj,
				checkChose: newObjs
			}
		})
	}

	let props = {
		invalid,
		userId,
		configData,
		showText,
		touchSubmit,
		showSuccess,
		changeSubmiteBtnStatus,
		submitAfterData,
		updateStateProps,
		onCloseShowSuccessFunction,
		checkBoxall,
		checkChose,
		CheckboxChange,
		// clearCheck,
		sunmitCallFunction: (vue) => dp('submitValue', { ...vue }),
		updateStateModalParam: (vue) => dp('updateState', { invalid: !invalid }),
	}

	return (
		<MarketRegisterComponent {...props} />
	);
}

MarketRegisterPage.propTypes = {
	market_register: PropTypes.object,
	dispatch: PropTypes.func,
};

function mapStateToProps({ market_register }) {
	return { market_register };
}

export default connect(mapStateToProps)(MarketRegisterPage);
