$(function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var animate_time = isAndroid ? 2000 : 2700, // 移动速度
        lifes = 3,
        st,
        st1,
        cTime = 1000,
        screenW = $('body').width(),
        pop = $('.game-pop');

    var GamePlay = function(obj){
        this.gameElement = $('.game-ele');
        this.gameFooter = $('.game-footer');
        this.gameBody = $('.game-down');
        this.createElementTime = cTime;
        this.didTime = 30;
        this.gameArr = obj.gameArr;
        this.id = obj.id;
        this.callBack0 = obj.callBack0;
        this.callBack1 = obj.callBack1;
        this.mouseX = 0;
        this.num_a = 0;
        this.num_d = 0;
        this.num_h = 0;
        this.arr = [];
        this.num_b = 0;
        this.ex = null;
        this.stop = false;
    };

    GamePlay.prototype = {

        // 创建元素
        createElement: function(n, arr){
            var _this = this,
                random_left = this.arr_random(4, 0, 3),
                _w = parseInt($('.game-ele').width()*0.18 + 5);

            var game_add_i = $('<i></i>').appendTo(_this.gameElement);

            _this.management(game_add_i, Number(arr));

            game_add_i.css({
                'top' :  '-30px',
                'left' : (random_left[0]*25) + '%',
                'height': _w + 'px'
            });

            _this.downAnimate(game_add_i, 60);  // 312是区域高度减去接盘高度
        },

        // 返回随机数组
        arr_random: function (n, min, max) {
            var arr = [];
            for (var i = 0; i < n; i ++) {
                arr[i] = parseInt(Math.random() * (max - min + 1) + min);
                for (var j = 0; j < i; j ++) {
                    if (arr[i] === arr[j]) {
                        i = i - 1;
                        break;
                    }
                }
            }
            return arr;
        },

        //下落机制
        management: function (obj, n) {
            
            var newArr = this.gameArr;
            if (this.id !== 3) {
                if (n % 5 === 0) { // 5 10 15 20
                    obj.addClass(newArr[3]);
                    obj.attr('name', 'did');
                } else {
                    if (n % 2 === 0) {
                        if (n % 4 === 0) {  // 4 8 12 16
                            obj.addClass(newArr[2]);
                            obj.attr('name', 'h');
                        } else {  // 2 6 14 18
                            obj.addClass(newArr[4]);
                            obj.attr('name', 'did');
                        }
                    } else {
                        if ((n + 1) % 4 !== 0) { // 1 9 13 17
                            obj.addClass(newArr[0]);
                            if (this.id === 2) {
                                obj.attr('name', 'did');
                            } else {
                                obj.attr('name', 'a');
                            }

                        } else { // 3 7 11 19
                            obj.addClass(newArr[1]);
                            obj.attr('name', 'd');
                        }
                    }
                }
            } else {
                
                if (n % 7 === 0) { // 7 14 21 28
                    obj.addClass(newArr[6]);
                    obj.attr('name', 'did');
                } else {
                    if (n % 2 === 0) {
                        if (n % 6 === 0) { // 6 12 18 24 30
                            obj.addClass(newArr[0]);
                            obj.attr('name', 'a');
                        } else {
                            if (n % 4 === 0) {  // 4 8 16 20
                                obj.addClass(newArr[5]);
                                obj.attr('name', 'did');
                            } else {  // 2 10 22 26
                                obj.addClass(newArr[4]);
                                obj.attr('name', 'did');
                            }
                        }
                    } else {
                        if (n % 5 === 0) { // 5 10 15 25
                            obj.addClass(newArr[1]);
                            obj.attr('name', 'd');
                        } else {
                            if ((n + 1) % 4 !== 0) { // 1 9 13 17 29
                                obj.addClass(newArr[2]);
                                obj.attr('name', 'h');

                            } else { // 3 11 19 23 27
                                obj.addClass(newArr[3]);
                                obj.attr('name', 'b');
                            }
                        }
                    }
                }
                
            }
        },

        // 游戏结束
        gameOver: function(state){
            this.stop = true;
            clearInterval(st);
            clearInterval(st1);
            this.gameElement.find('i').stop();
            pop.show();
            $('.pop_p' + this.id).hide();
            if (state) {
                if (this.id === 3) {
                    $('.pop' + this.id + '_p0').
                    append('<a href="javascript:void(0);" class="btn2"></a>').show();
                } else {
                    $('.pop' + this.id + '_p0').
                    append('<a href="javascript:void(0);" class="btn0"></a>').show();
                }

                this.callBack0();
            } else {
                $('.pop' + this.id + '_p1').
                append('<a href="javascript:void(0);" class="btn1"></a>').show();
                this.callBack1();
            }
            return false;
        },

        // 掉落动画
        downAnimate: function (obj, y) {
            var _this = this;
            var _top = obj.position().top;
            var webkit = 'webkitAnimationend' || 'animationend';

            function rightOrWrong(obj, time) {
                $(obj).show();
                setTimeout(function(){
                    $(obj).hide();
                }, time);
            }

            if (_top < y) {
                if (_this.stop) {// 游戏结束
                    return false;
                }
                obj.addClass('an');
                obj.bind('webkitAnimationEnd', function(){

                    var _left = parseInt($(this).position().left);

                    if (_left > parseInt(_this.gameFooter.position().left - screenW*0.05) &&
                        _left < parseInt(_this.gameFooter.position().left + screenW*0.07) && obj.hasClass('an')) {

                        var name_state = $(this).attr('name');

                        switch (name_state) {
                            case 'did':
                                rightOrWrong('.isWrong', 200);
                                if (lifes > 1) {
                                    lifes --;
                                    $('.life-n' + (lifes + 1)).find('b').hide();
                                } else {
                                    $('.life-n1').find('b').hide();
                                    _this.gameOver(false); // 此处为闯关失败
                                }
                                break;
                            case 'a':
                                rightOrWrong('.shine', 50);
                                _this.num_a ++;
                                if (_this.id === 3) {
                                    $('.game' + _this.id + '-p1 em').hide();
                                } else {
                                    if (_this.num_a > 2) {
                                        $('.game' + _this.id + '-p1 em').hide();
                                    }
                                }

                                break;
                            case 'd':
                                rightOrWrong('.shine', 50);
                                _this.num_d ++;
                                if (_this.id === 2) {
                                    $('.game' + _this.id + '-p1 em').hide();
                                } else {
                                    $('.game' + _this.id + '-p2 em').hide();
                                }

                                break;
                            case 'h':
                                rightOrWrong('.shine', 50);
                                _this.num_h ++;
                                if (_this.id === 2) {
                                    $('.game' + _this.id + '-p2 em').hide();
                                } else {
                                    $('.game' + _this.id + '-p3 em').hide();
                                }
                                break;
                            case 'b':
                                rightOrWrong('.shine', 50);
                                _this.num_b ++;
                                $('.game' + _this.id + '-p4 em').hide();
                                break;
                        }
                        $(this).remove();



                        var overExist = _this.id === 2 ? _this.num_d > 0 && _this.num_h > 0 :
                            (_this.id === 3 ?
                            _this.num_b > 0 && _this.num_a > 0 && _this.num_d > 0 && _this.num_h > 0 :
                            _this.num_a > 2 && _this.num_d > 0 && _this.num_h > 0);

                        if (overExist) {
                            _this.gameOver(true); // 此处为通关
                        }

                    } else {
                        obj.removeClass('an');
                        obj.addClass('an2');
                        obj.bind('webkitAnimationEnd', function(){
                            $(this).remove();
                        });


                    }
                
                });


            }
        },

        // 移动滑块
        elementMove: function () {
            var _this = this;
            var game_body = _this.gameBody,
                game_footer = _this.gameFooter;

            game_body.bind('touchstart', function(event){
                event.preventDefault();
            });
            game_body.bind('touchmove', function(event){
                _this.ex = event.originalEvent.targetTouches[0].pageX;
                var endx = _this.ex;
                var _left = endx - screenW * 0.18;

                if (_left < 0) {
                    game_footer.css({'left':'0'});
                } else if (_left > screenW * 0.63) {
                    game_footer.css({'left':(screenW * 0.72) + 'px'});
                } else {
                    game_footer.css({'left':(endx - screenW*0.14) + 'px'});
                }
            });


        },

        // 游戏开始
        start: function () {
            var ele_i = 0,
                _this = this;
            _this.arr = _this.arr_random(31, 1, 32);
            
            _this.stop = false;
            //初始化
            $('.game-ele').html('');
            $('.game-title img').hide().eq(_this.id - 1).show();
            $('.game-ele-state div').hide();
            $('.state-p' + _this.id).show();
            $('.time b').html('30');


            // 创建元素
            st = setInterval(function(){
                ele_i ++;
                _this.createElement(ele_i,_this.arr[ele_i]);
            }, _this.createElementTime);


            // 计时
            st1 = setInterval(function(){
                if (_this.didTime > 0) {
                    _this.didTime --;
                    $('.time b').html(_this.didTime);
                } else {
                    _this.gameOver(false);
                }
            }, 1000);

            _this.elementMove();
        }

    };


    // 刷新
    function reload() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            window.location.href = window.location.href + "?id=4";
        }else{
            window.location.reload();
        }
    }
    // 实例化游戏对象
    var newGame1 = new GamePlay({
        id: 1,
        gameArr: [
            'a-jinkou',
            'd-jinkou',
            'huashengyou',
            'd-guochan',
            'a-guochan'
        ],
        callBack0: function () {
            $('.pop1_p0 a').bind('click', function(){
                $('.pop1_p0').remove();
                $('.pop_p2').show().bind('click', function(){
                    pop.hide();
                    newGame2.start();
            });

            })
        },
        callBack1: function () {
            $('.pop1_p1 a').bind('click', function(){
                reload();
            })
        }
    });
    var newGame2 = new GamePlay({
        id: 2,
        gameArr: [
            'ganrao1',
            'green',
            'fen',
            'ganrao2',
            'ganrao3'
        ],
        callBack0: function () {
            $('.pop2_p0 a').bind('click', function(){
                $('.pop2_p0').remove();
                $('.pop_p3').show().bind('click', function(){
                    pop.hide();
                    newGame3.start();
                });
            })
        },
        callBack1: function () {
            $('.pop2_p1 a').bind('click', function(){
                reload();
            })
        }
    });
    var newGame3 = new GamePlay({
        id: 3, // 当前关
        gameArr: [
            'lvhe',
            'fenhe',
            'lvpi',
            'fenpi',
            'g3gr1',
            'g3gr2',
            'g3gr3'
        ],  // 下落元素
        callBack0: function () {
            $('.pop3_p0 a').bind('click', function(){
                $('.game-down').remove();
                $('.game-top').remove();
                $('.game-title').remove();
                pop.remove();

            })
        }, // 闯关成功回调
        callBack1: function () {
            $('.pop3_p1 a').bind('click', function(){
                reload();
            })
        } // 闯关失败回调
    });


    // 点击进入游戏页面
    var p1 = $('.pop_p1 a');


    p1.bind('click', function () {
        newGame1.start();
        $('.game-pop').hide();
    });



});
