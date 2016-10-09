define(function (require, exports, module) {

    var anecdote = $('#anecdote'),
        anecdote_em = $('#anecdote em'),
        anecdote_ul = anecdote.find('ul'),
        anecdote_left = anecdote.find('.left-btn'),
        anecdote_right = anecdote.find('.right-btn'),
        anecdote_li = anecdote_ul.find('li'),
        anecdote_status = true,
        a_i = 1,
        anecdote_li_len = anecdote_li.length;

    anecdote_em.eq(1).html(anecdote_li_len);
    anecdote_ul.css('width',anecdote_li_len * 460 + 'px');
    anecdote_right.click(function(){
        rightClick();
    });
    anecdote_left.click(function(){
        leftClick();
    });

    function rightClick(){
        if (anecdote_status) {
            anecdote_status = false;
            if (a_i < anecdote_li_len) {
                a_i ++;
            } else {
                a_i = 1;
            }

            anecdote_em.eq(0).html(a_i);
            anecdote_ul.find('li:eq(1)').animate({
                'top':'30px'
            }, 400, function(){
                $(this).removeClass('main-li');
                anecdote_status = true;
            });

            anecdote_ul.find('li:eq(2)').animate({
                'top':'0'
            }, 400).addClass('main-li');

            anecdote_ul.animate({'left':'-690px'}, 400, function(){
                anecdote_ul.find('li:first').appendTo(anecdote_ul);
                anecdote_ul.css('left','-230px');
            });
        } else {
            return false;
        }
    }
    function leftClick(){
        if (anecdote_status) {
            anecdote_status = false;
            if (a_i > 1) {
                a_i --;
            } else {
                a_i = anecdote_li_len;
            }

            anecdote_em.eq(0).html(a_i);

            anecdote_ul.find('li:last').insertBefore(anecdote_ul.find("li:first"));
            anecdote_ul.css('left','-690px');

            setTimeout(function(){
                anecdote_ul.find('li:eq(2)').animate({
                    'top':'30px'
                }, 400, function(){
                    $(this).removeClass('main-li');
                    anecdote_status = true;
                });

                anecdote_ul.find('li:eq(1)').animate({
                    'top':'0'
                }, 400).addClass('main-li');

                anecdote_ul.animate({'left':'-230px'}, 400);

            }, 20);
        } else {
            return false;
        }
    }


});