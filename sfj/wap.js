define(function(require, exports, module) {
    'use strict';

    var wap = require('main'),
        d = document,
        qs = 'querySelector',
        $part = d.querySelectorAll('.part'),
        $part_len = $part.length;

    // 这里是loading相关执行事件
    var $load_bar = d[qs]('.load-bar'),
        $load_img = d[qs]('.load-img'),
        $loading = d[qs]('.loading'),
        $mask = d[qs]('.bg-mask'),
        $index_bg = d[qs]('.indexbg'),
        $index_bg1 = d[qs]('.indexbg1'),
        $logo = d[qs]('.logo'),
        $show_img = d[qs]('.show-img'),
        $index_font = d[qs]('.indexfont'),
        $load_btn = d[qs]('.load-btn');

    setTimeout(function(){
        $load_bar.style.display = 'none';
    }, 4000);

    $load_btn.addEventListener('click', function(){
        $load_btn.className += ' load-btn-hide';
        $logo.style.display = 'none';

        setTimeout(function(){
            $show_img.style.display = 'none';
            $load_img.style.display = 'block';


            setTimeout(function(){
                $load_img.className += ' changeleft';

            }, 300);
            $loading.style.background = 'none';
            $mask.className += ' changeMask';

            $index_bg.style.display = 'block';
            $index_bg1.style.display = 'block';
            $index_font.style.display = 'block';

            setTimeout(function(){
                $loading.innerHTML = '';
                $loading.style.display = 'none';
                $mask.style.display = 'none';
                $index_bg.className += ' hide';
                $index_bg1.className += ' hide';
                d[qs]('.shoes').style.display = 'block';
                return exports.st = true;
            }, 4000);
        }, 600);

        if (isiOS) {
            audio.play();
        }

    }, false);

    // 这里是分享页执行事件
    var $share = d[qs]('.share');
    var $share_a = $share.getElementsByTagName('a')[0];
    var $share_pop = d[qs]('.share-pop');
    $share_a.addEventListener('click', function(){
        $share_pop.style.display = 'block';
        $share.style.zIndex = '4';
    }, false);

    $share_pop.addEventListener('click', function(){
        $share_pop.style.display = 'none';
        $share.style.zIndex = '2';
        music_i.className = '';
    }, false);



    // 这里是首页相关执行事件



    // 触屏相关数据
    exports.touch = {
        //获取角度
        returnAngle: function(x, y){
            return Math.atan2(y, x)*180 / Math.PI;
        },

        //获取滑动方向
        getDirection: function(startx, starty, endx, endy){
            var targetx = endx - startx,//移动距离的x坐标
                targety = endy - starty,//移动距离的y坐标
                result = 0,
                rangle = exports.touch.returnAngle(targetx, targety);   //获取手势滑动的角度
            if (Math.abs(targetx) < 2 && Math.abs(targety) < 2) {
                return result;
            }
            if (rangle < 45 && rangle >= -45) {
                result = 4;//右
            } else if (rangle >= 45 && rangle < 135) {
                result = 1;//下
            } else if ((rangle >=135 && rangle <= 180) || (rangle >= -180 && rangle < -135)) {
                result = 3;//左
            } else if (rangle >= -135 && rangle < -45) {
                result = 2;//上
            }
            return result;
        }
    };

    // touch 相关事件封装

    var oScroll = function() {};
    oScroll.prototype = {
        show: function(obj, Pobject) {
            obj.addEventListener('touchstart', wap.start, false);
            obj.addEventListener('touchmove', function(){
                wap.move(Pobject);
            }, false);
            obj.addEventListener('touchend', function(){
                wap.end(Pobject);
                return m = wap.m;
            }, false);
        }
    };

    var scroll = new oScroll();  // 继承oScroll

    // 滑屏结束后的回调函数
    var hadlerObj = {
        callback0: function() {
            //exports.st = false;  // 禁止滑屏
            // 这里执行滑屏后的动画
        },
        callback1: function() {
            //console.log('这是2屏的回调函数');
        },
        callback2: function() {
            //console.log('这是3屏的回调函数');
        },
        callback3: function() {
            //console.log('这是4屏的回调函数');
        }
    };
    var hadler = [];    // 定义一个数组
    for (var x in hadlerObj) {
        hadler.push(hadlerObj[x]);
    }               // 遍历该数组

    var str = 0;
    var arr = [
        '<div class="part2"></div>',
        '<div class="part3"></div>',
        '<div class="part4"></div><div class="part4font"></div>',
        '<div class="part5"></div>',
        '<div class="part6"></div>',
        '<div class="part7"></div><div class="part7font"></div>',
        '<div class="part8"></div><div class="part8font"></div><div class="part8font1"></div>'
    ];
    function append(){
        str ++ ;
        if (str < 8) {
            var section = document.createElement('section');
            section.className = 'part';
            section.innerHTML = arr[0];

            d[qs]('.waper').appendChild(section);
            arr.shift();

            $part = d.querySelectorAll('.part');
            $part_len = $part.length;
            mc();
        }
    }
    function mc(){

        for (var part_i = 0; part_i < $part_len; part_i ++) {

            scroll.show($part[part_i], {
                Pindex: part_i,
                Pobj: $part[part_i],
                Pnext: $part[part_i + 1],
                Pprev: $part[part_i - 1],
                Pcallback: append,   // hadler[part_i] 分别回调
                Plen: $part_len
            });
        }
    }
    mc();

    var m = 0;
    var msk = document.querySelector('.bg-mask');

    d[qs]('.shoes').addEventListener('click', function(){

        $part[m].style.webkitTransformOrigin = '0 50%';
        $part[m].style.transformOrigin = '0 50%';
        if (m < 8) {
            m ++;
            wap.trans($part[m - 1], 1, 0, 0, 0);
            wap.trans($part[m], 1, 100, 0, 0);
            setTimeout(function(){
                wap.trans($part[m - 1], 0, 0, 0, 600);
                wap.trans($part[m], 1, 0, 0, 600);
            }, 30);
            append();
        } else {
            msk.style.display = 'block';
            msk.className = 'bg-mask maskShow';
            document.querySelector('.shoes').style.display = 'none';
            setTimeout(function(){
                $share.style.display = 'block';
            }, 800);
        }

    }, false);

    // 音乐事件
    var u = navigator.userAgent,
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        audio = d.getElementById("audio"),
        music = d[qs](".music"),
        music_a = music.getElementsByTagName("a")[0],
        music_i = music.getElementsByTagName("i")[0];

    music.onclick = function(){
        event.stopPropagation();
        if (audio.paused) {
            music_a.className = "musicAn";
            audio.play();
        } else {
            music_a.className = "closeMusic";
            audio.pause();
        }
    };


});