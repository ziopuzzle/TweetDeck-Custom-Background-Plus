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
    //var tweet_effect_color_en = 'rgba(0,0,0,0.3)';        //終了エフェクト色
    if(tweet_effect_flag){
        addGlobalStyle(
            '@keyframes tweet-enter {' +
            '      0% { background-color: '+tweet_effect_color_st+'; }' +
            '     25% { background-color: '+tweet_effect_color_st+'; }' +
            '     50% { background-color: rgba(0,0,0,0); }' +
            '     75% { background-color: '+tweet_effect_color_st+'; }' +
            '    100% { background-color: rgba(0,0,0,0); }' +
            '}'+
            '.js-chirp-container > article {' +
            '    animation-duration: '+tweet_effect_time+'s;' +
            '    animation-name: tweet-enter;' +
            '}'
        );
    }


    //色変更
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
    var change_icon_color_flag = true; //使用するかどうか(true/false)
    var change_icon_color_1 = 'rgba(225,232,237,1)'; // 
    if(change_icon_color_flag){
        addGlobalStyle(
            '.column-type-icon {' +
            '    color: '+change_icon_color_1+';' +
            '}'
        );
    }


    //背景設定
    var background_url = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-460963.jpg"; //背景画像URL
    addGlobalStyle(
        '.app-columns-container {' +
        '    background-image: url(\"'+background_url+'\");' +
        '    background-repeat: repeat;' +
        '    background-attachment: fixed;' +
        '    background-size: cover;' +
        '}'
    );
    //カラム透過
    var column_header_color = 'rgba(0,0,0,0.6)';
    var column_body_color = 'rgba(0,0,0,0.4)';
    var column_quote_color = 'rgba(0,0,0,0.3)';
    addGlobalStyle(
        //カラム全体
        '.will-animate {' +
        '    background-color: rgba(0,0,0,0.0);' +
        '}' +
        //カラム - body(TL部分,特殊)
        '.stream-item {' +
        '    background-color: rgba(0,0,0,0);' +
        '}' +

        //カラム - ヘッダー
        '.btd__no_bg_modal .column-header {' +
        '    background-color: '+column_header_color+';' +
        '}' +
        //カラム - オプション - 全体
        '.column-options {' +
        '    background-color: '+column_header_color+';' +
        '}' +
        //カラム - オプション - アイコン(開いてる時)
        '.is-options-open .column-settings-link {' +
        '    background-color: rgba(0,0,0,0);' +
        '}' +
        //カラム - オプション - アクティブオプション
        '.accordion .is-active {' +
        '    background-color: rgba(0,0,0,0);' +
        '}' +
        //カラム - オプション - フッター
        '.column-options .button-tray {' +
        '    background-color: rgba(0,0,0,0);' +
        '}' +

        //TL(カラムbody)
        '.column-scroller {' +
        '    background-color: '+column_body_color+';' +
        '}' +
        //引用ツイート(.column-scrollerに加算)
        '.quoted-tweet {' +
        '    background-color: '+column_quote_color+';' +
        '}' +
        //ツイート詳細 - 選択したツイートのみ(.column-scrollerに加算)
        '.tweet-detail-wrapper {' +
        '    background-color: rgba(0,0,0,0);' +
        '}' +
        //リプ欄開く前(.column-scrollerに加算)
        '.detail-view-inline {' +
        '    background-color: rgba(0,0,0,0);' +
        '}' +
        //リプ欄開いた後(.column-scrollerに加算)
        '.inline-reply {' +
        '    background-color: rgba(0,0,0,0.2);' +
        '}' +
        //リプ欄開いた後(.column-scrollerに加算)
        '.reply-triangle {' +
        '    color: rgba(0,0,0,0.2);' +
        '}' +
        //TLアクションアイコン(.column-scrollerに加算)
        '.chirp-container .stream-item:not(:hover):not(.is-selected-tweet) .tweet-action,' +
        '.chirp-container .stream-item:not(:hover):not(.is-selected-tweet) .tweet-detail-action,' +
        '.chirp-container .stream-item:not(:hover):not(.is-selected-tweet) .dm-action {' +
        '    color: rgba(0,0,0,0.5);' +
        '}' +
        //TLアクションアイコン - エリア進入時(.column-scrollerに加算)
        '.tweet-action,' +
        '.tweet-detail-action,' +
        '.dm-action {' +
        '    color: rgba(0,0,0,0.8);' +
        '}'

    );




})();

