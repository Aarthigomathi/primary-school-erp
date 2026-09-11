import React,{useEffect,useState} from "react";
import {Card,PageTools} from "../components/ui";
import {initialProgress} from "../data/seed";
import {load,save} from "../utils/storage";

function ProgressTracker({role,u,s}){
 const editable=role==="Teacher"||role==="Admin";
 const defaultStudent=role==="Parent"?(u?.child||"Ananya Priya"):role==="Student"?"Aarav Kumar":(s.students[0]?.name||"Aarav Kumar");
 const [all,setAll]=useState(()=>load("bf_progress",initialProgress));
 const [selected,setSelected]=useState(defaultStudent);
 const [draft,setDraft]=useState(()=>load("bf_progress",initialProgress)[defaultStudent]||initialProgress["Aarav Kumar"]);
 useEffect(()=>save("bf_progress",all),[all]);
 const choose=name=>{setSelected(name);setDraft(all[name]||{academic:80,homework:80,attendance:90,participation:80,reading:80,math:80,goal:"Set a monthly learning goal",goalDone:false,remark:""})};
 const set=(k,v)=>setDraft({...draft,[k]:v});
 const saveProgress=()=>{setAll({...all,[selected]:draft});s.notify("Progress updated — visible to Student and Parent portals")};
 const markGoal=()=>{const next={...draft,goalDone:!draft.goalDone};setDraft(next);setAll({...all,[selected]:next});s.notify(next.goalDone?"Goal completed 🎉":"Goal marked incomplete")};
 const avg=Math.round((Number(draft.academic)+Number(draft.homework)+Number(draft.attendance)+Number(draft.participation))/4);
 return <><PageTools title="Student Progress Tracker" sub={editable?"Update a student's overall learning progress and monthly goal.":"Track learning growth, activities and monthly goals."} action={editable?saveProgress:null} actionText="Save Progress"/>
 <div className="grid2"><Card title="Student"><label>Student<select value={selected} disabled={role==="Parent"||role==="Student"} onChange={e=>choose(e.target.value)}>{s.students.map(x=><option key={x.name}>{x.name}</option>)}</select></label><div className="progress-hero"><div className="avatar huge">{selected[0]}</div><div><h2>{selected}</h2><p>{s.students.find(x=>x.name===selected)?.className||"Grade 3-A"}</p><strong>{avg}% Overall Progress</strong></div></div></Card>
 <Card title="Monthly Goal"><div className="goal-box"><div><span className="goal-icon">🎯</span><div><b>{draft.goal||"No goal set"}</b><small>{draft.goalDone?"Completed this month":"In progress"}</small></div></div>{editable?<button type="button" className={draft.goalDone?"status present":"primary"} onClick={markGoal}>{draft.goalDone?"Completed":"Mark Complete"}</button>:<button type="button" className={draft.goalDone?"status present":"secondary"} onClick={role==="Student"?markGoal:undefined}>{draft.goalDone?"Completed":"In Progress"}</button>}</div></Card></div>
 <div className="progress-grid">{[["Academic Performance","academic","📚"],["Homework Completion","homework","📝"],["Attendance","attendance","📅"],["Class Participation","participation","🙋"],["Reading Skills","reading","📖"],["Mathematics","math","➗"]].map(([label,key,icon])=><div className="progress-card" key={key}><div><span>{icon}</span><b>{label}</b><strong>{draft[key]}%</strong></div><div className="bar"><i style={{width:Number(draft[key])+"%"}}></i></div>{editable&&<input type="range" min="0" max="100" value={draft[key]} onChange={e=>set(key,e.target.value)}/>}</div>)}</div>
 <Card title="Teacher Remark"><textarea rows="3" disabled={!editable} value={draft.remark||""} onChange={e=>set("remark",e.target.value)} placeholder="Add a remark about the student's progress..."/></Card>
 </>;
}

export {ProgressTracker};
