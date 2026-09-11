import React,{useEffect,useState} from "react";
import {Users,Bus,CheckCircle2,AlertTriangle,MapPin,Phone} from "lucide-react";
import {Card,PageTools,Stat} from "../components/ui";

const busRoutes=[
 {id:"R4",name:"Route 4 – North Zone",bus:"TN 38 AB 2026",driver:"Suresh Kumar",phone:"98400 33001",students:42,start:"07:20",stops:["School Depot","Gandhipuram","Main Road Stop","Temple Stop","RS Puram","Bright Future School"],mins:[0,8,15,22,30,40]},
 {id:"R2",name:"Route 2 – East Zone",bus:"TN 38 CD 1188",driver:"Mani Raj",phone:"98400 33002",students:36,start:"07:25",stops:["School Depot","Peelamedu","Hope College","Avinashi Road","Lakshmi Mills","Bright Future School"],mins:[0,7,14,21,29,38]},
 {id:"R7",name:"Route 7 – South Zone",bus:"TN 38 EF 4410",driver:"Karthik S",phone:"98400 33003",students:29,start:"07:30",stops:["School Depot","Ukkadam","Sungam","Ramanathapuram","Puliakulam","Bright Future School"],mins:[0,9,16,24,31,42]}
];
function Transport({s,role,u}){
 const [sel,setSel]=useState(busRoutes[0].id);const [tick,setTick]=useState(0);const [live,setLive]=useState(true);const [speed,setSpeed]=useState(1);
 useEffect(()=>{if(!live)return;const t=setInterval(()=>setTick(x=>x+1),1000);return()=>clearInterval(t)},[live]);
 const r=busRoutes.find(x=>x.id===sel);const totalMin=r.mins[r.mins.length-1];
 const elapsed=(tick*speed*0.25)%(totalMin+3);
 const idx=r.mins.findIndex((m,i)=>elapsed<m&&i>0);const nextI=idx===-1?r.mins.length-1:idx;const prevI=Math.max(0,nextI-1);
 const done=elapsed>=totalMin;const segFrac=done?1:(elapsed-r.mins[prevI])/(r.mins[nextI]-r.mins[prevI]);
 const progress=done?100:((prevI+segFrac)/(r.stops.length-1))*100;
 const eta=done?0:Math.max(0,Math.ceil(r.mins[nextI]-elapsed));
 const kmh=done?0:Math.round(22+10*Math.abs(Math.sin(tick/3)));
 const clock=m=>{const [h,mm]=r.start.split(":").map(Number);const d=new Date(2026,0,1,h,mm+m);return d.toTimeString().slice(0,5)};
 const status=done?"Reached School":segFrac<0.08&&prevI>0?"At "+r.stops[prevI]:"Moving to "+r.stops[nextI];
 return <><PageTools title="Transport Tracking" sub="Live GPS-style tracking of school buses, stops and ETA." action={()=>s.notify("Route alert sent to all parents on "+r.name)} actionText="Notify Parents"/>
 <div className="stats"><Stat title="Buses on Road" value={busRoutes.length} sub="All routes active" icon={Bus}/><Stat title="Students on Board" value={busRoutes.reduce((a,x)=>a+x.students,0)} sub="Across all routes" icon={Users}/><Stat title="On Time" value={busRoutes.length-0} sub="No delays reported" icon={CheckCircle2}/><Stat title="Alerts" value={0} sub="No incidents" icon={AlertTriangle}/></div>
 <div className="grid2">
  <Card title="Routes"><div className="route-list">{busRoutes.map(x=><button type="button" key={x.id} className={"route-item "+(sel===x.id?"active":"")} onClick={()=>{setSel(x.id);setTick(0)}}><span className="bus-badge">🚌</span><div><b>{x.name}</b><small>{x.bus} · {x.driver} · {x.students} students</small></div><span className="present">Live</span></button>)}</div></Card>
  <Card title={r.name} action={<span className={"pill "+(live?"live":"")}>{live?"● LIVE":"Paused"}</span>}>
   <div className="track-head"><div><b>{r.bus}</b><br/><small className="muted">Driver {r.driver} · {r.phone}</small></div><div className="track-kpis"><span><b>{kmh}</b><small>km/h</small></span><span><b>{eta}</b><small>min ETA</small></span><span><b>{Math.round(progress)}%</b><small>route</small></span></div></div>
   <div className="track"><div className="track-line"><i style={{width:progress+"%"}}></i><span className="bus-marker" style={{left:progress+"%"}}>🚌</span></div><div className="stops">{r.stops.map((st,i)=>{const reached=done||i<=prevI&&!(i===prevI&&segFrac<0.02&&i>0)||i===0;const cur=!done&&i===nextI;return <div className={"stop "+(reached?"done":"")+(cur?" next":"")} key={st}><span className="dot"></span><b>{st}</b><small>{clock(r.mins[i])}</small></div>})}</div></div>
   <div className={"track-status "+(done?"ok":"")}><MapPin size={15}/> {status}{!done&&<> · ETA {clock(r.mins[nextI])}</>}</div>
   <div className="track-ctrl"><button type="button" className="link" onClick={()=>setLive(!live)}>{live?"Pause":"Resume"}</button><button type="button" className="link" onClick={()=>setSpeed(speed===1?4:1)}>Speed {speed}×</button><button type="button" className="link" onClick={()=>setTick(0)}>Restart Trip</button><button type="button" className="link" onClick={()=>s.notify("Calling driver "+r.driver)}><Phone size={13}/> Call Driver</button></div>
  </Card>
  <Card title="Today's Pickup Log">{[["Aarav Kumar","Main Road Stop","07:41","Boarded"],["Ananya Priya","Temple Stop","07:49","Boarded"],["Dhruv Anand","RS Puram","07:56",done?"Boarded":"Waiting"],["Vihaan Raj","Gandhipuram","07:29","Boarded"]].map(x=><div className="activity" key={x[0]}><span className="dot"></span><div><b>{x[0]} · {x[2]}</b><small>{x[1]}</small></div><span className={x[3]==="Boarded"?"present":"pending"} style={{marginLeft:"auto"}}>{x[3]}</span></div>)}</Card>
  <Card title="Route Health"><table><thead><tr><th>Route</th><th>Bus</th><th>Students</th><th>Departs</th><th>Trip</th><th>Status</th></tr></thead><tbody>{busRoutes.map(x=><tr key={x.id}><td><b>{x.name}</b></td><td>{x.bus}</td><td>{x.students}</td><td>{x.start}</td><td>{x.mins[x.mins.length-1]} min</td><td><span className="present">On Schedule</span></td></tr>)}</tbody></table></Card>
 </div></>}

export {busRoutes,Transport};
