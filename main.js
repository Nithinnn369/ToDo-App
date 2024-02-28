const todoForm = document.getElementById("todo-form");
const newTodoInput = document.getElementById("new-todo-input");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
    });
    const span = document.createElement("span");
    span.textContent = todo.text;
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      const newText = prompt("Enter the new text:");
      if (newText) {
        todo.text = newText;
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      }
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = newTodoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    newTodoInput.value = "";
    renderTodos();
  }
});

renderTodos();