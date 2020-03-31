import React from 'react';
import styles from './EvaluateComponent.less';

class EvaluateComponent extends React.Component{

	constructor(props) {
        super( props );
		this.state = {
			num      : 0,           //评价级别
		}

		/*手动绑定函数*/
		this.selectedLevel = this.selectedLevel.bind( this );
		this.resetNum = this.resetNum.bind( this );
    }

	resetNum(){
		this.setState({
			num : 0
		})
	}

	//点击选择评价级别
	selectedLevel( value ){
		this.setState({
			num : value
		})
		!!this.props.getNum && this.props.getNum( value, this.resetNum )
	}

	render(){

		let { num } = this.state;
		let { selectedLevel } = this;
		let arr = Array.from({ length : 5 });

		return (
			<ul className = { styles.evaluate_wrap } >
				{
					arr.map(function( item, index ){
						if( index < num ){
							return ( <li key = { 'evaluate_' + index } className = { styles.selected } onClick = { () => selectedLevel( index + 1 ) } ></li> )
						}else{
							return ( <li key = { 'evaluate_' + index } className = { styles.notSelected } onClick = { () => selectedLevel( index + 1 ) } ></li> )
						}
					})
				}
			</ul>
		)
	}
}

export default EvaluateComponent;
