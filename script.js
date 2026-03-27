document.addEventListener("DOMContentLoaded", () => {
  const ToDoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const ToDoList = document.getElementById("todo_list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => rendertask(task));

  addTaskButton.addEventListener("click", () => {
    const addTask = ToDoInput.value.trim();
    if (addTask === "") return;

    const newTask = {
      id: Date.now(),
      text: addTask,
      completed: false,
    };
    tasks.push(newTask);
    savesTasks();
    rendertask(newTask);
    ToDoInput.value = "";
    console.log(tasks);
  });

  function rendertask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span>${task.text}</span>
      <button>delete</button>
      `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      savesTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      savesTasks();
    });

    ToDoList.appendChild(li);
  }

  function savesTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
