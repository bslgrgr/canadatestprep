(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[498],{6418:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/quiz",function(){return n(5122)}])},5122:function(e,s,n){"use strict";n.r(s);var t=n(5893),i=n(7294),r=n(9008),a=n.n(r);s.default=()=>{let[e,s]=(0,i.useState)([]),[n,r]=(0,i.useState)(0),[c,l]=(0,i.useState)(0),[o,u]=(0,i.useState)(!1);(0,i.useEffect)(()=>{fetch("/canadatestprep/questions.json").then(e=>e.json()).then(e=>s(e))},[]);let d=s=>{s&&l(c+1);let t=n+1;t<e.length?r(t):u(!0)};return 0===e.length?(0,t.jsx)("div",{children:"Loading..."}):(0,t.jsxs)("div",{className:"quiz-container",children:[(0,t.jsxs)(a(),{children:[(0,t.jsx)("title",{children:"Quiz"}),(0,t.jsx)("link",{rel:"stylesheet",href:"/styles.css"})]}),(0,t.jsx)("header",{className:"quiz-header",children:(0,t.jsx)("h1",{children:"Canada Test Prep Quiz"})}),(0,t.jsx)("main",{className:"quiz-main",children:o?(0,t.jsxs)("div",{className:"score-section",children:["You scored ",c," out of ",e.length]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"question-section",children:[(0,t.jsxs)("div",{className:"question-count",children:[(0,t.jsxs)("span",{children:["Question ",n+1]}),"/",e.length]}),(0,t.jsx)("div",{className:"question-text",children:e[n].question})]}),(0,t.jsx)("div",{className:"answer-section",children:e[n].possible_answers.map((e,s)=>(0,t.jsx)("button",{onClick:()=>d(e.is_correct),className:"answer-button",children:e.answer_text},s))}),(0,t.jsxs)("div",{className:"quote-section",children:[(0,t.jsx)("blockquote",{children:e[n].quote}),(0,t.jsxs)("p",{children:["Source: ",(0,t.jsx)("a",{href:e[n].online_page,target:"_blank",rel:"noopener noreferrer",children:e[n].paragraph})]})]})]})}),(0,t.jsx)("footer",{className:"quiz-footer",children:"Canada Test Prep \xa92023"})]})}},9008:function(e,s,n){e.exports=n(7828)}},function(e){e.O(0,[888,774,179],function(){return e(e.s=6418)}),_N_E=e.O()}]);