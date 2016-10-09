define(function (require, exports, module) {

    var news = $('#news'),
        news_img = $('.newsImg'),
        $_img = news_img.find('img'),
        news_len = $_img.length,
        $icon = $('.icon'),
        $_list = $('.news-title'),
        $_ul = $_list.find('ul'),
        $_ul_i = 0,
        st,
        news_status = true,
        $_list_len = Math.ceil($_list.find('li').length / 2),
        news_i = 0;

    if (news_len > 1) {
        addElement();
        st = setInterval(function(){
            show(function(){
                if (news_i < news_len - 1) {
                    news_i ++;
                } else {
                    news_i = 0;
                }
            });
        }, 2000);
    }

    if ($_list_len > 1) {
        setInterval(function(){
            if ($_ul_i < $_list_len - 1) {
                $_ul_i ++;
            } else {
                $_ul_i = 0;
            }
            $_ul.animate({'top':-$_ul_i * 20 + 'px'}, 300);
        }, 4000);
    }

    function addElement () {
        for (var i = 0; i < news_len; i ++) {
            $icon.append('<i></i>');
        }
        $icon.find('i').eq(0).addClass('hover');
        $icon.find('i').each(function(){
            $(this).click(function(){
                if ($(this).index() !== news_i) {
                    if (news_status) {
                        news_status = false;
                        var _this = $(this).index();
                        show(function(){
                            news_i = _this;
                        });

                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
        });
    }

    function show(back){
        clearTimeout(st);
        news_img.find('img').eq(news_i).stop().animate({'left':'-500px'}, 500, function(){
            $(this).css({'left':'500px'});
            news_status = true;
            st = setInterval(function(){
                show(function(){
                    if (news_i < news_len - 1) {
                        news_i ++;
                    } else {
                        news_i = 0;
                    }
                });
            }, 2000);
        });
        $icon.find('i').eq(news_i).removeClass('hover');
        back();
        $icon.find('i').eq(news_i).addClass('hover');
        news_img.find('img').eq(news_i).stop().animate({'left':'0'}, 500);

        return false;
    }


});