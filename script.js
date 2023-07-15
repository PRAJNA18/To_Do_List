const formEl = document.querySelector("form");
const inpEl = document.querySelector("input");
const tasks = document.querySelector("ul");

let task_list = JSON.parse(localStorage.getItem("list")) || [];
if (task_list && task_list.length > 0) {
    for(let i = 0; i < task_list.length; i++){
        displayTasks(task_list[i]);
    }
}

formEl.addEventListener("submit", (event) => {
    if (!inpEl.value) return;
    event.preventDefault();
    displayTasks();
});

function displayTasks(task_stored){
    if (!inpEl.value && !task_stored) return;
    let taskl = inpEl.value;
    if (task_stored){
        taskl = task_stored.name;
    }
    let li = document.createElement("li");
    li.classList.add("task");
    li.innerText = taskl;
    tasks.appendChild(li);
    inpEl.value = ""; 

    if (task_stored && task_stored.checked) {
        li.classList.add("checked");
    };

    const check = document.createElement("span"); 
    check.innerHTML = `<i class="fas fa-check-square"></i>`
    li.appendChild(check);

    check.addEventListener("click", () => {
        li.classList.toggle("checked");
        updateTasks();
    });

    const trash = document.createElement("span");
    trash.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    li.appendChild(trash);

    trash.addEventListener("click", () => {
        li.remove();
        updateTasks();
    });
    updateTasks();
}

function updateTasks(){
    let tasks = document.querySelectorAll("li");
    list = [];
    for (let i = 0; i < tasks.length; i++){
        list.push({
            name: tasks[i].innerText,
            checked: tasks[i].classList.contains("checked"),
          });
    };
    localStorage.setItem("list", JSON.stringify(list));
}

