let Datos = {};

consultarEventos();

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then((response) => response.json())
    .then((data) => {
      Datos.eventos = data.events;
      Datos.fechaActual = data.currentDate;
    })
    .catch((error) => console.error(error));
  console.log("CONSULTA");
}


