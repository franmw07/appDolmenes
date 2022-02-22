
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
          nombre: "Dolmen 1",
          descripcion: "Esta es la descripción del dolmen 1",
          tamaño: [100, 100],
        },
        geometry: {
          type: "point",
          coordinates: [-2.4, 43.12],
        },
      },
      {
        type: "item",
        properties: {
          nombre: "Dolmen 2",
          descripcion: "Esta es la descripción del dolmen 2",
          tamaño: [100, 100],
        },
        geometry: {
          type: "point",
          coordinates: [-2.3, 43.095],
        },
      },
      {
        type: "item",
        properties: {
          nombre: "Dolmen 3",
          descripcion: "Esta es la descripción del dolmen 3",
          tamaño: [100, 100],
        },
        geometry: {
          type: "point",
          coordinates: [-2.2706537, 43.0831025],
        },
      },
    ],
  };
  // Creamos el mapa
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [-2.2706537, 43.0831025], // starting position [lng, lat]
    zoom: 10, // starting zoom
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

/* Funcion para retornar a la ventana principal de la galería */
returnGaleria = () => {
  let displayActivo = document.querySelector("#ocultar-galeria");
  let activarImg360 = document.querySelector("#activar-vista-360");
  activarImg360.style.display = "none";
  displayActivo.style.display = "";
};
/* Función Play / Pause */
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

