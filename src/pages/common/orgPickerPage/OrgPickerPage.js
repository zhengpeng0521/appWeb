
import React from 'react';
import { connect } from 'dva';
import { List, Picker } from 'antd-mobile';
/**
 *
 *
 * @class PickerPage
 *
 * @param picker_style			picker样式
 * @param form_input_style		input样式
 * @param window._activity_data {
 * 			campusFrom : 校区列表 json
 * }
 *
 * @extends {React.Component}
 */
class PickerPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || undefined,
			picker_style: this.props.picker_style || undefined,
			form_input_style: this.props.form_input_style || undefined,
		}
		this.onChange = this.onChange.bind(this);
	}


	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.value
		})
	}

	onChange(vue) {
		this.setState({
			value: vue
		})

		this.props.onChange && this.props.onChange(vue);
	}

	render(){

		let data = window._activity_data || {};
		let newList = [], orgList = [];
		if (data && data.campusFrom.length > 0) {
			orgList = JSON.parse(data && data.campusFrom);
			orgList && orgList.map((item, index) => {
				newList.push({
					key: String(index),
					label: item.orgName,
					value: String(item.orgId),
				})
			})
		} else {
			newList = [];
		}

		return (
			<Picker
				data={newList}
				cols={1}
				className={this.state.picker_style}
				onChange={this.onChange}
				value={this.state.value}
				disabled={!newList.length}
			>
				<List.Item arrow="horizontal" style={this.state.form_input_style}></List.Item>
			</Picker>
		)
	}
}

export default PickerPage;




