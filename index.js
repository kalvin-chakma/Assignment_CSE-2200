// Function to handle checkbox state change
function handleCheckboxChange(checkbox, taskDetails, label) {
  checkbox.addEventListener("change", function () {
    // If checked, strike through the task details
    if (this.checked) {
      taskDetails.style.textDecoration = "line-through";
      label.textContent = "Complete";
    } else {
      // If unchecked, remove the strikethrough
      taskDetails.style.textDecoration = "none";
      label.textContent = "Incomplete";
    }
  });
}

// Function to add todo data
let todoSection = document.getElementById("todo-data");

function addTodo(todoData) {
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

  // Set attributes for checkbox
  checkbox.type = "checkbox";
  checkbox.id = "checkbox"; // You might need to change this id dynamically if adding multiple todos
  label.style.marginLeft = "5px";

  // Append the checkbox and label to the checkbox container div
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);

  // Append the checkbox container div to the main div
  taskStatus.appendChild(checkboxContainer);

  // Adding the task classes
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

  // Set content for elements
  taskno.textContent = "1"; // Assuming a static value for task number
  taskDetails.textContent = todoData; // Setting the todoData dynamically
  label.textContent = "Incomplete"; // Initial label text

  // Set text for buttons
  editbtn.textContent = "Edit";
  deletebtn.textContent = "Delete";

  // Append elements to their respective containers
  taskActions.appendChild(editbtn);
  taskActions.appendChild(deletebtn);

  tasklist.appendChild(taskno);
  tasklist.appendChild(taskDetails);
  tasklist.appendChild(taskStatus);
  tasklist.appendChild(taskActions);

  rowdiv.appendChild(tasklist);
  rowdiv.appendChild(hr);

  todoSection.appendChild(rowdiv);

  // Call the function to handle checkbox change
  handleCheckboxChange(checkbox, taskDetails, label);
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

// Example usage:
addTodo("Task Description");
