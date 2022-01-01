import "./style.css";

import {
  openForm,
  closeForm,
  openColPopup,
  closeColPopup,
  createTaskContainer,
} from "./dom-related";
import {
  getCollection,
  getDescription,
  getTitle,
  getDate,
  getPriority,
} from "./new-task";
const { differenceInDays, differenceInMinutes } = require("date-fns");
let tasks = [];
const allContainer = document.querySelector(".all");
const personalContainer = document.querySelector(".personal");
const schoolContainer = document.querySelector(".school");
const workContainer = document.querySelector(".work");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const allSidebar = document.querySelector(".all-sidebar");
const personalSidebar = document.querySelector(".personal-sidebar");
const schoolSidebar = document.querySelector(".school-sidebar");
const workSidebar = document.querySelector(".work-sidebar");
const addBtn = document.querySelector(".circle");
const closeBtn = document.querySelector(".close-btn");
const continueBtn = document.querySelector(".continue");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
let localTask = JSON.parse(localStorage.getItem("tasks"));
let description;
let title;
let collection;
let dueDate;
let priority;

// //firebase related
// const firebaseConfig = {
//   apiKey: "AIzaSyD0KPBTPKdR6vsbNE1mBjT3kjx5BlyANs0",
//   authDomain: "todo-app-bc2b9.firebaseapp.com",
//   projectId: "todo-app-bc2b9",
//   storageBucket: "todo-app-bc2b9.appspot.com",
//   messagingSenderId: "75730310534",
//   appId: "1:75730310534:web:f5a510ae8277c7404c4807"
// };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

addBtn.addEventListener("click", () => {
  openColPopup();
});
closeBtn.addEventListener("click", () => {
  closeColPopup();
});
continueBtn.addEventListener("click", () => {
  openForm();
  collection = getCollection();
});
submit.addEventListener("click", async() => {
  closeForm();
  title = getTitle();
  dueDate = getDate();
  description = getDescription();
  priority = getPriority();
  let today = new Date();
  const endDate = new Date(dueDate);
  const daysBetween = differenceInDays(endDate, today);
  let newTask;
  let newTask_clone;
  let timeLeft;
  if (daysBetween < 1) {
    let result = differenceInMinutes(endDate, today);
    let hoursBetween = Math.floor(result / 60);
    if (hoursBetween <= 1) {
      timeLeft = `Due in ${hoursBetween} hour`;
    } else {
      timeLeft = `Due in ${hoursBetween} hours`;
    }
    tasks.push({ title, description, timeLeft, priority, collection });
    newTask = createTaskContainer(title, description, timeLeft, priority);
    newTask_clone = newTask.cloneNode(true);
    if (localTask) {
      localTask.push({ title, description, timeLeft, priority, collection });
      localStorage.setItem("tasks", JSON.stringify(localTask));
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  } else {
    if (daysBetween <= 1) {
      timeLeft = `Due in ${daysBetween} day`;
    } else {
      timeLeft = `Due in ${daysBetween} days`;
    }
    tasks.push({ title, description, timeLeft, priority, collection });
    newTask = createTaskContainer(title, description, timeLeft, priority);
    newTask_clone = newTask.cloneNode(true);
    if (localTask) {
      localTask.push({ title, description, timeLeft, priority, collection });
      localStorage.setItem("tasks", JSON.stringify(localTask));
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  if (collection == "personal") {
    personalContainer.appendChild(newTask_clone);
    allContainer.appendChild(newTask);
  } else if (collection == "school") {
    schoolContainer.appendChild(newTask_clone);
    allContainer.appendChild(newTask);
  } else if (collection == "work") {
    workContainer.appendChild(newTask_clone);
    allContainer.appendChild(newTask);
  }
  // try {
  //   const docRef = await addDoc(collection(db, "Tasks"), {
  //     Title: title,
  //     Description: description,
  //     TimeLeft: timeLeft,
  //     Priority: priority
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  titleInput.value = "";
  descriptionInput.value = "";
});

cancel.addEventListener("click", () => {
  closeForm();
});

allSidebar.addEventListener("click", () => {
  allContainer.classList.remove("hide-section");
  personalContainer.classList.add("hide-section");
  schoolContainer.classList.add("hide-section");
  workContainer.classList.add("hide-section");
  allSidebar.classList.add("color-change");
  personalSidebar.classList.remove("color-change");
  schoolSidebar.classList.remove("color-change");
  workSidebar.classList.remove("color-change");
});

personalSidebar.addEventListener("click", () => {
  personalContainer.classList.remove("hide-section");
  schoolContainer.classList.add("hide-section");
  workContainer.classList.add("hide-section");
  allContainer.classList.add("hide-section");
  allSidebar.classList.remove("color-change");
  personalSidebar.classList.add("color-change");
  schoolSidebar.classList.remove("color-change");
  workSidebar.classList.remove("color-change");
});

schoolSidebar.addEventListener("click", () => {
  schoolContainer.classList.remove("hide-section");
  personalContainer.classList.add("hide-section");
  workContainer.classList.add("hide-section");
  allContainer.classList.add("hide-section");
  allSidebar.classList.remove("color-change");
  personalSidebar.classList.remove("color-change");
  schoolSidebar.classList.add("color-change");
  workSidebar.classList.remove("color-change");
});

workSidebar.addEventListener("click", () => {
  workContainer.classList.remove("hide-section");
  schoolContainer.classList.add("hide-section");
  personalContainer.classList.add("hide-section");
  allContainer.classList.add("hide-section");
  allSidebar.classList.remove("color-change");
  personalSidebar.classList.remove("color-change");
  schoolSidebar.classList.remove("color-change");
  workSidebar.classList.add("color-change");
});

window.onload = function () {
  let localTask = JSON.parse(localStorage.getItem("tasks"));
  if (localTask != null) {
    localStorage.setItem("tasks", JSON.stringify(localTask));

    let len = localTask.length;
    console.log(len);
    for (let x=0; x <= len; x++) {
      const newTask = createTaskContainer(
        localTask[x]["title"],
        localTask[x]["description"],
        localTask[x]["timeLeft"],
        localTask[x]["priority"]
      );
      const newTask_clone = newTask.cloneNode(true);
      if (localTask[x]["collection"] == "personal") {
        personalContainer.appendChild(newTask_clone);
        allContainer.appendChild(newTask);
      } else if (localTask[x]["collection"] == "school") {
        schoolContainer.appendChild(newTask_clone);
        allContainer.appendChild(newTask);
      } else if (localTask[x]["collection"] == "work") {
        workContainer.appendChild(newTask_clone);
        allContainer.appendChild(newTask);
      }
    }
  }
}
