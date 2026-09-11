import React,{useEffect,useState} from "react";
import {Wallet,Trash2,Target,TrendingUp,TrendingDown,Zap} from "lucide-react";
import {Card,PageTools,Stat} from "../components/ui";
import {fmt,todayISO} from "../utils/format";
import {load,save} from "../utils/storage";

const expenseCategories=["EB Bill","Salaries","Maintenance","Stationery","Transport Fuel","Water","Internet & Phone","Events","Other"];
const incomeCategories=["Tuition Fees","Admission Fees","Transport Fees","Activity Fees","Donation","Other"];
const initialFinance=[
 {id:1,type:"income",category:"Tuition Fees",desc:"Term 2 collections",amount:320000,date:"2026-09-03",by:"School Admin"},
 {id:2,type:"income",category:"Admission Fees",desc:"4 new admissions",amount:60000,date:"2026-09-05",by:"School Admin"},
 {id:3,type:"expense",category:"Salaries",desc:"August staff salary",amount:210000,date:"2026-09-01",by:"School Admin"},
 {id:4,type:"expense",category:"EB Bill",desc:"August EB bill · 2,340 units × ₹7.5",amount:17550,date:"2026-09-04",by:"School Admin",units:2340,rate:7.5},
 {id:5,type:"expense",category:"Maintenance",desc:"Classroom fan repair",amount:4200,date:"2026-09-06",by:"School Admin"},
 {id:6,type:"expense",category:"Transport Fuel",desc:"Diesel · 2 buses",amount:18500,date:"2026-09-08",by:"School Admin"}
];
function Finance({s}){
 const [items,setItems]=useState(()=>load("bf_finance_v1",initialFinance));useEffect(()=>save("bf_finance_v1",items),[items]);
 const [type,setType]=useState("expense");const [f,setF]=useState({category:"EB Bill",desc:"",amount:"",date:todayISO(),units:"",rate:"7.5"});
 const [month,setMonth]=useState(todayISO().slice(0,7));
 const set=k=>e=>setF({...f,[k]:e.target.value});
 const isEB=type==="expense"&&f.category==="EB Bill";
 const ebAmount=isEB&&f.units&&f.rate?Math.round(Number(f.units)*Number(f.rate)):0;
 const submit=()=>{const amount=isEB?ebAmount:Number(f.amount);if(!amount)return s.notify("Enter a valid amount");const rec={id:Date.now(),type,category:f.category,desc:isEB?`${f.desc||"EB bill"} · ${f.units} units × ₹${f.rate}`:(f.desc||f.category),amount,date:f.date,by:"School Admin",...(isEB?{units:Number(f.units),rate:Number(f.rate)}:{})};setItems([rec,...items]);setF({...f,desc:"",amount:"",units:""});s.notify((type==="income"?"Income":"Expense")+" recorded · "+fmt(amount))};
 const del=id=>{setItems(items.filter(x=>x.id!==id));s.notify("Entry deleted")};
 const inMonth=items.filter(x=>x.date.startsWith(month));
 const income=inMonth.filter(x=>x.type==="income").reduce((a,x)=>a+x.amount,0),expense=inMonth.filter(x=>x.type==="expense").reduce((a,x)=>a+x.amount,0),net=income-expense;
 const expRate=income?Math.round(expense/income*100):0;
 const byCat=cats=>cats.map(c=>[c,inMonth.filter(x=>x.category===c).reduce((a,x)=>a+x.amount,0)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
 const eb=items.filter(x=>x.category==="EB Bill").sort((a,b)=>a.date<b.date?1:-1);
 const months=[...new Set(items.map(x=>x.date.slice(0,7)).concat(todayISO().slice(0,7)))].sort().reverse();
 return <><PageTools title="Finance" sub="Income, expenses, EB bills and cash-flow at a glance."/>
 <div className="stats"><Stat title="Income (+)" value={fmt(income)} sub="Positive · this month" icon={TrendingUp}/><Stat title="Expenses (−)" value={fmt(expense)} sub="Negative · this month" icon={TrendingDown}/><Stat title={net>=0?"Net Surplus":"Net Deficit"} value={(net<0?"− ":"+ ")+fmt(Math.abs(net))} sub={net>=0?"Positive balance":"Spending exceeds income"} icon={Wallet}/><Stat title="Expense Rate" value={expRate+"%"} sub={expRate>80?"⚠ High – review spending":"of income spent"} icon={Target}/></div>
 <div className="grid2">
  <Card title={"Finance Entry Form · 24/7"} action={<span className="pill live">● Always open</span>}>
   <div className="tabs small"><button type="button" className={type==="income"?"active pos":""} onClick={()=>{setType("income");setF({...f,category:"Tuition Fees"})}}>+ Income</button><button type="button" className={type==="expense"?"active neg":""} onClick={()=>{setType("expense");setF({...f,category:"EB Bill"})}}>− Expense</button></div>
   <div className="formgrid"><label>Category<select value={f.category} onChange={set("category")}>{(type==="income"?incomeCategories:expenseCategories).map(c=><option key={c}>{c}</option>)}</select></label><label>Date<input type="date" value={f.date} onChange={set("date")}/></label>
   {isEB?<><label>Units Consumed (kWh)<input type="number" value={f.units} onChange={set("units")} placeholder="e.g. 2340"/></label><label>Rate per Unit (₹)<input type="number" step="0.1" value={f.rate} onChange={set("rate")}/></label><label>Bill Amount<input value={ebAmount?fmt(ebAmount):"—"} readOnly/></label></>:<label>Amount (₹)<input type="number" value={f.amount} onChange={set("amount")} placeholder="0"/></label>}
   <label>Description<input value={f.desc} onChange={set("desc")} placeholder={isEB?"Month / meter no.":"What is this for?"}/></label></div>
   <button type="button" className={"primary full "+(type==="income"?"btn-pos":"btn-neg")} onClick={submit}>{type==="income"?<TrendingUp size={16}/>:<TrendingDown size={16}/>} Record {type==="income"?"Income":"Expense"}</button>
  </Card>
  <Card title="Positive vs Negative" action={<select value={month} onChange={e=>setMonth(e.target.value)}>{months.map(m=><option key={m}>{m}</option>)}</select>}>
   <div className="pn"><div className="pn-col pos"><h4><TrendingUp size={15}/> Positive (Income)</h4><strong>{fmt(income)}</strong>{byCat(incomeCategories).map(([c,v])=><div className="pn-row" key={c}><span>{c}</span><b>{fmt(v)}</b><i style={{width:Math.round(v/(income||1)*100)+"%"}}></i></div>)}{!income&&<small className="muted">No income this month</small>}</div>
   <div className="pn-col neg"><h4><TrendingDown size={15}/> Negative (Expense)</h4><strong>{fmt(expense)}</strong>{byCat(expenseCategories).map(([c,v])=><div className="pn-row" key={c}><span>{c}</span><b>{fmt(v)}</b><i style={{width:Math.round(v/(expense||1)*100)+"%"}}></i></div>)}{!expense&&<small className="muted">No expenses this month</small>}</div></div>
   <div className={"net-bar "+(net>=0?"pos":"neg")}><span>Net</span><b>{(net<0?"− ":"+ ")+fmt(Math.abs(net))}</b><small>Expense rate {expRate}%</small></div>
  </Card>
  <Card title="EB Bill Tracker" action={<Zap size={16}/>}>{eb.length===0&&<p className="muted">No EB bills yet.</p>}<table><thead><tr><th>Date</th><th>Units</th><th>Rate</th><th>Amount</th><th>Trend</th></tr></thead><tbody>{eb.map((b,i)=>{const prev=eb[i+1];const diff=prev?b.amount-prev.amount:0;return <tr key={b.id}><td>{b.date}</td><td>{b.units||"—"}</td><td>{b.rate?"₹"+b.rate:"—"}</td><td><b>{fmt(b.amount)}</b></td><td>{prev?<span className={diff>0?"txt-neg":"txt-pos"}>{diff>0?"▲":"▼"} {fmt(Math.abs(diff))}</span>:<span className="muted">—</span>}</td></tr>})}</tbody></table></Card>
  <Card title="Recent Transactions"><div className="txlist">{items.slice(0,12).map(x=><div className="tx" key={x.id}><span className={"tx-sign "+(x.type==="income"?"pos":"neg")}>{x.type==="income"?"+":"−"}</span><div><b>{x.category}</b><small>{x.desc} · {x.date}</small></div><b className={x.type==="income"?"txt-pos":"txt-neg"}>{fmt(x.amount)}</b><button type="button" className="link" onClick={()=>del(x.id)}><Trash2 size={14}/></button></div>)}</div></Card>
 </div></>}

export {expenseCategories,incomeCategories,initialFinance,Finance};
