/****author Binlin****/
/****Y2015 M02 D26****/
var moveDirection = [
	{"top":38},
	{"right":39},
	{"left":37},
	{"bottom":40}
];

var publics = new function(){//存储全局变量
	this.height = 20 ; //1占1格
	this.width = 20 ; //1占1格
	this.timeouts = "";//存储时间函数
	this.inheritDirection = moveDirection[1].right;//默认向右
	this.snakeBody = [];//蛇身
	this.foodPosition = "";//食物位置
	this.foodImg = "<img src='images/strawberry.png'>";
	this.length = 1;
	this.moveRate = 500;
	//console.log(this.inheritDirection);
}

function checkArrayRepeat(array){//判断数组中是否有重复值--用于检测蛇头是否撞自己身体
	var hash={};
	for(var i in array){
		if(hash[array[i]]){
			return true;
		}
		hash[array[i]]=true;
	}
	return false;
}

var init = function(){// 游戏初始化
	var gamePlace = [];//游戏区域生成开始
	gamePlace.push("<table>");
	for(var i=0;i<=publics.height;i++){
		gamePlace.push("<tr>");
		for(var j=0;j<=publics.width;j++){
			gamePlace.push('<td id="xais'+i+'yais'+j+'"></td>')
		}
	}
	//console.log(gamePlace.join(""));
	$("#snake-zoo").html(gamePlace.join(""));//join将数组变成字符串

}

window.onload = function(){
	init();//场景生成
	btnListen();
}

var gameControl = new function(){
	this.begins = 0; //0开场 1重新开始 
}

function btnListen(){
	//var snakeactions = new snakeAction();
	$("a").click(function(){
		var beClicked = $(this);
		beClickedId = beClicked.attr("id");
		switch(beClickedId){
			case "controls":
			if(gameControl.begins == 0){//开场
				main();
				//var ss = publics.timeouts;
				gameControl.begins = 1;//状态设置为已开始
				beClicked.text("重新开始");
			}else if(gameControl.begins == 1){//重新开始
				clearInterval(publics.timeouts);
				refreshGame();
				main();
			}
			break;
			case "ido":
			gameControl.begins = 1;
			publics.moveRate = 500;
			clearInterval(publics.timeouts);
				refreshGame();
				main();
				break;
			case "comm":
			gameControl.begins = 1;
			publics.moveRate = 300;
			clearInterval(publics.timeouts);
				refreshGame();
				main();
				break;
			case "boss":
			gameControl.begins = 1;
			publics.moveRate = 100;
			clearInterval(publics.timeouts);
				refreshGame();
				main();
			break;
		}
	})
}

function main(){//结合各自子方法 相当于控制全局的作用
	var snakeaction = new snakeAction();
	publics.timeouts = setInterval(snakeaction.Move,publics.moveRate);
	$(document).keydown(function(event){//监听键盘
		//console.log(event.keyCode)
		switch(event.keyCode){//监听键盘执行相应操作
			case(moveDirection[0].top):
			if(publics.inheritDirection != moveDirection[3].bottom){//不允许往回走
				publics.inheritDirection = moveDirection[0].top;	
			}
			break;
			case(moveDirection[1].right):
			if(publics.inheritDirection != moveDirection[2].left){
				publics.inheritDirection = moveDirection[1].right;
			}
			break;
			case(moveDirection[2].left):
			if(publics.inheritDirection != moveDirection[1].right){
				publics.inheritDirection = moveDirection[2].left;
			}
			break;
			case(moveDirection[3].bottom):
			if(publics.inheritDirection != moveDirection[0].top){
				publics.inheritDirection = moveDirection[3].bottom;
			}
			break;
		}
	});
	createFood();
}

function snakeAction(){
	var snakebody = publics.snakeBody;
	var snakeLength = publics.length;//初始长度
	var Xposition = Math.round(publics.width/2);
	var Yposition = Math.round(publics.height/2);
	var snakeHead = $("#xais"+Xposition+"yais"+Yposition);
	this.Move = function(){//使蛇移动，判断是否撞墙，判断是否吃了自己
		//console.log(event.keyCode)
		//console.log(moveDirection[0].top);
		//snakeHead.addClass('snake');
		var autoMove = publics.inheritDirection;
		switch(autoMove){
			case moveDirection[0].top:
			Xposition--;
			//console.log(Yposition);
			break;
			case moveDirection[1].right:
			Yposition++
			break; 
			case moveDirection[2].left:
			Yposition--;
			break; 
			case moveDirection[3].bottom:
			Xposition++;
			break;
		}
		snakebody.push([Xposition,Yposition]);

		var eat = function(){//吃到果实,放在前面实时增加蛇的长度
			var getSnakehead = publics.snakeBody[(snakebody.length-1)];//实时获取蛇头
			//console.log(getSnakehead);
			//console.log(publics.foodPosition);
			if (getSnakehead[0] == publics.foodPosition[0] && getSnakehead[1] == publics.foodPosition[1] ){
				snakeLength++;
				//console.log(snakeLength++);
				removeFood();
				createFood();
			}
		}
		eat();
		
		if(snakebody.length > snakeLength){//去除最后一位达到移动效果
			snakebody.splice(0,(snakebody.length-snakeLength-1));
			//console.log((snakebody.length-snakeLength-1));
		}
		console.log(snakebody[0]);
		
		if(checkArrayRepeat(snakebody)){//吃自己
			gameOver();
		};
		//console.log(snakeBody);
		publics.snakeBody = snakebody;

		for(i=0;i<snakebody.length;i++){
			snakeHead = $("#xais"+snakebody[i][0]+"yais"+snakebody[i][1]);//蛇头
			if(snakebody[i][0] < 0 || snakebody[i][0] > publics.width || snakebody[i][1] < 0 || snakebody[i][1] > publics.height){//判断是否撞墙
				gameOver();
			}
			//console.log(snakeHead);
			snakeTail = $("#xais"+snakebody[0][0]+"yais"+snakebody[0][1]);//蛇尾（抹去）
			snakeTail.removeClass('snake');
			snakeHead.addClass('snake');
		}
		$("#score").text(snakebody.length-1);
		
	}
	var gameOver = function(){//gameover
		alert("你的得分是"+(snakebody.length-1)+"分！！！");
		clearInterval(publics.timeouts);//清除时间函数
	}

}

function removeFood(){//用于重新开始时清除食物
	$("#snake-zoo").find(".food").children("img").remove().removeClass("food");
}

function refreshGame(){
	var zoosnake = $("#snake-zoo");
	zoosnake.find(".food").children("img").remove().removeClass("food");
	console.log($('.snake').length);
	if($('.snake').length > 0){
		zoosnake.find(".snake").removeClass("snake");	
	}
	publics.inheritDirection = moveDirection[1].right;
}

function createFood(){//生成食物，避免生成在蛇body上
		do{
			var foodX = parseInt(Math.random() * publics.width);
			var foodY = parseInt(Math.random() * publics.height);
			var foodPos = $("#xais"+foodX+"yais"+foodY);
			var checkFood = foodPos.attr("class");
			var flag = false;
			if(checkFood == "snake"){
				flag = true;
			}
		}
		while(flag);
		publics.foodPosition = [foodX,foodY];
		foodPos.addClass('food').append(publics.foodImg);
		console.log(publics.foodImg);
	}







