window.onload = function(){	
	var slideImgs = document.getElementById("slideImgs");
	var slider = document.getElementById("slider");
	var bgImgs = slider.getElementsByTagName("a");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var dots = document.getElementById("slideDots").getElementsByTagName("i");
	var index = 1;
	
	slideWidth();
	window.onresize = function(){
		slideWidth();
	};
	prev.onclick = function(){
		var left = parseInt(slider.offsetLeft);
		/*当滑到第1张时，返回*/
		if(left == 0){
			return;
		}
		animate(slideWidth());
		dotsColor();
	};
	next.onclick = function(){		
		var left = parseInt(slider.offsetLeft);
		/*当滑到第4张时，返回*/
		if(-left == slideWidth() * 3){
			return;
		}
		animate(-slideWidth());
		dotsColor();
	};

//	点击小圆点切换图片
	for (var k = 0;k<dots.length;k++){
		dots[k].onclick = function(){
			var myIndex = parseInt(this.getAttribute("index"));
			var offset = - (slideWidth() * (myIndex - index));
			animate(offset);
			this.setAttribute("class", "on"); 
			index = myIndex;
		};
	};  
/*图片滑动的宽度*/
	function slideWidth(){
		var slideWidth = document.body.clientWidth;
		slider.style.width = slideWidth * 5 + "px";
		slideImgs.style.width = slideWidth + "px";
		for (var i = 0;i<bgImgs.length;i++){
			bgImgs[i].style.width = slideWidth  + "px";
		}
		var slideH = slider.offsetHeight;
		slideImgs.style.height = slideH + "px";
		return slideWidth;
	};
	function animate(offset){
		for(var j = 0;j < dots.length;j++){
			dots[j].removeAttribute("class");
		};  
		var slideLeft = parseInt(slider.offsetLeft);
		slider.style.left = slideLeft + offset + "px";
	};
	function dotsColor(){
//将滑动的宽度与图片的index相对应
		var imgIndex = Math.abs(parseInt(slider.offsetLeft)/slideWidth());
		dots[imgIndex].setAttribute("class","on");
		index = imgIndex + 1;
	};
};

//$(function(){
////切换广告
//  var length = $(".advertisement_img").length;
//  var index = 0; //图片序号
//  var timer
//	clock();
//  $(".advertisement_img").hover(
//	    function(){
//	    	clearInterval(timer);
//	    },
//	    function(){
//	    	clock();
//	    });
//	function clock(){
//      timer = setInterval(function() {       
//			        index++;
//					$(".advertisement_img").css("display","none").eq(index).fadeIn("slow");
//			        if (index == length - 1) {    //最后一张图片之后，转到第一张
//			            index = -1;
//			       	}
//	    	}, 10000);
//	  };
//});