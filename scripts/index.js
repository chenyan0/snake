window.onload=function(){
	var ROW=15,COL=20,
	    kaiguan=true,timespec=500;
	var sence=document.getElementById('changjing');
	for(var i=0;i<ROW;i++){
		for (var j = 0; j<COL; j++) {
			var block=document.createElement('div');
			block.setAttribute('class','block');
			block.setAttribute('id',i+'_'+j);
			sence.appendChild(block);

		};
		
	}
	var 
	snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}],
	LEFT=37,UP=38,RIGHT=39,DOWN=40,
	dfDir=RIGHT,
	MAXSNAKE=225,
	isInSnake=function(x,y){
		for(var i=0;i<snake.length;i++){
			if(snake[i].x==x&&snake[i].y==y){
				return true;
			}
		}
		return false;
	},
	join=function(f,s){
		return f +'_'+ s;
	},
	$=function(id){
		return document.getElementById(id);
	},
	dropFood=function(){
		
		x=Math.floor(Math.random()*ROW),
		y=Math.floor(Math.random()*COL);
		//warniiing 当蛇的数据占满整个页面的时候会陷入死循环
		if(snake.length==MAXSNAKE){
			ischenggong('chenggong');
			return;
		}
		while(isInSnake(x,y)){
			x=Math.floor(Math.random()*ROW);
			y=Math.floor(Math.random()*COL);
		}
		id=$(join(x,y)).setAttribute('class','block food');
		return {foodx:x,foody:y};
	},
	yidong=function(){
		audio.play();
		var last=snake.length-1,newHead,weiba;
		if(dfDir==LEFT){
			newHead={x:snake[last].x,y:snake[last].y-1};
			if( newHead.x >14 || newHead.x <0 || newHead.y>19 || newHead.y <0){
				ischenggong('失败');
				clearInterval(t);
				return ;
			}
			
			$(join(newHead.x,newHead.y)).style.transform="rotateZ(180deg)";
			
		}
		if(dfDir==RIGHT){
			newHead={x:snake[last].x,y:snake[last].y+1};
			if( newHead.x >14 || newHead.x <0 || newHead.y>19 || newHead.y <0){
				ischenggong('失败');
				clearInterval(t);
				return ;
			}
			
			$(join(newHead.x,newHead.y)).style.transform="rotateZ(0deg)";
		}
		if(dfDir==UP){
			newHead={x:snake[last].x-1,y:snake[last].y};
			if( newHead.x >14 || newHead.x <0 || newHead.y>19 || newHead.y <0){
				ischenggong('失败');
				clearInterval(t);
				return ;
			}
			
			$(join(newHead.x,newHead.y)).style.transform="rotateZ(-90deg)";
		}	
		if(dfDir==DOWN){
			newHead={x:snake[last].x+1,y:snake[last].y};
			if( newHead.x >14 || newHead.x <0 || newHead.y>19 || newHead.y <0){
				ischenggong('失败');
				clearInterval(t);
				return ;
			}
			$(join(newHead.x,newHead.y)).style.transform="rotateZ(90deg)";
		}	
		if(isInSnake(newHead.x,newHead.y) ){
			ischenggong('失败');
			return null;
		}
		if(newHead.x==food.foodx&&newHead.y==food.foody){
			snake.push(newHead);
			$(join(food.foodx,food.foody)).setAttribute('class','block head');
			$(join(snake[snake.length-2].x,snake[snake.length-2].y)).setAttribute('class','block  snake');	
			food=dropFood();
			return ;

		}
		weiba=snake.shift();
		snake.push(newHead);
		for(i=0;i<snake.length;i++){
			$(join(snake[i].x,snake[i].y)).setAttribute('class','block snake');	
		};
		$(join(snake[snake.length-1].x,snake[snake.length-1].y)).setAttribute('class','block  snake');	
		$(join(weiba.x,weiba.y)).setAttribute('class','block ');
		$(join(newHead.x,newHead.y)).setAttribute('class','block head');
	};
	var food=dropFood();
	var tip=document.getElementById('tip'),
	    ts=document.getElementById('ts'),
	    again=document.getElementById('again'),
	    exit=document.getElementById('exit'),
	    button=document.getElementsByClassName('button');
	again.onclick=function(){
		location.reload();
	};
	exit.onclick=function(){
		window.close();
	};
	var ischenggong=function(s){
		tip.style.display='block';
		if(s=='失败'){
			ts.style.backgroundImage='url(./imgs/ts1.png)';
		}else{
			ts.style.backgroundImage='url(./imgs/ts2.png)';
		}
	};
	var t;
	for(var i=0;i<button.length;i++){
		button[i].onclick=function(){
			if(this.innerHTML=='开始'){
				t=setInterval(yidong,timespec);
				
			}else if(this.innerHTML=='退出'){
				window.close();
			}else if(this.innerHTML=='音效:开'){
				this.innerHTML='音效:关';
				audio.volume=0;
			}else if(this.innerHTML=='音效:关'){
				this.innerHTML='音效:开';
				audio.volume=1;
			}else if(this.innerHTML=='暂停'){
				clearInterval(t);
				this.innerHTML='继续';
			}else if(this.innerHTML=='继续'){
				t=setInterval(yidong,timespec);
				this.innerHTML='暂停';
			}
			else if(this.innerHTML=='慢速'){
				timespec=400;
				this.innerHTML='中速';
			}else if(this.innerHTML=='中速'){
				timespec=100;
				this.innerHTML='极速';
			}else if(this.innerHTML=='极速'){
				timespec=600;
				this.innerHTML='慢速';
			}
		}
	}

