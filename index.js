// Function to handle checkbox state change
function handleCheckboxChange(checkbox, taskDetails, label) {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      taskDetails.style.textDecoration = "line-through";
      label.textContent = "Complete";
    } else {
      taskDetails.style.textDecoration = "none";
      label.textContent = "Incomplete";
    }
  });
}

let todos = [];
let saveButton = document.getElementById("save-todo");
let inputBar = document.getElementById("input-bar");
let todoList = document.getElementById("todo-data-list");

inputBar.addEventListener("keyup", function buttonStatus() {
  let todoText = inputBar.value;
  if (todoText.length === 0) {
    if (!saveButton.classList.contains("disabled")) {
      saveButton.classList.add("disabled");
    }
  } else {
    saveButton.classList.remove("disabled");
  }
});

saveButton.addEventListener("click", function getTextAddTodo() {
  let todoText = inputBar.value;
  if (todoText.length === 0) return;
  todos.push(todoText);
  addTodo(todoText, todos.length - 1);
  inputBar.value = "";
});

function removeAllTodos() {
  todoList.innerHTML = "";
  todos = [];
}

function removeTodo(event) {
  let deleteButtonPressed = event.target;
  let indexToBeRemoved = Number(deleteButtonPressed.getAttribute("data-idx"));
  todos.splice(indexToBeRemoved, 1);
  renderTodos();
}

let deleteAllButton = document.getElementById("delete-all");
deleteAllButton.onclick = removeAllTodos;

function addTodo(todoData, index) {
  let rowdiv = document.createElement("div");
  let tasklist = document.createElement("div");
  let taskno = document.createElement("div");
  let taskDetails = document.createElement("div");
  let taskStatus = document.createElement("div");
  let taskActions = document.createElement("div");
  let editbtn = document.createElement("button");
  let deletebtn = document.createElement("button");
  let hr = document.createElement("hr");
  let checkboxContainer = document.createElement("div");
  let checkbox = document.createElement("input");
  let label = document.createElement("label");

  checkbox.type = "checkbox";
  checkbox.id = `checkbox-${index}`;
  label.style.marginLeft = "5px";

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);
  taskStatus.appendChild(checkboxContainer);

  rowdiv.classList.add("row");
  tasklist.classList.add(
    "task-list",
    "d-flex",
    "flex-row",
    "justify-content-between",
    "align-items-center"
  );
  taskno.classList.add("todo-no", "text-dark", "font-weight-bold");
  taskDetails.classList.add("todo-detail", "text-muted");
  taskStatus.classList.add("todo-status", "text-muted");
  taskActions.classList.add("todo-actions", "mb-2");
  editbtn.classList.add("btn", "btn-success");
  deletebtn.classList.add("btn", "btn-danger", "mt-2");

  deletebtn.setAttribute("data-idx", index);
  deletebtn.onclick = removeTodo;

  taskno.textContent = index + 1;
  taskDetails.textContent = todoData;
  label.textContent = "Incomplete";

  editbtn.textContent = "Edit";
  deletebtn.textContent = "Delete";

  taskActions.appendChild(editbtn);
  taskActions.appendChild(deletebtn);
  tasklist.appendChild(taskno);
  tasklist.appendChild(taskDetails);
  tasklist.appendChild(taskStatus);
  tasklist.appendChild(taskActions);
  rowdiv.appendChild(tasklist);
  rowdiv.appendChild(hr);

  todoList.appendChild(rowdiv);

  handleCheckboxChange(checkbox, taskDetails, label);
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => addTodo(todo, index));
}

// Call the function to handle checkbox change for existing tasks
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  let taskDetails = checkbox
    .closest(".task-list")
    .querySelector(".todo-detail");
  let label = checkbox
    .closest(".task-list")
    .querySelector(".todo-status label");
  handleCheckboxChange(checkbox, taskDetails, label);
});
