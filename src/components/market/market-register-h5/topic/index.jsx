import DefaultTopic from './default/DefaultTopic';
import defaultStyles from './default/DefaultTopic.less';

import CartoonTopic from './cartoon/Topic';
import cartoonStyles from './cartoon/Topic.less';


import LimpidTopic from './limpid/Topic';
import limpidStyles from './limpid/Topic.less';


let defaultTopic = {
	styles: defaultStyles,
	component: DefaultTopic,
}


let cartoonTopic = {
	styles: cartoonStyles,
	component: CartoonTopic,
}

let limpidTopic = {
	styles: limpidStyles,
	component: LimpidTopic,
}

export {
	defaultTopic,
	cartoonTopic,
	limpidTopic,
};
