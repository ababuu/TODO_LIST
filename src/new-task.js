
export function getCollection(){
    
    const coll = document.getElementsByName('coll');
    let col_value;
    for(let i = 0; i < coll.length; i++){
        if(coll[i].checked){
            col_value = coll[i].value;
            return col_value;
    }
}
}

export function getDescription(){
    const desc= document.querySelector('.input-description').value;
    return desc;
}
export function getTitle(){
    const title= document.querySelector('.input-title').value;
    return title;
}
export function getDate(){
    const date=document.querySelector('.input-date').value;
    return date;
}

export function getPriority(){
    const priority=document.querySelector('.priority').value;
    return priority;
}