var webpack 		  = require('webpack');
var Ex				  = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置
var WEBPACK_ENV		  = process.env.WEBPACK_ENV || 'dev';
console.log( WEBPACK_ENV);
//获取html-webpack-plugin参数的方法
var getHtmlConfig 	  = function(name,title){
	return{
			template : './src/view/' + name + '.html',
			filename : 'view/' + name + '.html',
			title	 : title,
			inject	 : true,
			hash	 : true,
			chunks	 : ['common',name]
		};
	};
var config = {
	//页面入口文件
	entry : {
		'common'		: ['./src/page/common/index.js'],
		'index' 		: ['./src/page/index/index.js'],
		'user-login' 	: ['./src/page/user-login/index.js'],
		'user-register' : ['./src/page/user-register/index.js'],
		'result' 		: ['./src/page/result/index.js']
		
	},
	output : {
		path : './dist',
		publicPath:'/dist',
		filename : 'js/[name].js'
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	module : {
		loaders: [
			{ test:/\.css$/, loader: Ex.extract('style-loader', 'css-loader','less-loader') },
			{ test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
			{ test:/\.string$/, loader: 'html-loader'}

		]
	},
	//配置路径
	resolve	: {
		alias : {
			node_modules	: __dirname + '/node_modules',
			util 			: __dirname + '/src/util',
			page 			: __dirname + '/src/page',
			service 		: __dirname + '/src/service',
			image 			: __dirname + '/src/image'
			
		}
	},
	plugins : [
	//独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		//把css单独打包到文件里
		new Ex("css/[name].css"),
		//html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
	]
};
if('dev' === WEBPACK_ENV){
		config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
	}

module.exports = config;