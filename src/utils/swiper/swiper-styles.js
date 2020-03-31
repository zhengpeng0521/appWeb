window.swiper = function() {
	
    var mySwiper;
	
	function style1() {
		mySwiper = new Swiper('.swiper-container', {
			direction			: 'vertical',
			lazyLoading 		: true,
			mousewheelControl	: true,
			watchSlidesProgress	: true,
			observer			: true,
			observeParents		: true,
			noSwiping 			: true,
			noSwipingClass 		: 'stop-swiping',
			prevButton			:'.swiper-button-prev',
			nextButton			:'.swiper-button-next',
			onInit: function(swiper) {
				swiper.myactive = 0;
			},
			onProgress: function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					var slide 		= swiper.slides[i];
					var progress 	= slide.progress;
					var translate, boxShadow, scale, boxShadowOpacity, es;

					translate		= progress * swiper.height * 0.8;
					scale 			= 1 - Math.min(Math.abs(progress * 0.5), 1);
					boxShadowOpacity= 0;

					slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';

					if (i == swiper.myactive) {
						es = slide.style;
						es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
						es.zIndex=0;
					} else {
						es = slide.style;
						es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
						es.zIndex=1;
					}
				}
			},
			onTransitionEnd: function(swiper, speed) {
				swiper.myactive = swiper.activeIndex;
			},
			onSetTransition: function(swiper, speed) {
				for (var i = 0; i < swiper.slides.length; i++) {
						let es = swiper.slides[i].style;
						es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
				}
			}
		});
		window.mySwiper = mySwiper;
	}
	
	function style2() {
		mySwiper = new Swiper('.swiper-container',{
			prevButton		:'.swiper-button-prev',
			nextButton		:'.swiper-button-next',
			direction 		: 'vertical',
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
		});
		window.mySwiper = mySwiper;
	}
	
	function style3() {
		mySwiper = new Swiper('.swiper-container',{
			prevButton		:'.swiper-button-prev',
			nextButton		:'.swiper-button-next',
			direction 		: 'vertical',
			effect 			: 'coverflow',
			observer		: true,
			observeParents	: true,
			coverflow : {
				rotate		: 80,
				stretch		: 10,
				depth		: 200,
				modifier	: 3,
			}
		});	
		window.mySwiper = mySwiper;
	}
	
	function style4() {
		mySwiper = new Swiper('.swiper-container',{
			direction 			: 'vertical',
			effect		 		: 'cube',
			observer			: true,
			observeParents		: true,
			prevButton			:'.swiper-button-prev',
			nextButton			:'.swiper-button-next',
			cube: {
			  	slideShadows	: true,
			  	shadow			: true,
			  	shadowOffset	: 10,
				shadowScale		: 0.6,
			}
		});
		window.mySwiper = mySwiper;
	}
	
	function style5() {		
		var mySwiper = new Swiper('.swiper-container',{
			effect 				: 'fade',
			direction			: 'vertical',
			observer			: true,
			observeParents		: true,
		})
		window.mySwiper = mySwiper;
	}
	
	window.onload = function() {
		var index 	= window.location.hash.indexOf("?");
		var result 	= window.location.hash.substr(2, index - 2);
		switch (result){ 
			case "microJuneDayPage" 						: style1();break;
			case "microSummerSigningPage" 					: style1();break;
			case "microEnglishPage" 						: style1();break;
			case "microInvitationPage" 						: style1();break;
			case "microMotherDayPage" 						: style2();break;
			case "microFatherDayPage" 						: style2();break;
			case "microEarlyEducationPage" 					: style3();break;
			case "microAutumnRecruitCallPage" 				: style1();break;
			case "microAutumnRecruitSecondPage" 			: style1();break;
			case "microAutumnRecruitThreePage"	 			: style1();break;
			case "microLeafletsDancePage" 					: style1();break;	
			case "microSchoolWouldBeStartingPage" 			: style1();break;
			case "microSchoolWouldBeStartingSecondPage" 	: style1();break;
			case "microAutumnTourismOnePage" 				: style1();break;
			case "microAutumnTourismTwoPage" 				: style1();break;
			case "microLegoOnePage" 						: style1();break;
			case "microLegoTwoPage" 						: style1();break;
			case "microTeachersDayPage" 					: style1();break;
			default : break;
		};
    };
}
window.swiper();

