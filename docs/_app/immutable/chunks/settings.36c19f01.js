import{r as B,d as D,w as U}from"./index.a4578f2f.js";import{h as b}from"./scheduler.1b72bc69.js";function z(u){return u&&u.__esModule&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u}var L={exports:{}};L.exports;(function(u){var _=function(){var g=String.fromCharCode,A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",x={};function M(t,n){if(!x[t]){x[t]={};for(var c=0;c<t.length;c++)x[t][t.charAt(c)]=c}return x[t][n]}var w={compressToBase64:function(t){if(t==null)return"";var n=w._compress(t,6,function(c){return A.charAt(c)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(t){return t==null?"":t==""?null:w._decompress(t.length,32,function(n){return M(A,t.charAt(n))})},compressToUTF16:function(t){return t==null?"":w._compress(t,15,function(n){return g(n+32)})+" "},decompressFromUTF16:function(t){return t==null?"":t==""?null:w._decompress(t.length,16384,function(n){return t.charCodeAt(n)-32})},compressToUint8Array:function(t){for(var n=w.compress(t),c=new Uint8Array(n.length*2),r=0,i=n.length;r<i;r++){var d=n.charCodeAt(r);c[r*2]=d>>>8,c[r*2+1]=d%256}return c},decompressFromUint8Array:function(t){if(t==null)return w.decompress(t);for(var n=new Array(t.length/2),c=0,r=n.length;c<r;c++)n[c]=t[c*2]*256+t[c*2+1];var i=[];return n.forEach(function(d){i.push(g(d))}),w.decompress(i.join(""))},compressToEncodedURIComponent:function(t){return t==null?"":w._compress(t,6,function(n){return m.charAt(n)})},decompressFromEncodedURIComponent:function(t){return t==null?"":t==""?null:(t=t.replace(/ /g,"+"),w._decompress(t.length,32,function(n){return M(m,t.charAt(n))}))},compress:function(t){return w._compress(t,16,function(n){return g(n)})},_compress:function(t,n,c){if(t==null)return"";var r,i,d={},v={},S="",y="",l="",h=2,p=3,a=2,f=[],o=0,s=0,e;for(e=0;e<t.length;e+=1)if(S=t.charAt(e),Object.prototype.hasOwnProperty.call(d,S)||(d[S]=p++,v[S]=!0),y=l+S,Object.prototype.hasOwnProperty.call(d,y))l=y;else{if(Object.prototype.hasOwnProperty.call(v,l)){if(l.charCodeAt(0)<256){for(r=0;r<a;r++)o=o<<1,s==n-1?(s=0,f.push(c(o)),o=0):s++;for(i=l.charCodeAt(0),r=0;r<8;r++)o=o<<1|i&1,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=i>>1}else{for(i=1,r=0;r<a;r++)o=o<<1|i,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)o=o<<1|i&1,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=i>>1}h--,h==0&&(h=Math.pow(2,a),a++),delete v[l]}else for(i=d[l],r=0;r<a;r++)o=o<<1|i&1,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=i>>1;h--,h==0&&(h=Math.pow(2,a),a++),d[y]=p++,l=String(S)}if(l!==""){if(Object.prototype.hasOwnProperty.call(v,l)){if(l.charCodeAt(0)<256){for(r=0;r<a;r++)o=o<<1,s==n-1?(s=0,f.push(c(o)),o=0):s++;for(i=l.charCodeAt(0),r=0;r<8;r++)o=o<<1|i&1,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=i>>1}else{for(i=1,r=0;r<a;r++)o=o<<1|i,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)o=o<<1|i&1,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=i>>1}h--,h==0&&(h=Math.pow(2,a),a++),delete v[l]}else for(i=d[l],r=0;r<a;r++)o=o<<1|i&1,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=i>>1;h--,h==0&&(h=Math.pow(2,a),a++)}for(i=2,r=0;r<a;r++)o=o<<1|i&1,s==n-1?(s=0,f.push(c(o)),o=0):s++,i=i>>1;for(;;)if(o=o<<1,s==n-1){f.push(c(o));break}else s++;return f.join("")},decompress:function(t){return t==null?"":t==""?null:w._decompress(t.length,32768,function(n){return t.charCodeAt(n)})},_decompress:function(t,n,c){var r=[],i=4,d=4,v=3,S="",y=[],l,h,p,a,f,o,s,e={val:c(0),position:n,index:1};for(l=0;l<3;l+=1)r[l]=l;for(p=0,f=Math.pow(2,2),o=1;o!=f;)a=e.val&e.position,e.position>>=1,e.position==0&&(e.position=n,e.val=c(e.index++)),p|=(a>0?1:0)*o,o<<=1;switch(p){case 0:for(p=0,f=Math.pow(2,8),o=1;o!=f;)a=e.val&e.position,e.position>>=1,e.position==0&&(e.position=n,e.val=c(e.index++)),p|=(a>0?1:0)*o,o<<=1;s=g(p);break;case 1:for(p=0,f=Math.pow(2,16),o=1;o!=f;)a=e.val&e.position,e.position>>=1,e.position==0&&(e.position=n,e.val=c(e.index++)),p|=(a>0?1:0)*o,o<<=1;s=g(p);break;case 2:return""}for(r[3]=s,h=s,y.push(s);;){if(e.index>t)return"";for(p=0,f=Math.pow(2,v),o=1;o!=f;)a=e.val&e.position,e.position>>=1,e.position==0&&(e.position=n,e.val=c(e.index++)),p|=(a>0?1:0)*o,o<<=1;switch(s=p){case 0:for(p=0,f=Math.pow(2,8),o=1;o!=f;)a=e.val&e.position,e.position>>=1,e.position==0&&(e.position=n,e.val=c(e.index++)),p|=(a>0?1:0)*o,o<<=1;r[d++]=g(p),s=d-1,i--;break;case 1:for(p=0,f=Math.pow(2,16),o=1;o!=f;)a=e.val&e.position,e.position>>=1,e.position==0&&(e.position=n,e.val=c(e.index++)),p|=(a>0?1:0)*o,o<<=1;r[d++]=g(p),s=d-1,i--;break;case 2:return y.join("")}if(i==0&&(i=Math.pow(2,v),v++),r[s])S=r[s];else if(s===d)S=h+h.charAt(0);else return null;y.push(S),r[d++]=h+S.charAt(0),i--,h=S,i==0&&(i=Math.pow(2,v),v++)}}};return w}();u!=null?u.exports=_:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return _})})(L);var T=L.exports;const K=z(T),Z={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1},J=Z.VITE_DEFAULT_URL??"";async function W(u){const _=[];for(const g of u)try{const m=await(await fetch(g)).json();if(!(m.name&&m.categories))continue;_.push(m)}catch(A){console.error(A)}return _}const C=Number(localStorage.getItem("wolfCount")??1),O=U(C);O.subscribe(u=>{if(u<1){O.set(1);return}localStorage.setItem("wolfCount",String(u))});const I=Number(localStorage.getItem("participantCount")??4),R=U(I);R.subscribe(u=>{if(u<2){R.set(2);return}b(O)>=u&&O.set(u-1),localStorage.setItem("participantCount",String(u))});const Q=U(0),j=U([]),X=B(j),E=localStorage.getItem("wordSourceURLs"),q=E?JSON.parse(E):[J],k=U(q);k.subscribe(async u=>{const _=await W(u);j.set(_),localStorage.setItem("wordSourceURLs",JSON.stringify(u))});const Y=D([k],([u])=>T.compressToEncodedURIComponent(JSON.stringify(u)));export{O as a,X as b,Q as c,K as l,R as p,Y as s,k as w};