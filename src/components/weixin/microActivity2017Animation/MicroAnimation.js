import React, {PropTypes} from 'react';
import styles from './MicroAnimation.less';
import SvgAnimation from '../../common/commonLess/SvgAnimation.js';
import {setFontFamily} from '../../../utils/setFontFamily/setFontFamily.js';
import * as AniFunction from '../../common/commonLess/AnimationLibFunction.js';

function MicroMotherDayComponent({

	dp,
	newClassName,

}) {
	
	function updateClassName(name) {
		dp('updateState', {newClassName : styles[name]});
	}

	function textPrint () {
		AniFunction.setTextPrint('加油不错啊');
	}
	
	function wanbi() {
		
	}
	
	let text = '字体打印';
	let isTrue = true;

	return(
		<div>
			{/*
				<div className="base_text3" onClick={setFontFamily('35b4c24968c44a4dbec1a99745059f98', '测试文字', '.base_text3')}>测试文字</div>	
				<div className="base_text4" onClick={setFontFamily('4c936ec5943e4c5fb41cc5b8883e94a8', '测试文字', '.base_text4')}>测试文字</div>
				<div className="base_text5" onClick={setFontFamily('08dec71ab55a4a67b2f08b566523966f', '测试文字', '.base_text5')}>测试文字</div>
				<div className="base_text6" onClick={setFontFamily('563f55dda6ec4bf586a6d1d0783a1744', '测试文字', '.base_text6')}>测试文字</div>
				<div className="base_text7" onClick={setFontFamily('f973d188689040a88a23299c64d85fd5', '测试文字', '.base_text7')}>测试文字</div>
				<div className="base_text8" onClick={setFontFamily('ff8a1f3e4edf4d80ae5aed68f0f94a7d', '测试文字', '.base_text8')}>测试文字</div>
				<div className="base_text9" onClick={setFontFamily('77ba04dbca82475c92c39fab0d5f0f37', '测试文字', '.base_text9')}>测试文字</div>
			*/}

			{isTrue ? AniFunction.setText(0, text) : text}
			<div id="base" className={newClassName}></div>
			<div className={styles.text} onClick={() => updateClassName('ani_zhujianxianshi')}>逐渐显示</div>
			<div className={styles.text} onClick={() => updateClassName('ani_zhujianbianda')}>逐渐变大</div>
			<div className={styles.text} onClick={() => updateClassName('ani_zhujianbianxiao')}>逐渐变小</div>
			<div className={styles.text} onClick={() => updateClassName('ani_zuocedanchu')}>左侧淡出</div>		
			<div className={styles.text} onClick={() => updateClassName('ani_zuocedanru')}>左侧淡入</div>
			<div className={styles.text} onClick={() => updateClassName('ani_youcedanchu')}>右侧淡出</div>
			<div className={styles.text} onClick={() => updateClassName('ani_youcedanru')}>右侧淡入</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shangxiabaidong')}>上下摆动</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shangxiatiaodong')}>上下卡顿</div>
			<div className={styles.text} onClick={() => updateClassName('ani_gaokongdiaoluo')}>上升掉落</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shangshengxiaoshi')}>上升消失</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shangshengpinghuan')}>上升平缓</div>	
			<div className={styles.text} onClick={() => updateClassName('ani_zuoyouhuangdong')}>左右晃动</div>
			<div className={styles.text} onClick={() => updateClassName('ani_gudinghuangdong')}>固定中心点左右晃动(小角度)</div>
			<div className={styles.text} onClick={() => updateClassName('ani_gudinghuangdongjulie')}>固定中心点左右晃动(大角度)</div>
			<div className={styles.text} onClick={() => updateClassName('ani_doudong')}>抖动</div>
			<div className={styles.text} onClick={() => updateClassName('ani_buguizedoudong')}>不规则抖动</div>
			<div className={styles.text} onClick={() => updateClassName('ani_quanpingchuanguoRL')}>右向左全屏穿过</div>
			<div className={styles.text} onClick={() => updateClassName('ani_quanpingchuanguoLR')}>左向右全屏穿过</div>
			<div className={styles.text} onClick={() => updateClassName('ani_congshangchuxianduan')}>从上到下出现-短距离</div>
			<div className={styles.text} onClick={() => updateClassName('ani_congshangchuxianchang')}>从上到下出现-长距离</div>
			<div className={styles.text} onClick={() => updateClassName('ani_baidongtingzhi')}>摆动停止</div>
			<div className={styles.text} onClick={() => updateClassName('ani_liuxing')}>流星动画</div>
			<div className={styles.text} onClick={() => updateClassName('ani_360xuanzhuan')}>360°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_xuanzhuanchuxian')}>旋转出现</div>
			<div className={styles.text} onClick={() => updateClassName('ani_xintiao')}>心跳</div>			
			<div className={styles.text} onClick={() => updateClassName('ani_dayin')}>打印</div>	
			<div className={styles.text} onClick={() => updateClassName('ani_big_doudong')}>逐渐变大加抖动</div>	
			<div className={styles.text} onClick={() => updateClassName('ani_zuobaiqiu')}>左摆球</div>	
			<div className={styles.text} onClick={() => updateClassName('ani_youbaiqiu')}>右摆球</div>
			{/*<SvgAnimation />*/}


			<div className={styles.text} onClick={() => updateClassName('ani_congxiachuxianduan')}>从下到上出现-短距离</div>
			<div className={styles.text} onClick={() => updateClassName('ani_congxiachuxianchang')}>从下到上出现-长距离</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shacheyidongzuo')}>刹车后移动(左侧进入)</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shacheyidongyou')}>刹车后移动(右侧进入)</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shacheyidongshang')}>刹车后移动(上侧进入)</div>
			<div className={styles.text} onClick={() => updateClassName('ani_shacheyidongxia')}>刹车后移动(下侧进入)</div>
			<div className={styles.text} onClick={() => updateClassName('ani_xiajiangxiaoshi')}>下降消失</div>


			<div className={styles.text} onClick={() => updateClassName('ani_180xuanzhuan')}>180°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_90xuanzhuan')}>90°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_45xuanzhuan')}>45°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_contrary_360xuanzhuan')}>反向360°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_contrary_180xuanzhuan')}>反向180°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_contrary_90xuanzhuan')}>反向90°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_contrary_45xuanzhuan')}>反向45°旋转</div>
			<div className={styles.text} onClick={() => updateClassName('ani_ani_huximoshi')}>呼吸</div>







		</div>
    );
}

export default MicroMotherDayComponent;