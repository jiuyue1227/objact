define(function (require, exports, module) {

    var elite = $('#elite'),
        elite_ul = elite.find('ul'),
        elite_li = elite.find('li'),
        elite_li_len = elite_li.length,
        elite_left = elite.find('.left-btn'),
        elite_status = true,
        elite_right = elite.find('.right-btn');

    elite_ul.css({'width':230 * elite_li_len + 'px'});

    elite_right.click(function(){
        if (elite_status) {
            elite_status = false;
            elite_ul.animate({'left':'-230px'}, 400, function(){
                elite_ul.find('li:first').appendTo(elite_ul);
                elite_ul.css('left','0');
                elite_status = true;
            });
        }
    });
    elite_left.click(function(){
        if (elite_status) {
            elite_status = false;
            elite_ul.css('left', '-230px');
            elite_ul.find('li:last').insertBefore(elite_ul.find("li:first"));
            setTimeout(function () {
                elite_ul.animate({'left': '0'}, 400, function(){
                    elite_status = true;
                });
            }, 20);
        }
    });

    elite_li.each(function(){
        $(this).hover(function(){
            $(this).find('.elite-message').stop().animate({'top':'0'}, 500);
            $(this).find('em').stop().animate({'top':'0'}, 500);
        }, function(){
            $(this).find('.elite-message').stop().animate({'top':'240px'}, 500);
            $(this).find('em').stop().animate({'top':'240px'}, 500);
        })
    });


});