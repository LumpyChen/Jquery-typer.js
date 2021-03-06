"use strict";

/**
 * Created by Lumpychen on 16/3/4.
 *
 *  I just can't find a good typewriting Jquery Plugin,
 *  so I have to build one by myself.
 *  我找不到一个好用的打字效果的JQuery插件,所以我只好自己做一个了 —— Lumpy
 *
 */

(function ($) {

    //const function: set the blink of cursor
    var setBlink = function setBlink(cursorBlink) {
        var timer2 = setInterval(function () {
            if ($("span[typer='cursor']").css('visibility') != "hidden") {
                $("span[typer='cursor']").css('visibility', 'hidden');
            } else {
                $("span[typer='cursor']").css('visibility', 'visible');
            }
        }, cursorBlink);
        return timer2;
    };

    //const function: click to remove the cursor
    var clickRemove = function clickRemove(timer, callback) {

        $("span[typer='cursor']").css('cursor', 'pointer');
        $("span[typer='cursor']").click(function () {
            clearInterval(timer);
            $("span[typer='cursor']").remove();
        });

        //callback
        if (callback) {
            callback();
        }
    };

    $.fn.extend({

        qwerty: function qwerty(_ref, callback) {
            var typerString = _ref.typerString;
            var _ref$delay = _ref.delay;
            var delay = _ref$delay === undefined ? 100 : _ref$delay;
            var _ref$cursor = _ref.cursor;
            var cursor = _ref$cursor === undefined ? '|' : _ref$cursor;
            var _ref$cursorBlink = _ref.cursorBlink;
            var cursorBlink = _ref$cursorBlink === undefined ? undefined : _ref$cursorBlink;


            //set const
            var room = this;
            var $cursor = "<span typer=\"cursor\">&nbsp;" + cursor + "</span>";

            //function which describes typing by row
            function render_ele(index) {

                var typing_ele = $(room[index]);
                var initHTML = typing_ele.html();

                function render_char(ele, i) {

                    //get value of index by closure
                    $("span[typer='cursor']").remove();
                    ele.html(initHTML + typerString.substr(0, i) + $cursor);

                    if (typerString.length > i) {

                        //typewriting

                        room.timer1 = setTimeout(function () {
                            render_char(ele, i + 1);
                        }, delay);
                    } else {

                        //change row
                        if (index < typing_ele.length) {
                            ++index;
                            render_ele(index);
                        } else {

                            //when it ends.
                            clearTimeout(room.timer1);

                            //set timer of cursor's blink
                            if (cursorBlink) {
                                var timerBlink = setBlink(cursorBlink);
                                clickRemove(timerBlink, callback);
                            } else {
                                $("span[typer='cursor']").remove();
                                if (callback) {
                                    callback();
                                }
                            }
                        }
                    }
                }

                render_char(typing_ele, 0);
            }

            render_ele(0);
        },

        qwertyDel: function qwertyDel(_ref2, callback) {
            var _ref2$delay = _ref2.delay;
            var delay = _ref2$delay === undefined ? 100 : _ref2$delay;
            var _ref2$cursor = _ref2.cursor;
            var cursor = _ref2$cursor === undefined ? '|' : _ref2$cursor;
            var _ref2$cursorBlink = _ref2.cursorBlink;
            var cursorBlink = _ref2$cursorBlink === undefined ? undefined : _ref2$cursorBlink;


            var room = this;
            var $cursor = "<span typer=\"cursor\">&nbsp;" + cursor + "</span>";

            function delete_ele(index) {

                var typing_ele = $(room[index]);
                var initText = typing_ele.text();

                function delete_char(ele, i) {

                    //get value of index by closure

                    if ($("span[typer='cursor']")[0]) {
                        $("span[typer='cursor']").remove();
                    }

                    ele.html(initText.substr(0, i) + $cursor);
                    //console.log('ss')

                    if (0 < i) {

                        //typewriting

                        room.timer2 = setTimeout(function () {
                            delete_char(ele, i - 1);
                        }, delay);
                    } else {

                        //change row
                        if (index > 0) {
                            --index;
                            delete_ele(index);
                        } else {

                            //when it ends.
                            clearTimeout(room.timer2);

                            //set timer of cursor's blink
                            if (cursorBlink) {
                                var timerBlink = setBlink(cursorBlink);
                                clickRemove(timerBlink, callback);
                            } else {
                                $("span[typer='cursor']").remove();
                                if (callback) {
                                    callback();
                                }
                            }
                        }
                    }
                }

                delete_char(typing_ele, initText.length - 1);
            }

            delete_ele(room.size() - 1);
        }
    });
})(jQuery);
