/* Funcion para retornar a la ventana principal de la galería */

returnGaleria = () => {
  let displayActivo = document.querySelector('#ocultar-galeria');
  let activarImg360 = document.querySelector('#activar-vista-360');
  activarImg360.style.display = 'none';
  displayActivo.style.display = '';
};

/* Función Play / Pause */

pauseAndPlay = () => {
  let modelViewer = document.querySelector('#imgGalery');
  let txt = document.querySelector('.pause');
  if (modelViewer.className === 'Model3d activo') {
    modelViewer.pause();
    modelViewer.classList.remove('activo');
    txt.innerHTML = 'Play';
    modelViewer.removeAttribute('autoplay', '');
  } else {
    modelViewer.play();
    modelViewer.classList.add('activo');
    txt.innerHTML = 'Pause';
    modelViewer.setAttribute('autoplay', 'true');
  }
};

/* función selector de imagenes */

const cardsContainer = document.querySelector(".container-carousel-img");
const cardsController = document.querySelector(".container-carousel-img");
const innerImg = document.querySelector('#imgGalery');

class DraggingEvent {
  constructor(target = undefined) {
    this.target = target;
  }
  
  event(callback) {
    let handler;
    
    this.target.addEventListener("mousedown", e => {
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
    
    this.target.addEventListener("touchstart", e => {
      handler = callback(e)
      
      window.addEventListener("touchmove", handler)
      
      window.addEventListener("touchend", clearDraggingEvent)
      
      document.body.addEventListener("mouseleave", clearDraggingEvent)
      
      function clearDraggingEvent() {
        window.removeEventListener("touchmove", handler)
        window.removeEventListener("touchend", clearDraggingEvent)
        
        handler(null)
      }
    })
  }
  
  // Get the distance that the user has dragged
  getDistance(callback) {
    function distanceInit(e1) {
      let startingX, startingY;
      
      if ("touches" in e1) {
        startingX = e1.touches[0].clientX
        startingY = e1.touches[0].clientY
      } else {
        startingX = e1.clientX
        startingY = e1.clientY
      }
      

      return function(e2) {
        if (e2 === null) {
          return callback(null)
        } else {
          
          if ("touches" in e2) {
            return callback({
              x: e2.touches[0].clientX - startingX,
              y: e2.touches[0].clientY - startingY
            })
          } else {
            return callback({
              x: e2.clientX - startingX,
              y: e2.clientY - startingY
            })
          }
        }
      }
    }
    
    this.event(distanceInit)
  }
}

class CardCarousel extends DraggingEvent {
  constructor(container, controller = undefined) {
    super(container)
    
    // DOM elements
    this.container = container
    this.controllerElement = controller
    this.cards = container.querySelectorAll(".img-carousel");
    
    // Carousel data
    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth = this.cards[0].offsetWidth / this.container.offsetWidth * 100
    this.xScale = {};
    
    // Resizing
    window.addEventListener("resize", this.updateCardWidth.bind(this))
    
    if (this.controllerElement) {
      this.controllerElement.addEventListener("keydown", this.controller.bind(this))      
    }

    
    // Initializers
    this.build()
    
    // Bind dragging event
    super.getDistance(this.moveCards.bind(this))
  }
  
  updateCardWidth() {
    this.cardWidth = this.cards[0].offsetWidth / this.container.offsetWidth * 100
    
    this.build()
  }
  
  build(fix = 0) {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex;
      const scale = this.calcScale(x)
      const scale2 = this.calcScale2(x)
      const zIndex = -(Math.abs(i - this.centerIndex))
      
      const leftPos = this.calcPos(x, scale2)
     
      
      this.xScale[x] = this.cards[i]
      
      this.updateCards(this.cards[i], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex
      })
    }
  }
  
  
  controller(e) {
    const temp = {...this.xScale};
      
      if (e.keyCode === 39) {
        // Left arrow
        for (let x in this.xScale) {
          const newX = (parseInt(x) - 1 < -this.centerIndex) ? this.centerIndex : parseInt(x) - 1;

          temp[newX] = this.xScale[x]
        }
      }
      
      if (e.keyCode == 37) {
        // Right arrow
        for (let x in this.xScale) {
          const newX = (parseInt(x) + 1 > this.centerIndex) ? -this.centerIndex : parseInt(x) + 1;

          temp[newX] = this.xScale[x]
        }
      }
      
      this.xScale = temp;
      
      for (let x in temp) {
        const scale = this.calcScale(x),
              scale2 = this.calcScale2(x),
              leftPos = this.calcPos(x, scale2),
              zIndex = -Math.abs(x)

        this.updateCards(this.xScale[x], {
          x: x,
          scale: scale,
          leftPos: leftPos,
          zIndex: zIndex
        })
      }
  }
  
