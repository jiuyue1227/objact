define(function (require, exports, module) {

    var face = $('#face-face'),
        face_ul = $('.show-photo ul'),
        face_li = face_ul.find('li'),
        face_left = $('.left-btn'),
        face_right = $('.right-btn'),
        _ul = $('.show-message ul'),
        _li = $('.show-message li'),
        face_status = true,
        face_li_len = face_li.length;

    _li.eq(2).show();
    face_ul.css({'width':(120 * face_li_len + 100) + 'px'});

    if (face_li_len > 2) {
        face_right.click(function(){
            if (face_status) {
                face_status = false;
                faceShow(2, 3);
                face_ul.animate({'left':'-120px'}, 400, function(){
                    face_ul.find('li:first').appendTo(face_ul);
                    face_ul.css('left','0');
                });

                _ul.find('li:eq(2)').hide();
                _ul.find('li:first').appendTo(_ul);
                _ul.find('li:eq(2)').show();
            } else {
                return false;
            }
        });
        face_left.click(function(){
            if (face_status) {
                face_status = false;
                _ul.find('li:eq(2)').hide();
                _ul.find('li:last').insertBefore(_ul.find("li:first"));
                _ul.find('li:eq(2)').show();

                face_ul.find('li:last').insertBefore(face_ul.find("li:first"));
                face_ul.css('left','-120px');
                setTimeout(function(){
                    faceShow(3, 2);
                    face_ul.animate({'left':'0'}, 400);
                },20);
            } else {
                return false;
            }
        });
        face_li.each(function(){
            $(this).click(function(){
                if (face_status) {
                    face_status = false;
                    var _index = $(this).index();
                    console.log(_index === 2);
                    if (_index !== 2) {
                        if (_index > 2) {
                            face_ul.animate({'left': -120 * (_index - 2) + 'px'}, 400, function () {
                                for (var _j = 0; _j < _index - 2; _j++) {
                                    face_ul.find('li:first').appendTo(face_ul);
                                    _ul.find('li:first').appendTo(_ul);

                                }
                                face_ul.css('left', '0');
                                _li.hide();
                                _ul.find('li:eq(2)').show();

                            });
                            faceShow(2, _index);
                        }
                        if (_index < 2) {

                            for (var _m = 0; _m < 2 - _index; _m++) {
                                face_ul.find('li:last').insertBefore(face_ul.find("li:first"));
                                _ul.find('li:last').insertBefore(_ul.find("li:first"));
                            }
                            face_ul.css('left', -120 * (2 - _index) + 'px');
                            setTimeout(function () {
                                faceShow(4 - _index, 2);
                                _li.hide();
                                _ul.find('li:eq(2)').show();
                                face_ul.animate({'left': '0'}, 400, function () {

                                });
                            }, 20);
                        } else {
                            return false;
                        }
                    } else {
                        face_status = true;
                    }
                } else {
                    return false;
                }
            });
            $(this).hover(function(){
                $(this).find('span').css('opacity','1');
            }, function(){
                $(this).find('span').css('opacity','0');
            })
        });
    } else {
        return false;
    }

    function faceShow(index1, index){
        face_ul.find('li:eq(' + index1 + ')').animate({
            'width': '120px',
            'height':'120px',
            'marginTop':'55px'
        }, 400, function(){
            $(this).removeClass('big-img');
            face_status = true;
        });
        face_ul.find('li:eq(' + index + ')').animate({
            'width': '220px',
            'height':'220px',
            'marginTop':'0'
        }, 400, function(){
            $(this).find('span').css('opacity','0');
        }).addClass('big-img');
    }



});