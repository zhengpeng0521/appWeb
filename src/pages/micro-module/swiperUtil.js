/*
 * 解析不同的翻页效果
 * type_1 位移
 * type_2 3D流
 * type_3 淡入
 * type_4 方块
 * type_5 翻转
 */
export function swiperTypeParse(swiperType, switchDir, handle) {
    switchDir = switchDir || 'vertical';
    
    let swiper;
    if(swiperType == 'type_1') {   //翻页模式-- 位移切换
        swiper = new Swiper('.swiper-container',{
            direction 		: switchDir,
            effect 			: 'slide',            //slide的切换效果，默认为"slide"（位移切换），可设置为"fade"（淡入）"cube"（方块）"coverflow"（3d流）"flip"（3d翻转）。
            centeredSlides	: true,              //设定为true时，活动块会居中，而不是默认状态下的居左。
            observer		: true,           //启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            observeParents	: true,      //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            scrollbarDraggable: true,
            scrollbarSnapOnRelease: false,
            ...handle
        });

    } else if(swiperType == 'type_2') {                          //翻页模式-- 3d流
        swiper = new Swiper('.swiper-container',{
            direction 		: switchDir,
            effect 			: 'coverflow',
            centeredSlides	: true,
            observer		: true,
            observeParents	: true,
            coverflow : {
                rotate		: 30,
                stretch		: 10,
                depth		: 60,
                modifier	: 2,
                slideShadows: true
            },
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            scrollbarDraggable: true,
            scrollbarSnapOnRelease: false,
            ...handle
        });

    } else if(swiperType == 'type_3') {                          //翻页模式--淡入
        swiper = new Swiper('.swiper-container',{
            direction 		: switchDir,
            effect 			: 'fade',
            fade: {
              crossFade: true,
            },

            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            scrollbarDraggable: true,
            scrollbarSnapOnRelease: false,
            ...handle
        });

    } else if(swiperType == 'type_4') {                          //翻页模式--方块
        swiper = new Swiper('.swiper-container',{
            direction 		: switchDir,
            effect 			: 'cube',
            cube: {
              slideShadows: false,
              shadow: false,
              shadowOffset: 2,
              shadowScale: 0.1,
            },

            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            scrollbarDraggable: true,
            scrollbarSnapOnRelease: false,
            ...handle
        });

    } else if(swiperType == 'type_5') {                          //翻页模式--翻转
        swiper = new Swiper('.swiper-container',{
            direction 		: switchDir,
            effect 			: 'flip',

            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            scrollbarDraggable: true,
            scrollbarSnapOnRelease: false,
            ...handle
        });

    } else {     //默认的翻页方式
    	
        swiper = new Swiper('.swiper-container',{
            direction 		: switchDir,
            effect 			: 'coverflow',
            centeredSlides	: true,
            observer		: true,
            observeParents	: true,
            coverflow : {
                rotate		: 30,
                stretch		: 10,
                depth		: 60,
                modifier	: 2,
                slideShadows: true
            },
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            scrollbarDraggable: true,
            scrollbarSnapOnRelease: false,
            ...handle
        });
    }

    return swiper;
}
