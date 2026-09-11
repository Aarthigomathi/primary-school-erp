import React,{useEffect,useState} from "react";
import {BookOpen,Search,Target,PlayCircle} from "lucide-react";
import {Modal,PageTools,Stat} from "../components/ui";
import {primarySubjects} from "../data/seed";
import {load,save} from "../utils/storage";

const initialDigital=[
 {id:1,title:"Multiplication Tables Song 2–10",type:"Video",subject:"Mathematics",grade:"Grade 3-A",duration:"6 min",icon:"🎬",views:128},
 {id:2,title:"Parts of a Plant – Interactive",type:"Interactive",subject:"EVS",grade:"Grade 4-B",duration:"10 min",icon:"🧩",views:96},
 {id:3,title:"Panchatantra Audio Stories",type:"Audio",subject:"English",grade:"Grade 2-B",duration:"25 min",icon:"🎧",views:210},
 {id:4,title:"Tamil Uyir Ezhuthukkal Flashcards",type:"E-book",subject:"Tamil",grade:"Grade 1-A",duration:"18 pages",icon:"📘",views:74},
 {id:5,title:"Hindi Varnamala Practice Sheets",type:"Worksheet",subject:"Hindi",grade:"Grade 1-A",duration:"6 pages",icon:"📝",views:58},
 {id:6,title:"Computer Basics – Input & Output",type:"Video",subject:"Computer Science",grade:"Grade 4-B",duration:"8 min",icon:"🎬",views:143},
 {id:7,title:"Good Habits Comic",type:"E-book",subject:"Moral Science",grade:"Grade 2-B",duration:"12 pages",icon:"📘",views:167},
 {id:8,title:"Yoga for Kids – Morning Routine",type:"Video",subject:"Yoga",grade:"Grade 3-A",duration:"12 min",icon:"🎬",views:88}
];
function DigitalLibrary({role,s}){
 const [items,setItems]=useState(()=>load("bf_digital_v1",initialDigital));useEffect(()=>save("bf_digital_v1",items),[items]);
 const [q,setQ]=useState("");const [type,setType]=useState("All");const [open,setOpen]=useState(null);
 const types=["Video","Audio","E-book","Interactive","Worksheet"];
 const list=items.filter(i=>(type==="All"||i.type===type)&&(i.title+i.subject+i.grade).toLowerCase().includes(q.toLowerCase()));
 const play=i=>{setItems(items.map(x=>x.id===i.id?{...x,views:x.views+1}:x));setOpen(i)};
 const assign=i=>{s.setHomeworkItems([...s.homeworkItems,{subject:i.subject,title:"Watch/read: "+i.title,due:"Tomorrow",completed:false}]);s.notify("Assigned as homework to "+i.grade)};
 const upload=()=>s.setModal(<DigitalForm s={s} onClose={()=>s.setModal(null)} onSave={r=>{setItems([{...r,id:Date.now(),views:0,icon:{Video:"🎬",Audio:"🎧","E-book":"📘",Interactive:"🧩",Worksheet:"📝"}[r.type]},...items]);s.setModal(null);s.notify("Resource uploaded to digital library")}}/>);
 return <><PageTools title="Digital Library" sub="Videos, audio stories, e-books and interactive lessons for primary classes." action={upload} actionText="Upload Resource"/>
 <div className="stats"><Stat title="Resources" value={items.length} sub="Digital assets" icon={PlayCircle}/><Stat title="Videos" value={items.filter(i=>i.type==="Video").length} sub="Lesson videos" icon={PlayCircle}/><Stat title="E-books" value={items.filter(i=>i.type==="E-book").length} sub="Readable online" icon={BookOpen}/><Stat title="Total Views" value={items.reduce((a,i)=>a+i.views,0)} sub="By students" icon={Target}/></div>
 <div className="card" style={{marginBottom:18}}><div className="search" style={{marginBottom:0}}><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search videos, e-books, worksheets..."/><select value={type} onChange={e=>setType(e.target.value)}><option>All</option>{types.map(t=><option key={t}>{t}</option>)}</select></div></div>
 <div className="dl-grid">{list.map(i=><div className="dl-card" key={i.id}><div className="dl-thumb" onClick={()=>play(i)}><span>{i.icon}</span><small>{i.type} · {i.duration}</small></div><h3>{i.title}</h3><p className="muted">{i.subject} · {i.grade}</p><div className="dl-foot"><small className="muted">👁 {i.views} views</small><button type="button" className="link" onClick={()=>play(i)}>{i.type==="Video"||i.type==="Audio"?"Play":"Open"}</button><button type="button" className="link" onClick={()=>assign(i)}>Assign</button></div></div>)}</div>
 {open&&<Modal title={open.title} onClose={()=>setOpen(null)}><div className="player"><span>{open.icon}</span><b>{open.type} · {open.subject} · {open.grade}</b><small>{open.duration}</small><div className="bar" style={{width:"80%"}}><i style={{width:"35%"}}></i></div><p className="muted" style={{fontSize:12}}>Demo player – in production this streams from the school's secure media server.</p></div></Modal>}
 </>}
function DigitalForm({s,onSave,onClose}){const [f,setF]=useState({title:"",type:"Video",subject:primarySubjects[0],grade:s.classes[0],duration:""});const set=k=>e=>setF({...f,[k]:e.target.value});return <Modal title="Upload Digital Resource" onClose={onClose}><div className="formgrid"><label>Title<input value={f.title} onChange={set("title")}/></label><label>Type<select value={f.type} onChange={set("type")}><option>Video</option><option>Audio</option><option>E-book</option><option>Interactive</option><option>Worksheet</option></select></label><label>Subject<select value={f.subject} onChange={set("subject")}>{primarySubjects.map(x=><option key={x}>{x}</option>)}</select></label><label>Class<select value={f.grade} onChange={set("grade")}>{s.classes.map(x=><option key={x}>{x}</option>)}</select></label><label>Duration / Pages<input value={f.duration} onChange={set("duration")} placeholder="e.g. 8 min"/></label><label>File<input type="file"/></label></div><button type="button" className="primary full" onClick={()=>{if(!f.title)return s.notify("Title required");onSave(f)}}>Upload</button></Modal>}

export {initialDigital,DigitalLibrary,DigitalForm};
