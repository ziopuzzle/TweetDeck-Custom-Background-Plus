// ==UserScript==
// @name         Tweetdeck 背景透過+
// @namespace    https://twitter.com/puzzle_koa/
// @version      0.200
// @description  Tweetdeckに背景をプラスしてより使いやすく
// @author       puzzle
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// @nocompat     Chrome
// @updateURL    https://github.com/ziopuzzle/Tweetdeck-Customize/raw/master/Tweetdeck_custom_plus.user.js
// ==/UserScript==

/*
https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
*/

(function() {
    'use strict';

    var i = 0;

    //cssのグローバルスタイルでの記述を可能にする関数です。
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    var background_url = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-460963.jpg"; //背景画像URL

    addGlobalStyle(
        '.app-columns-container {' +
        '    background-image: url(\"'+background_url+'\"); ' +
        '    background-repeat: repeat; ' +
	    '    background-attachment: fixed; ' +
	    '    background-size: cover; ' +
        '}'
    );


    //アイコンを丸くする
    var avater_round_flag = false; //使用するかどうか(true/false)
    var avater_round = 5; //(5:通常 15:丸い四角 50:丸)
    if(avater_round_flag){
        addGlobalStyle(
            '.avatar {' +
            '    border-radius:'+avater_round+'px;' +
            '}' +
            'a.compose-account,span.prf-img {' +
            '    background:none;' +
            '}'
        );
    }

    //カラム幅を固定
    var column_width_lockflag = false; //使用するかどうか(true/false)
    var column_width = 320; //サイズ(単位px)
    if(column_width_lockflag){
        addGlobalStyle(
            '.column {' +
            '    width: calc('+column_width+'px); ' +
            '}'
        );
    }

    addGlobalStyle(
        //カラム全体A
        '.will-animate {' +
        '    background: rgba(0,0,0,0.3);' +
        '}' +
        //カラム全体B
        '.column-holder {' +
        '    background: rgba(0,0,0,0.3);' +
        '}'
    );

})();

