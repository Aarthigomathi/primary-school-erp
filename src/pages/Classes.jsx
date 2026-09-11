import React,{useState} from "react";
import {Modal,PageTools} from "../components/ui";
import {primarySubjects} from "../data/seed";
import {Students} from "./Students";

function Classes({s}){const [open,setOpen]=useState(false),[name,setName]=useState("");return <><PageTools title="Classes & Subjects" sub="Primary sections, class teachers and subjects." action={()=>setOpen(true)} actionText="＋ Add Class"/><div className="class-grid">{s.classes.map((c,i)=><div className="class-card" key={c} onClick={()=>s.notify("Opened "+c+" details")} role="button" tabIndex="0"><span>Class</span><h2>{c}</h2><p>{20+i*3} Students</p><small>Class Teacher · {s.teachers[i%s.teachers.length]?.name||"Not assigned"}</small><div className="subject-line">{primarySubjects.join(" · ")}</div></div>)}</div>{open&&<Modal title="Add Class" onClose={()=>setOpen(false)}><form className="formgrid" onSubmit={e=>{e.preventDefault();if(!name.trim())return s.notify("Enter class name");s.setClasses([...s.classes,name.trim()]);s.notify("Class added successfully");setName("");setOpen(false)}}><label>Class Name<input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Grade 6-A"/></label><div className="modal-actions"><button type="button" className="secondary" onClick={()=>setOpen(false)}>Cancel</button><button className="primary">Add Class</button></div></form></Modal>}</>}

export {Classes};
