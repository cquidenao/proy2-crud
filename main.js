// se seleccionan todos los selectores de htm que vamos a usar

let form = document.getElementById("form");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tareas = document.getElementById("tareas");
let add = document.getElementById("add");

// validamos que el campo de descripcion  no este en blanco

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
// recopilacion de los datos con una funcion accepData y una matris Data y lo empujamos al localstorage 
let data = [{}];

let acceptData = () => {
  data.push({
    descripcion: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  crearTareas();
};
// para crear una nueva tarea se usa literales de plantilla y se usa
//  un mapa para insertar los datos recopilados del usuario dentro de la plantilla.
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

  // se tienen que borrar los campos que ingresa el usuario. creando una función llamada resetForm
  resetForm();
};
// funcio para eliminar tareas
let borrarTareas = (e) => {
  // elimina el elemento HTML de la pantalla
  e.parentElement.parentElement.remove();
  // elimina la tarea objetivo de la matriz de datos
  data.splice(e.parentElement.parentElement.id, 1);
  // actualiza el almacenamiento local con los nuevos datos.
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};
// funcio para eliminar editar tareas
let editarTareas = (e) => {
  // apunta a la tarea que se selecciona para editar
  let seleccionarTarea = e.parentElement.parentElement;
  textarea.value = seleccionarTarea.children[0].innerHTML;
  // elimina los datos seleccionados tanto del almacenamiento local, el elemento HTML y la matriz de datos.
  borrarTareas(e);
};

let resetForm = () => {
  textarea.value = "";
};

