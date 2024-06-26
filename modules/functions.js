function createCheck(categoria, busqueda, Datos, containerTarjetas, page) {
  
  let classPage = "check" + page;
  //capitalizar y quitar espacios
  let id = capitalizarYQuitarEspacios(categoria);
  // Crear el div contenedor principal
  let divContainer = document.createElement("div");
  divContainer.className = "form-check form-check-inline";

  // Crear el input checkbox
  let inputCheckbox = document.createElement("input");
  inputCheckbox.classList.add("form-check-input", classPage);
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
  //EVENTO DEL CHECK
  inputCheckbox.addEventListener("change", (e) => {
    if (busqueda.value.length < 1) {
      console.log("sin busqueda");
      let filtro = filtrarCategoria(Datos, classPage);
      pintarTarjetas(containerTarjetas, filtro);
    } else {
      console.log("con busqueda");
      filtroSearch(busqueda.value, containerTarjetas, Datos, page);
    }
  });
  return divContainer;
}

export function filtrarCategoria(Datos, page) {
  
  //LISTA DE CHEBOX CHEKEADOS
  let listChecked = [];
  let checkboxs = document.getElementsByClassName(page);
  for (let index = 0; index < checkboxs.length; index++) {
    if (checkboxs[index].checked) {
      listChecked.push(checkboxs[index].value);
    }
  }
  //FILTRAR EVENTOS
  let eventosFiltrados = Datos.filter((event) => {
    for (let i = 0; i < listChecked.length; i++) {
      if (listChecked[i] == event.category) {
        return event;
      }
    }
  });
  if (listChecked.length < 1) {
    //NO DEVUELVE NADA, NO HAY CHECK SELECCIONADO
    return Datos;
  }
  // DEVUELVE EVENTOS FILTRADOS
  return eventosFiltrados;
}

export function pintarChecks(
  contenedor,
  listCategorias,
  busqueda,
  Datos,
  containerTarjetas,
  page
) {
  contenedor.innerHTML = "";
  for (let index = 0; index < listCategorias.length; index++) {
    const check = createCheck(
      listCategorias[index],
      busqueda,
      Datos,
      containerTarjetas,
      page
    );
    contenedor.appendChild(check);
  }
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

export function pintarTarjetas(container, informacion) {
  container.innerHTML = "";
  for (let index = 0; index < informacion.length; index++) {
    const card1 = createCard(informacion[index]);
    container.appendChild(card1);
  }
}

export function obtenerCategorias(eventos) {
  return eventos.reduce((categorias, evento) => {
    if (!categorias.includes(evento.category)) {
      categorias.push(evento.category);
    }
    return categorias;
  }, []);
}
export function filtroSearch(valor, contTar, Data, page) {
  let filtro = [];
  page = "check" + page;
  let cheks = filtrarCategoria(Data, page);
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
    filtro = cheks.filter(
      (event) =>
        event.name.toLowerCase().includes(valor.toLowerCase()) ||
        event.description.toLowerCase().includes(valor.toLowerCase())
    );
  }
  console.log(filtro.length);

  if (filtro.length < 1){
    contTar.innerHTML =`<div class="no-hay-elementos">
    <h3>Sorry, no matching events found.</h3>
    <p>Please try a different search term or refine your filters.</p>
  </div>`
    console.log(contTar);
    
  }else{
    pintarTarjetas(contTar, filtro);
  }


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

export function obtenerEventos(fechaActual,events,passed) {
  let auxEvents = [];
  if(passed){
    for (let index = 0; index < events.length; index++) {
      const fechaEvento = new Date(events[index].date);
      if (fechaActual.getTime() > fechaEvento.getTime()) {
        auxEvents.push(events[index]);
      }
    }
    return auxEvents;

  }else{
    for (let index = 0; index < events.length; index++) {
      const fechaEvento = new Date(events[index].date);
      if (fechaActual.getTime() < fechaEvento.getTime()) {
        auxEvents.push(events[index]);
      }
    }
    return auxEvents;
  }

}