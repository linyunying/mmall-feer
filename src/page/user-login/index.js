
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
//错误提示方法
var formError = {
	 	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
 };
var page = {
	//初始化函数
	init: function(){
		this.bindEvent();
	},
	//登录点击事件
	bindEvent : function(){
		var _this = this;
		//登录按钮点击事件
		$('#submit').click(function(){
			_this.submit();
			});
		//回车按钮提交事件
		$('.user-content').keyup(function(e){
			//keycode===13是回车键
			if(e.keyCode === 13){
				_this.submit();
				}
			});
	},
	//提交表单事件
	submit : function(){
		//创建formData对象，获取用户输入的信息
		var formData = {
			//获取用户名信息，并将输入框中的空白字符串去掉
			 username : $.trim($('#username').val()),
			 //获取用户名密码，去掉空白字符
			 password : $.trim($('#password').val())
		},
		//设定表单验证结果
		varlidateResult = this.formvalidate(formData);
		//验证成功
		if(varlidateResult.status){
			//提交
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
				},function(errMsg){
					//验证失败调用错误函数
					formError.show(errMsg);
				});
		}else{
			//错误提示
			formError.show(varlidateResult.msg);
		}
	},
	//表单字段验证
	formvalidate : function(formData){
		var result  = {
			status : false,
			msg	   : ''
		};
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//通过雁阵，返回正确提示
		result.status = true;
		result.msg	  = '验证通过';
		return result;
	}
};
//一加载jS文件就初始化函数
$(function(){
	page.init();
	});