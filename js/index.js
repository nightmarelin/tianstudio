(function($){
var clientWidth,
    clientHeight;

$(document).ready(function(){
    setSize();
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

})(jQuery);