let Datos = {};

consultarEventos();

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then((response) => response.json())
    .then((data) => {
      Datos.eventos = data.events;
      Datos.fechaActual = data.currentDate;
      fechaActual= new Date(data.currentDate);
      actualizarInformacion();
    })
    .catch((error) => console.error(error));
  
}


let imagen = document.getElementById("imagenDetails");
let titulo = document.getElementById("tituloDetails");
let descripcion = document.getElementById("descripcionDetails");
let fecha = document.getElementById("fechaDetails");
let categoria = document.getElementById("categoriDetails");
let lugar = document.getElementById("lugarDetails");
let capacidad = document.getElementById("capacidadDetails");
let precio = document.getElementById("precioDetails");

let asistencia = document.getElementById("aistenciaDetails");
let asistenciaValor = document.getElementById("asistenciaValorDetails");

function actualizarInformacion() {
  let urlDetails = window.location.href;
  id = new URL(urlDetails).searchParams.get("id");
  let evento = Datos.eventos.find((e) => e._id == id);

  titulo.innerHTML = evento.name
    .split(" ")
    .map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    })
    .join(" ");
  imagen.setAttribute("src", evento.image);
  descripcion.innerHTML = evento.description;
  fecha.innerHTML = evento.date;
  categoria.innerHTML = evento.category;
  lugar.innerHTML = evento.place;
  capacidad.innerHTML = evento.capacity;
  precio.innerHTML = evento.price;


  fechaEvento = new Date(evento.date);

  
  
  if (fechaActual.getTime() <= fechaEvento.getTime()) {
    asistencia.innerHTML = "Estimate";
    asistenciaValor.innerHTML = evento.estimate;
  } else {
    asistencia.innerHTML = "Asistencia";
    asistenciaValor.innerHTML = evento.assistance;
  }
}
