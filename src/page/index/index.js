var _mm=require('util/mm.js');
/*_mm.request({
	url:'/product/list.do?keyword=1',
	success : function(res){
		console.log(res);
	},
	error : function(errMsg){
		console.log(errMsg);
	}
	});*/
	//console.log(_mm.getUrlParam('test'));
	var html = '<div>{{data}}</div>';
	var data = {
		data : 'test'
	}
console.log(_mm.renderHtml(html,data));