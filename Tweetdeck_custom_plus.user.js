// ==UserScript==
// @name         Tweetdeck 背景透過+
// @namespace    https://twitter.com/puzzle_koa/
// @version      0.200
// @description  Tweetdeckに背景をプラスしてより使いやすく
// @author       puzzle
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// @updateURL    https://github.com/ziopuzzle/Tweetdeck-Customize/raw/master/Tweetdeck_custom_plus.user.js
// ==/UserScript==

//このスクリプトはGoogleChromeでのみ動作します。


(function() {
    //Javascriptの厳格モードを使用
    'use strict';

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
        '    background-image: url(\"'+background_url+'\");' +
        '    background-repeat: repeat;' +
        '    background-attachment: fixed;' +
        '    background-size: cover;' +
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
            '    width: calc('+column_width+'px);' +
            '}'
        );
    }

    //ツイート更新時にエフェクトを付与
    var tweet_effect_flag = true;
    var tweet_effect_time = 2.0; //エフェクトをかける時間
    if(tweet_effect_flag){
        addGlobalStyle(
            '@keyframes tweet-enter {' +
            '      0% { background-color: rgba(50, 80, 108, 1.0); }' +
            '     25% { background-color: rgba(50, 80, 108, 1.0); }' +
            '     50% { background-color: rgba( 0,  0,   0, 0.3); }' +
            '     75% { background-color: rgba(50, 80, 108, 1.0); }' +
            '    100% { background-color: rgba( 0,  0,   0, 0.3); }' +
            '}'+
            '.js-chirp-container > article {' +
            '    animation-duration: '+tweet_effect_time+'s;' +
            '    animation-name: tweet-enter;' +
            '}'
        );
    }

    addGlobalStyle(
        //カラム全体A
        '.will-animate {' +
        '    background: rgba(0,0,0,0.3);' +
        '}' +
        //カラム全体B(弄る必要無し)
        '.column-holder {' +
        '    background: rgba(0,0,0,0.5);' +
        '}'+
        //ツイート全体
        '.js-stream-item {' +
        '    background: rgba(0,0,0,0.3);' +
        '}'+
        //引用ツイート
        '.js-quote-detail {' +
        '    background: rgba(0,0,0,0.5);' +
        '}'
    );

})();

