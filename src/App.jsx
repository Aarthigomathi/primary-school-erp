import React,{useEffect,useState} from "react";
import {LogOut,Menu,School} from "lucide-react";
import {initialAvailabilityRequests,initialChatMessages,initialClasses,initialHomework,initialLibrary,initialNotices,initialStudents,initialSubstitutions,initialTeachers,navs} from "./data/seed";
import {Attendance} from "./pages/Attendance";
import {Calendar} from "./pages/Calendar";
import {Chat,Child} from "./pages/Chat";
import {Classes} from "./pages/Classes";
import {Dashboard} from "./pages/Dashboard";
import {DigitalLibrary} from "./pages/DigitalLibrary";
import {Finance} from "./pages/Finance";
import {Homework} from "./pages/Homework";
import {LibraryPage} from "./pages/LibraryPage";
import {Login} from "./pages/Login";
import {Marks} from "./pages/Marks";
import {Leave,Profile,Reports,SettingsPage,UsersPage} from "./pages/Misc";
import {Notices} from "./pages/Notices";
import {Payroll} from "./pages/Payroll";
import {ProgressTracker} from "./pages/ProgressTracker";
import {ReportUnavailability,StaffRequests,SubstitutionDuty,SubstitutionPlanner} from "./pages/StaffRequests";
import {Students} from "./pages/Students";
import {Teachers} from "./pages/Teachers";
import {Textbooks} from "./pages/Textbooks";
import {Timetable} from "./pages/Timetable";
import {Transport} from "./pages/Transport";
import {Fees} from "./pages/fees/Fees";
import {load,save} from "./utils/storage";

function App(){
 const [user,setUser]=useState(null),[page,setPage]=useState("Dashboard"),[mobile,setMobile]=useState(false),[toast,setToast]=useState("");
 const [students,setStudents]=useState(()=>load("bf_students",initialStudents));
 const [teachers,setTeachers]=useState(()=>load("bf_teachers_v2",initialTeachers));
 const [classes,setClasses]=useState(()=>load("bf_classes",initialClasses));
 const [homeworkItems,setHomeworkItems]=useState(()=>load("bf_homework_v2",initialHomework));
 const [notices,setNotices]=useState(()=>load("bf_notices",initialNotices));
 const [attendance,setAttendance]=useState(()=>load("bf_attendance",{}));
 const [chatMessages,setChatMessages]=useState(()=>load("bf_chat_v3",initialChatMessages));
 const [library,setLibrary]=useState(()=>load("bf_library_v2",initialLibrary));
 const [substitutions,setSubstitutions]=useState(()=>load("bf_substitutions_v1",initialSubstitutions));
 const [availabilityRequests,setAvailabilityRequests]=useState(()=>load("bf_staff_requests_v1",initialAvailabilityRequests));
 const [modal,setModal]=useState(null);
 useEffect(()=>save("bf_students",students),[students]);useEffect(()=>save("bf_teachers_v2",teachers),[teachers]);useEffect(()=>save("bf_classes",classes),[classes]);useEffect(()=>save("bf_homework_v2",homeworkItems),[homeworkItems]);useEffect(()=>save("bf_notices",notices),[notices]);useEffect(()=>save("bf_attendance",attendance),[attendance]);useEffect(()=>save("bf_chat_v3",chatMessages),[chatMessages]);useEffect(()=>save("bf_library_v2",library),[library]);useEffect(()=>save("bf_substitutions_v1",substitutions),[substitutions]);useEffect(()=>save("bf_staff_requests_v1",availabilityRequests),[availabilityRequests]);
 const notify=m=>{setToast(m);window.clearTimeout(window.__bfToast);window.__bfToast=window.setTimeout(()=>setToast(""),2200)};
 if(!user)return <Login onLogin={u=>{setUser(u);setPage("Dashboard")}}/>;
 const nav=navs[user.role];
 const shared={students,setStudents,teachers,setTeachers,classes,setClasses,homeworkItems,setHomeworkItems,notices,setNotices,attendance,setAttendance,chatMessages,setChatMessages,library,setLibrary,substitutions,setSubstitutions,availabilityRequests,setAvailabilityRequests,setModal,notify,setPage};
 const logout=()=>{setUser(null);setPage("Dashboard");setModal(null)};
 return <div className="app"><aside className={mobile?"open":""}><div className="brand"><div className="brand-icon"><School/></div><div><b>Bright Future</b><span>Primary School ERP</span></div></div><div className="portal">{user.role} PORTAL</div><nav>{nav.map(([label,key,Icon])=>{const chatUnread=user.role==="Teacher"&&key==="Parent Messages"?Math.max(0,shared.chatMessages.filter(m=>m.from==="parent").length-load("bf_chat_seen_teacher",0)):user.role==="Parent"&&key==="Teacher Chat"?Math.max(0,shared.chatMessages.filter(m=>m.from==="teacher").length-load("bf_chat_seen_parent",0)):0;return <button type="button" className={page===key?"active":""} onClick={()=>{setPage(key);setMobile(false);if(key==="Parent Messages")save("bf_chat_seen_teacher",shared.chatMessages.filter(m=>m.from==="parent").length);if(key==="Teacher Chat")save("bf_chat_seen_parent",shared.chatMessages.filter(m=>m.from==="teacher").length)}} key={key}><Icon size={18}/><span className="nav-label">{label}</span>{chatUnread>0&&<span className="nav-badge">{chatUnread}</span>}</button>})}</nav><button type="button" className="logout" onClick={logout}><LogOut size={18}/> Logout</button></aside><main><header><button type="button" className="mobile-menu" onClick={()=>setMobile(!mobile)}><Menu/></button><div><h2>{page}</h2><span className="muted">Good morning, {user.name}</span></div><div className="header-right"><button type="button" className="iconbtn" onClick={()=>setPage(user.role==="Parent"?"Notices":"Notices")}>🔔</button><button type="button" className="avatar" onClick={()=>setPage(user.role==="Teacher"?"My Profile":"Dashboard")}>{user.name[0]}</button></div></header><section className="content">{renderPage(page,user,shared)}</section></main>{toast&&<div className="toast">{toast}</div>}{modal}</div>
}

