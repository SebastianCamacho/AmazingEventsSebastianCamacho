let Datos = {};

const containerTarjetas = document.getElementById("contTarjetas2");
const containerChecks = document.getElementById("containerChecks2");
let fechaActual;

let currentEvents;
let currentCategorias;

let busqueda = document.getElementById("searchUp");
busqueda.addEventListener("input", (e) => {
  filtroSearch(e.target.value);
});

consultarEventos();

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then((response) => response.json())
    .then((data) => {
      Datos.eventos = data.events;
      Datos.fechaActual = data.currentDate;
      fechaActual = new Date(Datos.fechaActual);
      currentEvents = obtenerEventos(Datos.eventos);
      currentCategorias = obtenerCategorias(currentEvents);
      console.log(currentCategorias);
      pintarChecks(currentCategorias);
      pintarTarjetas(currentEvents);
      console.log(currentEvents);
    })
    .catch((error) => console.error(error));
  console.log("CONSULTA");
}

function filtrarCategoria() {
  let listChecked = [];
  checkboxs = document.getElementsByClassName("checkUp");
  for (let index = 0; index < checkboxs.length; index++) {
    if (checkboxs[index].checked) {
      listChecked.push(checkboxs[index].value);
    }
  }
  let eventosFiltrados = currentEvents.filter((event) => {
    for (let i = 0; i < listChecked.length; i++) {
      if (listChecked[i] == event.category) {
        return event;
      }
    }
  });
  if (listChecked.length < 1) {
    return currentEvents
  }

  return eventosFiltrados;
}

function filtroSearch(valor) {
  let filtro = [];
  let cheks = filtrarCategoria();
  if (cheks.length < 1) {
    //FILTRAR TODOS LOS EVENTOS
    filtro = Datos.eventos.filter(
      (event) =>
        event.name.toLowerCase().includes(valor.toLowerCase()) ||
        event.description.toLowerCase().includes(valor.toLowerCase())
    );
    console.log(filtro);
  } else {
    //FILTRAR EVENTOS FILTRADOS POR LOS CHECKS
    console.log(cheks);
    filtro = cheks.filter(
      (event) =>
        event.name.toLowerCase().includes(valor.toLowerCase()) ||
        event.description.toLowerCase().includes(valor.toLowerCase())
    );
  }

  pintarTarjetas(filtro);
}

function createCard(evento) {
  // CREEAR LOS ELEMENTOS HTML
  const divContTarjeta = document.createElement("div");
  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardBody = document.createElement("div");
  const firstRow = document.createElement("div");
  const Colinformation = document.createElement("div");
  const cardTitleH5 = document.createElement("h5");
  const cardTextP = document.createElement("p");
  const secondRow = document.createElement("div");
  const priceCol = document.createElement("div");
  const priceElementH5 = document.createElement("h5");
  const detailsCol = document.createElement("div");
  const detailsButtonA = document.createElement("a");

  // AÑADIR LAS CLASES A LOS ELEMENTOS
  divContTarjeta.classList.add(
    "col-10",
    "col-sm-6",
    "col-md-5",
    "col-lg-4",
    "col-xl-3",
    "my-2"
  );
  card.classList.add("card", "h-100");
  image.classList.add("card-img-top");
  cardBody.classList.add("card-body");
  firstRow.classList.add("row");
  Colinformation.classList.add("col");
  cardTitleH5.classList.add("card-title");
  cardTextP.classList.add("card-text");
  secondRow.classList.add("row", "mt-2");
  priceCol.classList.add("col");
  priceElementH5.textContent = "$5";
  detailsCol.classList.add("col");
  detailsButtonA.classList.add("btn");
  detailsButtonA.textContent = "Details";
  detailsButtonA.setAttribute("href", "/details.html?id=" + evento._id);

  // Set image source and alt text
  image.setAttribute("src", evento.image);
  image.setAttribute("alt", "...");

  divContTarjeta.appendChild(card);
  card.appendChild(image);
  card.appendChild(cardBody);
  cardBody.appendChild(firstRow);
  cardBody.appendChild(secondRow);
  firstRow.appendChild(Colinformation);
  secondRow.appendChild(priceCol);
  secondRow.appendChild(detailsCol);
  Colinformation.appendChild(cardTitleH5);
  Colinformation.appendChild(cardTextP);
  priceCol.appendChild(priceElementH5);
  detailsCol.appendChild(detailsButtonA);

  // ENVIAR DATOS
  cardTitleH5.textContent = evento.name;
  cardTextP.textContent = evento.description;
  priceElementH5.textContent = "$" + evento.price;

  //AÑADIR EVENTO A BOTON

  // Return the complete card element
  return divContTarjeta;
}

function createCheck(categoria) {
  //capitalizar y quitar espacios
  let id = capitalizarYQuitarEspacios(categoria);

  // Crear el div contenedor principal
  let divContainer = document.createElement("div");
  divContainer.className = "form-check form-check-inline";

  // Crear el input checkbox
  let inputCheckbox = document.createElement("input");
  inputCheckbox.classList.add("form-check-input", "checkUp");
  inputCheckbox.type = "checkbox";
  inputCheckbox.id = id;
  inputCheckbox.value = categoria;

  // Crear el label
  let label = document.createElement("label");
  label.className = "form-check-label";
  label.setAttribute("for", id);
  label.textContent = categoria;

  // Añadir el input y el label al div contenedor
  divContainer.appendChild(inputCheckbox);
  divContainer.appendChild(label);

  inputCheckbox.addEventListener("change", (e) => {
    if (busqueda.value.length < 1) {
      console.log("sin busqueda");
      let filtro = filtrarCategoria();
      pintarTarjetas(filtro);
    } else {
      console.log("con busqueda");
      filtroSearch(busqueda.value);
    }
  });

  return divContainer;
}

function capitalizarYQuitarEspacios(str) {
  // Capitalizar cada palabra
  let capitalizado = str
    .split(" ")
    .map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    })
    .join(" ");

  // Quitar todos los espacios
  let sinEspacios = capitalizado.replace(/\s+/g, "");

  return sinEspacios;
}

function obtenerEventos(events) {
  let auxEvents = [];
  for (let index = 0; index < events.length; index++) {
    const fechaEvento = new Date(events[index].date);
    if (fechaActual.getTime() <= fechaEvento.getTime()) {
      auxEvents.push(events[index]);
    }
  }
  return auxEvents;
}

function pintarTarjetas(informacion) {
  containerTarjetas.innerHTML = "";
  for (let index = 0; index < informacion.length; index++) {
    const card1 = createCard(informacion[index]);
    containerTarjetas.appendChild(card1);
  }
}
function pintarChecks(listaCategorias) {
  containerChecks.innerHTML = "";
  for (let index = 0; index < listaCategorias.length; index++) {
    const check = createCheck(listaCategorias[index]);
    containerChecks.appendChild(check);
  }
}

function obtenerCategorias(eventos) {
  return eventos.reduce((categorias, evento) => {
    if (!categorias.includes(evento.category)) {
      categorias.push(evento.category);
    }
    return categorias;
  }, []);
}
