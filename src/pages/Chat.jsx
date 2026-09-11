import React,{useEffect,useState} from "react";
import {BookOpen,ClipboardCheck,FileText,Send} from "lucide-react";
import {Stat} from "../components/ui";
import {initialChatMessages} from "../data/seed";
import {load,save} from "../utils/storage";

function Chat({role,u,s}){
 const [text,setText]=useState("");
 const isTeacher=role==="Teacher";
 const [lastSeen,setLastSeen]=useState(()=>load("bf_chat_seen_"+(isTeacher?"teacher":"parent"),0));
 useEffect(()=>{
   const sync=()=>s.setChatMessages(load("bf_chat_v3",initialChatMessages));
   window.addEventListener("storage",sync);
   const channel="BroadcastChannel" in window ? new BroadcastChannel("bright-future-school-chat") : null;
   if(channel) channel.onmessage=sync;
   const timer=setInterval(sync,500);
   return()=>{window.removeEventListener("storage",sync);if(channel)channel.close();clearInterval(timer)};
 },[]);
 useEffect(()=>{
   const relevant=s.chatMessages.filter(m=>m.from!==(isTeacher?"teacher":"parent"));
   const seen=load("bf_chat_seen_"+(isTeacher?"teacher":"parent"),0);
   if(relevant.length>seen){setLastSeen(relevant.length)}
 },[s.chatMessages.length,isTeacher]);
 const send=()=>{
   if(!text.trim())return s.notify("Type a message first");
   const msg={id:Date.now(),from:isTeacher?"teacher":"parent",name:u.name,text:text.trim(),time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})};
   const next=[...s.chatMessages,msg];
   s.setChatMessages(next);save("bf_chat_v3",next);
   if("BroadcastChannel" in window){const channel=new BroadcastChannel("bright-future-school-chat");channel.postMessage(msg);channel.close()}
   setText("");s.notify(isTeacher?"Reply sent to Priya Devi":"Message sent to Priya Sharma");
 };
 const contactName=isTeacher?"Priya Devi":"Priya Sharma";
 const contactSub=isTeacher?"Parent of Ananya Priya · Grade 3-A":"Class Teacher · Grade 3-A";
 const otherMessages=s.chatMessages.filter(m=>m.from!==(isTeacher?"teacher":"parent"));
 const unread=Math.max(0,otherMessages.length-lastSeen);
 return <div className="chat">
   <div className="chat-list">
     <div className="chat-list-title"><h3>{isTeacher?"Parent Messages":"Teacher Messages"}</h3>{unread>0&&<span className="chat-unread">{unread} new</span>}</div>
     <button type="button" className="chat-person active"><div className="avatar">{isTeacher?"P":"T"}</div><div><b>{contactName}</b><small>{contactSub}</small></div></button>
     <div className="chat-info">💬 <b>{s.chatMessages.length?"Conversation active":"No messages yet"}</b><br/><span>{isTeacher?"Messages sent by the parent appear here. Reply directly to continue the conversation.":"Send a message to your child's class teacher. The teacher can see it in Parent Messages."}</span></div>
   </div>
   <div className="chat-main">
     <div className="chat-head"><div className="avatar">{isTeacher?"P":"T"}</div><div><b>{contactName}</b><small className="chat-sub">{contactSub}</small></div><span className="chat-online">● Connected</span></div>
     <div className="messages">
       {!s.chatMessages.length&&<div className="chat-empty"><div>💬</div><b>Start the conversation</b><span>{isTeacher?"When a parent sends a message, it will appear here.":"Ask your child's teacher about homework, attendance or progress."}</span></div>}
       {s.chatMessages.map((m,i)=><div key={m.id||i} className={"bubble "+((m.from===(isTeacher?"teacher":"parent"))?"me":"other")}><small>{m.name} · {m.time}</small><div>{m.text}</div></div>)}
     </div>
     <div className="chat-input"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={isTeacher?"Reply to Priya Devi...":"Message Priya Sharma..."}/><button type="button" className="primary" onClick={send}><Send size={16}/> {isTeacher?"Reply":"Send"}</button></div>
   </div>
 </div>
}
function Child({u,s}){const child=s.students.find(x=>x.name===u?.child)||s.students[0];return <><div className="welcome"><div><h1>{child?.name||u?.child}</h1><p>{child?.className||"Grade 3-A"} · Roll No. {child?.roll||"—"}</p></div><span className="pill">Active Student</span></div><div className="stats"><Stat title="Attendance" value={child?.attendance||"—"} sub="Current" icon={ClipboardCheck}/><Stat title="Average" value="91%" sub="Unit Test 1" icon={FileText}/><Stat title="Homework" value={s.homeworkItems.length} sub="Shared assignments" icon={BookOpen}/></div><div className="card"><h3>Student Details</h3><div className="details"><span>Parent <b>{child?.parent||u?.name}</b></span><span>Class Teacher <b>Priya Sharma</b></span><span>Admission No. <b>BF2026-{child?.roll||"0032"}</b></span><span>Class <b>{child?.className||"Grade 3-A"}</b></span></div></div></>}

export {Chat,Child};
