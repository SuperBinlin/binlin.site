/**
* @author Binlin
* @date 2015-06-01
* @email zhangbin@patsnap.com
*/
define(function(require, exports, module) {
    require('knockout');
    require('jquery-live');
    require('knockout-mul');
    require('jquery-highlight');
   var fn = require('./fn');
	function addDom(){
		this.dom = $(".common-box");//容器
		this.documents = $(document);
	}

	module.exports = addDom;

	addDom.prototype.render = function() {
		this._init();
		this.addTodo();
		this.boxclose();//关闭某个edit中的盒子时，重排盒子编号，并映射到view中。
		this.chageColor();
		this.chageStyle();
		this.correspond();
		this.exports();
	};

	addDom.prototype._init = function(){//初始化容器
		this.dom.html("");
	};
	var indexNo = null;
	addDom.prototype.addTodo = function(){
		//edit层 start
		var headpic = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-7'><label for='exampleInputEmail1'>通栏图片</label><input type='text' class='form-control headpicOne' placeholder='图片外链'></div><div class='col-md-2 for-position'><input type='text' placeholder='高度（为空自动）' class='form-control headpicTwo'></div><div class='col-md-2 for-position'><p class='unit'>px</p></div></div></div>";//通栏图片
		var paddingVal = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-3'><label for='exampleInputEmail1'>空隙</label><input type='text' class='form-control paddings' placeholder=''></div><div class='col-md-1 for-position'><p class='unit'>px</p></div><div class='col-md-7 for-position'><ul class='textarea-ul'><li class='txtareaWhite'></li><li class='txtareaBlack'></li></ul></div></div></div>";//空隙
		var title = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-11'><label for='exampleInputEmail1'>标题</label><input type='text' class='form-control title' placeholder=''></div></div></div>";
		var subtitle = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-11'><label for='exampleInputEmail1'>副标题</label><input type='text' class='form-control subtitle' placeholder=''></div></div></div>";
		var image = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-7'><label for='exampleInputEmail1'>图片</label><input type='text' class='form-control imgOutUrl' placeholder='图片外链'></div><div class='col-md-4 for-position'><select class='form-control imgFloat'><option id=''>选择排列方式</option><option id='centerFloat'>水平居中</option><option id='leftFloat'>水平居左</option><option id='rightFloat'>水平居右</option></select></div></div><div class='row'><div class='col-md-7 mt10'><input type='text' class='form-control imgOutLink' placeholder='图片链接至'></div></div></div>";
		var txteditOnly = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-11'><label for='exampleInputEmail1'>文本块</label><textarea class='form-control txtareaOnly textareaBr' rows='3'></textarea></div></div><div class='row mt10'><div class='col-md-11'><label for='exampleInputEmail1'>背景颜色</label><ul class='textarea-ul'><li class='txtareaWhite'></li><li class='txtareaBlack'></li></ul></div>";
		var txtarea = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-11'><label for='exampleInputEmail1'>文本块</label><textarea class='form-control txtarea textareaBr' rows='3'></textarea></div></div><div class='row'><div class='col-md-11 mt10'><input type='text' class='form-control imageUrl' placeholder='图片外链'></div></div><div class='row'><div class='col-md-7 mt10'><input type='text' class='form-control imagesLink' placeholder='图片链接至'></div><div class='col-md-4 for-position-unline'><select class='form-control selectCol'><option id='optionOne'>左列</option><option id='optionTwo'>右列</option></select></div></div><div class='row mt10'><div class='col-md-11'><label for='exampleInputEmail1'>背景颜色</label><ul class='textarea-ul'><li class='txtareaWhite'></li><li class='txtareaBlack'></li></ul></div>";
		var list = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-11'><label for='exampleInputEmail1'>列表</label><textarea class='form-control' rows='3' placeholder='一行算一个'></textarea></div></div><div class='row'><div class='col-md-7 mt10'><input type='text' class='form-control' placeholder='图片链接至'></div><div class='col-md-4 for-position-unline'><select class='form-control'><option>左列</option><option>右列</option></select></div></div></div>";
		var seniorHtml = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-11'><label for='exampleInputEmail1'>HTML（高级自定义）</label><textarea class='form-control seniorHtml' rows='3' placeholder='纯HTML'></textarea></div></div></div>";
		var linkTo = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-7'><label for='exampleInputEmail1'>按钮</label><input type='text' class='form-control btnImagesUrl' placeholder='链接文字'></div></div><div class='row mt10'><div class='col-md-7'><input type='text' class='form-control btnLinkTo' placeholder='按钮链接至'></div></div></div>";
		var linkFn = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-7'><label for='exampleInputEmail1'>联系方式</label><select class='form-control'><option>联系方式+微信码</option></select></div></div></div>";
		var lineHeight = "<a class='close'>×</a><div class='form-group'><div class='row'><div class='col-md-11'><label for='exampleInputEmail1'>输入需要高亮的字</label><input type='text' class='form-control highlight' placeholder='单词之间以空格隔开'></div></div></div>";
		var editArr = [headpic,image,title,subtitle,txteditOnly,txtarea,linkTo,linkFn,paddingVal,seniorHtml];
		//edit end


		//view层 start
		var bannerImgs = "<td colspan='2' style='padding:0'><img class='banner'></td>";//通栏图片
		var imgsView = "<td style='padding:10px 25px;text-align:center;background:#f8f7f6' colspan='2'><a class='imgsLinks' target='_blank'><img class='imgs' target='_blank' style='width:98%'></a></td>";//图片
		var titleView = "<td style='padding:10px 25px;background:#f8f7f6' colspan='2'><h1 class='h1 light' style='margin:0'></h1></td>";//标题
		var subtitleView = "<td style='padding:10px 25px;background:#f8f7f6' colspan='2'><h3 class='h3 light' style='margin:0'></h3></td>";//副标题
		var txtareaOnly = "<td style='padding:10px 25px;background:#f8f7f6' class='colOne' colspan='2'><p class='articleOnly light articleBr' style='font-size:15px;padding-left:10px;max-width: 590px;margin:0'></p></td>";
		var txtareaView = "<td style='padding:10px 25px;background:#f8f7f6' class='colOne' width='50%'><p class='articleView light articleBr' style='font-size:15px;padding-left:10px;margin:0'></p></td><td style='padding:10px 25px;background:#f8f7f6' class='colTwoView' align='center' valign='middle'><a class='imagesLinkView' target='_blank'><img class='imagesView'></a></td>";
		var listView = "<td style='padding:10px 25px;background:#f8f7f6' colspan='2'></td>";
		var linkToView = "<td style='padding:10px 25px;background:#f8f7f6' colspan='2'><a class='links linkstxt' target='_blank' style='padding-left:10px;color:#337ab7;text-decoration:underline;font-size:15px;'></a></td>";
		var contactStyle = "<td style='color:#626262;background:#e5e5e5;padding-left:70px;padding-top:35px;padding-bottom:35px' width='60%'><img src='http://img-link.qiniudn.com/phone.png' style='margin: 0px 15px 0 0;vertical-align: text-bottom;'>400-694-4481<p style='font-size:12px;color:#626262;margin:15px 0 0 0;padding:0;'>微博：http://weibo.com/patsnap</p><p style='font-size:12px;color:#626262;margin:0;padding:0;'>官网：www.patsnap.com</p><p style='font-size:12px;color:#626262;margin:10px 0 0 0;padding:0;'>最后感谢您长期以来对PatSnap的支持与帮助，</p><p style='font-size:12px;color:#626262;margin:0;padding:0;'>我们会竭尽所能的提供更好的服务</p><p style='font-size:12px;color:#626262;margin:0;padding:0;'>PatSnap智慧芽信息科技有限公司</p></td><td style='background:#e5e5e5;padding:35px 35px 35px 0' align='right' width='40%'><img src='http://img-link.qiniudn.com/dimension.png'><p style='color: rgb(98, 98, 98); font-size: 14px;'>扫一扫，关注我们</p></td>";
		var paddings = "<td style='padding:0px 25px;background:#f8f7f6' colspan='2'><div class='paddingsDiv'></div></td>";
		var lineHeightView = "";
		var html = "<td style='padding:10px 25px;background:#f8f7f6' colspan='2' class='html'></td>";
		var viewArr = [bannerImgs,imgsView,titleView,subtitleView,txtareaOnly,txtareaView,linkToView,contactStyle,paddings,html];
		//view end

		var boxid = 0;
		this.documents.on("click",".nav li",function(){//点击添加需要的控件
			var $documents = $(document);
			var common = $(".common-box");
			var boxlist = common.length;
			var comonBox = "<div class='common-box' id=common-box-"+boxid+" data-sort="+boxlist+"></div>";//盒子html id按顺序永不改变 data-sort从0-n 动态改变
			var oneCol = "<tr class='common-tr' id=common-tr-"+boxid+" data-sort="+boxlist+"></tr>";//一行一列用的html

			$(comonBox).appendTo("#row-one");//向edit区添加盒子
			var boxId = $("#common-box-"+boxid);//获取盒子Id
			indexNo = $(this).index();//获取点击序号，用不同html

			boxId.attr("data-model","MyModel"+boxid);//增加data-model 控制生效区域
			boxId.html(editArr[indexNo]);
			//console.log(editArr[indexNo]);
			//--edit--元素绑定
			boxId.find(".headpicOne").attr("data-bind","value:headpicUrl"+boxid);
			boxId.find(".headpicTwo").attr("data-bind","value:imgHeight"+boxid);
			boxId.find(".imgOutUrl").attr("data-bind","value:imgOutUrl"+boxid);
			boxId.find(".imgOutLink").attr("data-bind","value:imgOutLink"+boxid);
			boxId.find(".title").attr("data-bind","textInput:title"+boxid+"");
			boxId.find(".subtitle").attr("data-bind","textInput:subtitle"+boxid);
			// boxId.find(".txtareaOnly").attr("data-bind","textInput:txtareaOnly"+boxid);
			// boxId.find(".txtarea").attr("data-bind","textInput:txtarea"+boxid);
			boxId.find(".imageUrl").attr("data-bind","value:imagesView"+boxid);
			boxId.find(".imagesLink").attr("data-bind","value:imagesLink"+boxid);
			boxId.find(".btnImagesUrl").attr("data-bind","value:btnImagesUrl"+boxid);
			boxId.find(".btnLinkTo").attr("data-bind","value:btnLinkUrl"+boxid);
			//通栏图片end

			$(oneCol).appendTo("#main-tbody");//向view区添加html
			var trIdChild = $("#common-tr-"+boxid);
			trIdChild.html(viewArr[indexNo]);
			//--view--通栏图片绑定
			trIdChild.find(".banner").attr("data-bind","attr:{src:headpicUrl"+boxid+",height:imgHeight"+boxid+"}");
			trIdChild.find(".imgs").attr("data-bind","attr:{src:imgOutUrl"+boxid+"}");
			trIdChild.find(".imgsLinks").attr("data-bind","attr:{href:imgOutLink"+boxid+"}");
			trIdChild.find(".h1").attr("data-bind","text:title"+boxid);
			trIdChild.find(".h3").attr("data-bind","text:subtitle"+boxid);
			// trIdChild.find(".articleOnly").attr("data-bind","text:txtareaOnly"+boxid);
			// trIdChild.find(".articleView").attr("data-bind","text:txtarea"+boxid);
			trIdChild.find(".imagesView").attr("data-bind","attr:{src:imagesView"+boxid+"}");
			trIdChild.find(".imagesLinkView").attr("data-bind","attr:{href:imagesLink"+boxid+"}");
			//trIdChild.find(".links").attr("data-bind","text:btnImagesUrl"+boxid);
			trIdChild.find(".linkstxt").attr("data-bind","attr:{href:btnLinkUrl"+boxid+"}");
			//data-model作用域绑定
			trIdChild.attr("data-model","MyModel"+boxid);
			//console.log(boxid);
			//动态声明KO 绑定元素
			var headpicBind="headpicUrl"+boxid;
			var headpicHeightBind="imgHeight"+boxid;
			var imgOutUrlBind = "imgOutUrl"+boxid;
			var imgOutLinkBind = "imgOutLink"+boxid;
			var titleBind = "title"+boxid;
			var subtitleBind = "subtitle"+boxid;
			var txtareaOnly = "txtareaOnly"+boxid;
			var txtareaBind = "txtarea"+boxid;
			var imagesBind ="imagesView"+boxid;
			var imagesLinkBind = "imagesLink"+boxid;
			var linkToImgBind = "btnImagesUrl"+boxid;
			var linkToUrlBind ="btnLinkUrl"+boxid;
			var paddingsBind = "paddings"+boxid;
			//var linkToImgBind = "btnImagesUrl"+boxid;

			var viewModel = {};
			viewModel[headpicBind] = ko.observable("");
			viewModel[headpicHeightBind] = ko.observable("");
			viewModel[imgOutUrlBind] = ko.observable("");
			viewModel[imgOutLinkBind] = ko.observable("");
			viewModel[titleBind] = ko.observable("");
			viewModel[subtitleBind] = ko.observable("");
			viewModel[txtareaOnly] = ko.observable("");
			viewModel[txtareaBind] = ko.observable("");
			viewModel[imagesBind] = ko.observable("");
			viewModel[imagesLinkBind] = ko.observable("");
			viewModel[linkToImgBind] = ko.observable("");
			viewModel[linkToUrlBind] = ko.observable("");
			viewModel[paddingsBind] = ko.observable("");
			var modelName = "MyModel"+boxid;
			ko.attach(modelName,viewModel);

			switch(indexNo){
				case 1:
				$documents.on("change",".imgFloat",function(){
					var boxidFull = $(this).parents('.common-box').attr('id');
					var boxidMin = fn.getBoxid(boxidFull);
					var thisoptionId = $(this).find('option:selected').attr('id');
					fn.imageFloat("#common-tr-"+boxidMin,thisoptionId);
				});
				break;
				case 2:
				$documents.on("blur",".title",function(){
					var fnId = $(this).parents(".common-box").attr("id");
					var txtColor = $("#saveColor").val();
					fn.blurs(fnId,txtColor);
				});
				break;
				case 3:
				$documents.on("blur",".subtitle",function(){
					var fnId = $(this).parents(".common-box").attr("id");
					var txtColor = $("#saveColor").val();
					fn.blurs(fnId,txtColor);
				});
				break;
				case 4:
				$documents.on("click",".textarea-ul li",function(){
					var $this = $(this);
					fn.changeBg($this);
				});
				$documents.on("blur",".textareaBr",function(){
					var $this = $(this);
					fn.addBr($this);
				});
				$documents.on("blur",".txtareaOnly",function(){
					var fnId = $(this).parents(".common-box").attr("id");
					var txtColor = $("#saveColor").val();
					fn.blurs(fnId,txtColor);
				});
				break;
				case 5:
				$documents.on("change",".selectCol",function(){
					var boxidFull = $(this).parents('.common-box').attr('id');
					var boxidMin = fn.getBoxid(boxidFull);
					var optionId = $(this).find('option:selected').attr('id');
					fn.changeDom("#common-tr-"+boxidMin,optionId);
					//ko.attach(modelName,viewModel);
				});
				$documents.on("blur",".textareaBr",function(){
					var $this = $(this);
					fn.addBr($this);
				});
				$documents.on("blur",".txtarea",function(){
					var fnId = $(this).parents(".common-box").attr("id");
					var txtColor = $("#saveColor").val();
					fn.blurs(fnId,txtColor);
				});
				$documents.on("click",".textarea-ul li",function(){
					var $this = $(this);
					fn.changeBg($this);
				});

				break;
				case 6:
				$documents.on("blur",".btnImagesUrl",function(){
					var fnId =  $(this).parents(".common-box").attr("id");
					fn.linkTxt(fnId);
				});
				break;
				case 8:
				$documents.on("blur",".paddings",function(){
					var $this = $(this);
					fn.addPadding($this);
				});
				$documents.on("click",".textarea-ul li",function(){
					var $this = $(this);
					fn.changeBg($this);
				});
				break;
				case 9:
				$documents.on("blur",".seniorHtml",function(){
					var $this = $(this);
					fn.addHtml($this);
				});
				break;
				// case 9:
				// $(".highlight").blur(function(){
				// 	var $this = $(this);
				// 	fn.highlight($this);
				// 	//alert(1);
				// });
				// break;
			}
			boxid++;
			//test(dasd,dadsa);
		});
	};

	addDom.prototype.boxclose = function(){//关闭edit层box
		this.documents.on("click",".close",function(){
			var $commonBox = $(this).parents(".common-box");
			$commonBox.remove();
			var commonTr = $(".common-tr");
			var thisId = $commonBox.attr("id");//获取被删的box序号;
			numId = fn.getBoxid(thisId);
			$("#common-tr-"+numId).remove();
			var commonBox = $(".common-box");//重新排序
			fn.allreSort(commonBox);
			fn.allreSort($(".common-tr"));
		});
	};

	addDom.prototype.chageColor = function(){//改变字体颜色
		this.documents.on("click",".choose-color li",function(){
			var $this = $(this);
			fn.selectColor($this);
		});
	};
	
	addDom.prototype.chageStyle = function(){//选择模板样式
		this.documents.on("change",".selectModel",function(){
			var $this = $(this);
			fn.changeStyle($this);
		});
	};

	addDom.prototype.correspond = function(){//edit层与view层高亮对应
		this.documents.on("mouseover",".common-box",function(){
			var thisId = $(this).attr("id");
			fn.addCorrespond(thisId);
		});	
		this.documents.on("mouseout",".common-box",function(){
			var thisId = $(this).attr("id");
			fn.delCorrespond(thisId);
		});	
	};
	addDom.prototype.exports = function(){
		this.documents.on("click",".btn-success",function(){
			console.log(1);
			fn.exportHtml();
		});
	};

});