import React, {PropTypes} from 'react';
import styles from './microBarrageComponent.less';
import BarrageComponent from '../../../components/weixin/commonComponent/barrageComponent/barrageComponent.js';

function MicroBarrageComponent({

	index, nIndex, data, dp, barrageSwitch,

}) {
	
	function updateProps(value) {
		dp('updateState', {barrageSwitch : !barrageSwitch});
	}
	
	let props = {
		barrageData : ["这是一段话", '也是元话', '哎呦不错啊哎呦不错啊哎呦不错啊哎呦不错', '菜鸟', '金鸡路', 'sm', '什么', '这是一条评论怒', '这是上面鬼啊', '我去', '套搞笑了', '不行了', 'OMG', 'baby', 'Hi', '我是一只小小小小鸟', '款要放假了，心情好爽啊啊', '啊哈哈哈哈', '骄傲了开始搭建埃里克森',"这是一段话", '也是元话', '哎呦不错啊哎呦不错啊哎呦不错啊哎呦不错', '菜鸟', '金鸡路', 'sm', '什么', '这是一条评论怒', '这是上面鬼啊', '我去', '套搞笑了', '不行了', 'OMG', 'baby', 'Hi', '我是一只小小小小鸟', '款要放假了，心情好爽啊啊', '啊哈哈哈哈',],
		barrageSwitch : barrageSwitch,
		callbackFunction : updateProps,
	}

	return(
		<div className="barrage">
			<div className={styles.page1_background}>
				<BarrageComponent {...props} />
			</div>
		</div>
    );
}

export default MicroBarrageComponent;
