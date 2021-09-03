import './style.css';
import { openForm, closeForm, openColPopup,closeColPopup, createTaskContainer,} from './dom-related';
import {getCollection, getDescription, getTitle,getDate, getPriority} from './new-task';
const {differenceInDays,differenceInMinutes } = require("date-fns");

const allContainer=document.querySelector('.all');
const personalContainer=document.querySelector('.personal');
const schoolContainer=document.querySelector('.school');
const workContainer=document.querySelector('.work');
const titleInput=document.getElementById('title-input');
const descriptionInput=document.getElementById('description-input');
const allSidebar=document.querySelector('.all-sidebar');
const personalSidebar=document.querySelector('.personal-sidebar');
const schoolSidebar=document.querySelector('.school-sidebar');
const workSidebar=document.querySelector('.work-sidebar');


const addBtn=document.querySelector('.circle');
const closeBtn=document.querySelector('.close-btn');
const continueBtn=document.querySelector('.continue');
const submit=document.querySelector('.submit');
const cancel=document.querySelector('.cancel');

let description;
let title;
let collection;
let dueDate;
let priority;
addBtn.addEventListener('click', ()=>{
    openColPopup();
})
closeBtn.addEventListener('click',()=>{
    closeColPopup();
});
continueBtn.addEventListener('click', ()=>{
    openForm();
    collection=getCollection();
})
submit.addEventListener('click',()=>{
    closeForm();
    title= getTitle();
    dueDate=getDate();
    description=getDescription();
    priority=getPriority();
    const today=new Date();
    const endDate = new Date(dueDate);
    const daysBetween = differenceInDays(endDate, today);
    const hoursBetween=differenceInMinutes(endDate,today);
    console.log(typeof(daysBetween));
    const newTask=createTaskContainer(title,description,`Due in ${daysBetween} days`,priority);
    const newTask_clone=newTask.cloneNode(true);
    if(collection=='personal'){
        personalContainer.appendChild(newTask_clone);
        allContainer.appendChild(newTask);
    }
    else if(collection=='school'){
        schoolContainer.appendChild(newTask_clone);
        allContainer.appendChild(newTask);
    }
    else if(collection=='work'){
        workContainer.appendChild(newTask_clone);
        allContainer.appendChild(newTask);
    }
    titleInput.value='';
    descriptionInput.value='';
});

cancel.addEventListener('click',()=>{
    closeForm();
});

allSidebar.addEventListener('click', ()=>{
    allContainer.classList.remove('hide-section');
    personalContainer.classList.add('hide-section');
    schoolContainer.classList.add('hide-section');
    workContainer.classList.add('hide-section');
    allSidebar.classList.add('color-change');
    personalSidebar.classList.remove('color-change');
    schoolSidebar.classList.remove('color-change');
    workSidebar.classList.remove('color-change');
});

personalSidebar.addEventListener('click', ()=>{
    personalContainer.classList.remove('hide-section');
    schoolContainer.classList.add('hide-section');
    workContainer.classList.add('hide-section');
    allContainer.classList.add('hide-section');
    allSidebar.classList.remove('color-change');
    personalSidebar.classList.add('color-change');
    schoolSidebar.classList.remove('color-change');
    workSidebar.classList.remove('color-change');

});

schoolSidebar.addEventListener('click', ()=>{
    schoolContainer.classList.remove('hide-section');
    personalContainer.classList.add('hide-section');
    workContainer.classList.add('hide-section');
    allContainer.classList.add('hide-section');
    allSidebar.classList.remove('color-change');
    personalSidebar.classList.remove('color-change');
    schoolSidebar.classList.add('color-change');
    workSidebar.classList.remove('color-change');
});

workSidebar.addEventListener('click', ()=>{
    workContainer.classList.remove('hide-section');
    schoolContainer.classList.add('hide-section');
    personalContainer.classList.add('hide-section');
    allContainer.classList.add('hide-section');
    allSidebar.classList.remove('color-change');
    personalSidebar.classList.remove('color-change');
    schoolSidebar.classList.remove('color-change');
    workSidebar.classList.add('color-change');
});










