(function($){

var imgList;

var _getImageItem = function(_image){
    return '<div class="item"><img src="' + _image + '"></div>';
};

var getItems = function(){
    for (var i=0,_items=[]; i<imgList.length; ++i)
        _items.push(_getImageItem(imgList[i]));
    return _items.join('');
};

var onProgress = function(imgLoad, image){
    //console.log(imgLoad, image);
};

var onAlways = function(){
    $('#loading').hide();
    $('#content').css({opacity:1});
}

var _showMode = 6;
$(document).ready(function(){
    setSize();
    if (typeof g_data == 'undefined')
        imgList = [];
    else
        imgList = g_data || [];

    var $status = $('#loading');
    var $container = $('#content');

    var items = getItems();
    //$container.prepend($(items));
    // initialize Masonry after all images have loaded  
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector: '.item'
      });
    }).progress(onProgress)
      .always(onAlways);

    $('#switch2Link').on('click',function(){
        $(this).css({display:'none'});
        $('#switch6Link').css({display:''});
        $('#content').css({display:'none'});
        $('#container').css({display:''});
        _showMode = 2;
    });
    $('#switch6Link').on('click',function(){
        $(this).css({display:'none'});
        $('#switch2Link').css({display:''});
        $('#content').css({display:''});
        $('#container').css({display:'none'});
        _showMode = 6;
    });

    if ('onmousewheel' in document.body) {
        //for ie and webkit
        $(document.body).bind('mousewheel',_handler);
    } else {
        $(document.body).bind('DOMMouseScroll',_handler);
    }
});

$(window).resize(function(){
    setSize();
});

function setSize(){
    clientWidth = $(window).width();
    clientHeight = $(window).height();
    $('#container .item').each(function(index){
        var _height = clientHeight-100;
        console.log(_height);
        $(this).css({height:_height});
        $(this).find(".img").css({height:_height-40})
    });
}

var currTime = 0, 
    prevTime = 0,
    direction = -1,
    screenNum = 4,
    currScreen = 0;
var _handler = function(event){
    if (_showMode == 6)
        return;
    currTime = +new Date;
    if (currTime - prevTime < 600)
        return false;
    event.preventDefault();
    var _event = event.originalEvent;
    var _marginTop = currScreen * clientHeight;
    direction = 'onmousewheel' in document.body ? _event.wheelDelta / 120 : - (_event.detail)/3;
    
    var _scrollTop = $('body').scrollTop()||$('html').scrollTop();
    var _screenHeight = clientHeight - 100;
    // 下面的算法有错，不应该滚动一屏的高度，而应该是滚动最接近下一屏的距离，
    // 因为用户拖动浏览器滚动条是不会触发这个的，所以偏移是不对的
    // direction为-1为向下滚动，为1为向上滚动
    if (direction < 0) {
        // ((st - st % sh) / sh + 1) * sh;
        var _target = ((_scrollTop - _scrollTop % _screenHeight) / _screenHeight + 1) * _screenHeight;
        $('body,html').animate({scrollTop:_target},{duration:400,queue:true});
    } else {
        var _incr = _scrollTop % _screenHeight;
        if (_incr == 0)
            _incr = _screenHeight;
        var _target = _scrollTop - _incr;
        $('body,html').animate({scrollTop:_target},{duration:400,queue:true});
    }
    prevTime = +new Date;
};

})(jQuery);