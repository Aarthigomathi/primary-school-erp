import {LayoutDashboard,Users,GraduationCap,BookOpen,CalendarDays,ClipboardCheck,FileText,Wallet,Bus,MessageCircle,Bell,Settings,Clock,UserRound,School,ShieldCheck,Target,Library,RefreshCw,AlertTriangle,TrendingUp,Fingerprint,Book,PlayCircle} from "lucide-react";

const accounts={
 admin:{email:"admin@school.demo",password:"admin123",name:"School Admin",role:"Admin"},
 teacher:{email:"priya@school.demo",password:"teacher123",name:"Priya Sharma",role:"Teacher"},
};
const initialStudents=[
 {name:"Aarav Kumar",className:"Grade 3-A",roll:"01",parent:"Kumar Raj",attendance:"96%"},
 {name:"Ananya Priya",className:"Grade 3-A",roll:"02",parent:"Priya Devi",attendance:"98%"},
 {name:"Dhruv Anand",className:"Grade 4-B",roll:"07",parent:"Anand S",attendance:"91%"},
 {name:"Ishita Rao",className:"Grade 5-A",roll:"11",parent:"Rao Meena",attendance:"94%"},
 {name:"Vihaan Raj",className:"Grade 2-B",roll:"05",parent:"Kumar Raj",attendance:"89%"}
];
const initialTeachers=[{name:"Priya Sharma",subject:"Mathematics",classes:"Grade 3-A / 4-B"},{name:"Meena Joseph",subject:"English",classes:"Grade 2-A / 3-A"},{name:"Arun Kumar",subject:"EVS",classes:"Grade 4-B / 5-A"},{name:"Kavitha R",subject:"Tamil",classes:"Grade 1-A / 2-B"},{name:"Nisha Kapoor",subject:"Hindi",classes:"Grade 1-A / 3-A"},{name:"Vijay Kumar",subject:"Computer Science",classes:"Grade 3-A / 5-A"},{name:"Anitha Raj",subject:"Yoga",classes:"Grade 1-A / 5-B"},{name:"Ramesh S",subject:"Physical Education",classes:"Grade 2-B / 4-B"},{name:"Divya Menon",subject:"Art & Craft / Music",classes:"Grade 2-B / 5-A"}];
const teacherAccounts=initialTeachers.map(t=>({name:t.name,email:t.name.toLowerCase().replaceAll(" ",".")+"@school.demo",password:"teacher123",role:"Teacher"}));
const portalAccounts={admin:accounts.admin,teacher:accounts.teacher};
const primarySubjects=["Tamil","English","Mathematics","EVS","Hindi","Computer Science","General Knowledge","Art & Craft","Music","Yoga","Physical Education","Moral Science"];
const initialClasses=["Grade 1-A","Grade 2-B","Grade 3-A","Grade 4-B","Grade 5-A","Grade 5-B"];
const initialHomework=[
 {subject:"Mathematics",title:"Multiplication worksheet – Page 24",due:"Today",completed:false},
 {subject:"English",title:"Read Story 6 and write 5 new words",due:"Tomorrow",completed:false},
 {subject:"EVS",title:"Parts of a Plant drawing",due:"Friday",completed:false},
 {subject:"Hindi",title:"Write 5 simple Hindi words",due:"Monday",completed:false},
 {subject:"Computer Science",title:"Draw and label the parts of a computer",due:"Wednesday",completed:false}
];
const initialLibrary=[
 {id:1,title:"Panchatantra Stories",author:"Children's Classics",category:"Story",ageGroup:"6–10 Years",total:5,available:5,issuedTo:"",due:""},
 {id:2,title:"Akbar and Birbal Stories",author:"Indian Folktales",category:"Story",ageGroup:"7–11 Years",total:4,available:4,issuedTo:"",due:""},
 {id:3,title:"Fun with Numbers",author:"Bright Future Press",category:"Mathematics",ageGroup:"6–10 Years",total:5,available:5,issuedTo:"",due:""},
 {id:4,title:"Amazing Animals",author:"School Library",category:"EVS",ageGroup:"6–10 Years",total:4,available:4,issuedTo:"",due:""},
 {id:5,title:"Plants Around Us",author:"School Library",category:"EVS",ageGroup:"7–11 Years",total:4,available:4,issuedTo:"",due:""},
 {id:6,title:"Good Habits for Kids",author:"Bright Future Press",category:"Life Skills",ageGroup:"5–9 Years",total:4,available:4,issuedTo:"",due:""},
 {id:7,title:"Tamil Sirukathaigal for Kids",author:"Tamil Children’s Collection",category:"Tamil",ageGroup:"6–11 Years",total:4,available:4,issuedTo:"",due:""},
 {id:8,title:"Draw, Colour & Create",author:"Creative Kids Studio",category:"Activity",ageGroup:"5–10 Years",total:4,available:4,issuedTo:"",due:""}
];
const initialNotices=[
 {icon:"📢",title:"Parent Meeting",date:"Saturday · 10:00 AM",body:"All parents are invited for the monthly progress meeting."},
 {icon:"🏆",title:"Inter-house Quiz",date:"September 15",body:"Students from Grades 3–5 can register with their class teacher."},
 {icon:"🎉",title:"Teachers' Day Celebration",date:"September 5",body:"Special assembly and student activities."},
 {icon:"🚌",title:"Transport Update",date:"Tomorrow",body:"Route 4 will depart 10 minutes earlier."}
];
const defaultTT=[
 ["Monday","09:00 AM","Mathematics","Priya Sharma"],["Monday","10:00 AM","English","Meena Joseph"],["Monday","11:15 AM","EVS","Arun Kumar"],["Monday","12:15 PM","Hindi","Nisha Kapoor"],
 ["Tuesday","09:00 AM","Tamil","Kavitha R"],["Tuesday","10:00 AM","Computer Science","Vijay Kumar"],["Tuesday","11:15 AM","Yoga","Anitha Raj"],["Tuesday","12:15 PM","Art & Craft","Divya Menon"],
 ["Wednesday","09:00 AM","Mathematics","Priya Sharma"],["Wednesday","10:00 AM","General Knowledge","Meena Joseph"],["Wednesday","11:15 AM","Physical Education","Ramesh S"],["Wednesday","12:15 PM","Music","Divya Menon"],
 ["Thursday","09:00 AM","English","Meena Joseph"],["Thursday","10:00 AM","EVS","Arun Kumar"],["Thursday","11:15 AM","Hindi","Nisha Kapoor"],["Thursday","12:15 PM","Moral Science","Kavitha R"],
 ["Friday","09:00 AM","Mathematics","Priya Sharma"],["Friday","10:00 AM","Tamil","Kavitha R"],["Friday","11:15 AM","Computer Science","Vijay Kumar"],["Friday","12:15 PM","Yoga","Anitha Raj"]
];

