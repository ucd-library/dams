/*! For license information please see 380-b385450e6f80074e1bc2.bundle.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[380],{7310:(e,t,n)=>{"use strict";var r=n(5589);let o={async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1};const i=/[&<>"']/,a=/[&<>"']/g,l=/[<>"']|&(?!#?\w+;)/,s=/[<>"']|&(?!#?\w+;)/g,c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},d=e=>c[e];function h(e,t){if(t){if(i.test(e))return e.replace(a,d)}else if(l.test(e))return e.replace(s,d);return e}const p=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function u(e){return e.replace(p,((e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const g=/(^|[^\[])\^/g;function f(e,t){e="string"==typeof e?e:e.source,t=t||"";const n={replace:(t,r)=>(r=(r=r.source||r).replace(g,"$1"),e=e.replace(t,r),n),getRegex:()=>new RegExp(e,t)};return n}const m=/[^\w:]/g,b=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function k(e,t,n){if(e){let e;try{e=decodeURIComponent(u(n)).replace(m,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!b.test(n)&&(n=function(e,t){x[" "+e]||(y.test(e)?x[" "+e]=e+"/":x[" "+e]=A(e,"/",!0));const n=-1===(e=x[" "+e]).indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(w,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(_,"$1")+t:e+t}(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n}const x={},y=/^[^:]+:\/*[^/]*$/,w=/^([^:]+:)[\s\S]*$/,_=/^([^:]+:\/*[^/]*)[\s\S]*$/,v={exec:function(){}};function T(e){let t,n,r=1;for(;r<arguments.length;r++)for(n in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function z(e,t){const n=e.replace(/\|/g,((e,t,n)=>{let r=!1,o=t;for(;--o>=0&&"\\"===n[o];)r=!r;return r?"|":" |"})).split(/ \|/);let r=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function A(e,t,n){const r=e.length;if(0===r)return"";let o=0;for(;o<r;){const i=e.charAt(r-o-1);if(i!==t||n){if(i===t||!n)break;o++}else o++}return e.slice(0,r-o)}function S(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function E(e,t){if(t<1)return"";let n="";for(;t>1;)1&t&&(n+=e),t>>=1,e+=e;return n+e}function R(e,t,n,r){const o=t.href,i=t.title?h(t.title):null,a=e[1].replace(/\\([\[\]])/g,"$1");if("!"!==e[0].charAt(0)){r.state.inLink=!0;const e={type:"link",raw:n,href:o,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,e}return{type:"image",raw:n,href:o,title:i,text:h(a)}}class N{constructor(e){this.options=e||o}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:A(e,"\n")}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],n=function(e,t){const n=e.match(/^(\s+)(?:```)/);if(null===n)return t;const r=n[1];return t.split("\n").map((e=>{const t=e.match(/^\s+/);if(null===t)return e;const[n]=t;return n.length>=r.length?e.slice(r.length):e})).join("\n")}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim():t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=A(e,"#");this.options.pedantic?e=t.trim():t&&!/ $/.test(t)||(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=t[0].replace(/^ *>[ \t]?/gm,"");return{type:"blockquote",raw:t[0],tokens:this.lexer.blockTokens(e,[]),text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n,r,o,i,a,l,s,c,d,h,p,u,g=t[1].trim();const f=g.length>1,m={type:"list",raw:"",ordered:f,start:f?+g.slice(0,-1):"",loose:!1,items:[]};g=f?`\\d{1,9}\\${g.slice(-1)}`:`\\${g}`,this.options.pedantic&&(g=f?g:"[*+-]");const b=new RegExp(`^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`);for(;e&&(u=!1,t=b.exec(e))&&!this.rules.block.hr.test(e);){if(n=t[0],e=e.substring(n.length),c=t[2].split("\n",1)[0],d=e.split("\n",1)[0],this.options.pedantic?(i=2,p=c.trimLeft()):(i=t[2].search(/[^ ]/),i=i>4?1:i,p=c.slice(i),i+=t[1].length),l=!1,!c&&/^ *$/.test(d)&&(n+=d+"\n",e=e.substring(d.length+1),u=!0),!u){const t=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`),r=new RegExp(`^ {0,${Math.min(3,i-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),o=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:\`\`\`|~~~)`),a=new RegExp(`^ {0,${Math.min(3,i-1)}}#`);for(;e&&(h=e.split("\n",1)[0],c=h,this.options.pedantic&&(c=c.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!o.test(c))&&!a.test(c)&&!t.test(c)&&!r.test(e);){if(c.search(/[^ ]/)>=i||!c.trim())p+="\n"+c.slice(i);else{if(l)break;p+="\n"+c}l||c.trim()||(l=!0),n+=h+"\n",e=e.substring(h.length+1)}}m.loose||(s?m.loose=!0:/\n *\n *$/.test(n)&&(s=!0)),this.options.gfm&&(r=/^\[[ xX]\] /.exec(p),r&&(o="[ ] "!==r[0],p=p.replace(/^\[[ xX]\] +/,""))),m.items.push({type:"list_item",raw:n,task:!!r,checked:o,loose:!1,text:p}),m.raw+=n}m.items[m.items.length-1].raw=n.trimRight(),m.items[m.items.length-1].text=p.trimRight(),m.raw=m.raw.trimRight();const k=m.items.length;for(a=0;a<k;a++){this.lexer.state.top=!1,m.items[a].tokens=this.lexer.blockTokens(m.items[a].text,[]);const e=m.items[a].tokens.filter((e=>"space"===e.type)),t=e.every((e=>{const t=e.raw.split("");let n=0;for(const e of t)if("\n"===e&&(n+=1),n>1)return!0;return!1}));!m.loose&&e.length&&t&&(m.loose=!0,m.items[a].loose=!0)}return m}}html(e){const t=this.rules.block.html.exec(e);if(t){const e={type:"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:t[0]};if(this.options.sanitize){const n=this.options.sanitizer?this.options.sanitizer(t[0]):h(t[0]);e.type="paragraph",e.text=n,e.tokens=this.lexer.inline(n)}return e}}def(e){const t=this.rules.block.def.exec(e);if(t)return t[3]&&(t[3]=t[3].substring(1,t[3].length-1)),{type:"def",tag:t[1].toLowerCase().replace(/\s+/g," "),raw:t[0],href:t[2],title:t[3]}}table(e){const t=this.rules.block.table.exec(e);if(t){const e={type:"table",header:z(t[1]).map((e=>({text:e}))),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(e.header.length===e.align.length){e.raw=t[0];let n,r,o,i,a=e.align.length;for(n=0;n<a;n++)/^ *-+: *$/.test(e.align[n])?e.align[n]="right":/^ *:-+: *$/.test(e.align[n])?e.align[n]="center":/^ *:-+ *$/.test(e.align[n])?e.align[n]="left":e.align[n]=null;for(a=e.rows.length,n=0;n<a;n++)e.rows[n]=z(e.rows[n],e.header.length).map((e=>({text:e})));for(a=e.header.length,r=0;r<a;r++)e.header[r].tokens=this.lexer.inline(e.header[r].text);for(a=e.rows.length,r=0;r<a;r++)for(i=e.rows[r],o=0;o<i.length;o++)i[o].tokens=this.lexer.inline(i[o].text);return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:h(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):h(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const t=A(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{const e=function(e,t){if(-1===e.indexOf(t[1]))return-1;const n=e.length;let r=0,o=0;for(;o<n;o++)if("\\"===e[o])o++;else if(e[o]===t[0])r++;else if(e[o]===t[1]&&(r--,r<0))return o;return-1}(t[2],"()");if(e>-1){const n=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=""}}let n=t[2],r="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return n=n.trim(),/^</.test(n)&&(n=this.options.pedantic&&!/>$/.test(e)?n.slice(1):n.slice(1,-1)),R(t,{href:n?n.replace(this.rules.inline._escapes,"$1"):n,title:r?r.replace(this.rules.inline._escapes,"$1"):r},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=(n[2]||n[1]).replace(/\s+/g," ");if(e=t[e.toLowerCase()],!e||!e.href){const e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return R(n,e,n[0],this.lexer)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrong.lDelim.exec(e);if(!r)return;if(r[3]&&n.match(/[\p{L}\p{N}]/u))return;const o=r[1]||r[2]||"";if(!o||o&&(""===n||this.rules.inline.punctuation.exec(n))){const n=r[0].length-1;let o,i,a=n,l=0;const s="*"===r[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(s.lastIndex=0,t=t.slice(-1*e.length+n);null!=(r=s.exec(t));){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=o.length,r[3]||r[4]){a+=i;continue}if((r[5]||r[6])&&n%3&&!((n+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);const t=e.slice(0,n+r.index+(r[0].length-o.length)+i);if(Math.min(n,i)%2){const e=t.slice(1,-1);return{type:"em",raw:t,text:e,tokens:this.lexer.inlineTokens(e)}}const s=t.slice(2,-2);return{type:"strong",raw:t,text:s,tokens:this.lexer.inlineTokens(s)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const n=/[^ ]/.test(e),r=/^ /.test(e)&&/ $/.test(e);return n&&r&&(e=e.substring(1,e.length-1)),e=h(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e,t){const n=this.rules.inline.autolink.exec(e);if(n){let e,r;return"@"===n[2]?(e=h(this.options.mangle?t(n[1]):n[1]),r="mailto:"+e):(e=h(n[1]),r=e),{type:"link",raw:n[0],text:e,href:r,tokens:[{type:"text",raw:e,text:e}]}}}url(e,t){let n;if(n=this.rules.inline.url.exec(e)){let e,r;if("@"===n[2])e=h(this.options.mangle?t(n[0]):n[0]),r="mailto:"+e;else{let t;do{t=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0]}while(t!==n[0]);e=h(n[0]),r="www."===n[1]?"http://"+e:e}return{type:"link",raw:n[0],text:e,href:r,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e,t){const n=this.rules.inline.text.exec(e);if(n){let e;return e=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):h(n[0]):n[0]:h(this.options.smartypants?t(n[0]):n[0]),{type:"text",raw:n[0],text:e}}}}const $={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:v,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};$.def=f($.def).replace("label",$._label).replace("title",$._title).getRegex(),$.bullet=/(?:[*+-]|\d{1,9}[.)])/,$.listItemStart=f(/^( *)(bull) */).replace("bull",$.bullet).getRegex(),$.list=f($.list).replace(/bull/g,$.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+$.def.source+")").getRegex(),$._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,$.html=f($.html,"i").replace("comment",$._comment).replace("tag",$._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),$.paragraph=f($._paragraph).replace("hr",$.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$._tag).getRegex(),$.blockquote=f($.blockquote).replace("paragraph",$.paragraph).getRegex(),$.normal=T({},$),$.gfm=T({},$.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),$.gfm.table=f($.gfm.table).replace("hr",$.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$._tag).getRegex(),$.gfm.paragraph=f($._paragraph).replace("hr",$.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",$.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$._tag).getRegex(),$.pedantic=T({},$.normal,{html:f("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",$._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:v,paragraph:f($.normal._paragraph).replace("hr",$.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",$.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const O={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:v,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:v,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function C(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function L(e){let t,n,r="";const o=e.length;for(t=0;t<o;t++)n=e.charCodeAt(t),Math.random()>.5&&(n="x"+n.toString(16)),r+="&#"+n+";";return r}O._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",O.punctuation=f(O.punctuation).replace(/punctuation/g,O._punctuation).getRegex(),O.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,O.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g,O._comment=f($._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),O.emStrong.lDelim=f(O.emStrong.lDelim).replace(/punct/g,O._punctuation).getRegex(),O.emStrong.rDelimAst=f(O.emStrong.rDelimAst,"g").replace(/punct/g,O._punctuation).getRegex(),O.emStrong.rDelimUnd=f(O.emStrong.rDelimUnd,"g").replace(/punct/g,O._punctuation).getRegex(),O._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,O._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,O._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,O.autolink=f(O.autolink).replace("scheme",O._scheme).replace("email",O._email).getRegex(),O._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,O.tag=f(O.tag).replace("comment",O._comment).replace("attribute",O._attribute).getRegex(),O._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,O._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,O._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,O.link=f(O.link).replace("label",O._label).replace("href",O._href).replace("title",O._title).getRegex(),O.reflink=f(O.reflink).replace("label",O._label).replace("ref",$._label).getRegex(),O.nolink=f(O.nolink).replace("ref",$._label).getRegex(),O.reflinkSearch=f(O.reflinkSearch,"g").replace("reflink",O.reflink).replace("nolink",O.nolink).getRegex(),O.normal=T({},O),O.pedantic=T({},O.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:f(/^!?\[(label)\]\((.*?)\)/).replace("label",O._label).getRegex(),reflink:f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",O._label).getRegex()}),O.gfm=T({},O.normal,{escape:f(O.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),O.gfm.url=f(O.gfm.url,"i").replace("email",O.gfm._extended_email).getRegex(),O.breaks=T({},O.gfm,{br:f(O.br).replace("{2,}","*").getRegex(),text:f(O.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});class I{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||o,this.options.tokenizer=this.options.tokenizer||new N,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:$.normal,inline:O.normal};this.options.pedantic?(t.block=$.pedantic,t.inline=O.pedantic):this.options.gfm&&(t.block=$.gfm,this.options.breaks?t.inline=O.breaks:t.inline=O.gfm),this.tokenizer.rules=t}static get rules(){return{block:$,inline:O}}static lex(e,t){return new I(t).lex(e)}static lexInline(e,t){return new I(t).inlineTokens(e)}lex(e){let t;for(e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){let n,r,o,i;for(e=this.options.pedantic?e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e.replace(/^( *)(\t+)/gm,((e,t,n)=>t+"    ".repeat(n.length)));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((r=>!!(n=r.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))))if(n=this.tokenizer.space(e))e=e.substring(n.raw.length),1===n.raw.length&&t.length>0?t[t.length-1].raw+="\n":t.push(n);else if(n=this.tokenizer.code(e))e=e.substring(n.raw.length),r=t[t.length-1],!r||"paragraph"!==r.type&&"text"!==r.type?t.push(n):(r.raw+="\n"+n.raw,r.text+="\n"+n.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text);else if(n=this.tokenizer.fences(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.heading(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.hr(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.blockquote(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.list(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.html(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.def(e))e=e.substring(n.raw.length),r=t[t.length-1],!r||"paragraph"!==r.type&&"text"!==r.type?this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title}):(r.raw+="\n"+n.raw,r.text+="\n"+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text);else if(n=this.tokenizer.table(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.lheading(e))e=e.substring(n.raw.length),t.push(n);else{if(o=e,this.options.extensions&&this.options.extensions.startBlock){let t=1/0;const n=e.slice(1);let r;this.options.extensions.startBlock.forEach((function(e){r=e.call({lexer:this},n),"number"==typeof r&&r>=0&&(t=Math.min(t,r))})),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(this.state.top&&(n=this.tokenizer.paragraph(o)))r=t[t.length-1],i&&"paragraph"===r.type?(r.raw+="\n"+n.raw,r.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n),i=o.length!==e.length,e=e.substring(n.raw.length);else if(n=this.tokenizer.text(e))e=e.substring(n.raw.length),r=t[t.length-1],r&&"text"===r.type?(r.raw+="\n"+n.raw,r.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,r,o,i,a,l,s=e;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(i=this.tokenizer.rules.inline.reflinkSearch.exec(s));)e.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+E("a",i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(i=this.tokenizer.rules.inline.blockSkip.exec(s));)s=s.slice(0,i.index)+"["+E("a",i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(i=this.tokenizer.rules.inline.escapedEmSt.exec(s));)s=s.slice(0,i.index+i[0].length-2)+"++"+s.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;e;)if(a||(l=""),a=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((r=>!!(n=r.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))))if(n=this.tokenizer.escape(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.tag(e))e=e.substring(n.raw.length),r=t[t.length-1],r&&"text"===n.type&&"text"===r.type?(r.raw+=n.raw,r.text+=n.text):t.push(n);else if(n=this.tokenizer.link(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(n.raw.length),r=t[t.length-1],r&&"text"===n.type&&"text"===r.type?(r.raw+=n.raw,r.text+=n.text):t.push(n);else if(n=this.tokenizer.emStrong(e,s,l))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.codespan(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.br(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.del(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.autolink(e,L))e=e.substring(n.raw.length),t.push(n);else if(this.state.inLink||!(n=this.tokenizer.url(e,L))){if(o=e,this.options.extensions&&this.options.extensions.startInline){let t=1/0;const n=e.slice(1);let r;this.options.extensions.startInline.forEach((function(e){r=e.call({lexer:this},n),"number"==typeof r&&r>=0&&(t=Math.min(t,r))})),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(n=this.tokenizer.inlineText(o,C))e=e.substring(n.raw.length),"_"!==n.raw.slice(-1)&&(l=n.raw.slice(-1)),a=!0,r=t[t.length-1],r&&"text"===r.type?(r.raw+=n.raw,r.text+=n.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}else e=e.substring(n.raw.length),t.push(n);return t}}class D{constructor(e){this.options=e||o}code(e,t,n){const r=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,r);null!=t&&t!==e&&(n=!0,e=t)}return e=e.replace(/\n$/,"")+"\n",r?'<pre><code class="'+this.options.langPrefix+h(r,!0)+'">'+(n?e:h(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:h(e,!0))+"</code></pre>\n"}blockquote(e){return`<blockquote>\n${e}</blockquote>\n`}html(e){return e}heading(e,t,n,r){return this.options.headerIds?`<h${t} id="${this.options.headerPrefix+r.slug(n)}">${e}</h${t}>\n`:`<h${t}>${e}</h${t}>\n`}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,n){const r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"}listitem(e){return`<li>${e}</li>\n`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>\n`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return`<tr>\n${e}</tr>\n`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>\n`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){if(null===(e=k(this.options.sanitize,this.options.baseUrl,e)))return n;let r='<a href="'+h(e)+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){if(null===(e=k(this.options.sanitize,this.options.baseUrl,e)))return n;let r=`<img src="${e}" alt="${n}"`;return t&&(r+=` title="${t}"`),r+=this.options.xhtml?"/>":">",r}text(e){return e}}class M{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class F{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let n=e,r=0;if(this.seen.hasOwnProperty(n)){r=this.seen[e];do{r++,n=e+"-"+r}while(this.seen.hasOwnProperty(n))}return t||(this.seen[e]=r,this.seen[n]=0),n}slug(e,t={}){const n=this.serialize(e);return this.getNextSafeSlug(n,t.dryrun)}}class U{constructor(e){this.options=e||o,this.options.renderer=this.options.renderer||new D,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new M,this.slugger=new F}static parse(e,t){return new U(t).parse(e)}static parseInline(e,t){return new U(t).parseInline(e)}parse(e,t=!0){let n,r,o,i,a,l,s,c,d,h,p,g,f,m,b,k,x,y,w,_="";const v=e.length;for(n=0;n<v;n++)if(h=e[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[h.type]&&(w=this.options.extensions.renderers[h.type].call({parser:this},h),!1!==w||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(h.type)))_+=w||"";else switch(h.type){case"space":continue;case"hr":_+=this.renderer.hr();continue;case"heading":_+=this.renderer.heading(this.parseInline(h.tokens),h.depth,u(this.parseInline(h.tokens,this.textRenderer)),this.slugger);continue;case"code":_+=this.renderer.code(h.text,h.lang,h.escaped);continue;case"table":for(c="",s="",i=h.header.length,r=0;r<i;r++)s+=this.renderer.tablecell(this.parseInline(h.header[r].tokens),{header:!0,align:h.align[r]});for(c+=this.renderer.tablerow(s),d="",i=h.rows.length,r=0;r<i;r++){for(l=h.rows[r],s="",a=l.length,o=0;o<a;o++)s+=this.renderer.tablecell(this.parseInline(l[o].tokens),{header:!1,align:h.align[o]});d+=this.renderer.tablerow(s)}_+=this.renderer.table(c,d);continue;case"blockquote":d=this.parse(h.tokens),_+=this.renderer.blockquote(d);continue;case"list":for(p=h.ordered,g=h.start,f=h.loose,i=h.items.length,d="",r=0;r<i;r++)b=h.items[r],k=b.checked,x=b.task,m="",b.task&&(y=this.renderer.checkbox(k),f?b.tokens.length>0&&"paragraph"===b.tokens[0].type?(b.tokens[0].text=y+" "+b.tokens[0].text,b.tokens[0].tokens&&b.tokens[0].tokens.length>0&&"text"===b.tokens[0].tokens[0].type&&(b.tokens[0].tokens[0].text=y+" "+b.tokens[0].tokens[0].text)):b.tokens.unshift({type:"text",text:y}):m+=y),m+=this.parse(b.tokens,f),d+=this.renderer.listitem(m,x,k);_+=this.renderer.list(d,p,g);continue;case"html":_+=this.renderer.html(h.text);continue;case"paragraph":_+=this.renderer.paragraph(this.parseInline(h.tokens));continue;case"text":for(d=h.tokens?this.parseInline(h.tokens):h.text;n+1<v&&"text"===e[n+1].type;)h=e[++n],d+="\n"+(h.tokens?this.parseInline(h.tokens):h.text);_+=t?this.renderer.paragraph(d):d;continue;default:{const e='Token with "'+h.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return _}parseInline(e,t){t=t||this.renderer;let n,r,o,i="";const a=e.length;for(n=0;n<a;n++)if(r=e[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]&&(o=this.options.extensions.renderers[r.type].call({parser:this},r),!1!==o||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)))i+=o||"";else switch(r.type){case"escape":case"text":i+=t.text(r.text);break;case"html":i+=t.html(r.text);break;case"link":i+=t.link(r.href,r.title,this.parseInline(r.tokens,t));break;case"image":i+=t.image(r.href,r.title,r.text);break;case"strong":i+=t.strong(this.parseInline(r.tokens,t));break;case"em":i+=t.em(this.parseInline(r.tokens,t));break;case"codespan":i+=t.codespan(r.text);break;case"br":i+=t.br();break;case"del":i+=t.del(this.parseInline(r.tokens,t));break;default:{const e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return i}}function j(e,t,n){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if("function"==typeof t&&(n=t,t=null),S(t=T({},j.defaults,t||{})),n){const r=t.highlight;let o;try{o=I.lex(e,t)}catch(e){return n(e)}const i=function(e){let i;if(!e)try{t.walkTokens&&j.walkTokens(o,t.walkTokens),i=U.parse(o,t)}catch(t){e=t}return t.highlight=r,e?n(e):n(null,i)};if(!r||r.length<3)return i();if(delete t.highlight,!o.length)return i();let a=0;return j.walkTokens(o,(function(e){"code"===e.type&&(a++,setTimeout((()=>{r(e.text,e.lang,(function(t,n){if(t)return i(t);null!=n&&n!==e.text&&(e.text=n,e.escaped=!0),a--,0===a&&i()}))}),0))})),void(0===a&&i())}function r(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+h(e.message+"",!0)+"</pre>";throw e}try{const n=I.lex(e,t);if(t.walkTokens){if(t.async)return Promise.all(j.walkTokens(n,t.walkTokens)).then((()=>U.parse(n,t))).catch(r);j.walkTokens(n,t.walkTokens)}return U.parse(n,t)}catch(e){r(e)}}j.options=j.setOptions=function(e){var t;return T(j.defaults,e),t=j.defaults,o=t,j},j.getDefaults=function(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}},j.defaults=o,j.use=function(...e){const t=T({},...e),n=j.defaults.extensions||{renderers:{},childTokens:{}};let r;e.forEach((e=>{if(e.extensions&&(r=!0,e.extensions.forEach((e=>{if(!e.name)throw new Error("extension name required");if(e.renderer){const t=n.renderers?n.renderers[e.name]:null;n.renderers[e.name]=t?function(...n){let r=e.renderer.apply(this,n);return!1===r&&(r=t.apply(this,n)),r}:e.renderer}if(e.tokenizer){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");n[e.level]?n[e.level].unshift(e.tokenizer):n[e.level]=[e.tokenizer],e.start&&("block"===e.level?n.startBlock?n.startBlock.push(e.start):n.startBlock=[e.start]:"inline"===e.level&&(n.startInline?n.startInline.push(e.start):n.startInline=[e.start]))}e.childTokens&&(n.childTokens[e.name]=e.childTokens)}))),e.renderer){const n=j.defaults.renderer||new D;for(const t in e.renderer){const r=n[t];n[t]=(...o)=>{let i=e.renderer[t].apply(n,o);return!1===i&&(i=r.apply(n,o)),i}}t.renderer=n}if(e.tokenizer){const n=j.defaults.tokenizer||new N;for(const t in e.tokenizer){const r=n[t];n[t]=(...o)=>{let i=e.tokenizer[t].apply(n,o);return!1===i&&(i=r.apply(n,o)),i}}t.tokenizer=n}if(e.walkTokens){const n=j.defaults.walkTokens;t.walkTokens=function(t){let r=[];return r.push(e.walkTokens.call(this,t)),n&&(r=r.concat(n.call(this,t))),r}}r&&(t.extensions=n),j.setOptions(t)}))},j.walkTokens=function(e,t){let n=[];for(const r of e)switch(n=n.concat(t.call(j,r)),r.type){case"table":for(const e of r.header)n=n.concat(j.walkTokens(e.tokens,t));for(const e of r.rows)for(const r of e)n=n.concat(j.walkTokens(r.tokens,t));break;case"list":n=n.concat(j.walkTokens(r.items,t));break;default:j.defaults.extensions&&j.defaults.extensions.childTokens&&j.defaults.extensions.childTokens[r.type]?j.defaults.extensions.childTokens[r.type].forEach((function(e){n=n.concat(j.walkTokens(r[e],t))})):r.tokens&&(n=n.concat(j.walkTokens(r.tokens,t)))}return n},j.parseInline=function(e,t){if(null==e)throw new Error("marked.parseInline(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");S(t=T({},j.defaults,t||{}));try{const n=I.lexInline(e,t);return t.walkTokens&&j.walkTokens(n,t.walkTokens),U.parseInline(n,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+h(e.message+"",!0)+"</pre>";throw e}},j.Parser=U,j.parser=U.parse,j.Renderer=D,j.TextRenderer=M,j.Lexer=I,j.lexer=I.lex,j.Tokenizer=N,j.Slugger=F,j.parse=j,j.options,j.setOptions,j.use,j.walkTokens,j.parseInline,U.parse,I.lex;var B=n(7761),H=n.n(B),P=n(8337);class q extends r.oi{static get properties(){return{}}mutationObserver=new P.F(this,{characterData:!0,attributes:!1,childList:!0,subtree:!0});constructor(){super()}createRenderRoot(){return this.style.display="none",this}_onChildListMutation(){this.dispatchEvent(new CustomEvent("content-updated",{bubbles:!0}))}}customElements.define("ucdlib-md-content",q);class Z extends r.oi{static get properties(){return{data:{type:String},renderer:{type:Object},use:{type:Object},options:{type:Object}}}mutationObserver=new P.F(this,{characterData:!0,attributes:!1,childList:!0,subtree:!0});constructor(){super(),this.data="",this.renderer=null,this.renderedElement=document.createElement("div"),this.renderedElement.setAttribute("rendered","")}createRenderRoot(){return this.appendChild(this.renderedElement),this}_onChildListMutation(){this.contentElement||(this.contentElement=this.querySelector("ucdlib-md-content"),this.contentElement&&this.contentElement.addEventListener("content-updated",this._updateFromContentElementMd.bind(this)))}disconnectedCallback(){this.contentElement&&this.contentElement.removeEventListener("content-updated",this._updateFromContentElementMd.bind(this))}updated(){this._setRendererOverrides(),this.data=H().sanitize(j.parse(this.data)),this.renderedElement.innerHTML=this.data}_updateFromContentElementMd(){this.data=this.contentElement.innerText.split("\n").map((e=>e.trim())).join("\n")}_setRendererOverrides(){this.renderer||(this.renderer={list(e,t,n){let r="";return r=t?`<ul class="list--multilevel">${e}</ul>`:`<ul class="list--bordered">${e}</ul>`,r}}),this.options||(this.options={breaks:!0,gfm:!0}),this.use||(this.use={renderer:this.renderer}),j.use(this.use),j.setOptions(this.options)}}customElements.define("ucdlib-md",Z)},7598:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(5589).iv`

a {
  color: #13639e;
  text-decoration: underline;
  outline: 0;
}
a:hover {
  color: #00b2e3;
}
a:focus {
  color: #00b2e3;
}
a:active {
  color: #035369;
  outline: none;
}

`},1479:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(5589).iv`

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

`},395:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(5589).iv`

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

`},8083:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(5589).iv`

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

`},7761:function(e){e.exports=function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,n){return t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},t(e,n)}function n(e,r,o){return n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()?Reflect.construct:function(e,n,r){var o=[null];o.push.apply(o,n);var i=new(Function.bind.apply(e,o));return r&&t(i,r.prototype),i},n.apply(null,arguments)}function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var i=Object.hasOwnProperty,a=Object.setPrototypeOf,l=Object.isFrozen,s=Object.getPrototypeOf,c=Object.getOwnPropertyDescriptor,d=Object.freeze,h=Object.seal,p=Object.create,u="undefined"!=typeof Reflect&&Reflect,g=u.apply,f=u.construct;g||(g=function(e,t,n){return e.apply(t,n)}),d||(d=function(e){return e}),h||(h=function(e){return e}),f||(f=function(e,t){return n(e,r(t))});var m,b=S(Array.prototype.forEach),k=S(Array.prototype.pop),x=S(Array.prototype.push),y=S(String.prototype.toLowerCase),w=S(String.prototype.match),_=S(String.prototype.replace),v=S(String.prototype.indexOf),T=S(String.prototype.trim),z=S(RegExp.prototype.test),A=(m=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return f(m,t)});function S(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return g(e,t,r)}}function E(e,t,n){n=n||y,a&&a(e,null);for(var r=t.length;r--;){var o=t[r];if("string"==typeof o){var i=n(o);i!==o&&(l(t)||(t[r]=i),o=i)}e[o]=!0}return e}function R(e){var t,n=p(null);for(t in e)g(i,e,[t])&&(n[t]=e[t]);return n}function N(e,t){for(;null!==e;){var n=c(e,t);if(n){if(n.get)return S(n.get);if("function"==typeof n.value)return S(n.value)}e=s(e)}return function(e){return console.warn("fallback value for",e),null}}var $=d(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),O=d(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),C=d(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),L=d(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),I=d(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),D=d(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),M=d(["#text"]),F=d(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),U=d(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),j=d(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),B=d(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),H=h(/\{\{[\w\W]*|[\w\W]*\}\}/gm),P=h(/<%[\w\W]*|[\w\W]*%>/gm),q=h(/^data-[\-\w.\u00B7-\uFFFF]/),Z=h(/^aria-[\-\w]+$/),G=h(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),W=h(/^(?:\w+script|data):/i),X=h(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Q=h(/^html$/i),Y=function(){return"undefined"==typeof window?null:window},V=function(t,n){if("object"!==e(t)||"function"!=typeof t.createPolicy)return null;var r=null,o="data-tt-policy-suffix";n.currentScript&&n.currentScript.hasAttribute(o)&&(r=n.currentScript.getAttribute(o));var i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML:function(e){return e},createScriptURL:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+i+" could not be created."),null}};return function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y(),o=function(e){return t(e)};if(o.version="2.4.0",o.removed=[],!n||!n.document||9!==n.document.nodeType)return o.isSupported=!1,o;var i=n.document,a=n.document,l=n.DocumentFragment,s=n.HTMLTemplateElement,c=n.Node,h=n.Element,p=n.NodeFilter,u=n.NamedNodeMap,g=void 0===u?n.NamedNodeMap||n.MozNamedAttrMap:u,f=n.HTMLFormElement,m=n.DOMParser,S=n.trustedTypes,K=h.prototype,J=N(K,"cloneNode"),ee=N(K,"nextSibling"),te=N(K,"childNodes"),ne=N(K,"parentNode");if("function"==typeof s){var re=a.createElement("template");re.content&&re.content.ownerDocument&&(a=re.content.ownerDocument)}var oe=V(S,i),ie=oe?oe.createHTML(""):"",ae=a,le=ae.implementation,se=ae.createNodeIterator,ce=ae.createDocumentFragment,de=ae.getElementsByTagName,he=i.importNode,pe={};try{pe=R(a).documentMode?a.documentMode:{}}catch(e){}var ue={};o.isSupported="function"==typeof ne&&le&&void 0!==le.createHTMLDocument&&9!==pe;var ge,fe,me=H,be=P,ke=q,xe=Z,ye=W,we=X,_e=G,ve=null,Te=E({},[].concat(r($),r(O),r(C),r(I),r(M))),ze=null,Ae=E({},[].concat(r(F),r(U),r(j),r(B))),Se=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ee=null,Re=null,Ne=!0,$e=!0,Oe=!1,Ce=!1,Le=!1,Ie=!1,De=!1,Me=!1,Fe=!1,Ue=!1,je=!0,Be=!1,He=!0,Pe=!1,qe={},Ze=null,Ge=E({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),We=null,Xe=E({},["audio","video","img","source","image","track"]),Qe=null,Ye=E({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ve="http://www.w3.org/1998/Math/MathML",Ke="http://www.w3.org/2000/svg",Je="http://www.w3.org/1999/xhtml",et=Je,tt=!1,nt=["application/xhtml+xml","text/html"],rt=null,ot=a.createElement("form"),it=function(e){return e instanceof RegExp||e instanceof Function},at=function(t){rt&&rt===t||(t&&"object"===e(t)||(t={}),t=R(t),ge=ge=-1===nt.indexOf(t.PARSER_MEDIA_TYPE)?"text/html":t.PARSER_MEDIA_TYPE,fe="application/xhtml+xml"===ge?function(e){return e}:y,ve="ALLOWED_TAGS"in t?E({},t.ALLOWED_TAGS,fe):Te,ze="ALLOWED_ATTR"in t?E({},t.ALLOWED_ATTR,fe):Ae,Qe="ADD_URI_SAFE_ATTR"in t?E(R(Ye),t.ADD_URI_SAFE_ATTR,fe):Ye,We="ADD_DATA_URI_TAGS"in t?E(R(Xe),t.ADD_DATA_URI_TAGS,fe):Xe,Ze="FORBID_CONTENTS"in t?E({},t.FORBID_CONTENTS,fe):Ge,Ee="FORBID_TAGS"in t?E({},t.FORBID_TAGS,fe):{},Re="FORBID_ATTR"in t?E({},t.FORBID_ATTR,fe):{},qe="USE_PROFILES"in t&&t.USE_PROFILES,Ne=!1!==t.ALLOW_ARIA_ATTR,$e=!1!==t.ALLOW_DATA_ATTR,Oe=t.ALLOW_UNKNOWN_PROTOCOLS||!1,Ce=t.SAFE_FOR_TEMPLATES||!1,Le=t.WHOLE_DOCUMENT||!1,Me=t.RETURN_DOM||!1,Fe=t.RETURN_DOM_FRAGMENT||!1,Ue=t.RETURN_TRUSTED_TYPE||!1,De=t.FORCE_BODY||!1,je=!1!==t.SANITIZE_DOM,Be=t.SANITIZE_NAMED_PROPS||!1,He=!1!==t.KEEP_CONTENT,Pe=t.IN_PLACE||!1,_e=t.ALLOWED_URI_REGEXP||_e,et=t.NAMESPACE||Je,t.CUSTOM_ELEMENT_HANDLING&&it(t.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Se.tagNameCheck=t.CUSTOM_ELEMENT_HANDLING.tagNameCheck),t.CUSTOM_ELEMENT_HANDLING&&it(t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Se.attributeNameCheck=t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),t.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Se.allowCustomizedBuiltInElements=t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&($e=!1),Fe&&(Me=!0),qe&&(ve=E({},r(M)),ze=[],!0===qe.html&&(E(ve,$),E(ze,F)),!0===qe.svg&&(E(ve,O),E(ze,U),E(ze,B)),!0===qe.svgFilters&&(E(ve,C),E(ze,U),E(ze,B)),!0===qe.mathMl&&(E(ve,I),E(ze,j),E(ze,B))),t.ADD_TAGS&&(ve===Te&&(ve=R(ve)),E(ve,t.ADD_TAGS,fe)),t.ADD_ATTR&&(ze===Ae&&(ze=R(ze)),E(ze,t.ADD_ATTR,fe)),t.ADD_URI_SAFE_ATTR&&E(Qe,t.ADD_URI_SAFE_ATTR,fe),t.FORBID_CONTENTS&&(Ze===Ge&&(Ze=R(Ze)),E(Ze,t.FORBID_CONTENTS,fe)),He&&(ve["#text"]=!0),Le&&E(ve,["html","head","body"]),ve.table&&(E(ve,["tbody"]),delete Ee.tbody),d&&d(t),rt=t)},lt=E({},["mi","mo","mn","ms","mtext"]),st=E({},["foreignobject","desc","title","annotation-xml"]),ct=E({},["title","style","font","a","script"]),dt=E({},O);E(dt,C),E(dt,L);var ht=E({},I);E(ht,D);var pt=function(e){x(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=ie}catch(t){e.remove()}}},ut=function(e,t){try{x(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){x(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!ze[e])if(Me||Fe)try{pt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},gt=function(e){var t,n;if(De)e="<remove></remove>"+e;else{var r=w(e,/^[\r\n\t ]+/);n=r&&r[0]}"application/xhtml+xml"===ge&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var o=oe?oe.createHTML(e):e;if(et===Je)try{t=(new m).parseFromString(o,ge)}catch(e){}if(!t||!t.documentElement){t=le.createDocument(et,"template",null);try{t.documentElement.innerHTML=tt?"":o}catch(e){}}var i=t.body||t.documentElement;return e&&n&&i.insertBefore(a.createTextNode(n),i.childNodes[0]||null),et===Je?de.call(t,Le?"html":"body")[0]:Le?t.documentElement:i},ft=function(e){return se.call(e.ownerDocument||e,e,p.SHOW_ELEMENT|p.SHOW_COMMENT|p.SHOW_TEXT,null,!1)},mt=function(t){return"object"===e(c)?t instanceof c:t&&"object"===e(t)&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName},bt=function(e,t,n){ue[e]&&b(ue[e],(function(e){e.call(o,t,n,rt)}))},kt=function(e){var t,n;if(bt("beforeSanitizeElements",e,null),(n=e)instanceof f&&("string"!=typeof n.nodeName||"string"!=typeof n.textContent||"function"!=typeof n.removeChild||!(n.attributes instanceof g)||"function"!=typeof n.removeAttribute||"function"!=typeof n.setAttribute||"string"!=typeof n.namespaceURI||"function"!=typeof n.insertBefore))return pt(e),!0;if(z(/[\u0080-\uFFFF]/,e.nodeName))return pt(e),!0;var r=fe(e.nodeName);if(bt("uponSanitizeElement",e,{tagName:r,allowedTags:ve}),e.hasChildNodes()&&!mt(e.firstElementChild)&&(!mt(e.content)||!mt(e.content.firstElementChild))&&z(/<[/\w]/g,e.innerHTML)&&z(/<[/\w]/g,e.textContent))return pt(e),!0;if("select"===r&&z(/<template/i,e.innerHTML))return pt(e),!0;if(!ve[r]||Ee[r]){if(!Ee[r]&&yt(r)){if(Se.tagNameCheck instanceof RegExp&&z(Se.tagNameCheck,r))return!1;if(Se.tagNameCheck instanceof Function&&Se.tagNameCheck(r))return!1}if(He&&!Ze[r]){var i=ne(e)||e.parentNode,a=te(e)||e.childNodes;if(a&&i)for(var l=a.length-1;l>=0;--l)i.insertBefore(J(a[l],!0),ee(e))}return pt(e),!0}return e instanceof h&&!function(e){var t=ne(e);t&&t.tagName||(t={namespaceURI:Je,tagName:"template"});var n=y(e.tagName),r=y(t.tagName);return e.namespaceURI===Ke?t.namespaceURI===Je?"svg"===n:t.namespaceURI===Ve?"svg"===n&&("annotation-xml"===r||lt[r]):Boolean(dt[n]):e.namespaceURI===Ve?t.namespaceURI===Je?"math"===n:t.namespaceURI===Ke?"math"===n&&st[r]:Boolean(ht[n]):e.namespaceURI===Je&&!(t.namespaceURI===Ke&&!st[r])&&!(t.namespaceURI===Ve&&!lt[r])&&!ht[n]&&(ct[n]||!dt[n])}(e)?(pt(e),!0):"noscript"!==r&&"noembed"!==r||!z(/<\/no(script|embed)/i,e.innerHTML)?(Ce&&3===e.nodeType&&(t=e.textContent,t=_(t,me," "),t=_(t,be," "),e.textContent!==t&&(x(o.removed,{element:e.cloneNode()}),e.textContent=t)),bt("afterSanitizeElements",e,null),!1):(pt(e),!0)},xt=function(e,t,n){if(je&&("id"===t||"name"===t)&&(n in a||n in ot))return!1;if($e&&!Re[t]&&z(ke,t));else if(Ne&&z(xe,t));else if(!ze[t]||Re[t]){if(!(yt(e)&&(Se.tagNameCheck instanceof RegExp&&z(Se.tagNameCheck,e)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(e))&&(Se.attributeNameCheck instanceof RegExp&&z(Se.attributeNameCheck,t)||Se.attributeNameCheck instanceof Function&&Se.attributeNameCheck(t))||"is"===t&&Se.allowCustomizedBuiltInElements&&(Se.tagNameCheck instanceof RegExp&&z(Se.tagNameCheck,n)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))))return!1}else if(Qe[t]);else if(z(_e,_(n,we,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==v(n,"data:")||!We[e])if(Oe&&!z(ye,_(n,we,"")));else if(n)return!1;return!0},yt=function(e){return e.indexOf("-")>0},wt=function(t){var n,r,i,a;bt("beforeSanitizeAttributes",t,null);var l=t.attributes;if(l){var s={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ze};for(a=l.length;a--;){var c=n=l[a],d=c.name,h=c.namespaceURI;if(r="value"===d?n.value:T(n.value),i=fe(d),s.attrName=i,s.attrValue=r,s.keepAttr=!0,s.forceKeepAttr=void 0,bt("uponSanitizeAttribute",t,s),r=s.attrValue,!s.forceKeepAttr&&(ut(d,t),s.keepAttr))if(z(/\/>/i,r))ut(d,t);else{Ce&&(r=_(r,me," "),r=_(r,be," "));var p=fe(t.nodeName);if(xt(p,i,r)){if(!Be||"id"!==i&&"name"!==i||(ut(d,t),r="user-content-"+r),oe&&"object"===e(S)&&"function"==typeof S.getAttributeType)if(h);else switch(S.getAttributeType(p,i)){case"TrustedHTML":r=oe.createHTML(r);break;case"TrustedScriptURL":r=oe.createScriptURL(r)}try{h?t.setAttributeNS(h,d,r):t.setAttribute(d,r),k(o.removed)}catch(e){}}}}bt("afterSanitizeAttributes",t,null)}},_t=function e(t){var n,r=ft(t);for(bt("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)bt("uponSanitizeShadowNode",n,null),kt(n)||(n.content instanceof l&&e(n.content),wt(n));bt("afterSanitizeShadowDOM",t,null)};return o.sanitize=function(t){var r,a,s,d,h,p=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if((tt=!t)&&(t="\x3c!--\x3e"),"string"!=typeof t&&!mt(t)){if("function"!=typeof t.toString)throw A("toString is not a function");if("string"!=typeof(t=t.toString()))throw A("dirty is not a string, aborting")}if(!o.isSupported){if("object"===e(n.toStaticHTML)||"function"==typeof n.toStaticHTML){if("string"==typeof t)return n.toStaticHTML(t);if(mt(t))return n.toStaticHTML(t.outerHTML)}return t}if(Ie||at(p),o.removed=[],"string"==typeof t&&(Pe=!1),Pe){if(t.nodeName){var u=fe(t.nodeName);if(!ve[u]||Ee[u])throw A("root node is forbidden and cannot be sanitized in-place")}}else if(t instanceof c)1===(a=(r=gt("\x3c!----\x3e")).ownerDocument.importNode(t,!0)).nodeType&&"BODY"===a.nodeName||"HTML"===a.nodeName?r=a:r.appendChild(a);else{if(!Me&&!Ce&&!Le&&-1===t.indexOf("<"))return oe&&Ue?oe.createHTML(t):t;if(!(r=gt(t)))return Me?null:Ue?ie:""}r&&De&&pt(r.firstChild);for(var g=ft(Pe?t:r);s=g.nextNode();)3===s.nodeType&&s===d||kt(s)||(s.content instanceof l&&_t(s.content),wt(s),d=s);if(d=null,Pe)return t;if(Me){if(Fe)for(h=ce.call(r.ownerDocument);r.firstChild;)h.appendChild(r.firstChild);else h=r;return ze.shadowroot&&(h=he.call(i,h,!0)),h}var f=Le?r.outerHTML:r.innerHTML;return Le&&ve["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&z(Q,r.ownerDocument.doctype.name)&&(f="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+f),Ce&&(f=_(f,me," "),f=_(f,be," ")),oe&&Ue?oe.createHTML(f):f},o.setConfig=function(e){at(e),Ie=!0},o.clearConfig=function(){rt=null,Ie=!1},o.isValidAttribute=function(e,t,n){rt||at({});var r=fe(e),o=fe(t);return xt(r,o,n)},o.addHook=function(e,t){"function"==typeof t&&(ue[e]=ue[e]||[],x(ue[e],t))},o.removeHook=function(e){if(ue[e])return k(ue[e])},o.removeHooks=function(e){ue[e]&&(ue[e]=[])},o.removeAllHooks=function(){ue={}},o}()}()}}]);