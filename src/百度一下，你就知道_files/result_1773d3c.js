define("superman-san/app/hot-news/result_1773d3c",["san","tslib","@searchfe/inject-js"],function(n,o,r){return s={0:function(t,e){t.exports=n},1:function(t,e){t.exports=o},107:function(t,e){t.exports=' <div class="hot-news-wrapper"> <div class="s-rank-title s-opacity-border1-bottom"> <a href="https://top.baidu.com/board?platform=pc&sa=pcindex_entry" target="_blank" class="hot-title"> <div class="c-font-medium c-color-t title-text" aria-label="百度热搜"> <i class="c-icon hotsearch-title">&#xe687;</i> <i class="c-icon arrow">&#xe613;</i> </div> </a> <a s-if="isShowRefreshBtn" class="c-font-normal c-color-gray2 hot-refresh" on-click="refresh"> <i class="c-icon refresh-icon{{isRotate ? \' rotate\' : \'\'}}">&#xe619;</i> <span class="hot-refresh-text">换一换</span> </a> </div> <ul class="s-news-rank-content"> <li s-for="item in currList" class="news-meta-item clearfix"> <a id="title-content" class="title-content c-link c-font-medium" href="{{ item.linkurl }}" target="_blank"> <div s-if="item.isAd" class="title-content-noindex"></div> <i s-else-if="item.isTop" class="c-icon title-content-top-icon c-color-red c-gap-right-small">&#xe62e;</i> <span s-else class="title-content-index c-index-single c-index-single-hot{{item.index}}"> {{ item.index }} </span> <img s-if="item.pre_tag" class="title-content-icon" src="{{item.pre_tag}}"> <span class="title-content-title"> {{ item.card_title }} </span> <span class="title-content-mark c-text {{ hotTagsClassMap[item.ext.hotTags] }}"> {{ hotTagsTextMap[item.ext.hotTags] }} </span> </a> </li> </ul> </div> '},108:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=n(1),i=n(0),n=n(5),n=(o=i.Component,(0,r.__extends)(s,o),s.prototype.initData=function(){return{list:[],isRotate:!1,isShowRefreshBtn:!1,currPage:0,hotTagsTextMap:["","新","商","热","沸","爆","荐"],hotTagsClassMap:["","c-text-new","c-text-business","c-text-hot","c-text-fei","c-text-bao","c-text-rec"]}},s.prototype.refresh=function(){var t=this;this.data.set("currPage",this.data.get("currPage")+1),this.data.set("isRotate",!0);var e=setTimeout(function(){t.data.set("isRotate",!1),clearTimeout(e)},200)},s.computed={currList:function(){var t=this.data.get("list"),e=Number(this.data.get("currPage")||0)%3;return t.slice(10*e,10*e+10)}},(0,r.__decorate)([n.injectable],s));function s(t){t=o.call(this,t)||this;return t.trimWhitespace="all",t}e["default"]=n},2:function(t,e,n){e=function(){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function i(t){return typeof t}:function i(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s=n(0).defineComponent;function a(t){if(null===t||t===undefined)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var o=arguments[n];if(null!==o&&o!==undefined)for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e}t.exports=function(t,e,n){for(var o=function(t){var e=[t];"function"==typeof t&&(e.push(t.prototype),t.prototype.constructor&&e.push(t.prototype.constructor.prototype));return e}(t),r=0;r<o.length;r++)e&&("string"==typeof e?o[r].template=e:e instanceof Array?o[r].aPack=e:o[r].aNode=e),n.length&&function(t,e){for(var n={},o=0;o<e.length;o++)a(n,e[o]);var r=t.initData;t.initData=r?function(){return a({},r.call(this),{$style:n})}:function(){return{$style:n}}}(o[r],n);return"object"===i(t)?s(t):t}}.apply(e,[]);e===undefined||(t.exports=e)},242:function(t,e,n){t.exports=n(243)},243:function(t,e,n){var o=n(2);n(244);var r=n(107),i=n(108)["default"];t.exports=n(108),t.exports["default"]=o(i,r,[])},244:function(t,e,n){"use strict";n.r(e)},5:function(t,e){t.exports=r}},a={},i.m=s,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="https://mss0.bdstatic.com/se/cache",i(i.s=242);function i(t){if(a[t])return a[t].exports;var e=a[t]={i:t,l:!1,exports:{}};return s[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}var s,a});