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
    $('.wrap').each(function(index){
        $(this).css({height:clientHeight});
        switch (index) {
        case 0:
            // 878*960
            var _height = clientHeight-120,
                _width = Math.round(878*_height/960),
                _left = (clientWidth-_width)/2;
            var $bg = $(this).find('.bg');
            $bg.css({left:_left,height:_height,width:_width});
            //$bg.css({left:_left,height:_height,width:_width,backgroundSize:(_height*100/960)+'%',backgroundPosition:'50% -'+(_height*100/960)+'%'});
            //var $name = $(this).find('.name');
            //$name.css({paddingTop:Math.round(clientHeight/2)})
            break;
        case 1:
            // 878*960
            var _height = clientHeight-120,
                _width = Math.round(878*_height/960),
                _left = clientWidth/2;
            var $bg = $(this).find('.bg');
            $bg.css({left:_left,height:_height,width:_width});
            break;
        case 2:
            // 1316*960
            var _height = clientHeight-120,
                _width = Math.round(1316*_height/960),
                _left = (clientWidth-_width)/2;
            var $bg = $(this).find('.bg');
            $bg.css({left:_left,height:_height,width:_width});
            break;
        case 3:
            // 422*632
            // var _height = clientHeight-120,
            //     _width = Math.round(422*_height/632),
            //     _left = (clientWidth-_width)/2;
            // var $bg = $(this).find('.bg');
            // $bg.css({left:_left,height:_height,width:_width});
            break;
        }
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
    console.log(event);
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
    $(document).scroll(function(){
        var _ch = clientHeight,
            _st = $(window).scrollTop();
        if (_st < _ch) {
            $('#home').css({position:'fixed'});
            $('#fashion').css({position:'absolute'});
            $('#creation').css({position:'absolute'});
            $('#logoImg').attr('src','images/logo_white.png');
            $('#navList').removeClass('nav1');
        } else if (_st >= _ch && _st < _ch *2) {
            $('#home').css({position:'absolute'});
            $('#fashion').css({position:'fixed'});
            $('#creation').css({position:'absolute'});
            $('#logoImg').attr('src','images/logo_white.png');
            $('#navList').removeClass('nav1');
        } else if (_st >= _ch * 2 && _st < _ch *3) {
            $('#home').css({position:'absolute'});
            $('#fashion').css({position:'absolute'});
            $('#creation').css({position:'fixed'});
            $('#logoImg').attr('src','images/logo_white.png');
            $('#navList').removeClass('nav1');
        } else {
            $('#home').css({position:'absolute'});
            $('#fashion').css({position:'absolute'});
            $('#creation').css({position:'absolute'});
            $('#logoImg').attr('src','images/logo_black.png');
            $('#navList').addClass('nav1');
        }
    });
    return;
    if ('onmousewheel' in document.body) {
        //for ie and webkit
        $(document.body).bind('mousewheel',_handler);
    } else {
        $(document.body).bind('DOMMouseScroll',_handler);
    }
}

})(jQuery);