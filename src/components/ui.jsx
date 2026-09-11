import React from "react";
import {Plus} from "lucide-react";

function Modal({title,onClose,children}){return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><div className="card-head"><h3>{title}</h3><button type="button" className="iconbtn" onClick={onClose}>✕</button></div>{children}</div></div>}
function Stat({title,value,sub,icon:Icon,onClick}){return <div className={"stat "+(onClick?"clickable":"")} onClick={onClick}><div className="stat-top"><span>{title}</span><div className="stat-icon"><Icon size={19}/></div></div><strong>{value}</strong><small>{sub}</small></div>}
function Card({title,children,action}){return <div className="card"><div className="card-head"><h3>{title}</h3>{Array.isArray(action)?<button type="button" className="link" onClick={action[1]}>{action[0]}</button>:action}</div>{children}</div>}
function Activity({text,time}){return <div className="activity"><span className="dot"></span><div><b>{text}</b><small>{time}</small></div></div>}
function Task({text,done,onClick}){return <div className={"task "+(onClick?"clickable":"")} onClick={onClick}><span className={done?"check done":"check"}>{done?"✓":""}</span><span>{text}</span></div>}
function TimeRows({rows}){return <div>{rows.map((x,i)=><div className="time-row" key={i}><b>{x[1]}</b><span>{x[2]}</span><small>{x[3]}</small></div>)}</div>}
function PageTools({title,sub,action,actionText}){return <div className="page-tools"><div><h1>{title}</h1><p className="muted">{sub}</p></div>{action&&<button type="button" className="primary" onClick={action}><Plus size={17}/>{actionText.replace("＋","")}</button>}</div>}

export {Modal,Stat,Card,Activity,Task,TimeRows,PageTools};
