(()=>{var it=Object.create;var K=Object.defineProperty,at=Object.defineProperties,lt=Object.getOwnPropertyDescriptor,ct=Object.getOwnPropertyDescriptors,dt=Object.getOwnPropertyNames,Ae=Object.getOwnPropertySymbols,ft=Object.getPrototypeOf,Oe=Object.prototype.hasOwnProperty,ut=Object.prototype.propertyIsEnumerable;var ie=(n,e,t)=>e in n?K(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,P=(n,e)=>{for(var t in e||(e={}))Oe.call(e,t)&&ie(n,t,e[t]);if(Ae)for(var t of Ae(e))ut.call(e,t)&&ie(n,t,e[t]);return n},ae=(n,e)=>at(n,ct(e)),pt=n=>K(n,"__esModule",{value:!0});var mt=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var ht=(n,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of dt(e))!Oe.call(n,o)&&o!=="default"&&K(n,o,{get:()=>e[o],enumerable:!(t=lt(e,o))||t.enumerable});return n},le=n=>ht(pt(K(n!=null?it(ft(n)):{},"default",n&&n.__esModule&&"default"in n?{get:()=>n.default,enumerable:!0}:{value:n,enumerable:!0})),n);var l=(n,e,t)=>(ie(n,typeof e!="symbol"?e+"":e,t),t);var p=(n,e,t)=>new Promise((o,r)=>{var i=d=>{try{a(t.next(d))}catch(u){r(u)}},s=d=>{try{a(t.throw(d))}catch(u){r(u)}},a=d=>d.done?o(d.value):Promise.resolve(d.value).then(i,s);a((t=t.apply(n,e)).next())});var Q=mt((Ho,_e)=>{"use strict";var w=new WeakMap,Y=new WeakMap,U=new WeakMap,ge=Symbol("anyProducer"),je=Promise.resolve(),z=Symbol("listenerAdded"),G=Symbol("listenerRemoved"),Ee=!1;function O(n){if(typeof n!="string"&&typeof n!="symbol")throw new TypeError("eventName must be a string or a symbol")}function J(n){if(typeof n!="function")throw new TypeError("listener must be a function")}function M(n,e){let t=Y.get(n);return t.has(e)||t.set(e,new Set),t.get(e)}function j(n,e){let t=typeof e=="string"||typeof e=="symbol"?e:ge,o=U.get(n);return o.has(t)||o.set(t,new Set),o.get(t)}function gt(n,e,t){let o=U.get(n);if(o.has(e))for(let r of o.get(e))r.enqueue(t);if(o.has(ge)){let r=Promise.all([e,t]);for(let i of o.get(ge))i.enqueue(r)}}function He(n,e){e=Array.isArray(e)?e:[e];let t=!1,o=()=>{},r=[],i={enqueue(s){r.push(s),o()},finish(){t=!0,o()}};for(let s of e)j(n,s).add(i);return{next(){return p(this,null,function*(){return r?r.length===0?t?(r=void 0,this.next()):(yield new Promise(s=>{o=s}),this.next()):{done:!1,value:yield r.shift()}:{done:!0}})},return(a){return p(this,arguments,function*(s){r=void 0;for(let d of e)j(n,d).delete(i);return o(),arguments.length>0?{done:!0,value:yield s}:{done:!0}})},[Symbol.asyncIterator](){return this}}}function Be(n){if(n===void 0)return Ke;if(!Array.isArray(n))throw new TypeError("`methodNames` must be an array of strings");for(let e of n)if(!Ke.includes(e))throw typeof e!="string"?new TypeError("`methodNames` element must be a string"):new Error(`${e} is not Emittery method`);return n}var ve=n=>n===z||n===G,x=class{static mixin(e,t){return t=Be(t),o=>{if(typeof o!="function")throw new TypeError("`target` must be function");for(let s of t)if(o.prototype[s]!==void 0)throw new Error(`The property \`${s}\` already exists on \`target\``);function r(){return Object.defineProperty(this,e,{enumerable:!1,value:new x}),this[e]}Object.defineProperty(o.prototype,e,{enumerable:!1,get:r});let i=s=>function(...a){return this[e][s](...a)};for(let s of t)Object.defineProperty(o.prototype,s,{enumerable:!1,value:i(s)});return o}}static get isDebugEnabled(){if(typeof process!="object")return Ee;let{env:e}=process||{env:{}};return e.DEBUG==="emittery"||e.DEBUG==="*"||Ee}static set isDebugEnabled(e){Ee=e}constructor(e={}){w.set(this,new Set),Y.set(this,new Map),U.set(this,new Map),this.debug=e.debug||{},this.debug.enabled===void 0&&(this.debug.enabled=!1),this.debug.logger||(this.debug.logger=(t,o,r,i)=>{i=JSON.stringify(i),typeof r=="symbol"&&(r=r.toString());let s=new Date,a=`${s.getHours()}:${s.getMinutes()}:${s.getSeconds()}.${s.getMilliseconds()}`;console.log(`[${a}][emittery:${t}][${o}] Event Name: ${r}
	data: ${i}`)})}logIfDebugEnabled(e,t,o){(x.isDebugEnabled||this.debug.enabled)&&this.debug.logger(e,this.debug.name,t,o)}on(e,t){J(t),e=Array.isArray(e)?e:[e];for(let o of e)O(o),M(this,o).add(t),this.logIfDebugEnabled("subscribe",o,void 0),ve(o)||this.emit(z,{eventName:o,listener:t});return this.off.bind(this,e,t)}off(e,t){J(t),e=Array.isArray(e)?e:[e];for(let o of e)O(o),M(this,o).delete(t),this.logIfDebugEnabled("unsubscribe",o,void 0),ve(o)||this.emit(G,{eventName:o,listener:t})}once(e){return new Promise(t=>{let o=this.on(e,r=>{o(),t(r)})})}events(e){e=Array.isArray(e)?e:[e];for(let t of e)O(t);return He(this,e)}emit(e,t){return p(this,null,function*(){O(e),this.logIfDebugEnabled("emit",e,t),gt(this,e,t);let o=M(this,e),r=w.get(this),i=[...o],s=ve(e)?[]:[...r];yield je,yield Promise.all([...i.map(a=>p(this,null,function*(){if(o.has(a))return a(t)})),...s.map(a=>p(this,null,function*(){if(r.has(a))return a(e,t)}))])})}emitSerial(e,t){return p(this,null,function*(){O(e),this.logIfDebugEnabled("emitSerial",e,t);let o=M(this,e),r=w.get(this),i=[...o],s=[...r];yield je;for(let a of i)o.has(a)&&(yield a(t));for(let a of s)r.has(a)&&(yield a(e,t))})}onAny(e){return J(e),this.logIfDebugEnabled("subscribeAny",void 0,void 0),w.get(this).add(e),this.emit(z,{listener:e}),this.offAny.bind(this,e)}anyEvent(){return He(this)}offAny(e){J(e),this.logIfDebugEnabled("unsubscribeAny",void 0,void 0),this.emit(G,{listener:e}),w.get(this).delete(e)}clearListeners(e){e=Array.isArray(e)?e:[e];for(let t of e)if(this.logIfDebugEnabled("clear",t,void 0),typeof t=="string"||typeof t=="symbol"){M(this,t).clear();let o=j(this,t);for(let r of o)r.finish();o.clear()}else{w.get(this).clear();for(let o of Y.get(this).values())o.clear();for(let o of U.get(this).values()){for(let r of o)r.finish();o.clear()}}}listenerCount(e){e=Array.isArray(e)?e:[e];let t=0;for(let o of e){if(typeof o=="string"){t+=w.get(this).size+M(this,o).size+j(this,o).size+j(this).size;continue}typeof o!="undefined"&&O(o),t+=w.get(this).size;for(let r of Y.get(this).values())t+=r.size;for(let r of U.get(this).values())t+=r.size}return t}bindMethods(e,t){if(typeof e!="object"||e===null)throw new TypeError("`target` must be an object");t=Be(t);for(let o of t){if(e[o]!==void 0)throw new Error(`The property \`${o}\` already exists on \`target\``);Object.defineProperty(e,o,{enumerable:!1,value:this[o].bind(this)})}}},Ke=Object.getOwnPropertyNames(x.prototype).filter(n=>n!=="constructor");Object.defineProperty(x,"listenerAdded",{value:z,writable:!1,enumerable:!0,configurable:!1});Object.defineProperty(x,"listenerRemoved",{value:G,writable:!1,enumerable:!0,configurable:!1});_e.exports=x});var yt=["essential"],ce=["personalization","analytics","marketing"],de="uncategorized",_=[...yt,...ce,de],f="fs-cc",Ot=f+"-ie",Me=["informational","opt-in","opt-out"],D={allow:"allow",deny:"deny",submit:"submit"},b={banner:`[${f}="banner"]`,preferences:`[${f}="preferences"]`,manager:`[${f}="manager"]`},v={allow:`[${f}="${D.allow}"]`,deny:`[${f}="${D.deny}"]`,submit:`[${f}="${D.submit}"]`,openPreferences:`[${f}="open-preferences"]`,close:`[${f}="close"]`},fe={interactionTrigger:`[${f}="interaction"]`},m={categories:[`${f}-category`,`${f}-categories`],disableScroll:`${f}-scroll`,displayProperty:`${f}-display`,cookieMaxAge:`${f}-expires`,mode:`${f}-mode`,debugMode:`${f}-debug`,endpoint:`${f}-endpoint`,componentsSource:`${f}-source`,src:`${f}-src`,placeholder:`${f}-placeholder`},T={main:f,consentsUpdated:`${f}-updated`};var L={checkbox:n=>`[${f}-checkbox="${n}"]`,gtmEvent:n=>`${n}-activated`};var Ie=`<style>${b.banner},${b.manager},${b.preferences},${fe.interactionTrigger}{display:none}</style>`;var q=Object.freeze({analytics:!1,essential:!0,marketing:!1,personalization:!1,uncategorized:!1}),$=Object.freeze({analytics:!0,essential:!0,marketing:!0,personalization:!0,uncategorized:!0}),ke="180";var F=(n,e="flex")=>new Promise(t=>{n.style.opacity="0",n.style.display=e,function o(){let r=parseFloat(n.style.opacity);if(r>=1){t();return}let i=r+.1;n.style.opacity=i.toString(),requestAnimationFrame(o)}()}),N=n=>new Promise(e=>{n.style.opacity="1",function t(){let r=parseFloat(n.style.opacity)-.1;n.style.opacity=r.toString(),r<=0?(n.style.display="none",e()):requestAnimationFrame(t)}()});var C=class{static activateAlerts(){this.alertsActivated=!0}static alert(e,t){if(this.alertsActivated&&window.alert(e),t==="error")throw new Error(e)}};C.alertsActivated=!1;var S=(n,e)=>(Array.isArray(e)||(e=[e]),e.map(o=>n.dispatchEvent(new Event(o,{bubbles:!0}))).every(o=>o));var g=(n,e)=>!!n&&e.includes(n);function ue(n,e,t,o=!0){let r=t?[t]:[];if(!n)return r;let i=n.split(",").reduce((s,a)=>{let d=a.trim();return(!o||d)&&s.push(d),s},[]);if(e){let s=i.filter(a=>g(a,e));return s.length?s:r}return i}var pe=n=>Object.entries(n);var R=n=>Object.keys(n);var V=n=>{let{overflow:e}=getComputedStyle(n);return e==="auto"||e==="scroll"};var Pe=n=>!!(n.offsetWidth||n.offsetHeight||n.getClientRects().length);var y=(n,e,t=document)=>{let o=t.querySelector(n);if(o instanceof e)return o};var me=n=>n.replace(/\/+$/,"");var W=(n,e=!0)=>(e!==n.checked&&(n.checked=e,S(n,["click","input","change"])),n.type==="checkbox"?n.checked:n.value);var De=n=>new Promise(e=>setTimeout(e,n));var he=class{constructor({element:e,duration:t}){this.active=!1;this.running=!1;this.isActive=()=>this.active;this.isRunning=()=>this.running;this.untilFinished=()=>this.runningPromise;var o,r;this.element=typeof e=="string"?y(e,HTMLElement)||C.alert(`No interaction with the ${e} selector was found.`,"error"):e,this.duration={first:typeof t=="number"?t:(o=t==null?void 0:t.first)!=null?o:0,second:typeof t=="number"?t:(r=t==null?void 0:t.second)!=null?r:0}}trigger(e){return p(this,null,function*(){return e==="first"&&this.active||e==="second"&&!this.active?!1:(e||(e=this.active?"second":"first"),S(this.element,"click"),this.running=!0,this.runningPromise=De(this.duration[e]),yield this.runningPromise,this.running=!1,this.active=e==="first",!0)})}};var A=class{constructor({element:e,interaction:t,displayProperty:o,noTransition:r,startsHidden:i}){this.isVisible=()=>this.visible;if(this.element=typeof e=="string"?y(e,HTMLElement)||C.alert(`No element with the ${e} selector was found.`,"error"):e,this.noTransition=r,this.displayProperty=o||"block",i?(this.element.style.display="none",this.visible=!1):this.visible=Pe(this.element),t){let{element:s,duration:a}=t;this.interaction=new he({element:s,duration:a})}}show(){return p(this,null,function*(){this.visible||(this.interaction?yield this.interaction.trigger("first"):this.noTransition?this.element.style.display=this.displayProperty:yield F(this.element,this.displayProperty),this.visible=!0)})}hide(){return p(this,null,function*(){!this.visible||(this.interaction?yield this.interaction.trigger("second"):this.noTransition?this.element.style.display="none":yield N(this.element),this.visible=!1)})}};A.displayProperties=["block","flex","grid","inline-block","inline"];var ye=()=>document.documentElement.getAttribute("data-wf-site");var be=n=>p(void 0,null,function*(){let{Webflow:e}=window;if(!(!e||!("destroy"in e)||!("ready"in e)||!("require"in e))&&!(n&&!n.length)){if(n||(e.destroy(),e.ready()),!n||n.includes("ix2")){let t=e.require("ix2");if(t){let{store:o,actions:r}=t,{eventState:i}=o.getState().ixSession;n||t.destroy(),t.init();for(let s of Object.entries(i))o.dispatch(r.eventStateChanged(...s))}}if(!n||n.includes("commerce")){let t=e.require("commerce"),o=ye();t&&o&&(t.destroy(),t.init({siteId:o,apiUrl:"https://render.webflow.com"}))}if(n==null?void 0:n.includes("lightbox")){let t=e.require("lightbox");t==null||t.ready()}return new Promise(t=>e.push(()=>t(void 0)))}});var bt={info:"green",warning:"yellow",error:"red"},c=class{static activate(){this.init(),this.active=!0}static init(){this.element=document.createElement("div"),Object.assign(this.element.style,{position:"fixed",left:"auto",top:"auto",right:"16px",bottom:"0px","z-index":"999999","max-width":"320px","font-size":"14px","line-height":"1.25"}),document.body.appendChild(this.element)}static alert(e,t){if(!this.active)return;let o=document.createElement("div");Object.assign(o.style,{position:"relative",padding:"16px",opacity:"0","margin-bottom":"16px","border-left":`4px solid ${bt[t]}`,"background-color":"#fff","box-shadow":"1px 1px 3px 0 rgba(0, 0, 0, 0.1)","word-break":"break-all"});let r=document.createElement("div");r.innerText=e,o.appendChild(r),o.insertAdjacentHTML("beforeend",`<div ${f}="close" style="position: absolute; left: auto; top: 4px; right: 8px; bottom: auto; cursor: pointer">\u2716</div>`),this.handleCard(o)}static handleCard(e){let t=o=>{o.target instanceof Element&&o.target.closest(v.close)&&(e.removeEventListener("click",t),e.remove())};e.addEventListener("click",t),this.element.insertAdjacentElement("afterbegin",e),F(e)}};l(c,"active",!1),l(c,"element");var Le=n=>p(void 0,null,function*(){let{origin:e,pathname:t,href:o}=window.location,{origin:r,pathname:i,href:s}=new URL(document.baseURI);try{if(n.startsWith("/")){let se=s===o?e:r+i;n=me(se)+n}let{origin:a,pathname:d}=new URL(n);if(a+d===e+t)return;let h=yield(yield fetch(n)).text(),st=new DOMParser().parseFromString(h,"text/html");Object.values(b).forEach(se=>{let Te=st.querySelector(se);Te&&document.body.appendChild(Te)}),be()}catch(a){c.alert(`${a}`,"error")}}),$e=n=>{if(V(n))return n;let e=n.querySelectorAll("*");for(let t of e)if(V(t))return t},Fe=({element:n})=>{let e=document.createElement("script");return e.type="text/javascript",e.innerText=n.innerText,e.text=n.text,n.src&&(e.src=n.src),e},Ne=({element:n,src:e,placeholder:t})=>{let o=document.createElement("iframe");for(let{name:r,value:i}of n.attributes)o.setAttribute(r,i);return o.innerText=n.innerText,o.src=e,t&&o.addEventListener("load",()=>N(t)),o};var Re=i=>p(void 0,[i],function*({id:n,endpoint:e,consents:t,action:o,bannerText:r}){if(!!e)try{let s=JSON.stringify({id:n,action:o,consents:t,bannerText:r,url:window.location.href,userAgent:navigator.userAgent}),a=yield fetch(e,{body:s,method:"POST"});if(a.ok)c.alert("The new consents were successfully POSTed to the API endpoint.","info");else throw new Error(`The API returned a ${a.status} status.`)}catch(s){c.alert(`There was an error while POSTing to the API: ${s}`,"error")}});var Ue=n=>{window.dataLayer=window.dataLayer||[],window.dataLayer.find(e=>e.event===n)||(window.dataLayer.push({event:n}),c.alert(`The GTM event ${n} has been fired.`,"info"))};var Qe=le(Q());var qe=(n=21)=>{let e="",t=crypto.getRandomValues(new Uint8Array(n));for(;n--;){let o=t[n]&63;o<36?e+=o.toString(36):o<62?e+=(o-26).toString(36).toUpperCase():o<63?e+="_":e+="-"}return e};var Ve=n=>Object.keys(n).every(e=>g(e,_));function X(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}var Et={read:function(n){return n[0]==='"'&&(n=n.slice(1,-1)),n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(n){return encodeURIComponent(n).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function we(n,e){function t(r,i,s){if(typeof document!="undefined"){s=X({},e,s),typeof s.expires=="number"&&(s.expires=new Date(Date.now()+s.expires*864e5)),s.expires&&(s.expires=s.expires.toUTCString()),r=encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var a="";for(var d in s)!s[d]||(a+="; "+d,s[d]!==!0&&(a+="="+s[d].split(";")[0]));return document.cookie=r+"="+n.write(i,r)+a}}function o(r){if(!(typeof document=="undefined"||arguments.length&&!r)){for(var i=document.cookie?document.cookie.split("; "):[],s={},a=0;a<i.length;a++){var d=i[a].split("="),u=d.slice(1).join("=");try{var h=decodeURIComponent(d[0]);if(s[h]=n.read(u,h),r===h)break}catch(rt){}}return r?s[r]:s}}return Object.create({set:t,get:o,remove:function(r,i){t(r,"",X({},i,{expires:-1}))},withAttributes:function(r){return we(this.converter,X({},this.attributes,r))},withConverter:function(r){return we(X({},this.converter,r),this.attributes)}},{attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(n)}})}var vt=we(Et,{path:"/"}),E=vt;var We=()=>{let n=E.get(T.main);if(!n)return;let e=JSON.parse(decodeURIComponent(n));if(e.consents&&Ve(e.consents))return e.consents},Ye=(n,e,t=120)=>{let o={id:n,consents:e},r=encodeURIComponent(JSON.stringify(o));E.set(T.main,r,{expires:t})},ze=()=>{let n=E.get();for(let e in n){if(e===T.main)continue;let t=window.location.host.split(".");for(;t.length>1;)E.remove(e),E.remove(e,{domain:`.${t.join(".")}`}),E.remove(e,{domain:`${t.join(".")}`}),t.splice(0,1)}},Ge=()=>!!E.get(T.consentsUpdated),Je=(n=120)=>{E.set(T.consentsUpdated,"true",{expires:n})};var Z=class extends Qe.default{constructor(e){super();this.store=e;this.loadConsents(),this.storeElements(),document.readyState!=="complete"&&window.addEventListener("load",()=>{this.storeElements(),this.applyConsents()}),this.applyConsents()}storeElements(){let{store:e}=this,t=document.querySelectorAll(`script[type="${f}"], iframe[${m.src}]`),o=e.getStoredElements();[...t].filter(i=>!o.find(({element:s})=>i===s)).forEach(i=>{let s=ue(i.getAttribute(m.categories[0])||i.getAttribute(m.categories[1]),_,de);if(i instanceof HTMLScriptElement&&e.storeScript({categories:s,element:i,active:!1}),i instanceof HTMLIFrameElement){let a=i.getAttribute(m.src);if(!a)return;i.src="";let d=i.getAttribute(m.placeholder),u=d?y(d,HTMLElement):void 0;e.storeIFrame({categories:s,element:i,src:a,placeholder:u,active:!1})}c.alert(`Stored the element: ${i.outerHTML} in the categories: ${s.join(", ")}`,"info")})}loadConsents(){let e=We();if(!e)return;c.alert(`The following consents were loaded from the stored cookies: ${JSON.stringify(e)}`,"info"),this.store.storeConsents(e),Ge()&&(ze(),c.alert("Previously denied cookies have been deleted.","info"))}applyConsents(){return p(this,null,function*(){let{store:e}=this;for(let t of e.getActivableElements())yield new Promise(o=>{let{element:r}=t,{src:i,parentElement:s}=r,a;if(t.type==="script")a=Fe(t);else if(t.type==="iframe")a=Ne(t);else{o(void 0);return}let d=()=>{t.element=a,t.active=!0,o(void 0)};i&&a.addEventListener("load",d),s==null||s.insertBefore(a,r),r.remove(),i||d()});e.getConsentsEntries().forEach(([t,o])=>{o&&Ue(L.gtmEvent(t))})})}updateConsents(e,t){let{store:o}=this,{cookieMaxAge:r,endpoint:i}=o,s=o.storeConsents(e),a=qe();Ye(a,o.getConsents(),r),i&&Re({action:t,endpoint:i,id:a,consents:o.getConsents(),bannerText:o.getBannerText()||""}),s.length&&(Je(r),this.applyConsents(),c.alert(`The following consents were updated: ${s.join(", ")}`,"info")),this.emit("updateconsents")}};function wt(n){if(Array.isArray(n)){for(var e=0,t=Array(n.length);e<n.length;e++)t[e]=n[e];return t}else return Array.from(n)}var xe=!1;typeof window!="undefined"&&(Ce={get passive(){xe=!0}},window.addEventListener("testPassive",null,Ce),window.removeEventListener("testPassive",null,Ce));var Ce,Xe=typeof window!="undefined"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1),I=[],ee=!1,Se=-1,H=void 0,B=void 0,Ze=function(e){return I.some(function(t){return!!(t.options.allowTouchMove&&t.options.allowTouchMove(e))})},te=function(e){var t=e||window.event;return Ze(t.target)||t.touches.length>1?!0:(t.preventDefault&&t.preventDefault(),!1)},xt=function(e){if(B===void 0){var t=!!e&&e.reserveScrollBarGap===!0,o=window.innerWidth-document.documentElement.clientWidth;t&&o>0&&(B=document.body.style.paddingRight,document.body.style.paddingRight=o+"px")}H===void 0&&(H=document.body.style.overflow,document.body.style.overflow="hidden")},Ct=function(){B!==void 0&&(document.body.style.paddingRight=B,B=void 0),H!==void 0&&(document.body.style.overflow=H,H=void 0)},St=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},Tt=function(e,t){var o=e.targetTouches[0].clientY-Se;return Ze(e.target)?!1:t&&t.scrollTop===0&&o>0||St(t)&&o<0?te(e):(e.stopPropagation(),!0)},et=function(e,t){if(!e){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(!I.some(function(r){return r.targetElement===e})){var o={targetElement:e,options:t||{}};I=[].concat(wt(I),[o]),Xe?(e.ontouchstart=function(r){r.targetTouches.length===1&&(Se=r.targetTouches[0].clientY)},e.ontouchmove=function(r){r.targetTouches.length===1&&Tt(r,e)},ee||(document.addEventListener("touchmove",te,xe?{passive:!1}:void 0),ee=!0)):xt(t)}},tt=function(){Xe?(I.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),ee&&(document.removeEventListener("touchmove",te,xe?{passive:!1}:void 0),ee=!1),Se=-1):Ct(),I=[]};var ot=le(Q());var oe=class extends ot.default{constructor(e,t){super();this.element=e;this.store=t;l(this,"checkboxes",new Map);this.initElements(),this.listenEvents(),this.updateCheckboxes()}initElements(){let e=ce.filter(t=>{let o=L.checkbox(t),r=this.element.querySelector(`input${o}, ${o} input`);return!r||r.type!=="checkbox"?!0:(r.checked&&W(r,!1),this.checkboxes.set(t,r),!1)});e.length&&c.alert(`The Consents Form is missing the following checkboxes: ${e.map(t=>L.checkbox(t)).join(", ")}.`,"warning")}listenEvents(){this.element.addEventListener("submit",e=>this.handleSubmit(e))}handleSubmit(e){e.preventDefault(),e.stopPropagation();let t={};this.checkboxes.forEach((o,r)=>{var i;t[r]=(i=o.checked)!=null?i:!1}),this.emit("submit",t)}updateCheckboxes(){let e=this.store.getConsents();this.checkboxes.forEach((t,o)=>{!!e[o]!==t.checked&&W(t,e[o])})}submit(){S(this.element,"submit")}};var nt=le(Q());var k=class extends nt.default{constructor(e,t){super();this.selector=e;this.store=t;l(this,"element");l(this,"form");l(this,"displayController");l(this,"scrollableElement");l(this,"disableScrollOnOpen",!1);l(this,"ready",!1);l(this,"isReady",()=>this.ready);document.readyState==="complete"?this.init():window.addEventListener("load",()=>this.init())}init(){let{banner:e,manager:t,preferences:o}=b;if(!this.initElements()){switch(this.selector){case e:c.alert(`No element with the ${e} attribute was found, it is required to have it!`,"error");break;case t:c.alert(`No element with the ${t} attribute was found, did you want to use the Manager component?`,"info");break;case o:c.alert(`No element with the ${o} attribute was found, did you want to use the Preferences component?`,"info");break}return}this.handleAccessibility(),this.listenEvents(),this.ready=!0,this.emit("ready",this.element)}initElements(){this.element=y(this.selector,HTMLElement);let{element:e,store:t}=this;if(!e)return!1;let o=y("form",HTMLFormElement,e);o&&(this.form=new oe(o,t));let r=e.getAttribute(m.displayProperty);this.disableScrollOnOpen=e.getAttribute(m.disableScroll)==="disable",this.disableScrollOnOpen&&(this.scrollableElement=$e(e));let i=y(fe.interactionTrigger,HTMLElement,e);return this.displayController=new A({element:e,interaction:i?{element:i}:void 0,displayProperty:g(r,A.displayProperties)?r:"flex",startsHidden:!0}),!0}handleAccessibility(){let{element:e}=this;!e||R(v).forEach(t=>{let o=e.querySelector(v[t]);!o||(o.setAttribute("role","button"),o.setAttribute("tabindex","0"))})}listenEvents(){let{element:e,form:t}=this;!e||(e.addEventListener("click",o=>this.handleMouseAndKeyboard(o)),e.addEventListener("keydown",o=>this.handleMouseAndKeyboard(o)),t==null||t.on("submit",o=>this.handleFormSubmit(o)))}handleMouseAndKeyboard(e){var a;let{target:t}=e,{allow:o,deny:r,close:i,submit:s}=v;t instanceof Element&&("key"in e&&e.key!=="Enter"||(t.closest(o)?(this.emit("allow"),this.close()):t.closest(r)?(this.emit("deny"),this.close()):t.closest(i)?this.close():t.closest(s)&&((a=this.form)==null||a.submit())))}handleFormSubmit(e){this.emit("formsubmit",e),this.close()}show(e=!0){let{element:t,displayController:o,disableScrollOnOpen:r,scrollableElement:i}=this;!t||!o||o.isVisible()===e||(o[e?"show":"hide"](),r&&(e?et(i||t,{reserveScrollBarGap:!0}):tt()),this.emit(e?"open":"close"))}open(){this.ready?this.show():this.once("ready").then(()=>this.show())}close(){this.ready?this.show(!1):this.once("ready").then(()=>this.show(!1))}};var ne=class{constructor(){l(this,"mode");l(this,"cookieMaxAge");l(this,"debugMode");l(this,"endpoint");l(this,"componentsSource");l(this,"confirmed",!1);l(this,"consents");l(this,"bannerText","empty");l(this,"scripts",[]);l(this,"iFrames",[]);l(this,"userHasConfirmed",()=>this.confirmed);l(this,"getStoredElements",()=>[...this.scripts,...this.iFrames]);l(this,"getActivableElements",()=>this.getStoredElements().filter(({active:e,categories:t})=>!e&&t.every(o=>this.consents[o])));l(this,"getConsents",()=>this.consents);l(this,"getConsentsEntries",()=>pe(this.consents));l(this,"getConsent",e=>this.consents[e]);l(this,"getBannerText",()=>this.bannerText);let{currentScript:e}=document,t=e==null?void 0:e.getAttribute(m.mode);switch(this.mode=g(t,Me)?t:"opt-in",this.mode){case"informational":case"opt-out":this.consents=P({},$);break;default:this.consents=P({},q)}this.cookieMaxAge=parseInt((e==null?void 0:e.getAttribute(m.cookieMaxAge))||ke);let o=e==null?void 0:e.getAttribute(m.debugMode);this.debugMode=o===""||o==="true",this.debugMode&&c.activate(),this.endpoint=e==null?void 0:e.getAttribute(m.endpoint),this.componentsSource=e==null?void 0:e.getAttribute(m.componentsSource),c.alert(`The cookie banner is set to ${this.mode} mode with a consent expiry time of ${this.cookieMaxAge} days.${this.endpoint?`The consents will be POSTed to ${this.endpoint}`:""}`,"info")}storeScript(e){this.scripts.push(ae(P({},e),{type:"script"}))}storeIFrame(e){this.iFrames.push(ae(P({},e),{type:"iframe"}))}storeConsents(e){let t=[];return R(e).forEach(o=>{if(o==="essential")return;let r=e[o];r===void 0||r===this.consents[o]||(this.consents[o]=r,t.push(o))}),this.confirmed=!0,t}storeBannerText(e){e&&e.textContent&&(this.bannerText=e.textContent)}};var re=class{constructor(){l(this,"consentController");l(this,"store",new ne);l(this,"banner");l(this,"preferences");l(this,"manager");this.consentController=new Z(this.store),this.initComponents().then(()=>this.init())}initComponents(){return p(this,null,function*(){let{store:e}=this,{componentsSource:t}=e,{banner:o,preferences:r,manager:i}=b;t&&(yield Le(t)),this.banner=new k(o,e),this.preferences=new k(r,e),this.manager=new k(i,e)})}init(){let{store:e,manager:t,banner:o}=this;document.head.insertAdjacentHTML("beforeend",Ie),!/bot|crawler|spider|crawling/i.test(navigator.userAgent)&&(e.userHasConfirmed()?t.open():o.open(),this.listenEvents())}listenEvents(){let{allow:e,deny:t,submit:o}=D,r=["banner","manager","preferences"],{store:i,consentController:s,banner:a,manager:d}=this;document.addEventListener("click",u=>this.handleMouseAndKeyboard(u)),document.addEventListener("keydown",u=>this.handleMouseAndKeyboard(u)),a.isReady()?i.storeBannerText(a.element):a.on("ready",u=>i.storeBannerText(u)),s.on("updateconsents",()=>{r.forEach(u=>{var h;return(h=this[u].form)==null?void 0:h.updateCheckboxes()})}),r.forEach(u=>{this[u].on("allow",()=>{c.alert(`Allow button was clicked in the ${u} component.`,"info"),s.updateConsents($,e)}),this[u].on("deny",()=>{c.alert(`Deny button was clicked in the ${u} component.`,"info"),s.updateConsents(q,t)}),this[u].on("formsubmit",h=>{c.alert(`Consents Form was submitted in the ${u} component with the following consents: ${JSON.stringify(h)}`,"info"),s.updateConsents(h,o)}),u!=="manager"&&this[u].on("close",()=>{c.alert(`The ${u} component was closed.`,"info"),i.mode==="informational"&&(c.alert(`All cookies were accepted because the mode is set to ${i.mode}.`,"warning"),s.updateConsents($,e)),d.open()})})}handleMouseAndKeyboard(e){let{target:t}=e,{banner:o,manager:r,preferences:i}=this;t instanceof Element&&("key"in e&&e.key!=="Enter"||t.closest(v.openPreferences)&&(o.close(),r.close(),i.open(),c.alert("Open Preferences button was clicked.","info")))}};window.FsCC=new re;})();
/*! js-cookie v3.0.1 | MIT */