/* función seleccionador de imagenes en carrusel */
cargarCarousel = () => {
  /* función selector de imagenes */
  const carouselList = document.querySelector(".container-carousel-img");
  const carouselItems = document.querySelectorAll(".img-carousel");
  const elems = Array.from(carouselItems);
  const innerImg = document.querySelector("#imgGalery");
  let ua = navigator.userAgent;
  let isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(ua);

  if (isMobile) {
    // evento arrastrar
    class DraggingEvent {
  
      event(callback) {
        let handler;
         // evento mover solo en movil
        carouselList.addEventListener("mousedown", e => {
          e.preventDefault()
          
          handler = callback(e)
          
          window.addEventListener("mousemove", handler)
          
          document.addEventListener("mouseleave", clearDraggingEvent)
          
          window.addEventListener("mouseup", clearDraggingEvent)
          
          function clearDraggingEvent() {
            window.removeEventListener("mousemove", handler)
            window.removeEventListener("mouseup", clearDraggingEvent)
          
            document.removeEventListener("mouseleave", clearDraggingEvent)
            
            handler(null)
          }
        })

        carouselList.addEventListener("touchstart", (e) => {
          e.preventDefault();
          handler = callback(e);
  
          window.addEventListener("touchmove", handler);
  
          window.addEventListener("touchend", clearDraggingEvent);
  
          document.body.addEventListener("mouseleave", clearDraggingEvent);
  
          function clearDraggingEvent() {
            window.removeEventListener("touchmove", handler);
            window.removeEventListener("touchend", clearDraggingEvent);
  
            handler(null);
          }
        });
      }

      getDistance(callback) {
        function distanceInit(e1) {
          let startingX, startingY;
          if ("touches" in e1) {
            startingX = e1.touches[0].clientX;
            startingY = e1.touches[0].clientY;
          } else {
            startingX = e1.clientX;
            startingY = e1.clientY;
          }
  
          return function (e2) {
            if (e2 === null) {
              return callback(null);
            } else {
              if ("touches" in e2) {
                return callback({
                  x: e2.touches[0].clientX - startingX,
                  y: e2.touches[0].clientY - startingY,
                });
              } else {
                return callback({
                  x: e2.clientX - startingX,
                  y: e2.clientY - startingY,
                });
              }
            }
          };
        }
        this.event(distanceInit);
      }
    }
    class CardCarousel extends DraggingEvent {
      constructor(container, controller = undefined) {
        super(container);
  
        // DOM elementos
        this.container = container;
        this.controllerElement = controller;
        this.cards = container.querySelectorAll(".img-carousel");
  
        // Carousel datos
        this.centerIndex = (this.cards.length - 1) / 2;
        this.cardWidth =
          (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
        this.xScale = {};
  
        // Escala
        window.addEventListener("resize", this.updateCardWidth.bind(this));
  
        if (this.controllerElement) {
          this.controllerElement.addEventListener(
            "keydown",
            this.controller.bind(this)
          );
        }
  
        // inicializar
        this.build();
  
        // evento de movimiento
        super.getDistance(this.moveCards.bind(this));
      }
  
      updateCardWidth() {
        this.cardWidth =
          (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
  
        this.build();
      }
  
      build(fix = 0) {
        for (let i = 0; i < this.cards.length; i++) {
          const x = i - this.centerIndex;
          const scale = this.calcScale(x);
          const scale2 = this.calcScale2(x);
          const zIndex = -Math.abs(i - this.centerIndex);
  
          const leftPos = this.calcPos(x, scale2);
  
          this.xScale[x] = this.cards[i];
  
          this.updateCards(this.cards[i], {
            x: x,
            scale: scale,
            leftPos: leftPos,
            zIndex: zIndex,
          });
        }
      }
  
      controller(e) {
        const temp = { ...this.xScale };
  
        if (e.keyCode === 39) {
          // Izquierda arrow
          for (let x in this.xScale) {
            const newX =
              parseInt(x) - 1 < -this.centerIndex
                ? this.centerIndex
                : parseInt(x) - 1;
  
            temp[newX] = this.xScale[x];
          }
        }
  
        if (e.keyCode == 37) {
          // derecha arrow
          for (let x in this.xScale) {
            const newX =
              parseInt(x) + 1 > this.centerIndex
                ? -this.centerIndex
                : parseInt(x) + 1;
  
            temp[newX] = this.xScale[x];
          }
        }
  
        this.xScale = temp;
  
        for (let x in temp) {
          const scale = this.calcScale(x),
            scale2 = this.calcScale2(x),
            leftPos = this.calcPos(x, scale2),
            zIndex = -Math.abs(x);
  
          this.updateCards(this.xScale[x], {
            x: x,
            scale: scale,
            leftPos: leftPos,
            zIndex: zIndex,
          });
        }
      }
  
      calcPos(x, scale) {
        let formula;
  
        if (x < 0) {
          formula = (scale * 100 - this.cardWidth) / 2;
  
          return formula;
        } else if (x > 0) {
          formula = 100 - (scale * 100 + this.cardWidth) / 2;
  
          return formula;
        } else {
          formula = 100 - (scale * 100 + this.cardWidth) / 2;
  
          return formula;
        }
      }
  
      updateCards(card, data) {
        if (data.x || data.x == 0) {
          card.setAttribute("data-x", data.x);
        }
  
        if (data.scale || data.scale == 0) {
          card.style.transform = `scale(${data.scale})`;
  
          if (data.scale == 0) {
            card.style.opacity = data.scale;
          } else {
            card.style.opacity = 1;
          }
        }
  
        if (data.leftPos) {
          card.style.left = `${data.leftPos}%`;
        }
  
        if (data.zIndex || data.zIndex == 0) {
          if (data.zIndex == 0) {
            card.classList.add("highlight");
            let src = document.querySelector(".highlight");
            if (src.tagName === "IMG") {
              let newSrc = src.getAttribute("src");
              innerImg.setAttribute("src", newSrc);
              switch (newSrc) {
                case "../../media/gettyimages-927938320-2048x2048.jpg":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Nombre:</u><br>
                                    Dolmen 1</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Ubicación:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="../../media/busBlue.svg" alt="icono transporte"><p><u>Paradas de transporte público:</u><br> 
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="" alt=""><p><u>Etc.</u></p></li>`;
                  break;
                case "../../media/gettyimages-126383899-2048x2048.jpg":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Nombre:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Ubicación:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="../../media/busBlue.svg" alt="icono transporte"><p><u>Paradas de transporte público:</u><br> 
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="" alt=""><p><u>Etc.</u></p></li>`;
                  break;
                case "../../media/gettyimages-657832689-2048x2048.jpg":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Nombre:</u><br>
                                    Dolmen 3</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Ubicación:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="../../media/busBlue.svg" alt="icono transporte"><p><u>Paradas de transporte público:</u><br> 
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="" alt=""><p><u>Etc.</u></p></li>`;
                  break;
                case "../../media/gettyimages-845885088-2048x2048.jpg":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Nombre:</u><br>
                                    Dolmen 4</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Ubicación:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="../../media/busBlue.svg" alt="icono transporte"><p><u>Paradas de transporte público:</u><br> 
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="" alt=""><p><u>Etc.</u></p></li>`;
                  break;
                case "../../media/gettyimages-1248257041-2048x2048.jpg":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML =` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Nombre:</u><br>
                                    Dolmen 5</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Ubicación:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="../../media/busBlue.svg" alt="icono transporte"><p><u>Paradas de transporte público:</u><br> 
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="" alt=""><p><u>Etc.</u></p></li>`;
                  break;
  
                default:
                  console.log("error");
                  break;
              }
            } else {
              let newSrc = src.getAttribute("src");
              innerImg.setAttribute("src", newSrc);
              switch (newSrc) {
                case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Irekia.glb":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 1</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Ubicación:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="../../media/busBlue.svg" alt="icono transporte"><p><u>Paradas de transporte público:</u><br> 
                                    lorem impsum lorem impsum lorem impsum</p></li>
                                  <li><img src="" alt=""><p><u>Etc.</u></p></li>`;
                  document.querySelector("#hidden").style.display = "none";
                  break;
                case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Animatua.glb":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
                  document.querySelector("#hidden").style.display = "initial";
                  break;
                case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Hondatua.glb":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
                  document.querySelector("#hidden").style.display = "none";
                  break;
                case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Itxita.glb":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
                  document.querySelector("#hidden").style.display = "none";
                  break;
                case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Hondatua_Animatua.glb":
                  document.querySelector(
                    ".container-text-maps"
                  ).innerHTML =` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
                  document.querySelector("#hidden").style.display = "initial";
                  break;
  
                default:
                  console.log("error");
                  break;
              }
            }
          } else {
            card.classList.remove("highlight");
          }
  
          card.style.zIndex = data.zIndex;
        }
      }
  
      calcScale2(x) {
        let formula;
  
        if (x <= 0) {
          formula = 1 - (-1 / 3.5) * x;
  
          return formula;
        } else if (x > 0) {
          formula = 1 - (1 / 3.5) * x;
  
          return formula;
        }
      }
  
      calcScale(x) {
        const formula = 1 - (1 / 6) * Math.pow(x, 2);
  
        if (formula <= 0) {
          return 0;
        } else {
          return formula;
        }
      }
  
      checkOrdering(card, x, xDist) {
        const original = parseInt(card.dataset.x);
        const rounded = Math.round(xDist);
        let newX = x;
  
        if (x !== x + rounded) {
          if (x + rounded > original) {
            if (x + rounded > this.centerIndex) {
              newX =
                x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex;
            }
          } else if (x + rounded < original) {
            if (x + rounded < -this.centerIndex) {
              newX =
                x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
            }
          }
  
          this.xScale[newX + rounded] = card;
        }
  
        const temp = -Math.abs(newX + rounded);
  
        this.updateCards(card, { zIndex: temp });
  
        return newX;
      }
  
      moveCards(data) {
        let xDist;
  
        if (data != null) {
          this.container.classList.remove("smooth-return");
          xDist = data.x / 250;
        } else {
          this.container.classList.add("smooth-return");
          xDist = 0;
  
          for (let x in this.xScale) {
            this.updateCards(this.xScale[x], {
              x: x,
              zIndex: Math.abs(Math.abs(x) - this.centerIndex),
            });
          }
        }
  
        for (let i = 0; i < this.cards.length; i++) {
          const x = this.checkOrdering(
              this.cards[i],
              parseInt(this.cards[i].dataset.x),
              xDist
            ),
            scale = this.calcScale(x + xDist),
            scale2 = this.calcScale2(x + xDist),
            leftPos = this.calcPos(x + xDist, scale2);
  
          this.updateCards(this.cards[i], {
            scale: scale,
            leftPos: leftPos,
          });
        }
      }
    }
    new CardCarousel(carouselList);
    
  }else{
    // evento click
    carouselList.addEventListener("click", (e) => {
      e.preventDefault()
      let newActive = e.target;
      let select = newActive.closest('.img-carousel');

      if (!select || newActive.classList.contains('highlight')) {
        return
      }
      update(newActive);
      newActive.classList.add('highlight');
      });

    const update = (newActive) => {
      const newActivePos = newActive.dataset.pos;
      
      const current = elems.find((elem) => elem.dataset.pos == 0);
      const prev = elems.find((elem) => elem.dataset.pos == -1);
      const next = elems.find((elem) => elem.dataset.pos == 1);
      const first = elems.find((elem) => elem.dataset.pos == -2);
      const last = elems.find((elem) => elem.dataset.pos == 2);

      [current, prev, next, first, last].forEach((item) => {
        let itemPos = item.dataset.pos;
        
        if (item.dataset.pos == '0') {
            item.classList.remove('highlight');
        }
        item.dataset.pos = getPos(itemPos, newActivePos);
      });

      //inner de los datos de la foto seleccionada
      if (newActive.tagName === "IMG") {
        let newSrc = newActive.getAttribute("src");
        innerImg.setAttribute("src", newSrc);
        switch (newSrc) {
          case "../../media/gettyimages-927938320-2048x2048.jpg":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
            break;
          case "../../media/gettyimages-126383899-2048x2048.jpg":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
            break;
          case "../../media/gettyimages-657832689-2048x2048.jpg":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
            break;
          case "../../media/gettyimages-845885088-2048x2048.jpg":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
            break;
          case "../../media/gettyimages-1248257041-2048x2048.jpg":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML =` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
            break;

          default:
            console.log("error");
            break;
        }
      } else {
        let newSrc = newActive.getAttribute("src");
        innerImg.setAttribute("src", newSrc);
        switch (newSrc) {
          case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Irekia.glb":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Trikuharria irekita</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    Trikuharria irekita hildako batekin</p></li>`;
            document.querySelector("#hidden").style.display = "none";
            break;
          case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Animatua.glb":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
            document.querySelector("#hidden").style.display = "initial";
            break;
          case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Hondatua.glb":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Trikuharria hondatuta</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    Trikuharria denboraren eraginez suntsiturik</p></li>`;
            document.querySelector("#hidden").style.display = "none";
            break;
          case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Itxita.glb":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML = ` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Trikuharria itxita</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    Trikuharria itxita goiko harriarekin estalita.</p></li>`;
            document.querySelector("#hidden").style.display = "none";
            break;
          case "../../media/3D_Trikuharri/GLB/GLB_Trikuharri_Hondatua_Animatua.glb":
            document.querySelector(
              ".container-text-maps"
            ).innerHTML =` <li><img src="../../media/dolmenBlue.svg" alt="icono dolmen"><p><u>Izena:</u><br>
                                    Dolmen 2</p></li>
                                  <li><img src="../../media/mapBlue.svg" alt="icono mapa"><p><u>Deskribapena:</u><br>
                                    lorem impsum lorem impsum lorem impsum</p></li>`;
            document.querySelector("#hidden").style.display = "initial";
            break;

          default:
            console.log("error");
            break;
        }
      }
    };

    const getPos = function (current, active) {
      const diff = current - active;
      if (Math.abs(current - active) > 2) {
        return -current;
      }
      return diff;
    };
  }
};

/* Ver imágen en 360º */

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

/* volver al mapa */

returnMaps = () =>{
  const selectSection = document.querySelector('.flex-container');
  let noneHTML = document.querySelector('.container-img-360');
  selectSection.removeChild(noneHTML);
  document.querySelector('.container-info.data-dolmen').style.display = 'flex';
  cargarMapa();
}

/* galeria de imágenes */

/*imgGalery = () =>{
  const img = document.querySelector('.overflow-auto.container-cards-scroll');
  img.addEventListener('click', imgSrc =>{
    let aSky = document.querySelector('#scene360').getAttribute('src');
    console.log(aSky);
  })
}*/