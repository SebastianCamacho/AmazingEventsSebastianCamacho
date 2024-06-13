import  * as miModule  from "../modules/functions.js";

let Datos = {};

const containerTarjetas = document.getElementById("contTarjetas3");
const containerChecks = document.getElementById("containerChecks3");
let fechaActual;

let pastEvents;
let busqueda = document.getElementById("searchPast");
busqueda.addEventListener("input", (e) => {
  miModule.filtroSearch(e.target.value, containerTarjetas,pastEvents, "Past");
});

consultarEventos();

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then((response) => response.json())
    .then((data) => {
      Datos.eventos=data.events
      Datos.fechaActual=data.currentDate
      fechaActual = new Date(Datos.fechaActual);
      pastEvents = miModule.obtenerEventos(fechaActual,Datos.eventos,true);
      let currentCategorias = miModule.obtenerCategorias(pastEvents)
      miModule.pintarChecks(containerChecks,currentCategorias,busqueda, pastEvents,containerTarjetas,"Past");
      miModule.pintarTarjetas(containerTarjetas, pastEvents);
 
    })
    .catch((error) => console.error(error));
  console.log("CONSULTA");
  console.log(pastEvents);

}

