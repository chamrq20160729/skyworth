window.onload = function(){
	var slideBox = document.getElementById("slideBox"),
		slideImgBox = document.getElementById("slideImgBox"),
		slider = document.getElementById("slider"),
		sliderImgs = slider.getElementsByTagName("a"),
		prev = document.getElementById("prev"),
	    next = document.getElementById("next"),
	    dots = document.getElementById("slideDots").getElementsByTagName("i"),
	    slideWidth = slideImgBox.clientWidth,
	    curIndex,
	    index,
	    i,
	    timer1,
	    timer2,
	    animation = false;
	    
	//向左切换
	prev.onclick = function(){
		if(!animation){
			i = findFocus(i);
			curIndex = i;
			if(curIndex == 0){
				index = 3;
			}else{
				index = curIndex - 1;
			}
			toFocus(i,index);
			sliderImgs = slider.getElementsByTagName("a");
			slider.insertBefore(sliderImgs[3],sliderImgs[0]);
			animate(-slideWidth);
		}
	}
	//向右切换
	next.onclick = function(){
		if(!animation){
			i = findFocus(i);
			curIndex = i;
			if(curIndex == 3){
				index = 0;
			}else{
				index = curIndex + 1;
			}
			toFocus(i,index);
			sliderImgs = slider.getElementsByTagName("a");
			animate(slideWidth);
		}
	}
	//按钮切换
	for (i = 0;i<dots.length;i++){
		dots[i].onclick = function(){
			if(this.className == "focus"){
				return;
			}
			if(!animation){
				index = this.getAttribute("index");
				toImg(index - 1);
			}
		}
	}
	slideBox.onmouseover = stopPlay;
	slideBox.onmouseout = autoPlay;
	autoPlay();
	function animate(slideWidth){
		animation = true;
		var time = 300; //位移总时间
		var interval = 10; //位移间隔
		var speed = slideWidth / (time/interval); //每一次的位移长度 
		var toLeft;
		if(curIndex > index || (curIndex == 0 && index == 3)){ //如果向左切换
			toLeft = true;
			slider.style.left = slideWidth + "px";
		}
		if(curIndex == 3 && index == 0){
			toLeft = false;
			slider.style.left = 0;
		}
		timer1 = setInterval(function(){
			if(toLeft){  //如果向左切换
				slider.style.left = parseInt(slider.style.left) - speed + "px";
				if(parseInt(slider.style.left) > 0){
					slider.style.left = 0;
					clearInterval(timer1);
					animation = false;
				}
			}else{ //如果向右切换
				slider.style.left = parseInt(slider.style.left) - speed + "px";
				if(parseInt(slider.style.left) < -slideWidth){
					slider.appendChild(sliderImgs[0]);
					slider.style.left = 0;
					clearInterval(timer1);
					animation = false;
				}
			}
		},10);
	}
	function toImg(index){
		animation = true;
		for(i = 0;i < dots.length;i++){
			if(dots[i].className == "focus"){
				curIndex = i;
				break;
			};
		}
		curIndex = i;
		toFocus(i,index);
		var	num = Math.abs(index - curIndex);
		var	j = num;
		sliderImgs = slider.getElementsByTagName("a");
		
		var time = 300; //位移总时间
		var interval = 10; //位移间隔
		var speed = -slideWidth * num / (time/interval); //每一次的位移长度 
		var toLeft;
		if(index < curIndex){ //向左切换
			while(j--){
				slider.insertBefore(sliderImgs[3],sliderImgs[0]);
			}
			slider.style.left = -slideWidth * num + "px";
			timer1 = setInterval(function(){
			slider.style.left = parseInt(slider.style.left) - speed + "px";
			if(parseInt(slider.style.left) > 0){
				slider.style.left = 0;
				clearInterval(timer1);
				animation = false;
			}
		},10)	
		}else{ //向右切换
			timer1 = setInterval(function(){
				slider.style.left = parseInt(slider.style.left) + speed + "px";
				if(parseInt(slider.style.left) < -slideWidth * num){
					while(j--){
						slider.appendChild(sliderImgs[0]);
					}
					slider.style.left = 0;
					clearInterval(timer1);
					animation = false;
				}
			},10);
		}
	}
	function findFocus(i){
		for(i=0;i < dots.length;i++){
			if(dots[i].className == "focus"){
				break;
			};
		}
		return i;
	}
	function toFocus(i,index){
		findFocus(i);
		dots[i].removeAttribute("class");
		dots[index].className = "focus";
	}
	function autoPlay(){
		timer2 = setInterval("next.onclick()",3000);
	}
	function stopPlay(){
		clearInterval(timer2);
	}	
}
							