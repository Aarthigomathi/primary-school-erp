

function load(key,fallback){try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback}catch{return fallback}}
function save(key,value){localStorage.setItem(key,JSON.stringify(value))}

export {load,save};
