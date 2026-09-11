import React,{useState} from "react";
import {ChevronRight,School} from "lucide-react";
import {accounts,portalAccounts,teacherAccounts} from "../data/seed";

function Login({onLogin}){
 const [role,setRole]=useState("admin"),[email,setEmail]=useState(accounts.admin.email),[password,setPassword]=useState(accounts.admin.password),[err,setErr]=useState("");
 const [teacherName,setTeacherName]=useState(teacherAccounts[0]?.name||"");
 const choose=r=>{setRole(r);setErr("");if(r==="teacher"){const t=teacherAccounts.find(x=>x.name===teacherName)||teacherAccounts[0];if(t){setEmail(t.email);setPassword(t.password);setTeacherName(t.name)}}else{setEmail(accounts.admin.email);setPassword(accounts.admin.password)}};
 const chooseTeacher=name=>{setTeacherName(name);const t=teacherAccounts.find(x=>x.name===name);if(t){setEmail(t.email);setPassword(t.password)}setErr("")};
 const submit=e=>{e.preventDefault();const normalized=email.trim().toLowerCase();const candidates=role==="teacher"?teacherAccounts:[accounts.admin];const a=candidates.find(x=>normalized===x.email.toLowerCase()&&password===x.password);if(a)onLogin(a);else setErr(role==="teacher"?"Invalid teacher login. Select a teacher or enter a valid staff email.":"Invalid demo login details")};
 const demoText=role==="teacher"?"Any teacher account · Password: teacher123 · Example: meena.joseph@school.demo":`${accounts.admin.email} / ${accounts.admin.password}`;
 return <div className="login"><div className="login-card"><div className="brand big"><div className="brand-icon"><School/></div><div><b>Bright Future</b><span>Primary School ERP</span></div></div><h1>Welcome back 👋</h1><p className="muted">Choose your school portal to continue.</p><div className="role-grid">{Object.keys(portalAccounts).map(r=><button type="button" className={"role "+(role===r?"selected":"")} onClick={()=>choose(r)} key={r}><span>{r==="admin"?"👨‍💼":"👩‍🏫"}</span><b>{portalAccounts[r].role}</b><small>{r==="admin"?"Administration":"Teaching & Classwork"}</small></button>)}</div>{role==="teacher"&&<label className="teacher-login-select">Select Teacher<select value={teacherName} onChange={e=>chooseTeacher(e.target.value)}>{teacherAccounts.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}</select></label>}<form onSubmit={submit}><label>Official Email<input value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label>{err&&<div className="error">{err}</div>}<button className="primary full">Login as {portalAccounts[role].role}<ChevronRight size={18}/></button></form><div className="demo-hint"><b>Demo credentials</b><br/>{demoText}<br/><small>Only 2 portals: Admin and Teacher. All staff teachers use Teacher.</small></div></div></div>
}

export {Login};
