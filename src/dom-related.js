
export function createTaskContainer(title,description,dueDate,priority){
    const container=document.createElement('div');
    container.classList.add('task');
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