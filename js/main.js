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
  console.log(modelViewer);
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