  calcPos(x, scale) {
    let formula;
    
    if (x < 0) {
      formula = (scale * 100 - this.cardWidth) / 2
      
      return formula

    } else if (x > 0) {
      formula = 100 - (scale * 100 + this.cardWidth) / 2
      
      return formula
    } else {
      formula = 100 - (scale * 100 + this.cardWidth) / 2
      
      return formula
    }
  }
  
  updateCards(card, data) {
    if (data.x || data.x == 0) {
      card.setAttribute("data-x", data.x)
    }
    
    if (data.scale || data.scale == 0) {
      card.style.transform = `scale(${data.scale})`

      if (data.scale == 0) {
        card.style.opacity = data.scale
      } else {
        card.style.opacity = 1;
      }
    }
   
    if (data.leftPos) {
      card.style.left = `${data.leftPos}%`        
    }
    
    if (data.zIndex || data.zIndex == 0) {
      if (data.zIndex == 0) {
        card.classList.add("highlight");
        let src = document.querySelector('.highlight>img') || document.querySelector('.highlight>model-viewer');
        if (src === document.querySelector('.highlight>img')) {
          let newSrc = src.getAttribute('src');
          innerImg.setAttribute('src', newSrc);
          switch (newSrc) {
          case '../../media/02_Jose_Arana.jpeg': 
            document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Jose Arana 02</li>
                                                                        <li class="fs-4">Ubicación</li>
                                                                        <li class="fs-4">Fecha</li>
                                                                        <li class="fs-4">...</li>`;
            break;
          case '../../media/15_Jose_Arana.jpeg':
            document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Jose Arana 15</li>
                                                                        <li class="fs-4">Ubicación</li>
                                                                        <li class="fs-4">Fecha</li>
                                                                        <li class="fs-4">...</li>`; 
            break;
          case '../../media/dolmen-2.jpg':
            document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Dolmen-2</li>
                                                                        <li class="fs-4">Ubicación</li>
                                                                        <li class="fs-4">Fecha</li>
                                                                        <li class="fs-4">...</li>`; 
            break;
          case '../../media/Laskorain_HH3_1Solairua_EsperientziaTxokoa1_11.jpeg':
            document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Laskorain HH3</li>
                                                                        <li class="fs-4">Ubicación</li>
                                                                        <li class="fs-4">Fecha</li>
                                                                        <li class="fs-4">...</li>`; 
            break;
          case '../../media/Laskorain_HH4_1Solairua_Zentzumen_Txokoa1_29.jpeg':
            document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Laskorain HH4</li>
                                                                        <li class="fs-4">Ubicación</li>
                                                                        <li class="fs-4">Fecha</li>
                                                                        <li class="fs-4">...</li>`; 
            break;
      
          default:
            console.log('error');
            break;
        }
        }else{
          let newSrc = src.getAttribute('src');
          innerImg.setAttribute('src', newSrc);
          switch (newSrc) {
            case '../../media/Barca_01.glb': 
              document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Barca</li>
                                                                          <li class="fs-4">Tamaño</li>
                                                                          <li class="fs-4">Fecha</li>
                                                                          <li class="fs-4">Material</li>
                                                                          <li class="fs-4">Utilidad</li>
                                                                          <li class="fs-4">...</li>`;
              document.querySelector('#hidden').style.display = '';
              break;
            case '../../media/Capitan America (1).glb':
              document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Capitan América</li>
                                                                          <li class="fs-4">Tamaño</li>
                                                                          <li class="fs-4">Fecha</li>
                                                                          <li class="fs-4">Material</li>
                                                                          <li class="fs-4">Utilidad</li>
                                                                          <li class="fs-4">...</li>`;
              document.querySelector('#hidden').style.display = '';
              break;
            case '../../media/GLB_Arbol_01.glb':
              document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Arbol</li>
                                                                          <li class="fs-4">Tamaño</li>
                                                                          <li class="fs-4">Fecha</li>
                                                                          <li class="fs-4">Material</li>
                                                                          <li class="fs-4">Utilidad</li>
                                                                          <li class="fs-4">...</li>`;
              document.querySelector('#hidden').style.display = 'none';
              break;
            case '../../media/GLB_Coche_03.glb':
              document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Coche</li>
                                                                          <li class="fs-4">Tamaño</li>
                                                                          <li class="fs-4">Fecha</li>
                                                                          <li class="fs-4">Material</li>
                                                                          <li class="fs-4">Utilidad</li>
                                                                          <li class="fs-4">...</li>`;
              document.querySelector('#hidden').style.display = 'none';
              break;
            case '../../media/GLB_Jaguar.glb':
              document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Jaguar</li>
                                                                          <li class="fs-4">Tamaño</li>
                                                                          <li class="fs-4">Fecha</li>
                                                                          <li class="fs-4">Material</li>
                                                                          <li class="fs-4">Utilidad</li>
                                                                          <li class="fs-4">...</li>`;
              document.querySelector('#hidden').style.display = '';
              break;
        
            default:
              console.log('error');
              break;
          }
        }
        
      } else {
        card.classList.remove("highlight")
      }
      
      card.style.zIndex = data.zIndex
        
    }
  }
  