const marks=["Mathematics","English","EVS","Tamil","Hindi","Computer Science","General Knowledge","Art & Craft","Music","Yoga","Physical Education","Moral Science"].map((s,i)=>({subject:s,score:[86,91,88,94,89,92,87,95,90,93,88,96][i]}));
const initialChatMessages=[];
const initialSubstitutions=[];
const initialAvailabilityRequests=[];
const navs={
 Admin:[["Dashboard","Dashboard",LayoutDashboard],["Students","Students",Users],["Teachers & Staff","Teachers",GraduationCap],["Staff Management & Payroll","Payroll",Wallet],["Staff Requests","Staff Requests",AlertTriangle],["Staff Substitution","Staff Substitution",RefreshCw],["Classes & Subjects","Classes",School],["Timetable & Periods","Timetable",Clock],["Attendance","Attendance",ClipboardCheck],["Exams & Marks","Exams & Marks",FileText],["Homework","Homework",BookOpen],["Textbooks","Textbooks",Book],["Library","Library",Library],["Digital Library","Digital Library",PlayCircle],["Fees & Admission","Fees",Wallet],["Admission Enquiry","Enquiry",Users],["Finance","Finance",TrendingUp],["Transport Tracking","Transport",Bus],["School Calendar","Calendar",CalendarDays],["Notices & Communication","Notices",Bell],["User Management","User Management",ShieldCheck],["Reports","Reports",FileText],["Progress Tracker","Progress Tracker",Target],["Settings","Settings",Settings]],
 Teacher:[["Dashboard","Dashboard",LayoutDashboard],["My Timetable","My Timetable",Clock],["My Students","My Students",Users],["Biometric Attendance","Attendance",Fingerprint],["Homework & Classwork","Homework",BookOpen],["Textbooks","Textbooks",Book],["Digital Library","Digital Library",PlayCircle],["Enter Marks","Enter Marks",FileText],["Notices","Notices",Bell],["Report Unavailability","Report Unavailability",AlertTriangle],["Substitution Duty","Substitution Duty",RefreshCw],["Progress Tracker","Progress Tracker",Target],["Leave Request","Leave Request",CalendarDays],["My Profile","My Profile",UserRound]],
 Parent:[["Dashboard","Dashboard",LayoutDashboard],["My Child","My Child",Users],["Child Attendance","Attendance",ClipboardCheck],["Class Timetable","Timetable",Clock],["Homework","Homework",BookOpen],["Library","Library",Library],["Marks / Report Card","Marks / Report Card",FileText],["Fees & Payment","Fees & Payment",Wallet],["School Calendar","Calendar",CalendarDays],["Notices","Notices",Bell],["Teacher Chat","Teacher Chat",MessageCircle],["Progress Tracker","Progress Tracker",Target],["Transport","Transport",Bus]]
};
const initialProgress={
 "Aarav Kumar":{academic:90,homework:90,attendance:96,participation:88,reading:92,math:86,goal:"Complete 20 multiplication problems",goalDone:false,remark:"Doing very well. Keep practising Mathematics."},
 "Ananya Priya":{academic:91,homework:88,attendance:98,participation:94,reading:96,math:89,goal:"Read one story book this month",goalDone:false,remark:"Excellent participation and reading skills."}
};

export {accounts,initialStudents,initialTeachers,teacherAccounts,portalAccounts,primarySubjects,initialClasses,initialHomework,initialLibrary,initialNotices,defaultTT,marks,initialChatMessages,initialSubstitutions,initialAvailabilityRequests,navs,initialProgress};
