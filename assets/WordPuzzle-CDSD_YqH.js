import{r as o,j as e,I as b,B as d,t as u}from"./index-Cob3UKuM.js";import{G as v}from"./GameLayout-BD15eL7F.js";const m=["REACT","TYPESCRIPT","JAVASCRIPT","PROGRAMMING","DEVELOPER"];function E(){const[n,x]=o.useState(""),[p,h]=o.useState(""),[c,l]=o.useState(""),[f,j]=o.useState(0);o.useEffect(()=>{a()},[]);const S=t=>{const s=t.split("");for(let r=s.length-1;r>0;r--){const i=Math.floor(Math.random()*(r+1));[s[r],s[i]]=[s[i],s[r]]}return s.join("")},a=()=>{const t=m[Math.floor(Math.random()*m.length)];x(t),h(S(t)),l("")},g=t=>{t.preventDefault(),c.toUpperCase()===n?(u({title:"Correct!",description:"Well done! Try another word."}),j(s=>s+1),a()):u({title:"Incorrect",description:"Try again!",variant:"destructive"})};return e.jsx(v,{title:"Word Puzzle",children:e.jsxs("div",{className:"flex flex-col items-center gap-6",children:[e.jsxs("div",{className:"text-2xl font-bold",children:["Score: ",f]}),e.jsx("div",{className:"text-4xl font-bold tracking-wider",children:p}),e.jsxs("form",{onSubmit:g,className:"flex flex-col items-center gap-4",children:[e.jsx(b,{type:"text",value:c,onChange:t=>l(t.target.value.toUpperCase()),placeholder:"Enter your guess",className:"text-center uppercase",maxLength:n.length}),e.jsxs("div",{className:"space-x-4",children:[e.jsx(d,{type:"submit",children:"Submit"}),e.jsx(d,{type:"button",variant:"outline",onClick:a,children:"New Word"})]})]})]})})}export{E as WordPuzzle};
