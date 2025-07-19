document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
        <span>${task.text}</span>
        <div class="actions">
          <button class="complete">✔</button>
          <button class="edit">✎</button>
          <button class="delete">🗑</button>
        </div>
      `;

            li.querySelector(".complete").addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            li.querySelector(".edit").addEventListener("click", () => {
                const newText = prompt("Edit task:", task.text);
                if (newText !== null && newText.trim() !== "") {
                    tasks[index].text = newText.trim();
                    saveTasks();
                    renderTasks();
                }
            });

            li.querySelector(".delete").addEventListener("click", () => {
                if (confirm("Delete this task?")) {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                }
            });

            taskList.appendChild(li);
        });
    }

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text !== "") {
            tasks.push({ text, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    renderTasks();
});