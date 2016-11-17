var slideWidth = $("#slideImgBox").width();
var curIndex = 1;
var timer;
$(window).resize(function(){
	slideWidth = $("#slideImgBox").width();
	curIndex = $(".focus").attr("index");
	$("#slider").css("left",-slideWidth * curIndex + "px"); 
});
$("#prev").click(function(){
	if(curIndex == 1){
		curIndex = 4;
	}else{
		curIndex--;
	};
	dotsColor();
	animate(slideWidth);
});
$("#next").click(function(){
	toNext();
});
$("#slideDots i").click(function(){
	var clickIndex = $(this).attr("index");
	var slideW = (clickIndex - curIndex) * slideWidth;
	curIndex = clickIndex;
	dotsColor();
	animate(-slideW);
});
$("#slideBox").hover(stopPlay,autoPlay);
autoPlay();

function animate(slideWidth){
	var slider = $("#slider");
	var imgWidth = $("#slideImgBox").width();
	slider.stop(true,true).animate({left: parseInt(slider.css("left")) + slideWidth},1000,function(){
		//当图片滑到第一张时，变为第四张
		if(parseInt(slider.css("left")) > -imgWidth){
			slider.css("left",-4 * imgWidth + 'px');
		}
		//当图片滑到第五张时，变为第一张
		if(parseInt(slider.css("left")) < -4 * imgWidth){
			slider.css("left",-imgWidth + 'px');
		}
	});
}
function dotsColor(){
	$(".focus").removeAttr("class");
	$("#slideDots i").eq(curIndex - 1).attr("class","focus");
}
function toNext(){
	if(curIndex == 4){
		curIndex = 1;
	}else{
		curIndex++;
	};
	dotsColor();
	animate(-slideWidth);
}
function autoPlay(){
	timer = setInterval(toNext,3000);
}
function stopPlay(){
	clearInterval(timer);
}
