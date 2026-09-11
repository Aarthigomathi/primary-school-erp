import React,{useEffect,useState} from "react";
import {FileText,CheckCircle2,Search,Library,Book} from "lucide-react";
import {Modal,PageTools,Stat} from "../components/ui";
import {primarySubjects} from "../data/seed";
import {load,save} from "../utils/storage";

const initialTextbooks=[
 {id:1,title:"Maths Magic – Class 3",subject:"Mathematics",grade:"Grade 3-A",publisher:"NCERT",stock:40,issued:38,pdf:true},
 {id:2,title:"Marigold – English Reader 3",subject:"English",grade:"Grade 3-A",publisher:"NCERT",stock:40,issued:40,pdf:true},
 {id:3,title:"Tamil Paadanool – Class 2",subject:"Tamil",grade:"Grade 2-B",publisher:"TN State Board",stock:35,issued:33,pdf:true},
 {id:4,title:"Looking Around – EVS 4",subject:"EVS",grade:"Grade 4-B",publisher:"NCERT",stock:38,issued:36,pdf:true},
 {id:5,title:"Rimjhim – Hindi 5",subject:"Hindi",grade:"Grade 5-A",publisher:"NCERT",stock:36,issued:30,pdf:false},
 {id:6,title:"Computer Masti – Level 4",subject:"Computer Science",grade:"Grade 4-B",publisher:"InOpen",stock:38,issued:38,pdf:true}
];
function Textbooks({role,s}){
 const [books,setBooks]=useState(()=>load("bf_textbooks_v1",initialTextbooks));useEffect(()=>save("bf_textbooks_v1",books),[books]);
 const [grade,setGrade]=useState("All");const [q,setQ]=useState("");
 const list=books.filter(b=>(grade==="All"||b.grade===grade)&&(b.title+b.subject+b.publisher).toLowerCase().includes(q.toLowerCase()));
 const add=()=>s.setModal(<TextbookForm s={s} onClose={()=>s.setModal(null)} onSave={b=>{setBooks([...books,{...b,id:Date.now()}]);s.setModal(null);s.notify("Textbook added")}}/>);
 const issue=id=>{setBooks(books.map(b=>b.id===id&&b.issued<b.stock?{...b,issued:b.issued+1}:b));s.notify("Textbook issued to student")};
 return <><PageTools title="Textbooks" sub="Prescribed textbooks per class, stock, distribution and e-book copies." action={add} actionText="Add Textbook"/>
 <div className="stats"><Stat title="Titles" value={books.length} sub="Prescribed books" icon={Book}/><Stat title="Total Stock" value={books.reduce((a,b)=>a+b.stock,0)} sub="Copies" icon={Library}/><Stat title="Distributed" value={books.reduce((a,b)=>a+b.issued,0)} sub={Math.round(books.reduce((a,b)=>a+b.issued,0)/(books.reduce((a,b)=>a+b.stock,0)||1)*100)+"% issued"} icon={CheckCircle2}/><Stat title="E-book Copies" value={books.filter(b=>b.pdf).length} sub="Available as PDF" icon={FileText}/></div>
 <div className="card"><div className="search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search textbook, subject or publisher..."/><select value={grade} onChange={e=>setGrade(e.target.value)}><option>All</option>{s.classes.map(c=><option key={c}>{c}</option>)}</select></div>
 <table><thead><tr><th>Textbook</th><th>Subject</th><th>Class</th><th>Publisher</th><th>Distribution</th><th>E-book</th><th>Action</th></tr></thead><tbody>{list.map(b=><tr key={b.id}><td><b>{b.title}</b></td><td>{b.subject}</td><td>{b.grade}</td><td>{b.publisher}</td><td>{b.issued} / {b.stock}<div className="bar" style={{marginTop:6}}><i style={{width:Math.round(b.issued/b.stock*100)+"%"}}></i></div></td><td>{b.pdf?<button type="button" className="link" onClick={()=>s.notify("Opening e-book: "+b.title)}>📄 Open PDF</button>:<span className="muted">—</span>}</td><td><button type="button" className="link" disabled={b.issued>=b.stock} onClick={()=>issue(b.id)}>{b.issued>=b.stock?"All issued":"Issue"}</button></td></tr>)}</tbody></table></div></>}
function TextbookForm({s,onSave,onClose}){const [f,setF]=useState({title:"",subject:primarySubjects[0],grade:s.classes[0],publisher:"NCERT",stock:40,issued:0,pdf:true});const set=k=>e=>setF({...f,[k]:e.target.type==="checkbox"?e.target.checked:e.target.value});return <Modal title="Add Textbook" onClose={onClose}><div className="formgrid"><label>Title<input value={f.title} onChange={set("title")}/></label><label>Subject<select value={f.subject} onChange={set("subject")}>{primarySubjects.map(x=><option key={x}>{x}</option>)}</select></label><label>Class<select value={f.grade} onChange={set("grade")}>{s.classes.map(x=><option key={x}>{x}</option>)}</select></label><label>Publisher<input value={f.publisher} onChange={set("publisher")}/></label><label>Stock<input type="number" value={f.stock} onChange={set("stock")}/></label></div><label className="chk"><input type="checkbox" checked={f.pdf} onChange={set("pdf")}/> E-book (PDF) available</label><button type="button" className="primary full" onClick={()=>{if(!f.title)return s.notify("Title required");onSave({...f,stock:Number(f.stock),issued:0})}}>Add</button></Modal>}

export {initialTextbooks,Textbooks,TextbookForm};
