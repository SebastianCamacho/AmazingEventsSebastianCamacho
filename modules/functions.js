function createCheck(categoria) {
    //capitalizar y quitar espacios
    let id = capitalizarYQuitarEspacios(categoria);
  
    // Crear el div contenedor principal
    let divContainer = document.createElement("div");
    divContainer.className = "form-check form-check-inline";
  
    // Crear el input checkbox
    let inputCheckbox = document.createElement("input");
    inputCheckbox.classList.add("form-check-input", "checkHome");
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
        let filtro = filtrarCategoria();
        pintarTarjetas(filtro);
      } else {
        console.log("con busqueda");
        filtroSearch(busqueda.value);
      }
    });
  
    return divContainer;
  }

export function pintarChecks(contenedor, listCategorias) {
  contenedor.innerHTML = "";
  for (let index = 0; index < listCategorias.length; index++) {
    const check = createCheck(listCategorias[index]);
    contenedor.appendChild(check);
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

  


