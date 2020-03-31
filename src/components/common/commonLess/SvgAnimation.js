import React, {PropTypes} from 'react';

function MicroSvgComponent({

	svg_path_d,
	svg_height,
	svg_width,
	svg_viewBox_x,
	svg_viewBox_y,
	svg_viewBox_w,
	svg_viewBox_h,
	
}) {
	
	svg_width = document.body.clientWidth;
	svg_height = document.body.clientHeight * 0.3;
	
	let seagulls = (
		<animateMotion dur="6s" repeatCount="indefinite" rotate="auto" >
		   <mpath xlinkHref="#theMotionPath" />
		</animateMotion>
	)

	svg_viewBox_x = 0;
	svg_viewBox_y = 0;
	svg_viewBox_w = 0;
	svg_viewBox_h = 0;

	return(
		<div>
			<svg
				width={svg_width}
				height={svg_height}
				viewBox={svg_viewBox_x, svg_viewBox_y, svg_viewBox_w, svg_viewBox_h}
				preserveAspectRatio="xMinYMin meet"
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				style={{position : "relative"}}
			>
				<path d="M13.688,177.906 C13.688,177.906 106.688,264.906 284.687,158.906 C374.687,110.906 436.688,137.906 558.688,166.906 C765.687,193.906 541.687,-51.094 326.687,11.906 C111.688,74.906 -44.312,110.906 13.688,177.906 Z"
						stroke="lightgrey"
						strokeWidth="0"
						fill="none"
						id="theMotionPath"/>
				<path fill="#FFFFFF" d="M47,36c0,0-3.2-18.4,1.4-23.2c4.6-4.8-12-4.6-35.1-6c0,0,29.5,7.3,28.1,30.5l-7.1,1.4l6.9,11.6l2.7-9.6c0,0,24,2.1,24.6,31.5c0,0,7-17.2-0.6-36.7C67.9,35.4,54,41.1,47,36z">
				{seagulls}
				</path>
				<path d="M38.4,8.2c0,0-16.7-1.1-25.1-1.5c0,0,15.4,6,18.4,9.5l-1.5-3.2l2.1-0.2l-0.8-1.4C31.5,11.5,32.3,9.3,38.4,8.2z">
				{seagulls}
				</path>
				<path d="M61.6,50.7c0,0,7.5,10.6,6.8,21.4c0,0,4.2-9.3,2.6-23.5l-1.4,2.5l-1.2-2.5l-0.3,2.2l-2.4-2.7l-0.4,3.2L61.6,50.7z">
				{seagulls}
				</path>
	  		</svg>
		</div>
    );
}

export default MicroSvgComponent;