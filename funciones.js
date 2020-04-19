window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://reqres.in/api/users", true);
    console.log("Estado de la petición " + xhr.status);
    xhr.onload = function(){
        console.log("Nuevo estado de la petición: " + xhr.status);
        console.log(xhr.responseText);
        var datos = JSON.parse(xhr.responseText);
        console.log(datos.data);
    };
    xhr.send();
}

