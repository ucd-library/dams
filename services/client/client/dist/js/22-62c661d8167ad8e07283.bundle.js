"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[22],{4601:(e,t,i)=>{var o=i(5589),r=i(395);const n=o.iv`

.ss-main {
  position: relative;
  display: inline-block;
  user-select: none;
  color: #666;
  width: 100%;
}

.ss-main .ss-single-selected {
  display: flex;
  cursor: pointer;
  width: 100%;
  height: 30px;
  padding: 6px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: #fff;
  outline: 0;
  box-sizing: border-box;
  transition: background-color 0.2s;
}

.ss-main .ss-single-selected.ss-disabled {
  background-color: #dcdee2;
  cursor: not-allowed;
}

.ss-main .ss-single-selected.ss-open-above {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.ss-main .ss-single-selected.ss-open-below {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.ss-main .ss-single-selected .placeholder {
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  width: calc(100% - 30px);
  line-height: 1em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ss-main .ss-single-selected .placeholder * {
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
}

.ss-main .ss-single-selected .placeholder .ss-disabled {
  color: #dedede;
}

.ss-main .ss-single-selected .ss-deselect {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 1 auto;
  margin: 0 6px 0 6px;
  font-weight: bold;
}

.ss-main .ss-single-selected .ss-deselect.ss-hide {
  display: none;
}

.ss-main .ss-single-selected .ss-arrow {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 1 auto;
  margin: 0 6px 0 6px;
}

.ss-main .ss-single-selected .ss-arrow span {
  border: solid #666;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.2s, margin 0.2s;
}

.ss-main .ss-single-selected .ss-arrow span.arrow-up {
  transform: rotate(-135deg);
  margin: 3px 0 0 0;
}

.ss-main .ss-single-selected .ss-arrow span.arrow-down {
  transform: rotate(45deg);
  margin: -3px 0 0 0;
}

.ss-main .ss-multi-selected {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  min-height: 30px;
  width: 100%;
  padding: 0 0 0 3px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: #fff;
  outline: 0;
  box-sizing: border-box;
  transition: background-color 0.2s;
}

.ss-main .ss-multi-selected.ss-disabled {
  background-color: #dcdee2;
  cursor: not-allowed;
}

.ss-main .ss-multi-selected.ss-disabled .ss-values .ss-disabled {
  color: #666;
}

.ss-main .ss-multi-selected.ss-disabled .ss-values .ss-value .ss-value-delete {
  cursor: not-allowed;
}

.ss-main .ss-multi-selected.ss-open-above {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.ss-main .ss-multi-selected.ss-open-below {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.ss-main .ss-multi-selected .ss-values {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1 1 100%;
  width: calc(100% - 30px);
}

.ss-main .ss-multi-selected .ss-values .ss-disabled {
  display: flex;
  padding: 4px 5px;
  margin: 2px 0px;
  line-height: 1em;
  align-items: center;
  width: 100%;
  color: #dedede;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scaleOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
.ss-main .ss-multi-selected .ss-values .ss-value {
  display: flex;
  user-select: none;
  align-items: center;
  font-size: 12px;
  padding: 3px 5px;
  margin: 3px 5px 3px 0px;
  color: #fff;
  background-color: #5897fb;
  border-radius: 4px;
  animation-name: scaleIn;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

.ss-main .ss-multi-selected .ss-values .ss-value.ss-out {
  animation-name: scaleOut;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
}

.ss-main .ss-multi-selected .ss-values .ss-value .ss-value-delete {
  margin: 0 0 0 5px;
  cursor: pointer;
}

.ss-main .ss-multi-selected .ss-add {
  display: flex;
  flex: 0 1 3px;
  margin: 9px 12px 0 5px;
}

.ss-main .ss-multi-selected .ss-add .ss-plus {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #666;
  position: relative;
  height: 10px;
  width: 2px;
  transition: transform 0.2s;
}

.ss-main .ss-multi-selected .ss-add .ss-plus:after {
  background: #666;
  content: "";
  position: absolute;
  height: 2px;
  width: 10px;
  left: -4px;
  top: 4px;
}

.ss-main .ss-multi-selected .ss-add .ss-plus.ss-cross {
  transform: rotate(45deg);
}

.ss-content {
  position: absolute;
  width: 100%;
  margin: -1px 0 0 0;
  box-sizing: border-box;
  border: solid 1px #dcdee2;
  z-index: 1010;
  background-color: #fff;
  transform-origin: center top;
  transition: transform 0.2s, opacity 0.2s;
  opacity: 0;
  transform: scaleY(0);
}

.ss-content.ss-open {
  display: block;
  opacity: 1;
  transform: scaleY(1);
}

.ss-content .ss-search {
  display: flex;
  flex-direction: row;
  padding: 8px 8px 6px 8px;
}

.ss-content .ss-search.ss-hide {
  height: 0px;
  opacity: 0;
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
}

.ss-content .ss-search.ss-hide input {
  height: 0px;
  opacity: 0;
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
}

.ss-content .ss-search input {
  display: inline-flex;
  font-size: inherit;
  line-height: inherit;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0px;
  height: 30px;
  padding: 6px 8px;
  margin: 0;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: #fff;
  outline: 0;
  text-align: left;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -webkit-appearance: textfield;
}

.ss-content .ss-search input::placeholder {
  color: #8a8a8a;
  vertical-align: middle;
}

.ss-content .ss-search input:focus {
  box-shadow: 0 0 5px #5897fb;
}

.ss-content .ss-search .ss-addable {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  flex: 0 0 30px;
  height: 30px;
  margin: 0 0 0 8px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  box-sizing: border-box;
}

.ss-content .ss-addable {
  padding-top: 0px;
}

.ss-content .ss-list {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
}

.ss-content .ss-list .ss-optgroup .ss-optgroup-label {
  padding: 6px 10px 6px 10px;
  font-weight: bold;
}

.ss-content .ss-list .ss-optgroup .ss-option {
  padding: 6px 6px 6px 25px;
}

.ss-content .ss-list .ss-optgroup-label-selectable {
  cursor: pointer;
}

.ss-content .ss-list .ss-optgroup-label-selectable:hover {
  color: #fff;
  background-color: #5897fb;
}

.ss-content .ss-list .ss-option {
  padding: 6px 10px 6px 10px;
  cursor: pointer;
  user-select: none;
}

.ss-content .ss-list .ss-option * {
  display: inline-block;
}

.ss-content .ss-list .ss-option:hover, .ss-content .ss-list .ss-option.ss-highlighted {
  color: #fff;
  background-color: #5897fb;
}

.ss-content .ss-list .ss-option.ss-disabled {
  cursor: not-allowed;
  color: #dedede;
  background-color: #fff;
}

.ss-content .ss-list .ss-option:not(.ss-disabled).ss-option-selected {
  color: #666;
  background-color: rgba(88, 151, 251, 0.1);
}

.ss-content .ss-list .ss-option.ss-hide {
  display: none;
}

.ss-content .ss-list .ss-option .ss-search-highlight {
  background-color: #fffb8c;
}

`,a=o.iv`

@charset "UTF-8";
.ss-main {
  margin: 0;
  padding: 0.25rem 0.75rem;
  border: 1px solid #999;
  border-radius: 0;
  background-color: #fff;
  background-image: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  color: #13639e;
  font-family: inherit;
  outline: 0;
  min-height: 2.5rem;
  padding: 0;
}
.ss-main:focus {
  border-color: #ffbf00;
  background-color: #fffbed;
  outline: none;
}
.ss-main .ss-multi-selected {
  padding: 0.25rem 0.75rem;
  border: 0;
}
.ss-main .ss-multi-selected .ss-add {
  display: flex;
  align-items: center;
  margin: 0;
}
.ss-main .ss-multi-selected .ss-add:after {
  margin-left: 0.5rem;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
.ss-main .ss-multi-selected .ss-add:after {
  color: #022851;
  content: "";
  transition: all 0.4s ease-in;
}
.ss-main .ss-multi-selected .ss-add .ss-plus {
  display: none;
}
.ss-main .ss-multi-selected .ss-values {
  gap: 0.125rem;
}
.ss-main .ss-multi-selected .ss-values .ss-value {
  margin: 0;
  padding: 0.25rem 0.5rem;
  background-color: #13639e;
  font-size: 0.875rem;
}
.ss-main .ss-multi-selected .ss-values .ss-disabled {
  padding-top: 0.35rem;
  color: #4c4c4c;
}
.ss-main .ss-open-below .ss-add:after {
  transform: rotate(45deg);
}

`;function l(){return o.dy`

`}var s,d,c={};s=window,d=function(){return i={},e.m=t=[function(e,t,i){function o(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),i}t.__esModule=!0,t.kebabCase=t.highlight=t.isValueInArrayOfObjects=t.debounce=t.putContent=t.ensureElementInView=t.hasClassInTree=void 0,t.hasClassInTree=function(e,t){function i(e,t){return t&&e&&e.classList&&e.classList.contains(t)?e:null}return i(e,t)||function e(t,o){return t&&t!==document?i(t,o)?t:e(t.parentNode,o):null}(e,t)},t.ensureElementInView=function(e,t){var i=e.scrollTop+e.offsetTop,o=i+e.clientHeight,r=t.offsetTop;t=r+t.clientHeight,r<i?e.scrollTop-=i-r:o<t&&(e.scrollTop+=t-o)},t.putContent=function(e,t,i){var o=e.offsetHeight,r=e.getBoundingClientRect();return e=i?r.top:r.top-o,o=i?r.bottom:r.bottom+o,e<=0?"below":o>=window.innerHeight?"above":i?t:"below"},t.debounce=function(e,t,i){var o;return void 0===t&&(t=100),void 0===i&&(i=!1),function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var a=self,l=i&&!o;clearTimeout(o),o=setTimeout((function(){o=null,i||e.apply(a,r)}),t),l&&e.apply(a,r)}},t.isValueInArrayOfObjects=function(e,t,i){if(!Array.isArray(e))return e[t]===i;for(var o=0,r=e;o<r.length;o++){var n=r[o];if(n&&n[t]&&n[t]===i)return!0}return!1},t.highlight=function(e,t,i){var o=e,r=new RegExp("("+t.trim()+")(?![^<]*>[^<>]*</)","i");if(!e.match(r))return e;var n=e.match(r).index;return t=n+e.match(r)[0].toString().length,t=e.substring(n,t),o.replace(r,'<mark class="'.concat(i,'">').concat(t,"</mark>"))},t.kebabCase=function(e){var t=e.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,(function(e){return"-"+e.toLowerCase()}));return e[0]===e[0].toUpperCase()?t.substring(1):t},"function"!=typeof(t=window).CustomEvent&&(o.prototype=t.Event.prototype,t.CustomEvent=o)},function(e,t,i){t.__esModule=!0,t.validateOption=t.validateData=t.Data=void 0;var o=(r.prototype.newOption=function(e){return{id:e.id||String(Math.floor(1e8*Math.random())),value:e.value||"",text:e.text||"",innerHTML:e.innerHTML||"",selected:e.selected||!1,display:void 0===e.display||e.display,disabled:e.disabled||!1,placeholder:e.placeholder||!1,class:e.class||void 0,data:e.data||{},mandatory:e.mandatory||!1}},r.prototype.add=function(e){this.data.push({id:String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:"",selected:!1,display:!0,disabled:!1,placeholder:!1,class:void 0,mandatory:e.mandatory,data:{}})},r.prototype.parseSelectData=function(){this.data=[];for(var e=0,t=this.main.select.element.childNodes;e<t.length;e++){var i=t[e];if("OPTGROUP"===i.nodeName){for(var o={label:i.label,options:[]},r=0,n=i.childNodes;r<n.length;r++){var a,l=n[r];"OPTION"===l.nodeName&&(a=this.pullOptionData(l),o.options.push(a),a.placeholder&&""!==a.text.trim()&&(this.main.config.placeholderText=a.text))}this.data.push(o)}else"OPTION"===i.nodeName&&(a=this.pullOptionData(i),this.data.push(a),a.placeholder&&""!==a.text.trim()&&(this.main.config.placeholderText=a.text))}},r.prototype.pullOptionData=function(e){return{id:!!e.dataset&&e.dataset.id||String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:e.innerHTML,selected:e.selected,disabled:e.disabled,placeholder:"true"===e.dataset.placeholder,class:e.className,style:e.style.cssText,data:e.dataset,mandatory:!!e.dataset&&"true"===e.dataset.mandatory}},r.prototype.setSelectedFromSelect=function(){if(this.main.config.isMultiple){for(var e=[],t=0,i=this.main.select.element.options;t<i.length;t++){var o=i[t];!o.selected||(o=this.getObjectFromData(o.value,"value"))&&o.id&&e.push(o.id)}this.setSelected(e,"id")}else{var r=this.main.select.element;-1!==r.selectedIndex&&(r=r.options[r.selectedIndex].value,this.setSelected(r,"value"))}},r.prototype.setSelected=function(e,t){void 0===t&&(t="id");for(var i=0,o=this.data;i<o.length;i++){var r=o[i];if(r.hasOwnProperty("label")){if(r.hasOwnProperty("options")){var n=r.options;if(n)for(var a=0,l=n;a<l.length;a++){var s=l[a];s.placeholder||(s.selected=this.shouldBeSelected(s,e,t))}}}else r.selected=this.shouldBeSelected(r,e,t)}},r.prototype.shouldBeSelected=function(e,t,i){if(void 0===i&&(i="id"),Array.isArray(t))for(var o=0,r=t;o<r.length;o++){var n=r[o];if(i in e&&String(e[i])===String(n))return!0}else if(i in e&&String(e[i])===String(t))return!0;return!1},r.prototype.getSelected=function(){for(var e={text:"",placeholder:this.main.config.placeholderText},t=[],i=0,o=this.data;i<o.length;i++){var r=o[i];if(r.hasOwnProperty("label")){if(r.hasOwnProperty("options")){var n=r.options;if(n)for(var a=0,l=n;a<l.length;a++){var s=l[a];s.selected&&(this.main.config.isMultiple?t.push(s):e=s)}}}else r.selected&&(this.main.config.isMultiple?t.push(r):e=r)}return this.main.config.isMultiple?t:e},r.prototype.addToSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){var i=[],o=this.getSelected();if(Array.isArray(o))for(var r=0,n=o;r<n.length;r++){var a=n[r];i.push(a[t])}i.push(e),this.setSelected(i,t)}},r.prototype.removeFromSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){for(var i=[],o=0,r=this.getSelected();o<r.length;o++){var n=r[o];String(n[t])!==String(e)&&i.push(n[t])}this.setSelected(i,t)}},r.prototype.onDataChange=function(){this.main.onChange&&this.isOnChangeEnabled&&this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))},r.prototype.getObjectFromData=function(e,t){void 0===t&&(t="id");for(var i=0,o=this.data;i<o.length;i++){var r=o[i];if(t in r&&String(r[t])===String(e))return r;if(r.hasOwnProperty("options")&&r.options)for(var n=0,a=r.options;n<a.length;n++){var l=a[n];if(String(l[t])===String(e))return l}}return null},r.prototype.search=function(e){var t,i;""!==(this.searchValue=e).trim()?(t=this.main.config.searchFilter,i=this.data.slice(0),e=e.trim(),i=i.map((function(i){if(i.hasOwnProperty("options")){var o=i,r=[];if(0!==(r=o.options?o.options.filter((function(i){return t(i,e)})):r).length)return(o=Object.assign({},o)).options=r,o}return i.hasOwnProperty("text")&&t(i,e)?i:null})),this.filtered=i.filter((function(e){return e}))):this.filtered=null},r);function r(e){this.contentOpen=!1,this.contentPosition="below",this.isOnChangeEnabled=!0,this.main=e.main,this.searchValue="",this.data=[],this.filtered=null,this.parseSelectData(),this.setSelectedFromSelect()}function n(e){return void 0!==e.text||(console.error("Data object option must have at least have a text value. Check object: "+JSON.stringify(e)),!1)}t.Data=o,t.validateData=function(e){if(!e)return console.error("Data must be an array of objects"),!1;for(var t=0,i=0,o=e;i<o.length;i++){var r=o[i];if(r.hasOwnProperty("label")){if(r.hasOwnProperty("options")){var a=r.options;if(a)for(var l=0,s=a;l<s.length;l++)n(s[l])||t++}}else n(r)||t++}return 0===t},t.validateOption=n},function(e,t,i){t.__esModule=!0;var o=i(3),r=i(4),n=i(5),a=i(1),l=i(0);function s(e){var t=this;this.ajax=null,this.addable=null,this.beforeOnChange=null,this.onChange=null,this.beforeOpen=null,this.afterOpen=null,this.beforeClose=null,this.afterClose=null,this.windowScroll=(0,l.debounce)((function(e){t.data.contentOpen&&("above"===(0,l.putContent)(t.slim.content,t.data.contentPosition,t.data.contentOpen)?t.moveContentAbove():t.moveContentBelow())})),this.documentClick=function(e){e.target&&!(0,l.hasClassInTree)(e.target,t.config.id)&&t.close()};var i=this.validate(e);i.dataset.ssid&&this.destroy(i.dataset.ssid),e.ajax&&(this.ajax=e.ajax),e.addable&&(this.addable=e.addable),this.config=new o.Config({select:i,isAjax:!!e.ajax,showSearch:e.showSearch,searchPlaceholder:e.searchPlaceholder,searchText:e.searchText,searchingText:e.searchingText,searchFocus:e.searchFocus,searchHighlight:e.searchHighlight,searchFilter:e.searchFilter,closeOnSelect:e.closeOnSelect,showContent:e.showContent,placeholderText:e.placeholder,allowDeselect:e.allowDeselect,allowDeselectOption:e.allowDeselectOption,hideSelectedOption:e.hideSelectedOption,deselectLabel:e.deselectLabel,isEnabled:e.isEnabled,valuesUseText:e.valuesUseText,showOptionTooltips:e.showOptionTooltips,selectByGroup:e.selectByGroup,limit:e.limit,timeoutDelay:e.timeoutDelay,addToBody:e.addToBody}),this.select=new r.Select({select:i,main:this}),this.data=new a.Data({main:this}),this.slim=new n.Slim({main:this}),this.select.element.parentNode&&this.select.element.parentNode.insertBefore(this.slim.container,this.select.element.nextSibling),e.data?this.setData(e.data):this.render(),document.addEventListener("click",this.documentClick),"auto"===this.config.showContent&&window.addEventListener("scroll",this.windowScroll,!1),e.beforeOnChange&&(this.beforeOnChange=e.beforeOnChange),e.onChange&&(this.onChange=e.onChange),e.beforeOpen&&(this.beforeOpen=e.beforeOpen),e.afterOpen&&(this.afterOpen=e.afterOpen),e.beforeClose&&(this.beforeClose=e.beforeClose),e.afterClose&&(this.afterClose=e.afterClose),this.config.isEnabled||this.disable()}s.prototype.validate=function(e){if(!(e="string"==typeof e.select?document.querySelector(e.select):e.select))throw new Error("Could not find select element");if("SELECT"!==e.tagName)throw new Error("Element isnt of type select");return e},s.prototype.selected=function(){if(this.config.isMultiple){for(var e=[],t=0,i=r=this.data.getSelected();t<i.length;t++){var o=i[t];e.push(o.value)}return e}var r;return(r=this.data.getSelected())?r.value:""},s.prototype.set=function(e,t,i,o){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===o&&(o=!0),this.config.isMultiple&&!Array.isArray(e)?this.data.addToSelected(e,t):this.data.setSelected(e,t),this.select.setValue(),this.data.onDataChange(),this.render(),(i=!(!this.config.hideSelectedOption||!this.config.isMultiple||this.data.getSelected().length!==this.data.data.length)||i)&&this.close()},s.prototype.setSelected=function(e,t,i,o){this.set(e,t=void 0===t?"value":t,i=void 0===i||i,o=void 0===o||o)},s.prototype.setData=function(e){if((0,a.validateData)(e)){for(var t=JSON.parse(JSON.stringify(e)),i=this.data.getSelected(),o=0;o<t.length;o++)t[o].value||t[o].placeholder||(t[o].value=t[o].text);if(this.config.isAjax&&i)if(this.config.isMultiple)for(var r=0,n=i.reverse();r<n.length;r++){var l=n[r];t.unshift(l)}else{for(t.unshift(i),o=0;o<t.length;o++)t[o].placeholder||t[o].value!==i.value||t[o].text!==i.text||t.splice(o,1);var s=!1;for(o=0;o<t.length;o++)t[o].placeholder&&(s=!0);s||t.unshift({text:"",placeholder:!0})}this.select.create(t),this.data.parseSelectData(),this.data.setSelectedFromSelect()}else console.error("Validation problem on: #"+this.select.element.id)},s.prototype.addData=function(e){(0,a.validateData)([e])?(this.data.add(this.data.newOption(e)),this.select.create(this.data.data),this.data.parseSelectData(),this.data.setSelectedFromSelect(),this.render()):console.error("Validation problem on: #"+this.select.element.id)},s.prototype.open=function(){var e,t=this;this.config.isEnabled&&(this.data.contentOpen||this.config.hideSelectedOption&&this.config.isMultiple&&this.data.getSelected().length===this.data.data.length||(this.beforeOpen&&this.beforeOpen(),this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.plus.classList.add("ss-cross"):this.slim.singleSelected&&(this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-up")),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add("above"===this.data.contentPosition?this.config.openAbove:this.config.openBelow),this.config.addToBody&&(e=this.slim.container.getBoundingClientRect(),this.slim.content.style.top=e.top+e.height+window.scrollY+"px",this.slim.content.style.left=e.left+window.scrollX+"px",this.slim.content.style.width=e.width+"px"),this.slim.content.classList.add(this.config.open),"up"===this.config.showContent.toLowerCase()||"down"!==this.config.showContent.toLowerCase()&&"above"===(0,l.putContent)(this.slim.content,this.data.contentPosition,this.data.contentOpen)?this.moveContentAbove():this.moveContentBelow(),this.config.isMultiple||(e=this.data.getSelected())&&(e=e.id,(e=this.slim.list.querySelector('[data-id="'+e+'"]'))&&(0,l.ensureElementInView)(this.slim.list,e)),setTimeout((function(){t.data.contentOpen=!0,t.config.searchFocus&&t.slim.search.input.focus(),t.afterOpen&&t.afterOpen()}),this.config.timeoutDelay)))},s.prototype.close=function(){var e=this;this.data.contentOpen&&(this.beforeClose&&this.beforeClose(),this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.plus.classList.remove("ss-cross")):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-up")),this.slim.content.classList.remove(this.config.open),this.data.contentOpen=!1,this.search(""),setTimeout((function(){e.slim.content.removeAttribute("style"),e.data.contentPosition="below",e.config.isMultiple&&e.slim.multiSelected?(e.slim.multiSelected.container.classList.remove(e.config.openAbove),e.slim.multiSelected.container.classList.remove(e.config.openBelow)):e.slim.singleSelected&&(e.slim.singleSelected.container.classList.remove(e.config.openAbove),e.slim.singleSelected.container.classList.remove(e.config.openBelow)),e.slim.search.input.blur(),e.afterClose&&e.afterClose()}),this.config.timeoutDelay))},s.prototype.moveContentAbove=function(){var e=0;this.config.isMultiple&&this.slim.multiSelected?e=this.slim.multiSelected.container.offsetHeight:this.slim.singleSelected&&(e=this.slim.singleSelected.container.offsetHeight);var t=e+this.slim.content.offsetHeight-1;this.slim.content.style.margin="-"+t+"px 0 0 0",this.slim.content.style.height=t-e+1+"px",this.slim.content.style.transformOrigin="center bottom",this.data.contentPosition="above",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.container.classList.add(this.config.openAbove)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.container.classList.add(this.config.openAbove))},s.prototype.moveContentBelow=function(){this.data.contentPosition="below",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.add(this.config.openBelow)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.add(this.config.openBelow))},s.prototype.enable=function(){this.config.isEnabled=!0,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.remove(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.remove(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!1,this.slim.search.input.disabled=!1,this.select.triggerMutationObserver=!0},s.prototype.disable=function(){this.config.isEnabled=!1,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.add(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.add(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!0,this.slim.search.input.disabled=!0,this.select.triggerMutationObserver=!0},s.prototype.search=function(e){var t;this.data.searchValue!==e&&(this.slim.search.input.value=e,this.config.isAjax?((t=this).config.isSearching=!0,this.render(),this.ajax&&this.ajax(e,(function(i){t.config.isSearching=!1,Array.isArray(i)?(i.unshift({text:"",placeholder:!0}),t.setData(i),t.data.search(e),t.render()):"string"==typeof i?t.slim.options(i):t.render()}))):(this.data.search(e),this.render()))},s.prototype.setSearchText=function(e){this.config.searchText=e},s.prototype.render=function(){this.config.isMultiple?this.slim.values():(this.slim.placeholder(),this.slim.deselect()),this.slim.options()},s.prototype.destroy=function(e){var t=(e=void 0===e?null:e)?document.querySelector("."+e+".ss-main"):this.slim.container,i=e?document.querySelector("[data-ssid=".concat(e,"]")):this.select.element;t&&i&&(document.removeEventListener("click",this.documentClick),"auto"===this.config.showContent&&window.removeEventListener("scroll",this.windowScroll,!1),i.style.display="",delete i.dataset.ssid,i.slim=null,t.parentElement&&t.parentElement.removeChild(t),!this.config.addToBody||(e=e?document.querySelector("."+e+".ss-content"):this.slim.content)&&document.body.removeChild(e))},i=s,t.default=i},function(e,t,i){t.__esModule=!0,t.Config=void 0;var o=(r.prototype.searchFilter=function(e,t){return-1!==e.text.toLowerCase().indexOf(t.toLowerCase())},r);function r(e){this.id="",this.isMultiple=!1,this.isAjax=!1,this.isSearching=!1,this.showSearch=!0,this.searchFocus=!0,this.searchHighlight=!1,this.closeOnSelect=!0,this.showContent="auto",this.searchPlaceholder="Search",this.searchText="No Results",this.searchingText="Searching...",this.placeholderText="Select Value",this.allowDeselect=!1,this.allowDeselectOption=!1,this.hideSelectedOption=!1,this.deselectLabel="x",this.isEnabled=!0,this.valuesUseText=!1,this.showOptionTooltips=!1,this.selectByGroup=!1,this.limit=0,this.timeoutDelay=200,this.addToBody=!1,this.main="ss-main",this.singleSelected="ss-single-selected",this.arrow="ss-arrow",this.multiSelected="ss-multi-selected",this.add="ss-add",this.plus="ss-plus",this.values="ss-values",this.value="ss-value",this.valueText="ss-value-text",this.valueDelete="ss-value-delete",this.content="ss-content",this.open="ss-open",this.openAbove="ss-open-above",this.openBelow="ss-open-below",this.search="ss-search",this.searchHighlighter="ss-search-highlight",this.addable="ss-addable",this.list="ss-list",this.optgroup="ss-optgroup",this.optgroupLabel="ss-optgroup-label",this.optgroupLabelSelectable="ss-optgroup-label-selectable",this.option="ss-option",this.optionSelected="ss-option-selected",this.highlighted="ss-highlighted",this.disabled="ss-disabled",this.hide="ss-hide",this.id="ss-"+Math.floor(1e5*Math.random()),this.style=e.select.style.cssText,this.class=e.select.className.split(" "),this.isMultiple=e.select.multiple,this.isAjax=e.isAjax,this.showSearch=!1!==e.showSearch,this.searchFocus=!1!==e.searchFocus,this.searchHighlight=!0===e.searchHighlight,this.closeOnSelect=!1!==e.closeOnSelect,e.showContent&&(this.showContent=e.showContent),this.isEnabled=!1!==e.isEnabled,e.searchPlaceholder&&(this.searchPlaceholder=e.searchPlaceholder),e.searchText&&(this.searchText=e.searchText),e.searchingText&&(this.searchingText=e.searchingText),e.placeholderText&&(this.placeholderText=e.placeholderText),this.allowDeselect=!0===e.allowDeselect,this.allowDeselectOption=!0===e.allowDeselectOption,this.hideSelectedOption=!0===e.hideSelectedOption,e.deselectLabel&&(this.deselectLabel=e.deselectLabel),e.valuesUseText&&(this.valuesUseText=e.valuesUseText),e.showOptionTooltips&&(this.showOptionTooltips=e.showOptionTooltips),e.selectByGroup&&(this.selectByGroup=e.selectByGroup),e.limit&&(this.limit=e.limit),e.searchFilter&&(this.searchFilter=e.searchFilter),null!=e.timeoutDelay&&(this.timeoutDelay=e.timeoutDelay),this.addToBody=!0===e.addToBody}t.Config=o},function(e,t,i){t.__esModule=!0,t.Select=void 0;var o=i(0);function r(e){this.triggerMutationObserver=!0,this.element=e.select,this.main=e.main,this.element.disabled&&(this.main.config.isEnabled=!1),this.addAttributes(),this.addEventListeners(),this.mutationObserver=null,this.addMutationObserver(),this.element.slim=e.main}r.prototype.setValue=function(){if(this.main.data.getSelected()){if(this.main.config.isMultiple)for(var e=this.main.data.getSelected(),t=0,i=this.element.options;t<i.length;t++){var o=i[t];o.selected=!1;for(var r=0,n=e;r<n.length;r++)n[r].value===o.value&&(o.selected=!0)}else e=this.main.data.getSelected(),this.element.value=e?e.value:"";this.main.data.isOnChangeEnabled=!1,this.element.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.main.data.isOnChangeEnabled=!0}},r.prototype.addAttributes=function(){this.element.tabIndex=-1,this.element.style.display="none",this.element.dataset.ssid=this.main.config.id,this.element.setAttribute("aria-hidden","true")},r.prototype.addEventListeners=function(){var e=this;this.element.addEventListener("change",(function(t){e.main.data.setSelectedFromSelect(),e.main.render()}))},r.prototype.addMutationObserver=function(){var e=this;this.main.config.isAjax||(this.mutationObserver=new MutationObserver((function(t){e.triggerMutationObserver&&(e.main.data.parseSelectData(),e.main.data.setSelectedFromSelect(),e.main.render(),t.forEach((function(t){"class"===t.attributeName&&e.main.slim.updateContainerDivClass(e.main.slim.container)})))})),this.observeMutationObserver())},r.prototype.observeMutationObserver=function(){this.mutationObserver&&this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,characterData:!0})},r.prototype.disconnectMutationObserver=function(){this.mutationObserver&&this.mutationObserver.disconnect()},r.prototype.create=function(e){this.element.innerHTML="";for(var t=0,i=e;t<i.length;t++){var o=i[t];if(o.hasOwnProperty("options")){var r=o,n=document.createElement("optgroup");if(n.label=r.label,r.options)for(var a=0,l=r.options;a<l.length;a++){var s=l[a];n.appendChild(this.createOption(s))}this.element.appendChild(n)}else this.element.appendChild(this.createOption(o))}},r.prototype.createOption=function(e){var t=document.createElement("option");return t.value=""!==e.value?e.value:e.text,t.innerHTML=e.innerHTML||e.text,e.selected&&(t.selected=e.selected),!1===e.display&&(t.style.display="none"),e.disabled&&(t.disabled=!0),e.placeholder&&t.setAttribute("data-placeholder","true"),e.mandatory&&t.setAttribute("data-mandatory","true"),e.class&&e.class.split(" ").forEach((function(e){t.classList.add(e)})),e.data&&"object"==typeof e.data&&Object.keys(e.data).forEach((function(i){t.setAttribute("data-"+(0,o.kebabCase)(i),e.data[i])})),t},i=r,t.Select=i},function(e,t,i){t.__esModule=!0,t.Slim=void 0;var o=i(0),r=i(1);function n(e){this.main=e.main,this.container=this.containerDiv(),this.content=this.contentDiv(),this.search=this.searchDiv(),this.list=this.listDiv(),this.options(),this.singleSelected=null,this.multiSelected=null,this.main.config.isMultiple?(this.multiSelected=this.multiSelectedDiv(),this.multiSelected&&this.container.appendChild(this.multiSelected.container)):(this.singleSelected=this.singleSelectedDiv(),this.container.appendChild(this.singleSelected.container)),this.main.config.addToBody?(this.content.classList.add(this.main.config.id),document.body.appendChild(this.content)):this.container.appendChild(this.content),this.content.appendChild(this.search.container),this.content.appendChild(this.list)}n.prototype.containerDiv=function(){var e=document.createElement("div");return e.style.cssText=this.main.config.style,this.updateContainerDivClass(e),e},n.prototype.updateContainerDivClass=function(e){this.main.config.class=this.main.select.element.className.split(" "),e.className="",e.classList.add(this.main.config.id),e.classList.add(this.main.config.main);for(var t=0,i=this.main.config.class;t<i.length;t++){var o=i[t];""!==o.trim()&&e.classList.add(o)}},n.prototype.singleSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.singleSelected);var i=document.createElement("span");i.classList.add("placeholder"),t.appendChild(i);var o=document.createElement("span");o.innerHTML=this.main.config.deselectLabel,o.classList.add("ss-deselect"),o.onclick=function(t){t.stopPropagation(),e.main.config.isEnabled&&e.main.set("")},t.appendChild(o);var r=document.createElement("span");r.classList.add(this.main.config.arrow);var n=document.createElement("span");return n.classList.add("arrow-down"),r.appendChild(n),t.appendChild(r),t.onclick=function(){e.main.config.isEnabled&&(e.main.data.contentOpen?e.main.close():e.main.open())},{container:t,placeholder:i,deselect:o,arrowIcon:{container:r,arrow:n}}},n.prototype.placeholder=function(){var e,t=this.main.data.getSelected();null===t||t&&t.placeholder?((e=document.createElement("span")).classList.add(this.main.config.disabled),e.innerHTML=this.main.config.placeholderText,this.singleSelected&&(this.singleSelected.placeholder.innerHTML=e.outerHTML)):(e="",t&&(e=t.innerHTML&&!0!==this.main.config.valuesUseText?t.innerHTML:t.text),this.singleSelected&&(this.singleSelected.placeholder.innerHTML=t?e:""))},n.prototype.deselect=function(){this.singleSelected&&(this.main.config.allowDeselect&&""!==this.main.selected()?this.singleSelected.deselect.classList.remove("ss-hide"):this.singleSelected.deselect.classList.add("ss-hide"))},n.prototype.multiSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.multiSelected);var i=document.createElement("div");i.classList.add(this.main.config.values),t.appendChild(i);var o=document.createElement("div");o.classList.add(this.main.config.add);var r=document.createElement("span");return r.classList.add(this.main.config.plus),r.onclick=function(t){e.main.data.contentOpen&&(e.main.close(),t.stopPropagation())},o.appendChild(r),t.appendChild(o),t.onclick=function(t){e.main.config.isEnabled&&(t.target.classList.contains(e.main.config.valueDelete)||(e.main.data.contentOpen?e.main.close():e.main.open()))},{container:t,values:i,add:o,plus:r}},n.prototype.values=function(){if(this.multiSelected){for(var e=this.multiSelected.values.childNodes,t=this.main.data.getSelected(),i=[],o=0,r=e;o<r.length;o++){for(var n=r[o],a=!0,l=0,s=t;l<s.length;l++){var d=s[l];String(d.id)===String(n.dataset.id)&&(a=!1)}a&&i.push(n)}for(var c=0,h=i;c<h.length;c++){var p=h[c];p.classList.add("ss-out"),this.multiSelected.values.removeChild(p)}var m;for(e=this.multiSelected.values.childNodes,d=0;d<t.length;d++){a=!1;for(var f=0,g=e;f<g.length;f++)n=g[f],String(t[d].id)===String(n.dataset.id)&&(a=!0);a||(0!==e.length&&HTMLElement.prototype.insertAdjacentElement?0===d?this.multiSelected.values.insertBefore(this.valueDiv(t[d]),e[d]):e[d-1].insertAdjacentElement("afterend",this.valueDiv(t[d])):this.multiSelected.values.appendChild(this.valueDiv(t[d])))}0===t.length&&((m=document.createElement("span")).classList.add(this.main.config.disabled),m.innerHTML=this.main.config.placeholderText,this.multiSelected.values.innerHTML=m.outerHTML)}},n.prototype.valueDiv=function(e){var t=this,i=document.createElement("div");i.classList.add(this.main.config.value),i.dataset.id=e.id;var o=document.createElement("span");return o.classList.add(this.main.config.valueText),o.innerHTML=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text,i.appendChild(o),e.mandatory||((o=document.createElement("span")).classList.add(this.main.config.valueDelete),o.innerHTML=this.main.config.deselectLabel,o.onclick=function(i){i.preventDefault(),i.stopPropagation();var o=!1;if(t.main.beforeOnChange||(o=!0),t.main.beforeOnChange){i=t.main.data.getSelected();for(var r=JSON.parse(JSON.stringify(i)),n=0;n<r.length;n++)r[n].id===e.id&&r.splice(n,1);!1!==t.main.beforeOnChange(r)&&(o=!0)}o&&(t.main.data.removeFromSelected(e.id,"id"),t.main.render(),t.main.select.setValue(),t.main.data.onDataChange())},i.appendChild(o)),i},n.prototype.contentDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.content),e},n.prototype.searchDiv=function(){var e=this,t=document.createElement("div"),i=document.createElement("input"),o=document.createElement("div");t.classList.add(this.main.config.search);var n={container:t,input:i};return this.main.config.showSearch||(t.classList.add(this.main.config.hide),i.readOnly=!0),i.type="search",i.placeholder=this.main.config.searchPlaceholder,i.tabIndex=0,i.setAttribute("aria-label",this.main.config.searchPlaceholder),i.setAttribute("autocapitalize","off"),i.setAttribute("autocomplete","off"),i.setAttribute("autocorrect","off"),i.onclick=function(t){setTimeout((function(){""===t.target.value&&e.main.search("")}),10)},i.onkeydown=function(t){"ArrowUp"===t.key?(e.main.open(),e.highlightUp(),t.preventDefault()):"ArrowDown"===t.key?(e.main.open(),e.highlightDown(),t.preventDefault()):"Tab"===t.key?e.main.data.contentOpen?e.main.close():setTimeout((function(){e.main.close()}),e.main.config.timeoutDelay):"Enter"===t.key&&t.preventDefault()},i.onkeyup=function(t){var r=t.target;if("Enter"===t.key){if(e.main.addable&&t.ctrlKey)return o.click(),t.preventDefault(),void t.stopPropagation();var n=e.list.querySelector("."+e.main.config.highlighted);n&&n.click()}else"ArrowUp"===t.key||"ArrowDown"===t.key||("Escape"===t.key?e.main.close():e.main.config.showSearch&&e.main.data.contentOpen?e.main.search(r.value):i.value="");t.preventDefault(),t.stopPropagation()},i.onfocus=function(){e.main.open()},t.appendChild(i),this.main.addable&&(o.classList.add(this.main.config.addable),o.innerHTML="+",o.onclick=function(t){var i;e.main.addable&&(t.preventDefault(),t.stopPropagation(),""!==(t=e.search.input.value).trim()?(t=e.main.addable(t),i="",t&&("object"==typeof t?(0,r.validateOption)(t)&&(e.main.addData(t),i=t.value||t.text):(e.main.addData(e.main.data.newOption({text:t,value:t})),i=t),e.main.search(""),setTimeout((function(){e.main.set(i,"value",!1,!1)}),100),e.main.config.closeOnSelect&&setTimeout((function(){e.main.close()}),100))):e.search.input.focus())},t.appendChild(o),n.addable=o),n},n.prototype.highlightUp=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.previousSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.previousSibling;else{var i=this.list.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");t=i[i.length-1]}null!==(t=t&&t.classList.contains(this.main.config.optgroupLabel)?null:t)||(i=e.parentNode).classList.contains(this.main.config.optgroup)&&(!i.previousSibling||(i=i.previousSibling.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")")).length&&(t=i[i.length-1])),t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),(0,o.ensureElementInView)(this.list,t))},n.prototype.highlightDown=function(){var e,t=this.list.querySelector("."+this.main.config.highlighted),i=null;if(t)for(i=t.nextSibling;null!==i&&i.classList.contains(this.main.config.disabled);)i=i.nextSibling;else i=this.list.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")");null!==i||null===t||(e=t.parentNode).classList.contains(this.main.config.optgroup)&&e.nextSibling&&(i=e.nextSibling.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")")),i&&(t&&t.classList.remove(this.main.config.highlighted),i.classList.add(this.main.config.highlighted),(0,o.ensureElementInView)(this.list,i))},n.prototype.listDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.list),e.setAttribute("role","listbox"),e},n.prototype.options=function(e){void 0===e&&(e="");var t=this.main.data.filtered||this.main.data.data;if((this.list.innerHTML="")!==e)return(i=document.createElement("div")).classList.add(this.main.config.option),i.classList.add(this.main.config.disabled),i.innerHTML=e,void this.list.appendChild(i);if(this.main.config.isAjax&&this.main.config.isSearching)return(i=document.createElement("div")).classList.add(this.main.config.option),i.classList.add(this.main.config.disabled),i.innerHTML=this.main.config.searchingText,void this.list.appendChild(i);if(0===t.length){var i=document.createElement("div");return i.classList.add(this.main.config.option),i.classList.add(this.main.config.disabled),i.innerHTML=this.main.config.searchText,void this.list.appendChild(i)}for(var o=this,r=0,n=t;r<n.length;r++)!function(e){if(e.hasOwnProperty("label")){var t=e,i=document.createElement("div");i.classList.add(o.main.config.optgroup);var r=document.createElement("div");if(r.classList.add(o.main.config.optgroupLabel),o.main.config.selectByGroup&&o.main.config.isMultiple&&r.classList.add(o.main.config.optgroupLabelSelectable),r.innerHTML=t.label,i.appendChild(r),t=t.options){for(var n,a=0,l=t;a<l.length;a++){var s=l[a];i.appendChild(o.option(s))}o.main.config.selectByGroup&&o.main.config.isMultiple&&(n=o,r.addEventListener("click",(function(e){e.preventDefault(),e.stopPropagation();for(var t=0,o=i.children;t<o.length;t++){var r=o[t];-1!==r.className.indexOf(n.main.config.option)&&r.click()}})))}o.list.appendChild(i)}else o.list.appendChild(o.option(e))}(n[r])},n.prototype.option=function(e){if(e.placeholder){var t=document.createElement("div");return t.classList.add(this.main.config.option),t.classList.add(this.main.config.hide),t}var i=document.createElement("div");i.classList.add(this.main.config.option),i.setAttribute("role","option"),e.class&&e.class.split(" ").forEach((function(e){i.classList.add(e)})),e.style&&(i.style.cssText=e.style);var r=this.main.data.getSelected();i.dataset.id=e.id,this.main.config.searchHighlight&&this.main.slim&&e.innerHTML&&""!==this.main.slim.search.input.value.trim()?i.innerHTML=(0,o.highlight)(e.innerHTML,this.main.slim.search.input.value,this.main.config.searchHighlighter):e.innerHTML&&(i.innerHTML=e.innerHTML),this.main.config.showOptionTooltips&&i.textContent&&i.setAttribute("title",i.textContent);var n=this;return i.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation();var i=this.dataset.id;if(!0===e.selected&&n.main.config.allowDeselectOption){var o=!1;if(n.main.beforeOnChange&&n.main.config.isMultiple||(o=!0),n.main.beforeOnChange&&n.main.config.isMultiple){for(var a=n.main.data.getSelected(),l=JSON.parse(JSON.stringify(a)),s=0;s<l.length;s++)l[s].id===i&&l.splice(s,1);!1!==n.main.beforeOnChange(l)&&(o=!0)}o&&(n.main.config.isMultiple?(n.main.data.removeFromSelected(i,"id"),n.main.render(),n.main.select.setValue(),n.main.data.onDataChange()):n.main.set(""))}else e.disabled||e.selected||n.main.config.limit&&Array.isArray(r)&&n.main.config.limit<=r.length||(n.main.beforeOnChange?(a=void 0,(o=JSON.parse(JSON.stringify(n.main.data.getObjectFromData(i)))).selected=!0,n.main.config.isMultiple?(a=JSON.parse(JSON.stringify(r))).push(o):a=JSON.parse(JSON.stringify(o)),!1!==n.main.beforeOnChange(a)&&n.main.set(i,"id",n.main.config.closeOnSelect)):n.main.set(i,"id",n.main.config.closeOnSelect))})),t=r&&(0,o.isValueInArrayOfObjects)(r,"id",e.id),(e.disabled||t)&&(i.onclick=null,n.main.config.allowDeselectOption||i.classList.add(this.main.config.disabled),n.main.config.hideSelectedOption&&i.classList.add(this.main.config.hide)),t?i.classList.add(this.main.config.optionSelected):i.classList.remove(this.main.config.optionSelected),i},i=n,t.Slim=i}],e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:o})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(o,r,function(e){return t[e]}.bind(null,r));return o},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=2).default;function e(o){if(i[o])return i[o].exports;var r=i[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var t,i},"object"==typeof c&&"object"==typeof module?module.exports=d():"function"==typeof define&&define.amd?define([],d):"object"==typeof c?c.SlimSelect=d():s.SlimSelect=d();const h=c.SlimSelect;var p=i(8337);class m extends o.oi{static get properties(){return{}}static get styles(){return function(){const e=o.iv`
    :host {
      display: block;
    }
  `;return[r.Z,n,a,e]}()}constructor(){super(),this.render=l.bind(this),this.mutationObserver=new p.F(this,{subtree:!0,childList:!0,attributes:!0,characterData:!0},"_onLightDomMutation")}_onLightDomMutation(){const e=Array.from(this.children);if(0==e.length||"SELECT"!=e[0].tagName)return;const t=e[0].cloneNode(!0);this.slimSelect&&(this.slimSelect.destroy(),this.renderRoot.querySelector(".ss-main").remove(),this.renderRoot.querySelector("select").remove()),this.renderRoot.appendChild(t),this.slimSelect=new h({select:t,onChange:e=>this.dispatchEvent(new CustomEvent("change",{detail:e}))})}}customElements.define("ucd-theme-slim-select",m)},5721:(e,t,i)=>{i.d(t,{Z:()=>o});const o=i(5589).iv`

@charset "UTF-8";
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
}
.btn:hover, .btn:focus {
  color: #022851;
  text-decoration: none;
}
.btn:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn, .dark-background .btn {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}

.btn--primary,
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  --btn-arrow-color: #fff;
  border-color: transparent;
  background-color: #ffbf00;
}
.btn--primary:hover, .btn--primary:focus,
.button:hover,
.button:focus {
  color: #022851;
  text-decoration: none;
}
.btn--primary:focus,
.button:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--primary, .dark-background .btn--primary,
.category-brand__background .button,
.dark-background .button {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--primary:before,
.button:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--primary:hover,
.button:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--primary:hover:before,
.button:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}
.category-brand__background .btn--primary, .dark-background .btn--primary,
.category-brand__background .button,
.dark-background .button {
  --btn-arrow-color: var(--category-brand-featured, var(--category-brand, #13639e));
  border-color: transparent;
  background-color: #fff;
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}
.category-brand__background .btn--primary:hover, .dark-background .btn--primary:hover,
.category-brand__background .button:hover,
.dark-background .button:hover {
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}
.category-brand__background--lighten .btn--primary,
.category-brand__background--lighten .button {
  --btn-arrow-color: var(--category-brand-contrast-color, #fff);
  border-color: transparent;
  background-color: var(--category-brand, #ffbf00);
  color: var(--category-brand-contrast-color, #022851);
}
.category-brand__background--lighten .btn--primary:hover, .category-brand__background--lighten .btn--primary:active,
.category-brand__background--lighten .button:hover,
.category-brand__background--lighten .button:active {
  color: var(--category-brand-contrast-color, #022851);
}

.btn--primary-input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  padding-right: 1.5em;
  padding-left: 1.5em;
  border-color: transparent;
  background-color: #ffbf00;
}
.btn--primary-input:hover, .btn--primary-input:focus {
  color: #022851;
  text-decoration: none;
}
.btn--primary-input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--primary-input, .dark-background .btn--primary-input {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--primary-input:hover {
  padding-right: 1.5em;
  padding-left: 1.5em;
}
.category-brand__background .btn--primary-input, .dark-background .btn--primary-input {
  border-color: transparent;
  background-color: #fff;
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}
.category-brand__background .btn--primary-input:hover, .dark-background .btn--primary-input:hover {
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}

.btn--alt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  border-color: transparent;
  background-color: #022851;
  color: #fff;
}
.btn--alt:hover, .btn--alt:focus {
  color: #022851;
  text-decoration: none;
}
.btn--alt:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--alt, .dark-background .btn--alt {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--alt:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--alt:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--alt:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}
.btn--alt:hover, .btn--alt:focus {
  color: #fff;
}
.btn--alt:focus {
  box-shadow: 0 0 0 3px #ffbf00;
}
.category-brand__background .btn--alt, .dark-background .btn--alt {
  --btn-arrow-color: var(--category-brand-contrast-color);
  border: 2px solid var(--category-brand-contrast-color, #fff);
  background-color: transparent;
}
.category-brand__background .btn--alt:hover, .category-brand__background .btn--alt:focus, .dark-background .btn--alt:hover, .dark-background .btn--alt:focus {
  background-color: rgba(var(--category-brand-rgb--dark, transparent), 0.1);
}

.btn--alt2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  border-color: transparent;
  background-color: #022851;
  color: #fff;
  background-color: #13639e;
}
.btn--alt2:hover, .btn--alt2:focus {
  color: #022851;
  text-decoration: none;
}
.btn--alt2:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--alt2, .dark-background .btn--alt2 {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--alt2:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--alt2:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--alt2:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}
.btn--alt2:hover, .btn--alt2:focus {
  color: #fff;
}
.btn--alt2:focus {
  box-shadow: 0 0 0 3px #ffbf00;
}
.category-brand__background .btn--alt2, .dark-background .btn--alt2 {
  --btn-arrow-color: var(--category-brand-contrast-color);
  border: 2px solid var(--category-brand-contrast-color, #fff);
  background-color: transparent;
}
.category-brand__background .btn--alt2:hover, .category-brand__background .btn--alt2:focus, .dark-background .btn--alt2:hover, .dark-background .btn--alt2:focus {
  background-color: rgba(var(--category-brand-rgb--dark, transparent), 0.1);
}

.btn--alt3 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  --btn-arrow-color: #13639e;
  border-color: transparent;
  background-color: #dbeaf7;
}
.btn--alt3:hover, .btn--alt3:focus {
  color: #022851;
  text-decoration: none;
}
.btn--alt3:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--alt3, .dark-background .btn--alt3 {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--alt3:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--alt3:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--alt3:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}

.btn--invert {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  border-color: #ffbf00;
  background-color: transparent;
}
.btn--invert:hover, .btn--invert:focus {
  color: #022851;
  text-decoration: none;
}
.btn--invert:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--invert, .dark-background .btn--invert {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--invert:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--invert:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--invert:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}

.btn--disabled,
.btn[disabled],
[disabled] .btn {
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.3;
  pointer-events: none;
}

.btn--lg {
  font-size: 1.25rem;
}

.btn--sm {
  font-size: 0.875rem;
}

.btn--round {
  border-radius: 1.25em;
}

.btn--block {
  display: flex;
  width: 100%;
}

.btn--input {
  padding-right: 1em;
  padding-left: 1em;
}
.btn--input:hover {
  padding-right: 0.75em;
  padding-left: 0.75em;
}

.field-container {
  margin-bottom: 1rem;
}
.field-container--small {
  margin-bottom: 0.5rem;
}

.form-submit {
  width: auto;
  margin-right: 0.5rem;
}
@media (max-width: 479px) {
  .form-submit {
    width: 100%;
    margin-right: 0;
  }
}
.form-submit:last-child {
  margin-right: 0;
}

.comment-form label {
  font-style: italic;
}

.radio label,
.checkbox label {
  color: #4c4c4c;
  font-weight: normal;
}

.checkbox [type=checkbox] {
  width: 0;
  opacity: 0;
}
.checkbox [type=checkbox]:checked + label:before {
  border-color: #13639e;
  background-color: #13639e;
}
.checkbox [type=checkbox] + label:after {
  content: none;
}
.checkbox [type=checkbox]:checked + label:after {
  content: "";
}
.checkbox [type=checkbox]:focus + label:before {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.checkbox label {
  position: relative;
  display: inline-block;
  padding-left: 1.75rem;
}
.checkbox label:before, .checkbox label:after {
  position: absolute;
  display: inline-block;
  content: "";
}
.checkbox label:before {
  border: 1px solid #b0d0ed;
}
.checkbox label:hover:before {
  border-color: #13639e;
}
.checkbox label:before {
  top: 6px;
  left: 0;
  width: 1rem;
  height: 1rem;
  border: 1px solid #b0d0ed;
}
.checkbox label:after {
  top: 0.6em;
  left: 0.2em;
  width: 0.6em;
  height: 0.3em;
  border-bottom: 2px solid;
  border-left: 2px solid;
  color: #fff;
  transform: rotate(-45deg);
}

.radio [type=radio] {
  width: 0;
  opacity: 0;
}
.radio [type=radio]:checked + label:before {
  border-color: #13639e;
  background-color: #13639e;
}
.radio [type=radio] + label:after {
  content: none;
}
.radio [type=radio]:checked + label:after {
  content: "";
}
.radio [type=radio]:focus + label:before {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.radio label {
  position: relative;
  display: inline-block;
  padding-left: 1.75rem;
}
.radio label:before, .radio label:after {
  position: absolute;
  display: inline-block;
  content: "";
}
.radio label:before {
  border: 1px solid #b0d0ed;
}
.radio label:hover:before {
  border-color: #13639e;
}
.radio label:before {
  top: 6px;
  left: 0;
  width: 21px;
  height: 21px;
  border-radius: 50%;
}
.radio label:after {
  top: 13px;
  left: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #fff;
}

.heading {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
}
.heading:first-child {
  margin-top: 0;
}

.heading--primary {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
}
.heading--primary:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--primary {
    font-size: 2.0995rem;
  }
}

.heading--secondary {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
}
.heading--secondary:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--secondary {
    font-size: 1.7425rem;
  }
}

.heading--highlight {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #022851;
  font-size: 1.42rem;
  font-style: inherit;
}
.heading--highlight:first-child {
  margin-top: 0;
}

.heading--auxiliary {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
  margin-bottom: 0.5rem;
  color: #022851;
  font-style: italic;
  font-weight: 700;
}
.heading--auxiliary:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--auxiliary {
    font-size: 1.7425rem;
  }
}

.heading--weighted {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
}
.heading--weighted:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--weighted {
    font-size: 2.0995rem;
  }
}
.heading--weighted--weighted {
  font-weight: 700;
}

.heading--underline {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
}
.heading--underline:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--underline {
    font-size: 2.0995rem;
  }
}
.heading--underline:after {
  display: block;
  width: 4rem;
  margin: 0.5rem 0 1rem;
  border-top: 0.42rem dotted #ffbf00;
  content: "";
}
.panel--center .heading--underline:after {
  margin: 0.5rem auto;
}
[class^=category-brand--] .heading--underline:after {
  border-color: #fff;
}

.heading--weighted-underline {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
}
.heading--weighted-underline:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--weighted-underline {
    font-size: 2.0995rem;
  }
}
.heading--weighted-underline:after {
  display: block;
  width: 4rem;
  margin: 0.5rem 0 1rem;
  border-top: 0.42rem dotted #ffbf00;
  content: "";
}
.panel--center .heading--weighted-underline:after {
  margin: 0.5rem auto;
}
[class^=category-brand--] .heading--weighted-underline:after {
  border-color: #fff;
}
.heading--weighted-underline:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--weighted-underline {
    font-size: 2.0995rem;
  }
}
.heading--weighted-underline--weighted {
  font-weight: 700;
}

.heading--invert {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
  color: var(--category-brand-contrast-color, #fff);
}
.heading--invert:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--invert {
    font-size: 1.7425rem;
  }
}

.heading--invert-box {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
  color: var(--category-brand-contrast-color, #fff);
  margin: 0;
  padding: 1rem;
  background-color: var(--category-brand, #022851);
}
.heading--invert-box:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--invert-box {
    font-size: 1.7425rem;
  }
}
@media (min-width: 992px) {
  .heading--invert-box {
    padding: 1rem;
  }
}

:host {
  --list-arrow-color: #ffc519;
  --list-bordered-border: #dbeaf7;
  --list-faq-question: #13639e;
  --list-faq-question-hover: #001124;
  --list-faq-a: #022851;
  --list-pipe-pipe: #4c4c4c;
  --list-faq-prefix-spacing: 1.5rem;
  --list-bordered-vertical-spacing: 0.5rem;
}

.list--flush,
.list-wrapper--flush ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
}

.list--arrow li,
.list-wrapper--arrow ul li {
  position: relative;
  margin-left: -1ch;
  padding-left: 1ch;
}
.list--arrow li::marker,
.list-wrapper--arrow ul li::marker {
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
}
.list--arrow li li::marker,
.list-wrapper--arrow ul li li::marker {
  content: "";
  font-size: 1em;
}
.list--arrow li li li::marker,
.list-wrapper--arrow ul li li li::marker {
  content: "";
  font-size: 0.8em;
}

.list--white-arrow,
.list-wrapper--white-arrow ul {
  --list-arrow-color: #fff;
}
.list--white-arrow li,
.list-wrapper--white-arrow ul li {
  position: relative;
  margin-left: -1ch;
  padding-left: 1ch;
}
.list--white-arrow li::marker,
.list-wrapper--white-arrow ul li::marker {
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
}
.list--white-arrow li li::marker,
.list-wrapper--white-arrow ul li li::marker {
  content: "";
  font-size: 1em;
}
.list--white-arrow li li li::marker,
.list-wrapper--white-arrow ul li li li::marker {
  content: "";
  font-size: 0.8em;
}

.list--bordered,
.list-wrapper--bordered ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list--bordered ul,
.list-wrapper--bordered ul ul {
  margin-top: var(--list-bordered-vertical-spacing);
  border-top: 1px solid var(--list-bordered-border);
}
.list--bordered ul li:first-child,
.list-wrapper--bordered ul ul li:first-child {
  padding-top: var(--list-bordered-vertical-spacing);
}
.list--bordered li,
.list--bordered > div,
.list-wrapper--bordered ul li,
.list-wrapper--bordered ul > div {
  position: relative;
  margin-bottom: var(--list-bordered-vertical-spacing);
  padding: 0 0 var(--list-bordered-vertical-spacing) 2rem;
  border-bottom: 1px solid var(--list-bordered-border);
}
.list--bordered li:last-child,
.list--bordered > div:last-child,
.list-wrapper--bordered ul li:last-child,
.list-wrapper--bordered ul > div:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.list--bordered li:before,
.list--bordered > div:before,
.list-wrapper--bordered ul li:before,
.list-wrapper--bordered ul > div:before {
  position: absolute;
  margin: 0 0 0 -1.7em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.1;
}
.list--bordered li li,
.list--bordered > div li,
.list-wrapper--bordered ul li li,
.list-wrapper--bordered ul > div li {
  padding-left: 0;
}
.list--bordered li li:before,
.list--bordered > div li:before,
.list-wrapper--bordered ul li li:before,
.list-wrapper--bordered ul > div li:before {
  content: "";
}

.list--faq,
.list-wrapper--faq ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
  margin-left: 1rem;
}
.list--faq li,
.list-wrapper--faq ul li {
  list-style: none;
}
.list--faq > li,
.list-wrapper--faq ul > li {
  padding: 0 0.5rem 0.5rem var(--list-faq-prefix-spacing);
}
.list--faq > li:nth-child(odd),
.list-wrapper--faq ul > li:nth-child(odd) {
  padding-top: 0.5rem;
  color: var(--category-brand-contrast-color, var(--list-faq-question));
  cursor: pointer;
  font-weight: 800;
  text-decoration: none;
}
.list--faq > li:nth-child(odd):hover,
.list-wrapper--faq ul > li:nth-child(odd):hover {
  color: var(--category-brand-contrast-color, var(--list-faq-question-hover));
  opacity: 0.8;
}
.list--faq > li:nth-child(odd):not(:first-child),
.list-wrapper--faq ul > li:nth-child(odd):not(:first-child) {
  border-top: 1px solid var(--list-bordered-border);
}
.list--faq > li:nth-child(odd):before,
.list-wrapper--faq ul > li:nth-child(odd):before {
  display: inline-block;
  width: var(--list-faq-prefix-spacing);
  margin-left: calc(-1 * var(--list-faq-prefix-spacing));
  content: "Q:";
  font-weight: 800;
}
.list--faq > li:nth-child(odd) > p,
.list-wrapper--faq ul > li:nth-child(odd) > p {
  margin: 0;
}
.list--faq > li:nth-child(even),
.list-wrapper--faq ul > li:nth-child(even) {
  padding-bottom: 1rem;
}
.list--faq > li:nth-child(even):before,
.list-wrapper--faq ul > li:nth-child(even):before {
  display: inline-block;
  float: left;
  width: var(--list-faq-prefix-spacing);
  margin-left: calc(-1 * var(--list-faq-prefix-spacing));
  color: var(--category-brand-contrast-color, var(--list-faq-a));
  content: "A:";
  font-weight: 800;
}

.list--pipe,
.list-wrapper--pipe ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--pipe li,
.list-wrapper--pipe ul li {
  list-style: none;
}
.list--pipe li,
.list-wrapper--pipe ul li {
  display: inline-block;
  margin-right: 0.25rem;
  padding-right: 0.5rem;
  border-right: 1px solid var(--category-brand-contrast-color, var(--list-pipe-pipe));
  line-height: 1;
}
.list--pipe li:last-child,
.list-wrapper--pipe ul li:last-child {
  margin-right: 0;
  padding-right: 0;
  border-right: 0;
}

.list--comment {
  margin: 0;
  padding: 0;
  list-style: none;
  margin: 0;
  padding: 0 0 2rem;
}
.list--comment ul {
  margin-top: var(--list-bordered-vertical-spacing);
  border-top: 1px solid var(--list-bordered-border);
}
.list--comment ul li:first-child {
  padding-top: var(--list-bordered-vertical-spacing);
}
.list--comment li,
.list--comment > div {
  position: relative;
  margin-bottom: var(--list-bordered-vertical-spacing);
  padding: 0 0 var(--list-bordered-vertical-spacing) 2rem;
  border-bottom: 1px solid var(--list-bordered-border);
}
.list--comment li:last-child,
.list--comment > div:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.list--comment li:before,
.list--comment > div:before {
  position: absolute;
  margin: 0 0 0 -1.7em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.1;
}
.list--comment li li,
.list--comment > div li {
  padding-left: 0;
}
.list--comment li li:before,
.list--comment > div li:before {
  content: "";
}

.list--simple,
.list-wrapper--simple ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--simple li,
.list-wrapper--simple ul li {
  list-style: none;
}
.list--simple li,
.list-wrapper--simple ul li {
  margin-bottom: 0;
  font-size: 1rem;
  font-style: normal;
  margin-bottom: 1rem;
}
.list--simple li ul,
.list-wrapper--simple ul li ul {
  margin-top: 1rem;
}
.list--simple a,
.list-wrapper--simple ul a {
  font-weight: 400;
}

.list--filter {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--filter li {
  list-style: none;
}
.list--filter li {
  padding: 0.25rem 0 0.25rem 0.5rem;
}

.list--multilevel {
  list-style-type: decimal;
}
.list--multilevel ol {
  list-style-type: lower-alpha;
}
.list--multilevel ol ol {
  list-style-type: lower-roman;
}

.list--outline {
  list-style-type: upper-roman;
}
.list--outline ol {
  list-style-type: upper-alpha;
}
.list--outline ol ol {
  list-style-type: decimal;
}
.list--outline ol ol ol {
  list-style-type: lower-latin;
}
.list--outline ol ol ol ol {
  list-style-type: lower-roman;
}

.list--reset {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--reset li {
  list-style: none;
}

.list--accordion {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
  margin-bottom: 1rem;
}
.list--accordion li {
  list-style: none;
}
.list--accordion > li {
  padding: 0 0.5rem 0.5rem var(--list-faq-prefix-spacing);
}
.list--accordion > li:nth-child(odd) {
  position: relative;
  display: block;
  padding: 0.5rem 2rem;
  border: 0;
  border-bottom: 1px solid #cce0f3;
  background-color: #022851;
  color: #fff;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  text-align: left;
  white-space: normal;
}
.list--accordion > li:nth-child(odd):before {
  position: absolute;
  margin: -0.15em 0 0 -1.43em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.5;
}
.list--accordion > li:nth-child(odd) > p {
  margin: 0;
}
.list--accordion > li:nth-child(even) {
  padding: 0.5rem 2rem;
  background-color: #ebf3fa;
  color: #000;
}
.list--accordion .active:before {
  transform: rotate(90deg);
}

.list--download {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--download li {
  list-style: none;
}
.list--download a {
  color: #13639e;
  text-decoration: underline;
}
.list--download a:hover {
  color: #00b2e3;
}

.figcaption--left figcaption {
  text-align: left;
}
.figcaption--right figcaption {
  text-align: right;
}

.menu {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.menu li {
  list-style: none;
}
.menu li {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.menu li li {
  list-style: none;
}

.view-all {
  display: block;
  padding-top: 0.5rem;
  border-top: 1px solid #cce0f3;
}

.sf-underline {
  border-bottom: 1px solid #f7fafd;
}

.table--bordered > thead > tr > th,
.table--bordered > tr > th {
  border-bottom: 2px solid #ffbf00;
}

.table--striped > thead {
  background-color: #022851;
  color: #ffbf00;
}
.table--striped > thead a {
  color: #ffbf00;
}
.table--striped > thead h1,
.table--striped > thead h2,
.table--striped > thead h3,
.table--striped > thead h4,
.table--striped > thead h5,
.table--striped > thead h6 {
  color: #ffbf00;
}
.table--striped > tfoot {
  color: #000;
}
.table--striped > tfoot a {
  color: #000;
}
.table--striped > tfoot h1,
.table--striped > tfoot h2,
.table--striped > tfoot h3,
.table--striped > tfoot h4,
.table--striped > tfoot h5,
.table--striped > tfoot h6 {
  color: #000;
}
.table--striped > tbody > tr:nth-of-type(odd),
.table--striped > tr:nth-of-type(odd) {
  background-color: #e5e5e5;
}
.table--striped td {
  border-top: 0;
}
.table--striped > tfoot {
  background-color: #ccc;
}

.table--hover > thead {
  background-color: #022851;
  color: #fff;
}
.table--hover > thead a {
  color: #fff;
}
.table--hover > thead h1,
.table--hover > thead h2,
.table--hover > thead h3,
.table--hover > thead h4,
.table--hover > thead h5,
.table--hover > thead h6 {
  color: #fff;
}
.table--hover > tfoot {
  color: #000;
}
.table--hover > tfoot a {
  color: #000;
}
.table--hover > tfoot h1,
.table--hover > tfoot h2,
.table--hover > tfoot h3,
.table--hover > tfoot h4,
.table--hover > tfoot h5,
.table--hover > tfoot h6 {
  color: #000;
}
.table--hover > tbody > tr:hover,
.table--hover > tbody > tr:hover:nth-of-type(odd),
.table--hover > tr:hover,
.table--hover > tr:hover:nth-of-type(odd) {
  background-color: #13639e;
  color: #fff;
}
.table--hover td {
  border-top: 0;
}
.table--hover tr:hover h1,
.table--hover tr:hover h2,
.table--hover tr:hover h3,
.table--hover tr:hover h4,
.table--hover tr:hover h5,
.table--hover tr:hover h6 {
  color: #fff;
}
.table--hover tr:hover a {
  color: #fff;
  text-decoration: underline;
}
.table--hover > tfoot {
  background-color: #b0d0ed;
}
.table--hover > tfoot:hover a {
  color: #000;
}
.table--hover > tfoot:hover h1,
.table--hover > tfoot:hover h2,
.table--hover > tfoot:hover h3,
.table--hover > tfoot:hover h4,
.table--hover > tfoot:hover h5,
.table--hover > tfoot:hover h6 {
  color: #000;
}

.table--admin {
  border: 1px solid #ebf3fa;
  border-collapse: inherit;
  background-color: #fff;
}
.table--admin > thead {
  background-color: #022851;
  color: #fff;
}
.table--admin > thead a {
  color: #fff;
}
.table--admin > thead h1,
.table--admin > thead h2,
.table--admin > thead h3,
.table--admin > thead h4,
.table--admin > thead h5,
.table--admin > thead h6 {
  color: #fff;
}
.table--admin > tfoot {
  color: #000;
}
.table--admin > tfoot a {
  color: #000;
}
.table--admin > tfoot h1,
.table--admin > tfoot h2,
.table--admin > tfoot h3,
.table--admin > tfoot h4,
.table--admin > tfoot h5,
.table--admin > tfoot h6 {
  color: #000;
}
.table--admin mark {
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #f93549;
  color: #fff;
  font-size: 0.6875rem;
  text-transform: capitalize;
}
.table--admin a {
  text-decoration: underline;
}
.table--admin > thead > tr > th {
  border-bottom-width: 0;
}
.table--admin > thead img {
  margin-left: 0.5rem;
}
.table--admin > thead .active {
  border-right: 1px solid #b0d0ed;
  border-left: 1px solid #b0d0ed;
  background-color: #caecda;
}
.table--admin > thead .active .active {
  color: #022851;
}
.table--admin td {
  border-top: 1px solid #e5e5e5;
}
.table--admin > tbody > .drag-previous,
.table--admin > tbody > .drag-previous:nth-of-type(odd) {
  background-color: #fffbed;
}
.table--admin > tbody > .drag,
.table--admin > tbody > .drag:nth-of-type(odd) {
  background-color: #fffbed;
}
.table--admin > tfoot {
  background-color: #ffbf00;
}
.table--admin > tfoot > tr > th {
  border-top-width: 0;
  color: #191919;
  font-weight: normal;
}
.table--admin .active {
  border-right: 1px solid #dbeaf7;
  border-left: 1px solid #dbeaf7;
  background-color: #dcf3e7;
}

.font--secondary {
  font-family: "Ryman Eco", "Iowan Old Style", Georgia, "Times New Roman", Times, serif;
}

.font--monospace {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}

.caption {
  font-style: italic;
}

.hr-invert {
  border-color: rgba(255, 255, 255, 0.25);
}

.byline {
  margin-bottom: 0.5rem;
  color: #4c4c4c;
}

.pullquote {
  z-index: 1;
  min-height: 8.5rem;
  margin: 0 1rem;
  padding: 0;
  color: #022851;
  font-weight: 700;
  text-align: center;
}
@media (min-width: 480px) {
  .pullquote {
    margin-right: 4rem;
    margin-left: 4rem;
    font-size: 1.25rem;
  }
}
.category-brand__background .pullquote {
  color: var(--category-brand-contrast-color, #022851);
}
.pullquote em {
  position: relative;
  display: inline-block;
  padding: 0.5em 1.5em;
  color: #13639e;
  font-size: 0.875em;
  font-style: italic;
}
.category-brand__background .pullquote em {
  color: var(--category-brand-contrast-color, #13639e);
}
.pullquote em:before {
  position: absolute;
  z-index: -1;
  top: -0.125em;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  border: 0.25em solid #6fcfeb;
  content: "";
  transform: skewX(-15deg);
}
.category-brand__background .pullquote em:before {
  border-color: #fff;
  opacity: 0.5;
}
.pullquote:before {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  color: #e5e5e5;
  content: "“";
  font-size: 6rem;
  font-weight: 800;
  line-height: 0.8;
  transform: translateX(-50%);
}
@media (min-width: 768px) {
  .pullquote:before {
    font-size: 12rem;
  }
}
.category-brand__background .pullquote:before {
  border-color: #fff;
  opacity: 0.2;
}
.pullquote:after {
  position: absolute;
  z-index: -2;
  right: 0;
  bottom: 0;
  color: #e5e5e5;
  content: "”";
  font-size: 6rem;
  font-weight: 800;
  line-height: 0.8;
  transform: translateX(30%);
}
@media (min-width: 768px) {
  .pullquote:after {
    font-size: 12rem;
  }
}
.category-brand__background .pullquote:after {
  border-color: #fff;
  opacity: 0.2;
}
.pullquote--italic {
  font-style: italic;
}

.text--smaller {
  font-size: 0.9375rem;
}

.indent {
  margin-left: 0.75em;
}
@media (min-width: 992px) {
  .indent {
    margin-left: 2em;
  }
  .indent--large {
    margin-left: 4em;
  }
  .indent--giant {
    margin-left: 6em;
  }
  .indent--huge {
    margin-left: 8em;
  }
}
.indent--large {
  margin-left: 1.5em;
}
.indent--giant {
  margin-left: 2.25em;
}
.indent--huge {
  margin-left: 3em;
}

`},9248:(e,t,i)=>{i.d(t,{Z:()=>o});const o=i(5589).iv`

@charset "UTF-8";
:host {
  --list-arrow-color: #ffc519;
  --list-bordered-border: #dbeaf7;
  --list-faq-question: #13639e;
  --list-faq-question-hover: #001124;
  --list-faq-a: #022851;
  --list-pipe-pipe: #4c4c4c;
  --list-faq-prefix-spacing: 1.5rem;
  --list-bordered-vertical-spacing: 0.5rem;
}

.list--flush,
.list-wrapper--flush ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
}

.list--arrow li,
.list-wrapper--arrow ul li {
  position: relative;
  margin-left: -1ch;
  padding-left: 1ch;
}
.list--arrow li::marker,
.list-wrapper--arrow ul li::marker {
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
}
.list--arrow li li::marker,
.list-wrapper--arrow ul li li::marker {
  content: "";
  font-size: 1em;
}
.list--arrow li li li::marker,
.list-wrapper--arrow ul li li li::marker {
  content: "";
  font-size: 0.8em;
}

.list--white-arrow,
.list-wrapper--white-arrow ul {
  --list-arrow-color: #fff;
}
.list--white-arrow li,
.list-wrapper--white-arrow ul li {
  position: relative;
  margin-left: -1ch;
  padding-left: 1ch;
}
.list--white-arrow li::marker,
.list-wrapper--white-arrow ul li::marker {
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
}
.list--white-arrow li li::marker,
.list-wrapper--white-arrow ul li li::marker {
  content: "";
  font-size: 1em;
}
.list--white-arrow li li li::marker,
.list-wrapper--white-arrow ul li li li::marker {
  content: "";
  font-size: 0.8em;
}

.list--bordered,
.list-wrapper--bordered ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list--bordered ul,
.list-wrapper--bordered ul ul {
  margin-top: var(--list-bordered-vertical-spacing);
  border-top: 1px solid var(--list-bordered-border);
}
.list--bordered ul li:first-child,
.list-wrapper--bordered ul ul li:first-child {
  padding-top: var(--list-bordered-vertical-spacing);
}
.list--bordered li,
.list--bordered > div,
.list-wrapper--bordered ul li,
.list-wrapper--bordered ul > div {
  position: relative;
  margin-bottom: var(--list-bordered-vertical-spacing);
  padding: 0 0 var(--list-bordered-vertical-spacing) 2rem;
  border-bottom: 1px solid var(--list-bordered-border);
}
.list--bordered li:last-child,
.list--bordered > div:last-child,
.list-wrapper--bordered ul li:last-child,
.list-wrapper--bordered ul > div:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.list--bordered li:before,
.list--bordered > div:before,
.list-wrapper--bordered ul li:before,
.list-wrapper--bordered ul > div:before {
  position: absolute;
  margin: 0 0 0 -1.7em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.1;
}
.list--bordered li li,
.list--bordered > div li,
.list-wrapper--bordered ul li li,
.list-wrapper--bordered ul > div li {
  padding-left: 0;
}
.list--bordered li li:before,
.list--bordered > div li:before,
.list-wrapper--bordered ul li li:before,
.list-wrapper--bordered ul > div li:before {
  content: "";
}

.list--faq,
.list-wrapper--faq ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
  margin-left: 1rem;
}
.list--faq li,
.list-wrapper--faq ul li {
  list-style: none;
}
.list--faq > li,
.list-wrapper--faq ul > li {
  padding: 0 0.5rem 0.5rem var(--list-faq-prefix-spacing);
}
.list--faq > li:nth-child(odd),
.list-wrapper--faq ul > li:nth-child(odd) {
  padding-top: 0.5rem;
  color: var(--category-brand-contrast-color, var(--list-faq-question));
  cursor: pointer;
  font-weight: 800;
  text-decoration: none;
}
.list--faq > li:nth-child(odd):hover,
.list-wrapper--faq ul > li:nth-child(odd):hover {
  color: var(--category-brand-contrast-color, var(--list-faq-question-hover));
  opacity: 0.8;
}
.list--faq > li:nth-child(odd):not(:first-child),
.list-wrapper--faq ul > li:nth-child(odd):not(:first-child) {
  border-top: 1px solid var(--list-bordered-border);
}
.list--faq > li:nth-child(odd):before,
.list-wrapper--faq ul > li:nth-child(odd):before {
  display: inline-block;
  width: var(--list-faq-prefix-spacing);
  margin-left: calc(-1 * var(--list-faq-prefix-spacing));
  content: "Q:";
  font-weight: 800;
}
.list--faq > li:nth-child(odd) > p,
.list-wrapper--faq ul > li:nth-child(odd) > p {
  margin: 0;
}
.list--faq > li:nth-child(even),
.list-wrapper--faq ul > li:nth-child(even) {
  padding-bottom: 1rem;
}
.list--faq > li:nth-child(even):before,
.list-wrapper--faq ul > li:nth-child(even):before {
  display: inline-block;
  float: left;
  width: var(--list-faq-prefix-spacing);
  margin-left: calc(-1 * var(--list-faq-prefix-spacing));
  color: var(--category-brand-contrast-color, var(--list-faq-a));
  content: "A:";
  font-weight: 800;
}

.list--pipe,
.list-wrapper--pipe ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--pipe li,
.list-wrapper--pipe ul li {
  list-style: none;
}
.list--pipe li,
.list-wrapper--pipe ul li {
  display: inline-block;
  margin-right: 0.25rem;
  padding-right: 0.5rem;
  border-right: 1px solid var(--category-brand-contrast-color, var(--list-pipe-pipe));
  line-height: 1;
}
.list--pipe li:last-child,
.list-wrapper--pipe ul li:last-child {
  margin-right: 0;
  padding-right: 0;
  border-right: 0;
}

.list--comment {
  margin: 0;
  padding: 0;
  list-style: none;
  margin: 0;
  padding: 0 0 2rem;
}
.list--comment ul {
  margin-top: var(--list-bordered-vertical-spacing);
  border-top: 1px solid var(--list-bordered-border);
}
.list--comment ul li:first-child {
  padding-top: var(--list-bordered-vertical-spacing);
}
.list--comment li,
.list--comment > div {
  position: relative;
  margin-bottom: var(--list-bordered-vertical-spacing);
  padding: 0 0 var(--list-bordered-vertical-spacing) 2rem;
  border-bottom: 1px solid var(--list-bordered-border);
}
.list--comment li:last-child,
.list--comment > div:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.list--comment li:before,
.list--comment > div:before {
  position: absolute;
  margin: 0 0 0 -1.7em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.1;
}
.list--comment li li,
.list--comment > div li {
  padding-left: 0;
}
.list--comment li li:before,
.list--comment > div li:before {
  content: "";
}

.list--simple,
.list-wrapper--simple ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--simple li,
.list-wrapper--simple ul li {
  list-style: none;
}
.list--simple li,
.list-wrapper--simple ul li {
  margin-bottom: 0;
  font-size: 1rem;
  font-style: normal;
  margin-bottom: 1rem;
}
.list--simple li ul,
.list-wrapper--simple ul li ul {
  margin-top: 1rem;
}
.list--simple a,
.list-wrapper--simple ul a {
  font-weight: 400;
}

.list--filter {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--filter li {
  list-style: none;
}
.list--filter li {
  padding: 0.25rem 0 0.25rem 0.5rem;
}

.list--multilevel {
  list-style-type: decimal;
}
.list--multilevel ol {
  list-style-type: lower-alpha;
}
.list--multilevel ol ol {
  list-style-type: lower-roman;
}

.list--outline {
  list-style-type: upper-roman;
}
.list--outline ol {
  list-style-type: upper-alpha;
}
.list--outline ol ol {
  list-style-type: decimal;
}
.list--outline ol ol ol {
  list-style-type: lower-latin;
}
.list--outline ol ol ol ol {
  list-style-type: lower-roman;
}

.list--reset {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--reset li {
  list-style: none;
}

.list--accordion {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
  margin-bottom: 1rem;
}
.list--accordion li {
  list-style: none;
}
.list--accordion > li {
  padding: 0 0.5rem 0.5rem var(--list-faq-prefix-spacing);
}
.list--accordion > li:nth-child(odd) {
  position: relative;
  display: block;
  padding: 0.5rem 2rem;
  border: 0;
  border-bottom: 1px solid #cce0f3;
  background-color: #022851;
  color: #fff;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  text-align: left;
  white-space: normal;
}
.list--accordion > li:nth-child(odd):before {
  position: absolute;
  margin: -0.15em 0 0 -1.43em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.5;
}
.list--accordion > li:nth-child(odd) > p {
  margin: 0;
}
.list--accordion > li:nth-child(even) {
  padding: 0.5rem 2rem;
  background-color: #ebf3fa;
  color: #000;
}
.list--accordion .active:before {
  transform: rotate(90deg);
}

.list--download {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--download li {
  list-style: none;
}
.list--download a {
  color: #13639e;
  text-decoration: underline;
}
.list--download a:hover {
  color: #00b2e3;
}

`}}]);