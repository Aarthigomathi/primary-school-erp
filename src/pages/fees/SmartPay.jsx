import React,{useEffect,useState} from "react";
import {Download,CreditCard,Percent} from "lucide-react";
import {Card} from "../../components/ui";
import {fmt,todayISO} from "../../utils/format";
import {load,save} from "../../utils/storage";

const defaultFeeHeads=[
 {id:1,name:"Tuition Fee",category:"Academic",amount:12000,frequency:"Term",mandatory:true},
 {id:2,name:"Admission Fee",category:"One-time",amount:15000,frequency:"Once",mandatory:true},
 {id:3,name:"Transport Fee",category:"Transport",amount:4000,frequency:"Term",mandatory:false},
 {id:4,name:"Activity Fee",category:"Co-curricular",amount:2000,frequency:"Term",mandatory:false},
 {id:5,name:"Books & Uniform",category:"Materials",amount:3500,frequency:"Annual",mandatory:false},
 {id:6,name:"Exam Fee",category:"Academic",amount:800,frequency:"Term",mandatory:true}
];
const siblingSlabs=[{n:1,pct:0,label:"1st child · Full fee"},{n:2,pct:10,label:"2nd child · 10% off"},{n:3,pct:20,label:"3rd child · 20% off"},{n:4,pct:30,label:"4th+ child · 30% off"}];
const initialPayments=[
 {id:1,student:"Aarav Kumar",parent:"Kumar Raj",heads:["Tuition Fee"],gross:12000,concession:0,net:12000,mode:"Online · UPI",ref:"UPI2609A1",date:"2026-09-03",by:"Parent"},
 {id:2,student:"Vihaan Raj",parent:"Kumar Raj",heads:["Tuition Fee","Transport Fee"],gross:16000,concession:1600,net:14400,mode:"Walk-in · Cash",ref:"RCPT-1042",date:"2026-09-04",by:"School Admin"}
];
function familyOf(students,student){const st=students.find(x=>x.name===student);if(!st)return [];const key=(st.parent||"").split(" ").pop().toLowerCase();return students.filter(x=>(x.parent||"").split(" ").pop().toLowerCase()===key)}
function SmartPay({s,heads,fees,setFees}){
 const [pay,setPay]=useState(()=>load("bf_payments_v1",initialPayments));useEffect(()=>save("bf_payments_v1",pay),[pay]);
 const [student,setStudent]=useState(s.students[0]?.name||"");const [selHeads,setSel]=useState(heads.filter(h=>h.mandatory).map(h=>h.name));
 const [mode,setMode]=useState("online");const [method,setMethod]=useState("UPI");const [extra,setExtra]=useState(0);const [busy,setBusy]=useState(false);
 const fam=familyOf(s.students,student);const order=fam.findIndex(x=>x.name===student)+1;const slab=siblingSlabs[Math.min(Math.max(order,1),4)-1];
 const gross=heads.filter(h=>selHeads.includes(h.name)).reduce((a,h)=>a+h.amount,0);const sib=Math.round(gross*slab.pct/100);const net=Math.max(0,gross-sib-Number(extra||0));
 const toggle=n=>setSel(selHeads.includes(n)?selHeads.filter(x=>x!==n):[...selHeads,n]);
 const collect=()=>{if(!gross)return s.notify("Select at least one fee head");setBusy(true);setTimeout(()=>{const ref=mode==="online"?method.slice(0,3).toUpperCase()+Date.now().toString().slice(-6):"RCPT-"+(1043+pay.length);const rec={id:Date.now(),student,parent:fam[0]?.parent||"",heads:selHeads,gross,concession:sib+Number(extra||0),net,mode:mode==="online"?"Online · "+method:"Walk-in · "+method,ref,date:todayISO(),by:mode==="online"?"Parent":"School Admin"};setPay([rec,...pay]);setFees(fees.map(f=>f.student===student&&selHeads.some(h=>f.head.startsWith(h))?{...f,status:"Paid"}:f));setBusy(false);s.notify((mode==="online"?"Online payment successful":"Walk-in payment collected")+" · Receipt "+ref)},900)};
 return <div className="grid2">
  <Card title="Smart Pay – Collect Fee" action={<span className="pill live">● Auto sibling concession</span>}>
   <div className="formgrid"><label>Student<select value={student} onChange={e=>setStudent(e.target.value)}>{s.students.map(x=><option key={x.name}>{x.name}</option>)}</select></label><label>Extra Concession (₹)<input type="number" value={extra} onChange={e=>setExtra(e.target.value)}/></label></div>
   <div className="sib-box"><Percent size={16}/><div><b>{slab.label}</b><small>Family: {fam.map(x=>x.name).join(", ")||"—"} ({fam.length} child{fam.length>1?"ren":""} · parent {fam[0]?.parent||"—"})</small></div><b className="txt-pos">− {fmt(sib)}</b></div>
   <div className="head-picker">{heads.map(h=><label key={h.id} className={"head-chip "+(selHeads.includes(h.name)?"on":"")}><input type="checkbox" checked={selHeads.includes(h.name)} onChange={()=>toggle(h.name)}/>{h.name}<b>{fmt(h.amount)}</b></label>)}</div>
   <div className="bill"><div><span>Gross</span><b>{fmt(gross)}</b></div><div><span>Sibling concession ({slab.pct}%)</span><b className="txt-pos">− {fmt(sib)}</b></div>{Number(extra)>0&&<div><span>Extra concession</span><b className="txt-pos">− {fmt(extra)}</b></div>}<div className="total"><span>Net Payable</span><b>{fmt(net)}</b></div></div>
   <div className="tabs small"><button type="button" className={mode==="online"?"active":""} onClick={()=>{setMode("online");setMethod("UPI")}}><CreditCard size={13}/> Online</button><button type="button" className={mode==="walkin"?"active":""} onClick={()=>{setMode("walkin");setMethod("Cash")}}>🏫 Walk-in</button></div>
   <div className="methods">{(mode==="online"?["UPI","Card","Net Banking","Wallet"]:["Cash","Cheque","DD","POS Card"]).map(m=><button type="button" key={m} className={"method "+(method===m?"on":"")} onClick={()=>setMethod(m)}>{m}</button>)}</div>
   <button type="button" className="primary full" disabled={busy} onClick={collect}>{busy?"Processing…":mode==="online"?`Pay ${fmt(net)} Online`:`Collect ${fmt(net)} at Counter`}</button>
  </Card>
  <Card title="Payment History">{pay.length===0&&<p className="muted">No payments yet.</p>}<div className="txlist">{pay.map(x=><div className="tx" key={x.id}><span className={"tx-sign "+(x.mode.startsWith("Online")?"pos":"neg")} style={{background:x.mode.startsWith("Online")?"#dbeafe":"#fef3c7",color:x.mode.startsWith("Online")?"#1d4ed8":"#b45309"}}>{x.mode.startsWith("Online")?"🌐":"🏫"}</span><div><b>{x.student} · {fmt(x.net)}</b><small>{x.heads.join(", ")} · {x.mode} · {x.ref} · {x.date}{x.concession>0&&<span className="txt-pos"> · saved {fmt(x.concession)}</span>}</small></div><button type="button" className="link" onClick={()=>s.notify("Receipt "+x.ref+" downloaded")}><Download size={14}/></button></div>)}</div></Card>
  <Card title="Sibling Concession Slabs"><table><thead><tr><th>Child</th><th>Concession</th><th>Applies to</th></tr></thead><tbody>{siblingSlabs.map(x=><tr key={x.n}><td><b>{x.label.split(" · ")[0]}</b></td><td><span className={x.pct?"present":"pill"}>{x.pct}%</span></td><td>All selected fee heads</td></tr>)}</tbody></table><p className="muted" style={{fontSize:11,marginTop:10}}>Siblings are auto-detected from the parent's family name in student records.</p></Card>
 </div>}

export {defaultFeeHeads,siblingSlabs,initialPayments,familyOf,SmartPay};