  calcScale2(x) {
    let formula;
   
    if (x <= 0) {
      formula = 1 - -1 / 4 * x
      
      return formula
    } else if (x > 0) {
      formula = 1 - 1 / 4 * x
      
      return formula
    }
  }
  
  calcScale(x) {
    const formula = 1 - 1 / 8 * Math.pow(x, 2)
    
    if (formula <= 0) {
      return 0 
    } else {
      return formula      
    }
  }
  
  checkOrdering(card, x, xDist) {    
    const original = parseInt(card.dataset.x)
    const rounded = Math.round(xDist)
    let newX = x
    
    if (x !== x + rounded) {
      if (x + rounded > original) {
        if (x + rounded > this.centerIndex) {
          
          newX = ((x + rounded - 1) - this.centerIndex) - rounded + -this.centerIndex
        }
      } else if (x + rounded < original) {
        if (x + rounded < -this.centerIndex) {
          
          newX = ((x + rounded + 1) + this.centerIndex) - rounded + this.centerIndex
        }
      }
      
      this.xScale[newX + rounded] = card;
    }
    
    const temp = -Math.abs(newX + rounded)
    
    this.updateCards(card, {zIndex: temp})

    return newX;
  }
  
  moveCards(data) {
    let xDist;
    
    if (data != null) {
      this.container.classList.remove("smooth-return")
      xDist = data.x / 250;
    } else {

      
      this.container.classList.add("smooth-return")
      xDist = 0;

      for (let x in this.xScale) {
        this.updateCards(this.xScale[x], {
          x: x,
          zIndex: Math.abs(Math.abs(x) - this.centerIndex)
        })
      }
    }

    for (let i = 0; i < this.cards.length; i++) {
      const x = this.checkOrdering(this.cards[i], parseInt(this.cards[i].dataset.x), xDist),
            scale = this.calcScale(x + xDist),
            scale2 = this.calcScale2(x + xDist),
            leftPos = this.calcPos(x + xDist, scale2)
      
      
      this.updateCards(this.cards[i], {
        scale: scale,
        leftPos: leftPos
      })
    }
  }
}

const carousel = new CardCarousel(cardsContainer)

/*-----------------*/