// ---------------------------------------------------------------------------------------------------
	(function(){
		for(var i=0;i<snake.length;i++){
			$(join(snake[i].x,snake[i].y)).setAttribute('class','block snake');	
		}
		$(join(snake[snake.length-1].x,snake[snake.length-1].y)).setAttribute('class','block head');
	})();
	
	document.onkeydown=function(e){
		var d=e.keyCode;
		if((d==LEFT||d==UP||d==RIGHT||d==DOWN)&&Math.abs(d-dfDir)!==2){
			dfDir=d; 	
		}
		if(d==32&&kaiguan){
			clearInterval(t);
			kaiguan=false;
		}else if(d==32&&!kaiguan){
			t=setInterval(yidong,timespec);
			kaiguan=true;
		}
	};
	document.onmousedown=function(e){
		e.preventDefault();
	};
	

	


















	// var kaiguan=true;
	// document.onclick=function(){
	// 	if(kaiguan){
	// 		alert(1);
	// 		kaiguan=false;
	// 	}else{
	// 		alert(2);
	// 		kaiguan=true;
	// 	}
	// }

	// while循环的一种用法
	// var dianming=function(){
	// 	var iskongzuowei=function(x,y){
	// 		if(x==2&&y==0){
	// 			return true;
	// 		}else{
	// 			return false;
	// 		}
	// 	}
	// 	var  x=Math.floor(Math.random()*5);
	// 	var  y=Math.floor(Math.random()*10);
	// 	while(iskongzuowei(x,y)){
	// 		x=Math.floor(Math.random()*5);
	// 		y=Math.floor(Math.random()*10);
	// 	}
	// 	return {x:x,y:y};


	// };
	// console.log(dianming());

	// 如果数组中有a:3 b:5对象 return true 如果没有返回false
	// var da=[{a:1,b:2},{a:3,b:4},{a:2,b:3},{a:5,b:4},{a:6,b:1}]
	// var aaa=function(x,y){
	// 	for(var i=0;i<da.length;i++){
	// 		if(da[i].a==x&&da[i].b==y){
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// };
	// console.log(aaa(3,5));



	// var arr=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	// var fn=function(){
	// 	arr.shift();
	// 	var c={};
	// 	c.x=arr[arr.length-1].x;
	// 	c.y=arr[arr.length-1].y+1;
	// 	arr.push(c);
	// 	return arr;
	// };
	// console.log(fn());
};