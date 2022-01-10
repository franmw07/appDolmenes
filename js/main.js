/* Funcion para retornar a la ventana principal de la galería */

returnGaleria = () =>{
    let displayActivo = document.getElementById("ocultar-galeria");
    let activarImg360 = document.getElementById("activar-vista-360");
    activarImg360.style.display = "none";
    displayActivo.style.display = "";
}