// ==UserScript==
// @name         Tweetdeck 背景透過+
// @namespace    https://twitter.com/puzzle_koa/
// @version      0.210
// @description  Tweetdeckに背景をプラスしてより使い心地良く
// @author       puzzle
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// @updateURL    https://github.com/ziopuzzle/Tweetdeck-Customize/raw/master/Tweetdeck_custom_plus.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

//このスクリプトはGoogleChromeでのみ動作します。


(function($) {
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
    //型の判別を行う関数です。
    //type   : String,Number,Boolean,Date,Error,Array,Function,RegExp,Object
    //obj    : 判定を行いたいもの(文字列や数値等)
    //return : typeと型が合致していればtrue、違うならばfalseを返す
    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    //16進数をCSS用の書式に書き直してくれる関数
    function toCSSColor(color) {
        if(is('String',color)){ return color; }
        if(is('Number',color)){
            var col,temp,result = 'rgba(';
            var count = 3;
            for(var i=count-1;i>=0;i--){
                temp = (( color/Math.pow(256,i) ) % 256) | 0;
                result += temp;
                //if(i!==0){result += ',';}
                result += ',';
            }
            result += '1)';
            return result;
        }
    }
    /* -------------------------- ここまで前準備 -------------------------- */

    //alert(toCSSColor(0x32506c));

    /* ------------------------------- 設定 ------------------------------- */
    //アイコンを丸くする
    var avater_round_flag = false; //使用するかどうか(true/false)
    var avater_round = 5;          //(5:通常 15:丸い四角 50:丸)
    //カラム幅を固定
    var column_width_lockflag = false; //使用するかどうか(true/false)
    var column_width = 320;            //幅(単位px)
    //app-headerに表示するアイコンの数を増やす(ONでナビアイコンが埋まらない時[Add column]の表示位置がおかしくなるみたいです)
    var app_navicon_plusflag = true; //使用するかどうか(true/false)
    //ツイート更新時にエフェクトを付与
    var tweet_effect_flag = true;      //使用するかどうか(true/false)
    var tweet_effect_time = 2.0;       //エフェクト時間(秒)
    var tweet_effect_color = 'rgba(50, 80, 108, 1.0)';//0x32506c; //'rgba(50, 80, 108, 1.0)'; //エフェクト色

    /* --------------------------- ここまで設定 --------------------------- */


    /* ------------------------------ コード ------------------------------ */


    //アイコンを丸くする
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
    if(column_width_lockflag){
        addGlobalStyle(
            '.column {' +
            '    width: calc('+column_width+'px) !important; ' +
            '}'
        );
    }

    //app-headerに表示するナビゲートアイコンの数を増やす
    if(app_navicon_plusflag){
        addGlobalStyle(
            '.column-nav-item {' +
            '    height: 30px;' +
            '}' +
            '.app-nav-link, .js-column-title {' +
            '    font-size: 15px;' +
            '}' +
            '.column-nav-link .attribution {' +
            '    font-size: 11px;' +
            '}' +
            '.btd-settings-btn:before {' +
            '    border-top: 1px solid #777;' +
            '}' +
            '.with-nav-border-t:before {' +
            '    padding-top: 5px;' +
            '    top: 0px;' +
            '    border-top: 1px solid #777;' +
            '}' +
            '.padding-t--4, .padding-ts {' +
            '    padding-top: 4px !important;' +
            '    padding-bottom: 4px !important;' +
            '}'
        );
    }

    //ツイート更新時にエフェクトを付与
    if(tweet_effect_flag){
        addGlobalStyle(
            '@keyframes tweet-enter {' +
            '      0% { background-color: '+tweet_effect_color+'; }' +
            '     25% { background-color: '+tweet_effect_color+'; }' +
            '     50% { background-color: rgba(0,0,0,0); }' +
            '     75% { background-color: '+tweet_effect_color+'; }' +
            '    100% { background-color: rgba(0,0,0,0); }' +
            '}'+
            '.column .js-chirp-container > article {' +
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
    var change_icon_color_1 = 'rgba(0,255,0,1)';//'rgba(225,232,237,1)'; // 
    var change_like_to_favr_1 = 'rgba(0,255,0,1)';//'rgba(225,232,237,1)'; // 
    if(change_icon_color_flag){
        addGlobalStyle(
            '.column-type-icon {' +
            '    color: '+change_icon_color_1+';' +
            '}'+
            //BetterTweetdeck用 Like→Favoriteにした時のアイコン色変更
            '.btd__stars .icon-favorite-toggle:hover ,' +
            '.btd__stars .is-favorite .icon-favorite-toggle {' +
            '    color: #FAB41E;' +
            '}' +
            //BetterTweetdeck用 appパネルのBetterTweetdeckアイコン
            ' .btd-settings-btn .icon {' +
            'color: rgba(255,0,0,1);' +
            '}'
        );
    }


    //背景設定(背景画像に設定出来るURLは「https://」から始まるものだけです)
    var records = [
        "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-353314.png",
        //"https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-460963.jpg",
        "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-259485.jpg",
    ] ;

    // 配列からランダムで値を選択
    var background_url = records[ Math.floor( Math.random() * records.length ) ] ; //背景画像URL
    var compose_bg_url = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-460963.jpg"; //ツイートバー
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
        '    border-bottom: 1px;' +
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
        '.column .quoted-tweet {' +
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
        '    background-color: rgba(0,0,0,0.0);' +
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
        '}' +

        '.compose-text-title,' +
        '.compose {' +
        '    color: rgba(0,0,0,1);' +
        '}' +
        /*
        '.account-selector-grid-mode {' +
        '    color: rgba(0,0,0,1);' +
        '    opacity: 0.7;' +
        '}' +
        */
        '.is-selected .account-selector-grid-mode {' +
        '    color: rgba(32,96,176,1);' +
        '}' +

        //左 - アカウントの並びを変えるやつ
        '.txt-r-white {' +
        '     color: rgba(0,0,0,1);' +
        '}' +
        '.is-selected .txt-r-white {' +
        '     color: rgba(32,96,176,1);' +
        '}' +
        '.account-selector-grid-mode {' +
        '      opacity: 1;' +
        '}' +

        //左 - 背景設定
        //'.antiscroll-inner {' +
        '.js-docked-compose {' +
        '    background-image: url(\"https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-106973.jpg\");' +
        '    background-size: cover;' +
        '}'

        //.tweet-action .icon-favorite, .tweet-detail-action .icon-favorite, .dm-action .icon-favorite, .tweet-action .icon-more, .tweet-detail-action .icon-more, .dm-action .icon-more
    );

    //$('body > div.js-app.application.is-condensed.hide-detail-view-inline > div.js-app-content.app-content.is-open > div:nth-child(1) > div > div > div > div.position-rel.compose-text-container').insertAfter('body > div.js-app.application.is-condensed.hide-detail-view-inline > div.js-app-content.app-content.is-open > div:nth-child(1) > div > div > div > div.js-compose-message-header.margin-b--9.compose-text-title > div');

    /* -------------------------- ここまでコード -------------------------- */

})(jQuery.noConflict(true));

