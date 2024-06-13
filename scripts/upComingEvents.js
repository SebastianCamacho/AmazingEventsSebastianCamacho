import  * as miModule  from "../modules/functions.js";

let Datos = {};

const containerTarjetas = document.getElementById("contTarjetas2");
const containerChecks = document.getElementById("containerChecks2");
let fechaActual;

let upComingEvents;
let busqueda = document.getElementById("searchUp");

busqueda.addEventListener("input", (e) => {
  miModule.filtroSearch(e.target.value, containerTarjetas,upComingEvents, "Past");
});

consultarEventos();

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then((response) => response.json())
    .then((data) => {
      Datos.eventos=data.events
      Datos.fechaActual=data.currentDate
      fechaActual = new Date(Datos.fechaActual);
      upComingEvents = miModule.obtenerEventos(fechaActual,Datos.eventos,false);
      let currentCategorias = miModule.obtenerCategorias(upComingEvents)
      miModule.pintarChecks(containerChecks,currentCategorias,busqueda, upComingEvents,containerTarjetas,"Past");
      miModule.pintarTarjetas(containerTarjetas, upComingEvents);
 
    })
    .catch((error) => console.error(error));
  console.log("CONSULTA");
  console.log(upComingEvents);

}

