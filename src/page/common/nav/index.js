// JavaScript Document
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//导航
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		//返回调用该函数的对象，比如nav调用该函数，调用完毕返回nav
		return this;
	},
	//事件函数
	bindEvent : function(){
		//登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './register.html';
			});
		//退出点击事件
		$('.js-logout').click(function(){
				_user.logout(function(res){
					window.location.reload();
					},function(errMsg){
						_mm.errorTips(errMsg);
				});
			});
	},
	//加载用户信息
	loadUserInfo : function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show()
			.find('username').text(res.username);
			},function(errMsg){
				//do nothing
		});
	},
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
			},function(errMsg){
			$('.nav .cart-count').text(0);		
		});
	}
};
//调用初始化函数，调用的话，返回的值就不是nav了，所以要在被调用的函数中添加return this返回一个调用的对象
module.exports = nav.init();