import React,{useState} from "react";
import {FileText,Wallet,CheckCircle2,Download,AlertTriangle} from "lucide-react";
import {Card,Stat} from "../../components/ui";
import {fmt} from "../../utils/format";

function FeeReports({s,fees}){
 const [by,setBy]=useState("class");const [status,setStatus]=useState("All");const [cls,setCls]=useState("All");const [from,setFrom]=useState("2026-08-01");const [to,setTo]=useState("2026-12-31");
 const cols=["Student","Class","Parent","Fee Head","Amount","Due","Status"];const [vis,setVis]=useState(cols);
 const rows=fees.filter(f=>(status==="All"||f.status===status)&&(cls==="All"||f.className===cls)&&f.due>=from&&f.due<=to);
 const key=by==="class"?"className":by==="head"?"head":by==="status"?"status":"student";
 const groups=[...new Set(rows.map(r=>r[key]))].map(g=>{const rs=rows.filter(r=>r[key]===g);return {g,count:rs.length,total:rs.reduce((a,r)=>a+r.amount,0),paid:rs.filter(r=>r.status==="Paid").reduce((a,r)=>a+r.amount,0)}});
 const cell=(r,c)=>c==="Student"?r.student:c==="Class"?r.className:c==="Parent"?r.parent:c==="Fee Head"?r.head:c==="Amount"?fmt(r.amount):c==="Due"?r.due:r.status;
 const exp=()=>{const csv=[vis.join(","),...rows.map(r=>vis.map(c=>String(cell(r,c)).replace("₹","")).join(","))].join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="fee-report.csv";a.click();s.notify("Report exported as CSV")};
 return <>
  <div className="card" style={{marginBottom:18}}><div className="card-head"><h3>Tailor Your Report</h3><button type="button" className="primary sm" onClick={exp}><Download size={14}/> Export CSV</button></div>
  <div className="formgrid four"><label>Group By<select value={by} onChange={e=>setBy(e.target.value)}><option value="class">Class</option><option value="head">Fee Head</option><option value="status">Status</option><option value="student">Student</option></select></label><label>Status<select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Paid</option><option>Pending</option></select></label><label>Class<select value={cls} onChange={e=>setCls(e.target.value)}><option>All</option>{s.classes.map(c=><option key={c}>{c}</option>)}</select></label><label>Due From<input type="date" value={from} onChange={e=>setFrom(e.target.value)}/></label><label>Due To<input type="date" value={to} onChange={e=>setTo(e.target.value)}/></label></div>
  <div className="head-picker" style={{marginTop:12}}>{cols.map(c=><label key={c} className={"head-chip "+(vis.includes(c)?"on":"")}><input type="checkbox" checked={vis.includes(c)} onChange={()=>setVis(vis.includes(c)?vis.filter(x=>x!==c):cols.filter(x=>vis.includes(x)||x===c))}/>{c}</label>)}</div></div>
  <div className="stats"><Stat title="Records" value={rows.length} sub="Matching filters" icon={FileText}/><Stat title="Demand" value={fmt(rows.reduce((a,r)=>a+r.amount,0))} sub="Total" icon={Wallet}/><Stat title="Collected" value={fmt(rows.filter(r=>r.status==="Paid").reduce((a,r)=>a+r.amount,0))} sub="Paid" icon={CheckCircle2}/><Stat title="Outstanding" value={fmt(rows.filter(r=>r.status!=="Paid").reduce((a,r)=>a+r.amount,0))} sub="Pending" icon={AlertTriangle}/></div>
  <div className="grid2"><Card title={"Summary by "+({class:"Class",head:"Fee Head",status:"Status",student:"Student"})[by]}><table><thead><tr><th>{by}</th><th>Records</th><th>Demand</th><th>Collected</th><th>%</th></tr></thead><tbody>{groups.map(g=><tr key={g.g}><td><b>{g.g}</b></td><td>{g.count}</td><td>{fmt(g.total)}</td><td>{fmt(g.paid)}</td><td><div className="bar" style={{marginTop:0}}><i style={{width:Math.round(g.paid/g.total*100)+"%"}}></i></div></td></tr>)}</tbody></table></Card>
  <Card title="Detailed Records"><table><thead><tr>{vis.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.id}>{vis.map(c=><td key={c}>{c==="Status"?<span className={r.status==="Paid"?"present":"pending"}>{r.status}</span>:cell(r,c)}</td>)}</tr>)}</tbody></table></Card></div>
 </>}

export {FeeReports};
