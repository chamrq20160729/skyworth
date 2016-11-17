var slider = $("#slider"),
 	slideWidth = $("#slideImgBox").width(),
 	duration = 1000,
 	curIndex,
	index,
 	timer;
 	
$(window).resize(function(){
	slideWidth = $("#slideImgBox").width();
});
$("#slideBox").hover(stopPlay,autoPlay);
$("#prev").click(function(){
	curIndex = $(".focus").index();
	if(curIndex == 0){
		index = 3;
	}else{
		index = curIndex - 1;
	}
	toFocus(index);
	$(">a:last", slider).prependTo(slider);
    slider.stop(true, true).css("left", -slideWidth + "px").animate({ left: 0},duration);
});
$("#next").click(function(){
	toNext();
});
$("#slideDots i").click(function(){
	index = $(this).index();
	toImg(index);
});
function toImg(index){
    var focusIndex = $(".focus").index();
    toFocus(index);
	var	num = Math.abs(index - focusIndex);
	var	i = num;
    if(index < focusIndex){ //向左切换
    	while(i--){
            $(">a:last",slider).prependTo(slider);
        };
        slider.stop(true, true).css("left", - slideWidth * num + "px").animate({left: 0},duration);
    }else{ //向右切换
        slider.stop(true, true).animate({left: - slideWidth * num},duration,function(){
            while(i--){
                $(">a:first",slider).appendTo(slider);
            }
            slider.css("left",0);
        });
    };
}
function toFocus(index){
	$(".focus").removeAttr("class");
	$("#slideDots i").eq(index).attr("class","focus");
};
function toNext(){
	curIndex = $(".focus").index();
	if(curIndex == 3){
		index = 0;
	}else{
		index = curIndex + 1;
	}
	toFocus(index);
	slider.stop(true, true).animate({ left: -slideWidth },duration,function(){
        $(">a:first", slider).appendTo(slider.css("left",0));
    });
}
function autoPlay(){
	timer = setInterval(toNext,3000);
}
function stopPlay(){
	clearInterval(timer);
}
