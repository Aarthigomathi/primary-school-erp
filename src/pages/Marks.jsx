import React,{useState} from "react";
import {PageTools} from "../components/ui";
import {marks} from "../data/seed";

function Marks({role,u,s}){const [local,setLocal]=useState(marks);const editable=role==="Teacher"||role==="Admin";return <><PageTools title={editable?"Exams & Marks":"My Marks / Report Card"} sub={editable?"Enter and save assessment marks.":"Academic performance overview."} action={editable?()=>{s.notify("Marks saved successfully")}:()=>s.notify("Report card opened")} actionText={editable?"Save Marks":"View Report"}/><div className="card"><div className="report-head"><div><b>{role==="Parent"?(u?.child||"Ananya Priya"):"Aarav Kumar"}</b><small>Grade 3-A · Unit Test 1</small></div><div className="score">{Math.round(local.reduce((a,x)=>a+Number(x.score),0)/local.length)}%<small>Overall</small></div></div><table><thead><tr><th>Subject</th><th>Score</th><th>Performance</th></tr></thead><tbody>{local.map((m,i)=><tr key={m.subject}><td><b>{m.subject}</b></td><td>{editable?<input className="table-input" type="number" min="0" max="100" value={m.score} onChange={e=>setLocal(local.map((x,j)=>j===i?{...x,score:e.target.value}:x))}/>:m.score+" / 100"}</td><td><span className="good">{Number(m.score)>=90?"Excellent":Number(m.score)>=75?"Good":"Needs Practice"}</span></td></tr>)}</tbody></table></div></>}

export {Marks};
