const webpack = require('atool-build/lib/webpack');
const pxtorem = require('postcss-pxtorem');
const path = require('path');

module.exports = function(webpackConfig, env) {
	
 	const svgDirs = [ 
		//require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
		//path.resolve(__dirname, 'src/myIcon'),  // 2. 自己私人的 svg 存放目录
 	];
	
	webpackConfig.module.loaders.forEach(loader => {
		if (loader.test && typeof loader.test.test === 'function' && loader.test.test('.svg')) {
		  loader.exclude = svgDirs;
		}
  	});
	
	 webpackConfig.module.loaders.unshift({
		 test: /\.(svg)$/i,
		 loader: 'svg-sprite',
		 include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
	 });
	
  webpackConfig.babel.plugins.push('transform-runtime');

  postcss: [
    pxtorem({
        rootValue: 100,
        propWhiteList: [],
    })
  ];
  
  webpackConfig.babel.plugins.push(['import', {
	  libraryName: 'antd-mobile',
	  style: 'css',
  }]);

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  //Don't extract common.js and common.css
//  webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
//    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
//  });

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
      test: /\.css$/;
      loader: 'style!css!postcss';
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
      test: /\.css$/;
      loader: 'style!css!postcss';
    }

  });

  return webpackConfig;
};
