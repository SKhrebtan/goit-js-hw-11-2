var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},t={},n=o.parcelRequired7c6;null==n&&((n=function(o){if(o in e)return e[o].exports;if(o in t){var n=t[o];delete t[o];var l={id:o,exports:{}};return e[o]=l,n.call(l.exports,l,l.exports),l.exports}var r=new Error("Cannot find module '"+o+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(o,e){t[o]=e},o.parcelRequired7c6=n);var l=n("krGWQ");l.refs.myButton=document.getElementById("myBtn"),l.refs.btnToBottom=document.querySelector(".btntobottom"),l.refs.myButton.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})})),l.refs.btnToBottom.addEventListener("click",(function(){window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})})),window.onscroll=function(){document.body.scrollTop>400||document.documentElement.scrollTop>400?l.refs.myButton.style.display="block":l.refs.myButton.style.display="none",(document.body.scrollTop>400||document.documentElement.scrollTop>400)&&document.documentElement.scrollHeight>3e3?l.refs.btnToBottom.style.display="none":l.refs.btnToBottom.style.display="block"};
//# sourceMappingURL=index.0aa05e53.js.map
