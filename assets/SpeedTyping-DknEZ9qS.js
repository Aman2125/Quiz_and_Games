import{r as s,J as v,j as e,B as j}from"./index-Cob3UKuM.js";import{G as y}from"./GameLayout-o3S2lnJY.js";const u=["typescript","react","javascript","programming","developer","coding"],N=()=>{const[o,p]=s.useState(""),[x,c]=s.useState(""),[a,l]=s.useState(0),[r,i]=s.useState(30),[n,d]=s.useState(!1),f=()=>{d(!0),l(0),i(30),m()},m=()=>{const t=u[Math.floor(Math.random()*u.length)];p(t),c("")};s.useEffect(()=>{if(n&&r>0){const t=setInterval(()=>{i(h=>h-1)},1e3);return()=>clearInterval(t)}else r===0&&(d(!1),v.info(`Game Over! Final score: ${a}`))},[n,r]);const g=t=>{c(t.target.value),t.target.value===o&&(l(a+1),m())};return e.jsx(y,{title:"Speed Typing",children:e.jsx("div",{className:"flex flex-col items-center space-y-6",children:n?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"text-2xl font-bold",children:["Type: ",o]}),e.jsx("input",{type:"text",value:x,onChange:g,className:"border-2 border-primary rounded-md p-2 w-64",autoFocus:!0}),e.jsxs("div",{className:"text-xl",children:["Time left: ",r,"s"]}),e.jsxs("div",{className:"text-xl",children:["Score: ",a]})]}):e.jsx(j,{onClick:f,children:"Start Game"})})})};export{N as SpeedTyping};
