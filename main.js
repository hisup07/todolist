const alert = document.querySelector(".alert");
const tablebody = document.querySelector(".tabblebody");
function saveTodo(todo) {
  if (localStorage.getItem("todoList") === null) {
    const todoList = [];
    todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
}

function formSubmit() {
  const name = document.querySelector("#todoName").value;
  const description = document.querySelector("#todoDescription").value;
  if (name.length === 0 || description.length === 0) {
    alert.classList.remove("alertDismiss");

    setTimeout(() => {
      alert.classList.add("alertDismiss");
      if (!alert.classList.contains("show")) {
        alert.classList.add("show");
      }
    }, 5000);
  } else {
    saveTodo({ name, description });
    document.querySelector("#todoName").value = "";
    document.querySelector("#todoDescription").value = "";
    showTodo();
  }
}
function showTodo() {
  if (localStorage.getItem("todoList") === null) {
    return;
  } else {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    const html = todoList
      .map(
        todo => `
          <tr>
      <td class="text-capitalize">${todo.name}</td>
      <td>${todo.description}</td>
      <td><button class="btn btn-danger deletebutton">x</button></td>
      
    </tr>
          `
      )
      .join("");
    tablebody.innerHTML = html;
  }
}
function deleteTodo(elm) {
  //console.log(elm.parentElement.parentElement.remove());
  const description = elm.parentElement.previousElementSibling.textContent;

  const todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList.forEach((todo, index) => {
    if (todo.description === description) {
      todoList.splice(index, 1);
    }
  });
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

document.addEventListener("DOMContentLoaded", showTodo);
document.querySelector("#todoform").addEventListener("submit", formSubmit);
tablebody.addEventListener("click", e => {
  deleteTodo(e.target);
  showTodo();
});
