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
    // TODO
};

var onAlways = function(){
    console.log('...');
    $('#loading').hide();
}

$(document).ready(function(){
    if (typeof g_data == 'undefined')
        imgList = [];
    else
        imgList = g_data || [];

    var $status = $('#loading');
    var $container = $('#container');

    var items = getItems();
    $container.prepend($(items));
    // initialize Masonry after all images have loaded  
    $container.imagesLoaded(function(){
      $container.masonry();
    }).progress(onProgress)
      .always(onAlways);
});

})(jQuery);