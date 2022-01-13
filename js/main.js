/* Funcion para retornar a la ventana principal de la galería */

returnGaleria = () => {
  let displayActivo = document.querySelector('#ocultar-galeria');
  let activarImg360 = document.querySelector('#activar-vista-360');
  activarImg360.style.display = 'none';
  displayActivo.style.display = '';
};

/* Función Play / Pause */

pause = () => {
  var modelViewer = document.querySelector('#Vr');
  var txt = document.querySelector('.pause');
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

const items = document.querySelectorAll('img.imgItems');
const imgActive = document.querySelector('#imgGalery');
const itemCount = items.length;
let count = 0;

showNextItem =()=> {
  items[count].classList.remove('active');
  time = ()=>{
    imgActive.classList.remove('active');
  }

  if (count < itemCount -1) {
    count++;
  } else {
    count = 0;
  }

  let src = items[count];
  let newSrc = src.getAttribute('src');
  document.querySelector('#imgGalery').setAttribute('src', newSrc);
  items[count].classList.add('active');
  imgActive.classList.add('active');
  setTimeout(time, 1000);

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
}

showPreviousItem =()=> {
  items[count].classList.remove('active');
  time = ()=>{
    imgActive.classList.remove('active');
  }

  if (count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }
  
  let src = items[count];
  let newSrc = src.getAttribute('src');
  document.querySelector('#imgGalery').setAttribute('src', newSrc);
  items[count].classList.add('active');
  imgActive.classList.add('active');
  setTimeout(time, 1000);

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
}


/* funcion selector de Vr */
const itemsVr = document.querySelectorAll('model-viewer.changeVr');
const vrActive = document.querySelector('#Vr');
const vrCount = itemsVr.length;
let countVr = 0;

showNextVr =()=> {
  if (countVr < vrCount -1) {
    countVr++;
  } else {
    countVr = 0;
  }
  let srcVr = itemsVr[countVr];
  let newSrcVr = srcVr.getAttribute('src');
  document.querySelector('#Vr').setAttribute('src', newSrcVr);

  switch (newSrcVr) {
    case '../../media/Barca_01.glb': 
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Barca</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`;
      break;
    case '../../media/Capitan America (1).glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Capitan América</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`; 
      break;
    case '../../media/GLB_Arbol_01.glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Arbol</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`; 
      break;
    case '../../media/GLB_Coche_03.glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Coche</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`; 
      break;
    case '../../media/GLB_Jaguar.glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Jaguar</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`;
      break;

    default:
      console.log('error');
      break;
  }
}

showPreviousVr =()=> {
  if (countVr > 0) {
    countVr--;
  } else {
    countVr = vrCount - 1;
  }
  let srcVr = itemsVr[countVr];
  let newSrcVr = srcVr.getAttribute('src');
  document.querySelector('#Vr').setAttribute('src', newSrcVr);

  switch (newSrcVr) {
    case '../../media/Barca_01.glb': 
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Barca</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`;
      break;
    case '../../media/Capitan America (1).glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Capitan América</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`; 
      break;
    case '../../media/GLB_Arbol_01.glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Arbol</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`; 
      break;
    case '../../media/GLB_Coche_03.glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Coche</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`; 
      break;
    case '../../media/GLB_Jaguar.glb':
      document.querySelector('.container_text_maps').innerHTML = `<li class="fs-4">Nombre Jaguar</li>
                                                                  <li class="fs-4">Tamaño</li>
                                                                  <li class="fs-4">Fecha</li>
                                                                  <li class="fs-4">Material</li>
                                                                  <li class="fs-4">Utilidad</li>
                                                                  <li class="fs-4">...</li>`;
      break;

    default:
      console.log('error');
      break;
  }
}
