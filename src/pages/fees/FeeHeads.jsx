import React,{useState} from "react";
import {Plus,Trash2} from "lucide-react";
import {Card} from "../../components/ui";

function FeeHeads({s,heads,setHeads}){
 const [f,setF]=useState({name:"",category:"Academic",amount:"",frequency:"Term",mandatory:false});const set=k=>e=>setF({...f,[k]:e.target.type==="checkbox"?e.target.checked:e.target.value});
 const cats=["Academic","One-time","Transport","Co-curricular","Materials","Hostel","Other"];
 const add=()=>{if(!f.name||!f.amount)return s.notify("Name and amount required");setHeads([...heads,{...f,id:Date.now(),amount:Number(f.amount)}]);setF({name:"",category:"Academic",amount:"",frequency:"Term",mandatory:false});s.notify("Fee head added")};
 const upd=(id,k,v)=>setHeads(heads.map(h=>h.id===id?{...h,[k]:k==="amount"?Number(v):v}:h));
 return <div className="grid2">
  <Card title="Add Fee Head"><div className="formgrid"><label>Head Name<input value={f.name} onChange={set("name")} placeholder="e.g. Lab Fee"/></label><label>Category<select value={f.category} onChange={set("category")}>{cats.map(c=><option key={c}>{c}</option>)}</select></label><label>Amount (₹)<input type="number" value={f.amount} onChange={set("amount")}/></label><label>Frequency<select value={f.frequency} onChange={set("frequency")}><option>Monthly</option><option>Term</option><option>Annual</option><option>Once</option></select></label></div><label className="chk"><input type="checkbox" checked={f.mandatory} onChange={set("mandatory")}/> Mandatory for all students</label><button type="button" className="primary full" onClick={add}><Plus size={16}/> Add Fee Head</button></Card>
  <Card title={`Fee Heads & Categories (${heads.length})`}><table><thead><tr><th>Head</th><th>Category</th><th>Amount</th><th>Frequency</th><th>Type</th><th></th></tr></thead><tbody>{heads.map(h=><tr key={h.id}><td><input className="inline" value={h.name} onChange={e=>upd(h.id,"name",e.target.value)}/></td><td><select className="inline" value={h.category} onChange={e=>upd(h.id,"category",e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></td><td><input className="inline" type="number" value={h.amount} onChange={e=>upd(h.id,"amount",e.target.value)}/></td><td>{h.frequency}</td><td><button type="button" className={h.mandatory?"present":"pending"} onClick={()=>upd(h.id,"mandatory",!h.mandatory)}>{h.mandatory?"Mandatory":"Optional"}</button></td><td><button type="button" className="link" onClick={()=>{setHeads(heads.filter(x=>x.id!==h.id));s.notify("Fee head removed")}}><Trash2 size={14}/></button></td></tr>)}</tbody></table></Card>
 </div>}

export {FeeHeads};
