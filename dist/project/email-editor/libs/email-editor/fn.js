/**
 * @author Binlin
 * @date 2015-06-01
 * @email zhangbin@patsnap.com
 */
define(function(require, exports, module) {
	function getBoxid(fullId) { //返回id中最后一个数字
		return fullId.match(/\d+(\.\d+)?/g);
	}
	function exchange(a, b) {
		var n = a.next(),
			p = b.prev();
		b.insertBefore(n);
		a.insertAfter(p);
	}

	function changeDom(fnId, optionId) { //文本模式图片与文本交换位置方法
		var boxWrap = $(fnId);
		var colOne = boxWrap.find(".colOne");
		var colTwo = boxWrap.find(".colTwoView");
		//exchange(colOne,colTwo);
		switch (optionId) {
			case "optionOne":
				colOne.insertBefore(colTwo);
				break;
			case "optionTwo":
				colTwo.insertBefore(colOne);
				break;
		}
	}

	function changeBg(obj){
		var $this = obj;
		var id = $this.parents('.common-box').attr('id');
		//console.log(id);
		var idNum = getBoxid(id);
		var trWrap = $("#common-tr-"+idNum).find("td");
		var thisColor = $this.attr('class');
		switch(thisColor){
			case "txtareaWhite":
			trWrap.css("background","#fff");
			break;
			case "txtareaBlack":
			trWrap.css("background","#f8f7f6");
			break;
		}
	}

	function contactStyle(contactId) {
		switch (contactId) {
			case "contactOne":
				//	todo 有多个联系我们时，增加
				break;
		}
	}

	function imageFloat(fnId, optionId) {
		var tdWrap = $(fnId).find("td");
		switch (optionId) {
			case "leftFloat":
				tdWrap.css("text-align", "left");
				break;
			case "centerFloat":
				tdWrap.css("text-align", "center");
				break;
			case "rightFloat":
				tdWrap.css("text-align", "right");
				break;
		}
	}

	function getId(className, sort) { //根据data-sort获取id
		className.each(function() {
			var $this = $(this);
			var pdSort = $this.attr('data-sort');
			if (pdSort == sort) {
				thisId = $this.attr('id');
			}
		});
		return thisId;
	}

	function reSort(doms, beforeDom, sureLast) {
		switch (sureLast) {
			case 0:
				doms.insertBefore(beforeDom);
				break;
			case 1:
				doms.insertAfter(beforeDom);
				break;
		}
	}

	function allreSort(className) {
		var sortNum = 0;
		className.each(function() {
			$(this).attr("data-sort", sortNum);
			sortNum++;
		});
	}

	function addPadding(className) {
		var txtThis = className.val();
		var id = className.parents('.common-box').attr('id');
		var idNum = getBoxid(id);
		$("#common-tr-" + idNum).find('.paddingsDiv').css('height', txtThis);
	}

	function addHtml(className) {
		var txtThis = className.val();
		var id = className.parents('.common-box').attr('id');
		var idNum = getBoxid(id);
		$("#common-tr-" + idNum).find('.html').html(txtThis);
	}

	function blurs(fnId, color) { //#号之间的文本变色
		idNum = getBoxid(fnId);
		var thisTrId = $("#common-tr-" + idNum);
		var longTxt = thisTrId.find('.light').text();
		var pattern = /#(.+?)#/g; //获取#号内文字
		var light = longTxt.match(pattern);
		var latest;
		if(light){
			$.each(light, function() {
				var thisVal = this;
				getLight = thisVal.toString().replace(/(#)/g, "");
				var thisHtml = thisTrId.find('.light').html();
				var replace = "<span class='colorfn' style=color:" + color + ">" + getLight + "</span>";
				latest = thisHtml.replace(thisVal, replace);
				//console.log(getLight, replace, latest);
				// var  ss = $("#common-tr-"+idNum).find('.light').html();
				// console.log(ss);
				$("#common-tr-" + idNum).find('.light').html(latest);
			});
		}
		
		// thisTrId.find('.light').html(latest);

		// console.log(light)
		// console.log(getLight)
		// console.log(latest)
	}

	function linkTxt(fnId) {
		var val = $("#" + fnId).find(".btnImagesUrl").val();
		idNum = getBoxid(fnId);
		$("#common-tr-" + idNum).find('.linkstxt').text(val);
	}

	function selectColor(obj){
		$.fn.getHexBackgroundColor = function() { 
		var rgb = $(this).css('background-color'); 
		 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);} 
		return rgb= "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
		};
		var thisColor = obj.getHexBackgroundColor();
		//console.log(thisColor);
		$("#saveColor").val(thisColor);
		$(".colorfn").css('color',thisColor);
	}

	function addBr(obj){//识别textarea中的回车
		var content = obj.val().replace(/\n/g,"<br/>");
		var thisId = obj.parents(".common-box").attr('id');
		var numId = getBoxid(thisId);
		console.log(content);
		//console.log(addbr);
		$("#common-tr-"+numId).find(".articleBr").html(content);
	}

	function addCorrespond(boxId){//高亮
		var idNum = getBoxid(boxId);
		$("#common-tr-"+idNum).find('td').addClass('trhover');
	}

	function delCorrespond(boxId){
		var idNum = getBoxid(boxId);
		$("#common-tr-"+idNum).find('td').removeClass('trhover');
	}

	function changeStyle(select){//切换模板时 模拟操作
		$("#row-one").empty();
		$("#main-tbody").empty();
		var thisStyle = select.find("option:selected").attr('id');
		var navLi = $(".nav li");
		switch(thisStyle){
			case "styleOne":
			var clickSort = [0,8,4,8,8,4,4,1,6,8,8,4,8,7];//自动加载顺序
			$.each(clickSort,function(){
				navLi.eq(this).trigger('click');
			});
			$(".common-box").eq(0).find('.headpicOne').focus().val('http://7q59gj.com1.z0.glb.clouddn.com/j2_03.png').trigger('change');
			$(".common-box").eq(1).find('.paddings').val('10').blur();
			$(".common-box").eq(1).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(2).find('.txtareaOnly').focus().val('随着市场竞争的日益激烈，国内专利侵权诉讼的案件也逐年增多，越来越多的企业主动出击活被动卷入到技术的竞争中，大家都希望能借助专利制度占据行业的制高点。').trigger('change');
			$(".common-box").eq(2).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(3).find('.paddings').val('10').blur();
			$(".common-box").eq(3).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(4).find('.paddings').val('15').blur();
			$(".common-box").eq(5).find('.txtareaOnly').val('本次课程就围绕专利侵权的主体概念，行为方式，抗辩自由，应对策略等几个最基础也是最重要的方面展开论述，同时辅以大量真实案例帮助理解。').trigger('change');
			$(".common-box").eq(6).find('.txtareaOnly').val('#是不是对本课程期待已久？快快看过来吧！#').trigger('change').blur();
			$(".common-box").eq(7).find('.imgOutUrl').val('http://7q59gj.com1.z0.glb.clouddn.com/i4.png').trigger('change');
			$(".common-box").eq(8).find('.btnImagesUrl').val('点此立即观看').blur();
			$(".common-box").eq(9).find('.paddings').val('30').blur();
			$(".common-box").eq(10).find('.paddings').val('10').blur();
			$(".common-box").eq(10).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(11).find('.txtareaOnly').val('还想要了解哪些主题课程呢？#回复邮件！大声告诉我!#').trigger('change').blur();
			$(".common-box").eq(11).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(12).find('.paddings').val('10').blur();
			$(".common-box").eq(12).find('.txtareaWhite').trigger('click');
			break;

			case "styleTwo":
			var clickSort = [0,8,4,8,8,3,4,1,8,3,4,1,8,8,4,8,7];
			$.each(clickSort,function(){
				navLi.eq(this).trigger('click');
			});
			$(".common-box").eq(0).find('.headpicOne').val("http://7q59gj.com1.z0.glb.clouddn.com/v4_03.png").trigger('change');
			$(".common-box").eq(1).find('.paddings').val('10').blur();
			$(".common-box").eq(1).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(2).find('.txtareaOnly').focus().val('请选择信任邮件图片，这样才能保证邮件已最好的效果呈现给您哦！').trigger('change');
			$(".common-box").eq(2).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(3).find('.paddings').val('10').blur();
			$(".common-box").eq(3).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(4).find('.paddings').val('15').blur();
			$(".common-box").eq(5).find('.subtitle').val("#【当前申请人】#").trigger("change").blur();
			$(".common-box").eq(6).find('.txtareaOnly').val("ANC：当前申请人支持中文检索，你们有默默在用这个功能了吗？").trigger("change");
			$(".common-box").eq(7).find('.imgOutUrl').val("http://7q59gj.com1.z0.glb.clouddn.com/v4_07.png").trigger("change");
			$(".common-box").eq(8).find('.paddings').val('15').blur();
			$(".common-box").eq(9).find('.subtitle').val("#【官网链接】#").trigger("change").blur();	
			$(".common-box").eq(10).find('.txtareaOnly').focus().val('新加入美国，德国， EPO，挪威，WIPO欧洲外观的官网链接（我们的高级检索分析版的用户可以尽享的哦）').trigger('change');	
			$(".common-box").eq(11).find('.imgOutUrl').val("http://7q59gj.com1.z0.glb.clouddn.com/v4_10.png").trigger("change");
			$(".common-box").eq(12).find('.paddings').val('35').blur();
			$(".common-box").eq(13).find('.paddings').val('15').blur();
			$(".common-box").eq(13).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(14).find('.txtareaOnly').val("您还想要了解哪些内容呢？#回复邮件#，大声告诉我！").trigger('change').blur();
			$(".common-box").eq(14).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(15).find('.paddings').val('15').blur();
			$(".common-box").eq(15).find('.txtareaWhite').trigger('click');
			break;

			case "styleThree":
			var clickSort = [0,8,4,8,8,4,4,4,4,4,8,4,8,4,6,8,4,8,7];
			$.each(clickSort,function(){
				navLi.eq(this).trigger('click');
			});

			$(".common-box").eq(0).find('.headpicOne').val("http://7q59gj.com1.z0.glb.clouddn.com/m1_03.png").trigger('change');
			$(".common-box").eq(1).find('.paddings').val('10').blur();
			$(".common-box").eq(1).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(2).find('.txtareaOnly').focus().val('孔子曰：知己知彼，百战不殆。对于IPR来说，专利预警就是企业工作的核心战略。那么，#专利预警的价值何在？如何规划专利预警工作？如何保障专利预警效果？#').trigger('change').blur();
			$(".common-box").eq(2).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(3).find('.paddings').val('10').blur();
			$(".common-box").eq(3).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(4).find('.paddings').val('30').blur();
			$(".common-box").eq(5).find('.txtareaOnly').val('#【沙龙主题】#  从企业管理的角度阐述专利预警的重要性和价值').trigger('change').blur();
			$(".common-box").eq(5).find('.txtareaOnly').val('#【沙龙主题】#  从企业管理的角度阐述专利预警的重要性和价值').trigger('change').blur();
			$(".common-box").eq(6).find('.txtareaOnly').val('#【沙龙嘉宾】#  郝燕（上汽集团乘用车公司知识产权经理）').trigger('change').blur();
			$(".common-box").eq(7).find('.txtareaOnly').val('#【主办方】#    PatSnap专利学院').trigger('change').blur();
			$(".common-box").eq(8).find('.txtareaOnly').val('#【沙龙时间】#  2015年5月20日13：00开始').trigger('change').blur();
			$(".common-box").eq(9).find('.txtareaOnly').val('#【沙龙地点】#  上海市杨浦区国泰路11号复旦科技园一楼一点咖啡（近地铁十号线国权路站3号口）').trigger('change').blur();
			$(".common-box").eq(10).find('.paddings').val('30').blur();
			$(".common-box").eq(11).find('.txtareaOnly').val('PatSnap专利学院精心准备每一次实战沙龙活动，为你、我、他创造更多的交流良机; 来吧，在上海遇见PatSnap专利学院讲师团最具魅力的代表嘉宾——郝燕老师;        来吧，在上海与PatSnap专利学院一起从企业管理的角度阐述专利预警的重要性和价值;来吧，在上海与PatSnap专利学院的其他学员一起探讨真正适合企业的实务内容。').trigger('change');
			$(".common-box").eq(12).find('.paddings').val('30').blur();
			$(".common-box").eq(13).find('.txtareaOnly').val('点击按钮马上参与活动').trigger('change');
			$(".common-box").eq(14).find('.btnImagesUrl').val('立即报名').blur();
			$(".common-box").eq(15).find('.paddings').val('15').blur();
			$(".common-box").eq(15).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(16).find('.txtareaOnly').val("您还想要了解哪些内容呢？#回复邮件#，大声告诉我！").trigger('change').blur();
			$(".common-box").eq(16).find('.txtareaWhite').trigger('click');
			$(".common-box").eq(17).find('.paddings').val('15').blur();
			$(".common-box").eq(17).find('.txtareaWhite').trigger('click');
			break;

		}
	}

	function exportHtml(){
		console.log(2);
		var needHtml = $("#row-two").html();
		var saveHtml = $("#saveHtml");
		saveHtml.val(needHtml);
		saveHtml.select();
		document.execCommand("Copy");
		alert("复制成功");
	}

	module.exports = { //抛出接口
		changeDom: changeDom,
		getBoxid: getBoxid,
		imageFloat: imageFloat,
		exchange: exchange,
		reSort: reSort,
		allreSort: allreSort,
		getId: getId,
		addPadding: addPadding,
		addHtml: addHtml,
		blurs: blurs,
		linkTxt: linkTxt,
		selectColor:selectColor,
		changeBg:changeBg,
		changeStyle:changeStyle,
		addCorrespond:addCorrespond,
		delCorrespond:delCorrespond,
		exportHtml:exportHtml,
		addBr:addBr
	};
});