function renderPage(page,u,s){const r=u.role;if(page==="Dashboard")return <Dashboard u={u} s={s}/>;if(page.includes("Timetable"))return <Timetable role={r} u={u} s={s}/>;if(page==="Students"||page==="My Students")return <Students role={r} s={s}/>;if(page==="Teachers")return <Teachers s={s}/>;if(page==="Staff Requests")return <StaffRequests s={s}/>;if(page==="Staff Substitution")return <SubstitutionPlanner s={s}/>;if(page==="Report Unavailability")return <ReportUnavailability u={u} s={s}/>;if(page==="Substitution Duty")return <SubstitutionDuty u={u} s={s}/>;if(page==="Classes")return <Classes s={s}/>;if(page==="Attendance"||page==="My Attendance")return <Attendance role={r} u={u} s={s}/>;if(page==="Homework"||page==="My Homework")return <Homework role={r} s={s}/>;if(page==="Library")return <LibraryPage role={r} s={s}/>;if(page==="Textbooks")return <Textbooks role={r} s={s}/>;if(page==="Digital Library")return <DigitalLibrary role={r} s={s}/>;if(["Exams & Marks","Enter Marks","Marks / Report Card","My Marks"].includes(page))return <Marks role={r} u={u} s={s}/>;if(page==="Fees"||page==="Fees & Payment")return <Fees role={r} s={s}/>;if(page==="Enquiry")return <Fees role={r} s={s} initialTab="admission"/>;if(page==="Finance")return <Finance s={s}/>;if(page==="Payroll")return <Payroll s={s}/>;if(page==="Notices")return <Notices role={r} s={s}/>;if(page==="Calendar"||page==="Events")return <Calendar role={r} s={s}/>;if(page==="Transport")return <Transport role={r} u={u} s={s}/>;if(page==="Teacher Chat"||page==="Parent Messages")return <Chat role={r} u={u} s={s}/>;if(page==="User Management")return <UsersPage s={s}/>;if(page==="Reports")return <Reports s={s}/>;if(page==="Settings")return <SettingsPage s={s}/>;if(page==="Leave Request")return <Leave s={s}/>;if(page==="My Profile")return <Profile u={u} s={s}/>;if(page==="My Child")return <Child u={u} s={s}/>;if(page==="Progress Tracker")return <ProgressTracker role={r} u={u} s={s}/>;return <Dashboard u={u} s={s}/>}

export {renderPage};
export default App;
