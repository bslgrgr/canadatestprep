(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(6209)}])},6209:function(e,s,n){"use strict";n.r(s);var t=n(5893),a=n(7294),r=n(9008),l=n.n(r);let i=e=>{for(let s=e.length-1;s>0;s--){let n=Math.floor(Math.random()*(s+1));[e[s],e[n]]=[e[n],e[s]]}return e};s.default=()=>{let[e,s]=(0,a.useState)([]),[n,r]=(0,a.useState)(0),[c,o]=(0,a.useState)(null),[u,d]=(0,a.useState)(0),[h,p]=(0,a.useState)(!1),[x,j]=(0,a.useState)(!1),[m,_]=(0,a.useState)(!1),[f,N]=(0,a.useState)(null);(0,a.useEffect)(()=>{fetch("/canadatestprep/questions.json").then(e=>e.json()).then(e=>{s(e.map(e=>({...e,possible_answers:i(e.possible_answers)})))})},[]);let b=e=>{o(e)};return 0===e.length?(0,t.jsx)("div",{children:"Loading..."}):(0,t.jsxs)("div",{className:"quiz-container",children:[(0,t.jsxs)(l(),{children:[(0,t.jsx)("title",{children:"Canada Test Prep Quiz"}),(0,t.jsx)("link",{rel:"stylesheet",href:"/canadatestprep/styles.css"})]}),(0,t.jsx)("header",{className:"quiz-header",children:(0,t.jsx)("h1",{children:"Canada Test Prep Quiz"})}),(0,t.jsx)("main",{className:"quiz-main",children:h?(0,t.jsxs)("div",{className:"score-section",children:["You scored ",u," out of ",e.length]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"question-section",children:[(0,t.jsxs)("div",{className:"question-count",children:[(0,t.jsxs)("span",{children:["Question ",n+1]}),"/",e.length]}),(0,t.jsx)("div",{className:"question-text",children:e[n].question})]}),(0,t.jsx)("div",{className:"answer-section",children:e[n].possible_answers.map((e,s)=>(0,t.jsx)("button",{onClick:()=>b(s),className:"answer-button ".concat(c===s?"selected":""),disabled:m,children:e.answer_text},s))}),m&&(0,t.jsx)("div",{className:"result-message ".concat(f?"correct":"incorrect"),children:f?"Correct!":"Incorrect!"}),(0,t.jsx)("button",{onClick:m?()=>{let s=n+1;s<e.length?(r(s),o(null),j(!1),_(!1),N(null)):p(!0)}:()=>{if(null===c)return;let s=e[n].possible_answers[c].is_correct;N(s),s&&d(u+1),_(!0)},className:"submit-button",disabled:null===c,children:m?"Next Question":"Submit"}),(0,t.jsx)("button",{onClick:()=>j(!x),className:"answer-button",children:x?"Hide Answer":"Show Answer"}),x&&(0,t.jsxs)("div",{className:"answer-section",children:[(0,t.jsx)("blockquote",{dangerouslySetInnerHTML:{__html:e[n].quote.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}}),(0,t.jsxs)("p",{children:["Source: ",(0,t.jsx)("a",{href:e[n].online_page,target:"_blank",rel:"noopener noreferrer",children:e[n].paragraph})]}),(0,t.jsxs)("p",{children:["Discover Canada, Page ",e[n].page,", ",e[n].paragraph]})]})]})}),(0,t.jsx)("footer",{className:"quiz-footer",children:"Canada Test Prep \xa92024"})]})}},9008:function(e,s,n){e.exports=n(7828)}},function(e){e.O(0,[888,774,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);