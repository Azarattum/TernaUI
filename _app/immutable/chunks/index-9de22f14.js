function g(){}function K(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t&&typeof t=="object"&&typeof t.then=="function"}function T(t){return t()}function P(){return Object.create(null)}function x(t){t.forEach(T)}function z(t){return typeof t=="function"}function _t(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function R(t){return Object.keys(t).length===0}function B(t,...e){if(t==null)return g;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ht(t){let e;return B(t,n=>e=n)(),e}function mt(t,e,n){t.$$.on_destroy.push(B(e,n))}function pt(t,e,n,r){if(t){const c=D(t,e,n,r);return t[0](c)}}function D(t,e,n,r){return t[1]&&r?K(n.ctx.slice(),t[1](r(e))):n.ctx}function yt(t,e,n,r){if(t[2]&&r){const c=t[2](r(n));if(e.dirty===void 0)return c;if(typeof c=="object"){const o=[],l=Math.max(e.dirty.length,c.length);for(let u=0;u<l;u+=1)o[u]=e.dirty[u]|c[u];return o}return e.dirty|c}return e.dirty}function bt(t,e,n,r,c,o){if(c){const l=D(e,n,r,o);t.p(l,c)}}function gt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function xt(t){return t&&z(t.destroy)?t.destroy:g}const O=typeof window!="undefined";let $t=O?()=>window.performance.now():()=>Date.now(),F=O?t=>requestAnimationFrame(t):g;const m=new Set;function H(t){m.forEach(e=>{e.c(t)||(m.delete(e),e.f())}),m.size!==0&&F(H)}function kt(t){let e;return m.size===0&&F(H),{promise:new Promise(n=>{m.add(e={c:t,f:n})}),abort(){m.delete(e)}}}let E=!1;function U(){E=!0}function V(){E=!1}function X(t,e,n,r){for(;t<e;){const c=t+(e-t>>1);n(c)<=r?t=c+1:e=c}return t}function Y(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let s=0;s<e.length;s++){const f=e[s];f.claim_order!==void 0&&i.push(f)}e=i}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let c=0;for(let i=0;i<e.length;i++){const s=e[i].claim_order,f=(c>0&&e[n[c]].claim_order<=s?c+1:X(1,c,_=>e[n[_]].claim_order,s))-1;r[i]=n[f]+1;const a=f+1;n[a]=i,c=Math.max(a,c)}const o=[],l=[];let u=e.length-1;for(let i=n[c]+1;i!=0;i=r[i-1]){for(o.push(e[i-1]);u>=i;u--)l.push(e[u]);u--}for(;u>=0;u--)l.push(e[u]);o.reverse(),l.sort((i,s)=>i.claim_order-s.claim_order);for(let i=0,s=0;i<l.length;i++){for(;s<o.length&&l[i].claim_order>=o[s].claim_order;)s++;const f=s<o.length?o[s]:null;t.insertBefore(l[i],f)}}function Z(t,e){if(E){for(Y(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function wt(t,e,n){E&&!n?Z(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function tt(t){t.parentNode.removeChild(t)}function Et(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function et(t){return document.createElement(t)}function S(t){return document.createTextNode(t)}function vt(){return S(" ")}function At(){return S("")}function jt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function St(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function Nt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function nt(t){return Array.from(t.childNodes)}function rt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function I(t,e,n,r,c=!1){rt(t);const o=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const u=t[l];if(e(u)){const i=n(u);return i===void 0?t.splice(l,1):t[l]=i,c||(t.claim_info.last_index=l),u}}for(let l=t.claim_info.last_index-1;l>=0;l--){const u=t[l];if(e(u)){const i=n(u);return i===void 0?t.splice(l,1):t[l]=i,c?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,u}}return r()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function ct(t,e,n,r){return I(t,c=>c.nodeName===e,c=>{const o=[];for(let l=0;l<c.attributes.length;l++){const u=c.attributes[l];n[u.name]||o.push(u.name)}o.forEach(l=>c.removeAttribute(l))},()=>r(e))}function Ct(t,e,n){return ct(t,e,n,et)}function it(t,e){return I(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>S(e),!0)}function Mt(t){return it(t," ")}function Pt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function qt(t,e){t.value=e==null?"":e}function Lt(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function Tt(t,e,n){t.classList[n?"add":"remove"](e)}function zt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let b;function d(t){b=t}function p(){if(!b)throw new Error("Function called outside component initialization");return b}function Bt(t){p().$$.on_mount.push(t)}function Dt(t){p().$$.after_update.push(t)}function Ot(t){p().$$.on_destroy.push(t)}function Ft(t,e){return p().$$.context.set(t,e),e}function Ht(t){return p().$$.context.get(t)}function It(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(r=>r.call(this,e))}const y=[],q=[],k=[],L=[],W=Promise.resolve();let A=!1;function G(){A||(A=!0,W.then(N))}function Wt(){return G(),W}function j(t){k.push(t)}const v=new Set;let $=0;function N(){const t=b;do{for(;$<y.length;){const e=y[$];$++,d(e),lt(e.$$)}for(d(null),y.length=0,$=0;q.length;)q.pop()();for(let e=0;e<k.length;e+=1){const n=k[e];v.has(n)||(v.add(n),n())}k.length=0}while(y.length);for(;L.length;)L.pop()();A=!1,v.clear(),d(t)}function lt(t){if(t.fragment!==null){t.update(),x(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}const w=new Set;let h;function ut(){h={r:0,c:[],p:h}}function st(){h.r||x(h.c),h=h.p}function J(t,e){t&&t.i&&(w.delete(t),t.i(e))}function ot(t,e,n,r){if(t&&t.o){if(w.has(t))return;w.add(t),h.c.push(()=>{w.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}function Gt(t,e){const n=e.token={};function r(c,o,l,u){if(e.token!==n)return;e.resolved=u;let i=e.ctx;l!==void 0&&(i=i.slice(),i[l]=u);const s=c&&(e.current=c)(i);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,_)=>{_!==o&&a&&(ut(),ot(a,1,1,()=>{e.blocks[_]===a&&(e.blocks[_]=null)}),st())}):e.block.d(1),s.c(),J(s,1),s.m(e.mount(),e.anchor),f=!0),e.block=s,e.blocks&&(e.blocks[o]=s),f&&N()}if(Q(t)){const c=p();if(t.then(o=>{d(c),r(e.then,1,e.value,o),d(null)},o=>{if(d(c),r(e.catch,2,e.error,o),d(null),!e.hasCatch)throw o}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function Jt(t,e,n){const r=e.slice(),{resolved:c}=t;t.current===t.then&&(r[t.value]=c),t.current===t.catch&&(r[t.error]=c),t.block.p(r,n)}function Kt(t,e){const n={},r={},c={$$scope:1};let o=t.length;for(;o--;){const l=t[o],u=e[o];if(u){for(const i in l)i in u||(r[i]=1);for(const i in u)c[i]||(n[i]=u[i],c[i]=1);t[o]=u}else for(const i in l)c[i]=1}for(const l in r)l in n||(n[l]=void 0);return n}function Qt(t){return typeof t=="object"&&t!==null?t:{}}function Rt(t){t&&t.c()}function Ut(t,e){t&&t.l(e)}function at(t,e,n,r){const{fragment:c,on_mount:o,on_destroy:l,after_update:u}=t.$$;c&&c.m(e,n),r||j(()=>{const i=o.map(T).filter(z);l?l.push(...i):x(i),t.$$.on_mount=[]}),u.forEach(j)}function ft(t,e){const n=t.$$;n.fragment!==null&&(x(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(t,e){t.$$.dirty[0]===-1&&(y.push(t),G(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Vt(t,e,n,r,c,o,l,u=[-1]){const i=b;d(t);const s=t.$$={fragment:null,ctx:null,props:o,update:g,not_equal:c,bound:P(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:P(),dirty:u,skip_bound:!1,root:e.target||i.$$.root};l&&l(s.root);let f=!1;if(s.ctx=n?n(t,e.props||{},(a,_,...C)=>{const M=C.length?C[0]:_;return s.ctx&&c(s.ctx[a],s.ctx[a]=M)&&(!s.skip_bound&&s.bound[a]&&s.bound[a](M),f&&dt(t,a)),_}):[],s.update(),f=!0,x(s.before_update),s.fragment=r?r(s.ctx):!1,e.target){if(e.hydrate){U();const a=nt(e.target);s.fragment&&s.fragment.l(a),a.forEach(tt)}else s.fragment&&s.fragment.c();e.intro&&J(t.$$.fragment),at(t,e.target,e.anchor,e.customElement),V(),N()}d(i)}class Xt{$destroy(){ft(this,1),this.$destroy=g}$on(e,n){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const c=r.indexOf(n);c!==-1&&r.splice(c,1)}}$set(e){this.$$set&&!R(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{jt as $,Qt as A,ft as B,K as C,Wt as D,g as E,B as F,x as G,z as H,pt as I,zt as J,Z as K,bt as L,gt as M,yt as N,q as O,Ht as P,Et as Q,ht as R,Xt as S,mt as T,Gt as U,Jt as V,Tt as W,Ot as X,$t as Y,kt as Z,qt as _,nt as a,St as a0,xt as a1,It as a2,Nt as b,Ct as c,tt as d,et as e,Lt as f,wt as g,it as h,Vt as i,Pt as j,vt as k,At as l,Mt as m,ut as n,ot as o,st as p,J as q,Ft as r,_t as s,S as t,Dt as u,Bt as v,Rt as w,Ut as x,at as y,Kt as z};
