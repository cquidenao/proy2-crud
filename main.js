let form = document.getElementById("form");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tareas = document.getElementById("tareas");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textarea.value === "") {
    msg.innerHTML = "agregar una tarea";
  } else {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    descripcion: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  crearTareas();
};

let crearTareas = () => {
  tareas.innerHTML = "";
  data.map((x, y) => {
    return (tareas.innerHTML += `
    <div id=${y}>
          <p>${x.descripcion}</p>
  
          <span class="options">
            <i onClick= "editarTareas(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="borrarTareas(this);crearTareas()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let borrarTareas = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editarTareas = (e) => {
  let seleccionarTarea = e.parentElement.parentElement;

  textarea.value = seleccionarTarea.children[0].innerHTML;

  borrarTreas(e);
};

let resetForm = () => {
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  crearTareas();
})();