import  * as miModule  from "../modules/functions.js";

let Datos = {};

const containerTarjetas = document.getElementById("contTarjetas3");
const containerChecks = document.getElementById("containerChecks3");
let fechaActual;

let currentEvents;
let busqueda = document.getElementById("searchPast");
busqueda.addEventListener("input", (e) => {
  miModule.filtroSearch(e.target.value, containerTarjetas,currentEvents, "Past");
});

consultarEventos();

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then((response) => response.json())
    .then((data) => {
      Datos.eventos=data.events
      Datos.fechaActual=data.currentDate
      fechaActual = new Date(Datos.fechaActual);
      currentEvents = obtenerEventos(Datos.eventos);
      let currentCategorias = miModule.obtenerCategorias(currentEvents)
      miModule.pintarChecks(containerChecks,currentCategorias,busqueda, currentEvents,containerTarjetas,"Past");
      miModule.pintarTarjetas(containerTarjetas, currentEvents);
 
    })
    .catch((error) => console.error(error));
  console.log("CONSULTA");
  console.log(currentEvents);

}

function obtenerEventos(events) {
  let auxEvents = [];
  for (let index = 0; index < events.length; index++) {
    const fechaEvento = new Date(events[index].date);
    if (fechaActual.getTime() > fechaEvento.getTime()) {
      auxEvents.push(events[index]);
    }
  }
  return auxEvents;
}