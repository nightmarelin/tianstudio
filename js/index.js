(function($){
var clientWidth,
    clientHeight;

$(document).ready(function(){
    setSize();
    init();
});

$(window).resize(function(){
    setSize();
});

function setSize(){
    clientWidth = $(window).width();
    clientHeight = $(window).height();
    $('.wrap').each(function(){
        $(this).css({height:clientHeight,width:clientWidth});
    });
}

var currTime = 0, 
    prevTime = 0,
    direction = -1,
    screenNum = 4,
    currScreen = 0;
var _handler = function(event){
    currTime = +new Date;
    if (currTime - prevTime < 600)
        return false;
    event.preventDefault();
    var _event = event.originalEvent;
    var _marginTop = currScreen * clientHeight;
    direction = 'onmousewheel' in document.body ? _event.wheelDelta / 120 : - (_event.detail)/3;
    // direction为-1为向下滚动，为1为向上滚动
    if (direction < 0) {
        if (currScreen < screenNum - 1) {
            currScreen++;
            _marginTop += clientHeight;
        }
    } else {
        if (currScreen > 0) {
            currScreen--;
            _marginTop -= clientHeight;
        }
    }                    
    $("#main_box").animate({marginTop:_marginTop*-1},{duration:400,queue:true});
    prevTime = +new Date;

    $('#side_nav').children().each(function(){
        $(this).removeClass('j-sel j-sel1');
        if (currScreen == 2 || currScreen == 3) {
            $(this).addClass('c');
        } else {
            $(this).removeClass('c');
        }
    });
    if (currScreen == 2 || currScreen == 3) {
        $('#side_nav').children().eq(currScreen).addClass('j-sel1');
    } else {
        $('#side_nav').children().eq(currScreen).addClass('j-sel');
    }
};

function init(){
    if ('onmousewheel' in document.body) {
        //for ie and webkit
        $(document.body).bind('mousewheel',_handler);
    } else {
        $(document.body).bind('DOMMouseScroll',_handler);
    }
}

return;

document.body.onmousewheel = function(event) {
    currTime = new Date();
    //alert(currTime - prevTime);
    if (currTime - prevTime < 600 ) {
        return false;
    }
    event = window.event || event; 
    event.preventDefault;
    var mt = -pos*windowHeight;
    delta = event.wheelDelta / 120;
    if (delta < 0){
        if (pos != 7 && pos != 0 ) {
            pos++;
            mt = mt - windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
        }
        else if (pos == 0) {
            pos++;
            mt = mt - windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
            $(".logo").attr("src","images/logo_s.png")
        }
        prevTime = new Date();
    }
    else {
        if (pos > 1) {
            pos--;
            mt = mt + windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
        }
        else if (pos == 1) {
            pos--;
            mt = mt + windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
            $(".logo").attr("src","images/logo.png")
        }
        prevTime = new Date();
    }
    
};

//for moz
document.body.addEventListener("DOMMouseScroll", function(event) {
    currTime = new Date();
    if (currTime - prevTime < 600 ) {
        return false;
    }
    event = window.event || event; 
    event.preventDefault;
    var mt = -pos*windowHeight;
    delta = - (event.detail)/3;
    if (delta < 0){
        if (pos != 7 && pos != 0 ) {
            $(".indicator li").eq(pos).find("span").fadeOut(500);
            $(".indicator li").eq(pos).css("background","#FFF");
            pos++;
            $(".indicator li").eq(pos).find("span").fadeIn(800);
            $(".indicator li").eq(pos).css("background","none");
            mt = mt - windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
        }
        else if (pos == 0) {
            $(".indicator li").eq(pos).find(".home").css("display","none");
            $(".indicator li").eq(pos).find(".home_l").css("display","block");
            pos++;
            $(".indicator li").eq(pos).find("span").fadeIn(800);
            $(".indicator li").eq(pos).css("background","none");
            mt = mt - windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
            $(".logo").attr("src","images/logo_s.png")
        }
        prevTime = new Date();
    }
    else {
        if (pos > 1) {
            $(".indicator li").eq(pos).find("span").fadeOut(500);
            $(".indicator li").eq(pos).css("background","#FFF");
            pos--;
            $(".indicator li").eq(pos).find("span").fadeIn(800);
            $(".indicator li").eq(pos).css("background","none");
            mt = mt + windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
        }
        else if (pos == 1) {
            $(".indicator li").eq(pos).find("span").fadeOut(500);
            $(".indicator li").eq(pos).css("background","#FFF");
            pos--;
            $(".indicator li").eq(pos).find(".home_l").css("display","none");
            $(".indicator li").eq(pos).find(".home").css("display","block");
            mt = mt + windowHeight;
            $(".wrap").animate({marginTop:mt},{duration:400,queue:true});
            $(".logo").attr("src","images/logo.png")
        }
        prevTime = new Date();
    }
});

})(jQuery);