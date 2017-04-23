/**
* @author Binlin
* @date 2015-06-01
* @email zhangbin@patsnap.com
*/
define(function(require, exports, module){
	var fn = require('./fn');
 //   require('jquery-ui-core');
 //   require('jquery-ui-widget');
 //   require('jquery-ui-mouse');
 //   require('jquery-ui-draggable');
	// require('jquery-ui-sortable');
	require('jquery-ui');
	$("#row-one").sortable({
      revert: true,
      axis: "y",
      update:function(event,ui){
         var commonBox = $(".common-box");
         var commonTr = $(".common-tr");
      	 var boxLength = $(".common-box").length;
      	 console.log(ui.item.index());
      	 var sort = ui.item.attr("data-sort");
      	 var sortNum = ui.item.next().attr("data-sort");//获取被移动Dom的下一个Dom，以便进行插入操作
      	 var ifLast = 0;
      	 if(sortNum == undefined){//拖到最后一个Dom时next为undefined
      	 	ifLast = 1;
      	 	sortNum = boxLength-1;
      	 }
      	 var moveSort = $("#"+fn.getId(commonTr,sort));
      	 var moveSortNext = $("#"+fn.getId(commonTr,sortNum));
      	 fn.reSort(moveSort,moveSortNext,ifLast);
      	 fn.allreSort(commonBox);
      	 fn.allreSort($(".common-tr"));//此处有陷阱 不能用commonTr😢
      }
    });

});