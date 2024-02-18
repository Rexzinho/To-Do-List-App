const taskInput = document.getElementById("taskInput");
const tasksDisplay = document.querySelector(".tasksDisplay");
const container = document.querySelector(".container");

let tasks = ["Finish my homework 📕", "Play basketball 🏀", "Make a pizza 🍕"];
let ids = [0, 1, 2];
let id = 2;
let checkedTasks = [];

let checkedClass = "";
let checked = "";

function addTask(){

    if(taskInput.value.length != 0){

        tasks.push(taskInput.value);
        id++;
        ids.push(id);
        taskInput.value = "";

        container.style.scale = "0.96";

        setTimeout(() => {
            container.style.scale = "1";
            updateTasks();
        }, 100)
        
    }

}

function updateTasks(){

    let tasksDisplayContent = "";
    let i=0;

    for(let x=0; x<tasks.length; x++){

        if(checkedTasks.includes(ids[x])){
            checkedClass = `class="checked"`;
            checked = "checked";
        }
        else{
            checkedClass = "";
            checked = "";
        }

        tasksDisplayContent +=

        `<li ${checkedClass} id="task-${i}">
            <div class="taskToDo">
                <input type="checkbox" onclick="checkTask(${i})" ${checked} id="checkbox-${x}">
                <label for="checkbox-${x}"> ${tasks[x]} <label>
            </div>
            <div>
                <button onclick="upTask(${i})"  class="containerBtn">🡹</button>
                <button onclick="downTask(${i})"  class="containerBtn">🡻</button>
                <button onclick="deleteTask(${i})" class="deleteBtn">🗑️</button>
            </div>
        </li>`

        i++;
    }
    
    if(tasks.length == 0){
        tasksDisplay.innerHTML = `<li>No tasks here</li>`;
    }
    else{
        tasksDisplay.innerHTML = tasksDisplayContent;
    }
}

function upTask(i){

    if(i == 0){
        return;
    }

    const task1 = document.getElementById(`task-${i}`);
    const task2 = document.getElementById(`task-${i-1}`);

    task1.style.scale = "0.95";
    task2.style.scale = "0.95";

    setTimeout(() => {
        task1.style.scale = "1";
        task2.style.scale = "1";

        setTimeout(() => {
            [tasks[i], tasks[i-1]] = [tasks[i-1], tasks[i]];
            [ids[i], ids[i-1]] = [ids[i-1], ids[i]];
            updateTasks();
        }, 50);
    }, 50);


}

function downTask(i){

    if(i == tasks.length-1){
        return;
    }

    const task1 = document.getElementById(`task-${i}`);
    const task2 = document.getElementById(`task-${i+1}`);

    task1.style.scale = "0.95";
    task2.style.scale = "0.95";

    setTimeout(() => {
        task1.style.scale = "1";
        task2.style.scale = "1";

        setTimeout(() => {
            [tasks[i], tasks[i+1]] = [tasks[i+1], tasks[i]];
            [ids[i], ids[i+1]] = [ids[i+1], ids[i]];
            updateTasks();
        }, 50);
    }, 50);
}

function checkTask(i){

    if(checkedTasks.includes(ids[i])){

        checkedTasks = checkedTasks.filter(element => element != ids[i]);
    }
    else{

        checkedTasks.push(ids[i]);
    }

    updateTasks();
}

function deleteTask(i){

    checkedTasks = checkedTasks.filter(element => element != ids[i]);
    tasks = tasks.filter((element, index) => index != i);

    container.style.scale = "0.96";

        setTimeout(() => {
            container.style.scale = "1";
            updateTasks();
        }, 50)
}

updateTasks();
