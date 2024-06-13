import  * as miModule  from "../modules/functions.js";

let Datos = {};
consultarEventos();
let busqueda = document.getElementById("searchHome");
busqueda.addEventListener("input", (e) => {
  miModule.filtroSearch(e.target.value, containerTarjetas,Datos.eventos, "Home");
});

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
   .then((response) => response.json())
   .then((data) => {
      Datos.eventos=data.events
      Datos.fechaActual=data.currentDate
      let listaCategorias = miModule.obtenerCategorias(Datos.eventos)
      miModule.pintarChecks(containerChecks,listaCategorias,busqueda, Datos.eventos,containerTarjetas,"Home");
      miModule.pintarTarjetas(containerTarjetas, Datos.eventos);
 
   })
   .catch((error) => console.error(error));
   console.log("CONSULTA");
   console.log(Datos);
}



// Usage example: assuming you have a container div with ID "card-container"
const containerTarjetas = document.getElementById("contTarjetas");
const containerChecks = document.getElementById("containerChecks");





