
cargarMapa = () => {
  // API mapas MapBox
  // Token de acceso a la API
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZnJhbm13MDciLCJhIjoiY2t5b2VhZnJrMWp0eDJvdWZnaWVkdzFidyJ9.OfL1GI7lLtquvIkqLzatfg";
  //Información de los dolmenes a mostrar en el mapa
  const iconJson = {
    type: "itemsCollection",
    items: [
      {
        type: "item",
        properties: {
          nombre: "Mandubizelaia Trikuharria",
          descripcion: "Duela 5.300 urtetik 3.700 bitarte",
          tamaño: [100, 100],
        },
        geometry: {
          type: "point",
          coordinates: [-2.2492332837193274,43.08537680774247],
        },
      },
      {
        type: "item",
        properties: {
          nombre: "Trikuaizti I",
          descripcion: "Duela 5.800 urtetik 3.500 bitarte",
          tamaño: [100, 100],
        },
        geometry: {
          type: "point",
          coordinates: [-2.2401604529942163,43.08862681032788],
        },
      },
      {
        type: "item",
        properties: {
          nombre: "Trikuaizti II",
          descripcion: "Duela 6.000 urtetik 5.800 bitarte",
          tamaño: [100, 100],
        },
        geometry: {
          type: "point",
          coordinates: [-2.2401847738782252,43.08824399812255],
        },
      },
    ],
  };
  // Creamos el mapa
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [-2.2492332837193274,43.0850], // starting position [lng, lat]
    zoom: 15, // starting zoom
  });
  // agregamos las marcas al mapa
  for (const marker of iconJson.items) {
    // creamos cada objeto a integrar en el DOM
    const item = document.createElement("img");
    const width = marker.properties.tamaño[0];
    const height = marker.properties.tamaño[1];
    item.className = "bi";
    item.setAttribute("src", "../../media/icon.svg");
    item.style.width = `${width}px`;
    item.style.height = `${height}px`;
    //información a introducir en el popup
    const title = marker.properties.nombre;
    const text = marker.properties.descripcion;
    // popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<strong>${title}:</strong><br><p>${text}</p>`
    );
    // agregamos los marcadores al mapa
    new mapboxgl.Marker(item)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(popup)
      .addTo(map);
  }
};

// Funcion para retornar a la ventana principal de la galería 
returnGaleria = () => {
  let displayActivo = document.querySelector("#ocultar-galeria");
  let activarImg360 = document.querySelector("#activar-vista-360");
  activarImg360.style.display = "none";
  displayActivo.style.display = "";
};
// Función Play / Pause 
pauseAndPlay = () => {
  let modelViewer = document.querySelector("#imgGalery");
  let txt = document.querySelector(".pause");
  if (modelViewer.className === "Model3d activo") {
    modelViewer.pause();
    modelViewer.classList.remove("activo");
    txt.innerHTML = "Play";
    modelViewer.removeAttribute("autoplay", "");
  } else {
    modelViewer.play();
    modelViewer.classList.add("activo");
    txt.innerHTML = "Pause";
    modelViewer.setAttribute("autoplay", "true");
  }
};

// Ver imágen en 360º 

innerSee360 = () =>{
  let hiddenHTMLcode = document.querySelector('.container-info.data-dolmen').style.display = 'none';
  if (hiddenHTMLcode === 'none') {
    const selectSection = document.querySelector('.flex-container');
    let innerHTML360 = `<section class="container-img-360">
                          <div class="container-button">
                              <button class="lang fw-bolder" onclick="returnMaps()">Atrás</button>
                          </div>
                          <a-scene>
                              <a-sky   
                              src = "../../media/Laskorain_HH3_1Solairua_EsperientziaTxokoa1_11.jpeg"
                              rotation="0 -100 0"
                              radius="50"></a-sky >
                          </a-scene >
                        </section>`;
    selectSection.innerHTML += innerHTML360;
  }
}

// volver al mapa 

returnMaps = () =>{
  document.querySelector('.container-img-360').style.display = 'none';
  document.querySelector('.container-info.data-dolmen').style.display = 'flex';
  cargarCarousel();

  let noneHTML = document.querySelector('.container-img-360');
  document.querySelector('.container-info.data-dolmen').style.display = 'flex';
  cargarMapa();
}

// selector de imagenes

cargarCarousel = () =>{
const gap = 16;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev"),
  itemsCarousel = document.querySelectorAll('.item');

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

itemsCarousel.forEach(element => {
    element.addEventListener("click", e => {
    let srcImg =  element.getAttribute('src');
    let altImg = element.getAttribute('alt');
    let dataImg = element.getAttribute('data-description');

    const changeImg = () =>{
      document.querySelector('#imgGalery').removeAttribute('src');
      document.querySelector('#imgGalery').removeAttribute('alt');
      document.querySelector('#imgGalery').removeAttribute('data-description');
      document.querySelector('#imgGalery').setAttribute('src', srcImg);
      document.querySelector('#imgGalery').setAttribute('alt', altImg);
      document.querySelector('#imgGalery').setAttribute('data-description', dataImg);
    }
    if (srcImg === "https://sketchfab.com/models/f403450519b947aba3fcbe35aa0d70b4/embed") {
      document.querySelector('#imgGalery').style.display = 'none';
      document.querySelector('#sketchfab').style.display = 'block';
    }else if(element.tagName === 'MODEL-VIEWER' && srcImg != "https://sketchfab.com/models/f403450519b947aba3fcbe35aa0d70b4/embed"){
      document.querySelector('#sketchfab').style.display = 'none';
      document.querySelector('#imgGalery').style.display = 'block';
      changeImg();
    }else{
      changeImg();
    }
    textInner();
  });
});

//cambio de informacion de texto segun imagen

const textInner = () =>{
  let urlImg = document.querySelector('#imgGalery').getAttribute('src');
  let nameImg = document.querySelector('#imgGalery').getAttribute('alt');
  let desImg = document.querySelector('#imgGalery').getAttribute('data-description');
  let infoTextName = document.querySelector('#textTitle').textContent = nameImg;
  let infoTextDes = document.querySelector('#textDes').textContent = desImg;
}

//boton animación
/*
const seeButton = () =>{
  document.querySelector('#hidden').style.display = 'block';
}*/

}