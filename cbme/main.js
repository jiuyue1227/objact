define(function (require) {


    require.async([
        './news',
        './faceToFace',
        './elite',
        './anecdote',
        './brand']);


    // 快速导航
    var nav = $('.nav'),
        nav_a = nav.find('a'),
        arr = [];

    nav_a.each(function(){
        $(this).click(function(){
            nav_a.find('span').css({'opacity':'0'});
            $(this).find('span').css({'opacity':'1'});
        });

        if ($(this).find('span').html() !== '') {
            var nav_i = $(this).index();
            arr.push($('.top').eq(nav_i).position().top);
        }
    });
    $(window).bind('scroll', function(){
        var top = $(this).scrollTop();

        if (top > 600) {
            nav.css({'position':'fixed','top':'0'});
        } else {
            nav.css({'position':'absolute','top':'600px'});
        }

        for (var i = 0; i < 5; i ++) {
            if (top < (arr[i] - 20) && top > (arr[i - 1] ?
                    (arr[i - 1] + $('.top').eq(i - 1).height() - 200) : 20)) {

                nav_a.find('span').css({'opacity':'0'});
                nav_a.eq(i).find('span').css({'opacity':'1'});
            }
        }


    })


});