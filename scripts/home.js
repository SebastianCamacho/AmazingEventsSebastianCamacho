import  * as miModule  from "../modules/functions.js";

let Datos = {};
consultarEventos();
let busqueda = document.getElementById("searchHome");
busqueda.addEventListener("input", (e) => {
  filtroSearch(e.target.value);
});

function consultarEventos() {
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
   .then((response) => response.json())
   .then((data) => {
     Datos.eventos=data.events
     Datos.fechaActual=data.currentDate
     let listaCategorias = miModule.obtenerCategorias(Datos.eventos)
     miModule.pintarChecks(containerChecks,listaCategorias);
     pintarTarjetas(Datos.eventos);

   })
   .catch((error) => console.error(error));
   console.log("CONSULTA");
   console.log(Datos);
}


function filtrarCategoria() {
  let listChecked = [];
  checkboxs = document.getElementsByClassName("checkHome");
  for (let index = 0; index < checkboxs.length; index++) {
    if (checkboxs[index].checked) {
      listChecked.push(checkboxs[index].value);
    }
  }
  console.log(listChecked); 
  let eventosFiltrados = Datos.eventos.filter((event) => {
    for (let i = 0; i < listChecked.length; i++) {
      if (listChecked[i] == event.category) {
        return event;
      }
    }
  });
  console.log(eventosFiltrados);
  if (listChecked.length < 1) {
    return Datos.eventos;
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
        event.nombre.toLowerCase().includes(valor.toLowerCase()) ||
        event.descripción.toLowerCase().includes(valor.toLowerCase())
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

function createCard(infoEvento) {
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
  detailsButtonA.setAttribute("href", "/details.html?id=" + infoEvento._id);

  // Set image source and alt text
  image.setAttribute("src", infoEvento.image);
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
  cardTitleH5.textContent = infoEvento.name;
  cardTextP.textContent = infoEvento.description;
  priceElementH5.textContent = "$" + infoEvento.price;

  // Return the complete card element
  return divContTarjeta;
}


// Usage example: assuming you have a container div with ID "card-container"
const containerTarjetas = document.getElementById("contTarjetas");
const containerChecks = document.getElementById("containerChecks");

function pintarTarjetas(informacion) {
  containerTarjetas.innerHTML = "";
  for (let index = 0; index < informacion.length; index++) {
    const card1 = createCard(informacion[index]);
    containerTarjetas.appendChild(card1);
  }
}



