// JavaScript Document
var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};
/*请求后台数据JS工具类*/
var _mm = {
	//请求后台数据
	request : function(param){
		
		var _this = this;
		//使用ajax请求后端数据
		$.ajax({
			type 		: param.method || 'get',//	请求方法
			url	 		: param.url	   || '',//请求路径
			dataType	: param.type   || 'json',//请求数据类型。默认JSON格式
			data		: param.data   || '',//请求时传递给后台的数据
			//数据请求后台会返回一个函数回应
			success		: function(res){
				//如果status的值等于0代表操作成功
				if(0 === res.status){
					//typeof param.success返回一个字符串
					
					//判断param中的success是否是function函数
					//只有操作成功的状态下才能将数据或错误信息返回回去
					typeof param.success === 'function' && param.success(res.data,res.msg);	
				//若是未登录状态，则需要强制登录
				}else if(10 === res.status){
					_this.doLogin();
					}
					//如果请求的数据错误
					else if(1=== res.status){
					//判断param.success是否是function函数，若为真则调用后面的success函数并传值
					typeof param.error === 'function' && param.error(res.msg);	
					}
			},
			error		: function(err){
					typeof param.error === 'function' && param.error(err.statusText);	
			}
		});
	},
	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam : function(name){
		//happymmall.com/product/list.do?keyword=xxx&page=1
		//截取问号后面的url参数
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		//获取参数值，如keyword的值
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result [2]) : null;
	},
	//对传入的模板和数据进行拼接
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result   = template.render(data);
			return result;
	},
	//验证是否成功提示
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	//错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了~');
	},
	//字段的验证，支持非空，手机，邮箱的判断
	validate : function(value,type){
		//trim一方面是将字符创前后空格去掉
		//一方面若value的值不是字符创可将其转为字符串
		var value = $.trim(value);
		if('require' === type){
			//将value强转成布尔型
			//双重否定等于肯定，若是value有值返回true,否则返回false
			return !!value;
		}
		//手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	
	//登录函数
	doLogin : function(){
		//后面加参数就是从哪个地方登录的，登录完毕之后重新回到该页面
		//对参数进行锁码，以防乱码
		window.location.href='./login.html?redirect='+ encodeURIComponent(
		window.location.href);
	},
	goHome : function(){
		window.location.href='./index.html';
	}
	};
	//将JS函数以模块的形式进行输出，我们只需要引入就可以直接使用该函数
	module.exports = _mm;