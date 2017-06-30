//配置加载路径
requirejs.config({
	//默认加载baseUrl路径下所有模块
	baseUrl:'/web/assets/js/lib',
	//设置模块名与路径的映射(对应关系)
	paths:{
		headjs:'../head-lottery3'
	}
});
//模块加载
requirejs(['headjs'],function(){
	var $=require('headjs');
	console.log('module success')
});