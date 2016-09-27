/**
 * @author Binlin
 * @date 2015-06-01
 * @email zhangbin@patsnap.com
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	$(".nav li").hover(function(){
		$(this).stop().animate({"left":"15px"},300);
	},function(){
		$(this).stop().animate({"left":"0px"},300);
	});	
});