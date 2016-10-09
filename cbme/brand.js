define(function (require, exports, module) {

    var $brand = $('#brand'),
        $brand_ul = $brand.find('ul'),
        $brand_li = $brand.find('li'),
        $brand_len = $brand_li.length,
        $brand_left = $brand.find('.left-btn'),
        $brand_right = $brand.find('.right-btn'),
        brand_icon = $brand.find('.icon'),
        ul_width = $('.ul-width'),
        i_len,
        b_index = 0,
        $brand_status = true;


    i_len = Math.ceil($brand_len / 10);
    ul_width.css({'height':'300px','width':850 * i_len + 'px'});

    for (var i = 0; i < i_len; i ++) {
        brand_icon.append('<i></i>');
    }
    brand_icon.find('i').eq(0).addClass('hover');
    brand_icon.find('i').each(function(){
        $(this).click(function(){
            if ($brand_status) {
                $brand_status = false;
                var this_index = $(this).index();
                brandShow(function(){
                    b_index = this_index;
                });
            }
        });
    });
    var nst = setInterval(function(){
        $brand_right.click();
    }, 400000);
    $brand_left.click(function(){
        if ($brand_status) {
            $brand_status = false;
            brandShow(function(){
                if (b_index > 0) {
                    b_index --;
                } else {
                    b_index = i_len - 1;
                }
            });
        }

    });
    $brand_right.click(function(){
        if ($brand_status) {
            $brand_status = false;
            brandShow(function () {
                if (b_index < i_len - 1) {
                    b_index++;
                } else {
                    b_index = 0;
                }
            });
        }
    });

    function brandShow(back){
        clearTimeout(nst);
        brand_icon.find('i').eq(b_index).removeClass('hover');
        back();
        brand_icon.find('i').eq(b_index).addClass('hover');
        ul_width.animate({'left':-b_index * 850 + 'px'}, 600, function(){
            nst = setInterval(function(){
                $brand_right.click();
            }, 4000);
            $brand_status = true;
        });
    }


});