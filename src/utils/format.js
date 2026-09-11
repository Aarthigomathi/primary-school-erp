

const fmt=n=>"₹"+Number(n||0).toLocaleString("en-IN");
const todayISO=()=>new Date().toISOString().slice(0,10);
const daysBetween=(a,b)=>Math.round((new Date(a)-new Date(b))/86400000);

export {fmt,todayISO,daysBetween};
