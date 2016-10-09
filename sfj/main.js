define(function(require, exports, module) {
    'use strict';

    var mainwap = require('wap'),
        SW = document.documentElement.clientWidth,
        SH = document.documentElement.clientHeight,
        _startx = null, _starty = null, _endx = null, _endy = null;

    exports.start = function(event) {
        _endx = null;
        _endy = null;
        var e = event || window.event,
            target = e.currentTarget;
        _startx = e.touches[0].pageX;
        _starty = e.touches[0].pageY;
        return target;
    };

    exports.move = function(obj, event) {
        var e = event || window.event;
        e.preventDefault();
        _endx = e.targetTouches[0].pageX;
        _endy = e.targetTouches[0].pageY;
        changeObj(obj, false);
    };

    exports.end = function(obj) {
        changeObj(obj, true);
    };

    exports.m = 0;

    function changeObj(obj, istrue) {
        var changx = Math.abs(_endx - _startx);
        var changy = Math.abs(_endy - _starty);

        var next = obj.Pnext,
            prev = obj.Pprev,
            number = obj.Plen,
            bc = obj.Pcallback,
            index = Number(obj.Pindex) + 1,
            target = obj.Pobj;

        var iswrong = mainwap.st;

        if (_endy !== null && _endx !== null) {
            var direction = mainwap.touch.getDirection(_startx, _starty, _endx, _endy);
        }

        var upAndDownY = parseInt((SH - changy) / SH * 100);
        var upAndDownScrale = 1 - parseInt(changy / SH * 100) / 100;

        var lAndrY = parseInt((SW - changx) / SW * 100);
        var lAndrscrale = 1 - parseInt(changx / SW * 100) / 100;

        var msk = document.querySelector('.bg-mask');
        var $share = document.querySelector('.share');

        switch (direction) {
            case 1:
                if (index - 2 > -1 && iswrong) {

                    target.style.webkitTransformOrigin = '50% 100%';
                    target.style.transformOrigin = '50% 100%';

                    if (index < number) {
                        exports.trans(next, 1, 0, 100, 0);
                    }
                    exports.trans(prev, 1, 0, -upAndDownY, 0);
                    exports.trans(target, upAndDownScrale, 0, 0, 0);

                    if (istrue) {
                        setTimeout(function(){
                            exports.trans(prev, 1, 0, 0, 600);
                            exports.trans(target, 0, 0, 0, 600);
                        },30);
                        return exports.m = Number(obj.Pindex) - 1;
                    }

                }

                break;
            case 2:
                if (index < number && iswrong) {

                    target.style.webkitTransformOrigin = '50% 0';
                    target.style.transformOrigin = '50% 0';

                    if (index > 1) {
                        exports.trans(prev, 1, 0, 100, 0);
                    }

                    exports.trans(next, 1, 0, upAndDownY, 0);
                    exports.trans(target, upAndDownScrale, 0, 0, 0);
                    if (istrue) {
                        setTimeout(function(){
                            exports.trans(next, 1, 0, 0, 600);
                            exports.trans(target, 0, 0, 0, 600, bc);
                        },30);
                        return exports.m = Number(obj.Pindex) + 1;
                    }
                }
                if (index === 9 && istrue) {
                    msk.style.display = 'block';
                    msk.className = 'bg-mask maskShow';
                    document.querySelector('.shoes').style.display = 'none';
                    setTimeout(function(){
                        $share.style.display = 'block';
                    }, 800);
                }
                break;
            case 3:
                if (index < number && iswrong) {
                    target.style.webkitTransformOrigin = '0 50%';
                    target.style.transformOrigin = '0 50%';

                    if (index > 1) {
                        exports.trans(prev, 1, 0, 100, 0);
                    }
                    exports.trans(next, 1, lAndrY, 0, 0);
                    exports.trans(target, lAndrscrale, 0, 0, 0);

                    if (istrue) {
                        setTimeout(function(){
                            exports.trans(next, 1, 0, 0, 600);
                            exports.trans(target, 0, 0, 0, 600, bc);
                        }, 30);
                        return exports.m = Number(obj.Pindex) + 1;
                    }
                }
                if (index === 9 && istrue) {
                    msk.style.display = 'block';
                    msk.className = 'bg-mask maskShow';
                    document.querySelector('.shoes').style.display = 'none';
                    setTimeout(function(){
                        $share.style.display = 'block';
                    }, 800);
                }
                break;
            case 4:
                if (index - 2 > -1 && iswrong) {
                    target.style.webkitTransformOrigin = '100% 50%';
                    target.style.transformOrigin = '100% 50%';

                    if (index < number) {
                        exports.trans(next, 1, 0, 100, 0);
                    }
                    exports.trans(prev, 1, - lAndrY, 0, 0);
                    exports.trans(target, lAndrscrale, 0, 0, 0);

                    if (istrue) {
                        setTimeout(function(){
                            exports.trans(prev, 1, 0, 0, 600);
                            exports.trans(target, 0, 0, 0, 600);
                        },30);
                        return exports.m = Number(obj.Pindex) - 1;
                    }
                }
                break;
            default:
                return false;
        }
    }


    exports.trans = function(obj, scale, distanceX, distanceY, time, back) {
        obj.style.webkitTransform = 'translate3d(' + distanceX + '%, ' + distanceY + '%, 0) scale(' + scale + ')';
        obj.style.transform = 'translate3d(' + distanceX + '%, ' + distanceY + '%, 0) scale(' + scale + ')';
        obj.style.webkitTransitionDuration = time + 'ms';
        obj.style.transitionDuration = time + 'ms';

        setTimeout(back, time);
    }
});