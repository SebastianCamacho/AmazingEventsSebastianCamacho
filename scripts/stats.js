import * as miModule from "../modules/functions.js";

let Datos = {};
let pastEvents;
let upComingEvents;
let fechaActual;
consultarEventos();

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then((response) => response.json())
    .then((data) => {
      Datos.eventos = data.events;
      Datos.fechaActual = data.currentDate;
      fechaActual = new Date(Datos.fechaActual);
      pastEvents = miModule.obtenerEventos(fechaActual, Datos.eventos, true);
      upComingEvents = miModule.obtenerEventos(fechaActual, Datos.eventos, false);
      console.log(upComingEvents);
      inicializar();
    })
    .catch((error) => console.error(error));
  console.log("CONSULTA");
}

// CALCULAR PORCENTAJE DE ASISTENCIA
function calculateAttendancePercentage(events) {
  return events.map((event) => {
    event.porcentajeAsistencias = (event.assistance / event.capacity) * 100;
    return event;
  });
}

//OBTENER EVENTO CON MAYOR PORCENTAJE DE ASISTENCIA
function getEventConMaxProcentajeAsistencia(events) {
  return events.reduce(
    (max, event) =>
      event.porcentajeAsistencias > max.porcentajeAsistencias ? event : max,
    events[0]
  );
}
//OBTENER EVENTO CON MENOR PORCENTAJE DE ASISTENCIA
function getEventConMinProcentajeAsistencia(events) {
  return events.reduce(
    (min, event) =>
      event.porcentajeAsistencias < min.porcentajeAsistencias ? event : min,
    events[0]
  );
}

// Función para encontrar el evento con la mayor capacidad
function obtenerMaxCapacidad(events) {
  return events.reduce(
    (max, event) => (event.capacity > max.capacity ? event : max),
    events[0]
  );
}
function clasificarEventosXcategoria(events) {
    const categories = {};

    events.forEach(event => {
        if (!categories[event.category]) {
            categories[event.category] = [];
        }
        categories[event.category].push(event);
    });

    return categories;
}



function inicializar() {
  const tabla1=document.getElementById("tabla1")
  const eventosConPorcentajeAsistencia = calculateAttendancePercentage(pastEvents);
  const maxPorcentajeAsistencia = getEventConMaxProcentajeAsistencia(eventosConPorcentajeAsistencia);
  const minPorcentajeAsistencia = getEventConMinProcentajeAsistencia(eventosConPorcentajeAsistencia);
  const eventoMaxCapacidad = obtenerMaxCapacidad(Datos.eventos);

  tabla1.innerHTML=`<tr>
                                <td>${maxPorcentajeAsistencia.name}</td>
                                <td>${minPorcentajeAsistencia.name}</td>
                                <td>${eventoMaxCapacidad.name}</td>
                            </tr>
                            <tr>
                                <td>${maxPorcentajeAsistencia.porcentajeAsistencias} %</td>
                                <td>${minPorcentajeAsistencia.porcentajeAsistencias} %</td>
                                <td>${eventoMaxCapacidad.capacity}</td>
                            </tr>`


// Uso de la función
const categorizedEvents = clasificarEventosXcategoria(upComingEvents);
console.log(categorizedEvents);


}
