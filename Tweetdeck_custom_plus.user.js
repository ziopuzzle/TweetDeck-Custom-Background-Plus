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
    /* ------------------------------ 前準備 ------------------------------ */
    //Javascriptの厳格モードを使用
    'use strict';
    //Javascriptでのcssグローバルスタイルの記述を可能にする関数です。
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    /* -------------------------- ここまで前準備 -------------------------- */


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
    var tweet_effect_time = 2.0; //エフェクトをかける時間(秒)
    var tweet_effect_color_st = 'rgba(50, 80, 108, 1.0)'; //開始エフェクト色
    var tweet_effect_color_en = 'rgba(0,0,0,0.3)';        //終了エフェクト色
    if(tweet_effect_flag){
        addGlobalStyle(
            '@keyframes tweet-enter {' +
            '      0% { background-color: '+tweet_effect_color_st+'; }' +
            '     25% { background-color: '+tweet_effect_color_st+'; }' +
            '     50% { background-color: '+tweet_effect_color_en+'; }' +
            '     75% { background-color: '+tweet_effect_color_st+'; }' +
            '    100% { background-color: '+tweet_effect_color_en+'; }' +
            '}'+
            '.js-chirp-container > article {' +
            '    animation-duration: '+tweet_effect_time+'s;' +
            '    animation-name: tweet-enter;' +
            '}'
        );
    }

    //テキスト色変更
    var change_text_color_flag = true; //使用するかどうか(true/false)
    var change_text_color_1 = 'rgba(255,200,80,1)'; // @user_id , #ハッシュタグ
    if(change_text_color_flag){
        addGlobalStyle(
            //@user_id,#ハッシュタグ
            '.column .link-complex,' +
            '.column .hash,' +
            '.column span.link-complex-target {' +
            '    color: '+change_text_color_1+';' +
            '    text-shadow: 2px 2px 1px #000000;' +
            '}' +
            //ユーザーネーム
            '.column .account-link {' +
            '    color:rgba(128,255,255,1);' +
            '}'
        );
    }

    //カラム透過
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
        '}' +
        //オプション
        '.column-options,' +
        '.js-search-filter {' +
        '    background: rgba(0,0,0,0);' +
        '}' +
        '.js-accordion-item {' +
        '    background: rgba(0,0,0,0.3);' +
        '}' +
        '.js-accordion-toggle-view {' +
        '    background: rgba(0,0,0,0.7);' +
        '}' +
        '.accordion-header {' + //body
        '    background: rgba(0,0,0,0.7);' +
        '}' +
        '.js-accordion-panel {' + //折りたたみメニュー - body
        '    background: rgba(0,0,0,0.7);' +
        '}' +
        '.btn-options-tray-space {' + //折りたたみメニュー - Edit collection
        '    background: rgba(0,0,0,0.7);' +
        '}' +
        '.is-active {' + //折りたたみメニュー - OPEN時 (Stylebot専用)
        '    background: rgba(0,0,0,0.3);' +
        '}' +
        '.accordion-divider-t {' + //折りたたみメニュー - フッター (Stylebot専用)
        '    background: rgba(0,0,0,0.7);' +
        '}' +
        '.is-options-open .column-settings-link {' +   //折りたたみメニュー - オプションボタン
        '    background-color: rgba(  0,  0,  0,0);' + //ボタン背景
        '    color:            rgba(136,187,221,1);' + //ボタン押された時のアイコンの色
        '    border-color:     rgba( 34, 36, 38,1);' + //ボタン押された時の枠の色
        '    border-bottom: none;' +
        '}'
    );




})();

