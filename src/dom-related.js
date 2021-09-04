import del from "./delete.png";
import edit from './edit.png';
import { getDescription, getTitle,getDate,getPriority } from "./new-task";

export function createTaskContainer(title,description,dueDate,priority){
    const container=document.createElement('div');
    container.classList.add('task', title);
    const titleContainer=document.createElement('div');
    titleContainer.classList.add('title');
    const taskContainer=document.createElement('div');
    taskContainer.classList.add('task-detail');
    const taskTitle=document.createElement('h3');
    taskTitle.textContent=title;
    const radioInput=document.createElement('input');
    radioInput.setAttribute("type", "radio");
    const taskText=document.createElement('span');
    taskText.textContent=description;
    radioInput.addEventListener('click',()=>{
        let elements = document.getElementsByClassName(title);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        let local=JSON.parse(localStorage.getItem('tasks'));
        for(let i=0;i<local.length;i++){
            if(local[i]['title']==title){
                local.splice(i, 1);
            }
        }
        localStorage.setItem('tasks', JSON.stringify(local));
    });
    const editImg=new Image();
    editImg.src=edit;
    editImg.classList.add('edit');
    editImg.addEventListener('click',()=>{
        openForm();
        const newTitle =getTitle();
        const newDescription=getDescription();
        const newDate=getDate();
        const newPriority=getPriority();
        taskTitle.textContent=newTitle;
        taskText.textContent=newDescription;
        dueDate=newDate;
        priority=newPriority;
        removeElementsByClass(title);
    })

    const delImg=new Image();
    delImg.src=del;
    delImg.classList.add('delete');
    delImg.addEventListener('click', ()=>{
        let elements = document.getElementsByClassName(title);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        let local=JSON.parse(localStorage.getItem('tasks'));
        for(let i=0;i<local.length;i++){
            if(local[i]['title']==title){
                local.splice(i, 1);
            }
        }
        localStorage.setItem('tasks', JSON.stringify(local));
    });
    const timeContainer=document.createElement('div');
    timeContainer.classList.add('time-container');
    timeContainer.textContent=dueDate;
    if(priority=='Urgent'){
        titleContainer.classList.add('urgent');
    }
    else if(priority=='Critical'){
        titleContainer.classList.add('critical');
    }
    else if(priority=='Normal'){
        titleContainer.classList.add('normal');
    }
    else if(priority=='If You Can'){
        titleContainer.classList.add('if-you-can');
    }

    titleContainer.appendChild(taskTitle);
    titleContainer.appendChild(editImg);
    titleContainer.appendChild(delImg);
    taskContainer.appendChild(radioInput);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(timeContainer);
    container.appendChild(titleContainer);
    container.appendChild(taskContainer);
    return container;
}
export function openForm() {
    document.getElementById("popupForm").style.display='block';
    closeColPopup();
}
export function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
export function openColPopup() {
    document.getElementById("popupCol").style.display = "block";
}
export function closeColPopup() {
    document.getElementById("popupCol").style.display = "none";
}