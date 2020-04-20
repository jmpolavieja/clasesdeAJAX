
function cargaDatos() {
// Crear un objeto del tipo XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // El método open, establece los parámetros de la petición al servidor
    xhr.open("GET", "https://reqres.in/api/users/2", true);
    console.log("Estado de la petición " + xhr.status);
    // Evento que se dispara cuando se cargan los datos
    xhr.onload = function(){
        console.log("Nuevo estado de la petición: " + xhr.status);
        console.log(xhr.responseText);
        var datos = JSON.parse(xhr.responseText);
        console.log(datos.data);
        var subtitulo = document.getElementById('subtitulo');
        var nombre = document.getElementById('nombre');
        var avatar = document.getElementById('avatar');
        subtitulo.innerText += " " + datos.data.id;
        nombre.innerText += datos.data.first_name + " " + datos.data.last_name;
        avatar.src = datos.data.avatar;
    };
    // Método para enviar la petición al servidor
    xhr.send();
}
