// JavaScript Document
require('./index.css');
var _mm = require('util/mm.js');
//通用页面头部
var header = {
	init	  : function(){
		this.bindEvent();
	},
	//搜索栏输入内容进行搜索时要在搜索栏中显示搜索的内容
	onLoad 	  : function(){
		//获取服务器地址
		var keyword = _mm.getUrlParam('keyword');
		//如果获取到的信息有效则回填至搜索栏中
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	//搜索点击事件
	bindEvent  : function(){
		var _this = this;
		//点击搜索按钮事件
		$('#search-btn').click(function(){
			_this.searchSubmit();
			});
		//输入回车键实现搜索功能
		$('#search-input').keyup(function(e){
			//keycode等于13说明是键盘的回车键
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
			});
		
	},
	//搜索提交事件
	searchSubmit	: function(){
		//先获取搜索栏中的keyword,将搜索栏中的前后空格去掉
		var keyword = $.trim($('#search-input').val());
		//若是搜索栏中有内容则进行传值跳转到对应的list页面
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		//若是为空返回首页
		}else{
			_mm.goHome();
		}
	}
};
header.init();
