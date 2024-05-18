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
    saveButton.classList.add("disabled");
  } else if (saveButton.classList.contains("disabled")) {
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

function editTodo(event) {
  let editeButtonPressed = event.target;
  let indexToBeEdit = Number(editeButtonPressed.getAttribute("data-idx"));
  let detailDiv = document.querySelector(`div[data-idx="${indexToBeEdit}"]`);
  let input = document.querySelector(`input[data-idx="${indexToBeEdit}"]`);
  detailDiv.style.display = "none";
  input.type = "text";
  input.value = detailDiv.textContent;
}

function saveEdit() {
  let input = event.target;
  let indexToBeEdit = Number(input.getAttribute("data-idx"));
  let detailDiv = document.querySelector(`div[data-idx="${indexToBeEdit}"]`);
  if (event.keyCode == 13) {
    detailDiv.textContent = input.value;
    detailDiv.style.display = "block";
    input.value = "";
    input.type = "hidden";
  }
}

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
  let hiddenInput = document.createElement("input");
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
  hiddenInput.classList.add("hidden-input", "todo-detail");
  taskStatus.classList.add("todo-status", "text-muted");
  taskActions.classList.add("todo-actions", "mb-2");
  editbtn.classList.add("btn", "btn-success");
  deletebtn.classList.add("btn", "btn-danger", "mt-2");

  deletebtn.setAttribute("data-idx", index);
  editbtn.setAttribute("data-idx", index);
  taskDetails.setAttribute("data-idx", index);
  hiddenInput.setAttribute("data-idx", index);
  deletebtn.onclick = removeTodo;
  editbtn.onclick = editTodo;
  hiddenInput.type = "hidden";
  hiddenInput.addEventListener("keypress", saveEdit);
  hiddenInput.addEventListener("click", saveEdit);

  taskno.textContent = index + 1;
  taskDetails.textContent = todoData;
  label.textContent = "Incomplete";
  editbtn.textContent = "Edit";
  deletebtn.textContent = "Delete";

  taskActions.appendChild(editbtn);
  taskActions.appendChild(deletebtn);
  tasklist.appendChild(taskno);
  tasklist.appendChild(taskDetails);
  tasklist.appendChild(hiddenInput);
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
