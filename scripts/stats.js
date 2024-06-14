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
      upComingEvents = miModule.obtenerEventos(
        fechaActual,
        Datos.eventos,
        false
      );
      inicializarTabla1();
      inicializarTabla(upComingEvents, true);
      inicializarTabla(pastEvents, false);
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

function inicializarTabla1() {
  const tabla1 = document.getElementById("tabla1");
  const eventosConPorcentajeAsistencia =
    calculateAttendancePercentage(pastEvents);
  const maxPorcentajeAsistencia = getEventConMaxProcentajeAsistencia(
    eventosConPorcentajeAsistencia
  );
  const minPorcentajeAsistencia = getEventConMinProcentajeAsistencia(
    eventosConPorcentajeAsistencia
  );
  const eventoMaxCapacidad = obtenerMaxCapacidad(Datos.eventos);

  tabla1.innerHTML = `<tr>
                                <td>${maxPorcentajeAsistencia.name}</td>
                                <td>${minPorcentajeAsistencia.name}</td>
                                <td>${eventoMaxCapacidad.name}</td>
                            </tr>
                            <tr>
                                <td>${maxPorcentajeAsistencia.porcentajeAsistencias.toFixed(
                                  2
                                )} %</td>
                                <td>${minPorcentajeAsistencia.porcentajeAsistencias.toFixed(
                                  2
                                )} %</td>
                                <td>${eventoMaxCapacidad.capacity}</td>
                            </tr>`;
}

function calculoTabla(events, future) {
  let categorias = miModule.obtenerCategorias([...events]);
  let estadisticasPast = [];

  categorias.forEach((categ) => {
    let eventoXCategoria = events.filter((event) => event.category === categ);
    let totalAsistencia = 0,
      totalCapacidad = 0,
      totalGanancias = 0;

    if (future) {
      eventoXCategoria.forEach((evento) => {
        totalGanancias += evento.estimate * evento.price;
        totalAsistencia += evento.estimate;
        totalCapacidad += evento.capacity;
      });
    } else {
      eventoXCategoria.forEach((evento) => {
        totalGanancias += evento.assistance * evento.price;
        totalAsistencia += evento.assistance;
        totalCapacidad += evento.capacity;
      });
    }

    let estadisticasXCategoria = {
      categoria: categ,
      porcentajeAsistencia: (totalAsistencia / totalCapacidad) * 100,
      Ganancias: totalGanancias,
    };
    estadisticasPast.push(estadisticasXCategoria);
  });

  return estadisticasPast;
}

function inicializarTabla(events, future) {
  let tabla2 = document.getElementById("tabla2");
  let tabla3 = document.getElementById("tabla3");

  let estadisticas = calculoTabla(events, future);
  console.log(estadisticas);
  let n = 1;
  estadisticas.forEach((stats) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <th scope="row">${n}</th>
        <td>${stats.categoria}</td>
        <td>$ ${stats.Ganancias}</td>
        <td>${stats.porcentajeAsistencia.toFixed(2)} %</td>
        `;
    n++;
    if (future) {
      tabla2.appendChild(fila);
    } else {
      tabla3.appendChild(fila);
    }
  });
}

function inicializarTabla3(events) {
  calculoTabla(events, false);
}
