/* Funcion para retornar a la ventana principal de la galería */

returnGaleria = () => {
  let displayActivo = document.getElementById("ocultar-galeria");
  let activarImg360 = document.getElementById("activar-vista-360");
  activarImg360.style.display = "none";
  displayActivo.style.display = "";
};

/* Función Play / Pause */

pause = () => {
  var modelViewer = document.querySelector("#Vr");
  var txt = document.querySelector(".pause");
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

/* función selector de imagenes */

const items = document.querySelectorAll("img.imgItems");
const imgActive = document.querySelector('#imgGalery');
const itemCount = items.length;
const nextItem = document.querySelector(".next");
const previousItem = document.querySelector(".previous");
let count = 0;

function showNextItem() {
  items[count].classList.remove("active");
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
  items[count].classList.add("active");
  imgActive.classList.add('active');
  setTimeout(time, 1000);
}

function showPreviousItem() {
  items[count].classList.remove("active");
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
  items[count].classList.add("active");
  imgActive.classList.add('active');
  setTimeout(time, 1000);
}

function keyPress(e) {
  e = e || window.event;

  if (e.keyCode == "37") {
    showPreviousItem();
  } else if (e.keyCode == "39") {
    showNextItem();
  }
}

nextItem.addEventListener("click", showNextItem);
previousItem.addEventListener("click", showPreviousItem);
document.addEventListener("keydown", keyPress);
