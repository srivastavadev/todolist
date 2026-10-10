let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {
    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "task-text";

        if (todo.completed) {
            span.classList.add("completed");
        }

        span.textContent = todo.text;

        span.onclick = function () {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            displayTodos();
        };

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {
            todos.splice(index, 1);
            saveTodos();
            displayTodos();
        };

        li.appendChild(span);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    });
}

function addTodo() {

    const input = document.getElementById("todoInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    todos.push({
        text: task,
        completed: false
    });

    saveTodos();

    input.value = "";

    displayTodos();
}

function clearAll() {

    if (todos.length === 0) {
        return;
    }

    if (confirm("Are you sure you want to delete all tasks?")) {
        todos = [];
        saveTodos();
        displayTodos();
    }
}

document.getElementById("todoInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

displayTodos();