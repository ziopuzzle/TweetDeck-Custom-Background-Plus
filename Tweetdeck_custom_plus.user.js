// ==UserScript==
// @name         TweetDeck 背景透過+
// @author       puzzle (or ziopuzzle)
// @namespace    https://twitter.com/puzzle_koa/
// @version      0.31
// @description  Tweetdeckに背景を設定します。Chrome(Chromium系)のみ使用可能。
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

(function($) {
    'use strict'; //厳格モードを使用(弄らないでください)

    /* ------------------ class宣言 - 弄らないでください ------------------ */
    class theme {
        constructor(){ this.bgMain = '#10171E'; this.bgDrawer = '#3D5466'; this.colBorder = '#14171A'; this.colDockerIcon = '#AAB8C2'; this.colDockerBackground = '#1C2938'; this.colColumn = '#15202B'; this.colColumnHeader = '#15202B'; this.colColumnHeaderIcon = 'AAB8C2'; this.colColumnHeaderText = '#FFFFFF'; this.colColumnHeaderSubText = '#8899A6'; this.colName = '#FFFFFF'; this.colID = '#8899A6'; this.colTweet = '#FFFFFF'; this.colQuotedTweet = '#8899A6'; this.colReply = '#1DA1F2'; this.colHashtag = '#1DA1F2'; this.colURL = '#1DA1F2'; this.colIconAct = '#8899A6'; this.colMenuBackground = '#000000FF' }
        setBG(bgMain, bgDrawer){ this.bgMain = bgMain; this.bgDrawer = bgDrawer; }
        setColorBorder(colBorder){ this.colBorder = colBorder; }
        setColorActionIcon(colIconAct){ this.colIconAct = colIconAct; }
        setColorMenu(colMenuBackground){ this.colMenuBackground = colMenuBackground; }
        setColorDocker(colDockerIcon, colDockerBackground){ this.colDockerIcon = colDockerIcon; this.colDockerBackground = colDockerBackground; }
        setColorColumn(colColumn, colColumnHeader, colColumnHeaderIcon, colColumnHeaderText, colColumnHeaderSubText){ this.colColumn = colColumn; this.colColumnHeader = colColumnHeader; this.colColumnHeaderIcon = colColumnHeaderIcon; this.colColumnHeaderText = colColumnHeaderText; this.colColumnHeaderSubText = colColumnHeaderSubText; }
        setColorTweet(colName, colID, colTweet, colQuotedTweet, colReply, colHashtag, colURL){ this.colName = colName; this.colID = colID; this.colTweet = colTweet; this.colQuotedTweet = colQuotedTweet; this.colReply = colReply; this.colHashtag = colHashtag; this.colURL = colURL; }
    }
    /* ------------------------ ここまでclass宣言 ------------------------- */

    /* ------------------------------- 設定 ------------------------------- */
    //setBG('Main-BG', 'Drawer-BG');
    //setColorBorder('Border');
    //setColorActionIcon('ActionIcon');
    //setColorMenu('Menu');
    //setColorDocker('Icon', 'Background');
    //setColorColumn('Column', 'Header', 'Header Icon', 'Header Text', 'Header Sub-Text');
    //setColorTweet('Name', '@ID' 'Tweet', 'Quote-tweet', 'Reply-ID', 'Hashtag', 'URL');
    var themeMiku = new theme();
    //URLはhtppsのもののみ有効
    themeMiku.setBG('https://w.wallhaven.cc/full/01/wallhaven-015zv1.jpg', 'https://w.wallhaven.cc/full/ne/wallhaven-ne96gk.png');
    themeMiku.setColorBorder('#403080');
    themeMiku.setColorActionIcon('orange');
    themeMiku.setColorMenu('rgba(64, 48, 128, .8)');
    themeMiku.setColorDocker('#AAB8C2', '#102040');
    themeMiku.setColorColumn('rgba(0,0,0,.5)', 'rgba(128,0,0,.3)', '#AAB8C2', '#FFFFFF', '#8899A6');
    themeMiku.setColorTweet('#FFFFFF', '#8899A6', '#FFFFFF', '#8899A6', '#1DA1F2', '#1DA1F2', '#1DA1F2');

    //実行
    executeCustom(themeMiku);                         //executeCustom(テーマ);
    executeTweetFlash('rgba(100, 80, 80, 0.5)', 1.0); //executeTweetFlash('色<#XXXXXXとかrgba(Red,Green,Blue,Alpha)> , 時間<秒>');
    /* --------------------------- ここまで設定 --------------------------- */

    /* ------------------------------ コード ------------------------------ */
    //新規ツイートにエフェクトをつけます
    function executeTweetFlash(color, time){
        addGlobalStyle(
            '@keyframes tweet-enter {' +
            '      0% { background-color: ' + color + '; }' +
            '     25% { background-color: ' + color + '; }' +
            '     50% { background-color: rgba(0,0,0,0); }' +
            '     75% { background-color: ' + color + '; }' +
            '    100% { background-color: rgba(0,0,0,0); }}'+
            '.column .js-chirp-container > article { animation-duration: ' + time + 's; animation-name: tweet-enter; }'
        );
    }
    //このJSメイン要素の背景設定
    function executeCustom(theme){
        //背景設定
        if(validURL(theme.bgMain)){addGlobalStyle('.app-content { background-image: url("' + theme.bgMain + '") !important; }');}
        else if(theme.bgMain !== ''){addGlobalStyle('.app-content { background-color: ' + theme.bgMain + ' !important; }');}
        if(validURL(theme.bgDrawer)){addGlobalStyle('.drawer { background-image: url("' + theme.bgDrawer + '") !important; }');}
        else if(theme.bgMain !== ''){addGlobalStyle('.drawer { background-color: ' + theme.bgDrawer + ' !important; }');}
        addGlobalStyle(
            '.app-content { background-size: cover; }' +
            '.drawer { background-size: cover; background-position: center center; }'
        );
        //背景を見せる為に透過処理
        addGlobalStyle(
            '.app-columns-container, .column, .stream-item, .scroll-conversation,' + //カラム
            '.facet-type, .button-tray, select, input,' +                            //カラムヘッダー
            '.tweet-detail-wrapper, [rel=reply], .inline-reply,' +                   //カラムツイート詳細
            '.compose, .old-composer-footer, .flex, [dir=ltr] *' +                   //ドロワー
            '    { background-color: #00000000 !important; }'+
            //旧ドロワー
            '.r-1oszu61.r-1phboty.r-1yadl64.r-deolkf.r-6koalj.r-13awgt0.r-eqz5dr.r-crgep1.r-ifefl9.r-bcqeeo.r-t60dpp.r-bnwqim.r-417010, .btn { background-color: rgba(0, 0, 0, .8) !important; }' +
            '.r-eqz5dr { border-radius: 18px; }' +
            '.compose-reply-tweet { background-color: rgba(0, 0, 0, .6) !important; }' +
            //新ドロワー絵文字ウィンドウ
            '[dir=ltr] [role=button], .r-p1n3y5, .r-eqz5dr.r-1bylmt5 { background-color: rgba(0, 0, 0, .6) !important; }' +
            //
            '.quoted-tweet, [rel=reply] { background-color: rgba(0, 0, 0, .3) !important; }'
        );
        //透過処理に伴って発生する問題点の解決
        addGlobalStyle(
            '.js-team-invitations-container, .js-contributor-manager-container { display: none !important; }' +
            '.dark option { background-color: #10171e !important; }'
        );
        //BetterTweeetdeckのカラム折りたたみ機能使用時にborderが二重になる部分があるので修正
        addGlobalStyle('.btd-column-collapsed .column-header { border: solid 0px !important }');
        //カラムの縁を丸めて余白を取る
        addGlobalStyle('.column { border-radius: 15px !important; height: calc(100% - 12px) !important; top: 6px !important; }');
        //ナビアイコンを詰めて表示
        addGlobalStyle('.column-nav-item { height: 35px !important; }');
        //ボーダーあった方が良い箇所にボーダーを付ける
        addGlobalStyle(
            '[dir=ltr] [role=button], .r-aaos50, .column { border: solid 1px !important; }' +
            '.new-composer-bottom-button, .r-18qmn74 { border: solid 1px !important; background-color: rgba(0, 0, 0, .5) !important; border-radius: 30px !important; }' +
            '.compose-reply-tweet { border: solid 1px !important; }'
        );
        //色設定
        addGlobalStyle(
            '.column-nav-link { color: ' + theme.colDockerIcon + ' !important; }' +                                                           //ドック アイコン
            '.app-header, .column-nav-item, .app-navigator, .app-title { background-color: ' + theme.colDockerBackground + ' !important; }' + //ドック 背景
            '.column-panel { background-color: ' + theme.colColumn + ' !important; }' +                          //カラム部 透過度
            '.column-header, .column-options { background-color: ' + theme.colColumnHeader + ' !important; }' +  //カラムヘッダー部 透過度
            '[role=listbox], .dropdown-menu { background-color: ' + theme.colMenuBackground + ' !important; }' + //ツイートに対するメニュー
            '.is-selected { background-color: rgba(0, 0, 0, .5) !important; }' +                                 //メニュー項目フォーカス時
            '.column-type-icon { color: ' + theme.colColumnHeaderIcon + ' !important; }' +
            '.column-heading   { color: ' + theme.colColumnHeaderText + ' !important; }' +
            '.attribution      { color: ' + theme.colColumnHeaderSubText + ' !important; }' +
            '.account-inline .fullname { color: ' + theme.colName + ' !important; }' +
            '.account-inline .username { color: ' + theme.colID + ' !important; }' +
            '.tweet-text           { color: ' + theme.colTweet + ' !important; }' +
            '.js-quoted-tweet-text { color: ' + theme.colQuotedTweet + ' !important; }' +
            '[data-recipient-ids]  { color: ' + theme.colReply + ' !important; }' +
            '[rel=hashtag]         { color: ' + theme.colHashtag + ' !important; }' +
            '[data-full-url]       { color: ' + theme.colURL + ' !important; }' +
            '.tweet-action:not(:focus):not(:hover):not(:active), .tweet-detail-action-item :not(.is-selected) .icon:not(:focus):not(:hover):not(:active) { color: ' + theme.colIconAct + ' !important; }'
        );
        //ボーダー色統一
        addGlobalStyle(
            '.app-content *:not(span):not(.replyto-caret), ::-webkit-scrollbar-track,' +
            '[dir=ltr] [role=button], .r-aaos50, .r-18qmn74' +
            '    { border-color: ' + theme.colBorder + ' !important; }'
        );
    }
    /* -------------------------- ここまでコード -------------------------- */

    /* --------------------------- ここから関数 --------------------------- */
    //Javascriptでcssグローバルスタイルの記述を可能にする関数です。
    function addGlobalStyle(css) {var head, style;head=document.getElementsByTagName('head')[0];if(!head){return;}style=document.createElement('style');style.type='text/css';style.innerHTML=css;head.appendChild(style);}
    //型の判別を行う関数です。(type = String,Number,Boolean,Date,Error,Array,Function,RegExp,Object)
    function is(type, obj) {var clas=Object.prototype.toString.call(obj).slice(8, -1);return obj !== undefined && obj !== null && clas === type;}
    //16進数をCSS用の書式に書き直してくれる関数
    function rgb(red,green,blue) {return red * Math.pow(256,2) + green * Math.pow(256,1) + blue * Math.pow(256,0);}
    function rgba(red,green,blue,alpha) {return (alpha * Math.pow(256,3)*255)|0 + red * Math.pow(256,2) + green * Math.pow(256,1) + blue * Math.pow(256,0);}
    //URLかどうかチェックする関数
    function validURL(str){
        var pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');
        if(!pattern.test(str)){return false;}else{return true;}
    }
    /* --------------------------- ここまで関数 --------------------------- */

})(jQuery.noConflict(true));
