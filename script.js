//get elements
const input=document.getElementById("taskInput");//text input
const dateInput=document.getElementById("dueDate");//date input
const addBtn=document.getElementById("addBtn");//add button
const taskList=document.getElementById("taskList");//task List
//load saved tasks when page opens 
window.onload=loadTasks;
//click add button
addBtn.addEventListener("click",addTask);
//press enter to add task
input.addEventListener("keypress", function(e) {
        if(e.key==="Enter")
        addTask();
});
//add task function
function addTask() {

  const text = input.value.trim(); // task text
  const date = dateInput.value; // selected date
if (text === "") {
  alert("Please enter a task");
  return;
}// empty check

  // 🚨 check if date is in past
  if (date) {
    const today = new Date().toISOString().split("T")[0]; // current date

    if (date < today) {
      alert("Cannot select past date"); // show error
      return; // stop adding task
    }
  }

  const li = createTaskElement(text, date);

  taskList.appendChild(li);

  input.value = "";
  dateInput.value = "";

  saveTasks();
}
//create task ui
function createTaskElement(text,date="")
{
    const li=document.createElement("li");//list item
    const span=document.createElement("span");//text container
    //show date if exists
    span.innerText=date ? `${text} (Due: ${date})` :text;
    // highlight overdue tasks 
    if (date) { 
        const today = new Date().toISOString().split("T")[0];
         if (date < today) {
             li.style.borderLeft = "5px solid red"; 
            } }
    //mark complete on click
    span.addEventListener("click", function() {
  span.classList.toggle("completed");

  // mark parent li also (important for filtering)
  li.classList.toggle("done");

  saveTasks();
});
    //actions container(buttons)
    const actions=document.createElement("div");
    actions.classList.add("actions");
    //edit button
    const editBtn=document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.addEventListener("click",function(e){
        e.stopPropagation();//stop parent click
        const currentText = span.innerText.replace(/\(Due:.*\)/, "").trim();
const newText = prompt("Edit task:", currentText);
        if(newText!==null && newText.trim()!=="")
        {
            span.innerText=date
            ? `${newText} (Due: ${date})`
            :newText;
            saveTasks();
        }
    });
    //delete button
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="X";
    deleteBtn.addEventListener("click",function(e){
        e.stopPropagation();
        li.remove();//remove task
        saveTasks();
    });
    //add buttons to actions
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    //add elements to li
    li.appendChild(span);
    li.appendChild(actions);
    return li;
}
//filter tasks
function filterTasks(type) {

  const tasks = document.querySelectorAll("li");

  tasks.forEach(task => {

    const isCompleted = task.classList.contains("done");

    if (type === "all") {
      task.style.display = "flex";
    }

    else if (type === "completed") {
      task.style.display = isCompleted ? "flex" : "none";
    }

    else if (type === "pending") {
      task.style.display = !isCompleted ? "flex" : "none";
    }
  });
}
//save task to browser
function saveTasks() {

  const tasks = [];

  document.querySelectorAll("li").forEach(li => {

    const span = li.querySelector("span");
    const fullText = span.innerText;

    // extract text + date properly
    const match = fullText.match(/(.*)\(Due: (.*)\)/);

    tasks.push({
      text: match ? match[1].trim() : fullText,
      date: match ? match[2] : "",
      completed: li.classList.contains("done")
    });

  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//load tasks from browser
function loadTasks() {

  const data = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.innerHTML = "";

  data.forEach(task => {

    const li = createTaskElement(task.text, task.date);

    if (task.completed) {
      li.classList.add("done");
      li.querySelector("span").classList.add("completed");
    }

    taskList.appendChild(li);
  });
}